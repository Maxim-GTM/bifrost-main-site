import React from 'react'
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
  DollarSign,
  ExternalLink,
  Lock,
  RefreshCw,
  Shield,
  Zap,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Migrating from LiteLLM to Bifrost | 54x Faster LLM Gateway',
  description:
    'Migrate from LiteLLM to Bifrost in 15-30 minutes. Get 54x faster performance at 500 RPS, 99.99% uptime, and enterprise-grade security with zero code changes.',
  alternates: {
    canonical: 'https://www.getmaxim.ai/bifrost/resources/migrating-from-litellm',
  },
}

const performanceMetrics = [
  { label: 'Lower P99 Latency', value: '54x', description: 'Consistently fast response times' },
  { label: 'Uptime SLA', value: '99.999%', description: 'Automatic failover & circuit breakers' },
  { label: 'Providers', value: '20+', description: 'LLM providers supported natively' },
  { label: 'Migration Time', value: '15 min', description: 'Drop-in OpenAI-compatible API' },
]

const whyMigrate = [
  {
    icon: Zap,
    title: '54x Faster Performance',
    description:
      'Built in Go with just 1.68S overhead at 500 RPS compared to 90.72s for Python-based solutions. Your gateway stops being the bottleneck.',
  },
  {
    icon: Shield,
    title: 'Production-Ready Reliability',
    description:
      '99.999% uptime SLA with automatic failover, circuit breakers, and intelligent retry logic. No more 4-minute latency spikes at high load.',
  },
  {
    icon: DollarSign,
    title: 'Cost Optimization',
    description:
      'Semantic caching reduces costs and latency on repeated queries. Adaptive load balancing ensures efficient resource utilization.',
  },
  {
    icon: Lock,
    title: 'Enterprise Security',
    description:
      'Virtual keys with budgets, RBAC, audit logs, and in-VPC deployments. Full control over your AI infrastructure.',
  },
  {
    icon: BarChart3,
    title: 'Native Observability',
    description:
      "Built-in Prometheus metrics, OpenTelemetry support, and integration with Maxim's evaluation platform. No sidecars needed.",
  },
  {
    icon: RefreshCw,
    title: 'Drop-in Replacement',
    description:
      "OpenAI-compatible API means zero code changes. Point your existing LiteLLM integration to Bifrost and you're done.",
  },
]

const benchmarkRows = [
  { metric: 'Overhead per Request (500 RPS)', bifrost: '11µs', litellm: '~40ms (40.4x slower)' },
  { metric: 'P99 Latency at 500 RPS', bifrost: '1.68s', litellm: '90.72s' },
  { metric: 'Maximum Sustained RPS', bifrost: '5,000+ stable', litellm: 'Fails at high load' },
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
    description:
      'Choose your preferred method. Bifrost starts immediately with zero configuration needed.',
    code: `# Option 1: NPX (fastest)
npx -y @maximhq/bifrost
# Option 2: Docker
docker pull maximhq/bifrost
docker run -p 8080:8080 maximhq/bifrost`,
  },
  {
    step: '02',
    title: 'Configure providers',
    description:
      'Add your LLM provider API keys via the web UI at localhost:8080 or a configuration file.',
    code: `# navigate to http://localhost:8080
# click "Providers" in the sidebar
# add API keys for OpenAI, Anthropic, etc.
# configure models and fallback chains`,
  },
  {
    step: '03',
    title: 'Update base URL',
    description:
      "Change one line in your application. Bifrost's OpenAI-compatible API means zero other code changes.",
    code: `# Before (LiteLLM)
# base_url="http://localhost:4000"
# After (Bifrost)
base_url="http://localhost:8080"`,
  },
]

const whenToMigrate = [
  'Scaling beyond prototyping, performance matters at production traffic levels',
  'Building multi-step agent architectures, overhead compounds with each LLM call',
  'Need enterprise governance, budget management, access control, and audit trails',
  'Want integrated observability, Maxim platform provides unmatched visibility',
  'Experiencing reliability issues, timeout spikes, memory issues, or unpredictable latency',
  'Need better cost control, semantic caching and adaptive load balancing',
]

