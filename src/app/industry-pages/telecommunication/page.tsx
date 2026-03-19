import { Metadata } from 'next'
import Link from 'next/link'
import FeatureMatrix from '@/components/resources/FeatureMatrix'
import InterfaceHighlights from '@/components/resources/InterfaceHighlights'
import DeploymentOptions from '@/components/resources/DeploymentOptions'
import DropInReplacement from '@/components/resources/DropInReplacement'
import EnterpriseTrialForm from '@/components/industry-pages/EnterpriseTrialForm'
import { Button } from '@/components/ui/Button'
import { getCostCalculatorBaseUrl } from '@/lib/utils'
import {
  ArrowRight,
  Banknote,
  CloudOff,
  Database,
  ExternalLink,
  EyeOff,
  KeyRound,
  Lock,
  PlugZap,
  Route,
  ScrollText,
  Server,
  ShieldCheck,
  Unplug,
  Zap,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI Gateway for Telecommunications | Bifrost',
  description:
    'CPNI-compliant by architecture. Sub-50ms latency for real-time network AI. Multi-vendor OSS/BSS integration out of the box.',
  alternates: {
    canonical: 'https://www.getmaxim.ai/bifrost/industry-pages/telecommunication',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'AI Gateway for Telecommunications | Bifrost',
  description:
    'CPNI-compliant by architecture. Sub-50ms latency for real-time network AI. Multi-vendor OSS/BSS integration out of the box.',
  url: 'https://www.getmaxim.ai/bifrost/industry-pages/telecommunication',
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
      'CPNI-compliant by architecture. Sub-50ms latency for real-time network AI. Multi-vendor OSS/BSS integration out of the box.',
  },
  audience: {
    '@type': 'Audience',
    audienceType: 'Telecommunications operators',
  },
}

const challenges = [
  {
    icon: EyeOff,
    title: 'No platform-wide visibility',
    description:
      'Teams build using different LLM providers independently, with no shared view of costs, usage, or model behavior.',
  },
  {
    icon: Unplug,
    title: 'Integration built from scratch',
    description:
      'Connecting GenAI to live network and customer systems requires custom work for every OSS, BSS, and ITSM tool used.',
  },
  {
    icon: CloudOff,
    title: 'Regulated data and CPNI constraints',
    description:
      'FCC §222 bars call records and location data from routing through any third-party API, ruling out cloud SaaS gateways for regulated workloads.',
  },
]

const governance = [
  {
    icon: Server,
    title: 'Air-gapped network deployment',
    description:
      'CPNI data stays inside your perimeter by architecture, removing FCC violation risk.',
  },
  {
    icon: ScrollText,
    title: 'Immutable audit logs',
    description:
      'Capture full interaction trails for CPNI annual certification, TCPA litigation defense, and EU AI Act conformity.',
  },
  {
    icon: KeyRound,
    title: 'SSO and role-based access',
    description:
      'Role templates for NOC analysts, network engineers, and internal teams enforce CPNI minimum-necessary access via IdP.',
  },
  {
    icon: ShieldCheck,
    title: 'Guardrails and PII redaction',
    description:
      'Enforce content safety rules and auto-redact PII and CPNI fields before requests reach any model, across every workflow.',
  },
]

const useCases = [
  {
    title: 'Coding agent governance',
    description:
      'Centralize Claude Code and Codex usage across engineering teams to track spend and activity and enforce model access policies.',
  },
  {
    title: 'NOC AI and AIOps',
    description:
      'Query Ericsson ENM, Nokia NetAct, and ServiceNow simultaneously in natural language, while maintaining OTel logs.',
  },
  {
    title: 'AI customer service',
    description:
      'Route customer interactions through governed LLMs with semantic caching to cut costs on similar requests.',
  },
  {
    title: 'Employee knowledge search',
    description:
      'Connect Confluence, Jira, and Slack through a secure and governed interface, eliminating shadow AI risk.',
  },
  {
    title: 'AI-assisted outbound campaigns',
    description:
      'Generate personalized retention and upsell messages for voice and text channels, with TCPA consent guardrails enforced at the gateway.',
  },
  {
    title: 'Field tech assistant',
    description:
      'Equip field technicians with an LLM that answers questions using site history, equipment configs, and vendor runbooks.',
  },
]

const platformCapabilities = [
  {
    icon: Lock,
    title: 'Air-gapped deployment',
    description:
      'Deploy inside your VPC so sensitive data and CPNI-regulated data never leave your network perimeter.',
  },
  {
    icon: Zap,
    title: 'Near-zero gateway overhead',
    description:
      '~11µs gateway overhead keeps fraud detection, NOC queries, and internal AI workloads within real-time SLAs.',
  },
  {
    icon: PlugZap,
    title: 'Multi-vendor MCP gateway',
    description:
      'Connect LLMs to your ticketing, network management, and knowledge systems via a single interface with federated auth.',
  },
  {
    icon: Database,
    title: 'Semantic caching at scale',
    description:
      'Cache semantically identical customer service queries, reducing LLM API costs on high-volume workloads.',
  },
  {
    icon: Route,
    title: 'Adaptive model routing',
    description:
      'Automatically route traffic across providers for the lowest latency and error rates, balancing based on failures & TPM limits.',
  },
  {
    icon: Banknote,
    title: 'Department cost governance',
    description:
      'Virtual keys enforce model access policies and granular spend limits with real-time cost visibility.',
  },
]

const interfaceHighlights = [
  {
    riveSrc: '/rive/lln9t3OuTneA9tQOi8XMPNlfNCk.riv',
    title: 'Live operations dashboard',
    description:
      'Live view of request volume, provider routing, latency by tier, and system health across every active AI workload.',
  },
  {
    riveSrc: '/rive/c0tVyQYkMtvuhTCKvA0SjGVHkY.riv',
    title: 'Audit log viewer',
    description:
      'Track logins, permission changes, virtual key modifications, and guardrail violations across every user and team.',
  },
  {
    riveSrc: '/rive/KBbyqDZQ7ko6obmMhOt3hllKA.riv',
    title: 'Virtual keys and budgets',
    description:
      'Per-team API key management with configurable spend caps, usage breakdowns by role, and alerting before limits are reached.',
  },
]

export default function TelecommunicationPage() {
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
              Secure and Ultra-Fast AI Gateway 
              <br />
              <span className="text-[var(--accent-text)]">for Telecom Operators</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-gray-500 md:text-base">
            Deploy CPNI-compliant AI inside your network perimeter, with ~11µs latency overhead and custom OSS/BSS integration for real-time telecom workloads.
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
              Why AI deployment stalls at telecom operators
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
            Telecom operators are investing heavily in AI, but CPNI regulations, strict latency requirements, and fragmented systems delay production deployments.
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
              Enterprise AI controls built for regulated operators
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Bifrost gives compliance, security, and platform engineering teams the controls they need to deploy AI without creating CPNI or TCPA exposure.
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
              Production controls for every telecom AI workload
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Governance, routing, and integration capabilities chosen for regulated, high-throughput, multi-vendor operator environments.
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
              Operator views for production AI environments
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Dashboard panels built for teams managing real-time routing, compliance readiness, and multi-department AI spend.
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
              Productionize telecom AI workflows using Bifrost
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
              Flexible deployment
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Run Bifrost wherever your compliance requirements demand - on-prem, in your VPC, or
              across multiple clouds.
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
            Deploy AI your compliance team can sign off on
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-600">
            Talk to the Bifrost team about CPNI-compliant deployment, multi-provider routing, and production-ready LLM governance for your operator environment.
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
