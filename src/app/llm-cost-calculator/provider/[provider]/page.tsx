import { getModelsByProvider, formatProviderName } from '@/lib/llm-calculator/api'
import ModelsTable from '@/components/llm-calculator/ModelsTable'
import Pagination from '@/components/llm-calculator/Pagination'
import { Breadcrumbs } from '@/components/llm-calculator/Breadcrumbs'
import { Navbar } from '@/components/Navbar'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Footer } from '@/components/sections'
import { getCostCalculatorBaseUrl } from '@/lib/utils'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

interface PageProps {
  params: Promise<{ provider: string }>
  searchParams: Promise<{ page?: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { provider } = await params
  const decodedProvider = decodeURIComponent(provider)
  const models = getModelsByProvider(decodedProvider)

  if (models.length === 0) {
    return {
      title: 'Provider Not Found',
    }
  }

  const providerDisplayName = formatProviderName(decodedProvider)
  const title = `${providerDisplayName} Models - LLM Cost Calculator | Bifrost`
  const description = `Browse all ${models.length} AI models from ${providerDisplayName}. Compare pricing and calculate costs for chat, image generation, and more.`

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
  }
}

export default async function ProviderPage({ params, searchParams }: PageProps) {
  const { provider } = await params
  const { page } = await searchParams
  const decodedProvider = decodeURIComponent(provider)
  const models = getModelsByProvider(decodedProvider)

  // If the provider has no models, this is a 404.
  if (models.length === 0) {
    notFound()
  }

  const PAGE_SIZE = 100
  const currentPage = Math.max(1, parseInt(page || '1', 10) || 1)
  const totalModels = models.length
  const startIdx = (currentPage - 1) * PAGE_SIZE
  const pagedModels = models.slice(startIdx, startIdx + PAGE_SIZE)

  // Group models by mode
  const modelsByMode = models.reduce(
    (acc, model) => {
      const mode = model.data.mode
      if (!acc[mode]) {
        acc[mode] = []
      }
      acc[mode].push(model)
      return acc
    },
    {} as Record<string, typeof models>
  )

  // Calculate stats
  const modes = Object.keys(modelsByMode)
  const inputCostModels = models.filter((m) => m.data.input_cost_per_token)
  const outputCostModels = models.filter((m) => m.data.output_cost_per_token)
  const avgInputCost =
    inputCostModels.length > 0
      ? inputCostModels.reduce((sum, m) => sum + (m.data.input_cost_per_token || 0), 0) /
        inputCostModels.length
      : 0
  const avgOutputCost =
    outputCostModels.length > 0
      ? outputCostModels.reduce((sum, m) => sum + (m.data.output_cost_per_token || 0), 0) /
        outputCostModels.length
      : 0

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
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="relative flex w-full justify-center">
        {/* Left Side Decoration - Box Style */}
        <div className="hidden w-20 flex-none flex-col items-end gap-4 border-r border-black/10 xl:flex">
          <div
            className="h-full w-full bg-[#F6F6F6] opacity-[0.07]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='4' y='4' width='4' height='4' fill='black'/%3E%3Crect y='8' width='4' height='4' fill='black'/%3E%3Crect x='8' width='4' height='4' fill='black'/%3E%3C/svg%3E")`,
              backgroundSize: '4px 4px',
            }}
          ></div>
        </div>

        {/* Center Content - Max 1100px */}
        <div className="w-full max-w-[1100px] px-4 pb-16">
          {/* <div className="absolute right-0 left-0 h-px w-full bg-black/10" /> */}
          <div className="pt-8">
            {/* Breadcrumbs */}
            <Breadcrumbs
              items={[
                { label: 'Home', href: `${getCostCalculatorBaseUrl()}/llm-cost-calculator` },
                { label: formatProviderName(decodedProvider) },
              ]}
            />

            {/* Header */}
            <div className="mb-12 text-center">
              <span className="font-mono text-[12px] leading-[15px] font-medium tracking-[0.04em] text-emerald-500 uppercase">
                [&ensp;PROVIDER OVERVIEW&ensp;]
              </span>
              <h1 className="mx-auto mt-2 mb-4 max-w-3xl text-[42px] leading-[120%] font-medium tracking-[-0.02em] text-black">
                {formatProviderName(decodedProvider)} Models
              </h1>
              <p className="mx-auto max-w-2xl text-[16px] leading-[140%] tracking-[0em] text-[#525252]">
                Browse all {totalModels} AI models from {formatProviderName(decodedProvider)}.
                Compare pricing, context windows, and capabilities.
              </p>
            </div>

            {/* Stats */}
            <div className="mb-12">
              <div className="w-full border-t border-b border-gray-200">
                <div className="grid grid-cols-1 divide-y divide-gray-200 md:grid-cols-4 md:divide-x md:divide-y-0">
                  <div className="px-6 py-4 text-center md:py-5">
                    <div className="font-mono text-sm font-medium tracking-wider text-gray-500 uppercase">
                      Total Models
                    </div>
                    <div className="text-accent mb-1 font-mono text-xl leading-none md:text-2xl">
                      {totalModels.toLocaleString()}
                    </div>
                  </div>
                  <div className="px-6 py-4 text-center md:py-5">
                    <div className="font-mono text-sm font-medium tracking-wider text-gray-500 uppercase">
                      Modes
                    </div>
                    <div className="text-accent mb-1 font-mono text-xl leading-none md:text-2xl">
                      {modes.length}
                    </div>
                  </div>
                  <div className="px-6 py-4 text-center md:py-5">
                    <div className="font-mono text-sm font-medium tracking-wider text-gray-500 uppercase">
                      Avg Input (1M Tokens)
                    </div>
                    <div className="text-accent mb-1 font-mono text-xl leading-none md:text-2xl">
                      {avgInputCost > 0 ? `$${(avgInputCost * 1000000).toFixed(2)}` : '—'}
                    </div>
                  </div>
                  <div className="px-6 py-4 text-center md:py-5">
                    <div className="font-mono text-sm font-medium tracking-wider text-gray-500 uppercase">
                      Avg Output (1M Tokens)
                    </div>
                    <div className="text-accent mb-1 font-mono text-xl leading-none md:text-2xl">
                      {avgOutputCost > 0 ? `$${(avgOutputCost * 1000000).toFixed(2)}` : '—'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Models Table */}
            <div className="mb-8">
              <h2 className="mb-2 font-sans text-xl font-medium text-gray-900">
                All {formatProviderName(decodedProvider)} Models
              </h2>
              <p className="text-sm text-gray-600">Click on any model to calculate costs</p>
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
        </div>

        {/* Right Side Decoration */}
        <div className="hidden w-20 flex-none flex-col items-start gap-4 border-l border-black/10 xl:flex">
          <div
            className="h-full w-full bg-[#F6F6F6] opacity-[0.07]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='4' y='4' width='4' height='4' fill='black'/%3E%3Crect y='8' width='4' height='4' fill='black'/%3E%3Crect x='8' width='4' height='4' fill='black'/%3E%3C/svg%3E")`,
              backgroundSize: '4px 4px',
            }}
          ></div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
