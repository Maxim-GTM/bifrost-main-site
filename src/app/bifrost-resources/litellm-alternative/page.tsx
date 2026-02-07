import { Metadata } from 'next';
import PrimaryButton from '@/components/ui/PrimaryButton';
import SecondaryButton from '@/components/ui/SecondaryButton';
import FeatureMatrix from '@/components/resources/FeatureMatrix';
import DropInReplacement from '@/components/resources/DropInReplacement';
import SetupSteps from '@/components/resources/SetupSteps';
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
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'Bifrost — The High-Performance LiteLLM Alternative | LLM Gateway',
    description:
        'Bifrost is a production-grade LiteLLM alternative built in Go. 50x faster, zero-config deployment, native observability, and 100% success rate at 5,000 RPS.',
};

const performanceMetrics = [
    { label: 'Gateway Overhead', value: '11µs', description: 'At 5,000 RPS sustained' },
    { label: 'Success Rate', value: '100%', description: 'Even under extreme load' },
    { label: 'Setup Time', value: '<30s', description: 'NPX or Docker, zero config' },
    { label: 'Providers', value: '15+', description: '1000+ models supported' },
];

const challengeTable = [
    { challenge: 'High latency at scale', why: 'Built in Go with native concurrency for high-throughput workloads' },
    { challenge: 'Infrastructure bottlenecks', why: 'Connection pooling and zero runtime allocation, no Python GIL limitations' },
    { challenge: 'Memory consumption', why: "Efficient memory management with Go's lightweight goroutines" },
    { challenge: 'Complex self-hosting', why: 'Zero-configuration deployment via npx or Docker, no Redis/Postgres required' },
    { challenge: 'Limited observability', why: 'Native Prometheus metrics and OpenTelemetry built-in, not bolted on' },
    { challenge: 'Production reliability', why: '100% success rate at 5,000 RPS with <100µs overhead' },
];

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
];

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
];

interface ComparisonRow {
    feature: string;
    bifrost: string;
    litellm: string;
    bifrostCheck?: boolean;
    litellmCheck?: boolean;
    litellmWarn?: boolean;
    litellmNone?: boolean;
}

