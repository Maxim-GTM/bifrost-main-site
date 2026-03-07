import { Metadata } from 'next'
import Link from 'next/link'
import FeatureMatrix from '@/components/resources/FeatureMatrix'
import InterfaceHighlights from '@/components/resources/InterfaceHighlights'
import DropInReplacement from '@/components/resources/DropInReplacement'
import { Button } from '@/components/ui/Button'
import { getCostCalculatorBaseUrl } from '@/lib/utils'
import {
  ArrowRight,
  Banknote,
  ClipboardCheck,
  Database,
  ExternalLink,
  GitBranch,
  KeyRound,
  PlugZap,
  Puzzle,
  Route,
  ScrollText,
  Server,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI Infrastructure for Insurance Carriers | Bifrost',
  description:
    'Governed AI infrastructure for insurance carriers with centralized control, air-gapped security, NAIC-ready audit trails, and intelligent routing across providers.',
  alternates: {
    canonical: 'https://www.getmaxim.ai/bifrost/industry-pages/insurance',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'AI Infrastructure for Insurance Carriers | Bifrost',
  description:
    'Governed AI infrastructure for insurance carriers with centralized control, air-gapped security, NAIC-ready audit trails, and intelligent routing across providers.',
  url: 'https://www.getmaxim.ai/bifrost/industry-pages/insurance',
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
      'Bifrost is governed AI infrastructure for insurance carriers with air-gapped security, NAIC-ready audit trails, and intelligent routing across AI providers.',
  },
  audience: {
    '@type': 'Audience',
    audienceType: 'Insurance carriers',
  },
}

const challenges = [
  {
    icon: ShieldAlert,
    title: 'Unsupervised AI usage',
    description:
    'Teams use ungoverned public AI tools, sharing policyholder NPI with third-party servers without audit trails or organizational oversight.',
  },
  {
    icon: ClipboardCheck,
    title: 'NAIC examination readiness',
    description:
      'With the Model Bulletin adopted across 20+ states, examiners now expect documented AI governance programs, bias controls, and complete decision trails.',
  },
  {
    icon: Puzzle,
    title: 'Fragmented provider access',
    description:
      'Carriers running multiple AI models across claims, underwriting, and operations manage separate API keys, inconsistent controls, and no unified cost visibility.',
  },
]

const governance = [
  {
    icon: Server,
    title: 'Air-gapped deployment',
    description:
      'Keep NPI and proprietary underwriting data inside your network with on-prem or in-VPC deployment.',
  },
  {
    icon: ScrollText,
    title: 'Examination-ready logs',
    description:
      'Capture every AI interaction in tamper-evident logs -- ready for NAIC examination, NYDFS review, or internal audit.',
  },
  {
    icon: KeyRound,
    title: 'Role-based access and SSO',
    description:
      'Integrate with Okta or Azure AD and assign access by role, department, or line of business across Bifrost resources.',
  },
  {
    icon: Banknote,
    title: 'Line-of-business cost controls',
    description:
      'Assign budgets per department, track spend by use case, and route routine queries to lower-cost models.',
  },
]

const useCases = [
  {
    title: 'Enterprise knowledge search',
    description:
      'AI-powered search across internal policies, manuals, and regulatory documents with governed access and caching.',
  },
  {
    title: 'Claims summarization and triage',
    description:
      'Generate summaries of FNOL reports, medical records, and adjuster notes to accelerate review and reduce manual processing time.',
  },
  {
    title: 'Fraud detection and SIU support',
    description:
      'Analyze unstructured claims documents and adjuster notes for fraud indicators while preserving a complete audit trail for SIU investigations.',
  },
  {
    title: 'Underwriting document extraction',
    description:
      'Extract data from ACORD forms, loss runs, and financial statements with multimodal support and MCP integration.',
  },
  {
    title: 'Employee AI assistant',
    description:
      'Deploy governed AI tools for drafting correspondence, document summarization, and meeting prep with NPI redaction and usage controls.',
  },
  {
    title: 'Regulatory compliance automation',
    description:
      'Identify relevant state requirements, maintain auditable records of AI use across LoBs, and generate documentation for regulatory examinations.',
  },
]

const platformCapabilities = [
  {
    icon: Route,
    title: 'Multi-provider routing',
    description:
      'Route requests across 1000+ models including OpenAI, Anthropic, or on-prem models through a unified API.',
  },
  {
    icon: Database,
    title: 'Semantic caching',
    description:
      'Reduce repeated query costs on regulatory, policy, and knowledge searches with response and document caching.',
  },
  {
    icon: PlugZap,
    title: 'MCP Gateway',
    description:
      'Connect AI agents to internal and external data sources through governed, audited access to every tool call.',
  },
  {
    icon: ShieldCheck,
    title: 'NPI redaction and guardrails',
    description:
      'Auto-detect and redact SSNs, policy numbers, and driver\'s license data before it reaches any model or user.',
  },
  {
    icon: ScrollText,
    title: 'SIEM-integrated audit logs',
    description:
      'Export structured logs via OpenTelemetry to Splunk, Datadog, or QRadar with configurable long-term retention.',
  },
  {
    icon: GitBranch,
    title: 'Intelligent routing and failover',
    description:
      'Maintain claims and underwriting throughput during provider outages with automatic failover and cost-aware routing.',
  },
]

const interfaceHighlights = [
  {
    riveSrc: '/rive/lln9t3OuTneA9tQOi8XMPNlfNCk.riv',
    title: 'Operations dashboard',
    description:
      'Real-time monitoring of request volume, model usage, latency, and system health across all lines of business.',
  },
  {
    riveSrc: '/rive/c0tVyQYkMtvuhTCKvA0SjGVHkY.riv',
    title: 'Audit logs',
    description:
      'Track authentication, access, configuration changes, and data activity.',
  },
  {
    riveSrc: '/rive/KBbyqDZQ7ko6obmMhOt3hllKA.riv',
    title: 'Budget and cost tracking',
    description:
      'Per-department spend monitoring with threshold alerts and chargeback-ready attribution by line of business.',
  },
]

export default function InsuranceTestPage() {
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
            Governed AI Infrastructure for
              <br />
              <span className="text-[var(--accent-text)]">Insurance Carriers</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-gray-500 md:text-base">
              Bifrost provides centralized control over every model request with air-gapped
              security, NAIC-ready audit trails, and intelligent routing across providers.
            </p>
            <div className="flex w-full flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
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
            Operational risks behind insurance AI adoption
            </h2>
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
            NAIC-ready controls without slowing underwriting teams
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Deploy Bifrost in your environment and enforce consistent policies across every
              model call.
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
              Give platform teams visibility across every model call
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Centralized governance, routing, and observability for carriers deploying AI across
              claims, underwriting, and operations.
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
              Functional views built for carrier compliance teams
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Designed for the visibility that platform engineers and compliance officers actually need.
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
              AI-powered insurance workflows with Bifrost
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

      {/* CTA */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
            [ NEXT STEPS ]
          </p>
          <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
            Deploy compliant AI across insurance workflows
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-600">
            Talk to the Bifrost team about deploying a compliant, air-gapped AI gateway that
            satisfies NAIC requirements and gives your platform team visibility from day one.
          </p>
          <div className="flex w-full flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
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
