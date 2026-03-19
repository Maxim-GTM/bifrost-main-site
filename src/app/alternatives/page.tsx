import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Building2, Shield, Stethoscope } from 'lucide-react'
import { getCostCalculatorBaseUrl } from '@/lib/utils'
import FeatureMatrix from '@/components/resources/FeatureMatrix'
import DropInReplacement from '@/components/resources/DropInReplacement'
import EnterpriseTrialForm from '@/components/industry-pages/EnterpriseTrialForm'

export const metadata: Metadata = {
  title: ' Top AI Gateway Alternatives Compared | Bifrost (2026)',
  description:
    'Compare leading AI gateway platforms side by side. See how Bifrost stacks up against Portkey, LiteLLM, and Envoy AI Gateways on performance, governance, and MCP support.',
  keywords: [
        'AI Gateway Alternatives',
        'Litellm alternatives',
        'Envoy alternatives',
        'Portkey alternatives',
        'Production-grade AI Gateway',
        'Multi-model routing',
        'MCP support',
        'Governance',
        'Cost tracking',
        'Scalability',
        'Enterprise-grade security',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.getmaxim.ai/bifrost/alternatives',
    siteName: 'Bifrost by Maxim AI',
    title: ' Top AI Gateway Alternatives Compared | Bifrost (2026)',
    description:
      'Compare leading AI gateway platforms side by side. See how Bifrost stacks up against Portkey, LiteLLM, and Envoy AI Gateways on performance, governance, and MCP support.',
  },
  twitter: {
    card: 'summary_large_image',
    title: ' Top AI Gateway Alternatives Compared | Bifrost (2026)',
    description:
      'Compare leading AI gateway platforms side by side. See how Bifrost stacks up against Portkey, LiteLLM, and Envoy AI Gateways on performance, governance, and MCP support.',
  },
  alternates: {
    canonical: 'https://www.getmaxim.ai/bifrost/alternatives',
  },
}

const basePath = getCostCalculatorBaseUrl()
const gridSvg =
  'url("data:image/svg+xml,%3Csvg width=\'12\' height=\'12\' viewBox=\'0 0 12 12\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect x=\'4\' y=\'4\' width=\'4\' height=\'4\' fill=\'black\'/%3E%3Crect y=\'8\' width=\'4\' height=\'4\' fill=\'black\'/%3E%3Crect x=\'8\' width=\'4\' height=\'4\' fill=\'black\'/%3E%3C/svg%3E")'

const platforms = [
  {
    title: 'Portkey Alternatives',
    description:
      'As AI workloads scale, Portkey can hit ceilings on latency, self-hosting flexibility, and MCP support. See how leading gateways compare on the capabilities that matter in production.',
    href: `${basePath}/alternatives/portkey-alternatives`,
    icon: Building2,
    label: ' Portkey',
  },
  {
    title: 'LiteLLM Alternatives',
    description:
      'As AI workloads grow, LiteLLM can hit ceilings on throughput, operational complexity, and enterprise governance. See how leading gateways compare across multi-provider routing, cost management, and reliability at scale.',
    href: `${basePath}/alternatives/litellm-alternatives`,
    icon: Stethoscope,
    label: 'LiteLLM',
  },
  {
    title: 'Envoy Alternatives',
    description:
      'Envoy AI Gateway works for teams already deep in Kubernetes, but scaling AI workloads exposes missing caching, budget controls, guardrails, and multi-SDK support. Compare alternatives across developer experience, MCP capabilities, and production-grade governance.',
    href: `${basePath}/alternatives/envoy-alternatives`,
    icon: Shield,
    label: 'Envoy',
  },
 
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: ' Top AI Gateway Alternatives Compared | Bifrost (2026)',
  description:
    'Compare leading AI gateway platforms side by side. See how Bifrost stacks up against Portkey, LiteLLM, and Envoy AI Gateways on performance, governance, and MCP support.',
  url: 'https://www.getmaxim.ai/bifrost/alternatives',
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
    itemListElement: platforms.map((platform, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: platform.title,
      description: platform.description,
      url: `https://www.getmaxim.ai${platform.href}`,
    })),
  },
}