const featureComparisonSections: { title: string; rows: ComparisonRow[] }[] = [
    {
        title: 'Core Gateway',
        rows: [
            { feature: 'Provider Support', bifrost: '15+ providers, 1000+ models', litellm: '100+ LLM APIs' },
            { feature: 'OpenAI-Compatible API', bifrost: 'Yes', litellm: 'Yes', bifrostCheck: true, litellmCheck: true },
            { feature: 'Automatic Failover', bifrost: 'Adaptive load balancing', litellm: 'Retry logic', bifrostCheck: true, litellmCheck: true },
            { feature: 'Semantic Caching', bifrost: 'Built-in', litellm: 'Via external integration', bifrostCheck: true, litellmWarn: true },
            { feature: 'Zero Configuration', bifrost: 'Works out of box', litellm: 'Requires config file', bifrostCheck: true, litellmWarn: true },
            { feature: 'Web UI', bifrost: 'Built-in dashboard', litellm: 'Not included', bifrostCheck: true, litellmNone: true },
            { feature: 'Deployment Time', bifrost: '<30 seconds', litellm: '2-10 minutes' },
        ],
    },
    {
        title: 'Performance & Scalability',
        rows: [
            { feature: 'Language', bifrost: 'Go (compiled)', litellm: 'Python (interpreted)' },
            { feature: 'Gateway Overhead', bifrost: '11-59µs at 5K RPS', litellm: '8ms P95 at 1K RPS' },
            { feature: 'Concurrency Model', bifrost: 'Native goroutines', litellm: 'Async/await with GIL' },
            { feature: 'Connection Pooling', bifrost: 'Native', litellm: 'Via configuration', bifrostCheck: true, litellmWarn: true },
            { feature: 'External Dependencies', bifrost: 'Zero', litellm: 'Redis recommended' },
        ],
    },
    {
        title: 'Observability & Monitoring',
        rows: [
            { feature: 'Prometheus Metrics', bifrost: 'Native, no setup', litellm: 'Available', bifrostCheck: true, litellmCheck: true },
            { feature: 'OpenTelemetry', bifrost: 'Built-in', litellm: 'Via integration', bifrostCheck: true, litellmCheck: true },
            { feature: 'Distributed Tracing', bifrost: 'Native', litellm: 'Via integration', bifrostCheck: true, litellmCheck: true },
            { feature: 'Request Logging', bifrost: 'Built-in SQLite', litellm: 'Via configuration', bifrostCheck: true, litellmWarn: true },
            { feature: 'Real-time Analytics', bifrost: 'Web UI dashboard', litellm: 'External tools required', bifrostCheck: true, litellmNone: true },
        ],
    },
    {
        title: 'Governance & Control',
        rows: [
            { feature: 'Budget Management', bifrost: 'Virtual keys with limits', litellm: 'Team/user budgets', bifrostCheck: true, litellmCheck: true },
            { feature: 'Rate Limiting', bifrost: 'Per-key, per-model', litellm: 'Global and per-user', bifrostCheck: true, litellmCheck: true },
            { feature: 'Access Control', bifrost: 'Model-specific keys', litellm: 'RBAC available', bifrostCheck: true, litellmCheck: true },
            { feature: 'Cost Tracking', bifrost: 'Real-time per request', litellm: 'Available', bifrostCheck: true, litellmCheck: true },
            { feature: 'SSO Integration', bifrost: 'Google, GitHub', litellm: 'Available', bifrostCheck: true, litellmCheck: true },
            { feature: 'Audit Logs', bifrost: 'Built-in', litellm: 'Available', bifrostCheck: true, litellmCheck: true },
        ],
    },
    {
        title: 'Developer Experience',
        rows: [
            { feature: 'Setup Complexity', bifrost: 'Single command', litellm: 'Install + config' },
            { feature: 'Configuration', bifrost: 'Web UI, API, or files', litellm: 'Files or env variables' },
            { feature: 'Hot Reload', bifrost: 'No restart needed', litellm: 'Requires restart', bifrostCheck: true, litellmWarn: true },
            { feature: 'Plugin System', bifrost: 'Go-based plugins', litellm: 'Python callbacks', bifrostCheck: true, litellmCheck: true },
            { feature: 'License', bifrost: 'Apache 2.0', litellm: 'MIT' },
        ],
    },
];

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
];

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
        description: 'Add provider keys, configure models, set up fallback chains — all from the browser.',
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
];

const chooseBifrost = [
    'You need high-throughput performance at 1,000+ RPS with minimal latency overhead',
    'You want zero-configuration deployment — start in seconds, no Redis or databases',
    'You value operational simplicity — single binary, no external dependencies',
    'Every millisecond of latency and every MB of memory matters for your infrastructure costs',
    'You need built-in observability — native Prometheus, OpenTelemetry, and web UI',
    'You want complete control — self-hosted, Apache 2.0, full source code access',
];

const chooseLitellm = [
    'You need 100+ provider integrations out of the box',
    'Your entire stack is Python and you have deep Python expertise',
    'You have heavily customized LiteLLM configurations and need time to migrate',
    'You prefer extending functionality using Python callbacks and integrations',
];

const summaryTable = [
    { factor: 'Best For', bifrost: 'High-throughput production systems', litellm: 'Multi-provider abstraction, Python teams' },
    { factor: 'Performance', bifrost: '<100µs overhead at 5K RPS', litellm: '8ms P95 at 1K RPS' },
    { factor: 'Setup Time', bifrost: '<30 seconds', litellm: '2-10 minutes' },
    { factor: 'Dependencies', bifrost: 'Zero', litellm: 'Redis recommended' },
    { factor: 'Deployment', bifrost: 'Single binary, Docker, npx', litellm: 'Python package, Docker' },
    { factor: 'Configuration', bifrost: 'Web UI, API, files', litellm: 'Files, env variables' },
    { factor: 'Observability', bifrost: 'Native Prometheus, built-in UI', litellm: 'Via integrations' },
    { factor: 'Cost', bifrost: 'Free (Apache 2.0)', litellm: 'Free (MIT)' },
    { factor: 'Providers', bifrost: '15+ providers, 1000+ models', litellm: '100+ LLM APIs' },
];