/** Cell value style for buyers-guide-style table: sy = green/yes, sn = gray/no, sp = orange/partial, sv = green metric */
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

export default function MigratingFromLiteLLMPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="text-center">
            <span className="font-mono text-[12px] leading-[15px] font-medium tracking-[0.04em] text-emerald-500 uppercase">
              [&ensp;MIGRATING GUIDE&ensp;]
            </span>
            <h1 className="mb-4 text-center text-4xl leading-[1.2] font-normal tracking-tight text-gray-900 md:text-5xl">
              Migrating from LiteLLM
              <br />
              <span className="text-[var(--accent-text)]">to Bifrost</span>
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-sm leading-relaxed text-gray-500 md:text-base">
              Get 54x faster performance with 40% less latency overhead and 9.5x faster throughput
              at 500 RPS compared to Python-based gateways. Built in Go for teams that need 99.99%
              uptime and infrastructure that scales from prototype to millions of requests.
            </p>
            <div className="flex w-full flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
              <Link
                href="https://github.com/maximhq/bifrost"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg">
                  Get started
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

      {/* Why Migrate */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ WHY MIGRATE ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">Why Migrate to Bifrost?</h2>
            <p className="mx-auto max-w-3xl text-gray-600">
              While LiteLLM works well for prototyping, teams scaling to production need
              infrastructure that doesn&apos;t become a bottleneck.
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

      {/* Performance Benchmarks */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ PERFORMANCE BENCHMARKS ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">Performance Comparison</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Tested on identical AWS t3.xlarge instances. Bifrost delivers consistent, predictable
              performance under load.
            </p>
          </div>
          <div className="overflow-hidden border border-gray-200 bg-white">
            <table className="w-full table-fixed">
              <colgroup>
                <col className="w-[40%]" />
                <col className="w-[30%]" />
                <col className="w-[30%]" />
              </colgroup>
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Metric
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
                {benchmarkRows.map((row) => (
                  <tr key={row.metric} className="transition-colors hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-600">{row.metric}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      <span className="inline-flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[var(--accent-text)]" />
                        {row.bifrost}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{row.litellm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/*<div className="mt-6 border border-gray-200 bg-gray-50 p-4">
            <p className="text-xs leading-relaxed text-gray-500">
              <span className="font-medium text-gray-700">For multi-step agent architectures:</span>{' '}
              Ten sequential LLM calls through Bifrost add ~110µs of gateway overhead. The same
              sequence through LiteLLM adds approximately 5ms, enough to noticeably impact real-time
              user experiences.
            </p>
          </div>*/}
        </div>
      </section>

      {/* Feature Comparison */}
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

      {/* Migration Steps */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ MIGRATION STEPS ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">Migrate in Three Steps</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              The OpenAI-compatible API means most applications require zero code changes. Just
              update the base URL.
            </p>
          </div>
          <SetupSteps steps={setupSteps} />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="relative border border-gray-200 bg-white p-4 text-sm text-gray-700">
              <div className="absolute top-2 left-2 h-1.5 w-1.5 border-t border-l border-[var(--accent)] opacity-40" />
              <div className="absolute top-2 right-2 h-1.5 w-1.5 border-t border-r border-[var(--accent)] opacity-40" />
              <div className="absolute bottom-2 left-2 h-1.5 w-1.5 border-b border-l border-[var(--accent)] opacity-40" />
              <div className="absolute right-2 bottom-2 h-1.5 w-1.5 border-r border-b border-[var(--accent)] opacity-40" />
              <strong className="text-gray-900">Zero code changes:</strong> OpenAI-compatible API
              means your existing integrations work as-is.
            </div>
            <div className="relative border border-gray-200 bg-white p-4 text-sm text-gray-700">
              <div className="absolute top-2 left-2 h-1.5 w-1.5 border-t border-l border-[var(--accent)] opacity-40" />
              <div className="absolute top-2 right-2 h-1.5 w-1.5 border-t border-r border-[var(--accent)] opacity-40" />
              <div className="absolute bottom-2 left-2 h-1.5 w-1.5 border-b border-l border-[var(--accent)] opacity-40" />
              <div className="absolute right-2 bottom-2 h-1.5 w-1.5 border-r border-b border-[var(--accent)] opacity-40" />
              <strong className="text-gray-900">LiteLLM SDK compatible:</strong> You can even point
              the LiteLLM Python SDK at Bifrost as a proxy.
            </div>
            <div className="relative border border-gray-200 bg-white p-4 text-sm text-gray-700">
              <div className="absolute top-2 left-2 h-1.5 w-1.5 border-t border-l border-[var(--accent)] opacity-40" />
              <div className="absolute top-2 right-2 h-1.5 w-1.5 border-t border-r border-[var(--accent)] opacity-40" />
              <div className="absolute bottom-2 left-2 h-1.5 w-1.5 border-b border-l border-[var(--accent)] opacity-40" />
              <div className="absolute right-2 bottom-2 h-1.5 w-1.5 border-r border-b border-[var(--accent)] opacity-40" />
              <strong className="text-gray-900">Provider prefix routing:</strong> Use{' '}
              <code className="bg-gray-100 px-1 py-0.5 text-xs">openai/gpt-4o</code> format for
              explicit provider control.
            </div>
          </div>
        </div>
      </section>

      {/* Code Comparison: Before/After */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ CODE COMPARISON ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">One Line Change</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="mb-3 font-mono text-xs text-gray-400 uppercase">Before (LiteLLM)</p>
              <div className="overflow-x-auto bg-gray-900 p-5">
                <pre className="font-mono text-xs leading-relaxed text-gray-300">
                  <code>{`import openai

client = openai.OpenAI(
    api_key="your-litellm-key",
    base_url="http://localhost:4000"
)

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user",
      "content": "Hello!"}]
)`}</code>
                </pre>
              </div>
            </div>
            <div>
              <p className="mb-3 font-mono text-xs text-[var(--accent-text)] uppercase">
                After (Bifrost)
              </p>
              <div className="overflow-x-auto bg-gray-900 p-5">
                <pre className="font-mono text-xs leading-relaxed text-gray-300">
                  <code>{`import openai

client = openai.OpenAI(
    api_key="your-bifrost-key",
    base_url="http://localhost:8080"
)

response = client.chat.completions.create(
    model="openai/gpt-4o",
    messages=[{"role": "user",
      "content": "Hello!"}]
)`}</code>
                </pre>
              </div>
            </div>
          </div>
          <p className="mt-4 text-center font-mono text-xs text-gray-400">
            Bifrost uses the provider/model format (e.g., openai/gpt-4o) for explicit routing
            control.
          </p>
        </div>
      </section>

      {/* Common Migration Scenarios */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ COMMON SCENARIOS ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">Common Migration Scenarios</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="relative border border-gray-200 bg-white p-6">
              <div className="absolute top-3 left-3 h-2 w-2 border-t border-l border-[var(--accent)] opacity-40" />
              <div className="absolute top-3 right-3 h-2 w-2 border-t border-r border-[var(--accent)] opacity-40" />
              <div className="absolute bottom-3 left-3 h-2 w-2 border-b border-l border-[var(--accent)] opacity-40" />
              <div className="absolute right-3 bottom-3 h-2 w-2 border-r border-b border-[var(--accent)] opacity-40" />
              <h3 className="mb-2 text-gray-900">Migrating Virtual Keys</h3>
              <p className="mb-4 text-sm leading-relaxed text-gray-600">
                LiteLLM virtual keys for team budgets map directly to Bifrost&apos;s equivalent
                functionality.
              </p>
              <div className="overflow-x-auto bg-gray-900 p-4">
                <pre className="font-mono text-xs leading-relaxed text-gray-300">
                  <code>{`curl -X POST http://localhost:8080/api/keys \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "team-engineering",
    "budget": 1000,
    "rate_limit": 100,
    "models": ["openai/gpt-4o",
      "anthropic/claude-sonnet-4-20250514"]
  }'`}</code>
                </pre>
              </div>
            </div>
            
            <div className="relative border border-gray-200 bg-white p-6">
              <div className="absolute top-3 left-3 h-2 w-2 border-t border-l border-[var(--accent)] opacity-40" />
              <div className="absolute top-3 right-3 h-2 w-2 border-t border-r border-[var(--accent)] opacity-40" />
              <div className="absolute bottom-3 left-3 h-2 w-2 border-b border-l border-[var(--accent)] opacity-40" />
              <div className="absolute right-3 bottom-3 h-2 w-2 border-r border-b border-[var(--accent)] opacity-40" />
              <h3 className="mb-2 text-gray-900">Drop-in Replacement</h3>
              <p className="mb-4 text-sm leading-relaxed text-gray-600">
                Use the standard OpenAI SDK pointed at Bifrost.
              </p>
              <div className="overflow-x-auto bg-gray-900 p-4">
                <pre className="font-mono text-xs leading-relaxed text-gray-300">
                  <code>{`import openai

client = openai.OpenAI(
    base_url="http://localhost:8080",
    api_key="your-key"
)`}</code>
                </pre>
              </div>
            </div>
            <div className="relative border border-gray-200 bg-white p-6">
              <div className="absolute top-3 left-3 h-2 w-2 border-t border-l border-[var(--accent)] opacity-40" />
              <div className="absolute top-3 right-3 h-2 w-2 border-t border-r border-[var(--accent)] opacity-40" />
              <div className="absolute bottom-3 left-3 h-2 w-2 border-b border-l border-[var(--accent)] opacity-40" />
              <div className="absolute right-3 bottom-3 h-2 w-2 border-r border-b border-[var(--accent)] opacity-40" />
              <h3 className="mb-2 text-gray-900">LiteLLM SDK Compatibility</h3>
              <p className="mb-4 text-sm leading-relaxed text-gray-600">
                Use the LiteLLM Python SDK with Bifrost as the proxy backend.
              </p>
              <div className="overflow-x-auto bg-gray-900 p-4">
                <pre className="font-mono text-xs leading-relaxed text-gray-300">
                  <code>{`import litellm

litellm.api_base = "http://localhost:8080/litellm"
response = litellm.completion(
    model="openai/gpt-4o",
    messages=[{"role": "user",
      "content": "Hello!"}]
)`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* When to Migrate */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ WHEN TO MIGRATE ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">You Should Migrate If</h2>
          </div>
          <div className="mx-auto max-w-3xl">
            <div className="relative border border-gray-200 bg-white">
              <div className="absolute top-3 left-3 h-2 w-2 border-t border-l border-[var(--accent)] opacity-40" />
              <div className="absolute top-3 right-3 h-2 w-2 border-t border-r border-[var(--accent)] opacity-40" />
              <div className="absolute bottom-3 left-3 h-2 w-2 border-b border-l border-[var(--accent)] opacity-40" />
              <div className="absolute right-3 bottom-3 h-2 w-2 border-r border-b border-[var(--accent)] opacity-40" />
              <ul className="divide-y divide-gray-200">
                {whenToMigrate.map((reason) => (
                  <li key={reason} className="flex items-start gap-3 px-6 py-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--accent-text)]" />
                    <span className="text-sm text-gray-700">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">Ready to Migrate?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-600">
            Get started in under 15 minutes. Our team is here to help with any questions during your
            migration.
          </p>
          <div className="flex w-full flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
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
        </div>
      </section>

      {/* Feature Matrix */}
      <section className="bg-gray-50 py-16 md:py-24">
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
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <DropInReplacement />
        </div>
      </section>
    </div>
  )
}
