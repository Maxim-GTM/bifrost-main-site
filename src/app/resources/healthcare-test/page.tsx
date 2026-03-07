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
  title: 'Bifrost for Healthcare & Life Sciences | HIPAA-Ready AI Gateway',
  description:
    'Deploy AI in regulated healthcare environments with air-gapped infrastructure, HIPAA-grade audit trails, PHI redaction, and per-department cost governance.',
  alternates: {
    canonical: 'https://www.getmaxim.ai/bifrost/resources/healthcare-test',
  },
}

const challenges = [
  {
    icon: ShieldCheck,
    title: 'HIPAA and regulatory complexity',
    description:
      'BAA negotiations, privacy assessments, and security reviews delay AI projects 6–12 months before a single model reaches production.',
  },
  {
    icon: Stethoscope,
    title: 'Clinical safety at inference time',
    description:
      'Patient-facing workflows require real-time guardrails, PHI redaction, and deterministic fallback — one unfiltered response creates liability.',
  },
  {
    icon: SignalHigh,
    title: 'Scale without vendor bottlenecks',
    description:
      '10,000+ AI-assisted notes per day across a single hospital. Cloud rate limits and single-provider lock-in can\'t sustain clinical volumes.',
  },
]

const governance = [
  {
    icon: Lock,
    title: 'Air-gapped and VPC deployment',
    description:
      'PHI never transits the public internet. No third-party BAAs required with LLM providers.',
  },
  {
    icon: FileText,
    title: 'HIPAA-grade audit trails',
    description:
      'Every request logged with user, timestamp, model, and tokens. OpenTelemetry-native with retention exceeding HIPAA\'s 6-year minimum.',
  },
  {
    icon: ShieldCheck,
    title: 'Guardrails and PHI redaction',
    description:
      'Detect and block SSNs, MRNs, and identifiers in model outputs. Input sanitization and content policies on every call.',
  },
  {
    icon: Banknote,
    title: 'Per-department cost governance',
    description:
      'Virtual keys with spend limits per department, project, or role. Real-time alerts at budget thresholds.',
  },
]

const platformCapabilities = [
  {
    icon: Activity,
    title: 'Centralized Observability',
    description:
      'Real-time dashboards for latency, token usage, and routing metadata. Export to Splunk, LogRhythm, or any SIEM.',
  },
  {
    icon: FileText,
    title: 'Audit-Ready Compliance Evidence',
    description:
      'Tamper-evident trails for HIPAA audits, FDA inspections, and IRB reviews. Zero manual log assembly.',
  },
  {
    icon: ShieldCheck,
    title: 'Input/Output Guardrails',
    description:
      'Prompt injection defense, PHI redaction, and safety filters — consistent across GPT-4, Claude, Llama, and any model.',
  },
  {
    icon: Banknote,
    title: 'Budget Controls and Chargeback',
    description:
      'Hard and soft spend limits on virtual keys. Cost attribution by department, project, or user.',
  },
  {
    icon: Building2,
    title: 'On-Prem and Private Cloud',
    description:
      'Bare metal, Kubernetes, or private cloud. Zero telemetry. Full control for air-gapped environments.',
  },
  {
    icon: SignalHigh,
    title: 'High-Throughput Routing',
    description:
      '5,000+ RPS with 11µs gateway overhead. Load-balance across on-prem and cloud models with automatic failover.',
  },
]

const interfaceHighlights = [
  {
    src: '/bifrost-screenshot/dashboard-main.png',
    title: 'Operations Dashboard',
    description:
      'Live request volume, latency percentiles, error rates, and model utilization across workloads.',
    objectPosition: 'center top',
  },
  {
    src: '/bifrost-screenshot/logs.png',
    title: 'Audit Logs',
    description:
      'Searchable, tamper-evident request trails with full metadata — ready for HIPAA and FDA review.',
    objectPosition: 'center center',
  },
  {
    src: '/bifrost-screenshot/Virtual%20Keys.png',
    title: 'Virtual Keys and Budgets',
    description:
      'Scoped access with per-department spend limits, role-based permissions, and real-time cost tracking.',
    objectPosition: 'center',
  },
]

const useCases = [
  {
    title: 'Clinical documentation automation',
    description:
      'Route transcription and SOAP note generation through governed models with PHI redaction and EHR integration at 10,000+ notes per day.',
  },
  {
    title: 'Medical coding and billing',
    description:
      'Generate ICD-10 and CPT codes with model-level traceability, human-in-the-loop review, and automatic cost attribution.',
  },
  {
    title: 'Prior authorization',
    description:
      'Assemble justification letters and HL7 278 submissions on-prem, with routing optimized for payer-specific guidelines.',
  },
  {
    title: 'Radiology report generation',
    description:
      'Draft structured reports from DICOM metadata with air-gapped inference, critical findings alerts, and radiologist sign-off.',
  },
  {
    title: 'Drug discovery and clinical trials',
    description:
      'High-throughput molecule generation and trial matching with zero telemetry — protecting proprietary data and IRB-governed records.',
  },
  {
    title: 'Population health and pharmacovigilance',
    description:
      'Score 50,000+ patients daily for readmission risk and automate adverse event reporting with CMS-ready audit trails.',
  },
]

export default function HealthcareTestPage() {
  const basePath = getCostCalculatorBaseUrl()

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="text-center">
            <span className="provider-badge">[ ENTERPRISE READY: VPC | ON-PREM | AIR-GAPPED ]</span>
            <h1 className="mb-4 text-center text-4xl leading-[1.2] font-normal tracking-tight text-gray-900 md:text-5xl">
              HIPAA-Ready AI Gateway for
              <br />
              <span className="text-[var(--accent-text)]">Healthcare &amp; Life Sciences</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-gray-500 md:text-base">
              Deploy AI across clinical, research, and operational workflows without sending PHI
              outside your network. Air-gapped routing, HIPAA-grade audit trails, and per-department
              cost governance — in weeks, not months.
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
              Why Healthcare AI Stalls Before It Ships
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
              Enterprise Controls That Ship in Weeks, Not Quarters
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Deploy inside your network and enforce HIPAA-aligned policies across every model
              request. One approval cycle instead of per-vendor reviews.
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
              Infrastructure Purpose-Built for Regulated AI
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Unified governance, routing, and observability with the security posture CISOs, CMIOs,
              and compliance officers require.
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
              Visibility Your Compliance Team Will Actually Use
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Operations monitoring, audit evidence, and budget tracking — without stitching together
              external tools.
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
              From Clinical Workflows to Drug Discovery
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              One gateway for the highest-ROI AI use cases across health systems, academic medical
              centers, and life sciences.
            </p>
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
            Ship Healthcare AI in Weeks, Not Quarters
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-600">
            Deploy an air-gapped, HIPAA-aligned gateway with audit trails, PHI redaction, and cost
            controls from day one.
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
