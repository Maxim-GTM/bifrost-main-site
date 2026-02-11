import React from 'react'
import { Metadata } from 'next'
import FeatureMatrix from '@/components/resources/FeatureMatrix'
import DropInReplacement from '@/components/resources/DropInReplacement'
import {
  Zap,
  Shield,
  BarChart3,
  Layers,
  RefreshCw,
  Lock,
  Eye,
  Server,
  GitBranch,
  Clock,
  DollarSign,
  CheckCircle2,
  AlertTriangle,
  Users,
  Building2,
  Gauge,
  ArrowRight,
  ExternalLink,
  Cpu,
  Network,
  KeyRound,
  Bell,
  Code2,
  Cloud,
  Activity,
  ShieldCheck,
  Workflow,
  Database,
  Globe,
  Plug,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "LLM Gateway Buyer's Guide 2026 | Compare Top AI Gateway Solutions",
  description:
    'A comprehensive comparison of leading AI gateway platforms including Bifrost, LiteLLM, Portkey, Helicone, and Kong. Find the best LLM gateway for your enterprise.',
}

const platforms = [
  {
    name: 'Bifrost',
    tagline: 'The Fastest Enterprise LLM Gateway',
    deployment: 'Self-hosted, in-VPC, on-prem',
    pricing: 'Zero markup',
    latency: '~11µs',
    highlight: true,
    description:
      'Built with Go for sub-microsecond latency. Native MCP support, adaptive load balancing, and integrated with Maxim AI evaluation platform.',
    strengths: ['Sub ~11µs latency', '5,000 RPS', 'Native MCP', 'Adaptive load balancing'],
    language: 'Go',
  },
  {
    name: 'LiteLLM',
    tagline: 'Open Source Multi-Provider Proxy',
    deployment: 'Self-hosted',
    pricing: 'Zero markup',
    latency: '~8ms P95',
    highlight: false,
    description:
      'Python-based open-source gateway supporting multiple providers. Highly customizable with extensive integration options.',
    strengths: ['Open source', 'Customizable', 'Active community'],
    language: 'Python',
  },
  {
    name: 'Cloudflare AI',
    tagline: 'Unified AI traffic management',
    deployment: 'SaaS',
    pricing: 'Platform plans',
    latency: '10-50 ms',
    highlight: false,
    description: 'Unified AI traffic management for Cloudflare users. Multiple models supported.',
    strengths: ['Unified AI traffic management', 'Multiple models supported'],
    language: 'N/A',
  },
  {
    name: 'Helicone',
    tagline: 'Performance-First Observability',
    deployment: 'SaaS, Self-hosted',
    pricing: 'Zero markup',
    latency: 'Not specified',
    highlight: false,
    description: 'Gateway optimized for performance and observability with zero markup pricing.',
    strengths: ['Low latency', 'Zero markup', 'Semantic caching', 'Built-in observability'],
    language: 'N/A',
  },
  {
    name: 'Kong AI Gateway',
    tagline: 'API Management Extended',
    deployment: 'SaaS, On-premises',
    pricing: 'Enterprise',
    latency: 'Not specified',
    highlight: false,
    description:
      "Extends Kong's proven API gateway platform to support LLM routing with plugin-based architecture.",
    strengths: ['Kong ecosystem', 'Plugin architecture', 'Enterprise support', 'API management'],
    language: 'N/A',
  },
  {
    name: 'OpenRouter',
    tagline: 'Simplest Multi-Model Access',
    deployment: 'SaaS only',
    pricing: '5% markup',
    latency: '25-40ms',
    highlight: false,
    description:
      'Simplified access to multiple AI models through a single endpoint. Best for rapid prototyping.',
    strengths: ['Simple setup', 'Pay-as-you-go', 'Developer friendly'],
    language: 'N/A',
  },
]

