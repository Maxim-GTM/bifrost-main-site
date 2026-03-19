import { Metadata } from 'next'
import Link from 'next/link'
import FeatureMatrix from '@/components/resources/FeatureMatrix'
import InterfaceHighlights from '@/components/resources/InterfaceHighlights'
import DropInReplacement from '@/components/resources/DropInReplacement'
import ComplianceSection from '@/components/industry-pages/ComplianceSection'
import { Button } from '@/components/ui/Button'
import { getCostCalculatorBaseUrl } from '@/lib/utils'
import {
  ArrowRight,
  ShieldCheck,
  ShieldOff,
  FileCheck,
  Scale,
  Banknote,
  ExternalLink,
  PlugZap,
  ScrollText,
  Server,
  Network,
  Database,
  AlertTriangle,
  EyeOff,
  Bot,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI Gateway for Energy & Utilities | Bifrost',
  description:
    'Secure AI gateway for energy and utility operations with air-gapped deployment, audit-ready logging, compliant routing, and governed access to operational data.',
  alternates: {
    canonical: 'https://www.getmaxim.ai/bifrost/industry-pages/energy',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'AI Gateway for Energy & Utilities | Bifrost',
  description:
    'Secure AI gateway for energy and utility operations with air-gapped deployment, audit-ready logging, compliant routing, and governed access to operational data.',
  url: 'https://www.getmaxim.ai/bifrost/industry-pages/energy',
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
      'Bifrost is a secure AI gateway for energy and utility operations with governed access to operational data, audit-ready logging, and compliant routing.',
  },
  audience: {
    '@type': 'Audience',
    audienceType: 'Energy and utility operations teams',
  },
}

const challenges = [
  {
    icon: ShieldOff,
    title: 'Ungoverned AI usage',
    description:
      'Without an approved gateway, engineers use consumer LLM tools with operational data, creating compliance exposure and no audit trail.',
  },
  {
    icon: AlertTriangle,
    title: 'Compliance-blocked LLM access',
    description:
      'Cloud LLM calls that touch operational data cross the security perimeter, blocking the highest-value AI use cases.',
  },
  {
    icon: EyeOff,
    title: 'Siloed AI usage',
    description:
      'Teams adopt different LLM providers with no central visibility into usage, cost, or what data reaches each model.',
  },
]

const governance = [
  {
    icon: Server,
    title: 'Air-gapped on-prem deployment',
    description:
      'Run Bifrost inside your existing network perimeter so operational data never transits to external infrastructure.',
  },
  {
    icon: ScrollText,
    title: 'Immutable audit logs',
    description:
      'Capture every AI request with user, timestamp, model, and data source details in tamper-evident storage for compliance reviews.',
  },
  {
    icon: ShieldCheck,
    title: 'Guardrails and content policies',
    description:
      'Enforce policies on model inputs and outputs, redacting sensitive data and restricting unsafe or non-compliant responses.',
  },
  {
    icon: FileCheck,
    title: 'Model change control',
    description:
      'Pin production workloads to specific model versions so updates only happen through a documented review and approval process.',
  },
]

const platformCapabilities = [
  {
    icon: Bot,
    title: 'MCP Gateway',
    description:
      'Connect AI to historian, ERP, and document systems through governed tool execution with access controls.',
  },
  {
    icon: Network,
    title: 'High-availability clustering',
    description:
      'Peer-to-peer clustering with automatic failover and zero-downtime updates across self-hosted nodes.',
  },
  {
    icon: Database,
    title: 'Semantic caching',
    description:
      'Cache repeated queries and responses across teams to avoid duplicate model calls and reduce API costs.',
  },
  {
    icon: PlugZap,
    title: 'Drop-in SDK compatibility',
    description:
      'Single-line replacement for any AI gateway or SDK, enabling routing, observability, and access control.',
  },
  {
    icon: Scale,
    title: 'Adaptive load balancing',
    description:
      'Distribute requests across models and providers using real-time performance and success signals.',
  },
  {
    icon: Banknote,
    title: 'Cost attribution',
    description:
      'Tag AI usage by plant, business unit, or cost center for chargeback and budget enforcement.',
  },
]

const interfaceHighlights = [
  {
    riveSrc: '/rive/lln9t3OuTneA9tQOi8XMPNlfNCk.riv',
    title: 'Operations dashboard',
    description:
      'Live monitoring of request routing, provider health, and system performance across facilities.',
  },
  {
    riveSrc: '/rive/c0tVyQYkMtvuhTCKvA0SjGVHkY.riv',
    title: 'Audit log viewer',
    description:
      'Searchable request trails with user, model, and data source details ready for compliance review.',
  },
  {
    riveSrc: '/rive/KBbyqDZQ7ko6obmMhOt3hllKA.riv',
    title: 'Virtual keys and budgets',
    description:
      'Per-team and per-facility budget enforcement with usage limits and cost center tagging.',
  },
]

const useCases = [
  {
    title: 'Operational knowledge base',
    description:
      'Give field engineers natural-language access to maintenance records, engineering documents, and equipment history with governed retrieval.',
  },
  {
    title: 'Internal AI rollout',
    description:
      'Provide employees access to approved LLMs routed through Bifrost instead of ungoverned consumer tools, with full usage visibility.',
  },
  {
    title: 'Coding agent governance',
    description:
      'Route developer coding agents through Bifrost for centralized visibility into model usage, cost tracking, and data exposure controls.',
  },
  {
    title: 'Regulatory document intelligence',
    description:
      'Search and cross-reference compliance standards, rate case filings, and internal policy documents with AI-assisted retrieval and comparison.',
  },
  {
    title: 'HSE safety copilot',
    description:
      'Provide field crews with instant access to safety procedures, permit requirements, and incident investigation templates through governed AI.',
  },
  {
    title: 'Capital project copilot',
    description:
      'Accelerate project planning and risk assessment by querying ERP work orders, scheduling systems, and engineering specifications in one interface.',
  },
]

export default function EnergyPage() {
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
              Secure AI Gateway for
              <br />
              <span className="text-[var(--accent-text)]">Energy and Utility Operations</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-gray-500 md:text-base">
            Air-gapped AI infrastructure deployed inside your network perimeter, enforcing governed model access, audit-ready logging, and low-latency routing.
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
              Why operational AI stalls at energy companies
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
            High-value AI use cases are blocked by compliance boundaries and infrastructure constraints.
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
              Controls that satisfy compliance without blocking teams
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
            Deploy Bifrost in your environment and enforce consistent policies across every AI request touching operational or enterprise data.
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
              Built for operational scale in regulated energy environments
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Unified gateway for AI routing, observability, and tool access across enterprise and operational workloads.
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
              [ OPERATIONAL CAPABILITIES ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
              Operational views built for energy compliance teams
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Focused dashboards for routing visibility, audit evidence, and usage governance.
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
              AI workflows Bifrost enables across energy operations
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

      <ComplianceSection />

      {/* CTA */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
            [ NEXT STEPS ]
          </p>
          <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
            Deploy compliant AI infrastructure for energy operations
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-600">
            Talk to the Bifrost team about air-gapped deployment, operational data access, and audit-ready governance in your environment.
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

      {/* Drop-in Replacement */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <DropInReplacement />
        </div>
      </section>
    </div>
  )
}
