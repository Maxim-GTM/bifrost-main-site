import { Metadata } from 'next'
import Link from 'next/link'
import FeatureMatrix from '@/components/resources/FeatureMatrix'
import InterfaceHighlights from '@/components/resources/InterfaceHighlights'
import DropInReplacement from '@/components/resources/DropInReplacement'
import { Button } from '@/components/ui/Button'
import { getCostCalculatorBaseUrl } from '@/lib/utils'
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Banknote,
  Bot,
  ExternalLink,
  FileCheck,
  KeyRound,
  Plug,
  ScrollText,
  Server,
  ShieldCheck,
  SignalHigh,
  Puzzle,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI Gateway for Financial Services & Banking | Bifrost',
  description:
    'Secure and governed AI gateway for financial services and banking with air-gapped security, centralized governance, and audit trails for regulated institutions.',
  alternates: {
    canonical: 'https://www.getmaxim.ai/bifrost/industry-pages/financial-services-and-banking',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'AI Gateway for Financial Services & Banking | Bifrost',
  description:
    'Secure and governed AI gateway for financial services and banking with air-gapped security, centralized governance, and audit trails for regulated institutions.',
  url: 'https://www.getmaxim.ai/bifrost/industry-pages/financial-services-and-banking',
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
      'Bifrost is a secure AI gateway for financial services and banking teams with centralized governance, air-gapped deployment options, and audit-ready controls.',
  },
  audience: {
    '@type': 'Audience',
    audienceType: 'Financial services and banking teams',
  },
}

const challenges = [
  {
    icon: AlertTriangle,
    title: 'Shadow AI exposure',
    description:
      'Most financial institutions have usage policies but no technical controls to prevent employees from using ungoverned AI tools with client data.',
  },
  {
    icon: ScrollText,
    title: 'No audit trail',
    description:
      'Most institutions cannot produce a clear audit trail of how AI systems are being used across the organization.',
  },
  {
    icon: Puzzle,
    title: 'Fragmented model management',
    description:
      'Teams running separate provider keys create cost overruns, inconsistent audit trails, and no central visibility for platform or compliance teams.',
  },
]

const governance = [
  {
    icon: Server,
    title: 'Self-hosted deployment',
    description:
      'Bifrost runs on-premises or in your VPC, giving you full control over how your data and client records are used.',
  },
  {
    icon: FileCheck,
    title: 'Examiner-ready audit logs',
    description:
      'Capture model and user activity in tamper-evident logs for risk, compliance, and internal audit review.',
  },
  {
    icon: KeyRound,
    title: 'SSO and role-based access',
    description:
      'Integrate with IdPs such as Okta and Azure AD; enforce role-based permissions and information barriers across every user.',
  },
  {
    icon: Banknote,
    title: 'Department-level cost controls',
    description:
      'Set model access and spending limits by team or user, while tracking LLM costs across the org in real time.',
  },
]

const useCases = [
  {
    title: 'Enterprise knowledge search',
    description:
      'Help employees find answers across internal policies, deal history, and product documentation instantly.',
  },
  {
    title: 'Regulatory intelligence',
    description:
      'Monitor regulatory guidance, summarize changes, assess policy impact, and draft updates for compliance review.',
  },
  {
    title: 'Real-time fraud detection',
    description:
      'Add LLM reasoning to existing fraud scoring systems while maintaining required latency and review visibility.',
  },
  {
    title: 'Credit and loan analysis',
    description:
      'Extract information from loan packages, populate credit models, and draft underwriting memos with audit history.',
  },
  {
    title: 'Code generation and modernization',
    description:
      'Assist developers with code generation, review, and refactoring while enforcing usage controls and credential protection.',
  },
  {
    title: 'AML and KYC processing',
    description:
      'Analyze onboarding documents, verify beneficial ownership, and draft SAR narratives with complete audit records.',
  },
]

const platformCapabilities = [
  {
    icon: Plug,
    title: 'Drop-in SDK',
    description:
      'Replace existing AI gateways or SDKs and access 1000+ models through a single unified API.',
  },
  {
    icon: Activity,
    title: 'Centralized observability',
    description:
      'Log every user activity, model calls, token usage, and guardrail events.',
  },
  {
    icon: Bot,
    title: 'MCP Gateway',
    description:
      'Give AI agents governed, auditable access to internal systems and approved enterprise tools.',
  },
  {
    icon: ShieldCheck,
    title: 'Guardrails and DLP',
    description:
      'Detect and redact SSNs, account numbers, and card data in real time.',
  },
  {
    icon: SignalHigh,
    title: 'Low-latency, high-throughput routing',
    description:
      'Delivers reliable AI routing under peak load of 10k+ RPS, with ~11 µs of gateway overhead.',
  },
  {
    icon: Banknote,
    title: 'Budget governance',
    description:
      'Track spend at a granular usage level, with intelligent routing to lower-cost models for simple tasks.',
  },
]

const interfaceHighlights = [
  {
    riveSrc: '/rive/lln9t3OuTneA9tQOi8XMPNlfNCk.riv',
    title: 'Unified request dashboard',
    description:
      'Monitor live traffic by provider, model, latency, and error rate across every team and use case from a single view.',
  },
  {
    riveSrc: '/rive/c0tVyQYkMtvuhTCKvA0SjGVHkY.riv',
    title: 'Model governance controls',
    description:
      'Configure approved models, access rules, and guardrails in one place without any code changes.',
  },
  {
    riveSrc: '/rive/KBbyqDZQ7ko6obmMhOt3hllKA.riv',
    title: 'Budget and cost center tracking',
    description:
      'Track real-time spend by department and use case with configurable thresholds, instant alerts, and exportable chargeback reports.',
  },
]

export default function FinancialServicesAndBankingPage() {
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
              Secure and Governed AI Gateway for
              <br />
              <span className="text-[var(--accent-text)]">Financial Services and Banking</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-gray-500 md:text-base">
            Centralized governance, air-gapped security, and complete audit trails built for regulated financial institutions.
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
              Where AI deployments stall at financial institutions
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
            Banks move quickly to experiment with AI, but governance, data controls, and platform ownership often lag behind.
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
              Controls that meet the compliance bar
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Enforce consistent AI usage policies across all AI interactions.
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
              What platform and engineering teams actually need
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Bifrost covers the infrastructure layer so your team can focus on the AI use cases that
              create value for the business.
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
              Operational visibility built for regulated environments
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Functional views for platform teams, compliance officers, and finance stakeholders.
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
              AI workflows in financial institutions, governed by Bifrost
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
            Control panel for regulated banking AI workflows
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-600">
            Talk to the Bifrost team about deploying a compliant, air-gapped gateway inside your environment.
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
            <Link href={`${basePath}/resources/claude-code`}>
              <Button variant="outline" size="lg">
                Claude Code integration
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
              Everything you need to run AI in production, from free, open source to enterprise-grade
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
