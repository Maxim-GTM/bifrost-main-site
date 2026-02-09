/**
 * Script to fetch LLM model data and generate a static TypeScript file
 * Run with: npm run generate:llm-data
 *
 * This script matches the exact processing logic from the original bifrost-model-pricing-calculator
 */

const BIFROST_API_URL = 'https://getbifrost.ai/datasheet'

interface ModelMode {
  mode: string
  input_cost_per_token?: number
  output_cost_per_token?: number
  input_cost_per_second?: number
  output_cost_per_second?: number
  input_cost_per_image?: number
  output_cost_per_image?: number
  ocr_cost_per_page?: number
  input_cost_per_character?: number
  output_cost_per_character?: number
  max_input_tokens?: number
  max_output_tokens?: number
  max_tokens?: number
  max_query_tokens?: number
  supports_function_calling?: boolean
  supports_parallel_function_calling?: boolean
  supports_vision?: boolean
  supports_reasoning?: boolean
  supports_web_search?: boolean
  supports_audio_input?: boolean
  supports_audio_output?: boolean
  supports_prompt_caching?: boolean
  supports_system_messages?: boolean
  supports_response_schema?: boolean
  provider: string
}

interface ModelData extends ModelMode {
  litellm_provider?: string
  source?: string
}

interface ModelEntry {
  [key: string]: ModelData
}

interface ProcessedModel {
  id: string
  name: string
  displayName: string
  provider: string
  slug: string
  data: ModelData
}

/**
 * Check if a value is a valid number (not null, not undefined, and is a number)
 */
function isValidNumber(value: any): boolean {
  return typeof value === 'number' && !isNaN(value) && value !== null
}

/**
 * Check if a value is a valid positive number (greater than 0)
 */
function isValidPositiveNumber(value: any): boolean {
  return isValidNumber(value) && value > 0
}

/**
 * Normalize cost per token to standard format (per token, not per million)
 * Some APIs provide costs already in per-million-token format (e.g., 0.015)
 * We normalize these to per-token format (e.g., 0.015 / 1000000 = 0.000000015)
 * Threshold: if value >= 0.001, treat as per-million-token and normalize
 */
function normalizeCostPerToken(cost: number | undefined): number | undefined {
  if (!isValidNumber(cost) || cost === undefined) {
    return undefined
  }

  // If cost is >= 0.001, it's likely already per-million-token format
  // Normalize it to per-token format by dividing by 1 million
  if (cost >= 0.001) {
    return cost / 1000000
  }

  // Otherwise, assume it's already in per-token format
  return cost
}

/**
 * Check if a model has valid pricing information
 * Requires input_cost_per_token OR output_cost_per_token (token-based pricing)
 * Both must be greater than 0 (discards models with 0 costs)
 * Discards models where both costs are ~0 after scaling to million tokens (threshold: < $0.01 per 1M tokens)
 * Discards models that only have per-image, per-second, or per-page pricing without token costs
 */
function hasValidPricing(data: ModelData): boolean {
  // Must have at least one token-based cost (input or output) that is greater than 0
  const hasTokenPricing =
    isValidPositiveNumber(data.input_cost_per_token) ||
    isValidPositiveNumber(data.output_cost_per_token)

  if (!hasTokenPricing) {
    return false
  }

  // Check if both costs are ~0 after scaling to million tokens
  // Threshold: if both are less than $0.01 per 1M tokens, discard the model
  const THRESHOLD_PER_1M = 0.01 // $0.01 per million tokens

  const inputCostPer1M = data.input_cost_per_token ? data.input_cost_per_token * 1000000 : 0
  const outputCostPer1M = data.output_cost_per_token ? data.output_cost_per_token * 1000000 : 0

  // If both costs exist but both are below threshold, discard
  if (
    isValidPositiveNumber(data.input_cost_per_token) &&
    isValidPositiveNumber(data.output_cost_per_token) &&
    inputCostPer1M < THRESHOLD_PER_1M &&
    outputCostPer1M < THRESHOLD_PER_1M
  ) {
    return false
  }

  // If only one cost exists, it must be above threshold
  if (
    isValidPositiveNumber(data.input_cost_per_token) &&
    !isValidPositiveNumber(data.output_cost_per_token) &&
    inputCostPer1M < THRESHOLD_PER_1M
  ) {
    return false
  }

  if (
    isValidPositiveNumber(data.output_cost_per_token) &&
    !isValidPositiveNumber(data.input_cost_per_token) &&
    outputCostPer1M < THRESHOLD_PER_1M
  ) {
    return false
  }

  return true
}

