
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/Button'
import FeatureMatrix from '@/components/resources/FeatureMatrix'
import DropInReplacement from '@/components/resources/DropInReplacement'
import SetupSteps from '@/components/resources/SetupSteps'

import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Cpu,
  DollarSign,
  ExternalLink,
  Gauge,
  Globe,
  HardDrive,
  Lock,
  Monitor,
  RefreshCw,
  Server,
  Shield,
  XCircle,
  Zap,
} from 'lucide-react'
export const metadata: Metadata = {
    title: 'Bifrost — The High-Performance LiteLLM Alternative | LLM Gateway',
    description:
      'Bifrost is a production-grade LiteLLM alternative built in Go. 50x faster, zero-config deployment, native observability, and 100% success rate at 5,000 RPS.',
    alternates: {
      canonical: 'https://www.getmaxim.ai/bifrost/alternatives/litellm-alternatives',
    },
  }

  const performanceMetrics = [
    { label: 'Faster Throughput', value: '9.5x', description: 'More requests processed per second' },
    { label: 'Lower P99 Latency', value: '54x', description: 'Consistently fast response times' },
    { label: 'Less Memory', value: '68%', description: 'More efficient resource usage' },
    { label: 'Less Overhead', value: '40x', description: 'Minimal gateway processing time' },
  ]

  const litellmLimitations = [
    {
      icon: Lock,
      title: 'Python GIL bottleneck',
      description:
        "Python's Global Interpreter Lock limits true parallelism, creating concurrency bottlenecks under high load.",
    },
    {
      icon: RefreshCw,
      title: 'Async Overhead',
      description:
        "Python's asyncio adds overhead in context switching and event loop management, especially with thousands of concurrent requests.",
    },
    {
      icon: HardDrive,
      title: 'Database Dependency',
      description:
        " Requires PostgreSQL and Redis for production deployments, adding operational complexity.",
    },
    {
      icon: Server,
      title: 'Limited Enterprise Governance',
      description:
        'No native RBAC, workspaces, audit logs, or granular budget controls out of the box.',
    },

  ]
  
  const litellmStrengths = [
    {
      icon: Zap,
      title: 'Unified Provider Access',
      description:
        "Single API for multiple LLM providers with OpenAI-compatible interface, enabling fast model switching during experimentation.",
    },
    {
      icon: Gauge,
      title: 'Self-hosted and open source',
      description:
        'Full control over deployment, networking, and data flow under MIT license.',
    },
    {
      icon: HardDrive,
      title: 'Broad provider catalog',
      description:
        'Supports 100+ LLM APIs across major and niche providers.',
    },
    {
      icon: Cpu,
      title: 'Strong community',
      description:
        'Widely used and discussed across developer communities with active open-source contributions.',
    },
  ]

  const whyMigrate = [
    {
      icon: Zap,
      title: 'Performance at Scale',
      description:
        "Python’s architectural limits (GIL and async overhead) can lead to latency spikes exceeding 4 minutes at high concurrency ($500+$ RPS), which compounds in multi-step agent workflows.",
    },
    {
      icon: Shield,
      title: 'Self-Managed Infrastructure',
      description:
        'Managing the community edition requires teams to handle their own uptime, security patches, database maintenance (PostgreSQL/Redis), and incident response without an SLA.',
    },
    {
      icon: DollarSign,
      title: 'Basic Observability',
      description:
        'Built-in visibility for token analytics and cost attribution is limited, forcing teams to integrate complex external monitoring tools.',
    },
    {
      icon: Lock,
      title: 'Limited Governance',
      description:
        'The lack of native support for virtual keys, hierarchical access, SSO/SCIM, or audit logs requires significant engineering effort to build custom governance layers.',
    },
    {
      icon: BarChart3,
      title: 'No Native MCP Support',
      description:
        "As AI agents become standard, the absence of native Model Context Protocol (MCP) governance restricts agentic tool orchestration.",
    },
    {
      icon: RefreshCw,
      title: 'No Guardrails',
      description:
        "Without built-in guardrails for content moderation or PII redaction, teams must implement separate safety controls, risking compliance gaps in regulated industries.",
    },
  ]

  interface ComparisonRow {
    feature: string
    bifrost: string | null
    litellm: string | null
    bifrostCheck?: boolean
    litellmCheck?: boolean
  }
  
  const featureComparison: { title: string; rows: ComparisonRow[] }[] = [
    {
      title: 'Performance',
      rows: [
        {
          feature: 'Overhead at 500 RPS',
          bifrost: '11µs (Go-native)',
          litellm: '40ms (Python GIL)',
        },
        
        {
          feature: 'Concurrent Request Handling',
          bifrost: 'Native Go concurrency',
          litellm: 'Async overhead',
        },
      ],
    },
    {
      title: 'Reliability',
      rows: [
        
        {
          feature: 'Automatic Failover',
          bifrost: 'Zero-config',
          litellm: 'Manual config',
        
        },
        {
          feature: 'Circuit Breakers',
          bifrost: 'Available',
          litellm: 'N/A',
        
        },
  
        { feature: 'Health Monitoring', bifrost: 'Real-time', litellm: 'Basic' },
      ],
    },
    {
      title: 'Governance & Security',
      rows: [
        {
          feature: 'Virtual Keys',
          bifrost: 'With budgets & rate limits',
          litellm: 'Available',
        
        },
        {
          feature: 'RBAC',
          bifrost: 'Fine-grained access management',
          litellm: 'Available',
      
        },
        {
          feature: 'Audit Logs',
          bifrost: 'Available',
          litellm: 'Available',
        
        },
        {
          feature: 'Guardrails',
          bifrost: 'Available',
          litellm: 'Available',
      
        },
        {
          feature: 'In-VPC Deployment',
          bifrost: 'Available',
          litellm: 'Available',
         
        },
      ],
    },
    {
      title: 'Observability',
      rows: [
        {
          feature: 'Prometheus Metrics',
          bifrost: 'Native, no sidecars',
          litellm: 'Via callbacks',
      
        },
        {
          feature: 'OpenTelemetry',
          bifrost: 'OTel compatible',
          litellm: 'OTel compatible',
        
        },
        {
          feature: 'Request Logging',
          bifrost: 'Multiple backends',
          litellm: 'Multiple backends',
        
        },
      ],
    },
    {
      title: 'Developer Experience',
      rows: [
        {
          feature: 'Setup Time',
          bifrost: '30 seconds (NPX or Docker)',
          litellm: '5-10 minute setup',
        },
        {
          feature: 'Web UI',
          bifrost: 'Real-time config',
          litellm: 'Admin panel available',
    
        },
        { feature: 'Configuration', bifrost: 'Web UI, API, or file-based', litellm: 'Web UI, API, or file-based' },
        {
          feature: 'MCP Support',
          bifrost: 'Native gateway',
          litellm: 'Beta integration',
        
        },
        {
          feature: 'Deployment Asset',
          bifrost: 'Single binary, Docker, K8s',
          litellm: 'Python package, Docker',
          
        },
        {
          feature: 'Docker Size',
          bifrost: '80 MB',
          litellm: '> 700 MB',
        },
      ],
    },
    {
      title: 'Architecture',
      rows: [
        { feature: 'Language', bifrost: 'Go', litellm: 'Python' },
  
        {
          feature: 'Clustering',
          bifrost: 'Available',
          litellm: 'N/A',
         
        },
        {
          feature: 'Adaptive load Balancing',
          bifrost: 'Dynamic weight adjustment',
          litellm: 'N/A',
        
        },
        {
          feature: 'Usage-Based Routing Rules',
          bifrost: 'Yes',
          litellm: 'N/A',
        
        },
        {
          feature: 'Plugin System',
          bifrost: 'Go-based',
          litellm: 'Python callbacks',
        
        },
        { feature: 'License', bifrost: 'Apache 2.0', litellm: 'MIT' },
      ],
    },
  ]

  const setupSteps = [
    {
      step: '01',
      title: 'Install Bifrost',
      description: 'One command. No configuration files, no Redis, no databases required.',
      code: `# Option 1: NPX (fastest)
  npx -y @maximhq/bifrost
  # Option 2: Docker
  docker run -p 8080:8080 maximhq/bifrost
  # Option 3: Go SDK
  go get github.com/maximhq/bifrost/core@latest`,
    },
    {
      step: '02',
      title: 'Configure via Web UI',
      description:
        'Add provider keys, configure models, set up fallback chains, all from the browser.',
      code: `# open the dashboard
  open http://localhost:8080
  # add API keys for providers
  # configure models and weights
  # set up fallback chains`,
    },
    {
      step: '03',
      title: 'Update your endpoint',
      description: 'Change the base URL in your code. Everything else stays the same.',
      code: `# just update the base URL
  # before: http://localhost:4000
  # after:  http://localhost:8080
  curl http://localhost:8080/v1/chat/completions \\
    -H "Content-Type: application/json" \\
    -d '{"model":"openai/gpt-4o-mini","messages":[{"role":"user","content":"Hello!"}]}'`,
    },
  ]
  
  const chooseBifrost = [
    'You need high-throughput performance at 1,000+ RPS with minimal latency overhead',
    'You want zero-configuration deployment, start in seconds, no Redis or databases',
    'You value operational simplicity, single binary, no external dependencies',
    'Every millisecond of latency and every MB of memory matters for your infrastructure costs',
    'You need built-in observability, native Prometheus, OpenTelemetry, and web UI',
    'You want complete control, self-hosted, Apache 2.0, full source code access',
  ]

  const chooseLitellm = [
    'You need 100+ provider integrations out of the box',
    'Your entire stack is Python and you have deep Python expertise',
    'You have heavily customized LiteLLM configurations and need time to migrate',
    'You prefer extending functionality using Python callbacks and integrations',
  ]
  
  const summaryTable = [
    {
      factor: 'Best For',
      bifrost: 'High-throughput production systems',
      litellm: 'Multi-provider abstraction, Python teams',
    },
    { factor: 'Performance', bifrost: '11µs', litellm: '40ms' },
    { factor: 'Setup Time', bifrost: '<30 seconds', litellm: '2-10 minutes' },
    { factor: 'Dependencies', bifrost: 'Zero', litellm: 'Redis recommended' },
    {
      factor: 'Deployment Asset',
      bifrost: 'Single binary, Docker, npx',
      litellm: 'Python package, Docker',
    },
    { factor: 'Configuration', bifrost: 'Web UI, API, files', litellm: 'Files, env variables' },
    {
      factor: 'Observability',
      bifrost: 'Native Prometheus, built-in UI',
      litellm: 'Via integrations',
    },
    { factor: 'Cost', bifrost: 'Free (Apache 2.0)', litellm: 'Free (MIT)' },
    { factor: 'Providers', bifrost: '20+ providers, 1000+ models', litellm: '100+ LLM APIs' },
  ]
  
  function tableCellStyle(
    value: string | null,
    hasCheck: boolean | undefined,
    isLiteLLM: boolean
  ): 'sy' | 'sn' | 'sp' | 'sv' {
    if (value === null || value === '') return 'sn'
    const v = value.toLowerCase().trim()
    if (v === 'n/a') return 'sn'
    if (hasCheck === false && isLiteLLM) return 'sn'
    if (/\d+(\.\d+)?(µs|ms|s|%| rps)/i.test(value) || v.includes('99.999') || v.includes('1.68')) return 'sv'
    const partialPhrases = [
      'community-maintained',
      'manual config',
      'via callbacks',
      'basic',
      'self-hosted',
      'available',
      'load balancer needed',
      'admin panel available',
      'yaml config',
      'beta integration',
      'python package',
      'python callbacks',
      'multiple backends',
      'unpredictable',
      'async overhead',
    ]
    if (partialPhrases.some((s) => v.includes(s))) return 'sp'
    return 'sy'
  }
  
  /** LiteLLM values that should be shown in orange (e.g. 40ms/GIL, 5-10 min setup, > 700 MB) */
  function isLitellmOrangeValue(val: string | null): boolean {
    if (!val) return false
    const v = val.toLowerCase()
    return (
      />\s*\d+\s*mb/.test(v) ||
      (v.includes('40ms') && v.includes('gil')) ||
      /5-10\s*(minute|min)/.test(v)
    )
  }

  export default function LitellmAlternativesPage() {
    return (
      <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="text-center">
            <span className="font-mono text-[12px] leading-[15px] font-medium tracking-[0.04em] text-emerald-500 uppercase">
              [&ensp;LITELLM ALTERNATIVES&ensp;]
            </span>
            <h1 className="mt-2 mb-4 text-center text-4xl leading-[1.2] font-normal tracking-tight text-gray-900 md:text-5xl">
              Top LiteLLM Alternatives
              <br />
              <span className="text-[var(--accent-text)]">for Production Enterprise AI Applications</span>
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-sm leading-relaxed text-gray-500 md:text-base">
            As AI applications scale to production, LiteLLM can
             introduce performance bottlenecks, infrastructure overhead, and governance gaps. 
             This page compares the top alternatives, covering performance benchmarks, 
             observability, governance, pricing, and deployment options to help you choose 
             the right LLM gateway for your stack.
            </p>
            <div className="flex w-full flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
              <Link
                href="https://github.com/maximhq/bifrost"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg">
                  Compare Platforms
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="https://docs.getbifrost.ai" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg">
                  View documentation
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="w-full">
          <p className="mb-4 text-center font-mono text-[10px] tracking-widest text-gray-400 uppercase">
            [ BIFROST PERFORMANCE AT A GLANCE ]
          </p>
          <div className="border-y border-gray-200">
            <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-2 divide-y md:grid-cols-6 md:divide-y-0">
                <div className="hidden border-r border-gray-200 md:col-span-1 md:block" />
                {performanceMetrics.map((item) => (
                  <div
                    key={item.label}
                    className="border-r border-gray-200 px-4 py-5 text-center last:border-r-0"
                  >
                    <div className="mb-1 font-mono text-xl leading-none text-[var(--accent-text)] md:text-2xl">
                      {item.value}
                    </div>
                    <div className="mb-1 font-mono text-[10px] font-medium tracking-wider text-gray-500 uppercase">
                      {item.label}
                    </div>
                    <div className="text-[11px] text-gray-400">{item.description}</div>
                  </div>
                ))}
                <div className="hidden border-gray-200 md:col-span-1 md:block" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
      <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
        [ LITELLM GATEWAY OVERVIEW ]
      </p>

      <h2 className="mb-6 text-2xl text-gray-900 md:text-3xl">
        What is LiteLLM?
      </h2>

      <p className="leading-relaxed text-gray-600">
        LiteLLM is an open-source, Python-based LLM proxy that provides a unified OpenAI-compatible
        API for routing requests across multiple LLM providers. It has been widely adopted as a
        lightweight gateway for teams getting started with multi-provider LLM integration.
      </p>
    </div>

    {/* Bottom row: Python vs Go */}
    <div className="mt-14 grid gap-8 md:grid-cols-2 py-10 ">
        {/* Go Advantages */}
      <div>
        <p className="mb-4 font-mono text-xs tracking-widest text-[var(--accent-text)] uppercase">
         Strengths of LiteLLM
        </p>
        <div className="space-y-4">
          {litellmStrengths.map((item) => (
            <div key={item.title} className="relative border border-gray-200 bg-white p-5 ">
              <div className="absolute top-3 left-3 h-2 w-2 border-t border-l border-[var(--accent)] opacity-40" />
              <div className="absolute top-3 right-3 h-2 w-2 border-t border-r border-[var(--accent)] opacity-40" />
              <div className="absolute bottom-3 left-3 h-2 w-2 border-b border-l border-[var(--accent)] opacity-40" />
              <div className="absolute right-3 bottom-3 h-2 w-2 border-r border-b border-[var(--accent)] opacity-40" />
              <div className="mb-2 flex items-center gap-3">
                <item.icon className="h-4 w-4 text-[var(--accent-text)]" />
                <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
              </div>
              <p className="text-xs leading-relaxed text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Python Challenges */}
      <div>
        <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
          Limitations of LiteLLM
        </p>
        <div className="space-y-4">
          {litellmLimitations.map((item) => (
            <div key={item.title} className="relative border border-gray-200 bg-white p-5 ">
              <div className="absolute top-3 left-3 h-2 w-2 border-t border-l border-gray-300 opacity-40" />
              <div className="absolute top-3 right-3 h-2 w-2 border-t border-r border-gray-300 opacity-40" />
              <div className="absolute bottom-3 left-3 h-2 w-2 border-b border-l border-gray-300 opacity-40" />
              <div className="absolute right-3 bottom-3 h-2 w-2 border-r border-b border-gray-300 opacity-40" />
              <div className="mb-2 flex items-center gap-3">
                <item.icon className="h-4 w-4 text-gray-400" />
                <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
              </div>
              <p className="text-xs leading-relaxed text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>
</section>

<section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ PRODUCTION CHALLENGES ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">Why Teams Look for LiteLLM Alternatives?</h2>
            <p className="mx-auto max-w-3xl text-gray-600">
            LiteLLM works well for prototyping and experimentation. But as AI usage scales into production, teams consistently encounter gaps that compound over time.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyMigrate.map((item) => (
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
                    <span className="arch-tag">Python</span>
                  </td>
                  <td>
                    <span className="arch-tag nd">N/A</span>
                  </td>
                  <td>
                    <span className="arch-tag">Typescript</span>
                  </td>
                  <td>
                    <span className="arch-tag">Lua</span>
                  </td>
                  <td>
                    <span className="arch-tag">Typescript</span>
                  </td>
                </tr>
                <tr>
                  <td>Latency Overhead</td>
                  <td className="col-b-c">
                    <span className="sv">&lt;~11µs</span>
                  </td>
                  <td>
                    <span className="sv">~40ms</span>
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

      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ FEATURE COMPARISON ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
              Feature-By-Feature Comparison
            </h2>
          </div>
          <div className="mt-container">
            <table className="mt">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th className="col-b">Bifrost</th>
                  <th>LiteLLM</th>
                </tr>
              </thead>
              <tbody>
                {featureComparison.map((section) => (
                  <React.Fragment key={section.title}>
                    <tr className="row-cat">
                      <td colSpan={3}>{section.title}</td>
                    </tr>
                    {section.rows.map((row) => {
                      const isLanguage = row.feature === 'Language'
                      const bifrostVal = row.bifrost ?? '—'
                      const litellmVal = row.litellm ?? '—'
                      const litellmClass = tableCellStyle(row.litellm, row.litellmCheck, true)
                      const isAvailable =
                        (row.litellm ?? '').toLowerCase().trim() === 'available'
                      const litellmDisplayClass = isAvailable
                        ? 'sy'
                        : isLitellmOrangeValue(row.litellm)
                          ? 'sp'
                          : litellmClass
                      return (
                        <tr key={`${section.title}-${row.feature}`}>
                          <td>{row.feature}</td>
                          <td className="col-b-c">
                            {isLanguage ? (
                              <span className="arch-tag">{bifrostVal}</span>
                            ) : (
                              <span className="sy">{bifrostVal}</span>
                            )}
                          </td>
                          <td>
                            {isLanguage ? (
                              <span className="arch-tag py">{litellmVal}</span>
                            ) : (
                              <span className={litellmDisplayClass}>{litellmVal}</span>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ QUICK START ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">Get Started in Three Steps</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              No configuration files, no Redis, no external databases. Just install and go.
            </p>
          </div>
          <SetupSteps steps={setupSteps} />
        </div>
      </section>

      {/* When to Choose */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ DECISION GUIDE ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">When to Choose What</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="border-2 border-[var(--accent-border)] bg-white">
              <div className="border-b border-[var(--accent-border)] bg-[var(--accent)]/5 px-6 py-4">
                <h3 className="text-sm font-medium tracking-wider text-[var(--accent-text)] uppercase">
                  Choose Bifrost when
                </h3>
              </div>
              <ul className="divide-y divide-gray-200">
                {chooseBifrost.map((reason) => (
                  <li key={reason} className="flex items-start gap-3 px-6 py-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--accent-text)]" />
                    <span className="text-sm text-gray-700">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative border border-gray-200 bg-white">
              <div className="absolute top-3 left-3 h-2 w-2 border-t border-l border-gray-300 opacity-40" />
              <div className="absolute top-3 right-3 h-2 w-2 border-t border-r border-gray-300 opacity-40" />
              <div className="absolute bottom-3 left-3 h-2 w-2 border-b border-l border-gray-300 opacity-40" />
              <div className="absolute right-3 bottom-3 h-2 w-2 border-r border-b border-gray-300 opacity-40" />
              <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                <h3 className="text-sm font-medium tracking-wider text-gray-600 uppercase">
                  LiteLLM might be better when
                </h3>
              </div>
              <ul className="divide-y divide-gray-200">
                {chooseLitellm.map((reason) => (
                  <li key={reason} className="flex items-start gap-3 px-6 py-3">
                    <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center text-xs text-gray-400">
                      •
                    </span>
                    <span className="text-sm text-gray-600">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Summary Table */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ COMPARISON SUMMARY ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">At a Glance</h2>
          </div>
          <div className="overflow-hidden border border-gray-200 bg-white">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Factor
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-[var(--accent-text)] uppercase">
                    Bifrost
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    LiteLLM
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {summaryTable.map((row) => (
                  <tr key={row.factor} className="transition-colors hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-600">{row.factor}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.bifrost}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{row.litellm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
            Ready to Upgrade Your LLM Infrastructure?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-600">
            100% open source under Apache 2.0. Free forever. No vendor lock-in. Get started in under
            30 seconds.
          </p>
          <div className="mb-12 flex w-full flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
            <Link
              href="https://github.com/maximhq/bifrost"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg">
                Get started on GitHub
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="https://docs.getbifrost.ai" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg">
                Read the docs
                <ExternalLink className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Documentation', href: 'https://docs.getbifrost.ai' },
              { label: 'GitHub', href: 'https://github.com/maximhq/bifrost' },
              { label: 'Migration Guide', href: '/resources/migrating-from-litellm' },
              { label: 'Book a Demo', href: 'https://www.getmaxim.ai/bifrost/book-a-demo' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.href.startsWith('http')
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="relative flex items-center justify-center gap-2 border border-gray-200 bg-white p-4 text-sm text-gray-700 transition-all hover:border-[var(--accent-border)] hover:text-[var(--accent-text)]"
              >
                <div className="absolute top-2 left-2 h-1.5 w-1.5 border-t border-l border-[var(--accent)] opacity-40" />
                <div className="absolute top-2 right-2 h-1.5 w-1.5 border-t border-r border-[var(--accent)] opacity-40" />
                <div className="absolute bottom-2 left-2 h-1.5 w-1.5 border-b border-l border-[var(--accent)] opacity-40" />
                <div className="absolute right-2 bottom-2 h-1.5 w-1.5 border-r border-b border-[var(--accent)] opacity-40" />
                {link.label}
                {link.href.startsWith('http') && <ExternalLink className="h-3 w-3" />}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ BIFROST FEATURES ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
              Open Source &amp; Enterprise
            </h2>
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
    );
  } 