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
    'Deploy AI in regulated healthcare environments with air-gapped infrastructure, HIPAA-grade audit trails, PHI redaction, and per-department cost governance. From clinical documentation to drug discovery.',
  alternates: {
    canonical: 'https://www.getmaxim.ai/bifrost/resources/healthcare-life-sciences',
  },
}

// ---------------------------------------------------------------------------
// SECTION DATA
// ---------------------------------------------------------------------------

const challenges = [
  {
    icon: ShieldCheck,
    title: 'HIPAA and regulatory complexity',
    description:
      'Sending PHI to third-party LLM APIs triggers BAA negotiations, privacy impact assessments, and security reviews — delaying AI projects by 6–12 months before a single model reaches production.',
  },
  {
    icon: Stethoscope,
    title: 'Clinical safety at inference time',
    description:
      'Patient-facing and clinician-facing workflows demand real-time guardrails, PHI redaction, and deterministic fallback behavior. A single unfiltered response can create liability exposure.',
  },
  {
    icon: SignalHigh,
    title: 'Scale without vendor bottlenecks',
    description:
      'A 500-physician hospital generates 10,000+ AI-assisted notes per day. Cloud API rate limits, unpredictable latency, and single-provider lock-in cannot sustain clinical-volume throughput.',
  },
]

const governance = [
  {
    icon: Lock,
    title: 'Air-gapped and VPC deployment',
    description:
      'Deploy inside your hospital network or private cloud. PHI never transits the public internet — eliminating the need for third-party BAAs with LLM providers.',
  },
  {
    icon: FileText,
    title: 'HIPAA-grade audit trails',
    description:
      'Log every request with user identity, timestamp, model, and token counts. OpenTelemetry-native export to your existing SIEM with configurable retention exceeding the 6-year HIPAA minimum.',
  },
  {
    icon: ShieldCheck,
    title: 'Guardrails and PHI redaction',
    description:
      'Enforce input sanitization, PII/PHI detection, and content policies across every model call. Block responses containing SSNs, MRNs, or other identifiers before they reach downstream systems.',
  },
  {
    icon: Banknote,
    title: 'Per-department cost governance',
    description:
      'Assign virtual keys with spend limits per department, project, or user role. Track radiology, pathology, and ER spend independently — with real-time alerts at 80% budget thresholds.',
  },
]

const platformCapabilities = [
  {
    icon: Activity,
    title: 'Centralized Observability',
    description:
      'Monitor every request across departments with latency, token usage, provider, and routing metadata — surfaced in real-time dashboards and exportable to Splunk or LogRhythm.',
  },
  {
    icon: FileText,
    title: 'Audit-Ready Compliance Evidence',
    description:
      'Generate tamper-evident compliance trails for HIPAA audits, FDA inspections, IRB reviews, and internal governance councils with zero manual log assembly.',
  },
  {
    icon: ShieldCheck,
    title: 'Input/Output Guardrails',
    description:
      'Apply prompt injection defenses, PHI redaction, and clinical safety filters consistently across GPT-4, Claude, Llama, and any model behind the unified API.',
  },
  {
    icon: Banknote,
    title: 'Budget Controls and Chargeback',
    description:
      'Prevent runaway spend with hard and soft limits on virtual keys. Attribute costs by department, project tag, or individual user for accurate internal chargeback.',
  },
  {
    icon: Building2,
    title: 'On-Prem and Private Cloud',
    description:
      'Deploy on bare metal, Kubernetes, or private cloud with no telemetry leakage. Full infrastructure control for air-gapped research hospitals, VA systems, and academic medical centers.',
  },
  {
    icon: SignalHigh,
    title: 'High-Throughput Routing',
    description:
      'Route 5,000+ requests per second with 11µs gateway overhead. Load-balance across on-prem and cloud models with automatic failover — no single-provider dependency.',
  },
]

const interfaceHighlights = [
  {
    src: '/bifrost-screenshot/dashboard-main.png',
    title: 'Operations Dashboard',
    description:
      'Real-time visibility into request volume, latency percentiles, error rates, and model utilization across clinical and research workloads.',
    objectPosition: 'center top',
  },
  {
    src: '/bifrost-screenshot/logs.png',
    title: 'Audit Logs',
    description:
      'Searchable, tamper-evident request trails with user identity, timestamps, and full input/output metadata — ready for HIPAA and FDA compliance review.',
    objectPosition: 'center center',
  },
  {
    src: '/bifrost-screenshot/Virtual%20Keys.png',
    title: 'Virtual Keys and Budgets',
    description:
      'Scoped access keys with per-department spend limits, role-based permissions, and real-time cost tracking across radiology, pathology, and clinical teams.',
    objectPosition: 'center',
  },
]

const useCases = [
  {
    title: 'Clinical documentation automation',
    description:
      'Route ambient transcription and SOAP note generation through governed models with PHI redaction, audit logging, and EHR integration via MCP — at 10,000+ notes per day.',
  },
  {
    title: 'Medical coding and billing',
    description:
      'Generate ICD-10 and CPT codes from clinical notes with model-level traceability, human-in-the-loop for high-value claims, and automatic cost attribution to billing teams.',
  },
  {
    title: 'Prior authorization',
    description:
      'Assemble justification letters and HL7 278 submissions with AI — keeping patient history on-prem while routing to the optimal model for payer-specific guideline matching.',
  },
  {
    title: 'Radiology report generation',
    description:
      'Draft structured radiology reports from DICOM metadata and image embeddings with air-gapped inference, critical findings alerting, and radiologist sign-off workflows.',
  },
  {
    title: 'Drug discovery and clinical trials',
    description:
      'Run high-throughput molecule generation and trial-matching workloads with zero telemetry leakage — protecting proprietary compound data and IRB-governed patient records.',
  },
  {
    title: 'Population health and pharmacovigilance',
    description:
      'Score 50,000+ chronic disease patients daily for readmission risk and automate adverse event reporting — with CMS-ready audit trails and budget-controlled batch processing.',
  },
]

// ---------------------------------------------------------------------------
// PAGE COMPONENT
// ---------------------------------------------------------------------------

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
              HIPAA-Ready AI Gateway for
              <br />
              <span className="text-[var(--accent-text)]">Healthcare &amp; Life Sciences</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-gray-500 md:text-base">
              Deploy AI across clinical, research, and operational workflows without sending PHI
              outside your network. Bifrost provides air-gapped inference routing, HIPAA-grade audit
              trails, and per-department cost governance — cutting deployment timelines from months to
              weeks.
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
              Bifrost deploys inside your network perimeter and enforces HIPAA-aligned policies across
              every model request — so your compliance, security, and clinical teams approve once
              instead of per-vendor.
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
              Unified governance, intelligent routing, and deep observability with the security
              posture that healthcare CISOs, CMIOs, and compliance officers require.
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
              Purpose-built dashboards for operations monitoring, audit evidence generation, and
              department-level budget tracking — without stitching together external tools.
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
              One gateway powering the AI use cases with the highest ROI across health systems,
              academic medical centers, and life sciences organizations.
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
            Talk to the Bifrost team about deploying an air-gapped, HIPAA-aligned gateway in your
            environment — with audit trails, PHI redaction, and cost controls from day one.
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
