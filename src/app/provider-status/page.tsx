import { Suspense } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { getAllProviderStatuses } from '@/lib/provider-status/api'
import { STATUS_PROVIDERS } from '@/lib/provider-status/providers'
import { getMainPageMetadata, getMainPageJsonLd } from '@/lib/provider-status/seo'
import StatusTable from '@/components/provider-status/StatusTable'
import StatusCTA from '@/components/provider-status/StatusCTA'
import LiveRefresher from '@/components/provider-status/LiveRefresher'
import ProviderStatusFAQ from '@/components/provider-status/ProviderStatusFAQ'
import { getProviderStatusBaseUrl } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = getMainPageMetadata()

export default async function ProviderStatusPage() {
  const statuses = await getAllProviderStatuses()

  const totalProviders = STATUS_PROVIDERS.length
  const operationalCount = statuses.filter((s) => s.status === 'operational').length
  const activeIncidents = statuses.reduce((sum, s) => sum + s.activeIncidents, 0)

  const baseUrl = getProviderStatusBaseUrl()
  const jsonLd = getMainPageJsonLd()

  // Side decoration SVG
  const gridSvg = `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='4' y='4' width='4' height='4' fill='black'/%3E%3Crect y='8' width='4' height='4' fill='black'/%3E%3Crect x='8' width='4' height='4' fill='black'/%3E%3C/svg%3E")`

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="text-center">
            <span className="font-mono text-[12px] leading-[15px] font-medium tracking-[0.04em] text-emerald-500 uppercase">
              [&ensp;AI PROVIDER STATUS&ensp;]
            </span>
            <h1 className="mx-auto mt-2 mb-4 max-w-3xl text-[42px] leading-[120%] font-medium tracking-[-0.02em] text-black">
              AI Provider Status Monitor
            </h1>
            <p className="mx-auto max-w-2xl text-[16px] leading-[140%] tracking-[0em] text-[#525252]">
              Real-time status monitoring for AI model providers. Check if OpenAI, Claude, Groq,
              and other AI providers are operational.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mx-auto mb-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-center">
          <p className="font-mono text-xs font-medium tracking-widest text-gray-400 uppercase">
            [ STATUS OVERVIEW ]
          </p>
        </div>
        <div className="flex justify-center">
          <div className="w-full max-w-2xl border-t border-b border-gray-200">
            <div className="grid grid-cols-1 divide-y divide-gray-200 md:grid-cols-3 md:divide-x md:divide-y-0">
              <div className="px-6 py-4 text-center md:py-5">
                <div className="font-mono text-sm font-medium tracking-wider text-gray-500 uppercase">
                  Providers Monitored
                </div>
                <div className="text-accent mb-1 font-mono text-xl leading-none md:text-2xl">
                  {totalProviders}
                </div>
              </div>
              <div className="px-6 py-4 text-center md:py-5">
                <div className="font-mono text-sm font-medium tracking-wider text-gray-500 uppercase">
                  Operational
                </div>
                <div className="mb-1 font-mono text-xl leading-none text-emerald-500 md:text-2xl">
                  {operationalCount}/{totalProviders}
                </div>
              </div>
              <div className="px-6 py-4 text-center md:py-5">
                <div className="font-mono text-sm font-medium tracking-wider text-gray-500 uppercase">
                  Active Incidents
                </div>
                <div
                  className={`mb-1 font-mono text-xl leading-none md:text-2xl ${
                    activeIncidents > 0 ? 'text-orange-500' : 'text-emerald-500'
                  }`}
                >
                  {activeIncidents}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
              <LiveRefresher />
            </div>
      </div>
      

      {/* Provider Quick Links */}
      <div className="relative flex w-full justify-center">
        <div className="hidden w-20 flex-none flex-col items-end gap-4 border-r border-black/10 xl:flex">
          <div
            className="h-full w-full bg-[#F6F6F6] opacity-[0.07]"
            style={{ backgroundImage: gridSvg, backgroundSize: '4px 4px' }}
          />
        </div>

        <div className="w-full max-w-[1100px] px-4 pb-16">
          <div className="absolute right-0 left-0 h-px w-full bg-black/10" />

          <div className="pt-8">
            <div className="mb-4">
              <h2 className="mb-2 font-sans text-xl font-medium tracking-tight text-gray-900 md:text-2xl">
                Quick Links
              </h2>
              <p className="text-sm text-gray-600">
                Jump to a specific provider&apos;s status page
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {STATUS_PROVIDERS.map((provider) => {
                const status = statuses.find((s) => s.providerId === provider.id)
                const dotColor =
                  status?.status === 'operational'
                    ? '#10b981'
                    : status?.status === 'unknown'
                      ? '#9ca3af'
                      : '#f59e0b'

                return (
                  <Link
                    key={provider.id}
                    href={`${baseUrl}/provider-status/${provider.id}`}
                    className="inline-flex items-center gap-2 border border-gray-200 bg-white px-3 py-1.5 font-mono text-xs font-medium text-gray-700 transition-colors hover:border-[#35c09e] hover:bg-[#35c09e]/5"
                  >
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: dotColor }}
                    />
                    {provider.name}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        <div className="hidden w-20 flex-none flex-col items-start gap-4 border-l border-black/10 xl:flex">
          <div
            className="h-full w-full bg-[#F6F6F6] opacity-[0.07]"
            style={{ backgroundImage: gridSvg, backgroundSize: '4px 4px' }}
          />
        </div>
      </div>

      {/* Status Table */}
      <div className="relative flex w-full justify-center">
        <div className="hidden w-20 flex-none flex-col items-end gap-4 border-r border-black/10 xl:flex">
          <div
            className="h-full w-full bg-[#F6F6F6] opacity-[0.07]"
            style={{ backgroundImage: gridSvg, backgroundSize: '4px 4px' }}
          />
        </div>

        <div className="w-full max-w-[1100px] px-4 pb-16">
          <div className="absolute right-0 left-0 h-px w-full bg-black/10" />

          <div className="pt-8">
            <div className="mb-6">
              <h2 className="mb-2 font-sans text-xl font-medium tracking-tight text-gray-900 md:text-2xl">
                All Providers
              </h2>
              <p className="text-sm text-gray-600">
                Click on any provider to see detailed status, components, and incident history
              </p>
            </div>
            <Suspense
              fallback={
                <div className="border border-gray-200 bg-white px-5 py-12 text-center">
                  <p className="font-mono text-sm text-gray-400">Loading provider statuses...</p>
                </div>
              }
            >
              <StatusTable statuses={statuses} />
            </Suspense>
          </div>
        </div>

        <div className="hidden w-20 flex-none flex-col items-start gap-4 border-l border-black/10 xl:flex">
          <div
            className="h-full w-full bg-[#F6F6F6] opacity-[0.07]"
            style={{ backgroundImage: gridSvg, backgroundSize: '4px 4px' }}
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative flex w-full justify-center">
        <div className="hidden w-20 flex-none flex-col items-end gap-4 border-r border-black/10 xl:flex">
          <div
            className="h-full w-full bg-[#F6F6F6] opacity-[0.07]"
            style={{ backgroundImage: gridSvg, backgroundSize: '4px 4px' }}
          />
        </div>

        <div className="w-full max-w-[1100px] px-4 pb-16">
          <div className="absolute right-0 left-0 h-px w-full bg-black/10" />
          <div className="pt-8">
            <StatusCTA />
          </div>
        </div>

        <div className="hidden w-20 flex-none flex-col items-start gap-4 border-l border-black/10 xl:flex">
          <div
            className="h-full w-full bg-[#F6F6F6] opacity-[0.07]"
            style={{ backgroundImage: gridSvg, backgroundSize: '4px 4px' }}
          />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="relative flex w-full justify-center">
        <div className="hidden w-20 flex-none flex-col items-end gap-4 border-r border-black/10 xl:flex">
          <div
            className="h-full w-full bg-[#F6F6F6] opacity-[0.07]"
            style={{ backgroundImage: gridSvg, backgroundSize: '4px 4px' }}
          />
        </div>

        <div className="w-full max-w-[1100px] px-4 pb-16">
          <div className="absolute right-0 left-0 h-px w-full bg-black/10" />
          <div className="pt-12">
            <ProviderStatusFAQ />
          </div>
        </div>

        <div className="hidden w-20 flex-none flex-col items-start gap-4 border-l border-black/10 xl:flex">
          <div
            className="h-full w-full bg-[#F6F6F6] opacity-[0.07]"
            style={{ backgroundImage: gridSvg, backgroundSize: '4px 4px' }}
          />
        </div>
      </div>
    </div>
  )
}
