import {
  fetchAllModels,
  processModels,
  getAllProviders,
  getAllModes,
} from '@/lib/model-library/api'
import ModelsTable from '@/components/model-library/ModelsTable'
import ProvidersList from '@/components/model-library/ProvidersList'
import Pagination from '@/components/model-library/Pagination'
import { Metadata } from 'next'
import { buildCanonicalUrl } from '@/lib/model-library/seo'
import { getModelLibraryBaseUrl } from '@/lib/utils'

interface PageProps {
  searchParams: Promise<{ showAllProviders?: string; page?: string }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { showAllProviders, page } = await searchParams
  const canonical = buildCanonicalUrl('/', {
    showAllProviders: showAllProviders || undefined,
    page: page && page !== '1' ? page : undefined,
  })

  return {
    title: 'Bifrost AI Model Library - Explore Providers and Capabilities',
    description:
      'Browse AI models across providers. Compare capabilities, context limits, and pricing details for chat, image generation, audio, and more.',
    keywords:
      'Bifrost AI Model Library, model catalog, AI providers, model capabilities, model pricing',
    alternates: {
      canonical,
    },
  }
}

export default async function HomePage({ searchParams }: PageProps) {
  const { showAllProviders, page } = await searchParams
  const modelsData = await fetchAllModels()
  const models = processModels(modelsData)
  const providers = getAllProviders(modelsData)
  const modes = getAllModes(modelsData)
  const basePath = `${getModelLibraryBaseUrl()}/model-library`

  const PAGE_SIZE = 100
  const currentPage = Math.max(1, parseInt(page || '1', 10) || 1)
  const totalModels = models.length
  const startIdx = (currentPage - 1) * PAGE_SIZE
  const pagedModels = models.slice(startIdx, startIdx + PAGE_SIZE)

  // Group models by provider for nested display
  const modelsByProvider = models.reduce(
    (acc, model) => {
      if (!acc[model.provider]) {
        acc[model.provider] = []
      }
      acc[model.provider].push(model)
      return acc
    },
    {} as Record<string, typeof models>
  )

  // Filter out providers with 0 models
  const providersWithModels = providers.filter(
    (provider) => (modelsByProvider[provider]?.length || 0) > 0
  )

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="text-center">
            <span className="font-mono text-[12px] leading-[15px] font-medium tracking-[0.04em] text-emerald-500 uppercase">
              [ BIFROST AI MODEL LIBRARY ]
            </span>
            <h1 className="mx-auto mt-2 mb-4 max-w-2xl text-[42px] leading-[120%] font-medium tracking-[-0.02em] text-black">
              Explore AI Models Across Providers
            </h1>
            <p className="mx-auto max-w-2xl text-[16px] leading-[140%] tracking-[0em] text-[#525252]">
              Discover model capabilities, context limits, and pricing across chat, image
              generation, audio, and more.
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
                  {models.length.toLocaleString()}
                </div>
              </div>
              <div className="px-6 py-4 text-center md:py-5">
                <div className="font-mono text-sm font-medium tracking-wider text-gray-500 uppercase">
                  Providers
                </div>

                <div className="text-accent mb-1 font-mono text-xl leading-none md:text-2xl">
                  {providers.length}
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
            </div>
          </div>
        </div>
      </div>

      {/* Providers Quick Links */}
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
          <div className="absolute right-0 left-0 h-px w-full bg-black/10" />

          <div className="pt-8">
            <div className="mb-4">
              <h2 className="mb-2 text-xl font-medium tracking-tight text-gray-900 md:text-2xl">
                Browse by Provider
              </h2>
              <p className="text-sm text-gray-600">View all models from a specific provider</p>
            </div>
            <ProvidersList
              providers={providersWithModels.map((provider) => ({
                name: provider,
                count: modelsByProvider[provider]?.length || 0,
              }))}
              maxVisible={20}
              showAllProvidersParam={showAllProviders === 'true'}
            />
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

      {/* Models Table */}
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
          <div className="absolute right-0 left-0 h-px w-full bg-black/10" />

          <div className="pt-8">
            <div className="mb-6">
              <h2 className="mb-2 text-xl font-medium tracking-tight text-gray-900 md:text-2xl">
                All Models
              </h2>
              <p className="text-sm text-gray-600">
                Click on any model to view detailed pricing and capabilities
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
                  basePath={basePath}
                  currentPage={currentPage}
                  totalItems={totalModels}
                  pageSize={PAGE_SIZE}
                  query={{ showAllProviders }}
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
    </div>
  )
}
