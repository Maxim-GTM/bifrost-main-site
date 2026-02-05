import { getModelBySlug, getModelsByDisplayName, formatProviderName } from '@/lib/llm-calculator/api';
import { getModeDisplayName } from '@/lib/llm-calculator/calculator';
import Calculator from '@/components/llm-calculator/Calculator';
import CTA2 from '@/components/llm-calculator/CTA2';
import { Breadcrumbs } from '@/components/llm-calculator/Breadcrumbs';
import { Navbar } from '@/components/Navbar';
import PrimaryButton from '@/components/ui/PrimaryButton';
import SecondaryButton from '@/components/ui/SecondaryButton';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { buildCanonicalUrl } from '@/lib/llm-calculator/seo';
import { Footer } from '@/components/sections';
import { getCostCalculatorBaseUrl } from '@/lib/utils';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

/**
 * Check if a model is a coding model based on its name
 */
function isCodingModel(modelName: string): boolean {
    const lowerName = modelName.toLowerCase();
    const codingKeywords = [
        'code', 'coding', 'codellama', 'starcoder', 'wizardcoder',
        'deepseek-coder', 'deepseekcoder', 'phind', 'qwen-coder',
        'qwencode', 'codeqwen', 'granite-code', 'granitecode',
        'magicoder', 'octocoder', 'xcode', 'codegen', 'incoder',
        'polycoder', 'santacoder', 'thebloke', 'codebooga',
        'codeup', 'codegpt', 'codex', 'copilot', 'tabby',
        'continue', 'cursor', 'replit', 'codesage', 'codeium',
        'codegeex', 'codebert',
    ];
    return codingKeywords.some(keyword => lowerName.includes(keyword));
}

function normalizeForSignals(...parts: Array<string | undefined | null>): string {
    return parts.filter(Boolean).join(' ').toLowerCase();
}

function detectSpecialization(params: {
    mode: string;
    displayName: string;
    id: string;
}): ModelSpecialization {
    const mode = (params.mode || '').toLowerCase();
    const name = normalizeForSignals(params.displayName, params.id);

    // Mode-first: if Bifrost labels it explicitly, trust that.
    if (mode === 'embedding') return 'embedding';
    if (mode === 'rerank') return 'rerank';
    if (mode === 'image_generation') return 'image_generation';
    if (mode === 'video_generation') return 'video_generation';
    if (mode === 'ocr') return 'ocr';
    if (mode === 'audio_transcription') return 'audio_transcription';
    if (mode === 'audio_speech') return 'audio_speech';
    if (mode === 'audio_generation' || mode === 'voice') return 'audio_generation';
    if (mode === 'completion') return 'completion';

    // Name markers (fallbacks) for older / inconsistent mode labels.
    if (/\brerank\b|\branker\b|re-?rank|cross-encoder/.test(name)) return 'rerank';
    if (/\bembed\b|\bembedding\b|vector|text-embedding/.test(name)) return 'embedding';
    if (/\bocr\b|optical character recognition/.test(name)) return 'ocr';
    if (/\btts\b|text[-\s]?to[-\s]?speech|speech synthesis|synthesize|voice/.test(name)) return 'audio_speech';
    if (/\btranscrib|\btranscription\b|speech[-\s]?to[-\s]?text|\bstt\b|\bwhisper\b/.test(name)) return 'audio_transcription';
    if (/\bimage\b|stable[-\s]?diffusion|\bsd\b|dall[-\s]?e|imagen|flux/.test(name)) return 'image_generation';
    if (/\bvideo\b/.test(name)) return 'video_generation';

    return 'general';
}

interface PageProps {
    params: Promise<{ provider: string; slug: string }>;
}

// Define model specialization types for SEO content
type ModelSpecialization =
    | 'chat'
    | 'embedding'
    | 'coding'
    | 'audio_transcription'
    | 'audio_speech'
    | 'audio_generation'
    | 'image_generation'
    | 'video_generation'
    | 'ocr'
    | 'rerank'
    | 'completion'
    | 'voice'
    | 'general';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { provider, slug } = await params;
    const decodedProvider = decodeURIComponent(provider);
    const model = getModelBySlug(slug, decodedProvider);

    if (!model) {
        return {
            title: 'Model Not Found',
        };
    }

    const providerDisplayName = formatProviderName(decodedProvider);
    const title = `${model.displayName} Cost Calculator - ${providerDisplayName} | Bifrost`;
    const modeLabel = getModeDisplayName(model.data.mode) || model.data.mode;
    const canonical = buildCanonicalUrl(`${getCostCalculatorBaseUrl()}/llm-cost-calculator/provider/${encodeURIComponent(decodedProvider)}/model/${slug}`);

    // Build detailed pricing parts for description
    const priceParts: string[] = [];
    if (model.data.input_cost_per_token != null) {
        priceParts.push(`Input: $${(model.data.input_cost_per_token * 1_000_000).toFixed(2)} per 1M tokens`);
    }
    if (model.data.output_cost_per_token != null) {
        priceParts.push(`Output: $${(model.data.output_cost_per_token * 1_000_000).toFixed(2)} per 1M tokens`);
    }
    if (model.data.input_cost_per_image != null) {
        priceParts.push(`Input image: $${model.data.input_cost_per_image.toFixed(4)} per image`);
    }
    if (model.data.output_cost_per_image != null) {
        priceParts.push(`Output image: $${model.data.output_cost_per_image.toFixed(4)} per image`);
    }
    if (model.data.input_cost_per_second != null) {
        priceParts.push(`Input audio: $${model.data.input_cost_per_second.toFixed(4)} per second`);
    }
    if (model.data.output_cost_per_second != null) {
        priceParts.push(`Output audio/video: $${model.data.output_cost_per_second.toFixed(4)} per second`);
    }
    if (model.data.ocr_cost_per_page != null) {
        priceParts.push(`OCR: $${model.data.ocr_cost_per_page.toFixed(4)} per page`);
    }

    const description = `Calculate the cost of using ${model.displayName} from ${providerDisplayName} for ${modeLabel} workloads. ${priceParts.length ? priceParts.join(', ') : 'Pricing details are not available for this model.'}`;

    return {
        title,
        description,
        keywords: `${model.displayName}, ${providerDisplayName}, LLM cost, AI pricing, ${model.data.mode} calculator`,
        alternates: {
            canonical,
        },
        openGraph: {
            title,
            description,
            type: 'website',
        },
        twitter: {
            card: 'summary',
            title,
            description,
        },
    };
}

