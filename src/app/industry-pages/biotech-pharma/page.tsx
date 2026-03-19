import { Metadata } from 'next'
import Link from 'next/link'
import FeatureMatrix from '@/components/resources/FeatureMatrix'
import InterfaceHighlights from '@/components/resources/InterfaceHighlights'
import DropInReplacement from '@/components/resources/DropInReplacement'
import DeploymentOptions from '@/components/resources/DeploymentOptions'
import EnterpriseTrialForm from '@/components/industry-pages/EnterpriseTrialForm'
import { Button } from '@/components/ui/Button'
import { getCostCalculatorBaseUrl } from '@/lib/utils'
import {
  ArrowRight,
  ShieldCheck,
  FileText,
  Lock,
  Users,
  Layers,
  Banknote,
  ExternalLink,
  PlugZap,
  ScrollText,
  Server,
  Database,
  AlertTriangle,
  Code,
  Route
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI Gateway for Biotechnology & Pharma | Bifrost',
  description:
    'AI gateway built for GxP compliance and IP protection. Governed AI for pharma and biotech teams that protects compound IP and satisfies ALCOA+ audit requirements.',
  alternates: {
    canonical: 'https://www.getmaxim.ai/bifrost/industry-pages/biotech-pharma',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'AI Gateway for Biotechnology & Pharma | Bifrost',
  description:
    'AI gateway built for GxP compliance and IP protection. Governed AI for pharma and biotech teams that protects compound IP and satisfies ALCOA+ audit requirements.',
  url: 'https://www.getmaxim.ai/bifrost/industry-pages/biotech-pharma',
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
      'Bifrost is an AI gateway built for GxP compliance and IP protection, giving pharma and biotech teams governed AI that protects compound IP and satisfies ALCOA+ audit requirements.',
  },
  audience: {
    '@type': 'Audience',
    audienceType: 'Biotechnology and pharmaceutical teams',
  },
}

const challenges = [
  {
    icon: AlertTriangle,
    title: 'Permanent IP leakage risk',
    description:
      'Researchers uploading proprietary compound structures to cloud AI create irreversible trade secret exposure.',
  },
  {
    icon: FileText,
    title: 'GxP audit requirements',
    description:
      'AI used in regulated records must meet 21 CFR Part 11 ALCOA+ data integrity requirements -- standard gateways don’t.',
  },
  {
    icon: Layers,
    title: 'Ungoverned AI sprawl',
    description:
      'Research, clinical, and manufacturing teams use separate AI tools with no unified policy or audit layer.',
  },
]

const governance = [
  {
    icon: Lock,
    title: 'On-prem and VPC deployment',
    description:
      'Deploy within your own infrastructure and route IP-sensitive research workloads to on-premises models within your perimeter.',
  },
  {
    icon: ScrollText,
    title: 'ALCOA+-compliant audit logs',
    description:
      'Capture attributable, tamper-evident records of every model interaction for FDA inspections.',
  },
  {
    icon: ShieldCheck,
    title: 'Guardrails and data redaction',
    description:
      'Strip PHI, block proprietary molecular notation, and enforce output content policies before data reaches any LLM.',
  },
  {
    icon: Users,
    title: 'Role-based access by function',
    description:
      'Segment model access so R&D, regulatory affairs, and engineering teams operate in isolated permission tiers.',
  },
]

const platformCapabilities = [
  {
    icon: Code,
    title: 'Drop-in SDK compatibility',
    description:
      'Route existing AI integrations through Bifrost to access 1000+ models without rewriting application code.',
  },
  {
    icon: Server,
    title: 'High-availability clustering',
    description:
      'Keep regulated AI workloads running continuously with peer-to-peer clustering and no single point of failure.',
  },
  {
    icon: PlugZap,
    title: 'Lab system integrations',
    description: 'MCP Gateway connects AI workflows to ELN, LIMS, and QMS platforms without building custom middleware.',
  },
  {
    icon: Route,
    title: 'Intelligent model routing',
    description: 'Route molecular and clinical queries to on-premises models while directing general workloads to cloud providers.',
  },
  {
    icon: Banknote,
    title: 'Cost attribution and budgeting',
    description: 'Tag every request by project, therapeutic area, department, or user for chargeback reporting and budget enforcement.',
  },
  {
    icon: Database,
    title: 'Semantic caching',
    description:
      'Reduce API costs on repeated queries and protocol questions with shared caching across research teams.',
  },
]

const interfaceHighlights = [
  {
    riveSrc: '/rive/c0tVyQYkMtvuhTCKvA0SjGVHkY.riv',
    title: 'Audit trail viewer',
    description:
      'Filter and export tamper-evident request logs for FDA Part 11 inspections and internal compliance review.',
  },
  {
    riveSrc: '/rive/lln9t3OuTneA9tQOi8XMPNlfNCk.riv',
    title: 'Routing and usage dashboard',
    description:
      'Monitor live routing decisions, provider selection, latency, and model usage across research and clinical workloads.',
  },
  {
    riveSrc: '/rive/KBbyqDZQ7ko6obmMhOt3hllKA.riv',
    title: 'Virtual keys and budgets',
    description:
      'Assign scoped keys to teams and workflows with hard spending limits and real-time usage reporting.',
  },
]

const useCases = [
  {
    title: 'Engineering AI governance',
    description:
      'Give platform and data science teams governed access to coding assistants and advanced models, with usage budgets, audit trails, and model access controls.',
  },
  {
    title: 'Scientific literature review',
    description:
      'Use AI to search, summarize, and analyze scientific literature and patent filings while protecting proprietary research data.',
  },
  {
    title: 'Regulatory document writing',
    description:
      'Assist regulatory writers with CTD modules with AI routed through audit-logged infrastructure ready for FDA review.',
  },
  {
    title: 'Pharmacovigilance monitoring',
    description:
      'Analyze adverse event reports and detect safety signals with governed AI, with traceable logs and human review checkpoints.',
  },
  {
    title: 'Clinical trial operations',
    description:
      'Summarize monitoring reports, site communications, and study documentation using governed AI with traceable logs.',
  },
  {
    title: 'Enterprise AI copilot',
    description:
      'Deploy a governed AI assistant for all employees, with routing controls replacing shadow AI use.',
  },
]

export default function BiotechPharmaPage() {
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
              AI Gateway Built for
              <br />
              <span className="text-[var(--accent-text)]">GxP Compliance &amp; IP Protection</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-gray-500 md:text-base">
              Bifrost gives Pharmaceutical and Biotechnology teams governed AI access that protects molecular IP and satisfies ALCOA+ audit requirements.
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
              Barriers to AI deployment in biotech and pharma
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              The barriers slowing AI adoption across research, clinical, and manufacturing.
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
              Controls for IP protection and GxP compliance
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
            Bifrost enforces access controls, policies, and audit requirements across every AI workflow in the organization.
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
              Built for platform teams in pharma and biotech
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Routing, guardrails, lab integrations, and observability designed around pharma&apos;s data sensitivity and scale requirements.
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
              Operational views for finance and research teams
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Dashboard panels that support evidence export, routing visibility, and cost control for platform operators.
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
              Scale AI workflows in pharma and biotech using Bifrost
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
            Deploy a GxP-ready AI gateway for your environment
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-600">
            Talk to the Bifrost team about your compliance requirements and deployment architecture.
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
