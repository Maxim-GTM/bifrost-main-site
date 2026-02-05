import { Suspense } from 'react';
import { getAllModels, getProviderStats } from '@/lib/llm-calculator/api';
import { LLM_STATS } from '@/data/llm-models';
import ModelsTable from '@/components/llm-calculator/ModelsTable';
import ProvidersList from '@/components/llm-calculator/ProvidersList';
import Pagination from '@/components/llm-calculator/Pagination';
import { Navbar } from '@/components/Navbar';
import { Metadata } from 'next';
import { Footer } from '@/components/sections';
import { getCostCalculatorBaseUrl } from '@/lib/utils';

interface PageProps {
    searchParams: Promise<{ page?: string }>;
}

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export const metadata: Metadata = {
    title: 'LLM Cost Calculator - Calculate AI Model Pricing | Bifrost',
    description:
        'Calculate the cost of using AI models across multiple providers. Compare pricing for chat, image generation, audio transcription, and more.',
    keywords: 'LLM cost calculator, AI pricing, model costs, API pricing calculator',
    alternates: {
        canonical: `https://getmaxim.ai${getCostCalculatorBaseUrl()}/llm-cost-calculator`,
    },
};

export default async function LLMCostCalculatorPage({ searchParams }: PageProps) {
    const { page } = await searchParams;
    
    // Use static data
    const models = getAllModels();
    const providerStats = getProviderStats();
    const totalModels = models.length;

    const PAGE_SIZE = 100;
    const currentPage = Math.max(1, parseInt(page || '1', 10) || 1);
    const startIdx = (currentPage - 1) * PAGE_SIZE;
    const pagedModels = models.slice(startIdx, startIdx + PAGE_SIZE);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    <div className="text-center">
                        <span className="inline-block mb-4 px-3 py-1 text-xs font-mono text-green-700 bg-green-50 rounded-full border border-green-200">
                            [ LLM COST CALCULATOR ]
                        </span>
                        <h1 className="text-4xl md:text-5xl font-normal text-gray-900 mb-4 leading-[1.2] tracking-tight text-center">
                            Calculate LLM API Costs
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-mono">
                            Compare pricing across hundreds of AI models. Calculate costs for chat, image generation, audio transcription, and more.
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="text-center mb-6">
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-medium font-mono">[ OUR NUMBERS AT A GLANCE ]</p>
                </div>
                <div className="flex justify-center">
                    <div className="border-t border-b border-gray-200 max-w-2xl w-full">
                        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                            <div className="text-center py-4 md:py-5 px-6">
                                <div className="text-sm text-gray-500 uppercase tracking-wider font-medium font-mono">Models</div>

                                <div className="text-xl md:text-2xl text-accent mb-1 leading-none font-mono">
                                    {LLM_STATS.totalModels.toLocaleString()}
                                </div>

                            </div>
                            <div className="text-center py-4 md:py-5 px-6">
                                <div className="text-sm text-gray-500 uppercase tracking-wider font-medium font-mono">Providers</div>

                                <div className="text-xl md:text-2xl text-accent mb-1 leading-none font-mono">
                                    {LLM_STATS.totalProviders}
                                </div>

                            </div>
                            <div className="text-center py-4 md:py-5 px-6">
                                <div className="text-sm text-gray-500 uppercase tracking-wider font-medium font-mono">Modes</div>
                                <div className="text-xl md:text-2xl text-accent mb-1 leading-none font-mono">
                                    {LLM_STATS.totalModes}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Providers Quick Links */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                <div className="mb-4">
                    <h2 className="text-xl md:text-2xl font-medium text-gray-900 mb-2 tracking-tight font-sans">Browse by Provider</h2>
                    <p className="text-gray-600 text-sm">
                        View all models from a specific provider
                    </p>
                </div>
                <Suspense fallback={<div className="llm-calc-provider-list-tags"><span className="text-gray-400">Loading providers...</span></div>}>
                    <ProvidersList
                        providers={providerStats.slice(0, 50)}
                        maxVisible={20}
                    />
                </Suspense>
            </div>

            {/* Models Table */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="mb-6">
                    <h2 className="text-xl md:text-2xl font-medium text-gray-900 mb-2 tracking-tight font-sans">All Models</h2>
                    <p className="text-gray-600 text-sm">
                        Click on any model to calculate costs for your specific use case
                    </p>
                </div>
                <ModelsTable
                    models={pagedModels}
                    totalModels={totalModels}
                    searchScope="all"
                    serverPaginationContainerId="home-pagination"
                />
                {totalModels > PAGE_SIZE && (
                    <div id="home-pagination">
                        <Pagination
                            basePath={`${getCostCalculatorBaseUrl()}/llm-cost-calculator`}
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
