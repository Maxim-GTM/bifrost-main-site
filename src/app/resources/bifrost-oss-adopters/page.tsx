import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ExternalLink, Globe } from 'lucide-react'
import ShowcaseLogo from '@/components/resources/ShowcaseLogo'
import { Button } from '@/components/ui/Button'

type ShowcaseCompany = {
  name: string
  url: string
  description: string
}

const showcaseCompanies: ShowcaseCompany[] = [
  {
    name: 'Acme AI',
    url: 'https://acme-ai.example',
    description:
      'Enterprise search and knowledge copilots routed through Bifrost for provider failover, centralized policy enforcement, and lower latency at production scale.',
  },
  {
    name: 'Northstar Health',
    url: 'https://northstar-health.example',
    description:
      'Healthcare operations workflows using Bifrost to standardize access to multiple model providers while preserving observability, auditability, and deployment flexibility.',
  },
  {
    name: 'Summit Commerce',
    url: 'https://summit-commerce.example',
    description:
      'Commerce teams using Bifrost to power support automation, search relevance, and catalog intelligence with one gateway across every model integration.',
  },
  {
    name: 'Atlas Financial',
    url: 'https://atlas-financial.example',
    description:
      'Financial services use cases that require low-latency routing, strict operational controls, and consistent governance across cloud and self-hosted AI providers.',
  },
  {
    name: 'Cobalt Systems',
    url: 'https://cobalt-systems.example',
    description:
      'Platform engineering teams adopting Bifrost as a shared control plane for internal tools, agents, and product workloads that depend on multiple model vendors.',
  },
  {
    name: 'Lumen Support',
    url: 'https://lumen-support.example',
    description:
      'Customer operations platforms built on Bifrost to orchestrate prompts, route traffic intelligently, and maintain reliable response quality across providers.',
  },
]

