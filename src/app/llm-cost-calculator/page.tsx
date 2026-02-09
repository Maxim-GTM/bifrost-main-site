import { Suspense } from 'react'
import { getAllModels, getProviderStats } from '@/lib/llm-calculator/api'
import { LLM_STATS } from '@/data/llm-models'
import ModelsTable from '@/components/llm-calculator/ModelsTable'
import ProvidersList from '@/components/llm-calculator/ProvidersList'
import Pagination from '@/components/llm-calculator/Pagination'
import { Navbar } from '@/components/Navbar'
import { Metadata } from 'next'
import { Footer } from '@/components/sections'
import { getCostCalculatorBaseUrl } from '@/lib/utils'

interface PageProps {
  searchParams: Promise<{ page?: string }>
}

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

export const metadata: Metadata = {
  title: 'LLM Cost Calculator - Calculate AI Model Pricing | Bifrost',
  description:
    'Calculate the cost of using AI models across multiple providers. Compare pricing for chat, image generation, audio transcription, and more.',
  keywords: 'LLM cost calculator, AI pricing, model costs, API pricing calculator',
  alternates: {
    canonical: `https://getmaxim.ai${getCostCalculatorBaseUrl()}/llm-cost-calculator`,
  },
}

export default async function LLMCostCalculatorPage({ searchParams }: PageProps) {
  const { page } = await searchParams

  // Use static data
  const models = getAllModels()
  const providerStats = getProviderStats()
  const totalModels = models.length

  const PAGE_SIZE = 100
  const currentPage = Math.max(1, parseInt(page || '1', 10) || 1)
  const startIdx = (currentPage - 1) * PAGE_SIZE
  const pagedModels = models.slice(startIdx, startIdx + PAGE_SIZE)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="text-center">
            <span className="mb-4 inline-block rounded-full border border-green-200 bg-green-50 px-3 py-1 font-mono text-xs text-green-700">
              [ LLM COST CALCULATOR ]
            </span>
            <h1 className="mb-4 text-center text-4xl leading-[1.2] font-normal tracking-tight text-gray-900 md:text-5xl">
              Calculate LLM API Costs
            </h1>
            <p className="mx-auto max-w-2xl font-mono text-lg text-gray-600">
              Compare pricing across hundreds of AI models. Calculate costs for chat, image
              generation, audio transcription, and more.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mx-auto mb-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-center">
          <p className="font-mono text-xs font-medium tracking-widest text-gray-400 uppercase">
            [ OUR NUMBERS AT A GLANCE ]
          </p>
        </div>
        <div className="flex justify-center">
          <div className="w-full max-w-2xl border-t border-b border-gray-200">
            <div className="grid grid-cols-1 divide-y divide-gray-200 md:grid-cols-3 md:divide-x md:divide-y-0">
              <div className="px-6 py-4 text-center md:py-5">
                <div className="font-mono text-sm font-medium tracking-wider text-gray-500 uppercase">
                  Models
                </div>

                <div className="text-accent mb-1 font-mono text-xl leading-none md:text-2xl">
                  {LLM_STATS.totalModels.toLocaleString()}
                </div>
              </div>
              <div className="px-6 py-4 text-center md:py-5">
                <div className="font-mono text-sm font-medium tracking-wider text-gray-500 uppercase">
                  Providers
                </div>

                <div className="text-accent mb-1 font-mono text-xl leading-none md:text-2xl">
                  {LLM_STATS.totalProviders}
                </div>
              </div>
              <div className="px-6 py-4 text-center md:py-5">
                <div className="font-mono text-sm font-medium tracking-wider text-gray-500 uppercase">
                  Modes
                </div>
                <div className="text-accent mb-1 font-mono text-xl leading-none md:text-2xl">
                  {LLM_STATS.totalModes}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Providers Quick Links */}
      <div className="mx-auto mb-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <h2 className="mb-2 font-sans text-xl font-medium tracking-tight text-gray-900 md:text-2xl">
            Browse by Provider
          </h2>
          <p className="text-sm text-gray-600">View all models from a specific provider</p>
        </div>
        <Suspense
          fallback={
            <div className="llm-calc-provider-list-tags">
              <span className="text-gray-400">Loading providers...</span>
            </div>
          }
        >
          <ProvidersList providers={providerStats.slice(0, 50)} maxVisible={20} />
        </Suspense>
      </div>

      {/* Models Table */}
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="mb-2 font-sans text-xl font-medium tracking-tight text-gray-900 md:text-2xl">
            All Models
          </h2>
          <p className="text-sm text-gray-600">
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
  )
}
