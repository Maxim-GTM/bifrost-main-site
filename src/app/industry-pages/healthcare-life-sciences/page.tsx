import { Metadata } from 'next'
import Link from 'next/link'
import FeatureMatrix from '@/components/resources/FeatureMatrix'
import InterfaceHighlights from '@/components/resources/InterfaceHighlights'
import DropInReplacement from '@/components/resources/DropInReplacement'
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
  ScrollText,
  Server,
  Database,
  AlertTriangle
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI Gateway for Healthcare & Life Sciences | Bifrost',
  description:
    'Secure AI gateway for healthcare and life sciences with air-gapped deployment, HIPAA-compliant infrastructure, PHI protection, and low-latency routing.',
  alternates: {
    canonical: 'https://www.getmaxim.ai/bifrost/industry-pages/healthcare-life-sciences',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'AI Gateway for Healthcare & Life Sciences | Bifrost',
  description:
    'Secure AI gateway for healthcare and life sciences with air-gapped deployment, HIPAA-compliant infrastructure, PHI protection, and low-latency routing.',
  url: 'https://www.getmaxim.ai/bifrost/industry-pages/healthcare-life-sciences',
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
      'Bifrost is a secure AI gateway for healthcare and life sciences teams with HIPAA-aligned controls, PHI protection, and air-gapped deployment options.',
  },
  audience: {
    '@type': 'Audience',
    audienceType: 'Healthcare and life sciences teams',
  },
}

const challenges = [
  {
    icon: AlertTriangle,
    title: 'Shadow AI exposure',
    description:
      '40% of healthcare workers use unauthorized AI tools, and 57% input sensitive patient data into ungoverned consumer applications.',
  },
  {
    icon: ShieldCheck,
    title: 'HIPAA and regulatory complexity',
    description:
      'Every LLM vendor requires a separate BAA negotiation, adding 6 to 12 months before a single clinical AI workflow reaches production.',
  },
  {
    icon: Building2,
    title: 'Infrastructure burden',
    description:
      'Over 80% of clinical AI effort goes to data integration, governance, and monitoring, not building the use cases that improve care.',
  },
]

const governance = [
  {
    icon: Lock,
    title: 'Air-gapped deployment',
    description:
      'Deploy entirely within your VPC or on-prem so PHI never leaves your network.',
  },
  {
    icon: ShieldCheck,
    title: 'Guardrails and PHI redaction',
    description:
      'Enforce input sanitization, PII/PHI detection, and content policies across every request and response.',
  },
  {
    icon: FileText,
    title: 'HIPAA-grade audit trails',
    description:
    'Log every LLM interaction with user, provider, token, and latency metadata for compliance reviews.',
  },
  {
    icon: Banknote,
    title: 'Budgeting and cost controls',
    description:
      'Set spending limits at the department, project, user, or virtual key level with real-time alerts.',
  },
]

const platformCapabilities = [
  {
    icon: ShieldCheck,
    title: 'PHI guardrails',
    description:
      'Redact protected health information and block hallucinated clinical content automatically.',
  },
  {
    icon: PlugZap,
    title: 'Drop-in SDKs',
    description: 'Replace your existing provider config with a single line of code to access 1,000+ models.',
  },
  {
    icon: ScrollText,
    title: 'Centralized observability',
    description: 'Track every request with user, model, latency, cost, and guardrail actions.',
  },
  {
    icon: Scale,
    title: 'Adaptive load balancing',
    description: 'Route to the fastest or most cost-effective model with automatic failover.',
  },
  {
    icon: Server,
    title: 'High-availability clustering',
    description:
      'Peer-to-peer clustering delivers 99.99% uptime for 24/7 clinical workflows.',
  },
  {
    icon: Database,
    title: 'Semantic caching',
    description: 'Cache repeated clinical and coding queries for 40 to 60% cost reduction.',
  },
]

const interfaceHighlights = [
  {
    riveSrc: '/rive/lln9t3OuTneA9tQOi8XMPNlfNCk.riv',
    title: 'Operations dashboard',
    description:
      'Live monitoring for system health, routing performance, and usage across departments.',
  },
  {
    riveSrc: '/rive/c0tVyQYkMtvuhTCKvA0SjGVHkY.riv',
    title: 'Compliance audit logs',
    description:
      'Immutable request trails with user, model, and content detail for HIPAA reviews.',
  },
  {
    riveSrc: '/rive/KBbyqDZQ7ko6obmMhOt3hllKA.riv',
    title: 'Virtual keys and budgets',
    description:
      'Granular budget enforcement and access segmentation across clinical and administrative teams.',
  },
]

const useCases = [
  {
    title: 'Enterprise knowledge search',
    description:
      'Connect AI to internal knowledge bases with federated auth so staff find protocols, policies, and procedures in seconds.',
  },
  {
    title: 'Ambient clinical documentation',
    description:
      'Route ambient scribe traffic through a unified gateway with PHI protection, multi-vendor failover, and cost optimization.',
  },
  {
    title: 'Code generation and IT productivity',
    description:
      'Give engineering teams governed access to coding assistants with drop-in SDKs, RBAC, and model-level usage budgets.',
  },
  {
    title: 'Contract and compliance review',
    description:
      'Process sensitive legal documents in an air-gapped environment with guardrails, redaction, and full audit trails.',
  },
  {
    title: 'Radiology report generation',
    description:
      'Support high-volume imaging workflows with adaptive load balancing, automatic failover, and clustering support for 99.99% uptime.',
  },
  {
    title: 'Payer approval workflows',
    description:
      'Route prior authorization requests through approved AI models with built-in guardrails, full request and response logging for every payer decision.',
  },
]

export default function HealthcareLifeSciencesPage() {
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
              <span className="text-[var(--accent-text)]">Healthcare &amp; Life Sciences</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-gray-500 md:text-base">
            Deploy AI across clinical, research, and operational workflows without sending PHI outside your network. Air-gapped, HIPAA-compliant infrastructure built for healthcare systems.
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
              Why healthcare AI stalls before it scales
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
              Enterprise controls that accelerate clinical AI deployment
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
            Governed, air-gapped AI infrastructure with low-latency routing.
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
              Purpose-built for regulated healthcare industry
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Centralized control plane for AI-driven healthcare workflows.
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
              Governance, visibility, and control for healthcare teams
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Focused dashboard panels for routing, audit trails, and budget governance.
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
              Healthcare workflows governed by Bifrost
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
            Deploy governed healthcare AI in weeks, not months
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-600">
            Talk to the Bifrost team about deploying a compliant, air-gapped gateway inside your
            network.
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