const painPoints = [
  {
    icon: AlertTriangle,
    title: 'Provider Fragmentation',
    description:
      'Different APIs, credentials, and usage patterns across providers make scaling brittle.',
  },
  {
    icon: Eye,
    title: 'Limited Visibility',
    description:
      'Without centralized logs and metrics, teams cannot trace errors or attribute token spend.',
  },
  {
    icon: RefreshCw,
    title: 'Inconsistent Reliability',
    description:
      'Provider outages and quota limits disrupt workflows. Individual providers rarely exceed 99.7% uptime.',
  },
  {
    icon: Lock,
    title: 'Security & Governance',
    description:
      'API keys shared across environments create compliance vulnerabilities difficult to audit.',
  },
]

const capabilities = [
  {
    icon: GitBranch,
    title: 'Model Routing & Load Balancing',
    description:
      'Route requests across LLM providers using governance rules and intelligent load distribution.',
  },
  {
    icon: Layers,
    title: 'Unified API',
    description: 'Connect to multiple LLM providers with a single OpenAI-compatible API interface.',
  },
  {
    icon: BarChart3,
    title: 'Observability & Analytics',
    description:
      'Monitor requests in real-time. Track token usage and enforce limits at multiple levels.',
  },
  {
    icon: Shield,
    title: 'Fallback & Reliability',
    description:
      'Health monitoring, circuit breakers, automatic retries, and failover to alternative providers.',
  },
  {
    icon: KeyRound,
    title: 'Access Control & Security',
    description:
      'Virtual keys to manage permissions, rate limiting, budgets, and team-based access.',
  },
  {
    icon: DollarSign,
    title: 'Cost Optimization',
    description:
      'Semantic caching, budget limits, and intelligent routing to reduce costs and latency.',
  },
  {
    icon: ShieldCheck,
    title: 'Governance & Guardrails',
    description: 'Policy controls on requests and responses with real-time content moderation.',
  },
  {
    icon: Plug,
    title: 'Integration & Extensibility',
    description: 'Compatible with OpenAI, Anthropic SDKs, LangChain, and popular frameworks.',
  },
]

const integrations = [
  {
    icon: Activity,
    title: 'Maxim AI Platform',
    items: [
      'Native evaluation platform',
      'Continuous quality monitoring',
      'Real-time observability',
      'Agent simulation testing',
    ],
  },
  {
    icon: Workflow,
    title: 'Agent Frameworks',
    items: [
      'LangChain compatibility',
      'LlamaIndex integration',
      'CrewAI support',
      'OpenAI SDK drop-in',
    ],
  },
  {
    icon: Database,
    title: 'Tool & Protocol',
    items: ['MCP support', 'Webhook workflows', 'REST API management', 'Terraform & K8s manifests'],
  },
  {
    icon: Users,
    title: 'Authentication',
    items: [
      'Google & GitHub SSO',
      'SAML/OIDC support',
      'API key management',
      'Virtual key generation',
    ],
  },
  {
    icon: Server,
    title: 'Infrastructure',
    items: ['Docker & Compose', 'Kubernetes + Helm', 'Multi-cloud deployment', 'CI/CD integration'],
  },
  {
    icon: Globe,
    title: 'Monitoring',
    items: ['Prometheus metrics', 'OpenTelemetry tracing', 'Custom logging', 'Alert webhooks'],
  },
]

