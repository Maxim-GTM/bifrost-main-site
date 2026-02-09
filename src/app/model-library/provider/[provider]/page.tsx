import {
  fetchAllModels,
  getModelsByProvider,
  getAllProviders,
  formatProviderName,
} from '@/lib/model-library/api'
import { getModeDisplayName } from '@/lib/model-library/calculator'
import { isProviderWhitelisted } from '@/config/providers'
import ModelsTable from '@/components/model-library/ModelsTable'
import { Breadcrumbs } from '@/components/model-library/Breadcrumbs'
import Pagination from '@/components/model-library/Pagination'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { buildCanonicalUrl } from '@/lib/model-library/seo'
import { getProviderLogo } from '@/lib/model-library/providerLogos'
import { getModelLibraryBaseUrl } from '@/lib/utils'

interface PageProps {
  params: Promise<{ provider: string }>
  searchParams: Promise<{ mode?: string; page?: string }>
}

export async function generateStaticParams() {
  const modelsData = await fetchAllModels()
  // Use getAllProviders which already filters to only providers with valid models
  const providers = getAllProviders(modelsData)

  return providers.map((provider) => ({
    provider: encodeURIComponent(provider),
  }))
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { provider } = await params
  const { mode, page } = await searchParams
  const decodedProvider = decodeURIComponent(provider)
  const modelsData = await fetchAllModels()
  const models = getModelsByProvider(modelsData, decodedProvider)

  if (models.length === 0) {
    return {
      title: 'Provider Not Found',
    }
  }

  const providerDisplayName = formatProviderName(decodedProvider)
  let title = `${providerDisplayName} Models - Bifrost AI Model Library`
  let description = `Browse all ${models.length} AI models from ${providerDisplayName}. Compare capabilities, context limits, and pricing details.`

  if (mode) {
    const decodedMode = decodeURIComponent(mode)
    const filteredModels = models.filter((m) => m.data.mode === decodedMode)
    const modeName = getModeDisplayName(decodedMode)
    title = `${providerDisplayName} ${modeName} Models - Bifrost AI Model Library`
    description = `Browse ${filteredModels.length} ${modeName} models from ${providerDisplayName}. Also view other available models.`
  }

  const canonical = buildCanonicalUrl(`/provider/${encodeURIComponent(decodedProvider)}`, {
    mode: mode || undefined,
    page: page && page !== '1' ? page : undefined,
  })

  // Determine if this page should be indexed
  let shouldIndex = true

  if (mode) {
    // If filtering by mode, only index pages that contain at least one matching model.
    // We need to replicate the sorting logic to know what's on this page.
    const decodedMode = decodeURIComponent(mode)
    const matches = models.filter((m) => m.data.mode === decodedMode)
    const others = models.filter((m) => m.data.mode !== decodedMode)
    const displayModels = [...matches, ...others]

    const PAGE_SIZE = 100
    const currentPage = Math.max(1, parseInt(page || '1', 10) || 1)
    const startIdx = (currentPage - 1) * PAGE_SIZE
    const pageModels = displayModels.slice(startIdx, startIdx + PAGE_SIZE)

    // Check if any model on this page matches the filter
    const hasFilteredModels = pageModels.some((m) => m.data.mode === decodedMode)
    shouldIndex = hasFilteredModels
  } else {
    // If no mode filter, index all pages (standard behavior) or limit to page 1 if desired.
    // User request implies focusing on "filtered" logic. For "All", we generally assume all are valid.
    // However, sticking to Page 1 for "All" is a safe default for sitemaps,
    // but here we are talking about indexing state.
    // Let's index all pages for "All Models" view as they are all "current".
    shouldIndex = true
  }

  // Final check: Provider Whitelist
  // Even if models match the mode, if the provider itself is not in our approved list,
  // we do not index the page to avoid SEO bloat.
  if (!isProviderWhitelisted(decodedProvider)) {
    shouldIndex = false
  }

  return {
    title,
    description,
    keywords: `${providerDisplayName}, AI models, model catalog, ${providerDisplayName} pricing${mode ? `, ${mode} models` : ''}`,
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
    robots: {
      index: shouldIndex,
      follow: true,
    },
  }
}

