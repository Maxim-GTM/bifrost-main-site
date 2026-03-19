import { Metadata } from 'next'
import Link from 'next/link'
import FeatureMatrix from '@/components/resources/FeatureMatrix'
import InterfaceHighlights from '@/components/resources/InterfaceHighlights'
import DropInReplacement from '@/components/resources/DropInReplacement'
import DeploymentOptions from '@/components/resources/DeploymentOptions'
import EnterpriseTrialForm from '@/components/industry-pages/EnterpriseTrialForm'
import ComplianceSection from '@/components/industry-pages/ComplianceSection'
import { Button } from '@/components/ui/Button'
import { getCostCalculatorBaseUrl } from '@/lib/utils'
import {
  ArrowRight,
  ShieldCheck,
  FileText,
  Lock,
  Scale,
  Building2,
  Banknote,
  ExternalLink,
  PlugZap,
  KeyRound,
  Server,
  Database,
  AlertTriangle,
  Shuffle,
  Code,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI Gateway for Government & Public Sector | Bifrost',
  description:
    'Bifrost deploys inside your existing authorized GovCloud environment, giving agencies compliant AI infrastructure without triggering a new authorization process.',
  alternates: {
    canonical: 'https://www.getmaxim.ai/bifrost/industry-pages/government',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'AI Gateway for Government & Public Sector | Bifrost',
  description:
    'Bifrost deploys inside your existing authorized GovCloud environment, giving agencies compliant AI infrastructure without triggering a new authorization process.',
  url: 'https://www.getmaxim.ai/bifrost/industry-pages/government',
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
      'Bifrost is a secure AI gateway for government and public sector teams that deploys inside your ATO boundary with FISMA-compliant controls, CUI-aware policy enforcement, and PIV/CAC identity integration.',
  },
  audience: {
    '@type': 'Audience',
    audienceType: 'Government and public sector teams',
  },
}

const challenges = [
  {
    icon: AlertTriangle,
    title: 'Ungoverned AI use',
    description:
      'Federal employees use AI regularly, often through tools that carry no audit trail and no agency oversight.',
  },
  {
    icon: Lock,
    title: 'The authorization bottleneck',
    description:
      'Every commercial AI gateway needs its own federal authorization before processing agency data, delaying compliant deployments by months.',
  },
  {
    icon: Building2,
    title: 'CAIO mandates need infrastructure',
    description:
      'Agencies now have mandated CAIO roles and governance boards but no unified platform to meet the underlying compliance requirements.',
  },
]

const governance = [
  {
    icon: Server,
    title: 'Deployment inside the ATO boundary',
    description:
      'Bifrost runs inside your existing GovCloud VPC or Azure Government environment, inheriting its established controls.',
  },
  {
    icon: FileText,
    title: 'FISMA-compliant audit logging',
    description:
      'Capture every request with user identity, model, and use case tags to satisfy FISMA AU control requirements.',
  },
  {
    icon: KeyRound,
    title: 'Agency SSO integration',
    description:
      'SAML 2.0 integration federates with your existing agency identity provider so users access Bifrost through their established credentials.',
  },
  {
    icon: Banknote,
    title: 'Usage budgets and spend limits',
    description:
      'Set appropriated budget limits per bureau or program, with real-time alerts before departments exceed their allocated AI spend.',
  },
]

const platformCapabilities = [
  {
    icon: Scale,
    title: 'Adaptive load balancing',
    description:
      'Route traffic across providers based on latency and availability, with automatic fallback if a model endpoint goes down.',
  },
  {
    icon: ShieldCheck,
    title: 'Configurable guardrails',
    description:
      'Validate AI inputs and outputs in real time against configurable policies, with block, redact, or flag actions on every violation.',
  },
  {
    icon: Shuffle,
    title: 'Vendor-agnostic model routing',
    description:
      'Route requests across commercial, open-source, and on-premises models based on task type and authorization tier.',
  },
  {
    icon: PlugZap,
    title: 'MCP Gateway',
    description:
      'Connect AI to external agency systems with explicit tool execution controls, per-virtual-key filtering, and a full audit trail on every tool operation.',
  },
  {
    icon: Database,
    title: 'Policy query caching',
    description:
      'Cache repeated policy questions and common lookups to reduce LLM API spend across high-volume workloads.',
  },
  {
    icon: Code,
    title: 'Drop-in SDK compatibility',
    description:
      'Route existing AI SDKs and gateways through Bifrost with a single endpoint change — no code rewrite required.',
  },
]

const interfaceHighlights = [
  {
    riveSrc: '/rive/lln9t3OuTneA9tQOi8XMPNlfNCk.riv',
    title: 'Centralized governance dashboard',
    description:
      'Live overview of AI activity, approvals, and usage across departments.',
  },
  {
    riveSrc: '/rive/c0tVyQYkMtvuhTCKvA0SjGVHkY.riv',
    title: 'Audit-ready compliance evidence',
    description:
      'Searchable request trails with full metadata, ready for compliance review and export.',
  },
  {
    riveSrc: '/rive/KBbyqDZQ7ko6obmMhOt3hllKA.riv',
    title: 'Budget dashboard',
    description:
      'Real-time spend by department with alerts before teams exceed their allocated AI spend.',
  },
]

const useCases = [
  {
    title: 'Policy and knowledge search',
    description:
      'RAG-based search over agency intranets, SharePoint, and regulatory documents so employees find authoritative answers in seconds.',
  },
  {
    title: 'Document drafting and summarization',
    description:
      'AI-assisted drafting of policy memos, budget justifications, and IG report summaries through approved models with full logging.',
  },
  {
    title: 'Acquisition and procurement AI',
    description:
      'Route contracting officer workflows through governed LLMs for FAR compliance checking, market research, and source documentation.',
  },
  {
    title: 'Code generation and modernization',
    description:
      'Govern AI coding assistants across developer teams with centralized model access, usage controls, and audit trails.',
  },
  {
    title: 'SOC alert triage',
    description:
      'Triage SIEM alerts inside an air-gapped deployment, keeping classified threat intelligence within the authorized network perimeter.',
  },
  {
    title: 'Org-wide AI rollout',
    description:
      'Provision scoped model access across departments using virtual keys and per-team/user budgets.',
  },
]

export default function GovernmentPage() {
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
              Secure and Air-Gapped AI Gateway
              <br />
              <span className="text-[var(--accent-text)]">for Government Agencies</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-gray-500 md:text-base">
              Bifrost deploys inside your existing authorized GovCloud environment, giving agencies compliant AI infrastructure with centralized governance.
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
              Why compliant AI is hard to deploy at scale
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              The governance gap between AI adoption and authorized infrastructure is creating compliance exposure across agencies at scale.
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
              Controls your CAIO and CISO require before deployment
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Deploy Bifrost inside your authorized network perimeter and enforce consistent policy across every model request.
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
              Purpose-built for compliant federal AI operations
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Multi-model routing, observability, and cost controls built around the workflows government agencies actually run.
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
              Operational views built for federal governance teams
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Dashboard panels that give leadership and platform engineers the visibility they need.
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
              Federal workflows running through Bifrost
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

      <ComplianceSection />

      {/* CTA */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
            [ NEXT STEPS ]
          </p>
          <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
            Deploy GenAI inside your ATO boundary with full governance
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-600">
            Talk to the Bifrost team about deploying a compliant AI gateway inside your existing authorized environment.
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
