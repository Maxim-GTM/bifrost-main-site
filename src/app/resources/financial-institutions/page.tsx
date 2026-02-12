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
  Banknote,
  Building2,
  CheckCircle2,
  ExternalLink,
  FileText,
  Lock,
  ShieldCheck,
  SignalHigh,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Bifrost for Financial Institutions | Secure AI Gateway',
  description:
    'Deploy Bifrost as a secure, low-latency AI gateway for regulated financial institutions with governance, auditability, and multi-provider resilience.',
  alternates: {
    canonical: 'https://www.getmaxim.ai/bifrost/resources/financial-institutions',
  },
}

const challenges = [
  {
    icon: ShieldCheck,
    title: 'Compliance bottlenecks',
    description:
      'GLBA privacy rules, FFIEC guidance, and audit requirements demand full oversight of every model interaction.',
  },
  {
    icon: Building2,
    title: 'Operational fragmentation',
    description:
      'Legacy systems make it difficult to deploy AI consistently across lending, AML monitoring, and risk operations.',
  },
  {
    icon: SignalHigh,
    title: 'Performance and scale',
    description:
      'Fraud detection and market-risk workflows require low latency and predictable throughput under peak demand.',
  },
]

const governance = [
  {
    icon: Lock,
    title: 'In-VPC and on-prem deployment',
    description:
      'Keep regulated data inside your network perimeter with private deployments and custom networking controls.',
  },
  {
    icon: FileText,
    title: 'Audit-grade logs',
    description:
      'Capture complete request trails with user, provider, route, token, and latency metadata for compliance reviews.',
  },
  {
    icon: CheckCircle2,
    title: 'Role-based access control',
    description:
      'Apply fine-grained permissions and rate limits by team, environment, and application.',
  },
  {
    icon: Banknote,
    title: 'Cost governance',
    description: 'Virtual keys enforce budgets and spend limits across departments and projects.',
  },
]

const useCases = [
  {
    title: 'Fraud detection and investigation',
    description:
      'Route high-sensitivity requests through approved providers with audit logs and policy enforcement.',
  },
  {
    title: 'Regulatory and compliance monitoring',
    description: 'Centralize model access for monitoring and reporting across business units.',
  },
  {
    title: 'Credit and loan decisioning',
    description: 'Apply guardrails and data controls while meeting strict latency requirements.',
  },
  {
    title: 'Customer support and servicing',
    description: 'Scale AI assistance without exposing sensitive data or losing traceability.',
  },
  {
    title: 'Risk and market intelligence',
    description: 'Optimize routing across providers to balance cost, quality, and latency.',
  },
  {
    title: 'Enterprise AI copilots',
    description: 'Enable secure internal copilots with centralized governance and monitoring.',
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
    title: 'Policy Enforcement',
    description: 'Apply guardrails, redaction, and access control consistently.',
  },
  {
    icon: Banknote,
    title: 'Budget Governance',
    description: 'Set limits per team and prevent runaway spend.',
  },
  {
    icon: Building2,
    title: 'Enterprise Deployment',
    description: 'Deploy in VPC or on-prem with full network control.',
  },
  {
    icon: SignalHigh,
    title: 'High-Throughput Routing',
    description: 'Maintain performance even under peak load.',
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

export default function FinancialInstitutionsPage() {
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
              <span className="text-[var(--accent-text)]">Financial Institutions</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-gray-500 md:text-base">
              Bifrost provides centralized governance, compliance-grade auditability, and
              low-latency routing for banks, insurers, and investment platforms.
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
              Barriers to scalable AI in financial services
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
              Enterprise-grade controls without slowing teams down
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
              Designed for regulated financial operations
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Unified governance, routing, and observability with the controls financial
              institutions require.
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
              Operational Views Built for Compliance
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
              Industry workflows powered by Bifrost
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
            Bring regulated AI workloads under control
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-600">
            Talk to the Bifrost team about deploying a compliant, low-latency gateway in your
            environment.
          </p>
          <div className="flex w-full flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
            <Link
              href="https://calendly.com/maximai/bifrost-demo?month=2026-01"
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
