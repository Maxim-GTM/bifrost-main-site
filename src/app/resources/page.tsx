import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Activity,
  BookOpen,
  ShieldCheck,
  Building2,
  Stethoscope,
  Shield,
  ShoppingCart,
  Plug,
  RefreshCw,
  Zap,
} from 'lucide-react'
import { getCostCalculatorBaseUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Bifrost Resources - Benchmarks, Guides & Integration Playbooks',
  description:
    'Explore Bifrost benchmarks, buyer guidance, integration playbooks, and industry solutions. Everything you need to evaluate and deploy the fastest LLM gateway.',
  keywords: [
    'Bifrost',
    'LLM gateway',
    'AI gateway benchmarks',
    'buyer guide',
    'Claude Code integration',
    'MCP gateway',
    'LiteLLM alternative',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.getmaxim.ai/bifrost/resources',
    siteName: 'Bifrost by Maxim AI',
    title: 'Bifrost Resources - Benchmarks, Guides & Integration Playbooks',
    description:
      'Explore Bifrost benchmarks, buyer guidance, integration playbooks, and industry solutions.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bifrost Resources - Benchmarks, Guides & Integration Playbooks',
    description:
      'Explore Bifrost benchmarks, buyer guidance, integration playbooks, and industry solutions.',
  },
  alternates: {
    canonical: 'https://www.getmaxim.ai/bifrost/resources',
  },
}

const basePath = getCostCalculatorBaseUrl()

const resources = [
  {
    title: 'Performance Benchmarks',
    description:
      'Live comparisons, latency metrics, and throughput data that show why Bifrost is the fastest LLM gateway.',
    href: `${basePath}/resources/benchmarks`,
    icon: Activity,
    label: 'Performance',
  },
  {
    title: "LLM Gateway Buyer's Guide",
    description:
      'A comprehensive comparison of leading AI gateway platforms, capabilities, and trade-offs.',
    href: `${basePath}/resources/buyers-guide`,
    icon: BookOpen,
    label: 'Guide',
  },
  {
    title: 'Claude Code Integration',
    description:
      'Enterprise controls for Claude Code with multi-provider routing, governance, and observability.',
    href: `${basePath}/resources/claude-code`,
    icon: ShieldCheck,
    label: 'Integration',
  },
  {
    title: 'MCP Gateway',
    description:
      'High-performance tool execution for AI agents with explicit approvals and full audit trails.',
    href: `${basePath}/resources/mcp-gateway`,
    icon: Plug,
    label: 'MCP',
  },
  {
    title: 'Migrating from LiteLLM',
    description:
      'Step-by-step guide to migrate from LiteLLM to Bifrost in 15 minutes with zero code changes.',
    href: `${basePath}/resources/migrating-from-litellm`,
    icon: RefreshCw,
    label: 'Migration',
  },
  {
    title: 'LiteLLM Alternative',
    description:
      'Why teams choose Bifrost over LiteLLM: 50x faster, zero-config deployment, and native observability.',
    href: `${basePath}/resources/litellm-alternative`,
    icon: Zap,
    label: 'Alternative',
  },
]

const industries = [
  {
    title: 'Financial Institutions',
    description:
      'Secure AI gateway for regulated banking, insurance, and investment services with audit-grade controls.',
    href: `${basePath}/resources/financial-institutions`,
    icon: Building2,
    label: 'Financial Services',
  },
  {
    title: 'Healthcare & Life Sciences',
    description:
      'Governed AI workflows with auditability and data controls for sensitive clinical systems.',
    href: `${basePath}/resources/healthcare-life-sciences`,
    icon: Stethoscope,
    label: 'Healthcare',
  },
  {
    title: 'Retail',
    description:
      'High-performance AI gateway for personalization, recommendations, and omnichannel retail experiences.',
    href: `${basePath}/resources/retail`,
    icon: ShoppingCart,
    label: 'Retail',
  },
  {
    title: 'Public Sector',
    description:
      'Secure deployments with policy enforcement for government and regulated programs.',
    href: '#',
    icon: Shield,
    label: 'Government',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Bifrost Resources - Benchmarks, Guides & Integration Playbooks',
  description:
    'Explore Bifrost benchmarks, buyer guidance, integration playbooks, and industry solutions. Everything you need to evaluate and deploy the fastest LLM gateway.',
  url: 'https://www.getmaxim.ai/bifrost/resources',
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
    itemListElement: resources.map((r, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: r.title,
      description: r.description,
      url: `https://www.getmaxim.ai${r.href}`,
    })),
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-32 lg:px-8">
          <div className="text-center">
            <span className="font-mono text-[12px] leading-[15px] font-medium tracking-[0.04em] text-emerald-500 uppercase">
              [&ensp;BIFROST RESOURCES HUB&ensp;]
            </span>
            <h1 className="mx-auto mt-2 mb-4 max-w-2xl text-[42px] leading-[120%] font-medium tracking-[-0.02em] text-black">
              The Fastest Path to Bifrost Insights
            </h1>
            <p className="mx-auto max-w-2xl text-[16px] leading-[140%] tracking-[0em] text-[#525252]">
              Explore benchmarks, buyer guidance, and integration playbooks. Everything you need to
              evaluate and deploy Bifrost with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
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
            <div className="mb-10 text-center">
              <p className="font-mono text-xs tracking-widest text-gray-400 uppercase">
                [ RESOURCES ]
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {resources.map((resource) => (
                <Link
                  key={resource.title}
                  href={resource.href}
                  className="group relative border border-gray-200 bg-white transition-all hover:border-[var(--accent-border)] hover:shadow-sm"
                >
                  <div className="absolute top-3 left-3 h-2 w-2 border-t border-l border-[var(--accent)] opacity-40" />
                  <div className="absolute top-3 right-3 h-2 w-2 border-t border-r border-[var(--accent)] opacity-40" />
                  <div className="absolute bottom-3 left-3 h-2 w-2 border-b border-l border-[var(--accent)] opacity-40" />
                  <div className="absolute right-3 bottom-3 h-2 w-2 border-r border-b border-[var(--accent)] opacity-40" />
                  <div className="flex items-center justify-between border-b border-gray-200 p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center bg-[var(--accent)]/10 text-[var(--accent-text)]">
                        <resource.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-mono text-xs tracking-widest text-gray-400 uppercase">
                          {resource.label}
                        </p>
                        <h3 className="text-sm text-gray-900">{resource.title}</h3>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400 transition-colors group-hover:text-[var(--accent-text)]" />
                  </div>
                  <div className="p-6">
                    <p className="text-sm leading-relaxed text-gray-600">{resource.description}</p>
                  </div>
                </Link>
              ))}
            </div>
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

      {/* Industries Grid */}
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
            <div className="mb-10 text-center">
              <p className="font-mono text-xs tracking-widest text-gray-400 uppercase">
                [ INDUSTRIES ]
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                        <h3 className="text-sm text-gray-900">{industry.title}</h3>
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
