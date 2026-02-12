import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import FeatureMatrix from '@/components/resources/FeatureMatrix'
import DropInReplacement from '@/components/resources/DropInReplacement'
import SetupSteps from '@/components/resources/SetupSteps'
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Cpu,
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
    canonical: 'https://www.getmaxim.ai/bifrost/bifrost-resources/litellm-alternative',
  },
}

const performanceMetrics = [
  { label: 'Gateway Overhead', value: '11µs', description: 'At 5,000 RPS sustained' },
  { label: 'Success Rate', value: '100%', description: 'Even under extreme load' },
  { label: 'Setup Time', value: '<30s', description: 'NPX or Docker, zero config' },
  { label: 'Providers', value: '20+', description: '1000+ models supported' },
]

const challengeTable = [
  {
    challenge: 'High latency at scale',
    why: 'Built in Go with native concurrency for high-throughput workloads',
  },
  {
    challenge: 'Infrastructure bottlenecks',
    why: 'Connection pooling and zero runtime allocation, no Python GIL limitations',
  },
  {
    challenge: 'Memory consumption',
    why: "Efficient memory management with Go's lightweight goroutines",
  },
  {
    challenge: 'Complex self-hosting',
    why: 'Zero-configuration deployment via npx or Docker, no Redis/Postgres required',
  },
  {
    challenge: 'Limited observability',
    why: 'Native Prometheus metrics and OpenTelemetry built-in, not bolted on',
  },
  {
    challenge: 'Production reliability',
    why: '100% success rate at 5,000 RPS with <11µs overhead',
  },
]

const pythonChallenges = [
  {
    icon: Lock,
    title: 'Global Interpreter Lock',
    description:
      "Python's GIL prevents true parallelism, forcing the interpreter to execute one thread at a time. Under high concurrency, this creates a bottleneck.",
  },
  {
    icon: RefreshCw,
    title: 'Async Overhead',
    description:
      "Python's asyncio adds overhead in context switching and event loop management, especially with thousands of concurrent requests.",
  },
  {
    icon: HardDrive,
    title: 'Memory Management',
    description:
      "Python's dynamic typing and garbage collection consume more memory and can introduce latency spikes.",
  },
  {
    icon: Server,
    title: 'External Dependencies',
    description:
      'Production Python deployments often require Redis for caching and rate limiting, adding operational complexity.',
  },
]

const goAdvantages = [
  {
    icon: Zap,
    title: 'Native Concurrency',
    description:
      "Go's goroutines enable handling thousands of concurrent requests with minimal memory overhead. No GIL, no bottlenecks.",
  },
  {
    icon: Gauge,
    title: 'Compiled Performance',
    description:
      'As a compiled language, Go eliminates interpretation overhead and provides predictable, low-latency execution.',
  },
  {
    icon: HardDrive,
    title: 'Memory Efficiency',
    description:
      'Connection pooling with efficient memory reuse and lightweight goroutines reduce RAM consumption.',
  },
  {
    icon: Cpu,
    title: 'Built-in State Management',
    description:
      'Bifrost handles configuration, logging, and state management internally without requiring external databases.',
  },
]

interface ComparisonRow {
  feature: string
  bifrost: string
  litellm: string
  bifrostCheck?: boolean
  litellmCheck?: boolean
  litellmWarn?: boolean
  litellmNone?: boolean
}

