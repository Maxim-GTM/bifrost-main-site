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
  Lock,
  Eye,
  AlertTriangle,
  ExternalLink,
  Server,
  FileText,
  KeyRound,
  Banknote,
  Activity,
  Bot,
  Shuffle,
  Code,
  Database,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI Gateway for Cybersecurity & Threat Intelligence | Bifrost',
  description:
    'Secure AI gateway for cybersecurity teams with air-gapped deployments, zero-trust architecture, and complete control over sensitive threat data and security tooling.',
  alternates: {
    canonical: 'https://www.getmaxim.ai/bifrost/industry-pages/cybersecurity',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'AI Gateway for Cybersecurity & Threat Intelligence | Bifrost',
  description:
    'Secure AI gateway for cybersecurity teams with air-gapped deployments, zero-trust architecture, and complete control over sensitive threat data and security tooling.',
  url: 'https://www.getmaxim.ai/bifrost/industry-pages/cybersecurity',
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
      'Bifrost is a secure AI gateway for cybersecurity teams that enables air-gapped deployments, zero-trust access controls, and complete audit trails for sensitive security operations.',
  },
  audience: {
    '@type': 'Audience',
    audienceType: 'Cybersecurity and threat intelligence teams',
  },
}

const challenges = [
  {
    icon: AlertTriangle,
    title: 'Data exfiltration risks',
    description:
      'Security teams cannot send sensitive threat data, IOCs, or proprietary detection logic to third-party AI providers without violating data handling policies.',
  },
  {
    icon: Eye,
    title: 'No visibility into AI operations',
    description:
      'SOC analysts and threat hunters use commercial AI tools with no audit trail, creating blind spots in security operations and compliance monitoring.',
  },
  {
    icon: Lock,
    title: 'Trust boundary violations',
    description:
      'Connecting critical security infrastructure to external AI services crosses established network segmentation and zero-trust boundaries.',
  },
]

const governance = [
  {
    icon: Server,
    title: 'Air-gapped deployment',
    description:
      'Deploy Bifrost completely offline in isolated security environments, with no internet connectivity required for operations.',
  },
  {
    icon: FileText,
    title: 'Security-grade audit logging',
    description:
      'Immutable logs of every AI interaction with full context: user identity, query content, model responses, and data classifications.',
  },
  {
    icon: KeyRound,
    title: 'Zero-trust access control',
    description:
      'Enforce least-privilege access with granular virtual keys, role-based permissions, and integration with existing IAM systems.',
  },
  {
    icon: Banknote,
    title: 'Team-level resource limits',
    description:
      'Set usage quotas per security team or use case, preventing resource exhaustion and controlling operational costs.',
  },
]

const platformCapabilities = [
  {
    icon: Shuffle,
    title: 'Multi-model routing',
    description:
      'Route different security workloads to specialized models: open-source for sensitive data, commercial for general analysis.',
  },
  {
    icon: ShieldCheck,
    title: 'Input/output guardrails',
    description:
      'Prevent accidental exposure of credentials, API keys, or classified IOCs through configurable redaction and validation policies.',
  },
  {
    icon: Activity,
    title: 'Real-time observability',
    description:
      'Monitor AI usage patterns across security teams with metrics for latency, token consumption, error rates, and access patterns.',
  },
  {
    icon: Bot,
    title: 'MCP Gateway for security tools',
    description:
      'Give AI agents governed access to SIEM, EDR, and threat intel platforms with explicit tool filtering and execution logging.',
  },
  {
    icon: Database,
    title: 'Semantic caching',
    description:
      'Cache responses for common threat intelligence queries and IOC lookups to reduce latency and provider costs.',
  },
  {
    icon: Code,
    title: 'OpenAI-compatible API',
    description:
      'Drop-in replacement for existing security automation and AI workflows with no code changes required.',
  },
]

const interfaceHighlights = [
  {
    riveSrc: '/rive/lln9t3OuTneA9tQOi8XMPNlfNCk.riv',
    title: 'Security operations dashboard',
    description:
      'Real-time visibility into AI usage across SOC, threat intelligence, and vulnerability management teams.',
  },
  {
    riveSrc: '/rive/c0tVyQYkMtvuhTCKvA0SjGVHkY.riv',
    title: 'Access control and guardrails',
    description:
      'Configure model access, data handling policies, and automated redaction rules through a unified interface.',
  },
  {
    riveSrc: '/rive/KBbyqDZQ7ko6obmMhOt3hllKA.riv',
    title: 'Audit and compliance reporting',
    description:
      'Exportable logs and usage reports for security audits, compliance reviews, and incident post-mortems.',
  },
]

const useCases = [
  {
    title: 'Threat intelligence analysis',
    description:
      'Analyze malware samples, threat actor TTPs, and campaign patterns using AI models that never see your proprietary intelligence.',
  },
  {
    title: 'Security alert triage',
    description:
      'Auto-triage SIEM alerts and security events with AI reasoning while keeping alert context and detection logic air-gapped.',
  },
  {
    title: 'Vulnerability assessment',
    description:
      'Assist security researchers with vulnerability analysis, exploit development, and patch impact assessment in isolated environments.',
  },
  {
    title: 'Incident response automation',
    description:
      'Generate incident timelines, impact analysis, and remediation plans with AI that has governed access to your security tools.',
  },
  {
    title: 'Security code review',
    description:
      'Enable developers to use AI coding assistants for security-critical code without exposing proprietary security logic to external providers.',
  },
  {
    title: 'Compliance documentation',
    description:
      'Draft security policies, risk assessments, and compliance reports with AI models operating inside your compliance boundary.',
  },
]

export default function CybersecurityPage() {
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
              <span className="text-[var(--accent-text)]">Cybersecurity & Threat Intelligence</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-gray-500 md:text-base">
              Air-gapped deployments, zero-trust controls, and complete audit trails purpose-built for security operations teams.
            </p>
            <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row sm:items-center">
              <Link href={`${basePath}/resources/benchmarks`}>
                <Button size="lg">
                  View benchmarks
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link
                href="https://docs.getbifrost.ai"
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
              Why security teams cannot use commercial AI
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Standard AI gateways create unacceptable data exposure and compliance risks for organizations handling sensitive threat intelligence and security operations.
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
              [ SECURITY CONTROLS ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
              Defense-grade controls for AI operations
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Deploy AI infrastructure that meets the same security standards as your most critical systems.
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
              Built for security operations at scale
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Enterprise-grade AI infrastructure designed around the workflows and threat models of modern security teams.
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
              [ OPERATIONAL VISIBILITY ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
              Complete visibility for security operations
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Purpose-built interfaces for SOC teams, security engineers, and compliance stakeholders.
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
              Security workflows powered by Bifrost
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

      {/* Deployment */}
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
            Secure AI infrastructure for security teams
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-600">
            Deploy Bifrost in your air-gapped environment and give security teams AI capabilities without compromising your threat intelligence or operational security.
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
              security features.
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
