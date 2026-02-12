import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import FeatureMatrix from '@/components/resources/FeatureMatrix'
import DropInReplacement from '@/components/resources/DropInReplacement'
import { Button } from '@/components/ui/Button'
import { getCostCalculatorBaseUrl } from '@/lib/utils'
import {
  Activity,
  ArrowRight,
  ShieldCheck,
  FileText,
  Lock,
  SignalHigh,
  Building2,
  Stethoscope,
  Banknote,
  ExternalLink,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Bifrost for Healthcare & Life Sciences | Secure AI Gateway',
  description:
    'Deploy Bifrost as a secure AI gateway for healthcare and life sciences with auditability, governance, and low-latency routing.',
  alternates: {
    canonical: 'https://www.getmaxim.ai/bifrost/resources/healthcare-life-sciences',
  },
}

const challenges = [
  {
    icon: ShieldCheck,
    title: 'Regulatory compliance',
    description:
      'Strict privacy rules require complete visibility and control over every model request.',
  },
  {
    icon: Stethoscope,
    title: 'Clinical safety',
    description:
      'Patient-facing workflows demand guardrails, redaction, and safe fallback behavior.',
  },
  {
    icon: SignalHigh,
    title: 'Operational scale',
    description:
      'High-volume clinical and research workloads require consistent, low-latency routing.',
  },
]

const governance = [
  {
    icon: Lock,
    title: 'In-VPC and on-prem deployment',
    description: 'Keep sensitive data inside your network perimeter with private deployments.',
  },
  {
    icon: FileText,
    title: 'Audit-grade logs',
    description: 'Capture full request trails for compliance and internal review.',
  },
  {
    icon: ShieldCheck,
    title: 'Policy enforcement',
    description: 'Apply content policies, PII redaction, and access controls consistently.',
  },
  {
    icon: Banknote,
    title: 'Cost governance',
    description: 'Set budgets and enforce usage limits across departments and teams.',
  },
]

const platformCapabilities = [
  {
    icon: Activity,
    title: 'Centralized Observability',
    description: 'Track every request with latency, provider, and routing details.',
  },
  {
    icon: FileText,
    title: 'Audit-Ready Evidence',
    description: 'Generate compliance trails for internal and regulatory reviews.',
  },
  {
    icon: ShieldCheck,
    title: 'Guardrails and Redaction',
    description: 'Enforce safety policies and PII protection across workflows.',
  },
  {
    icon: Banknote,
    title: 'Budget Governance',
    description: 'Prevent runaway spend with virtual keys and limits.',
  },
  {
    icon: Building2,
    title: 'Enterprise Deployment',
    description: 'Deploy in VPC or on-prem with full network control.',
  },
  {
    icon: SignalHigh,
    title: 'High-Throughput Routing',
    description: 'Maintain performance even under peak demand.',
  },
]

const interfaceHighlights = [
  {
    src: '/bifrost-screenshot/dashboard-main.png',
    title: 'Operations Dashboard',
    description: 'Live monitoring for system health, routing, and usage visibility.',
    objectPosition: 'center top',
  },
  {
    src: '/bifrost-screenshot/logs.png',
    title: 'Audit Logs',
    description: 'Detailed request trails ready for compliance and forensic analysis.',
    objectPosition: 'center center',
  },
  {
    src: '/bifrost-screenshot/Virtual%20Keys.png',
    title: 'Virtual Keys and Budgets',
    description: 'Budget enforcement and access segmentation across teams.',
    objectPosition: 'center',
  },
]

const useCases = [
  {
    title: 'Clinical documentation',
    description:
      'Apply guardrails and redaction for summaries, notes, and documentation workflows.',
  },
  {
    title: 'Care navigation and support',
    description: 'Scale patient-facing AI with consistent policies and audit trails.',
  },
  {
    title: 'Medical coding and billing',
    description: 'Route requests through approved providers with full traceability.',
  },
  {
    title: 'Research and trial analysis',
    description: 'Support high-volume research workflows with predictable performance.',
  },
  {
    title: 'Pharmacovigilance',
    description: 'Monitor safety signals with governed model access and logging.',
  },
  {
    title: 'Enterprise copilots',
    description: 'Deploy internal copilots with centralized governance and monitoring.',
  },
]

export default function HealthcareLifeSciencesPage() {
  const basePath = getCostCalculatorBaseUrl()

  return (
    <div className="min-h-screen bg-white">
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
              Bifrost provides centralized governance, auditability, and low-latency routing for
              regulated healthcare and life sciences workflows.
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
              Barriers to Scalable Healthcare AI
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
              Enterprise Controls Without Slowing Care Teams
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Deploy Bifrost in your environment and enforce consistent policies across every model
              request.
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
              Built for Regulated Healthcare Operations
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Unified governance, routing, and observability with the controls healthcare
              organizations require.
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
              Operational Views Built for Healthcare Compliance
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Focused dashboard panels that highlight routing, audit trails, and budget governance.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {interfaceHighlights.map((shot) => (
              <div key={shot.title} className="relative border border-gray-200 bg-white">
                <div className="absolute top-3 left-3 z-10 h-2 w-2 border-t border-l border-[var(--accent)] opacity-40" />
                <div className="absolute top-3 right-3 z-10 h-2 w-2 border-t border-r border-[var(--accent)] opacity-40" />
                <div className="absolute bottom-3 left-3 z-10 h-2 w-2 border-b border-l border-[var(--accent)] opacity-40" />
                <div className="absolute right-3 bottom-3 z-10 h-2 w-2 border-r border-b border-[var(--accent)] opacity-40" />
                <div className="relative aspect-[16/9] overflow-hidden bg-gray-50">
                  <Image
                    src={shot.src}
                    alt={shot.title}
                    fill
                    className="object-cover"
                    style={{ objectPosition: shot.objectPosition }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="border-t border-gray-200 p-4">
                  <h3 className="mb-1 text-sm text-gray-900">{shot.title}</h3>
                  <p className="text-xs text-gray-500">{shot.description}</p>
                </div>
              </div>
            ))}
          </div>
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
              Industry Workflows Powered by Bifrost
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
            Bring Regulated Healthcare AI Under Control
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-600">
            Talk to the Bifrost team about deploying a compliant, low-latency gateway in your
            environment.
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