// Generate SEO content based on model signals
function generateContentData(model: ReturnType<typeof getModelBySlug>) {
    if (!model) return null;

    const data = model.data;
    const mode = data.mode;
    const providerName = formatProviderName(model.provider);
    const modeDisplayName = getModeDisplayName(mode) || (mode || '');
    const isCoding = isCodingModel(model.displayName);
    const specialization = detectSpecialization({ mode, displayName: model.displayName, id: model.id });
    const isEmbedding = specialization === 'embedding';

    // Comprehensive signals
    const hasLongContext = (data.max_input_tokens ?? 0) >= 100_000;
    const isOutputExpensive =
        data.output_cost_per_token &&
        data.input_cost_per_token &&
        data.output_cost_per_token > data.input_cost_per_token * 2;
    const isInputCheap =
        data.input_cost_per_token &&
        data.input_cost_per_token < 0.000002;
    const isMultimodal =
        data.supports_vision ||
        data.supports_audio_input ||
        data.supports_audio_output;
    const supportsTools = !!data.supports_function_calling;
    const supportsReasoning = !!data.supports_reasoning;

    const signals = {
        hasVision: data.supports_vision || false,
        hasFunctionCalling: data.supports_function_calling || false,
        hasReasoning: data.supports_reasoning || false,
        hasWebSearch: data.supports_web_search || false,
        hasAudioInput: data.supports_audio_input || false,
        hasAudioOutput: data.supports_audio_output || false,
        hasPromptCaching: data.supports_prompt_caching || false,
        hasParallelFunctionCalling: data.supports_parallel_function_calling || false,
        hasSystemMessages: data.supports_system_messages || false,
        hasResponseSchema: data.supports_response_schema || false,
        isCoding,
        isEmbedding,
        isRerank: specialization === 'rerank',
        isImageGeneration: specialization === 'image_generation',
        isVideoGeneration: specialization === 'video_generation',
        isOCR: specialization === 'ocr',
        isAudioTranscription: specialization === 'audio_transcription',
        isAudioSpeech: specialization === 'audio_speech',
        isAudioGeneration: specialization === 'audio_generation',
        isCompletion: specialization === 'completion',
        isGeneral: specialization === 'general',
        specialization,
        hasLongContext,
        isOutputExpensive: isOutputExpensive || false,
        isInputCheap: isInputCheap || false,
        isMultimodal: isMultimodal || false,
        supportsTools,
        supportsReasoning,
    };

    // Pricing units (comprehensive)
    const inputCostPer1M = data.input_cost_per_token ? data.input_cost_per_token * 1000000 : null;
    const outputCostPer1M = data.output_cost_per_token ? data.output_cost_per_token * 1000000 : null;
    const pricingUnits = {
        tokenInputPer1M: inputCostPer1M,
        tokenOutputPer1M: outputCostPer1M,
        perImageInput: data.input_cost_per_image ?? null,
        perImageOutput: data.output_cost_per_image ?? null,
        perSecondInput: data.input_cost_per_second ?? null,
        perSecondOutput: data.output_cost_per_second ?? null,
        perPageOCR: data.ocr_cost_per_page ?? null,
    };

    // Model type and application type
    const modelType =
        specialization === 'audio_speech' ? 'text-to-speech (TTS)' :
            specialization === 'audio_transcription' ? 'speech-to-text (transcription)' :
                specialization === 'rerank' ? 'reranking' :
                    specialization === 'embedding' ? 'embedding and vector search' :
                        specialization === 'image_generation' ? 'image generation' :
                            specialization === 'video_generation' ? 'video generation' :
                                specialization === 'ocr' ? 'OCR and document extraction' :
                                    isCoding ? 'coding and software development' :
                                        specialization === 'completion' ? 'text completion' :
                                            'general-purpose AI';

    const applicationType = isCoding
        ? 'code generation, code completion, debugging, and software development tasks'
        : isEmbedding
            ? 'semantic search, similarity matching, recommendation systems, and vector-based applications'
            : specialization === 'audio_speech'
                ? 'voice assistants, narration, and audio response generation'
                : specialization === 'audio_transcription'
                    ? 'meeting transcription, call analytics, and captioning workflows'
                    : specialization === 'rerank'
                        ? 'search relevance improvements and RAG reranking'
                        : specialization === 'image_generation'
                            ? 'prompt-to-image creative workflows and image-heavy content pipelines'
                            : specialization === 'video_generation'
                                ? 'duration-based video generation workflows'
                                : specialization === 'ocr'
                                    ? 'document OCR, form extraction, and searchable archives'
                                    : specialization === 'completion'
                                        ? 'batch prompt-to-text generation and templated outputs'
                                        : 'general-purpose AI workloads';

    // Generate introduction
    let introduction = `${model.displayName} is a powerful ${(modeDisplayName || mode || '').toLowerCase()} AI model offered by ${providerName}. This comprehensive guide provides detailed pricing information, technical specifications, and capabilities to help you understand the costs and features of using ${model.displayName} in your ${isCoding ? 'development' : isEmbedding ? 'embedding' : ''} applications.`;

    // Generate recommended use cases based on signals
    const recommendedUseCases: string[] = [];
    if (signals.isAudioSpeech) {
        recommendedUseCases.push('Text-to-speech (TTS) voice assistants and narration');
        recommendedUseCases.push('IVR systems and customer support voice responses');
        recommendedUseCases.push('Generating spoken audio from short scripts or prompts');
    } else if (signals.isAudioTranscription) {
        recommendedUseCases.push('Speech-to-text (STT) transcription for meetings and calls');
        recommendedUseCases.push('Captioning and subtitle generation');
        recommendedUseCases.push('Audio analytics pipelines (keywording, searchable archives)');
    } else if (signals.isRerank) {
        recommendedUseCases.push('Search reranking for RAG pipelines');
        recommendedUseCases.push('Improving relevance for semantic search results');
        recommendedUseCases.push('Reordering candidate documents or passages before generation');
    } else if (signals.isImageGeneration) {
        recommendedUseCases.push('Image generation from prompts (creative and product mockups)');
        recommendedUseCases.push('Variant generation and iterative creative workflows');
        recommendedUseCases.push('Image-heavy content pipelines (ads, thumbnails, concepts)');
    } else if (signals.isVideoGeneration) {
        recommendedUseCases.push('Video generation workflows (prompt-to-video or storyboard-to-video)');
        recommendedUseCases.push('Short-form creative exploration and variants');
        recommendedUseCases.push('Automated video content pipelines where duration-based pricing matters');
    } else if (signals.isOCR) {
        recommendedUseCases.push('Document OCR for scanned PDFs and images');
        recommendedUseCases.push('Form and invoice digitization');
        recommendedUseCases.push('Searchable archives and compliance workflows');
    } else {
        if (signals.isCoding) {
            recommendedUseCases.push('Code generation and completion');
            recommendedUseCases.push('Bug fixing and refactoring');
            recommendedUseCases.push('Developer tooling and IDE assistants');
        }
        if (signals.isEmbedding) {
            recommendedUseCases.push('Semantic search and similarity matching');
            recommendedUseCases.push('RAG pipelines and vector databases');
            recommendedUseCases.push('Document clustering and recommendations');
        }
        if (signals.hasLongContext) {
            recommendedUseCases.push('Long-context chat and document analysis');
            recommendedUseCases.push('Agent workflows with large memory windows');
        }
        if (signals.supportsTools) {
            recommendedUseCases.push('Agentic systems with function or tool calling');
            recommendedUseCases.push('Workflow automation and API orchestration');
        }
        if (signals.isMultimodal) {
            recommendedUseCases.push('Multimodal applications requiring image or audio processing');
            recommendedUseCases.push('Content analysis across multiple media types');
        }
        if (signals.supportsReasoning) {
            recommendedUseCases.push('Complex problem-solving and multi-step reasoning tasks');
            recommendedUseCases.push('Planning and strategic decision-making applications');
        }
        if (signals.isCompletion) {
            recommendedUseCases.push('Single-shot completions and prompt-to-text generation');
            recommendedUseCases.push('Batch processing and templated outputs');
            recommendedUseCases.push('Text transformation tasks (rewrite, extract, format)');
        }
    }
    if (recommendedUseCases.length === 0) {
        recommendedUseCases.push('General-purpose chat and text generation workloads');
    }

    // Generate avoid use cases based on signals
    const avoidUseCases: string[] = [];
    if (signals.isAudioSpeech) {
        avoidUseCases.push('General-purpose chatbots or long-form text generation');
        avoidUseCases.push('Document RAG pipelines (use an embedding or chat model instead)');
        avoidUseCases.push('Complex reasoning or tool-heavy agent workflows');
    } else if (signals.isAudioTranscription) {
        avoidUseCases.push('General-purpose text generation or conversational AI');
        avoidUseCases.push('Image understanding or vision tasks');
        avoidUseCases.push('Use cases where you only need embeddings or reranking');
    } else if (signals.isRerank) {
        avoidUseCases.push('Conversational AI and free-form text generation');
        avoidUseCases.push('Summarization or creative writing workloads');
        avoidUseCases.push('Audio, image, or video generation tasks');
    } else if (signals.isImageGeneration) {
        avoidUseCases.push('Long-form conversational AI');
        avoidUseCases.push('Pure embedding or reranking workloads');
        avoidUseCases.push('Audio transcription or text-to-speech (use audio models)');
    } else if (signals.isVideoGeneration) {
        avoidUseCases.push('General-purpose chat or long-form text generation');
        avoidUseCases.push('Pure embedding or reranking workloads');
        avoidUseCases.push('OCR and document extraction workflows');
    } else if (signals.isOCR) {
        avoidUseCases.push('General-purpose chat or creative writing');
        avoidUseCases.push('Text-to-speech or audio transcription');
        avoidUseCases.push('Image generation workflows');
    } else {
        if (signals.isOutputExpensive) {
            avoidUseCases.push('High-volume text generation where output cost dominates');
            avoidUseCases.push('Streaming or verbose response workloads');
        }
        if (!signals.supportsReasoning) {
            avoidUseCases.push('Complex multi-step reasoning or planning tasks');
        }
        if (!signals.isMultimodal) {
            avoidUseCases.push('Applications requiring image, audio, or multimodal inputs');
        }
        if (!signals.hasLongContext) {
            avoidUseCases.push('Very large documents or long conversational histories');
        }
        if (signals.isEmbedding) {
            avoidUseCases.push('General-purpose text generation or conversational AI');
            avoidUseCases.push('Creative writing or content generation tasks');
        }
        if (signals.isCoding) {
            avoidUseCases.push('Non-technical content generation or general-purpose chat');
            avoidUseCases.push('Creative writing or marketing copy generation');
        }
    }

    // Generate comparison text
    let comparisonText: string;
    if (signals.isAudioSpeech) {
        comparisonText = 'This is a specialized text-to-speech model. When comparing similar options, focus on voice quality, latency, supported languages/voices, and how pricing is split between prompt tokens and audio duration (seconds). It is typically a better fit for voice UX than general chat models.';
    } else if (signals.isAudioTranscription) {
        comparisonText = 'This is a specialized speech-to-text model. When comparing similar options, prioritize transcription accuracy, language support, diarization/format needs (if available), and whether pricing is tied to seconds of audio, tokens, or both.';
    } else if (signals.isRerank) {
        comparisonText = 'This is a reranking model. Compared to general-purpose generators, rerankers are optimized for ordering candidates by relevance. When comparing similar models, evaluate relevance quality on your retrieval set and how pricing scales with the number and length of candidates.';
    } else if (signals.isImageGeneration) {
        comparisonText = 'This is an image generation model. Compared to text-only models, costs often depend on images generated (and sometimes prompt tokens). When comparing alternatives, consider output quality/style control, throughput, and per-image pricing.';
    } else if (signals.isVideoGeneration) {
        comparisonText = 'This is a video generation model. Compared to text-only models, pricing commonly scales with seconds of output video (and sometimes prompt tokens). When comparing alternatives, consider output quality, latency, and how duration-based pricing affects your workload.';
    } else if (signals.isOCR) {
        comparisonText = 'This is an OCR-focused model. Compared to general-purpose models, OCR pricing often scales per page or per image. When comparing alternatives, evaluate extraction quality on your document types and how costs scale with page volume.';
    } else if (signals.isInputCheap && signals.isOutputExpensive) {
        comparisonText = 'Compared to other models in a similar category, this model is more cost-efficient on input tokens but relatively expensive on output tokens. It is better suited for retrieval-heavy or context-rich workflows than generation-heavy use cases.';
    } else if (signals.hasLongContext) {
        comparisonText = 'This model supports a larger context window than many alternatives, making it suitable for long-form inputs and memory-intensive applications.';
    } else if (signals.isInputCheap) {
        comparisonText = 'This model offers competitive input token pricing, making it cost-effective for applications that require extensive context or frequent input processing.';
    } else if (signals.supportsTools && signals.supportsReasoning) {
        comparisonText = 'This model combines tool-calling capabilities with advanced reasoning, making it well-suited for complex agentic workflows that require both function execution and strategic thinking.';
    } else {
        comparisonText = 'This model sits in the middle of its category in terms of pricing and capabilities, making it a balanced option for general workloads.';
    }

    return {
        introduction,
        recommendedUseCases,
        avoidUseCases,
        comparisonText,
        signals,
        isCoding,
        isEmbedding,
        modelType,
        applicationType,
        pricing: {
            hasPricing: !!(
                pricingUnits.tokenInputPer1M ||
                pricingUnits.tokenOutputPer1M ||
                pricingUnits.perImageInput ||
                pricingUnits.perImageOutput ||
                pricingUnits.perSecondInput ||
                pricingUnits.perSecondOutput ||
                pricingUnits.perPageOCR
            ),
            input: inputCostPer1M ?? 0,
            output: outputCostPer1M ?? 0,
            units: pricingUnits,
        },
        specifications: {
            maxInputTokens: data.max_input_tokens || null,
            maxOutputTokens: data.max_output_tokens || null,
            maxTokens: data.max_tokens || null,
            maxQueryTokens: data.max_query_tokens || null,
        },
        capabilities: {
            functionCalling: data.supports_function_calling || false,
            vision: data.supports_vision || false,
            audioInput: data.supports_audio_input || false,
            audioOutput: data.supports_audio_output || false,
            reasoning: data.supports_reasoning || false,
            webSearch: data.supports_web_search || false,
            promptCaching: data.supports_prompt_caching || false,
            systemMessages: data.supports_system_messages || false,
            parallelFunctionCalling: data.supports_parallel_function_calling || false,
            responseSchema: data.supports_response_schema || false,
        },
        additionalInfo: {
            source: data.source,
            deprecationDate: data.deprecation_date,
            supportedEndpoints: data.supported_endpoints,
            supportedModalities: data.supported_modalities,
            supportedOutputModalities: data.supported_output_modalities,
        },
    };
}


