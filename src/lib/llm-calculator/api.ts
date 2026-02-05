// Static data access for LLM models
// Uses pre-generated data from scripts/generate-llm-data.ts

import { ProcessedModel, ModelEntry, ModelData } from '@/types/model';
import {
    LLM_MODELS,
    LLM_PROVIDERS,
    LLM_MODES,
    MODELS_BY_SLUG,
    MODELS_BY_PROVIDER,
    LLM_STATS
} from '@/data/llm-models';

// Re-export the static data
export { LLM_MODELS, LLM_PROVIDERS, LLM_MODES, LLM_STATS };

/**
 * Get all processed models (static data)
 */
export function getAllModels(): ProcessedModel[] {
    return LLM_MODELS;
}

/**
 * Get all providers
 */
export function getAllProviders(): string[] {
    return LLM_PROVIDERS;
}

/**
 * Get all modes
 */
export function getAllModes(): string[] {
    return LLM_MODES;
}

/**
 * Get a model by its slug
 */
export function getModelBySlug(slug: string, provider?: string): ProcessedModel | undefined {
    if (provider) {
        // If provider is specified, find within that provider's models
        const providerModels = MODELS_BY_PROVIDER.get(provider);
        if (providerModels) {
            return providerModels.find(m => m.slug === slug);
        }
        return undefined;
    }
    return MODELS_BY_SLUG.get(slug);
}

/**
 * Get all models for a specific provider
 */
export function getModelsByProvider(provider: string): ProcessedModel[] {
    return MODELS_BY_PROVIDER.get(provider) || [];
}

/**
 * Get all models with the same display name (for mode selector)
 */
export function getModelsByDisplayName(displayName: string): ProcessedModel[] {
    return LLM_MODELS.filter(model =>
        model.displayName.toLowerCase() === displayName.toLowerCase()
    );
}

/**
 * Format provider name for display
 */
export function formatProviderName(provider: string): string {
    const providerMap: Record<string, string> = {
        openai: 'OpenAI',
        anthropic: 'Anthropic',
        azure: 'Azure',
        'azure_ai': 'Azure AI',
        google: 'Google',
        cohere: 'Cohere',
        perplexity: 'Perplexity',
        fireworks_ai: 'Fireworks AI',
        together_ai: 'Together AI',
        anyscale: 'Anyscale',
        deepinfra: 'DeepInfra',
        groq: 'Groq',
        mistral: 'Mistral',
        voyage: 'Voyage',
        bedrock: 'AWS Bedrock',
        sagemaker: 'AWS SageMaker',
        vertex_ai: 'Vertex AI',
        'vertex_ai-text-models': 'Vertex AI',
        'vertex_ai-code-text-models': 'Vertex AI',
        'vertex_ai-language-models': 'Vertex AI',
        'vertex_ai-vision-models': 'Vertex AI',
        'vertex_ai-chat-models': 'Vertex AI',
        'vertex_ai-code-chat-models': 'Vertex AI',
        'vertex_ai-embedding-models': 'Vertex AI',
        'vertex_ai-image-models': 'Vertex AI',
        'vertex_ai-anthropic_models': 'Vertex AI (Anthropic)',
        'vertex_ai-llama-models': 'Vertex AI (Llama)',
        'vertex_ai-mistral_models': 'Vertex AI (Mistral)',
        palm: 'PaLM',
        ai21: 'AI21',
        nlp_cloud: 'NLP Cloud',
        replicate: 'Replicate',
        aleph_alpha: 'Aleph Alpha',
        huggingface: 'Hugging Face',
        ollama: 'Ollama',
        baseten: 'Baseten',
        openrouter: 'OpenRouter',
        custom_openai: 'Custom OpenAI',
        petals: 'Petals',
        deepseek: 'DeepSeek',
        codestral: 'Codestral',
        text_completion_codestral: 'Codestral',
        cerebras: 'Cerebras',
        sambanova: 'SambaNova',
        xai: 'xAI',
        text_completion_openai: 'OpenAI',
        lm_studio: 'LM Studio',
        gemini: 'Google Gemini',
        cloudflare: 'Cloudflare',
        databricks: 'Databricks',
        friendliai: 'FriendliAI',
        triton: 'Triton',
        predibase: 'Predibase',
        empower: 'Empower',
        github: 'GitHub',
        litellm_proxy: 'LiteLLM',
        hosted_vllm: 'vLLM',
        volcengine: 'Volcengine',
        codegpt: 'CodeGPT',
        jina_ai: 'Jina AI',
        nvidia_nim: 'NVIDIA NIM',
        watsonx: 'IBM watsonx',
        watsonx_text: 'IBM watsonx',
        topaz: 'Topaz AI',
        infinity: 'Infinity',
        galadriel: 'Galadriel',
        assemblyai: 'AssemblyAI',
    };

    return providerMap[provider.toLowerCase()] || provider
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

/**
 * Search models by query
 */
export function searchModels(query: string, provider?: string): ProcessedModel[] {
    const lowerQuery = query.toLowerCase();
    let models = provider ? getModelsByProvider(provider) : LLM_MODELS;

    return models.filter(model =>
        model.name.toLowerCase().includes(lowerQuery) ||
        model.displayName.toLowerCase().includes(lowerQuery) ||
        model.provider.toLowerCase().includes(lowerQuery)
    );
}

/**
 * Filter models by mode
 */
export function filterModelsByMode(models: ProcessedModel[], mode: string): ProcessedModel[] {
    return models.filter(model => model.data.mode === mode);
}

/**
 * Get provider stats (model counts)
 */
export function getProviderStats(): Array<{ name: string; count: number }> {
    const stats: Array<{ name: string; count: number }> = [];

    for (const provider of LLM_PROVIDERS) {
        const models = MODELS_BY_PROVIDER.get(provider);
        if (models && models.length > 0) {
            stats.push({ name: provider, count: models.length });
        }
    }

    return stats.sort((a, b) => b.count - a.count);
}
