/**
 * Type definitions for the LiteLLM model pricing and capabilities data
 * Based on https://raw.githubusercontent.com/BerriAI/litellm/refs/heads/main/litellm/model_prices_and_context_window_backup.json
 */

/**
 * Main interface for model pricing data
 * Maps model names to their detailed specifications
 */
export interface ModelPricing {
  [modelName: string]: ModelDetails
}

/**
 * Detailed specifications for a model including pricing, capabilities, and limitations
 */
export interface ModelDetails {
  /**
   * LEGACY parameter. Set to max_output_tokens if provider specifies it.
   * If not set to max_input_tokens, if provider specifies it.
   */
  max_tokens?: number | string

  /** Maximum input tokens, if the provider specifies it. If not provided, defaults to max_tokens */
  max_input_tokens?: number | string

  /** Maximum output tokens, if the provider specifies it. If not provided, defaults to max_tokens */
  max_output_tokens?: number | string

  /** Cost per token for input in USD */
  input_cost_per_token: number

  /** Cost per token for output in USD */
  output_cost_per_token: number

  /** Cost per token for reasoning output in USD */
  output_cost_per_reasoning_token: number

  /** Cost per token for audio input in USD */
  input_cost_per_audio_token: number

  /** Provider name as defined in https://docs.litellm.ai/docs/providers */
  provider: string | undefined

  /** @deprecated Use provider instead */
  litellm_provider: string | undefined

  /**
   * Model's primary capability/function mode
   * One of: chat, embedding, completion, image_generation, audio_transcription,
   * audio_speech, image_generation, moderation, rerank
   */
  mode: ModelMode

  /** Whether the model supports function calling (tool use) */
  supports_function_calling?: boolean

  /** Whether the model supports parallel function calling (multiple tool use) */
  supports_parallel_function_calling?: boolean

  /** Whether the model supports vision/image input capabilities */
  supports_vision?: boolean

  /** Whether the model supports audio input */
  supports_audio_input?: boolean

  /** Whether the model supports audio output (text-to-speech) */
  supports_audio_output?: boolean

  /** Whether the model supports prompt caching for improved performance */
  supports_prompt_caching?: boolean

  /** Whether the model supports response schema (structured output) */
  supports_response_schema?: boolean

  /** Whether the model supports system messages */
  supports_system_messages?: boolean

  /** Whether the model supports reasoning capabilities (e.g., step-by-step thinking) */
  supports_reasoning?: boolean

  /** Whether the model supports web search integration */
  supports_web_search?: boolean

  /**
   * Costs for search context at different sizes in USD
   * Relevant for models that support web search
   */
  search_context_cost_per_query?: SearchContextCosts

  /** Cost per 1,000 calls for file search in USD */
  file_search_cost_per_1k_calls?: number

  /** Cost per GB per day for file search in USD */
  file_search_cost_per_gb_per_day?: number

  /** Cost per GB per day for vector store in USD */
  vector_store_cost_per_gb_per_day?: number

  /** Cost per 1,000 tokens for computer use input in USD */
  computer_use_input_cost_per_1k_tokens?: number

  /** Cost per 1,000 tokens for computer use output in USD */
  computer_use_output_cost_per_1k_tokens?: number

  /** Cost per session for code interpreter in USD */
  code_interpreter_cost_per_session?: number

  /** Regions where the model is supported */
  supported_regions?: string[]

  /** Date when the model becomes deprecated in the format YYYY-MM-DD */
  deprecation_date?: string
}

/**
 * Costs for search context at different sizes
 */
export interface SearchContextCosts {
  /** Cost for low context size in USD */
  search_context_size_low: number

  /** Cost for medium context size in USD */
  search_context_size_medium: number

  /** Cost for high context size in USD */
  search_context_size_high: number
}

/**
 * The primary capability/function mode of a model
 */
export type ModelMode =
  | 'chat'
  | 'embedding'
  | 'completion'
  | 'image_generation'
  | 'audio_transcription'
  | 'audio_speech'
  | 'moderation'
  | 'rerank'