function CellIcon({ check, warn, none }: { check?: boolean; warn?: boolean; none?: boolean }) {
    if (check) return <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-text)] flex-shrink-0" />;
    if (warn) return <span className="text-amber-400 text-xs flex-shrink-0">⚠️</span>;
    if (none) return <XCircle className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />;
    return null;
}

export default function LiteLLMAlternativePage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    <div className="text-center">
                        <span className="provider-badge">[ LITELLM ALTERNATIVE ]</span>
                        <h1 className="text-4xl md:text-5xl font-normal text-gray-900 mb-4 leading-[1.2] tracking-tight text-center">
                            The High-Performance
                            <br />
                            <span className="text-[var(--accent-text)]">LiteLLM Alternative</span>
                        </h1>
                        <p className="text-sm md:text-base text-gray-500 max-w-3xl mx-auto leading-relaxed mb-8">
                            Bifrost is an open-source LLM gateway built in Go that delivers production-grade reliability with &lt;100µs overhead at 5,000 RPS. If you&apos;re evaluating LiteLLM or experiencing performance bottlenecks at scale, Bifrost is a drop-in alternative designed for serious GenAI workloads.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center w-full">
                            <PrimaryButton href="https://github.com/maximhq/bifrost" external>
                                Get started in 30 seconds
                                <ArrowRight className="w-4 h-4" />
                            </PrimaryButton>
                            <SecondaryButton href="https://docs.getbifrost.ai" external>
                                View documentation
                                <ExternalLink className="w-4 h-4" />
                            </SecondaryButton>
                        </div>
                    </div>
                </div>
            </section>

            {/* Metrics */}
            <section className="py-10 bg-white">
                <div className="w-full">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-mono text-center mb-4">
                        [ PERFORMANCE AT A GLANCE ]
                    </p>
                    <div className="border-y border-gray-200">
                        <div className="max-w-7xl mx-auto">
                            <div className="grid grid-cols-2 md:grid-cols-6 divide-y md:divide-y-0">
                                <div className="hidden md:block md:col-span-1 border-r border-gray-200" />
                                {performanceMetrics.map((item) => (
                                    <div
                                        key={item.label}
                                        className="text-center py-5 px-4 border-r border-gray-200 last:border-r-0"
                                    >
                                        <div className="text-xl md:text-2xl text-[var(--accent-text)] mb-1 leading-none font-mono">
                                            {item.value}
                                        </div>
                                        <div className="text-[10px] text-gray-500 uppercase tracking-wider font-medium font-mono mb-1">
                                            {item.label}
                                        </div>
                                        <div className="text-[11px] text-gray-400">{item.description}</div>
                                    </div>
                                ))}
                                <div className="hidden md:block md:col-span-1 border-gray-200" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Teams Choose Bifrost */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                            [ WHY BIFROST ]
                        </p>
                        <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                            Why teams choose Bifrost over LiteLLM
                        </h2>
                    </div>
                    <div className="border border-gray-200 bg-white overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50">
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Your Challenge
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-[var(--accent-text)] uppercase tracking-wider">
                                        Why Bifrost
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {challengeTable.map((row) => (
                                    <tr key={row.challenge} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3 text-sm text-gray-600 font-medium">{row.challenge}</td>
                                        <td className="px-4 py-3 text-sm text-gray-900">
                                            <span className="inline-flex items-center gap-1.5">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-text)]" />
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
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                            [ PERFORMANCE BENCHMARKS ]
                        </p>
                        <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                            Bifrost performance at 5,000 RPS
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Benchmarked on production infrastructure under sustained load. Perfect reliability with sub-100µs overhead.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        {benchmarkBifrost.map((bench) => (
                            <div key={bench.instance} className="border border-gray-200 bg-white p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 flex items-center justify-center bg-[var(--accent)]/10 text-[var(--accent-text)]">
                                        <Cpu className="w-5 h-5" />
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
                                            <div className="text-xs text-gray-500 font-mono uppercase">{m.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="border border-gray-200 bg-gray-50 p-4">
                        <p className="text-xs text-gray-500 leading-relaxed">
                            <span className="font-medium text-gray-700">LiteLLM comparison:</span> LiteLLM reports P95 latency of 8ms at 1,000 RPS with recommended Redis configuration. LiteLLM recommends multiple instances with proper worker configuration for production deployments.
                        </p>
                    </div>
                </div>
            </section>

            {/* Architecture: Go vs Python */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                            [ ARCHITECTURE ]
                        </p>
                        <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                            Why Go beats Python for LLM gateways
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Python Challenges */}
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">The Python Challenge</p>
                            <div className="space-y-4">
                                {pythonChallenges.map((item) => (
                                    <div key={item.title} className="border border-gray-200 bg-white p-5">
                                        <div className="flex items-center gap-3 mb-2">
                                            <item.icon className="w-4 h-4 text-gray-400" />
                                            <h4 className="text-sm text-gray-900 font-medium">{item.title}</h4>
                                        </div>
                                        <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Go Advantages */}
                        <div>
                            <p className="text-xs text-[var(--accent-text)] uppercase tracking-widest font-mono mb-4">Bifrost&apos;s Go Advantage</p>
                            <div className="space-y-4">
                                {goAdvantages.map((item) => (
                                    <div key={item.title} className="border border-gray-200 bg-white p-5">
                                        <div className="flex items-center gap-3 mb-2">
                                            <item.icon className="w-4 h-4 text-[var(--accent-text)]" />
                                            <h4 className="text-sm text-gray-900 font-medium">{item.title}</h4>
                                        </div>
                                        <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Comparison */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                            [ FEATURE COMPARISON ]
                        </p>
                        <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                            Feature-by-feature comparison
                        </h2>
                    </div>
                    <div className="space-y-6">
                        {featureComparisonSections.map((section) => (
                            <div key={section.title} className="border border-gray-200 bg-white overflow-hidden">
                                <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                                    <h3 className="text-xs font-medium text-gray-900 uppercase tracking-wider">
                                        {section.title}
                                    </h3>
                                </div>
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                                            <th className="px-4 py-2.5 text-left text-xs font-medium text-[var(--accent-text)] uppercase tracking-wider">Bifrost</th>
                                            <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LiteLLM</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {section.rows.map((row) => (
                                            <tr key={row.feature} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-4 py-2.5 text-sm text-gray-600">{row.feature}</td>
                                                <td className="px-4 py-2.5 text-sm font-medium text-gray-900">
                                                    <span className="inline-flex items-center gap-1.5">
                                                        <CellIcon check={row.bifrostCheck} />
                                                        {row.bifrost}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-2.5 text-sm text-gray-500">
                                                    <span className="inline-flex items-center gap-1.5">
                                                        <CellIcon check={row.litellmCheck} warn={row.litellmWarn} none={row.litellmNone} />
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
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                            [ ENTERPRISE READY ]
                        </p>
                        <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                            Built-in governance and observability
                        </h2>
                        <p className="text-gray-600 max-w-3xl mx-auto">
                            Everything you need for production AI infrastructure, without bolting on external tools.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Lock,
                                title: 'Virtual keys with budgets',
                                description: 'Create API keys with spending limits, model restrictions, and rate limits per team or use case.',
                                tag: 'Cost control',
                            },
                            {
                                icon: BarChart3,
                                title: 'Native Prometheus metrics',
                                description: 'Metrics automatically available at /metrics — requests, latency, provider health, memory usage.',
                                tag: 'No sidecars',
                            },
                            {
                                icon: Globe,
                                title: 'OpenTelemetry tracing',
                                description: 'Distributed tracing built-in. Point to your Jaeger or OTEL collector and traces flow automatically.',
                                tag: 'Built-in',
                            },
                            {
                                icon: Monitor,
                                title: 'Real-time web dashboard',
                                description: 'Monitor spend per key, per model, per team via the built-in web UI. No external tools required.',
                                tag: 'Web UI',
                            },
                            {
                                icon: RefreshCw,
                                title: 'Adaptive load balancing',
                                description: 'Automatically distributes load based on current success rates, latency patterns, and available capacity.',
                                tag: 'Intelligent routing',
                            },
                            {
                                icon: Shield,
                                title: 'Automatic failover',
                                description: 'If a provider fails, Bifrost transparently routes to configured backups. Zero downtime, zero manual intervention.',
                                tag: 'High availability',
                            },
                        ].map((item) => (
                            <div key={item.title} className="bg-white p-6 border border-gray-200 hover:border-[var(--accent-border)] hover:shadow-sm transition-all">
                                <item.icon className="w-6 h-6 text-[var(--accent)] mb-4" />
                                <h3 className="text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed mb-4">{item.description}</p>
                                <span className="inline-block text-xs font-mono text-[var(--accent-text)] bg-[var(--accent-light)] px-2 py-1">
                                    {item.tag}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick Start */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                            [ QUICK START ]
                        </p>
                        <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                            Get started in three steps
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            No configuration files, no Redis, no external databases. Just install and go.
                        </p>
                    </div>
                    <SetupSteps steps={setupSteps} />
                </div>
            </section>

            {/* When to Choose */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                            [ DECISION GUIDE ]
                        </p>
                        <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                            When to choose what
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="border-2 border-[var(--accent-border)] bg-white">
                            <div className="px-6 py-4 bg-[var(--accent)]/5 border-b border-[var(--accent-border)]">
                                <h3 className="text-sm font-medium text-[var(--accent-text)] uppercase tracking-wider">Choose Bifrost when</h3>
                            </div>
                            <ul className="divide-y divide-gray-200">
                                {chooseBifrost.map((reason) => (
                                    <li key={reason} className="flex items-start gap-3 px-6 py-3">
                                        <CheckCircle2 className="w-4 h-4 text-[var(--accent-text)] mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-gray-700">{reason}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="border border-gray-200 bg-white">
                            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                                <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wider">LiteLLM might be better when</h3>
                            </div>
                            <ul className="divide-y divide-gray-200">
                                {chooseLitellm.map((reason) => (
                                    <li key={reason} className="flex items-start gap-3 px-6 py-3">
                                        <span className="w-4 h-4 mt-0.5 flex-shrink-0 flex items-center justify-center text-gray-400 text-xs">•</span>
                                        <span className="text-sm text-gray-600">{reason}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Summary Table */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                            [ COMPARISON SUMMARY ]
                        </p>
                        <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                            At a glance
                        </h2>
                    </div>
                    <div className="border border-gray-200 bg-white overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50">
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Factor</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-[var(--accent-text)] uppercase tracking-wider">Bifrost</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LiteLLM</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {summaryTable.map((row) => (
                                    <tr key={row.factor} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3 text-sm text-gray-600 font-medium">{row.factor}</td>
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
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                        Ready to upgrade your LLM infrastructure?
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                        100% open source under Apache 2.0. Free forever. No vendor lock-in. Get started in under 30 seconds.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center w-full mb-12">
                        <PrimaryButton href="https://github.com/maximhq/bifrost" external>
                            Get started on GitHub
                            <ArrowRight className="w-4 h-4" />
                        </PrimaryButton>
                        <SecondaryButton href="https://docs.getbifrost.ai" external>
                            Read the docs
                            <ExternalLink className="w-4 h-4" />
                        </SecondaryButton>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { label: 'Documentation', href: 'https://docs.getbifrost.ai' },
                            { label: 'GitHub', href: 'https://github.com/maximhq/bifrost' },
                            { label: 'Migration Guide', href: '/bifrost-resources/migrating-from-litellm' },
                            { label: 'Book a Demo', href: 'https://www.getmaxim.ai/demo' },
                        ].map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                className="border border-gray-200 bg-white p-4 text-sm text-gray-700 hover:border-[var(--accent-border)] hover:text-[var(--accent-text)] transition-all flex items-center justify-center gap-2"
                            >
                                {link.label}
                                {link.href.startsWith('http') && <ExternalLink className="w-3 h-3" />}
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Feature Matrix */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                            [ BIFROST FEATURES ]
                        </p>
                        <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                            Open Source &amp; Enterprise
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Everything you need to run AI in production, from free open source to enterprise-grade features.
                        </p>
                    </div>
                    <FeatureMatrix />
                </div>
            </section>

            {/* Drop-in Replacement */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <DropInReplacement />
                </div>
            </section>
        </div>
    );
}