/**
 * Process raw model entries into ProcessedModel array
 * This matches the exact logic from the original bifrost-model-pricing-calculator
 */
function processModels(models: ModelEntry): ProcessedModel[] {
  return Object.entries(models)
    .map(([id, data]) => {
      // Extract model name from ID (e.g., "openai/gpt-4" -> "gpt-4")
      const parts = id.split('/')
      const modelName = parts[parts.length - 1]

      // Discard entries without model name
      if (!modelName || modelName.trim() === '') {
        return null
      }

      // Discard entries with empty or NA mode
      const mode = data.mode
      if (
        !mode ||
        mode.trim() === '' ||
        mode.toLowerCase() === 'na' ||
        mode.toLowerCase() === 'n/a'
      ) {
        return null
      }

      // Discard entries without valid pricing
      if (!hasValidPricing(data)) {
        return null
      }

      // Normalize pricing to per-token format
      const normalizedData: ModelData = {
        ...data,
        input_cost_per_token: normalizeCostPerToken(data.input_cost_per_token),
        output_cost_per_token: normalizeCostPerToken(data.output_cost_per_token),
      }

      // Re-check pricing after normalization (should still be valid)
      if (!hasValidPricing(normalizedData)) {
        return null
      }

      // Use model name as-is without title case conversion
      const displayName = modelName

      // Create URL-friendly slug from model name only (for nested routes)
      // Replace both : and @ with - for URL safety
      const slug = modelName.replace(/[:@]/g, '-').toLowerCase()

      return {
        id,
        name: modelName,
        provider: normalizedData.provider,
        data: normalizedData,
        slug,
        displayName,
      }
    })
    .filter((model): model is ProcessedModel => model !== null)
}

async function main() {
  console.log('Fetching model data from', BIFROST_API_URL)

  const response = await fetch(BIFROST_API_URL)
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`)
  }

  const rawData: ModelEntry = await response.json()
  console.log(`Fetched ${Object.keys(rawData).length} raw model entries`)

  const processedModels = processModels(rawData)
  console.log(`Processed ${processedModels.length} valid models`)

  // Get unique providers from valid models only
  const providers = Array.from(new Set(processedModels.map((m) => m.provider)))
    .filter((p) => p)
    .sort()
  console.log(`Found ${providers.length} unique providers`)

  // Get unique modes from valid models only
  const modes = Array.from(new Set(processedModels.map((m) => m.data.mode)))
    .filter((m) => m && m.trim() !== '')
    .sort()
  console.log(`Found ${modes.length} unique modes`)

  // Generate TypeScript file content
  const fileContent = `// Auto-generated file - DO NOT EDIT
// Generated at: ${new Date().toISOString()}
// Source: ${BIFROST_API_URL}
// Run \`npm run generate:llm-data\` to regenerate

import type { ModelData, ProcessedModel } from '@/types/model';

export const LLM_MODELS: ProcessedModel[] = ${JSON.stringify(processedModels, null, 2)} as const;

export const LLM_PROVIDERS: string[] = ${JSON.stringify(providers, null, 2)};

export const LLM_MODES: string[] = ${JSON.stringify(modes, null, 2)};

// Helper maps for quick lookups
export const MODELS_BY_SLUG = new Map<string, ProcessedModel>(
  LLM_MODELS.map(model => [model.slug, model])
);

export const MODELS_BY_PROVIDER = new Map<string, ProcessedModel[]>();
for (const model of LLM_MODELS) {
  const existing = MODELS_BY_PROVIDER.get(model.provider) || [];
  existing.push(model);
  MODELS_BY_PROVIDER.set(model.provider, existing);
}

// Stats
export const LLM_STATS = {
  totalModels: ${processedModels.length},
  totalProviders: ${providers.length},
  totalModes: ${modes.length},
  generatedAt: '${new Date().toISOString()}',
};
`

  // Write the file
  const fs = await import('fs/promises')
  const path = await import('path')

  const outputPath = path.join(process.cwd(), 'src/data/llm-models.ts')

  // Ensure directory exists
  await fs.mkdir(path.dirname(outputPath), { recursive: true })

  await fs.writeFile(outputPath, fileContent, 'utf-8')
  console.log(`\nGenerated: ${outputPath}`)
  console.log('Done!')
}

main().catch(console.error)
