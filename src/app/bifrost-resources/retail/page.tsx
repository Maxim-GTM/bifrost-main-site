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
  ExternalLink,
  FileText,
  Lock,
  Package,
  ShieldCheck,
  ShoppingCart,
  SignalHigh,
  Users,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Bifrost for Retail | Secure AI Gateway',
  description:
    'Deploy Bifrost as a secure, low-latency AI gateway for retail organizations with governance, observability, and multi-provider resilience.',
}

const challenges = [
  {
    icon: ShoppingCart,
    title: 'Customer experience at scale',
    description:
      'Personalization, recommendations, and support require consistent AI performance across peak shopping periods.',
  },
  {
    icon: Package,
    title: 'Supply chain complexity',
    description:
      'Inventory forecasting and logistics optimization demand reliable, high-throughput model access.',
  },
  {
    icon: Users,
    title: 'Multi-channel coordination',
    description:
      'Unified AI strategy across e-commerce, stores, and mobile requires centralized governance and routing.',
  },
]

const governance = [
  {
    icon: Lock,
    title: 'In-VPC and on-prem deployment',
    description:
      'Keep customer data and proprietary models inside your network perimeter with private deployments.',
  },
  {
    icon: FileText,
    title: 'Comprehensive logging',
    description:
      'Capture complete request trails with user, provider, route, token, and latency metadata.',
  },
  {
    icon: ShieldCheck,
    title: 'Role-based access control',
    description:
      'Apply fine-grained permissions and rate limits by team, channel, and application.',
  },
  {
    icon: Banknote,
    title: 'Cost governance',
    description: 'Virtual keys enforce budgets and spend limits across departments and campaigns.',
  },
]

const useCases = [
  {
    title: 'Product recommendations',
    description: 'Deliver personalized suggestions with optimized routing for cost and latency.',
  },
  {
    title: 'Customer support automation',
    description: 'Scale AI-powered support with guardrails and consistent policy enforcement.',
  },
  {
    title: 'Inventory and demand forecasting',
    description: 'Route high-volume prediction workloads with reliable throughput and fallback.',
  },
  {
    title: 'Dynamic pricing optimization',
    description: 'Apply AI models for pricing with centralized governance and audit trails.',
  },
  {
    title: 'Visual search and product discovery',
    description: 'Enable multimodal AI features with unified provider management.',
  },
  {
    title: 'Marketing personalization',
    description:
      'Power personalized campaigns with cost-effective model routing and budget controls.',
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
    title: 'Complete Request Trails',
    description: 'Generate detailed logs for analytics and operational reviews.',
  },
  {
    icon: ShieldCheck,
    title: 'Policy Enforcement',
    description: 'Apply guardrails, content filtering, and access control consistently.',
  },
  {
    icon: Banknote,
    title: 'Budget Governance',
    description: 'Set limits per team, campaign, and channel to prevent runaway spend.',
  },
  {
    icon: Building2,
    title: 'Enterprise Deployment',
    description: 'Deploy in VPC or on-prem with full network control.',
  },
  {
    icon: SignalHigh,
    title: 'High-Throughput Routing',
    description: 'Maintain performance during peak shopping events and flash sales.',
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
    title: 'Request Logs',
    description: 'Detailed request trails for debugging and performance analysis.',
    objectPosition: 'center center',
  },
  {
    src: '/bifrost-screenshot/Virtual%20Keys.png',
    title: 'Virtual Keys and Budgets',
    description: 'Budget enforcement and access segmentation across teams and channels.',
    objectPosition: 'center',
  },
]

export default function RetailPage() {
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
              <span className="text-[var(--accent-text)]">Retail</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-gray-500 md:text-base">
              Bifrost provides centralized governance, low-latency routing, and cost control for
              AI-powered retail experiences across every channel.
            </p>
            <div className="flex w-full flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
              <Link href={`${basePath}/bifrost-resources/benchmarks`}>
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
              Barriers to scalable AI in retail
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
              Designed for high-volume retail operations
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Unified governance, routing, and observability with the performance retail workloads
              demand.
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
              Operational Views Built for Retail Scale
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Focused dashboard panels that highlight routing, request trails, and budget
              governance.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {interfaceHighlights.map((shot) => (
              <div key={shot.title} className="relative border border-gray-200 bg-white">
                <div className="absolute top-3 left-3 h-2 w-2 border-t border-l border-[var(--accent)] opacity-40 z-10" />
                <div className="absolute top-3 right-3 h-2 w-2 border-t border-r border-[var(--accent)] opacity-40 z-10" />
                <div className="absolute bottom-3 left-3 h-2 w-2 border-b border-l border-[var(--accent)] opacity-40 z-10" />
                <div className="absolute right-3 bottom-3 h-2 w-2 border-r border-b border-[var(--accent)] opacity-40 z-10" />
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
              Retail workflows powered by Bifrost
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
            Scale AI across your retail operations
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-600">
            Talk to the Bifrost team about deploying a high-performance, cost-effective gateway for
            your retail AI workloads.
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
            <Link href={`${basePath}/bifrost-resources/claude-code`}>
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
