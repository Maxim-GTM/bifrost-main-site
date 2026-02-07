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
    DollarSign,
    ExternalLink,
    Lock,
    RefreshCw,
    Shield,
    XCircle,
    Zap,
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'Migrating from LiteLLM to Bifrost | 50x Faster LLM Gateway',
    description:
        'Migrate from LiteLLM to Bifrost in 15-30 minutes. Get 50x faster performance, 99.99% uptime, and enterprise-grade security with zero code changes.',
};

const performanceMetrics = [
    { label: 'Faster', value: '50x', description: '11µs overhead vs ~600µs' },
    { label: 'Uptime SLA', value: '99.99%', description: 'Automatic failover & circuit breakers' },
    { label: 'Providers', value: '15+', description: 'LLM providers supported natively' },
    { label: 'Migration Time', value: '15 min', description: 'Drop-in OpenAI-compatible API' },
];

const whyMigrate = [
    {
        icon: Zap,
        title: '50x Faster Performance',
        description:
            'Built in Go with just 11µs overhead at 5,000 RPS compared to ~8ms for Python-based solutions. Your gateway stops being the bottleneck.',
    },
    {
        icon: Shield,
        title: 'Production-Ready Reliability',
        description:
            '99.99% uptime SLA with automatic failover, circuit breakers, and intelligent retry logic. No more 4-minute latency spikes at high load.',
    },
    {
        icon: DollarSign,
        title: 'Cost Optimization',
        description:
            'Semantic caching reduces costs by up to 80% on repeated queries. Adaptive load balancing ensures efficient resource utilization.',
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
];

const benchmarkRows = [
    { metric: 'Overhead per Request (5K RPS)', bifrost: '11µs', litellm: '~600µs (50x slower)' },
    { metric: 'P99 Latency at 500 RPS', bifrost: '520ms', litellm: '28,000ms' },
    { metric: 'P99 Latency at 1K RPS', bifrost: '1.2s', litellm: 'Crashes (memory exhaustion)' },
    { metric: 'Maximum Sustained RPS', bifrost: '5,000+ stable', litellm: 'Fails at high load' },
];

interface ComparisonRow {
    feature: string;
    bifrost: string | null;
    litellm: string | null;
    bifrostCheck?: boolean;
    litellmCheck?: boolean;
}

const featureComparison: { title: string; rows: ComparisonRow[] }[] = [
    {
        title: 'Performance',
        rows: [
            { feature: 'Overhead at 5K RPS', bifrost: '11µs (Go-native)', litellm: '~600µs (Python GIL)' },
            { feature: 'Memory Management', bifrost: 'Deterministic, bounded', litellm: 'Unpredictable GC pauses' },
            { feature: 'Concurrent Request Handling', bifrost: 'Native Go concurrency', litellm: 'Async overhead' },
        ],
    },
    {
        title: 'Reliability',
        rows: [
            { feature: 'Uptime SLA', bifrost: '99.99%', litellm: 'Community-maintained' },
            { feature: 'Automatic Failover', bifrost: 'Zero-config', litellm: 'Manual config', bifrostCheck: true, litellmCheck: true },
            { feature: 'Circuit Breakers', bifrost: null, litellm: null, bifrostCheck: true, litellmCheck: false },
            { feature: 'Smart Request Queuing', bifrost: null, litellm: null, bifrostCheck: true, litellmCheck: false },
            { feature: 'Health Monitoring', bifrost: 'Real-time', litellm: 'Basic' },
        ],
    },
    {
        title: 'Governance & Security',
        rows: [
            { feature: 'Virtual Keys', bifrost: 'With budgets & rate limits', litellm: null, bifrostCheck: true, litellmCheck: true },
            { feature: 'RBAC', bifrost: 'Enterprise', litellm: 'Enterprise', bifrostCheck: true, litellmCheck: true },
            { feature: 'Audit Logs', bifrost: 'Enterprise', litellm: 'Enterprise', bifrostCheck: true, litellmCheck: true },
            { feature: 'Guardrails', bifrost: 'Enterprise', litellm: 'Available', bifrostCheck: true, litellmCheck: true },
            { feature: 'In-VPC Deployment', bifrost: 'Enterprise', litellm: 'Self-hosted', bifrostCheck: true, litellmCheck: true },
        ],
    },
    {
        title: 'Observability',
        rows: [
            { feature: 'Prometheus Metrics', bifrost: 'Native, no sidecars', litellm: 'Via callbacks', bifrostCheck: true, litellmCheck: true },
            { feature: 'OpenTelemetry', bifrost: null, litellm: null, bifrostCheck: true, litellmCheck: true },
            { feature: 'Request Logging', bifrost: 'SQLite/Postgres', litellm: 'Multiple backends', bifrostCheck: true, litellmCheck: true },
            { feature: 'Evaluation Platform', bifrost: 'Maxim AI', litellm: 'Third-party tools', bifrostCheck: true, litellmCheck: true },
        ],
    },
    {
        title: 'Developer Experience',
        rows: [
            { feature: 'Setup Time', bifrost: '30 seconds (NPX or Docker)', litellm: 'Quick pip install' },
            { feature: 'Web UI', bifrost: 'Real-time config', litellm: 'Admin panel available', bifrostCheck: true },
            { feature: 'Configuration', bifrost: 'Web UI, API, or file-based', litellm: 'YAML config' },
            { feature: 'MCP Support', bifrost: 'Native gateway', litellm: 'Beta integration', bifrostCheck: true, litellmCheck: true },
        ],
    },
    {
        title: 'Architecture',
        rows: [
            { feature: 'Language', bifrost: 'Go', litellm: 'Python' },
            { feature: 'Deployment', bifrost: 'Single binary, Docker, K8s', litellm: 'Python package, Docker' },
            { feature: 'Clustering', bifrost: 'Enterprise', litellm: 'Load balancer needed', bifrostCheck: true },
            { feature: 'Plugin System', bifrost: 'Go-based', litellm: 'Python callbacks', bifrostCheck: true, litellmCheck: true },
            { feature: 'License', bifrost: 'Apache 2.0', litellm: 'MIT' },
        ],
    },
];

const setupSteps = [
    {
        step: '01',
        title: 'Install Bifrost',
        description: 'Choose your preferred method. Bifrost starts immediately with zero configuration needed.',
        code: `# Option 1: NPX (fastest)
npx -y @maximhq/bifrost
# Option 2: Docker
docker pull maximhq/bifrost
docker run -p 8080:8080 maximhq/bifrost`,
    },
    {
        step: '02',
        title: 'Configure providers',
        description: 'Add your LLM provider API keys via the web UI at localhost:8080 or a configuration file.',
        code: `# navigate to http://localhost:8080
# click "Providers" in the sidebar
# add API keys for OpenAI, Anthropic, etc.
# configure models and fallback chains`,
    },
    {
        step: '03',
        title: 'Update base URL',
        description: 'Change one line in your application. Bifrost\'s OpenAI-compatible API means zero other code changes.',
        code: `# Before (LiteLLM)
# base_url="http://localhost:4000"
# After (Bifrost)
base_url="http://localhost:8080"`,
    },
];

const whenToMigrate = [
    'Scaling beyond prototyping — performance matters at production traffic levels',
    'Building multi-step agent architectures — overhead compounds with each LLM call',
    'Need enterprise governance — budget management, access control, and audit trails',
    'Want integrated observability — Maxim platform provides unmatched visibility',
    'Experiencing reliability issues — timeout spikes, memory issues, or unpredictable latency',
    'Need better cost control — semantic caching and adaptive load balancing',
];

function ComparisonCell({ value, hasCheck }: { value: string | null; hasCheck?: boolean }) {
    if (hasCheck === true) {
        return (
            <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-text)]" />
                {value && <span>{value}</span>}
            </span>
        );
    }
    if (hasCheck === false) {
        return (
            <span className="inline-flex items-center gap-1.5">
                <XCircle className="w-3.5 h-3.5 text-gray-300" />
                {value && <span>{value}</span>}
            </span>
        );
    }
    return <span>{value}</span>;
}