const featureComparisonSections: { title: string; rows: ComparisonRow[] }[] = [
  {
    title: 'Core Gateway',
    rows: [
      {
        feature: 'Provider Support',
        bifrost: '20+ providers, 1000+ models',
        litellm: '100+ LLM APIs',
      },
      {
        feature: 'OpenAI-Compatible API',
        bifrost: 'Yes',
        litellm: 'Yes',
        bifrostCheck: true,
        litellmCheck: true,
      },
      {
        feature: 'Automatic Failover',
        bifrost: 'Adaptive load balancing',
        litellm: 'Retry logic',
        bifrostCheck: true,
        litellmCheck: true,
      },
      {
        feature: 'Semantic Caching',
        bifrost: 'Built-in',
        litellm: 'Via external integration',
        bifrostCheck: true,
        litellmWarn: true,
      },
      {
        feature: 'Zero Configuration',
        bifrost: 'Works out of box',
        litellm: 'Requires config file',
        bifrostCheck: true,
        litellmWarn: true,
      },
      {
        feature: 'Web UI',
        bifrost: 'Built-in dashboard',
        litellm: 'Not included',
        bifrostCheck: true,
        litellmNone: true,
      },
      { feature: 'Deployment Time', bifrost: '<30 seconds', litellm: '2-10 minutes' },
    ],
  },
  {
    title: 'Performance & Scalability',
    rows: [
      { feature: 'Language', bifrost: 'Go (compiled)', litellm: 'Python (interpreted)' },
      { feature: 'Gateway Overhead', bifrost: '1.68s P99 at 500 RPS', litellm: '90.72s P99 at 500 RPS' },
      {
        feature: 'Concurrency Model',
        bifrost: 'Native goroutines',
        litellm: 'Async/await with GIL',
      },
      {
        feature: 'Connection Pooling',
        bifrost: 'Native',
        litellm: 'Via configuration',
        bifrostCheck: true,
        litellmWarn: true,
      },
      { feature: 'External Dependencies', bifrost: 'Zero', litellm: 'Redis recommended' },
    ],
  },
  {
    title: 'Observability & Monitoring',
    rows: [
      {
        feature: 'Prometheus Metrics',
        bifrost: 'Native, no setup',
        litellm: 'Available',
        bifrostCheck: true,
        litellmCheck: true,
      },
      {
        feature: 'OpenTelemetry',
        bifrost: 'Built-in',
        litellm: 'Via integration',
        bifrostCheck: true,
        litellmCheck: true,
      },
      {
        feature: 'Distributed Tracing',
        bifrost: 'Native',
        litellm: 'Via integration',
        bifrostCheck: true,
        litellmCheck: true,
      },
      {
        feature: 'Request Logging',
        bifrost: 'Built-in SQLite',
        litellm: 'Via configuration',
        bifrostCheck: true,
        litellmWarn: true,
      },
      {
        feature: 'Real-time Analytics',
        bifrost: 'Web UI dashboard',
        litellm: 'External tools required',
        bifrostCheck: true,
        litellmNone: true,
      },
    ],
  },
  {
    title: 'Governance & Control',
    rows: [
      {
        feature: 'Budget Management',
        bifrost: 'Virtual keys with limits',
        litellm: 'Team/user budgets',
        bifrostCheck: true,
        litellmCheck: true,
      },
      {
        feature: 'Rate Limiting',
        bifrost: 'Per-key, per-model',
        litellm: 'Global and per-user',
        bifrostCheck: true,
        litellmCheck: true,
      },
      {
        feature: 'Access Control',
        bifrost: 'Model-specific keys',
        litellm: 'RBAC available',
        bifrostCheck: true,
        litellmCheck: true,
      },
      {
        feature: 'Cost Tracking',
        bifrost: 'Real-time per request',
        litellm: 'Available',
        bifrostCheck: true,
        litellmCheck: true,
      },
      {
        feature: 'SSO Integration',
        bifrost: 'Google, GitHub',
        litellm: 'Available',
        bifrostCheck: true,
        litellmCheck: true,
      },
      {
        feature: 'Audit Logs',
        bifrost: 'Built-in',
        litellm: 'Available',
        bifrostCheck: true,
        litellmCheck: true,
      },
    ],
  },
  {
    title: 'Developer Experience',
    rows: [
      { feature: 'Setup Complexity', bifrost: 'Single command', litellm: 'Install + config' },
      {
        feature: 'Configuration',
        bifrost: 'Web UI, API, or files',
        litellm: 'Files or env variables',
      },
      {
        feature: 'Hot Reload',
        bifrost: 'No restart needed',
        litellm: 'Requires restart',
        bifrostCheck: true,
        litellmWarn: true,
      },
      {
        feature: 'Plugin System',
        bifrost: 'Go-based plugins',
        litellm: 'Python callbacks',
        bifrostCheck: true,
        litellmCheck: true,
      },
      { feature: 'License', bifrost: 'Apache 2.0', litellm: 'MIT' },
    ],
  },
]

