import { Metadata } from 'next'
import Link from 'next/link'
import FeatureMatrix from '@/components/resources/FeatureMatrix'
import InterfaceHighlights from '@/components/resources/InterfaceHighlights'
import DeploymentOptions from '@/components/resources/DeploymentOptions'
import DropInReplacement from '@/components/resources/DropInReplacement'
import EnterpriseTrialForm from '@/components/industry-pages/EnterpriseTrialForm'
import ComplianceLogoStrip from '@/components/industry-pages/ComplianceLogoStrip'
import { Button } from '@/components/ui/Button'
import { getCostCalculatorBaseUrl } from '@/lib/utils'
import {
  ArrowRight,
  Server,
  CreditCard,
  Database,
  ExternalLink,
  GitBranch,
  KeyRound,
  Network,
  Plug,
  Scale,
  ScrollText,
  ShieldAlert,
  TrendingUp,
  Unplug,
  Zap,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI Gateway for Retail and E-Commerce | Bifrost',
  description:
    'Bifrost helps retail and eCommerce teams govern AI across every channel, route traffic through peak events, and keep payment data out of LLM scope.',
  alternates: {
    canonical: 'https://www.getmaxim.ai/bifrost/industry-pages/retail',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'AI Gateway for Retail | Bifrost',
  description:
    'Bifrost helps retail and eCommerce teams govern AI across every channel, route traffic through peak events, and keep payment data out of LLM scope.',
  url: 'https://www.getmaxim.ai/bifrost/industry-pages/retail',
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
  about: {
    '@type': 'SoftwareApplication',
    name: 'Bifrost',
    applicationCategory: 'BusinessApplication',
    description:
      'Bifrost helps retail and eCommerce teams govern AI across every channel, route traffic through peak events, and keep payment data out of LLM scope.',
  },
  audience: {
    '@type': 'Audience',
    audienceType: 'Retail teams',
  },
}

const challenges = [
  {
    icon: TrendingUp,
    title: 'Seasonal traffic exposure',
    description:
      'Black Friday and flash sales drive 10-50x traffic spikes. Standard gateways have no way to distribute load across providers automatically.',
  },
  {
    icon: ShieldAlert,
    title: 'Ungoverned AI use',
    description:
      'Employees use personal AI tools on payment records, customer PII, and supplier data without governance, creating PCI-DSS and CCPA liability.',
  },
  {
    icon: Unplug,
    title: 'Integration complexity',
    description:
      'Connecting LLMs to commerce platforms, inventory systems, and data warehouses via custom code delays deployment and complicates auditing.',
  },
]

const governance = [
  {
    icon: CreditCard,
    title: 'PCI-DSS payment guardrails',
    description:
      'Block PII such as card numbers and CVVs before they reach any LLM, keeping customer-facing AI outside PCI audit scope.',
  },
  {
    icon: KeyRound,
    title: 'Granular access and budget controls',
    description:
      'Create virtual keys with scoped model access, usage limits, and per-team, user, or application budget controls.',
  },
  {
    icon: ScrollText,
    title: 'Audit-ready logging',
    description:
      'Capture every model interaction with user ID, timestamp, and token detail to satisfy PCI Requirement 10 and CCPA obligations.',
  },
  {
    icon: Plug,
    title: 'MCP tool governance',
    description:
      'Enable governed and auditable access to MCP tools across connected systems including product catalogs, order management, and inventory.',
  },
]

const useCases = [
  {
    title: 'AI shopping assistant',
    description:
      'Route conversational commerce queries through a governed, high-availability layer that stays live when upstream providers degrade.',
  },
  {
    title: 'Real-time personalization',
    description:
      'Serve homepage and product recommendations at scale, with semantic caching cutting repeat query costs across high-traffic pages.',
  },
  {
    title: 'Customer and merchant support',
    description:
      'Automate order status, returns, and seller support queries with governed MCP tool access to commerce systems.',
  },
  {
    title: 'Enterprise AI adoption',
    description:
      'Give engineering, merchandising, and ops teams governed access to leading models with centralized budgeting and audit trails.',
  },
  {
    title: 'Product content generation',
    description:
      'Generate titles, descriptions, and SEO metadata across thousands of SKUs using cost-optimized batch model routing.',
  },
  {
    title: 'Demand forecasting',
    description:
      'Connect LLMs to ERP and inventory systems via MCP so buyers can query forecasts and get reasoning behind every recommendation.',
  }
]

const platformCapabilities = [
  {
    icon: Scale,
    title: 'Adaptive load balancing',
    description:
      'Automatically distributes traffic across providers, routing away from rate-limited or degraded endpoints when traffic spikes or providers fail.',
  },
  {
    icon: Database,
    title: 'Semantic caching',
    description:
      'Serves near-identical user queries from cache to reduce live LLM calls and provider costs.',
  },
  {
    icon: Network,
    title: 'Horizontal cluster scaling',
    description:
      'Peer-to-peer cluster architecture adds capacity in minutes, allowing traffic to scale from baseline to peak without config changes or downtime.',
  },
  {
    icon: Zap,
    title: 'Ultra-low latency overhead',
    description:
      'Maintains ~100 µs overhead at 5,000 RPS even with governance, routing, caching, and plugins enabled.',
  },
  {
    icon: GitBranch,
    title: 'Multi-provider support and fallbacks',
    description:
      'Route requests across multiple models and providers with automatic failover through a single-line integration.',
  },
  {
    icon: Server,
    title: 'In-VPC and air-gapped deployment',
    description:
      'Deploy inside your cloud VPC so customer PII and cardholder data never leave your network perimeter.',
  },
]

const interfaceHighlights = [
  {
    riveSrc: '/rive/lln9t3OuTneA9tQOi8XMPNlfNCk.riv',
    title: 'Built-in observability',
    description:
      'Live monitoring of request volume, provider distribution, and routing decisions to track system behavior.',
  },
  {
    riveSrc: '/rive/c0tVyQYkMtvuhTCKvA0SjGVHkY.riv',
    title: 'Compliance audit logs',
    description:
      'Searchable request history with metadata supporting PCI Requirement 10, CCPA data lineage, and DSARs.',
  },
  {
    riveSrc: '/rive/KBbyqDZQ7ko6obmMhOt3hllKA.riv',
    title: 'Budget and access controls',
    description:
      'Per-team virtual keys, spend limits, and usage summaries for finance and platform team visibility.',
  },
]

export default function RetailPage() {
  const basePath = getCostCalculatorBaseUrl()

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="text-center">
            <span className="provider-badge">[ ENTERPRISE READY: VPC | ON-PREM | AIR-GAPPED ]</span>
            <h1 className="mb-4 text-center text-4xl leading-[1.2] font-normal tracking-tight text-gray-900 md:text-5xl">
              Most Scalable AI Gateway Built for
              <br />
              <span className="text-[var(--accent-text)]">Retail and E-Commerce</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-gray-500 md:text-base">
            Unified routing, spend controls, and access governance for customer-facing and internal AI workloads.
            </p>
            <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row sm:items-center">
              <Link href={`${basePath}/resources/benchmarks`}>
                <Button size="lg">
                  View benchmarks
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link
                href="https://docs.getmaxim.ai/bifrost"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg">
                  View documentation
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ CHALLENGES ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
              Why retail AI stalls before it reaches production
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
            Customer-facing AI and fragmented providers require strong governance; integration complexity, peak costs, and ungoverned usage hinder scaling.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {challenges.map((item) => (
              <div
                key={item.title}
                className="relative border border-gray-200 bg-white p-6 transition-all hover:border-[var(--accent-border)] hover:shadow-sm"
              >
                <div className="absolute top-3 left-3 h-2 w-2 border-t border-l border-[var(--accent)] opacity-40" />
                <div className="absolute top-3 right-3 h-2 w-2 border-t border-r border-[var(--accent)] opacity-40" />
                <div className="absolute bottom-3 left-3 h-2 w-2 border-b border-l border-[var(--accent)] opacity-40" />
                <div className="absolute right-3 bottom-3 h-2 w-2 border-r border-b border-[var(--accent)] opacity-40" />
                <item.icon className="mb-4 h-6 w-6 text-[var(--accent)]" />
                <h3 className="mb-2 text-gray-900">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ GOVERNANCE ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
              Compliance controls for Retail and E-Commerce
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Deploy Bifrost inside your existing environment and apply consistent access
              rules and spend limits across every team and use case.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {governance.map((item) => (
              <div key={item.title} className="relative border border-gray-200 bg-white p-6">
                <div className="absolute top-3 left-3 h-2 w-2 border-t border-l border-[var(--accent)] opacity-40" />
                <div className="absolute top-3 right-3 h-2 w-2 border-t border-r border-[var(--accent)] opacity-40" />
                <div className="absolute bottom-3 left-3 h-2 w-2 border-b border-l border-[var(--accent)] opacity-40" />
                <div className="absolute right-3 bottom-3 h-2 w-2 border-r border-b border-[var(--accent)] opacity-40" />
                <item.icon className="mb-4 h-6 w-6 text-[var(--accent)]" />
                <h3 className="mb-2 text-sm text-gray-900">{item.title}</h3>
                <p className="text-xs leading-relaxed text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Capabilities */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ PLATFORM CAPABILITIES ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
              Infrastructure built for omnichannel retail operations
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Routing, caching, and integration capabilities designed for the volume and latency demands of customer-facing workflows.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {platformCapabilities.map((item) => (
              <div
                key={item.title}
                className="relative border border-gray-200 bg-white p-6 transition-all hover:border-[var(--accent-border)] hover:shadow-sm"
              >
                <div className="absolute top-3 left-3 h-2 w-2 border-t border-l border-[var(--accent)] opacity-40" />
                <div className="absolute top-3 right-3 h-2 w-2 border-t border-r border-[var(--accent)] opacity-40" />
                <div className="absolute bottom-3 left-3 h-2 w-2 border-b border-l border-[var(--accent)] opacity-40" />
                <div className="absolute right-3 bottom-3 h-2 w-2 border-r border-b border-[var(--accent)] opacity-40" />
                <item.icon className="mb-4 h-6 w-6 text-[var(--accent)]" />
                <h3 className="mb-2 text-gray-900">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interface Highlights */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ BIFROST INTERFACE ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
              Operational visibility designed for retail environments
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Focused views for monitoring AI traffic, reviewing audit trails, and managing spend by team and workload.
            </p>
          </div>
          <InterfaceHighlights items={interfaceHighlights} />
        </div>
      </section>

      {/* Use cases */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ USE CASES ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
              Retail workflows that run on Bifrost
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((item) => (
              <div
                key={item.title}
                className="relative border border-gray-200 bg-white p-6 transition-all hover:border-[var(--accent-border)] hover:shadow-sm"
              >
                <div className="absolute top-3 left-3 h-2 w-2 border-t border-l border-[var(--accent)] opacity-40" />
                <div className="absolute top-3 right-3 h-2 w-2 border-t border-r border-[var(--accent)] opacity-40" />
                <div className="absolute bottom-3 left-3 h-2 w-2 border-b border-l border-[var(--accent)] opacity-40" />
                <div className="absolute right-3 bottom-3 h-2 w-2 border-r border-b border-[var(--accent)] opacity-40" />
                <h3 className="mb-2 text-gray-900">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ DEPLOYMENT ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
              Secure deployment
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Run Bifrost wherever your compliance requirements demand - on-prem, in-VPC, or
              hybrid.
            </p>
          </div>
          <DeploymentOptions />
        </div>
      </section>
      {/* CTA */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
            [ NEXT STEPS ]
          </p>
          <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
            Get your AI infrastructure ready before peak season
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-600">
            Talk to the Bifrost team about peak traffic readiness, AI governance, or cost control for your current stack.
          </p>
          <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row sm:items-center">
            <Link
              href="https://www.getmaxim.ai/bifrost/book-a-demo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg">
                Book a demo
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="https://www.getmaxim.ai/bifrost/enterprise">
              <Button variant="outline" size="lg">
                Try Bifrost Enterprise
                <ExternalLink className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <ComplianceLogoStrip className="mt-10" />
        </div>
      </section>

      {/* Feature Matrix */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ BIFROST FEATURES ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">Open Source & Enterprise</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Everything you need to run AI in production, from free open source to enterprise-grade
              features.
            </p>
          </div>
          <FeatureMatrix />
        </div>
      </section>

      {/* Free Trial Form */}
      <section className="bg-white py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <EnterpriseTrialForm />
        </div>
      </section>

      {/* Drop-in Replacement */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <DropInReplacement />
        </div>
      </section>
    </div>
  )
}