function getWebsiteLabel(url: string) {
  try {
    const { hostname, pathname } = new URL(url)
    const trimmedPathname = pathname === '/' ? '' : pathname.replace(/\/$/, '')
    return `${hostname.replace(/^www\./, '')}${trimmedPathname}`
  } catch {
    return url.replace(/^https?:\/\//i, '').replace(/\/$/, '')
  }
}

export const metadata: Metadata = {
  title: 'Bifrost OSS Adopters - Ecosystem Showcase',
  description:
    'Explore representative adopter profiles for teams building on Bifrost OSS across enterprise search, healthcare, commerce, financial services, and internal AI platforms.',
  keywords: [
    'Bifrost OSS',
    'Bifrost OSS adopters',
    'Bifrost showcase',
    'Bifrost ecosystem',
    'open source LLM gateway',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.getmaxim.ai/bifrost/resources/bifrost-oss-adopters',
    siteName: 'Bifrost by Maxim AI',
    title: 'Bifrost OSS Adopters - Ecosystem Showcase',
    description:
      'Explore representative adopter profiles for teams building on Bifrost OSS.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bifrost OSS Adopters',
    description:
      'Explore representative adopter profiles for teams building on Bifrost OSS.',
  },
  alternates: {
    canonical: 'https://www.getmaxim.ai/bifrost/resources/bifrost-oss-adopters',
  },
}

export default function BifrostOssAdoptersPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Bifrost OSS Adopters',
    description:
      'Representative adopter profiles for teams building on Bifrost OSS.',
    url: 'https://www.getmaxim.ai/bifrost/resources/bifrost-oss-adopters',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Bifrost by Maxim AI',
      url: 'https://www.getmaxim.ai/bifrost/',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Maxim AI',
      url: 'https://www.getmaxim.ai',
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: showcaseCompanies.length,
      itemListElement: showcaseCompanies.map((company, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: company.name,
        url: company.url,
        description: company.description,
      })),
    },
  }

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <link rel="preconnect" href="https://img.logo.dev" />
      <link rel="dns-prefetch" href="https://img.logo.dev" />

      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="text-center">
            <span className="font-mono text-[12px] leading-[15px] font-medium tracking-[0.04em] text-emerald-500 uppercase">
              [&ensp;BIFROST OSS SHOWCASE&ensp;]
            </span>
            <h1 className="mx-auto mt-2 mb-4 max-w-3xl text-[42px] leading-[120%] font-medium tracking-[-0.02em] text-black">
              <span className="text-[var(--accent-text)]">Bifrost OSS</span> Adopters
            </h1>
            <p className="mx-auto max-w-2xl text-[16px] leading-[140%] tracking-[0em] text-[#525252]">
              Teams using Bifrost OSS in production for governance, intelligent routing, cost control, guardrails, observability and enterprise-grade reliability in their AI infrastructure.
            </p>
          </div>
        </div>
      </section>

      <div className="relative flex w-full justify-center">
        <div className="hidden w-20 flex-none flex-col items-end gap-4 border-r border-black/10 xl:flex">
          <div
            className="h-full w-full bg-[#F6F6F6] opacity-[0.07]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='4' y='4' width='4' height='4' fill='black'/%3E%3Crect y='8' width='4' height='4' fill='black'/%3E%3Crect x='8' width='4' height='4' fill='black'/%3E%3C/svg%3E")`,
              backgroundSize: '4px 4px',
            }}
          ></div>
        </div>

        <div className="w-full max-w-[1100px] px-4 pb-16">
          <div className="absolute right-0 left-0 h-px w-full bg-black/10" />

          <div className="pt-8">
            <div className="mb-10 text-center">
              <p className="font-mono text-xs tracking-widest text-gray-400 uppercase">
                [ ECOSYSTEM SHOWCASE ]
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {showcaseCompanies.map((company) => (
                <article
                  key={company.name}
                  className="group relative flex h-full flex-col border border-gray-200 bg-white transition-all hover:border-[var(--accent-border)] hover:shadow-sm"
                >
                  <div className="absolute top-3 left-3 h-2 w-2 border-t border-l border-[var(--accent)] opacity-40" />
                  <div className="absolute top-3 right-3 h-2 w-2 border-t border-r border-[var(--accent)] opacity-40" />
                  <div className="absolute bottom-3 left-3 h-2 w-2 border-b border-l border-[var(--accent)] opacity-40" />
                  <div className="absolute right-3 bottom-3 h-2 w-2 border-r border-b border-[var(--accent)] opacity-40" />

                  <div className="flex items-start gap-4 border-b border-gray-200 p-6">
                    <ShowcaseLogo name={company.name} website={company.url} />

                    <div className="min-w-0 flex-1">
                      <h2 className="text-lg leading-tight text-gray-900 transition-colors group-hover:text-[var(--accent-text)]">
                        {company.name}
                      </h2>
                      <a
                        href={company.url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-flex max-w-full items-center gap-2 font-mono text-[11px] tracking-[0.04em] text-gray-500 transition-colors hover:text-[var(--accent-text)]"
                      >
                        <Globe className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">{getWebsiteLabel(company.url)}</span>
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <p className="flex-1 text-sm leading-relaxed text-gray-600">{company.description}</p>

                    <div className="mt-6">
                      <Button size="sm" asChild>
                        <a href={company.url} target="_blank" rel="noreferrer">
                          Visit Website
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

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

      <div className="relative flex w-full justify-center">
        <div className="hidden w-20 flex-none flex-col items-end gap-4 border-r border-black/10 xl:flex">
          <div
            className="h-full w-full bg-[#F6F6F6] opacity-[0.07]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='4' y='4' width='4' height='4' fill='black'/%3E%3Crect y='8' width='4' height='4' fill='black'/%3E%3Crect x='8' width='4' height='4' fill='black'/%3E%3C/svg%3E")`,
              backgroundSize: '4px 4px',
            }}
          ></div>
        </div>

        <div className="w-full max-w-[1100px] px-4 py-16">
          <div className="absolute right-0 left-0 h-px w-full bg-black/10" />

          <div className="pt-8 text-center">
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
              Ready to adopt Bifrost OSS in production?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-gray-600">
              Deploy the fastest open source enterprise AI gateway with intelligent model routing,
              observability, governance, guardrails and enterprise-ready controls for your AI Infrastructure.
            </p>
            <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row sm:items-center">
              <Link
                href="https://github.com/maximhq/bifrost"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg">
                  Get started on GitHub
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="https://docs.getbifrost.ai" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg">
                  Read the docs
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

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
