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
    canonical: 'https://www.getmaxim.ai/bifrost/resources/finance-test',
  },
}

const challenges = [
  {
    icon: ShieldCheck,
    title: 'Shadow AI exposure',
    description:
      '65% of bank employees already use unapproved AI tools, and shadow AI incidents carry a $670K breach premium over standard data events.',
  },
  {
    icon: Building2,
    title: 'Vendor review bottlenecks',
    description:
      'GLBA Safeguards Rule classifies every cloud LLM as a service provider, triggering legal reviews that average 6–10 weeks per vendor.',
  },
  {
    icon: SignalHigh,
    title: 'Governance gaps at scale',
    description:
      '71% of financial institutions formally use AI, but only 16% have implemented technical controls to satisfy FINRA, OCC, or SOX requirements.',
  },
]

const governance = [
  {
    icon: Lock,
    title: 'Air-gapped and VPC deployment',
    description:
      'Keep NPI, trading data, and client records inside your network perimeter, eliminating GLBA service provider designation entirely.',
  },
  {
    icon: FileText,
    title: '7-year tamper-evident audit logs',
    description:
      'Satisfy FINRA 17a-4, SOX Section 802, and GLBA requirements from a single system with SIEM-exportable, immutable request trails.',
  },
  {
    icon: CheckCircle2,
    title: 'SAML SSO and RBAC',
    description:
      'Integrate with Okta, Azure AD, or Ping Identity to enforce role-based access for trading desks, compliance teams, and developers separately.',
  },
  {
    icon: Banknote,
    title: 'Department cost governance',
    description:
      'Set hard spending limits per team, track LLM costs by cost center in real time, and export monthly chargeback reports to finance systems.',
  },
]

const useCases = [
  {
    title: 'Enterprise knowledge search',
    description:
      'Route employee queries across Confluence, SharePoint, and Bloomberg through a single governed gateway with per-user access controls.',
  },
  {
    title: 'Real-time fraud detection',
    description:
      'Add an LLM intelligence layer to existing fraud pipelines with 11µs overhead and air-gapped transaction data handling.',
  },
  {
    title: 'Regulatory research automation',
    description:
      'Process FINRA notices, OCC bulletins, and Federal Register updates with full audit trails for examiner documentation.',
  },
  {
    title: 'Loan underwriting analysis',
    description:
      'Route commercial credit document packages through approved models with ECOA guardrails and SR 11-7 audit evidence.',
  },
  {
    title: 'AML and KYC processing',
    description:
      'Automate beneficial ownership review and SAR draft generation with BSA-compliant logging and PII redaction.',
  },
  {
    title: 'Developer productivity platform',
    description:
      'Deploy AI coding tools to thousands of developers with RBAC, credential guardrails, and team-level usage budgets enforced at the gateway.',
  },
]

const platformCapabilities = [
  {
    icon: FileText,
    title: 'Compliance-Ready Audit Trail',
    description: 'Log every request with user identity, model version, and token counts for examiner review.',
  },
  {
    icon: ShieldCheck,
    title: 'NPI Guardrails and Redaction',
    description: 'Detect and block SSNs, account numbers, and PANs before they reach any model.',
  },
  {
    icon: Building2,
    title: 'Air-Gapped Deployment',
    description: 'Route all LLM traffic through your VPC with no public internet egress.',
  },
  {
    icon: Banknote,
    title: 'Real-Time Cost Visibility',
    description: 'Track spend by department and use case with hard budget stops and instant alerts.',
  },
  {
    icon: SignalHigh,
    title: 'Sub-Millisecond Routing',
    description: '11µs gateway overhead keeps fraud detection and trading workflows inside latency budgets.',
  },
  {
    icon: Activity,
    title: 'Multi-Provider Management',
    description: 'Switch between OpenAI, Anthropic, Llama, and Azure with one configuration change.',
  },
]

const interfaceHighlights = [
  {
    src: '/bifrost-screenshot/dashboard-main.png',
    title: 'Unified request dashboard',
    description:
      'Monitor live traffic by provider, model, latency, and error rate across every team and use case from a single view.',
    objectPosition: 'center top',
  },
  {
    src: '/bifrost-screenshot/logs.png',
    title: 'Model governance controls',
    description:
      'Configure approved models, access rules, and guardrails in one place — no code changes required.',
    objectPosition: 'center center',
  },
  {
    src: '/bifrost-screenshot/Virtual%20Keys.png',
    title: 'Budget and cost center tracking',
    description:
      'Real-time spend by department and use case with configurable thresholds, instant alerts, and exportable chargeback reports.',
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
              Secure AI Gateway for Financial Services and Banking
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-gray-500 md:text-base">
              Centralized governance, audit-ready logging, and low-latency routing for regulated
              banking workflows.
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
              Why AI deployments stall at financial institutions
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Banks adopt AI faster than they implement the controls regulators require.
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
              Enterprise controls that keep regulated AI moving
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Deploy Bifrost inside your network and enforce consistent policies across every model
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
              Built for regulated banking operations at production scale
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
              Operational views built for banking compliance teams
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              The views your platform team, compliance officers, and finance stakeholders will
              actually use.
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
              Financial services workflows governed by Bifrost
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
            Bring regulated banking AI under control
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-600">
            Talk to the Bifrost team about deploying a compliant, low-latency gateway inside your
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