export default function BuyersGuidePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <span className="provider-badge">[ LLM GATEWAY BUYER&apos;S GUIDE 2026 ]</span>
            <h1 className="mb-4 text-center text-4xl leading-[1.2] font-normal tracking-tight text-gray-900 md:text-5xl">
              Choosing the Right LLM Gateway for
              <br />
              <span className="text-[var(--accent-text)]"> Enterprise AI</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-gray-500 md:text-base">
              Compare leading AI gateway platforms for multi-provider routing, cost management,
              access control, governance, observability, and enterprise-grade reliability.
            </p>
            <div className="flex w-full flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
              <Link href="#comparison">
                <Button size="lg">
                  Compare Platforms
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" asChild>
                <Link
                  href="https://calendly.com/maximai/bifrost-demo?month=2026-01"
                  target="_blank"
                >
                  Book a Demo
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What is an LLM Gateway */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
                [ UNDERSTANDING LLM GATEWAYS ]
              </p>
              <h2 className="mb-6 text-2xl text-gray-900 md:text-3xl">What is an LLM Gateway?</h2>
              <p className="mb-6 leading-relaxed text-gray-600">
                An LLM gateway is a centralized platform that sits between applications and AI model
                providers like OpenAI, Anthropic, AWS Bedrock, and Google Vertex AI.
              </p>
              <p className="leading-relaxed text-gray-600">
                It standardizes access through a single unified API while layering on
                production-grade routing, failover, cost management, observability, guardrails,
                governance, and MCP support.
              </p>
            </div>
            <div className="relative">
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-8">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Layers, label: 'Unified API' },
                    { icon: RefreshCw, label: 'Auto Failover' },
                    { icon: Shield, label: 'Governance' },
                    { icon: BarChart3, label: 'Analytics' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 rounded-lg border border-gray-100 bg-white p-4"
                    >
                      <item.icon className="h-5 w-5 text-[var(--accent)]" />
                      <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Organizations Need */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ THE CHALLENGE ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
              Why Organizations Need an LLM Gateway
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Moving generative AI from prototype to production exposes gaps that traditional
              infrastructure cannot fill.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {painPoints.map((point) => (
              <div
                key={point.title}
                className="relative rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-[var(--accent-border)] hover:shadow-sm"
              >
                <div className="absolute top-3 left-3 h-2 w-2 border-t border-l border-[var(--accent)] opacity-40" />
                <div className="absolute top-3 right-3 h-2 w-2 border-t border-r border-[var(--accent)] opacity-40" />
                <div className="absolute bottom-3 left-3 h-2 w-2 border-b border-l border-[var(--accent)] opacity-40" />
                <div className="absolute right-3 bottom-3 h-2 w-2 border-r border-b border-[var(--accent)] opacity-40" />
                <point.icon className="mb-4 h-8 w-8 text-[var(--accent)]" />
                <h3 className="mb-2 text-gray-900">{point.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Capabilities */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ CORE FUNCTIONS ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">Key Gateway Capabilities</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Modern LLM gateways provide these essential capabilities for production AI
              deployments.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((cap) => (
              <div
                key={cap.title}
                className="group relative rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-[var(--accent)] hover:shadow-md"
              >
                <div className="absolute top-3 left-3 h-2 w-2 border-t border-l border-[var(--accent)] opacity-40" />
                <div className="absolute top-3 right-3 h-2 w-2 border-t border-r border-[var(--accent)] opacity-40" />
                <div className="absolute bottom-3 left-3 h-2 w-2 border-b border-l border-[var(--accent)] opacity-40" />
                <div className="absolute right-3 bottom-3 h-2 w-2 border-r border-b border-[var(--accent)] opacity-40" />
                <cap.icon className="mb-4 h-6 w-6 text-[var(--accent)]" />
                <h3 className="mb-2 text-sm text-gray-900">{cap.title}</h3>
                <p className="text-xs leading-relaxed text-gray-600">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Comparison Cards */}
      <section id="comparison" className="scroll-mt-20 bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ PLATFORM COMPARISON ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">Top LLM Gateway Platforms</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              A quick comparison of leading platforms across deployment, pricing, and key
              differentiators.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {platforms.map((platform) => (
              <div
                key={platform.name}
                className={`relative rounded-lg border-2 p-6 transition-all ${
                  platform.highlight
                    ? 'border-[var(--accent)] bg-white shadow-lg'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                {platform.highlight && (
                  <div className="absolute -top-3 left-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-medium text-white">
                      <Zap className="h-3 w-3" />
                      Recommended
                    </span>
                  </div>
                )}
                <div className="mb-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg text-gray-900">{platform.name}</h3>
                    {platform.language !== 'N/A' && (
                      <span
                        className={`arch-tag ${platform.language === 'Go' ? '' : platform.language === 'Python' ? 'py' : platform.language === 'Rust' ? 'rs' : ''}`}
                      >
                        {platform.language}
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-medium text-gray-500">{platform.tagline}</p>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-gray-600">{platform.description}</p>
                <div className="mb-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Deployment</span>
                    <span className="font-medium text-gray-700">{platform.deployment}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Pricing</span>
                    <span className="font-medium text-gray-700">{platform.pricing}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Latency</span>
                    <span
                      className={`font-medium ${platform.highlight ? 'text-[var(--accent-dark)]' : 'text-gray-700'}`}
                    >
                      {platform.latency}
                    </span>
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex flex-wrap gap-2">
                    {platform.strengths.map((strength) => (
                      <span
                        key={strength}
                        className="inline-flex items-center rounded bg-gray-100 px-2 py-1 text-xs text-gray-600"
                      >
                        {strength}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Matrix */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ DETAILED COMPARISON ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">LLM Gateway Feature Matrix</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              A direct capability comparison across all evaluated platforms.
            </p>
          </div>

          <div className="mt-container">
            <table className="mt">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th className="col-b">Bifrost</th>
                  <th>LiteLLM</th>
                  <th>Cloudflare AI</th>
                  <th>Helicone</th>
                  <th>Kong AI</th>
                  <th>OpenRouter</th>
                </tr>
              </thead>
              <tbody>
                {/* Performance & Architecture */}
                <tr className="row-cat">
                  <td colSpan={7}>Performance &amp; Architecture</td>
                </tr>
                <tr>
                  <td>Language / Runtime</td>
                  <td className="col-b-c">
                    <span className="arch-tag">Go</span>
                  </td>
                  <td>
                    <span className="arch-tag py">Python</span>
                  </td>
                  <td>
                    <span className="arch-tag nd">N/A</span>
                  </td>
                  <td>
                    <span className="arch-tag nd">N/A</span>
                  </td>
                  <td>
                    <span className="arch-tag nd">N/A</span>
                  </td>
                  <td>
                    <span className="arch-tag nd">N/A</span>
                  </td>
                </tr>
                <tr>
                  <td>Latency Overhead</td>
                  <td className="col-b-c">
                    <span className="sv">&lt;~11µs</span>
                  </td>
                  <td>
                    <span className="sv">~8ms</span>
                  </td>
                  <td>
                    <span className="sp">10-50ms</span>
                  </td>
                  <td>
                    <span className="sn">N/A</span>
                  </td>
                  <td>
                    <span className="sn">N/A</span>
                  </td>
                  <td>
                    <span className="sv">25–40ms</span>
                  </td>
                </tr>
                <tr>
                  <td>Peak Throughput</td>
                  <td className="col-b-c">
                    <span className="sv">5,000 RPS</span>
                  </td>
                  <td>
                    <span className="sn">Not published</span>
                  </td>
                  <td>
                    <span className="sn">Not published</span>
                  </td>
                  <td>
                    <span className="sn">Not published</span>
                  </td>
                  <td>
                    <span className="sn">Not published</span>
                  </td>
                  <td>
                    <span className="sp">High</span>
                  </td>
                </tr>
                <tr>
                  <td>Open Source</td>
                  <td className="col-b-c">
                    <span className="sy">Yes</span>
                  </td>
                  <td>
                    <span className="sy">Yes</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                  <td>
                    <span className="sp">Partial</span>
                  </td>
                  <td>
                    <span className="sp">Partial</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                </tr>
                <tr>
                  <td>Zero Markup</td>
                  <td className="col-b-c">
                    <span className="sy">Yes</span>
                  </td>
                  <td>
                    <span className="sy">Yes</span>
                  </td>
                  <td>
                    <span className="sy">Yes</span>
                  </td>
                  <td>
                    <span className="sy">Yes</span>
                  </td>
                  <td>
                    <span className="sp">Custom</span>
                  </td>
                  <td>
                    <span className="sn">5%</span>
                  </td>
                </tr>

                {/* Routing & Reliability */}
                <tr className="row-cat">
                  <td colSpan={7}>Routing &amp; Reliability</td>
                </tr>
                <tr>
                  <td>Auto Failover</td>
                  <td className="col-b-c">
                    <span className="sy">Yes</span>
                  </td>
                  <td>
                    <span className="sy">Yes</span>
                  </td>
                  <td>
                    <span className="sy">Yes</span>
                  </td>
                  <td>
                    <span className="sy">Yes</span>
                  </td>
                  <td>
                    <span className="sy">Yes</span>
                  </td>
                  <td>
                    <span className="sy">Yes</span>
                  </td>
                </tr>
                <tr>
                  <td>Adaptive Load Balancing</td>
                  <td className="col-b-c">
                    <span className="sy">Yes</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                  <td>
                    <span className="sp">Health-aware</span>
                  </td>
                  <td>
                    <span className="sp">Basic</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                </tr>
                <tr>
                  <td>P2P Clustering</td>
                  <td className="col-b-c">
                    <span className="sy">Yes</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                </tr>
                <tr>
                  <td>Semantic Caching</td>
                  <td className="col-b-c">
                    <span className="sy">Yes</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                  <td>
                    <span className="sy">Yes</span>
                  </td>
                  <td>
                    <span className="sy">Yes</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                </tr>
                <tr>
                  <td>MCP Support</td>
                  <td className="col-b-c">
                    <span className="sy">Yes</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                  <td>
                    <span className="sy">Yes</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                </tr>

                {/* Observability & Governance */}
                <tr className="row-cat">
                  <td colSpan={7}>Observability &amp; Governance</td>
                </tr>
                <tr>
                  <td>Built-in Observability</td>
                  <td className="col-b-c">
                    <span className="sy">Native</span>
                  </td>
                  <td>
                    <span className="sp">Via integrations</span>
                  </td>
                  <td>
                    <span className="sp">Basic</span>
                  </td>
                  <td>
                    <span className="sy">Native</span>
                  </td>
                  <td>
                    <span className="sp">Basic</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                </tr>
                <tr>
                  <td>Real-time Alerts</td>
                  <td className="col-b-c">
                    <span className="sy">Yes</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                  <td>
                    <span className="sp">Via plugins</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                </tr>
                <tr>
                  <td>Guardrails</td>
                  <td className="col-b-c">
                    <span className="sy">Yes</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                </tr>
                <tr>
                  <td>RBAC &amp; Governance</td>
                  <td className="col-b-c">
                    <span className="sy">Yes</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                  <td>
                    <span className="sy">Yes</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                </tr>
                <tr>
                  <td>SSO (SAML / OIDC)</td>
                  <td className="col-b-c">
                    <span className="sy">Yes</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                  <td>
                    <span className="sy">Yes</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                </tr>
                <tr>
                  <td>Budget Management</td>
                  <td className="col-b-c">
                    <span className="sy">Yes</span>
                  </td>
                  <td>
                    <span className="sy">Yes</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                </tr>
                <tr>
                  <td>Evaluation Integration</td>
                  <td className="col-b-c">
                    <span className="sy">Native (Maxim AI)</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                </tr>

                {/* Enterprise Deployment */}
                <tr className="row-cat">
                  <td colSpan={7}>Enterprise Deployment</td>
                </tr>
                <tr>
                  <td>VPC Deployment</td>
                  <td className="col-b-c">
                    <span className="sy">Yes</span>
                  </td>
                  <td>
                    <span className="sy">Yes</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                  <td>
                    <span className="sy">Yes</span>
                  </td>
                  <td>
                    <span className="sy">Yes</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                </tr>
                <tr>
                  <td>Multi-Cloud Support</td>
                  <td className="col-b-c">
                    <span className="sy">AWS, GCP, Azure, Cloudflare, Vercel</span>
                  </td>
                  <td>
                    <span className="sp">Self-managed</span>
                  </td>
                  <td>
                    <span className="sn">CF only</span>
                  </td>
                  <td>
                    <span className="sp">Self-managed</span>
                  </td>
                  <td>
                    <span className="sy">Multi-cloud</span>
                  </td>
                  <td>
                    <span className="sn">No</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Performance Comparison */}
      <section className="border-t border-gray-100 bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left: Content */}
            <div>
              <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
                [ PERFORMANCE ]
              </p>
              <h2 className="mb-6 text-2xl text-gray-900 md:text-3xl">Built for Speed at Scale</h2>
              <p className="mb-8 leading-relaxed text-gray-600">
                The technology stack underneath determines how a gateway handles concurrent requests
                and sustains low latency under load. Bifrost&apos;s Go-based architecture delivers
                predictable performance without interpreter overhead.
              </p>

              {/* Key metrics in a clean list */}
              <div className="space-y-4">
                {[
                  { metric: '~11µs', label: 'Latency overhead per request at peak load' },
                  { metric: '5,000 RPS', label: 'Sustained throughput on a single node' },
                  { metric: '50x faster', label: 'Than Python-based gateways at P95' },
                  {
                    metric: '99.99%',
                    label: 'Uptime enabled by automatic multi-provider failover',
                  },
                ].map((item) => (
                  <div key={item.metric} className="flex items-center gap-4">
                    <div className="w-24 flex-shrink-0">
                      <span className="text-lg font-bold text-[var(--accent-text)]">
                        {item.metric}
                      </span>
                    </div>
                    <div className="flex-1 text-sm text-gray-600">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Latency comparison cards */}
            <div className="space-y-3">
              <p className="mb-4 font-mono text-xs tracking-wider text-gray-500 uppercase">
                Latency Overhead Comparison (P95)
              </p>
              {[
                { name: 'Bifrost', latency: '~11µs', highlight: true, tag: 'Go' },
                { name: 'Cloudflare AI', latency: '10-50ms', highlight: false, tag: null },
                { name: 'LiteLLM', latency: '~8ms', highlight: false, tag: 'Python' },
                { name: 'OpenRouter', latency: '25-40ms', highlight: false, tag: null },
              ].map((platform) => (
                <div
                  key={platform.name}
                  className={`flex items-center justify-between rounded-lg border p-4 transition-all ${
                    platform.highlight
                      ? 'border-[var(--accent)] bg-[var(--accent-light)] shadow-sm'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-medium ${platform.highlight ? 'text-gray-900' : 'text-gray-700'}`}
                    >
                      {platform.name}
                    </span>
                    {platform.tag && (
                      <span
                        className={`rounded px-2 py-0.5 text-xs ${
                          platform.tag === 'Go'
                            ? 'bg-[var(--accent)] text-white'
                            : platform.tag === 'Rust'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {platform.tag}
                      </span>
                    )}
                  </div>
                  <span
                    className={`font-mono text-sm ${
                      platform.highlight
                        ? 'font-semibold text-[var(--accent-dark)]'
                        : 'text-gray-500'
                    }`}
                  >
                    {platform.latency}
                  </span>
                </div>
              ))}
              <p className="mt-4 text-xs text-gray-400">
                Based on published benchmarks from each platform&apos;s documentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bifrost Feature Matrix */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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

      {/* Integrations */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ ECOSYSTEM ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">Bifrost Integrations</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Comprehensive integration capabilities across the AI development stack.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {integrations.map((integration) => (
              <div
                key={integration.title}
                className="relative rounded-lg border border-gray-200 bg-white p-6"
              >
                <div className="absolute top-3 left-3 h-2 w-2 border-t border-l border-[var(--accent)] opacity-40" />
                <div className="absolute top-3 right-3 h-2 w-2 border-t border-r border-[var(--accent)] opacity-40" />
                <div className="absolute bottom-3 left-3 h-2 w-2 border-b border-l border-[var(--accent)] opacity-40" />
                <div className="absolute right-3 bottom-3 h-2 w-2 border-r border-b border-[var(--accent)] opacity-40" />
                <div className="mb-4 flex items-center gap-3">
                  <integration.icon className="h-5 w-5 text-[var(--accent)]" />
                  <h3 className="text-gray-900">{integration.title}</h3>
                </div>
                <ul className="space-y-2">
                  {integration.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Drop-in Replacement */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <DropInReplacement />
        </div>
      </section>
    </div>
  )
}
