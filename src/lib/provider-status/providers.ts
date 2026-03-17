/**
 * Provider Status Page Configuration
 *
 * Maps AI providers to their status page APIs.
 * Supports multiple status page platforms:
 * - Statuspage.io (Atlassian) — most common
 * - BetterStack (Better Uptime)
 * - Instatus
 * - OnlineOrNot
 */

export type StatusPagePlatform = 'statuspage' | 'betterstack' | 'instatus' | 'onlineornot' | 'none'

export interface StatusProviderConfig {
  /** URL slug used in routes */
  id: string
  /** Display name */
  name: string
  /** Short description of services */
  description: string
  /** Public status page URL (for linking) */
  statusPageUrl: string
  /** API base URL for fetching data */
  apiBaseUrl: string | null
  /** Platform type for choosing the right adapter */
  platform: StatusPagePlatform
  /** Search aliases for SEO (e.g., "chatgpt", "claude") */
  aliases: string[]
  /** Path to provider logo in /public */
  logoPath: string
}

export const STATUS_PROVIDERS: StatusProviderConfig[] = [
  // ============================================================
  // Statuspage.io Providers (10)
  // ============================================================
  {
    id: 'openai',
    name: 'OpenAI',
    description:
      'ChatGPT, GPT-4o, GPT-4, o1, o3, DALL-E, Whisper, and OpenAI API platform services.',
    statusPageUrl: 'https://status.openai.com',
    apiBaseUrl: 'https://status.openai.com/api/v2',
    platform: 'statuspage',
    aliases: [
      'chatgpt',
      'gpt-4',
      'gpt-4o',
      'gpt',
      'o1',
      'o3',
      'dall-e',
      'whisper',
      'openai api',
    ],
    logoPath: '/provider-logo/openai.svg',
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    description:
      'Claude 4, Claude 3.5, Claude API, Claude Code, and all Anthropic platform services.',
    statusPageUrl: 'https://status.claude.com',
    apiBaseUrl: 'https://status.claude.com/api/v2',
    platform: 'statuspage',
    aliases: [
      'claude',
      'claude-4',
      'claude-3',
      'claude-3.5',
      'claude sonnet',
      'claude opus',
      'claude haiku',
      'claude code',
      'anthropic api',
    ],
    logoPath: '/provider-logo/anthropic.svg',
  },
  {
    id: 'cohere',
    name: 'Cohere',
    description:
      'Command R+, Command R, Embed, Rerank, Coral, and Cohere API services.',
    statusPageUrl: 'https://status.cohere.com',
    apiBaseUrl: 'https://status.cohere.com/api/v2',
    platform: 'statuspage',
    aliases: ['cohere', 'command-r', 'cohere api', 'coral'],
    logoPath: '/provider-logo/cohere.svg',
  },
  {
    id: 'groq',
    name: 'Groq',
    description:
      'Groq LPU inference engine, GroqCloud API, and Groq platform services.',
    statusPageUrl: 'https://groqstatus.com',
    apiBaseUrl: 'https://groqstatus.com/api/v2',
    platform: 'statuspage',
    aliases: ['groq', 'groqcloud', 'groq api', 'groq lpu'],
    logoPath: '/provider-logo/groq.svg',
  },
  {
    id: 'azure',
    name: 'Azure AI',
    description:
      'Microsoft Azure OpenAI Service, Azure AI Foundry, and Azure cloud AI infrastructure.',
    statusPageUrl: 'https://status.ai.azure.com',
    apiBaseUrl: 'https://status.ai.azure.com/api/v2',
    platform: 'statuspage',
    aliases: [
      'azure openai',
      'azure ai',
      'azure',
      'microsoft azure',
      'azure api',
      'azure foundry',
    ],
    logoPath: '/provider-logo/azure.svg',
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    description:
      'ElevenLabs text-to-speech, voice cloning, speech-to-text, and audio AI services.',
    statusPageUrl: 'https://status.elevenlabs.io',
    apiBaseUrl: 'https://status.elevenlabs.io/api/v2',
    platform: 'statuspage',
    aliases: ['elevenlabs', 'eleven labs', 'elevenlabs api'],
    logoPath: '/provider-logo/elevenlabs.svg',
  },
  {
    id: 'cerebras',
    name: 'Cerebras',
    description:
      'Cerebras AI inference platform, developer console, and Cerebras cloud services.',
    statusPageUrl: 'https://status.cerebras.ai',
    apiBaseUrl: 'https://status.cerebras.ai/api/v2',
    platform: 'statuspage',
    aliases: ['cerebras', 'cerebras ai', 'cerebras api'],
    logoPath: '/provider-logo/cerebras.svg',
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    description:
      'DeepSeek API, DeepSeek Chat, and DeepSeek AI platform services.',
    statusPageUrl: 'https://status.deepseek.com',
    apiBaseUrl: 'https://status.deepseek.com/api/v2',
    platform: 'statuspage',
    aliases: ['deepseek', 'deepseek api', 'deepseek chat', 'deepseek v3', 'deepseek r1'],
    logoPath: '/provider-logo/unknown.svg',
  },
  {
    id: 'stability-ai',
    name: 'Stability AI',
    description:
      'Stable Diffusion, Stability AI platform, and image generation API services.',
    statusPageUrl: 'https://status.stability.ai',
    apiBaseUrl: 'https://status.stability.ai/api/v2',
    platform: 'statuspage',
    aliases: ['stability ai', 'stable diffusion', 'stability api', 'sdxl'],
    logoPath: '/provider-logo/unknown.svg',
  },
  {
    id: 'replicate',
    name: 'Replicate',
    description:
      'Replicate model hosting, inference API, and machine learning platform services.',
    statusPageUrl: 'https://www.replicatestatus.com',
    apiBaseUrl: 'https://www.replicatestatus.com/api/v2',
    platform: 'statuspage',
    aliases: ['replicate', 'replicate api'],
    logoPath: '/provider-logo/unknown.svg',
  },

  // ============================================================
  // BetterStack Providers (3)
  // ============================================================
  {
    id: 'together-ai',
    name: 'Together AI',
    description:
      'Together AI inference platform, fine-tuning, and API services for open-source models.',
    statusPageUrl: 'https://status.together.ai',
    apiBaseUrl: 'https://status.together.ai',
    platform: 'betterstack',
    aliases: ['together ai', 'together', 'together api'],
    logoPath: '/provider-logo/together.svg',
  },
  {
    id: 'fireworks-ai',
    name: 'Fireworks AI',
    description:
      'Fireworks AI inference platform and API services for open-source and proprietary models.',
    statusPageUrl: 'https://status.fireworks.ai',
    apiBaseUrl: 'https://status.fireworks.ai',
    platform: 'betterstack',
    aliases: ['fireworks ai', 'fireworks', 'fireworks api'],
    logoPath: '/provider-logo/fireworks.svg',
  },
  {
    id: 'huggingface',
    name: 'Hugging Face',
    description:
      'Hugging Face Hub, Inference Endpoints, Spaces, and model hosting services.',
    statusPageUrl: 'https://status.huggingface.co',
    apiBaseUrl: 'https://status.huggingface.co',
    platform: 'betterstack',
    aliases: ['hugging face', 'huggingface', 'hf', 'huggingface api'],
    logoPath: '/provider-logo/huggingface.svg',
  },

  // ============================================================
  // Instatus Provider (1)
  // ============================================================
  {
    id: 'perplexity',
    name: 'Perplexity',
    description:
      'Perplexity AI search, Sonar models, and Perplexity API services.',
    statusPageUrl: 'https://status.perplexity.com',
    apiBaseUrl: 'https://status.perplexity.com',
    platform: 'instatus',
    aliases: ['perplexity', 'perplexity ai', 'sonar', 'perplexity api'],
    logoPath: '/provider-logo/perplexity.svg',
  },

  // ============================================================
  // OnlineOrNot Provider (1)
  // ============================================================
  {
    id: 'openrouter',
    name: 'OpenRouter',
    description:
      'OpenRouter unified API gateway for accessing multiple AI model providers.',
    statusPageUrl: 'https://status.openrouter.ai',
    apiBaseUrl: 'openrouter',
    platform: 'onlineornot',
    aliases: ['openrouter', 'open router', 'openrouter api'],
    logoPath: '/provider-logo/openrouter.svg',
  },

]

/**
 * Get a provider config by its URL slug
 */
export function getProviderById(id: string): StatusProviderConfig | undefined {
  return STATUS_PROVIDERS.find((p) => p.id === id)
}

/**
 * Get a provider config by any alias match
 */
export function getProviderByAlias(query: string): StatusProviderConfig | undefined {
  const lower = query.toLowerCase().trim()
  return STATUS_PROVIDERS.find(
    (p) =>
      p.id === lower ||
      p.name.toLowerCase() === lower ||
      p.aliases.some((a) => a.toLowerCase() === lower)
  )
}

/**
 * Get all provider IDs
 */
export function getAllProviderIds(): string[] {
  return STATUS_PROVIDERS.map((p) => p.id)
}