export default async function ProviderPage({ params, searchParams }: PageProps) {
  const { provider } = await params
  const { mode: modeFilter, page } = await searchParams
  const decodedProvider = decodeURIComponent(provider)
  const basePath = `${getModelLibraryBaseUrl()}/model-library`
  const modelsData = await fetchAllModels()
  const providerModels = getModelsByProvider(modelsData, decodedProvider)

  // If the provider itself has no models, this is a real 404.
  if (providerModels.length === 0) {
    notFound()
  }

  let displayModels = [...providerModels]
  let statsModels = [...providerModels]
  let highlightMode: string | undefined

  // Filter by mode if provided
  if (modeFilter) {
    const decodedMode = decodeURIComponent(modeFilter)
    highlightMode = decodedMode

    const matches = providerModels.filter((model) => model.data.mode === decodedMode)
    const others = providerModels.filter((model) => model.data.mode !== decodedMode)

    // Sort: matches first, then others
    displayModels = [...matches, ...others]

    // Stats focus on the filtered set to be relevant to the page title
    statsModels = matches.length > 0 ? matches : providerModels
  }

  // If filters/search produce 0 results, we should NOT 404.

  const PAGE_SIZE = 100
  const currentPage = Math.max(1, parseInt(page || '1', 10) || 1)
  const totalModels = displayModels.length // Total for pagination is FULL list
  const startIdx = (currentPage - 1) * PAGE_SIZE
  const pagedModels = displayModels.slice(startIdx, startIdx + PAGE_SIZE)

  // Group models by mode (using statsModels for relevant stats)
  const modelsByMode = statsModels.reduce(
    (acc, model) => {
      const mode = model.data.mode
      if (!acc[mode]) {
        acc[mode] = []
      }
      acc[mode].push(model)
      return acc
    },
    {} as Record<string, typeof statsModels>
  )

  // Calculate stats
  const modes = Object.keys(modelsByMode)
  const inputCostModels = statsModels.filter((m) => m.data.input_cost_per_token)
  const outputCostModels = statsModels.filter((m) => m.data.output_cost_per_token)
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
      value: statsModels.length,
    },
  }

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: `${basePath}` },
            { label: formatProviderName(decodedProvider) },
          ]}
        />

        {/* Header */}
        <div className="mb-8">
          {/* <div className="mb-4">
            <span className="provider-badge">
              Provider
            </span>
          </div> */}
          <h1 className="mb-4 flex items-center gap-3 text-3xl font-[400] text-gray-900 md:text-4xl">
            <img
              src={getProviderLogo(decodedProvider)}
              alt={`${formatProviderName(decodedProvider)} logo`}
              className="h-8 w-8 object-contain"
              loading="lazy"
            />
            {formatProviderName(decodedProvider)} Models
          </h1>
          <p className="text-lg text-gray-600">
            Browse all {totalModels} AI models from {formatProviderName(decodedProvider)}
            {modeFilter && ` (${statsModels.length} filtered)`}
          </p>
        </div>

        {/* Stats */}
        <div className="mb-12">
          <div className="w-full border-t border-b border-gray-200">
            <div className="grid grid-cols-1 divide-y divide-gray-200 md:grid-cols-4 md:divide-x md:divide-y-0">
              <div className="px-6 py-4 text-center md:py-5">
                <div className="font-mono text-sm font-medium tracking-wider text-gray-500 uppercase">
                  Total Models {modeFilter ? '(Filtered)' : ''}
                </div>
                <div className="text-accent mb-1 font-mono text-xl leading-none md:text-2xl">
                  {statsModels.length.toLocaleString()}
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

        {/* Models by Mode */}
        {/* <div className="mb-12">
          <h2 className="text-xl font-medium text-gray-900 mb-6">Models by Mode</h2>
          <div className="provider-list-tags">
            {Object.entries(modelsByMode).map(([mode, modeModels]) => (
              <Link
                key={mode}
                href={`/provider/${encodeURIComponent(decodedProvider)}?mode=${encodeURIComponent(mode)}`}
                className="provider-tag"
              >
                {getModeDisplayName(mode)} ({modeModels.length})
              </Link>
            ))}
          </div>
        </div> */}

        {/* Models Table */}
        <div className="mb-8">
          <h2 className="mb-2 text-xl font-medium text-gray-900">
            {modeFilter
              ? `${decodeURIComponent(modeFilter).charAt(0).toUpperCase() + decodeURIComponent(modeFilter).slice(1).replace(/_/g, ' ')} Models`
              : `All ${formatProviderName(decodedProvider)} Models`}
          </h2>
          <p className="text-sm text-gray-600">
            {modeFilter
              ? `Showing ${statsModels.length} ${decodeURIComponent(modeFilter)} models (and ${totalModels - statsModels.length} others)`
              : `Click on any model to view details`}
            {modeFilter && (
              <a
                href={`${basePath}/provider/${encodeURIComponent(decodedProvider)}`}
                className="text-accent ml-2 hover:underline"
              >
                (Clear filter)
              </a>
            )}
          </p>
        </div>
        <ModelsTable
          models={pagedModels}
          hideProviderFilter={true}
          totalModels={totalModels}
          searchScope="all"
          searchProvider={decodedProvider}
          serverPaginationContainerId="provider-pagination"
          highlightMode={highlightMode}
        />
        {totalModels > PAGE_SIZE && (
          <div id="provider-pagination">
            <Pagination
              basePath={`${basePath}/provider/${encodeURIComponent(decodedProvider)}`}
              currentPage={currentPage}
              totalItems={totalModels}
              pageSize={PAGE_SIZE}
              query={{ mode: modeFilter }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
