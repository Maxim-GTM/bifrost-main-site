import { getModelsByProvider, formatProviderName } from '@/lib/llm-calculator/api';
import ModelsTable from '@/components/llm-calculator/ModelsTable';
import Pagination from '@/components/llm-calculator/Pagination';
import { Breadcrumbs } from '@/components/llm-calculator/Breadcrumbs';
import { Navbar } from '@/components/Navbar';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Footer } from '@/components/sections';
import { getCostCalculatorBaseUrl } from '@/lib/utils';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

interface PageProps {
    params: Promise<{ provider: string }>;
    searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { provider } = await params;
    const decodedProvider = decodeURIComponent(provider);
    const models = getModelsByProvider(decodedProvider);

    if (models.length === 0) {
        return {
            title: 'Provider Not Found',
        };
    }

    const providerDisplayName = formatProviderName(decodedProvider);
    const title = `${providerDisplayName} Models - LLM Cost Calculator | Bifrost`;
    const description = `Browse all ${models.length} AI models from ${providerDisplayName}. Compare pricing and calculate costs for chat, image generation, and more.`;

    return {
        title,
        description,
        keywords: `${providerDisplayName}, AI models, LLM pricing, ${providerDisplayName} API costs`,
        alternates: {
            canonical: `https://getmaxim.ai${getCostCalculatorBaseUrl()}/llm-cost-calculator/provider/${encodeURIComponent(decodedProvider)}`,
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

export default async function ProviderPage({ params, searchParams }: PageProps) {
    const { provider } = await params;
    const { page } = await searchParams;
    const decodedProvider = decodeURIComponent(provider);
    const models = getModelsByProvider(decodedProvider);

    // If the provider has no models, this is a 404.
    if (models.length === 0) {
        notFound();
    }

    const PAGE_SIZE = 100;
    const currentPage = Math.max(1, parseInt(page || '1', 10) || 1);
    const totalModels = models.length;
    const startIdx = (currentPage - 1) * PAGE_SIZE;
    const pagedModels = models.slice(startIdx, startIdx + PAGE_SIZE);

    // Group models by mode
    const modelsByMode = models.reduce((acc, model) => {
        const mode = model.data.mode;
        if (!acc[mode]) {
            acc[mode] = [];
        }
        acc[mode].push(model);
        return acc;
    }, {} as Record<string, typeof models>);

    // Calculate stats
    const modes = Object.keys(modelsByMode);
    const inputCostModels = models.filter(m => m.data.input_cost_per_token);
    const outputCostModels = models.filter(m => m.data.output_cost_per_token);
    const avgInputCost =
        inputCostModels.length > 0
            ? inputCostModels.reduce((sum, m) => sum + (m.data.input_cost_per_token || 0), 0) / inputCostModels.length
            : 0;
    const avgOutputCost =
        outputCostModels.length > 0
            ? outputCostModels.reduce((sum, m) => sum + (m.data.output_cost_per_token || 0), 0) / outputCostModels.length
            : 0;

    // Structured data
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: formatProviderName(decodedProvider),
        description: `AI models and pricing from ${formatProviderName(decodedProvider)}`,
        numberOfEmployees: {
            '@type': 'QuantitativeValue',
            value: totalModels,
        },
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
                        { label: formatProviderName(decodedProvider) },
                    ]}
                />

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-normal text-gray-900 mb-4">
                        {formatProviderName(decodedProvider)} Models
                    </h1>
                    <p className="text-lg text-gray-600">
                        Browse all {totalModels} AI models from {formatProviderName(decodedProvider)}
                    </p>
                </div>

                {/* Stats */}
                <div className="mb-12">
                    <div className="border-t border-b border-gray-200 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                            <div className="text-center py-4 md:py-5 px-6">
                                <div className="text-sm text-gray-500 uppercase tracking-wider font-medium font-mono">Total Models</div>
                                <div className="text-xl md:text-2xl text-accent mb-1 leading-none font-mono">
                                    {totalModels.toLocaleString()}
                                </div>
                            </div>
                            <div className="text-center py-4 md:py-5 px-6">
                                <div className="text-sm text-gray-500 uppercase tracking-wider font-medium font-mono">Modes</div>
                                <div className="text-xl md:text-2xl text-accent mb-1 leading-none font-mono">
                                    {modes.length}
                                </div>
                            </div>
                            <div className="text-center py-4 md:py-5 px-6">
                                <div className="text-sm text-gray-500 uppercase tracking-wider font-medium font-mono">Avg Input (1M Tokens)</div>
                                <div className="text-xl md:text-2xl text-accent mb-1 leading-none font-mono">
                                    {avgInputCost > 0 ? `$${(avgInputCost * 1000000).toFixed(2)}` : '—'}
                                </div>
                            </div>
                            <div className="text-center py-4 md:py-5 px-6">
                                <div className="text-sm text-gray-500 uppercase tracking-wider font-medium font-mono">Avg Output (1M Tokens)</div>
                                <div className="text-xl md:text-2xl text-accent mb-1 leading-none font-mono">
                                    {avgOutputCost > 0 ? `$${(avgOutputCost * 1000000).toFixed(2)}` : '—'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Models Table */}
                <div className="mb-8">
                    <h2 className="text-xl font-medium text-gray-900 mb-2 font-sans">
                        All {formatProviderName(decodedProvider)} Models
                    </h2>
                    <p className="text-gray-600 text-sm">
                        Click on any model to calculate costs
                    </p>
                </div>
                <ModelsTable
                    models={pagedModels}
                    hideProviderFilter={true}
                    totalModels={totalModels}
                    searchScope="all"
                    searchProvider={decodedProvider}
                    serverPaginationContainerId="provider-pagination"
                />
                {totalModels > PAGE_SIZE && (
                    <div id="provider-pagination">
                        <Pagination
                            basePath={`${getCostCalculatorBaseUrl()}/llm-cost-calculator/provider/${encodeURIComponent(decodedProvider)}`}
                            currentPage={currentPage}
                            totalItems={totalModels}
                            pageSize={PAGE_SIZE}
                        />
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