const benchmarkBifrost = [
  {
    instance: 't3.xlarge',
    specs: '4 vCPU, 16GB RAM',
    metrics: [
      { label: 'Success Rate', value: '100%' },
      { label: 'Gateway Overhead', value: '11µs' },
      { label: 'Queue Wait Time', value: '1.67µs' },
    ],
  },
  {
    instance: 't3.medium',
    specs: '2 vCPU, 4GB RAM',
    metrics: [
      { label: 'Success Rate', value: '100%' },
      { label: 'Gateway Overhead', value: '59µs' },
      { label: 'Queue Wait Time', value: '47µs' },
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
  { factor: 'Performance', bifrost: '1.68s P99 overhead at 500 RPS', litellm: '90.72s P99 at 500 RPS' },
  { factor: 'Setup Time', bifrost: '<30 seconds', litellm: '2-10 minutes' },
  { factor: 'Dependencies', bifrost: 'Zero', litellm: 'Redis recommended' },
  {
    factor: 'Deployment',
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

function CellIcon({ check, warn, none }: { check?: boolean; warn?: boolean; none?: boolean }) {
  if (check) return <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 text-[var(--accent-text)]" />
  if (warn) return <span className="flex-shrink-0 text-xs text-amber-400">⚠️</span>
  if (none) return <XCircle className="h-3.5 w-3.5 flex-shrink-0 text-gray-300" />
  return null
}

export default function LiteLLMAlternativePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="text-center">
            <span className="provider-badge">[ LITELLM ALTERNATIVE ]</span>
            <h1 className="mb-4 text-center text-4xl leading-[1.2] font-normal tracking-tight text-gray-900 md:text-5xl">
              The High-Performance
              <br />
              <span className="text-[var(--accent-text)]">LiteLLM Alternative</span>
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-sm leading-relaxed text-gray-500 md:text-base">
              Bifrost is an open-source LLM gateway built in Go that delivers production-grade
              reliability with &lt;11µs overhead at 5,000 RPS. If you&apos;re evaluating LiteLLM or
              experiencing performance bottlenecks at scale, Bifrost is a drop-in alternative
              designed for serious GenAI workloads.
            </p>
            <div className="flex w-full flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
              <Link
                href="https://github.com/maximhq/bifrost"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg">
                  Get started in 30 seconds
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

      {/* Metrics */}
      <section className="py-10">
        <div className="w-full">
          <p className="mb-4 text-center font-mono text-[10px] tracking-widest text-gray-400 uppercase">
            [ PERFORMANCE AT A GLANCE ]
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

      {/* Why Teams Choose Bifrost */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ WHY BIFROST ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
              Why Teams Choose Bifrost Over LiteLLM
            </h2>
          </div>
          <div className="overflow-hidden border border-gray-200 bg-white">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Your Challenge
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-[var(--accent-text)] uppercase">
                    Why Bifrost
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {challengeTable.map((row) => (
                  <tr key={row.challenge} className="transition-colors hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-600">{row.challenge}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      <span className="inline-flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[var(--accent-text)]" />
                        {row.why}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Performance Benchmarks */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ PERFORMANCE BENCHMARKS ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
              Bifrost Performance at 5,000 RPS
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Benchmarked on production infrastructure under sustained load. Perfect reliability
              with sub-11µs overhead.
            </p>
          </div>
          <div className="mb-8 grid gap-6 md:grid-cols-2">
            {benchmarkBifrost.map((bench) => (
              <div key={bench.instance} className="relative border border-gray-200 bg-white p-6">
                <div className="absolute top-3 left-3 h-2 w-2 border-t border-l border-[var(--accent)] opacity-40" />
                <div className="absolute top-3 right-3 h-2 w-2 border-t border-r border-[var(--accent)] opacity-40" />
                <div className="absolute bottom-3 left-3 h-2 w-2 border-b border-l border-[var(--accent)] opacity-40" />
                <div className="absolute right-3 bottom-3 h-2 w-2 border-r border-b border-[var(--accent)] opacity-40" />
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center bg-[var(--accent)]/10 text-[var(--accent-text)]">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-900">{bench.instance}</h4>
                    <p className="text-xs text-gray-500">{bench.specs}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {bench.metrics.map((m) => (
                    <div key={m.label} className="border-l-2 border-[var(--accent)] pl-3">
                      <div className="text-lg font-bold text-gray-900">{m.value}</div>
                      <div className="font-mono text-xs text-gray-500 uppercase">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/*<div className="border border-gray-200 bg-gray-50 p-4">
            <p className="text-xs leading-relaxed text-gray-500">
              <span className="font-medium text-gray-700">LiteLLM comparison:</span> LiteLLM reports
              P95 latency of 8ms at 1,000 RPS with recommended Redis configuration. LiteLLM
              recommends multiple instances with proper worker configuration for production
              deployments.
            </p>
          </div>*/}
        </div>
      </section>

      {/* Architecture: Go vs Python */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ ARCHITECTURE ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
              Why "Go" Beats "Python" for LLM Gateways
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {/* Python Challenges */}
            <div>
              <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
                The Python Challenge
              </p>
              <div className="space-y-4">
                {pythonChallenges.map((item) => (
                  <div key={item.title} className="relative border border-gray-200 bg-white p-5">
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
            {/* Go Advantages */}
            <div>
              <p className="mb-4 font-mono text-xs tracking-widest text-[var(--accent-text)] uppercase">
                Bifrost&apos;s Go Advantage
              </p>
              <div className="space-y-4">
                {goAdvantages.map((item) => (
                  <div key={item.title} className="relative border border-gray-200 bg-white p-5">
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
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ FEATURE COMPARISON ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
              Feature-By-Feature Comparison
            </h2>
          </div>
          <div className="space-y-6">
            {featureComparisonSections.map((section) => (
              <div key={section.title} className="overflow-hidden border border-gray-200 bg-white">
                <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
                  <h3 className="text-xs font-medium tracking-wider text-gray-900 uppercase">
                    {section.title}
                  </h3>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-2.5 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                        Feature
                      </th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium tracking-wider text-[var(--accent-text)] uppercase">
                        Bifrost
                      </th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                        LiteLLM
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {section.rows.map((row) => (
                      <tr key={row.feature} className="transition-colors hover:bg-gray-50">
                        <td className="px-4 py-2.5 text-sm text-gray-600">{row.feature}</td>
                        <td className="px-4 py-2.5 text-sm font-medium text-gray-900">
                          <span className="inline-flex items-center gap-1.5">
                            <CellIcon check={row.bifrostCheck} />
                            {row.bifrost}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-sm text-gray-500">
                          <span className="inline-flex items-center gap-1.5">
                            <CellIcon
                              check={row.litellmCheck}
                              warn={row.litellmWarn}
                              none={row.litellmNone}
                            />
                            {row.litellm}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ ENTERPRISE READY ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
              Built-in Governance and Observability
            </h2>
            <p className="mx-auto max-w-3xl text-gray-600">
              Everything you need for production AI infrastructure, without bolting on external
              tools.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Lock,
                title: 'Virtual keys with budgets',
                description:
                  'Create API keys with spending limits, model restrictions, and rate limits per team or use case.',
                tag: 'Cost control',
              },
              {
                icon: BarChart3,
                title: 'Native Prometheus metrics',
                description:
                  'Metrics automatically available at /metrics - requests, latency, provider health, memory usage.',
                tag: 'No sidecars',
              },
              {
                icon: Globe,
                title: 'OpenTelemetry tracing',
                description:
                  'Distributed tracing built-in. Point to your Jaeger or OTEL collector and traces flow automatically.',
                tag: 'Built-in',
              },
              {
                icon: Monitor,
                title: 'Real-time web dashboard',
                description:
                  'Monitor spend per key, per model, per team via the built-in web UI. No external tools required.',
                tag: 'Web UI',
              },
              {
                icon: RefreshCw,
                title: 'Adaptive load balancing',
                description:
                  'Automatically distributes load based on current success rates, latency patterns, and available capacity.',
                tag: 'Intelligent routing',
              },
              {
                icon: Shield,
                title: 'Automatic failover',
                description:
                  'If a provider fails, Bifrost transparently routes to configured backups. Zero downtime, zero manual intervention.',
                tag: 'High availability',
              },
            ].map((item) => (
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
                <p className="mb-4 text-sm leading-relaxed text-gray-600">{item.description}</p>
                <span className="inline-block bg-[var(--accent-light)] px-2 py-1 font-mono text-xs text-[var(--accent-text)]">
                  {item.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start */}
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

      {/* CTA */}
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
              { label: 'Migration Guide', href: '/bifrost-resources/migrating-from-litellm' },
              { label: 'Book a Demo', href: 'https://www.getmaxim.ai/demo' },
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

      {/* Feature Matrix */}
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
  )
}
