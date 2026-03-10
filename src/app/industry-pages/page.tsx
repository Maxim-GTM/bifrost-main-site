import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Building2, Shield, ShoppingCart, Stethoscope } from 'lucide-react'
import { getCostCalculatorBaseUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Governed AI Infrastructure by Industry | Bifrost',
  description:
    'Explore Bifrost Enterprise AI Gateway for financial services, healthcare, insurance, and retail with secure deployment, governance, and intelligent model routing.',
  keywords: [
    'AI infrastructure by industry',
    'Bifrost industry solutions',
    'AI gateway for banking',
    'AI gateway for healthcare',
    'AI gateway for insurance',
    'AI gateway for retail',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.getmaxim.ai/bifrost/industry-pages',
    siteName: 'Bifrost by Maxim AI',
    title: 'Governed AI Infrastructure by Industry | Bifrost',
    description:
      'Explore Bifrost Enterprise AI Gateway for financial services, healthcare, insurance, and retail with secure deployment, governance, and intelligent model routing.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Governed AI Infrastructure by Industry | Bifrost',
    description:
      'Explore Bifrost Enterprise AI Gateway for financial services, healthcare, insurance, and retail with secure deployment, governance, and intelligent model routing.',
  },
  alternates: {
    canonical: 'https://www.getmaxim.ai/bifrost/industry-pages',
  },
}

const basePath = getCostCalculatorBaseUrl()

const industries = [
  {
    title: 'Financial Services and Banking',
    description:
      'Secure AI infrastructure for banking, investment, and fintech teams that need audit-grade controls and air-gapped deployment options.',
    href: `${basePath}/industry-pages/financial-services-and-banking`,
    icon: Building2,
    label: 'Financial Services',
  },
  {
    title: 'Healthcare & Life Sciences',
    description:
      'Governed AI infrastructure for clinical, research, and operational workflows with PHI protection, auditability, and resilient routing.',
    href: `${basePath}/industry-pages/healthcare-life-sciences`,
    icon: Stethoscope,
    label: 'Healthcare',
  },
  {
    title: 'Insurance',
    description:
      'Purpose-built AI infrastructure for carriers with NAIC-ready audit trails, NPI redaction, and cost governance across lines of business.',
    href: `${basePath}/industry-pages/insurance`,
    icon: Shield,
    label: 'Insurance',
  },
  {
    title: 'Retail',
    description:
      'High-performance AI routing for personalization, support, and omnichannel retail workloads with centralized governance and observability.',
    href: `${basePath}/industry-pages/retail`,
    icon: ShoppingCart,
    label: 'Retail',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Governed AI Infrastructure by Industry',
  description:
    'Explore Bifrost AI infrastructure for financial services, healthcare, insurance, and retail with secure deployment, governance, and low-latency routing.',
  url: 'https://www.getmaxim.ai/bifrost/industry-pages',
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
    itemListElement: industries.map((industry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: industry.title,
      description: industry.description,
      url: `https://www.getmaxim.ai${industry.href}`,
    })),
  },
}

export default function IndustryPagesHomePage() {
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
              [&ensp;BIFROST FOR INDUSTRIES&ensp;]
            </span>
            <h1 className="mx-auto mt-2 mb-4 max-w-3xl text-[42px] leading-[120%] font-medium tracking-[-0.02em] text-black">
              Governed AI Infrastructure for the Industries That Need It Most
            </h1>
            <p className="mx-auto max-w-3xl text-[16px] leading-[140%] tracking-[0em] text-[#525252]">
              Explore how Bifrost supports regulated, high-scale, and customer-facing teams with
              secure deployments, centralized governance, and low-latency AI routing.
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
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <p className="font-mono text-xs tracking-widest text-gray-400 uppercase">
                [ INDUSTRY SOLUTIONS ]
              </p>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                Choose the deployment context closest to your team, then drill into the governance,
                architecture, and workflow patterns that matter in production.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {industries.map((industry) => (
                <Link
                  key={industry.title}
                  href={industry.href}
                  className="group relative border border-gray-200 bg-white transition-all hover:border-[var(--accent-border)] hover:shadow-sm"
                >
                  <div className="absolute top-3 left-3 h-2 w-2 border-t border-l border-[var(--accent)] opacity-40" />
                  <div className="absolute top-3 right-3 h-2 w-2 border-t border-r border-[var(--accent)] opacity-40" />
                  <div className="absolute bottom-3 left-3 h-2 w-2 border-b border-l border-[var(--accent)] opacity-40" />
                  <div className="absolute right-3 bottom-3 h-2 w-2 border-r border-b border-[var(--accent)] opacity-40" />
                  <div className="flex items-center justify-between border-b border-gray-200 p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center bg-[var(--accent)]/10 text-[var(--accent-text)]">
                        <industry.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-mono text-xs tracking-widest text-gray-400 uppercase">
                          {industry.label}
                        </p>
                        <h2 className="text-sm text-gray-900">{industry.title}</h2>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400 transition-colors group-hover:text-[var(--accent-text)]" />
                  </div>
                  <div className="p-6">
                    <p className="text-sm leading-relaxed text-gray-600">{industry.description}</p>
                  </div>
                </Link>
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
    </div>
  )
}