export default function MigratingFromLiteLLMPage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    <div className="text-center">
                        <span className="provider-badge">[ MIGRATION GUIDE ]</span>
                        <h1 className="text-4xl md:text-5xl font-normal text-gray-900 mb-4 leading-[1.2] tracking-tight text-center">
                            Migrating from LiteLLM
                            <br />
                            <span className="text-[var(--accent-text)]">to Bifrost</span>
                        </h1>
                        <p className="text-sm md:text-base text-gray-500 max-w-3xl mx-auto leading-relaxed mb-8">
                            Get 50x faster performance with 40% less latency overhead and 9.5x faster throughput compared to Python-based gateways. Built in Go for teams that need 99.99% uptime and infrastructure that scales from prototype to millions of requests.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center w-full">
                            <PrimaryButton href="https://github.com/maximhq/bifrost" external>
                                Get started
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

            {/* Why Migrate */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                            [ WHY MIGRATE ]
                        </p>
                        <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                            Why migrate to Bifrost?
                        </h2>
                        <p className="text-gray-600 max-w-3xl mx-auto">
                            While LiteLLM works well for prototyping, teams scaling to production need infrastructure that doesn&apos;t become a bottleneck.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {whyMigrate.map((item) => (
                            <div key={item.title} className="bg-white p-6 border border-gray-200 hover:border-[var(--accent-border)] hover:shadow-sm transition-all">
                                <item.icon className="w-6 h-6 text-[var(--accent)] mb-4" />
                                <h3 className="text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
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
                            Performance comparison
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Tested on identical AWS t3.xlarge instances. Bifrost delivers consistent, predictable performance under load.
                        </p>
                    </div>
                    <div className="border border-gray-200 bg-white overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50">
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Metric
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-[var(--accent-text)] uppercase tracking-wider">
                                        Bifrost
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        LiteLLM
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {benchmarkRows.map((row) => (
                                    <tr key={row.metric} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3 text-sm text-gray-600 font-medium">
                                            {row.metric}
                                        </td>
                                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                            <span className="inline-flex items-center gap-1.5">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-text)]" />
                                                {row.bifrost}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-500">
                                            {row.litellm}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="border border-gray-200 bg-gray-50 p-4 mt-6">
                        <p className="text-xs text-gray-500 leading-relaxed">
                            <span className="font-medium text-gray-700">For multi-step agent architectures:</span> Ten sequential LLM calls through Bifrost add ~110µs of gateway overhead. The same sequence through LiteLLM adds approximately 5ms, enough to noticeably impact real-time user experiences.
                        </p>
                    </div>
                </div>
            </section>

            {/* Feature Comparison */}
            <section className="py-16 md:py-24 bg-gray-50">
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
                        {featureComparison.map((section) => (
                            <div key={section.title} className="border border-gray-200 bg-white overflow-hidden">
                                <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                                    <h3 className="text-xs font-medium text-gray-900 uppercase tracking-wider">
                                        {section.title}
                                    </h3>
                                </div>
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Feature
                                            </th>
                                            <th className="px-4 py-2.5 text-left text-xs font-medium text-[var(--accent-text)] uppercase tracking-wider">
                                                Bifrost
                                            </th>
                                            <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                LiteLLM
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {section.rows.map((row) => (
                                            <tr key={row.feature} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-4 py-2.5 text-sm text-gray-600">
                                                    {row.feature}
                                                </td>
                                                <td className="px-4 py-2.5 text-sm font-medium text-gray-900">
                                                    <ComparisonCell value={row.bifrost} hasCheck={row.bifrostCheck} />
                                                </td>
                                                <td className="px-4 py-2.5 text-sm text-gray-500">
                                                    <ComparisonCell value={row.litellm} hasCheck={row.litellmCheck} />
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

            {/* Migration Steps */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                            [ MIGRATION STEPS ]
                        </p>
                        <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                            Migrate in three steps
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            The OpenAI-compatible API means most applications require zero code changes. Just update the base URL.
                        </p>
                    </div>
                    <SetupSteps steps={setupSteps} />
                    <div className="mt-8 grid md:grid-cols-3 gap-4">
                        <div className="border border-gray-200 bg-white p-4 text-sm text-gray-700">
                            <strong className="text-gray-900">Zero code changes:</strong> OpenAI-compatible API means your existing integrations work as-is.
                        </div>
                        <div className="border border-gray-200 bg-white p-4 text-sm text-gray-700">
                            <strong className="text-gray-900">LiteLLM SDK compatible:</strong> You can even point the LiteLLM Python SDK at Bifrost as a proxy.
                        </div>
                        <div className="border border-gray-200 bg-white p-4 text-sm text-gray-700">
                            <strong className="text-gray-900">Provider prefix routing:</strong> Use <code className="text-xs bg-gray-100 px-1 py-0.5">openai/gpt-4o</code> format for explicit provider control.
                        </div>
                    </div>
                </div>
            </section>

            {/* Code Comparison: Before/After */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                            [ CODE COMPARISON ]
                        </p>
                        <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                            One line change
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-xs font-mono text-gray-400 uppercase mb-3">Before (LiteLLM)</p>
                            <div className="bg-gray-900 p-5 overflow-x-auto">
                                <pre className="text-xs text-gray-300 font-mono leading-relaxed"><code>{`import openai

client = openai.OpenAI(
    api_key="your-litellm-key",
    base_url="http://localhost:4000"
)

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user",
      "content": "Hello!"}]
)`}</code></pre>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs font-mono text-[var(--accent-text)] uppercase mb-3">After (Bifrost)</p>
                            <div className="bg-gray-900 p-5 overflow-x-auto">
                                <pre className="text-xs text-gray-300 font-mono leading-relaxed"><code>{`import openai

client = openai.OpenAI(
    api_key="your-bifrost-key",
    base_url="http://localhost:8080"
)

response = client.chat.completions.create(
    model="openai/gpt-4o",
    messages=[{"role": "user",
      "content": "Hello!"}]
)`}</code></pre>
                            </div>
                        </div>
                    </div>
                    <p className="text-xs text-gray-400 text-center mt-4 font-mono">
                        Bifrost uses the provider/model format (e.g., openai/gpt-4o) for explicit routing control.
                    </p>
                </div>
            </section>

            {/* Common Migration Scenarios */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                            [ COMMON SCENARIOS ]
                        </p>
                        <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                            Common migration scenarios
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="border border-gray-200 bg-white p-6">
                            <h3 className="text-gray-900 mb-2">Migrating Virtual Keys</h3>
                            <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                LiteLLM virtual keys for team budgets map directly to Bifrost&apos;s equivalent functionality.
                            </p>
                            <div className="bg-gray-900 p-4 overflow-x-auto">
                                <pre className="text-xs text-gray-300 font-mono leading-relaxed"><code>{`curl -X POST http://localhost:8080/api/keys \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "team-engineering",
    "budget": 1000,
    "rate_limit": 100,
    "models": ["openai/gpt-4o",
      "anthropic/claude-sonnet-4-20250514"]
  }'`}</code></pre>
                            </div>
                        </div>
                        <div className="border border-gray-200 bg-white p-6">
                            <h3 className="text-gray-900 mb-2">Migrating Custom Callbacks</h3>
                            <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                LiteLLM callbacks can be replaced with Bifrost plugins or webhooks.
                            </p>
                            <div className="bg-gray-900 p-4 overflow-x-auto">
                                <pre className="text-xs text-gray-300 font-mono leading-relaxed"><code>{`{
  "webhooks": {
    "on_request":
      "https://your-api.com/webhook/request",
    "on_response":
      "https://your-api.com/webhook/response"
  }
}`}</code></pre>
                            </div>
                        </div>
                        <div className="border border-gray-200 bg-white p-6">
                            <h3 className="text-gray-900 mb-2">Drop-in Replacement</h3>
                            <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                Use the standard OpenAI SDK pointed at Bifrost.
                            </p>
                            <div className="bg-gray-900 p-4 overflow-x-auto">
                                <pre className="text-xs text-gray-300 font-mono leading-relaxed"><code>{`import openai

client = openai.OpenAI(
    base_url="http://localhost:8080",
    api_key="your-key"
)`}</code></pre>
                            </div>
                        </div>
                        <div className="border border-gray-200 bg-white p-6">
                            <h3 className="text-gray-900 mb-2">LiteLLM SDK Compatibility</h3>
                            <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                Use the LiteLLM Python SDK with Bifrost as the proxy backend.
                            </p>
                            <div className="bg-gray-900 p-4 overflow-x-auto">
                                <pre className="text-xs text-gray-300 font-mono leading-relaxed"><code>{`import litellm

litellm.api_base = "http://localhost:8080"
response = litellm.completion(
    model="openai/gpt-4o",
    messages=[{"role": "user",
      "content": "Hello!"}]
)`}</code></pre>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* When to Migrate */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                            [ WHEN TO MIGRATE ]
                        </p>
                        <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                            You should migrate if
                        </h2>
                    </div>
                    <div className="max-w-3xl mx-auto">
                        <div className="border border-gray-200 bg-white">
                            <ul className="divide-y divide-gray-200">
                                {whenToMigrate.map((reason) => (
                                    <li key={reason} className="flex items-start gap-3 px-6 py-4">
                                        <CheckCircle2 className="w-4 h-4 text-[var(--accent-text)] mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-gray-700">{reason}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                        Ready to migrate?
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                        Get started in under 15 minutes. Our team is here to help with any questions during your migration.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center w-full">
                        <PrimaryButton href="https://github.com/maximhq/bifrost" external>
                            Get started on GitHub
                            <ArrowRight className="w-4 h-4" />
                        </PrimaryButton>
                        <SecondaryButton href="https://docs.getbifrost.ai" external>
                            Read the docs
                            <ExternalLink className="w-4 h-4" />
                        </SecondaryButton>
                    </div>
                </div>
            </section>

            {/* Feature Matrix */}
            <section className="py-16 md:py-24 bg-gray-50">
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
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <DropInReplacement />
                </div>
            </section>
        </div>
    );
}