export default async function ModelPage({ params }: PageProps) {
    const { provider, slug } = await params;
    const decodedProvider = decodeURIComponent(provider);
    const model = getModelBySlug(slug, decodedProvider);

    if (!model) {
        notFound();
    }

    // Find other models with the same display name
    const sameNameModels = getModelsByDisplayName(model.displayName);

    // Check if there are multiple variants (same display name, different provider or mode)
    const hasMultipleProviders = new Set(sameNameModels.map(m => m.provider)).size > 1;
    const hasMultipleModes = new Set(sameNameModels.map(m => m.data.mode)).size > 1;

    // Build options for mode selector
    type SelectorOption = { label: string; value: string; type: 'provider' | 'mode' };
    const optionProviders: Record<string, string> = {};
    let uniqueOptions: SelectorOption[] = [];

    if (hasMultipleProviders || hasMultipleModes) {
        const seen = new Set<string>();
        uniqueOptions = sameNameModels
            .map(m => {
                const label = hasMultipleProviders
                    ? `${formatProviderName(m.provider)} - ${getModeDisplayName(m.data.mode)}`
                    : getModeDisplayName(m.data.mode);
                const key = `${m.provider}-${m.data.mode}`;
                optionProviders[m.slug] = m.provider;
                if (seen.has(key)) return null;
                seen.add(key);
                return {
                    label,
                    value: m.slug,
                    type: hasMultipleProviders ? 'provider' : 'mode',
                } as SelectorOption;
            })
            .filter((opt): opt is SelectorOption => opt !== null);
    }

    const contentData = generateContentData(model);
    if (!contentData) {
        notFound();
    }

    const hasLimits = model.data.max_input_tokens || model.data.max_output_tokens || model.data.max_tokens;

    // Structured data for SEO
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: model.displayName,
        applicationCategory: 'AIApplication',
        offers: contentData.pricing.hasPricing ? {
            '@type': 'Offer',
            priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: contentData.pricing.input,
                priceCurrency: 'USD',
                unitText: 'per 1M tokens',
            },
        } : undefined,
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Breadcrumbs */}
                <Breadcrumbs
                    items={[
                        { label: 'Home', href: `${getCostCalculatorBaseUrl()}/llm-cost-calculator` },
                        { label: formatProviderName(model.provider), href: `${getCostCalculatorBaseUrl()}/llm-cost-calculator/provider/${encodeURIComponent(model.provider)}` },
                        { label: model.displayName },
                    ]}
                />

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-normal text-gray-900 mb-4">
                        {model.displayName} Cost Calculator - {formatProviderName(model.provider)}
                    </h1>
                    <p className="text-lg text-gray-600 mb-4">
                        Calculate the cost of using {model.displayName} from {formatProviderName(model.provider)} for your AI applications
                    </p>
                </div>

                {/* Calculator and CTA2 */}
                <div className="mb-12 grid grid-cols-1 lg:grid-cols-12 xl:grid-cols-[3fr_1fr] gap-8 lg:auto-rows-[1fr]">
                    <div className="lg:col-span-8 xl:col-span-1 flex flex-col h-full box-border">
                        <div className="flex-1 [&>div]:h-full [&>div]:max-w-none [&>div]:mx-0 [&>div]:box-border">
                            <Calculator modelData={model.data} modelName={model.displayName} />
                        </div>
                    </div>
                    <div className="lg:col-span-4 xl:col-span-1 flex flex-col h-full box-border">
                        <CTA2 />
                    </div>
                </div>

                {/* Model Details */}
                {hasLimits && (
                    <div className="mb-12">
                        <h2 className="text-xl font-medium text-gray-900 mb-6 font-sans">Model Specifications</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 border border-gray-200 divide-x divide-y divide-gray-200">
                            {(model.data.supports_function_calling ||
                                model.data.supports_vision ||
                                model.data.supports_reasoning ||
                                model.data.supports_web_search ||
                                model.data.supports_audio_input ||
                                model.data.supports_audio_output) && (
                                    <div className="p-6">
                                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
                                            Capabilities
                                        </h3>
                                        <div className="space-y-2">
                                            {model.data.supports_function_calling && (
                                                <div className="flex items-center">
                                                    <span className="text-accent mr-2">✓</span>
                                                    <span className="text-gray-700">Function Calling</span>
                                                </div>
                                            )}
                                            {model.data.supports_vision && (
                                                <div className="flex items-center">
                                                    <span className="text-accent mr-2">✓</span>
                                                    <span className="text-gray-700">Vision</span>
                                                </div>
                                            )}
                                            {model.data.supports_reasoning && (
                                                <div className="flex items-center">
                                                    <span className="text-accent mr-2">✓</span>
                                                    <span className="text-gray-700">Reasoning</span>
                                                </div>
                                            )}
                                            {model.data.supports_web_search && (
                                                <div className="flex items-center">
                                                    <span className="text-accent mr-2">✓</span>
                                                    <span className="text-gray-700">Web Search</span>
                                                </div>
                                            )}
                                            {model.data.supports_audio_input && (
                                                <div className="flex items-center">
                                                    <span className="text-accent mr-2">✓</span>
                                                    <span className="text-gray-700">Audio Input</span>
                                                </div>
                                            )}
                                            {model.data.supports_audio_output && (
                                                <div className="flex items-center">
                                                    <span className="text-accent mr-2">✓</span>
                                                    <span className="text-gray-700">Audio Output</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            <div className="p-6">
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                                    Limits
                                </h3>
                                <div className="space-y-2">
                                    {model.data.max_input_tokens && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-700">Max Input Tokens</span>
                                            <span className="font-mono text-accent font-semibold">
                                                {model.data.max_input_tokens.toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                    {model.data.max_output_tokens && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-700">Max Output Tokens</span>
                                            <span className="font-mono text-accent font-semibold">
                                                {model.data.max_output_tokens.toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                    {model.data.max_tokens && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-700">Max Tokens</span>
                                            <span className="font-mono text-accent font-semibold">
                                                {model.data.max_tokens.toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Programmatic Content for SEO */}
                <div className="mt-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 border border-gray-200 divide-x divide-y divide-gray-200 mb-12">
                        {/* Introduction */}
                        <div className="p-6">
                            <h2 className="text-xl font-medium text-gray-900 mb-4 font-sans">About {model.displayName}</h2>
                            <p className="text-gray-700 leading-relaxed">
                                {contentData.introduction}
                            </p>
                        </div>

                        {/* Pricing Information */}
                        {contentData.pricing.hasPricing && (
                            <div className="p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4 font-sans">
                                    Pricing Information
                                </h3>
                                <div className="space-y-4">
                                    {contentData.pricing.input > 0 && (
                                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                            <span className="text-gray-700">Input Cost</span>
                                            <span className="font-mono text-gray-700 font-semibold">
                                                ${contentData.pricing.input.toFixed(2)} per 1M tokens
                                            </span>
                                        </div>
                                    )}
                                    {contentData.pricing.output > 0 && (
                                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                            <span className="text-gray-700">Output Cost</span>
                                            <span className="font-mono text-gray-700 font-semibold">
                                                ${contentData.pricing.output.toFixed(2)} per 1M tokens
                                            </span>
                                        </div>
                                    )}
                                    {contentData.pricing.units?.perSecondInput != null && (
                                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                            <span className="text-gray-700">Audio Input Cost</span>
                                            <span className="font-mono text-gray-700 font-semibold">
                                                ${contentData.pricing.units.perSecondInput.toFixed(4)} per second
                                            </span>
                                        </div>
                                    )}
                                    {contentData.pricing.units?.perSecondOutput != null && (
                                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                            <span className="text-gray-700">Audio/Video Output Cost</span>
                                            <span className="font-mono text-gray-700 font-semibold">
                                                ${contentData.pricing.units.perSecondOutput.toFixed(4)} per second
                                            </span>
                                        </div>
                                    )}
                                    {contentData.pricing.units?.perImageInput != null && (
                                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                            <span className="text-gray-700">Image Input Cost</span>
                                            <span className="font-mono text-gray-700 font-semibold">
                                                ${contentData.pricing.units.perImageInput.toFixed(4)} per image
                                            </span>
                                        </div>
                                    )}
                                    {contentData.pricing.units?.perImageOutput != null && (
                                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                            <span className="text-gray-700">Image Output Cost</span>
                                            <span className="font-mono text-gray-700 font-semibold">
                                                ${contentData.pricing.units.perImageOutput.toFixed(4)} per image
                                            </span>
                                        </div>
                                    )}
                                    {contentData.pricing.units?.perPageOCR != null && (
                                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                            <span className="text-gray-700">OCR Cost</span>
                                            <span className="font-mono text-gray-700 font-semibold">
                                                ${contentData.pricing.units.perPageOCR.toFixed(4)} per page
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <p className="text-gray-600 mt-4 text-sm">
                                    <strong>Note:</strong> Use the interactive calculator above to estimate costs for your specific usage patterns.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Technical Specifications */}
                    {(contentData.specifications.maxInputTokens || contentData.specifications.maxOutputTokens) && (
                        <div className="mb-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4 font-sans">
                                Technical Specifications
                            </h3>
                            <div className="grid md:grid-cols-2 border border-gray-200 divide-x divide-y divide-gray-200">
                                {contentData.specifications.maxInputTokens && (
                                    <div className="flex justify-between items-center py-3 px-4">
                                        <span className="text-gray-700">Maximum Input Tokens</span>
                                        <span className="font-mono text-gray-700 font-semibold">
                                            {contentData.specifications.maxInputTokens.toLocaleString()}
                                        </span>
                                    </div>
                                )}
                                {contentData.specifications.maxOutputTokens && (
                                    <div className="flex justify-between items-center py-3 px-4">
                                        <span className="text-gray-700">Maximum Output Tokens</span>
                                        <span className="font-mono text-gray-700 font-semibold">
                                            {contentData.specifications.maxOutputTokens.toLocaleString()}
                                        </span>
                                    </div>
                                )}
                                {contentData.specifications.maxTokens && (
                                    <div className="flex justify-between items-center py-3 px-4">
                                        <span className="text-gray-700">Maximum Total Tokens</span>
                                        <span className="font-mono text-gray-700 font-semibold">
                                            {contentData.specifications.maxTokens.toLocaleString()}
                                        </span>
                                    </div>
                                )}
                                {contentData.specifications.maxQueryTokens && (
                                    <div className="flex justify-between items-center py-3 px-4">
                                        <span className="text-gray-700">Maximum Query Tokens</span>
                                        <span className="font-mono text-gray-700 font-semibold">
                                            {contentData.specifications.maxQueryTokens.toLocaleString()}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Pro Tip Callout */}
                    {(contentData.specifications.maxInputTokens || contentData.specifications.maxOutputTokens) && (
                        <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-4 mt-2 mb-12">
                            <h4 className="text-sm font-medium text-amber-900 mb-2">Pro Tip</h4>
                            <p className="text-sm text-amber-800">
                                Use the maximum token limits shown above to understand the model's capacity.
                                {contentData.specifications.maxInputTokens && ` This model can handle up to ${contentData.specifications.maxInputTokens.toLocaleString()} input tokens.`}
                                {contentData.specifications.maxOutputTokens && ` The maximum output length is ${contentData.specifications.maxOutputTokens.toLocaleString()} tokens.`}
                            </p>
                        </div>
                    )}

                    {/* Capabilities */}
                    {Object.values(contentData.capabilities).some(v => v) && (
                        <div className="mb-12">
                            <h3 className="text-lg font-medium text-gray-900 mb-4 font-sans">
                                Model Capabilities
                            </h3>
                            <div className="grid md:grid-cols-2 border border-gray-200 divide-x divide-y divide-gray-200">
                                {contentData.capabilities.functionCalling && (
                                    <div className="flex items-center gap-2 text-gray-700 p-4">
                                        <span className="text-accent font-bold">✓</span>
                                        <span><strong>Function Calling</strong> - Execute custom functions and tools</span>
                                    </div>
                                )}
                                {contentData.capabilities.vision && (
                                    <div className="flex items-center gap-2 text-gray-700 p-4">
                                        <span className="text-accent font-bold">✓</span>
                                        <span><strong>Vision</strong> - Process and understand images</span>
                                    </div>
                                )}
                                {contentData.capabilities.audioInput && (
                                    <div className="flex items-center gap-2 text-gray-700 p-4">
                                        <span className="text-accent font-bold">✓</span>
                                        <span><strong>Audio Input</strong> - Accept audio data as input</span>
                                    </div>
                                )}
                                {contentData.capabilities.audioOutput && (
                                    <div className="flex items-center gap-2 text-gray-700 p-4">
                                        <span className="text-accent font-bold">✓</span>
                                        <span><strong>Audio Output</strong> - Generate audio responses</span>
                                    </div>
                                )}
                                {contentData.capabilities.reasoning && (
                                    <div className="flex items-center gap-2 text-gray-700 p-4">
                                        <span className="text-accent font-bold">✓</span>
                                        <span><strong>Advanced Reasoning</strong> - Complex problem-solving capabilities</span>
                                    </div>
                                )}
                                {contentData.capabilities.webSearch && (
                                    <div className="flex items-center gap-2 text-gray-700 p-4">
                                        <span className="text-accent font-bold">✓</span>
                                        <span><strong>Web Search</strong> - Access real-time web information</span>
                                    </div>
                                )}
                                {contentData.capabilities.promptCaching && (
                                    <div className="flex items-center gap-2 text-gray-700 p-4">
                                        <span className="text-accent font-bold">✓</span>
                                        <span><strong>Prompt Caching</strong> - Optimize repeated prompts</span>
                                    </div>
                                )}
                                {contentData.capabilities.systemMessages && (
                                    <div className="flex items-center gap-2 text-gray-700 p-4">
                                        <span className="text-accent font-bold">✓</span>
                                        <span><strong>System Messages</strong> - Configure model behavior</span>
                                    </div>
                                )}
                                {contentData.capabilities.parallelFunctionCalling && (
                                    <div className="flex items-center gap-2 text-gray-700 p-4">
                                        <span className="text-accent font-bold">✓</span>
                                        <span><strong>Parallel Function Calling</strong> - Execute multiple functions simultaneously</span>
                                    </div>
                                )}
                                {contentData.capabilities.responseSchema && (
                                    <div className="flex items-center gap-2 text-gray-700 p-4">
                                        <span className="text-accent font-bold">✓</span>
                                        <span><strong>Response Schema</strong> - Structured output formatting</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* FAQ-style collapsibles */}
                    <div className="mb-12 space-y-3">
                        {/* When should you use this model? */}
                        <details className="group border border-gray-200 rounded-lg bg-white">
                            <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between gap-4">
                                <span className="text-base font-medium text-gray-900">
                                    When should you use {model.displayName}?
                                </span>
                                <span className="text-gray-500 group-open:rotate-180 transition-transform">
                                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            </summary>
                            <div className="px-5 pb-5 pt-3 border-t border-gray-200">
                                <p className="text-gray-700 mb-3 text-sm leading-relaxed">
                                    {model.displayName} is best suited for the following scenarios:
                                </p>
                                <ul className="list-disc list-outside space-y-2 text-sm pl-6 leading-relaxed">
                                    {contentData.recommendedUseCases.map((item, i) => (
                                        <li key={i} className="text-gray-700">{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </details>

                        {/* When should you avoid this model? */}
                        {contentData.avoidUseCases.length > 0 && (
                            <details className="group border border-gray-200 rounded-lg bg-white">
                                <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between gap-4">
                                    <span className="text-base font-medium text-gray-900">
                                        When should you avoid {model.displayName}?
                                    </span>
                                    <span className="text-gray-500 group-open:rotate-180 transition-transform">
                                        <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                </summary>
                                <div className="px-5 pb-5 pt-3 border-t border-gray-200">
                                    <ul className="list-disc list-outside space-y-2 text-sm pl-6 leading-relaxed">
                                        {contentData.avoidUseCases.map((item, i) => (
                                            <li key={i} className="text-gray-700">{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </details>
                        )}

                        <details className="group border border-gray-200 rounded-lg bg-white">
                            <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between gap-4">
                                <span className="text-base font-medium text-gray-900">
                                    How does {model.displayName} compare to similar models?
                                </span>
                                <span className="text-gray-500 group-open:rotate-180 transition-transform">
                                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            </summary>
                            <div className="px-5 pb-5 pt-3 border-t border-gray-200">
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    {contentData.comparisonText}
                                </p>
                            </div>
                        </details>

                        {/* Understanding pricing */}
                        <details className="group border border-gray-200 rounded-lg bg-white">
                            <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between gap-4">
                                <span className="text-base font-medium text-gray-900">
                                    Understanding {model.displayName} pricing
                                </span>
                                <span className="text-gray-500 group-open:rotate-180 transition-transform">
                                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            </summary>
                            <div className="px-5 pb-5 pt-3 border-t border-gray-200 text-sm leading-relaxed text-gray-700">
                                <ul className="list-disc list-outside space-y-2 pl-6">
                                    <li>
                                        <strong>{model.displayName}</strong> is a {contentData.modelType} model provided by {formatProviderName(model.provider)}.
                                    </li>
                                    {contentData.pricing.units?.tokenInputPer1M != null && (
                                        <li>
                                            Input tokens are priced at <strong>${contentData.pricing.units.tokenInputPer1M.toFixed(2)} per 1M tokens</strong>.
                                        </li>
                                    )}
                                    {contentData.pricing.units?.tokenOutputPer1M != null && (
                                        <li>
                                            Output tokens are priced at <strong>${contentData.pricing.units.tokenOutputPer1M.toFixed(2)} per 1M tokens</strong>.
                                        </li>
                                    )}
                                    {contentData.pricing.units?.perSecondInput != null && (
                                        <li>
                                            Audio input is priced at <strong>${contentData.pricing.units.perSecondInput.toFixed(4)} per second</strong>.
                                        </li>
                                    )}
                                    {contentData.pricing.units?.perSecondOutput != null && (
                                        <li>
                                            Audio/video output is priced at <strong>${contentData.pricing.units.perSecondOutput.toFixed(4)} per second</strong>.
                                        </li>
                                    )}
                                    {contentData.pricing.units?.perImageInput != null && (
                                        <li>
                                            Image input is priced at <strong>${contentData.pricing.units.perImageInput.toFixed(4)} per image</strong>.
                                        </li>
                                    )}
                                    {contentData.pricing.units?.perImageOutput != null && (
                                        <li>
                                            Image output is priced at <strong>${contentData.pricing.units.perImageOutput.toFixed(4)} per image</strong>.
                                        </li>
                                    )}
                                    {contentData.pricing.units?.perPageOCR != null && (
                                        <li>
                                            OCR is priced at <strong>${contentData.pricing.units.perPageOCR.toFixed(4)} per page</strong>.
                                        </li>
                                    )}
                                    {contentData.specifications.maxInputTokens && (
                                        <li>
                                            The model supports a maximum input capacity of <strong>{contentData.specifications.maxInputTokens.toLocaleString()} tokens</strong>
                                            {contentData.specifications.maxInputTokens > 100000
                                                ? (contentData.isCoding
                                                    ? ', capable of working with large codebases and complex software projects'
                                                    : contentData.isEmbedding
                                                        ? ', enabling large-scale document and text embedding operations'
                                                        : '')
                                                : ''}.
                                        </li>
                                    )}
                                    {contentData.specifications.maxOutputTokens && (
                                        <li>
                                            Maximum output length is <strong>{contentData.specifications.maxOutputTokens.toLocaleString()} tokens</strong>.
                                        </li>
                                    )}
                                    {contentData.pricing.units?.tokenInputPer1M != null &&
                                        contentData.pricing.units?.tokenOutputPer1M != null && (
                                            <li>
                                                For this model, input tokens are{' '}
                                                <strong>
                                                    {contentData.pricing.units.tokenInputPer1M < contentData.pricing.units.tokenOutputPer1M
                                                        ? 'less expensive'
                                                        : 'more expensive'}
                                                </strong>{' '}
                                                than output tokens, so optimizing your prompts can help manage costs.
                                            </li>
                                        )}
                                    {(contentData.signals.isAudioSpeech || contentData.signals.isAudioGeneration) &&
                                        contentData.pricing.units?.perSecondOutput != null && (
                                            <li>
                                                Because this is an audio-focused model, your total cost can be driven by{' '}
                                                <strong>output duration (seconds)</strong> in addition to any token-based costs.
                                            </li>
                                        )}
                                    {contentData.capabilities.vision && (
                                        <li>
                                            The model includes <strong>vision capabilities</strong> for processing and analysing images.
                                        </li>
                                    )}
                                    {contentData.capabilities.functionCalling && (
                                        <li>
                                            Supports <strong>function calling</strong> for {contentData.isCoding ? 'executing code snippets, API calls, and development tools' : 'executing custom functions and tools'}.
                                        </li>
                                    )}
                                    {contentData.capabilities.reasoning && (
                                        <li>
                                            Features <strong>advanced reasoning capabilities</strong> for complex problem-solving tasks.
                                        </li>
                                    )}
                                    {contentData.capabilities.webSearch && (
                                        <li>
                                            Includes <strong>real-time web search capabilities</strong> for accessing current information.
                                        </li>
                                    )}
                                    {contentData.capabilities.audioInput && (
                                        <li>
                                            Supports <strong>audio input</strong> for processing audio data.
                                        </li>
                                    )}
                                    {contentData.capabilities.audioOutput && (
                                        <li>
                                            Supports <strong>audio output</strong> for generating audio responses.
                                        </li>
                                    )}
                                    {contentData.capabilities.promptCaching && (
                                        <li>
                                            Features <strong>prompt caching</strong> to optimize costs for repeated prompts.
                                        </li>
                                    )}
                                    <li>
                                        {formatProviderName(model.provider)} offers {model.displayName} for {contentData.modelType} workloads — {contentData.applicationType}.
                                    </li>
                                </ul>
                            </div>
                        </details>
                    </div>

                    {/* Usage Guide */}
                    <div className="mb-12">
                        <h3 className="text-lg font-medium text-gray-900 mb-4 font-sans">
                            How to Use This Calculator
                        </h3>
                        <div className="grid md:grid-cols-3 border border-gray-200 divide-x divide-y divide-gray-200">
                            <div className="p-4">
                                <p className="text-gray-700">
                                    <strong>Step 1:</strong> Enter the number of input tokens you expect to use. Input tokens include your prompt, system messages, and any context you provide to the model.
                                </p>
                            </div>
                            <div className="p-4">
                                <p className="text-gray-700">
                                    <strong>Step 2:</strong> Specify the number of output tokens you anticipate. Output tokens are the text generated by the model in response to your input.
                                </p>
                            </div>
                            <div className="p-4">
                                <p className="text-gray-700">
                                    <strong>Step 3:</strong> Review the cost breakdown to see the total estimated cost for your usage. The calculator automatically updates as you adjust the token counts.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back Links */}
                <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                    <PrimaryButton href={`${getCostCalculatorBaseUrl()}/llm-cost-calculator`}>
                        ← Back to All Models
                    </PrimaryButton>
                    <SecondaryButton
                        href={`${getCostCalculatorBaseUrl()}/llm-cost-calculator/provider/${encodeURIComponent(model.provider)}`}
                    >
                        View All {formatProviderName(model.provider)} Models
                    </SecondaryButton>
                </div>
            </div>
            <Footer />
        </div>
    );
}