export default function AlternativesPage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-32 lg:px-8">
          <div className="text-center">
            <span className="font-mono text-[12px] leading-[15px] font-medium tracking-[0.04em] text-emerald-500 uppercase">
              [&ensp;AI GATEWAY ALTERNATIVES&ensp;]
            </span>
            <h1 className="mx-auto mt-2 mb-4 max-w-3xl text-[42px] leading-[120%] font-medium tracking-[-0.02em] text-black">
             Compare AI Gateway Platforms for Production Workloads
            </h1>
            <p className="mx-auto max-w-3xl text-[16px] leading-[140%] tracking-[0em] text-[#525252]">
            Production-grade AI Gateway requires multi-model routing, MCP support, governance, cost tracking, scalability, and enterprise-grade security. Compare leading gateways across every capability and see why Bifrost is the best choice for your production AI needs.
            </p>
          </div>
        </div>
      </section>

      <div className="relative flex w-full justify-center">
        <div className="hidden w-20 flex-none flex-col items-end gap-4 border-r border-black/10 xl:flex">
          <div
            className="h-full w-full bg-[#F6F6F6] opacity-[0.07]"
            style={{ backgroundImage: gridSvg, backgroundSize: '4px 4px' }}
          ></div>
        </div>

        <div className="w-full max-w-[1100px] px-4 pb-16">
          <div className="absolute right-0 left-0 h-px w-full bg-black/10" />

          <div className="pt-8">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <p className="font-mono text-xs tracking-widest text-gray-400 uppercase">
                [ PLATFORM COMPARISONS  ]
              </p>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
              Choose a platform to see a detailed feature-by-feature comparison against its top alternatives, with architecture breakdowns and migration guidance.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {platforms.map((platform) => (
                <Link
                  key={platform.title}
                  href={platform.href}
                  className="group relative border border-gray-200 bg-white transition-all hover:border-[var(--accent-border)] hover:shadow-sm"
                >
                  <div className="absolute top-3 left-3 h-2 w-2 border-t border-l border-[var(--accent)] opacity-40" />
                  <div className="absolute top-3 right-3 h-2 w-2 border-t border-r border-[var(--accent)] opacity-40" />
                  <div className="absolute bottom-3 left-3 h-2 w-2 border-b border-l border-[var(--accent)] opacity-40" />
                  <div className="absolute right-3 bottom-3 h-2 w-2 border-r border-b border-[var(--accent)] opacity-40" />
                  <div className="flex items-center justify-between border-b border-gray-200 p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center bg-[var(--accent)]/10 text-[var(--accent-text)]">
                        <platform.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-mono text-xs tracking-widest text-gray-400 uppercase">
                          {platform.label}
                        </p>
                        <h2 className="text-sm text-gray-900">{platform.title}</h2>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400 transition-colors group-hover:text-[var(--accent-text)]" />
                  </div>
                  <div className="p-6">
                    <p className="text-sm leading-relaxed text-gray-600">{platform.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden w-20 flex-none flex-col items-start gap-4 border-l border-black/10 xl:flex">
          <div
            className="h-full w-full bg-[#F6F6F6] opacity-[0.07]"
            style={{ backgroundImage: gridSvg, backgroundSize: '4px 4px' }}
          ></div>
        </div>
      </div>

      {/* Feature Matrix */}
      <div className="relative flex w-full justify-center">
        <div className="hidden w-20 flex-none flex-col items-end gap-4 border-r border-black/10 xl:flex">
          <div
            className="h-full w-full bg-[#F6F6F6] opacity-[0.07]"
            style={{ backgroundImage: gridSvg, backgroundSize: '4px 4px' }}
          ></div>
        </div>

        <div className="w-full max-w-[1100px] px-4 pb-16">
          <div className="absolute right-0 left-0 h-px w-full bg-black/10" />
          <section className="bg-white py-16 md:py-24">
            <div className="mb-12 text-center">
              <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
                [ BIFROST FEATURES ]
              </p>
              <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">Open Source & Enterprise</h2>
              <p className="mx-auto max-w-2xl text-gray-600">
                Everything you need to run AI in production, from free open source to
                enterprise-grade security features.
              </p>
            </div>
            <FeatureMatrix />
          </section>
        </div>

        <div className="hidden w-20 flex-none flex-col items-start gap-4 border-l border-black/10 xl:flex">
          <div
            className="h-full w-full bg-[#F6F6F6] opacity-[0.07]"
            style={{ backgroundImage: gridSvg, backgroundSize: '4px 4px' }}
          ></div>
        </div>
      </div>

      {/* Free Trial Form */}
      <div className="relative flex w-full justify-center">
        <div className="hidden w-20 flex-none flex-col items-end gap-4 border-r border-black/10 xl:flex">
          <div
            className="h-full w-full bg-[#F6F6F6] opacity-[0.07]"
            style={{ backgroundImage: gridSvg, backgroundSize: '4px 4px' }}
          ></div>
        </div>

        <div className="w-full max-w-[1100px] px-4 pb-16">
          <div className="absolute right-0 left-0 h-px w-full bg-black/10" />
          <section className="bg-white py-8 md:py-12">
            <EnterpriseTrialForm />
          </section>
        </div>

        <div className="hidden w-20 flex-none flex-col items-start gap-4 border-l border-black/10 xl:flex">
          <div
            className="h-full w-full bg-[#F6F6F6] opacity-[0.07]"
            style={{ backgroundImage: gridSvg, backgroundSize: '4px 4px' }}
          ></div>
        </div>
      </div>

      {/* Drop-in Replacement */}
      <div className="relative flex w-full justify-center">
        <div className="hidden w-20 flex-none flex-col items-end gap-4 border-r border-black/10 xl:flex">
          <div
            className="h-full w-full bg-[#F6F6F6] opacity-[0.07]"
            style={{ backgroundImage: gridSvg, backgroundSize: '4px 4px' }}
          ></div>
        </div>

        <div className="w-full max-w-[1100px] bg-gray-50 px-4 pb-16">
          <div className="absolute right-0 left-0 h-px w-full bg-black/10" />
          <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
            <DropInReplacement />
          </section>
        </div>

        <div className="hidden w-20 flex-none flex-col items-start gap-4 border-l border-black/10 xl:flex">
          <div
            className="h-full w-full bg-[#F6F6F6] opacity-[0.07]"
            style={{ backgroundImage: gridSvg, backgroundSize: '4px 4px' }}
          ></div>
        </div>
      </div>
    </div>
  )
}
