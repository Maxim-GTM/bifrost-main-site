import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getProviderById, STATUS_PROVIDERS } from '@/lib/provider-status/providers'
import { getProviderFullStatus } from '@/lib/provider-status/api'
import { getProviderPageMetadata, getProviderPageJsonLd } from '@/lib/provider-status/seo'
import StatusIndicator from '@/components/provider-status/StatusIndicator'
import ComponentStatusList from '@/components/provider-status/ComponentStatusList'
import IncidentTimeline from '@/components/provider-status/IncidentTimeline'
import StatusCTA from '@/components/provider-status/StatusCTA'
import LiveRefresher from '@/components/provider-status/LiveRefresher'
import { getProviderStatusBaseUrl } from '@/lib/utils'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ provider: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { provider: providerId } = await params
  const provider = getProviderById(providerId)
  if (!provider) return {}
  return getProviderPageMetadata(provider)
}

export async function generateStaticParams() {
  return STATUS_PROVIDERS.map((p) => ({ provider: p.id }))
}

export default async function ProviderStatusPage({ params }: PageProps) {
  const { provider: providerId } = await params
  const provider = getProviderById(providerId)

  if (!provider) {
    notFound()
  }

  const status = await getProviderFullStatus(provider)
  const baseUrl = getProviderStatusBaseUrl()
  const jsonLd = getProviderPageJsonLd(provider)

  const gridSvg = `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='4' y='4' width='4' height='4' fill='black'/%3E%3Crect y='8' width='4' height='4' fill='black'/%3E%3Crect x='8' width='4' height='4' fill='black'/%3E%3C/svg%3E")`

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 font-mono text-xs text-gray-400">
          <Link
            href={`${baseUrl}/provider-status`}
            className="transition-colors hover:text-[#35c09e]"
          >
            AI Provider Status
          </Link>
          <span>/</span>
          <span className="text-gray-600">{provider.name}</span>
        </nav>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
          <div className="text-center">
            <div className="mb-4 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-none border border-gray-200 bg-white p-3">
                <Image
                  src={provider.logoPath}
                  alt={provider.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                />
              </div>
            </div>
            <span className="font-mono text-[12px] leading-[15px] font-medium tracking-[0.04em] text-emerald-500 uppercase">
              [&ensp;LIVE STATUS&ensp;]
            </span>
            <h1 className="mx-auto mt-2 mb-3 max-w-3xl text-[36px] leading-[120%] font-medium tracking-[-0.02em] text-black sm:text-[42px]">
              Is {provider.name} Down?
            </h1>
            <p className="mx-auto max-w-2xl text-[16px] leading-[140%] tracking-[0em] text-[#525252]">
              {provider.description}
            </p>

            {/* Big Status Indicator */}
            <div className="mt-6 flex justify-center">
              <div
                className="inline-flex items-center gap-3 border border-gray-200 bg-white px-6 py-3"
                style={{
                  borderColor:
                    status.status === 'operational'
                      ? '#d1fae5'
                      : status.status === 'unknown'
                        ? '#e5e7eb'
                        : '#fed7aa',
                }}
              >
                <StatusIndicator status={status.status} size="lg" pulse />
              </div>
            </div>

            <div className="mt-4">
              <LiveRefresher />
            </div>

            {/* Link to official status page */}
            {provider.statusPageUrl && (
              <div className="mt-3">
                <a
                  href={provider.statusPageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-gray-400 underline decoration-gray-300 underline-offset-2 transition-colors hover:text-[#35c09e]"
                >
                  View official status page &rarr;
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Components Section */}
      <div className="relative flex w-full justify-center">
        <div className="hidden w-20 flex-none flex-col items-end gap-4 border-r border-black/10 xl:flex">
          <div
            className="h-full w-full bg-[#F6F6F6] opacity-[0.07]"
            style={{ backgroundImage: gridSvg, backgroundSize: '4px 4px' }}
          />
        </div>

        <div className="w-full max-w-[1100px] px-4 pb-12">
          <div className="absolute right-0 left-0 h-px w-full bg-black/10" />

          <div className="pt-8">
            <div className="mb-4">
              <h2 className="mb-2 font-sans text-xl font-medium tracking-tight text-gray-900 md:text-2xl">
                System Components
              </h2>
              <p className="text-sm text-gray-600">
                Current status of individual {provider.name} services
              </p>
            </div>
            <ComponentStatusList components={status.components} incidents={status.incidents} />
          </div>
        </div>

        <div className="hidden w-20 flex-none flex-col items-start gap-4 border-l border-black/10 xl:flex">
          <div
            className="h-full w-full bg-[#F6F6F6] opacity-[0.07]"
            style={{ backgroundImage: gridSvg, backgroundSize: '4px 4px' }}
          />
        </div>
      </div>

      {/* Incidents Section */}
      <div className="relative flex w-full justify-center">
        <div className="hidden w-20 flex-none flex-col items-end gap-4 border-r border-black/10 xl:flex">
          <div
            className="h-full w-full bg-[#F6F6F6] opacity-[0.07]"
            style={{ backgroundImage: gridSvg, backgroundSize: '4px 4px' }}
          />
        </div>

        <div className="w-full max-w-[1100px] px-4 pb-12">
          <div className="absolute right-0 left-0 h-px w-full bg-black/10" />

          <div className="pt-8">
            <div className="mb-4">
              <h2 className="mb-2 font-sans text-xl font-medium tracking-tight text-gray-900 md:text-2xl">
                Incidents & Maintenance
              </h2>
              <p className="text-sm text-gray-600">
                Active incidents, scheduled maintenance, and incident history for {provider.name}
              </p>
            </div>
            <IncidentTimeline
              incidents={status.incidents}
              scheduledMaintenances={status.scheduledMaintenances}
            />
          </div>
        </div>

        <div className="hidden w-20 flex-none flex-col items-start gap-4 border-l border-black/10 xl:flex">
          <div
            className="h-full w-full bg-[#F6F6F6] opacity-[0.07]"
            style={{ backgroundImage: gridSvg, backgroundSize: '4px 4px' }}
          />
        </div>
      </div>

      {/* FAQ Section (for SEO) */}
      <div className="relative flex w-full justify-center">
        <div className="hidden w-20 flex-none flex-col items-end gap-4 border-r border-black/10 xl:flex">
          <div
            className="h-full w-full bg-[#F6F6F6] opacity-[0.07]"
            style={{ backgroundImage: gridSvg, backgroundSize: '4px 4px' }}
          />
        </div>

        <div className="w-full max-w-[1100px] px-4 pb-12">
          <div className="absolute right-0 left-0 h-px w-full bg-black/10" />

          <div className="pt-8">
            <div className="mb-4">
              <h2 className="mb-2 font-sans text-xl font-medium tracking-tight text-gray-900 md:text-2xl">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-4">
              <div className="border border-gray-200 bg-white px-5 py-4">
                <h3 className="text-sm font-medium text-gray-900">
                  Is {provider.name} down right now?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  This page shows the real-time status of {provider.name} services. We monitor{' '}
                  {provider.name}&apos;s official status page and display live component status,
                  active incidents, and incident history. If {provider.name} is experiencing issues,
                  consider using Bifrost to automatically route your requests to an alternative
                  provider with zero code changes.
                </p>
              </div>
              <div className="border border-gray-200 bg-white px-5 py-4">
                <h3 className="text-sm font-medium text-gray-900">
                  What should I do when {provider.name} is down?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  When {provider.name} experiences an outage, you can use{' '}
                  <a
                    href="https://www.getmaxim.ai/bifrost"
                    className="text-[#35c09e] underline underline-offset-2"
                  >
                    Bifrost
                  </a>{' '}
                  — an open-source AI gateway — to automatically failover to alternative providers.
                  Bifrost routes your LLM API requests through multiple providers, so if one goes
                  down, your application keeps running. No code changes required.
                </p>
              </div>
              <div className="border border-gray-200 bg-white px-5 py-4">
                <h3 className="text-sm font-medium text-gray-900">
                  How can I avoid downtime from {provider.name} outages?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  Use Bifrost to add automatic failover to your AI infrastructure. Bifrost is an
                  open-source LLM gateway that sits between your application and AI providers. It
                  monitors provider health and automatically routes requests to healthy alternatives
                  when an outage is detected — giving you 99.999% effective uptime.
                </p>
              </div>
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
            <StatusCTA providerName={provider.name} />
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
