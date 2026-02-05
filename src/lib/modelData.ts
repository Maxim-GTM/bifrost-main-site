import { ModelDetails, ModelMode, ModelPricing } from '@/types/modelPricing'

/**
 * Transforms the raw API data to ensure provider field is set
 *
 * @param data The raw model pricing data
 * @returns Transformed model pricing data with provider field
 */
export function transformData(data: ModelPricing): ModelPricing {
  return Object.entries(data).reduce((acc, [modelName, details]) => {
    // Skip any non-object entries or testing samples
    if (!details || typeof details !== 'object' || modelName === 'sample_spec') {
      return acc
    }

    // Add provider field that maps to litellm_provider
    acc[modelName] = {
      ...details,
      provider: details.litellm_provider,
      litellm_provider: undefined,
    }
    return acc
  }, {} as ModelPricing)
}

/**
 * Filter model data by provider
 *
 * @param data The full model pricing data
 * @param provider The provider to filter by (e.g., 'openai', 'anthropic')
 * @returns Filtered model pricing data
 */
export function filterByProvider(data: ModelPricing, provider: string): ModelPricing {
  return Object.entries(data)
    .filter(([, details]) => details.provider === provider || details.litellm_provider === provider)
    .reduce((acc, [modelName, details]) => {
      acc[modelName] = details
      return acc
    }, {} as ModelPricing)
}

/**
 * Filter model data by mode
 *
 * @param data The full model pricing data
 * @param mode The mode to filter by (e.g., 'chat', 'embedding')
 * @returns Filtered model pricing data
 */
export function filterByMode(data: ModelPricing, mode: ModelMode): ModelPricing {
  return Object.entries(data)
    .filter(([, details]) => details.mode === mode)
    .reduce((acc, [modelName, details]) => {
      acc[modelName] = details
      return acc
    }, {} as ModelPricing)
}

/**
 * Filter model data by capability
 *
 * @param data The full model pricing data
 * @param capability The capability to filter by (e.g., 'vision', 'function_calling')
 * @returns Filtered model pricing data
 */
export function filterByCapability(
  data: ModelPricing,
  capability: keyof Pick<
    ModelDetails,
    | 'supports_vision'
    | 'supports_function_calling'
    | 'supports_audio_input'
    | 'supports_audio_output'
    | 'supports_reasoning'
    | 'supports_web_search'
  >
): ModelPricing {
  return Object.entries(data)
    .filter(([, details]) => details[capability] === true)
    .reduce((acc, [modelName, details]) => {
      acc[modelName] = details
      return acc
    }, {} as ModelPricing)
}

/**
 * Sort models by input cost (ascending)
 *
 * @param data The model pricing data to sort
 * @returns Sorted model pricing data
 */
export function sortByInputCost(data: ModelPricing): [string, ModelDetails][] {
  return Object.entries(data).sort(
    ([, detailsA], [, detailsB]) => detailsA.input_cost_per_token - detailsB.input_cost_per_token
  )
}

/**
 * Sort models by output cost (ascending)
 *
 * @param data The model pricing data to sort
 * @returns Sorted model pricing data
 */
export function sortByOutputCost(data: ModelPricing): [string, ModelDetails][] {
  return Object.entries(data).sort(
    ([, detailsA], [, detailsB]) => detailsA.output_cost_per_token - detailsB.output_cost_per_token
  )
}

/**
 * Get unique providers from the model data
 *
 * @param data The full model pricing data
 * @returns Array of unique provider names
 */
export function getUniqueProviders(data: ModelPricing): string[] {
  return (
    [
      ...new Set(
        Object.values(data)
          .filter((details) => details.provider !== undefined)
          .map((details) => details.provider)
      ),
    ] as string[]
  ).sort()
}

/**
 * Calculates the estimated cost for a given number of input and output tokens
 *
 * @param model The model details
 * @param inputTokens Number of input tokens
 * @param outputTokens Number of output tokens
 * @returns The estimated cost in USD
 */
export function calculateCost(
  model: ModelDetails,
  inputTokens: number,
  outputTokens: number
): number {
  const inputCost = inputTokens * model.input_cost_per_token
  const outputCost = outputTokens * model.output_cost_per_token
  return inputCost + outputCost
}

/**
 * Check if a model is deprecated
 *
 * @param model The model details
 * @returns Boolean indicating if the model is deprecated
 */
export function isModelDeprecated(model: ModelDetails): boolean {
  if (!model.deprecation_date) return false

  const today = new Date()
  const deprecationDate = new Date(model.deprecation_date)
  return today >= deprecationDate
}
