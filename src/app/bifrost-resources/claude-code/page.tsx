import { Metadata } from 'next';
import SetupSteps from '@/components/resources/SetupSteps';
import FeatureMatrix from '@/components/resources/FeatureMatrix';
import DropInReplacement from '@/components/resources/DropInReplacement';
import PrimaryButton from '@/components/ui/PrimaryButton';
import SecondaryButton from '@/components/ui/SecondaryButton';
import {
    Zap,
    ArrowRight,
    ExternalLink,
    DollarSign,
    RefreshCw,
    Shield,
    Activity,
    Eye,
    KeyRound,
    Server,
    Gauge,
    Database,
    Lock,
    Bell,
    Globe,
    Cpu,
    CheckCircle2,
    XCircle,
    Users,
    FileText,
    Building2,
    ShieldCheck,
    Heart,
    Award,
    AlertTriangle,
    Terminal,
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'Claude Code + Bifrost | Enterprise LLM Gateway for Claude Code',
    description: 'Add multi-provider routing, cost control, guardrails, and governance to Claude Code at scale with Bifrost - the fastest enterprise LLM gateway.',
};

const painPoints = [
    {
        icon: DollarSign,
        problem: 'No cost visibility',
        detail: 'No way to track which teams, projects, or developers are driving Claude Code spend. Budgets are managed manually — if at all.',
    },
    {
        icon: AlertTriangle,
        problem: 'Single provider dependency',
        detail: 'When Anthropic hits rate limits or has an outage, every developer using Claude Code stops working. No fallback, no failover.',
    },
    {
        icon: Shield,
        problem: 'No guardrails at scale',
        detail: 'Sensitive data, PII, and internal code flow freely through the API. No content policies, no redaction, no audit trail for compliance.',
    },
    {
        icon: Eye,
        problem: 'Zero observability',
        detail: 'No centralized view of requests, token usage, latency, or error rates. Platform teams fly blind when rolling out AI tooling org-wide.',
    },
];

const coreFeatures = [
    {
        icon: DollarSign,
        title: 'Cost management and optimization',
        description: 'Track LLM spend per request with breakdowns by provider, model, team, and developer. Virtual keys enforce team-level budgets. Semantic caching reduces costs by up to 95% on repeat queries.',
        tag: 'LLM cost control + budgets',
    },
    {
        icon: RefreshCw,
        title: 'Multi-provider routing with failover',
        description: 'Automatic failover across Anthropic, AWS Bedrock, and Google Vertex AI when rate limits or outages hit. Adaptive load balancing keeps throughput stable even under heavy load.',
        tag: '99.99% uptime target',
    },
    {
        icon: Shield,
        title: 'Guardrails and governance',
        description: 'Enforce content policies, PII redaction, and safety checks before requests reach the model. Role-based access controls and rate limits per team provide fine-grained LLM governance across the organization.',
        tag: 'AWS Bedrock + Azure AI',
    },
    {
        icon: Zap,
        title: 'Reduce latency, high throughput',
        description: 'Built in Go for production workloads. Bifrost adds only 11µs mean overhead at 5,000 requests per second, making it 50x faster than Python-based gateways. Coding workflows stay fast at scale.',
        tag: '11µs @ 5K RPS',
    },
    {
        icon: Eye,
        title: 'Centralized LLM API observability',
        description: 'Every Claude Code request is logged with full metadata including user, team, provider, route, token count, and latency. Filter and export through the dashboard or push to any observability stack via OpenTelemetry.',
        tag: 'OTEL native',
    },
    {
        icon: KeyRound,
        title: 'Centralized credential management',
        description: 'API keys for all providers live in one place. Integrate with HashiCorp Vault for secure key storage or manage them directly in Bifrost. SSO support for Google, GitHub, and enterprise identity providers.',
        tag: 'Vault + SSO ready',
    },
];

const setupSteps = [
    {
        step: '01',
        title: 'Deploy Bifrost',
        description: 'Bifrost runs as a standalone Go service. Teams deploy it in-VPC or via managed hosting. No agent installation on developer machines.',
        code: `# pull and start bifrost
docker pull bifrost-gateway
docker run -p 8080:8080 bifrost`,
    },
    {
        step: '02',
        title: 'Point Claude Code at it',
        description: 'Developers set one environment variable. Claude Code sends all requests through Bifrost without any code changes or plugin installation.',
        code: `export ANTHROPIC_BASE_URL="http://localhost:8080"
# that's it - claude code just works`,
    },
    {
        step: '03',
        title: 'Configure from the dashboard',
        description: 'Set team budgets, apply guardrails, configure provider fallbacks, and view real-time analytics — all from Bifrost\'s web interface. No code required.',
        code: `# dashboard available at
localhost:8080/logs
# virtual keys, budgets, guardrails`,
    },
];

const enterpriseFeatures = [
    { icon: Zap, title: 'Automatic failovers', description: 'Requests reroute seamlessly when a provider fails or hits rate limits.' },
    { icon: Gauge, title: 'Adaptive load balancing', description: 'Traffic distributes intelligently based on real-time health signals.' },
    { icon: Database, title: 'Semantic caching', description: 'Repeat or near-identical queries resolve instantly, cutting costs up to 95%.' },
    { icon: KeyRound, title: 'Virtual keys & budgets', description: 'Create separate virtual API keys for each team with independent limits.' },
    { icon: Shield, title: 'Guardrails', description: 'Enforce content policies, PII redaction, and safety checks.' },
    { icon: FileText, title: 'Audit logs', description: 'Complete, tamper-evident record of every request for compliance.' },
    { icon: Lock, title: 'SSO integration', description: 'Authenticate via Google, GitHub, Okta, or any SAML/OIDC provider.' },
    { icon: Server, title: 'Vault support', description: 'API keys stored in HashiCorp Vault, never touch developer machines.' },
    { icon: Globe, title: 'Cluster mode', description: 'Horizontal scaling with zero downtime across multiple nodes.' },
    { icon: Cpu, title: 'Code Mode (MCP)', description: 'AI generates Python to orchestrate multiple MCP tools in one execution.' },
    { icon: Bell, title: 'Alerts', description: 'Threshold-based alerts for cost overruns, rate limits, and errors.' },
    { icon: Activity, title: 'MCP Gateway', description: 'Inject filesystem tools, database connectors, and custom integrations.' },
];

const comparisonData = [
    { feature: 'Multi-model support', standalone: false, withBifrost: '15+ providers' },
    { feature: 'MCP tool gateway', standalone: false, withBifrost: 'Full MCP injection' },
    { feature: 'Cost tracking', standalone: false, withBifrost: 'Real-time per-request' },
    { feature: 'Provider failover', standalone: false, withBifrost: 'Automatic across providers' },
    { feature: 'Semantic caching', standalone: false, withBifrost: 'Reduce costs and latency' },
    { feature: 'Team budgets', standalone: false, withBifrost: 'Virtual keys + limits' },
    { feature: 'Request observability', standalone: false, withBifrost: 'Full log trail + OTEL export' },
    { feature: 'Gateway latency', standalone: null, withBifrost: '11µs at 5,000 RPS' },
];

const useCases = [
    {
        icon: DollarSign,
        title: 'Enterprise cost management',
        description: 'Platform teams set department-level budgets for Claude Code usage. Real-time cost tracking surfaces which teams, projects, or developers are driving LLM spend. Automated alerts fire when budgets approach limits.',
    },
    {
        icon: RefreshCw,
        title: 'Multi-model testing and comparison',
        description: 'Engineering teams route the same Claude Code workflow through Claude Sonnet, GPT-4, and Gemini to compare code quality, latency, and cost. Bifrost logs performance metrics for each provider.',
    },
    {
        icon: Shield,
        title: 'Regulatory compliance and governance',
        description: 'Organizations in healthcare, finance, or government use Bifrost\'s guardrails to enforce PII redaction and content policies. Audit logs provide tamper-evident records for SOC 2, HIPAA, and GDPR compliance.',
    },
    {
        icon: Zap,
        title: 'High-availability production deployments',
        description: 'Teams running Claude Code at scale rely on Bifrost\'s automatic failover and load balancing to maintain 99.99% uptime. When Anthropic hits rate limits, requests automatically route to Bedrock or Vertex AI.',
    },
    {
        icon: Users,
        title: 'Startups scaling AI development',
        description: 'Early-stage teams use Bifrost\'s LLM gateway to experiment with multiple providers without vendor lock-in. Semantic caching cuts costs and latency during rapid prototyping.',
    },
    {
        icon: Activity,
        title: 'Agentic coding with MCP tools',
        description: 'Developers connect Claude Code to databases, APIs, and deployment pipelines via MCP. Bifrost handles tool injection transparently, enabling automated database migrations and cloud deployment scripts.',
    },
];

const governanceFeatures = [
    {
        icon: Lock,
        title: 'Role-based access control',
        description: 'Define teams, roles, and environment-specific access at the organization level. Developers, platform engineers, and finance teams each get appropriate visibility and control.',
    },
    {
        icon: Activity,
        title: 'Comprehensive audit trails',
        description: 'Every request, policy enforcement action, and configuration change is logged with full context. Export audit trails to your SIEM or compliance platform.',
    },
    {
        icon: Shield,
        title: 'Content filtering and PII redaction',
        description: 'Bifrost\'s guardrails detect and redact sensitive information like SSNs, credit card numbers, and API keys before requests reach the model.',
    },
    {
        icon: Building2,
        title: 'In-VPC deployment',
        description: 'Deploy Bifrost entirely within your VPC for maximum security and data control. All LLM requests stay within your network perimeter.',
    },
];

const complianceBadges = [
    { icon: ShieldCheck, label: 'SOC 2 Type II', sub: 'Audited quarterly' },
    { icon: Globe, label: 'GDPR', sub: 'EU data residency' },
    { icon: Heart, label: 'HIPAA', sub: 'BAA available' },
    { icon: Award, label: 'ISO 27001', sub: 'Certified' },
];

export default function ClaudeCodePage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    <div className="text-center">
                        <span className="provider-badge">
                            [ CLAUDE CODE + BIFROST ]
                        </span>
                        <h1 className="text-4xl md:text-5xl font-normal text-gray-900 mb-4 leading-[1.2] tracking-tight text-center">
                            Enterprise LLM Gateway for
                            <br />
                            <span className="text-[var(--accent-text)]">Claude Code</span>
                        </h1>
                        <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed mb-8">
                            Use Bifrost to scale Claude Code across your organization with multi-provider routing, cost controls, security guardrails, role-based access control, and compliance-ready governance.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center w-full">
                            <PrimaryButton href="https://github.com/maximhq/bifrost" external>
                                Get started free
                                <ArrowRight className="w-4 h-4" />
                            </PrimaryButton>
                            <SecondaryButton href="https://docs.getbifrost.ai/" external>
                                View documentation
                                <ExternalLink className="w-4 h-4" />
                            </SecondaryButton>
                        </div>
                    </div>
                </div>
            </section>

            {/* Performance Stats */}
            <section className="py-10 bg-white">
                <div className="w-full">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-mono text-center mb-4">
                        [ PERFORMANCE AT A GLANCE ]
                    </p>
                    <div className="border-y border-gray-200">
                        <div className="max-w-7xl mx-auto">
                            <div className="grid grid-cols-2 md:grid-cols-6 divide-y md:divide-y-0">
                                <div className="hidden md:block md:col-span-1 border-r border-gray-200" />
                                {[
                                    { metric: '11µs', label: 'Mean Latency', description: 'Gateway overhead per request' },
                                    { metric: '5K RPS', label: 'Throughput', description: 'Requests per second sustained' },
                                    { metric: '50x', label: 'Faster', description: 'Than Python-based gateways' },
                                    { metric: '15+', label: 'Providers', description: 'Model APIs supported' },
                                ].map((item) => (
                                    <div
                                        key={item.label}
                                        className="text-center py-5 px-4 border-r border-gray-200 last:border-r-0"
                                    >
                                        <div className="text-xl md:text-2xl text-[var(--accent-text)] mb-1 leading-none font-mono">
                                            {item.metric}
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

            {/* The Problem */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                            [ THE PROBLEM ]
                        </p>
                        <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                            What happens when 50+ developers use Claude Code without governance
                        </h2>
                        <p className="text-gray-600 max-w-3xl mx-auto">
                            Claude Code is powerful out of the box for individual developers. But scaling it across an engineering organization surfaces problems that Anthropic doesn&apos;t solve.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {painPoints.map((item) => (
                            <div key={item.problem} className="bg-white p-6 border border-gray-200">
                                <item.icon className="w-6 h-6 text-gray-400 mb-4" />
                                <h3 className="text-gray-900 mb-2 text-sm font-medium">{item.problem}</h3>
                                <p className="text-xs text-gray-600 leading-relaxed">{item.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Architecture Flow */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                            [ HOW IT WORKS ]
                        </p>
                        <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                            Bifrost sits between Claude Code and the world
                        </h2>
                        <p className="text-gray-600 max-w-3xl mx-auto">
                            Bifrost acts as a transparent proxy. Developers set one environment variable and Claude Code routes through Bifrost automatically — no plugin, no agent, no code changes.
                        </p>
                    </div>

                    {/* Visual Flow */}
                    <div className="border border-gray-200 bg-gray-50 p-6 md:p-8 mb-8">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
                            <div className="flex items-center gap-3 text-center md:text-left">
                                <div className="w-12 h-12 flex items-center justify-center bg-white border border-gray-200">
                                    <Terminal className="w-6 h-6 text-gray-600" />
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-gray-900">Claude Code</div>
                                    <div className="text-xs text-gray-500">Developer&apos;s IDE</div>
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-1">
                                <ArrowRight className="w-5 h-5 text-gray-300 hidden md:block" />
                                <div className="w-px h-6 bg-gray-300 md:hidden" />
                                <span className="text-[10px] text-gray-400 font-mono">ANTHROPIC_BASE_URL</span>
                            </div>

                            <div className="flex items-center gap-3 text-center md:text-left">
                                <div className="w-12 h-12 flex items-center justify-center bg-[var(--accent)]/10 border border-[var(--accent-border)]">
                                    <Zap className="w-6 h-6 text-[var(--accent-text)]" />
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-gray-900">Bifrost Gateway</div>
                                    <div className="text-xs text-gray-500">Routing, guardrails, caching, observability</div>
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-1">
                                <ArrowRight className="w-5 h-5 text-gray-300 hidden md:block" />
                                <div className="w-px h-6 bg-gray-300 md:hidden" />
                                <span className="text-[10px] text-gray-400 font-mono">Failover routing</span>
                            </div>

                            <div className="flex items-center gap-3 text-center md:text-left">
                                <div className="w-12 h-12 flex items-center justify-center bg-white border border-gray-200">
                                    <Globe className="w-6 h-6 text-gray-600" />
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-gray-900">Model Providers</div>
                                    <div className="text-xs text-gray-500">Anthropic, Bedrock, Vertex AI</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Two perspectives */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="border border-gray-200 bg-white p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 flex items-center justify-center bg-[var(--accent)]/10 text-[var(--accent-text)]">
                                    <Terminal className="w-5 h-5" />
                                </div>
                                <h3 className="text-gray-900">For developers</h3>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                Nothing changes. Set one environment variable and Claude Code works exactly as before. Same API, same workflow, same speed. Bifrost is invisible.
                            </p>
                            <ul className="space-y-2">
                                {['No plugin or agent installation', 'No code changes required', 'Works with existing Claude Code config', 'Access to 15+ model providers transparently'].map((item) => (
                                    <li key={item} className="flex items-start gap-2.5">
                                        <CheckCircle2 className="w-4 h-4 text-[var(--accent-text)] mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="border border-gray-200 bg-white p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 flex items-center justify-center bg-[var(--accent)]/10 text-[var(--accent-text)]">
                                    <Server className="w-5 h-5" />
                                </div>
                                <h3 className="text-gray-900">For platform teams</h3>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                Full control. Set budgets per team, enforce guardrails, configure failover routes, and get real-time observability across every Claude Code request in the organization.
                            </p>
                            <ul className="space-y-2">
                                {['Per-team budgets with virtual keys', 'Content policies and PII redaction', 'Multi-provider failover configuration', 'Real-time dashboard and OTEL export'].map((item) => (
                                    <li key={item} className="flex items-start gap-2.5">
                                        <CheckCircle2 className="w-4 h-4 text-[var(--accent-text)] mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Features */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                            [ CORE CAPABILITIES ]
                        </p>
                        <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                            Enterprise Controls without Changing how Engineers Code
                        </h2>
                        <p className="text-gray-600 max-w-3xl mx-auto">
                        Bifrost manages request routing transparently, giving your entire engineering org centralized visibility, budget management, access controls, guardrails, and model performance.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {coreFeatures.map((feature) => (
                            <div key={feature.title} className="bg-white p-6 border border-gray-200 hover:border-[var(--accent-border)] hover:shadow-sm transition-all">
                                <feature.icon className="w-6 h-6 text-[var(--accent)] mb-4" />
                                <h3 className="text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed mb-4">{feature.description}</p>
                                <span className="inline-block text-xs font-mono text-[var(--accent-text)] bg-[var(--accent-light)] px-2 py-1">
                                    {feature.tag}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Setup Steps */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                            [ SETUP ]
                        </p>
                        <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                            Three Steps to Full Team Control
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            No SDK changes, no plugin installation, no developer workflow disruption.
                        </p>
                    </div>
                    <SetupSteps steps={setupSteps} />
                </div>
            </section>

            {/* Performance Stats */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center">
                        <div className="border-t border-b border-gray-200 w-full max-w-4xl">
                            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                                {[
                                    { metric: '11µs', label: 'Mean Latency', description: 'Gateway overhead per request' },
                                    { metric: '5K RPS', label: 'Throughput', description: 'Requests per second sustained' },
                                    { metric: '50x', label: 'Faster', description: 'Than Python-based gateways' },
                                    { metric: '15+', label: 'Providers', description: 'Model APIs supported' },
                                ].map((item, index) => (
                                    <div key={index} className="text-center py-5 px-4">
                                        <div className="text-2xl md:text-3xl text-[var(--accent-text)] mb-1 leading-none font-mono font-semibold">
                                            {item.metric}
                                        </div>
                                        <div className="text-xs text-gray-500 uppercase tracking-wider font-medium font-mono mb-1">
                                            {item.label}
                                        </div>
                                        <div className="text-xs text-gray-400">
                                            {item.description}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Enterprise Features Grid */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                            [ BUILT FOR PRODUCTION ]
                        </p>
                        <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                            Enterprise Features, Ready on Deploy
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Bifrost ships with the full set of controls platform teams expect before rolling out AI tooling organization-wide.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {enterpriseFeatures.map((feature) => (
                            <div key={feature.title} className="p-4 border border-gray-200 hover:border-[var(--accent)] bg-white hover:shadow-sm transition-all">
                                <feature.icon className="w-5 h-5 text-[var(--accent)] mb-3" />
                                <h3 className="text-gray-900 mb-1 text-sm">{feature.title}</h3>
                                <p className="text-xs text-gray-500 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                            [ COMPARISON ]
                        </p>
                        <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                            Claude Code alone vs. Claude Code + Bifrost
                        </h2>
                    </div>
                    <div className="border border-gray-200 bg-white overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50">
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Feature
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Claude Code (standalone)
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-[var(--accent-text)] uppercase tracking-wider">
                                        Claude Code + Bifrost
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {comparisonData.map((row, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3 text-sm text-gray-600">
                                            {row.feature}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-500">
                                            <span className="inline-flex items-center gap-1.5">
                                                {row.standalone === 'N/A' ? (
                                                    <span className="text-gray-400">{row.standalone}</span>
                                                ) : (
                                                    <>
                                                        <XCircle className="w-3.5 h-3.5 text-gray-400" />
                                                        {row.standalone}
                                                    </>
                                                )}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                            <span className="inline-flex items-center gap-1.5">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-text)]" />
                                                {row.withBifrost}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Enterprise Features Grid */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                            [ BUILT FOR PRODUCTION ]
                        </p>
                        <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                            Enterprise features, ready on deploy
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Bifrost ships with the full set of controls platform teams expect before rolling out AI tooling organization-wide.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {enterpriseFeatures.map((feature) => (
                            <div key={feature.title} className="p-4 border border-gray-200 hover:border-[var(--accent)] bg-white hover:shadow-sm transition-all">
                                <feature.icon className="w-5 h-5 text-[var(--accent)] mb-3" />
                                <h3 className="text-gray-900 mb-1 text-sm">{feature.title}</h3>
                                <p className="text-xs text-gray-500 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* MCP + Agentic Workflows */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                            [ AGENTIC WORKFLOWS ]
                        </p>
                        <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                        Native MCP Tool Support for Agentic Workflows
                        </h2>
                        <p className="text-gray-600 max-w-3xl mx-auto">
                            Bifrost connects Claude Code to filesystem tools, databases, web search, and custom integrations via Model Context Protocol — without modifying the Claude Code client or adding configuration steps on the developer side.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="border border-gray-200 bg-white p-6">
                            <div className="w-10 h-10 flex items-center justify-center bg-[var(--accent)]/10 text-[var(--accent-text)] mb-4">
                                <RefreshCw className="w-5 h-5" />
                            </div>
                            <h3 className="text-gray-900 mb-2">Multi-provider development</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Teams test code across Claude Sonnet, GPT-4, and Gemini from the same Claude Code workspace. Model performance and cost comparisons happen in real time inside Bifrost&apos;s dashboard.
                            </p>
                        </div>
                        <div className="border border-gray-200 bg-white p-6">
                            <div className="w-10 h-10 flex items-center justify-center bg-[var(--accent)]/10 text-[var(--accent-text)] mb-4">
                                <Cpu className="w-5 h-5" />
                            </div>
                            <h3 className="text-gray-900 mb-2">Agentic coding pipelines</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Claude Code combines with MCP-connected tools for database queries, API testing, deployment scripts, and custom integrations — all routed and monitored through a single gateway.
                            </p>
                        </div>
                        <div className="border border-gray-200 bg-white p-6">
                            <div className="w-10 h-10 flex items-center justify-center bg-[var(--accent)]/10 text-[var(--accent-text)] mb-4">
                                <Database className="w-5 h-5" />
                            </div>
                            <h3 className="text-gray-900 mb-2">Semantic caching at scale</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Repeat or near-identical queries across developers resolve instantly from cache. Teams running large codebases see up to 95% cost reduction on common operations like code explanations and documentation generation.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                            [ USE CASES ]
                        </p>
                        <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                            Real-world Scenarios where Bifrost Changes the Game
                        </h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {useCases.map((useCase) => (
                            <div key={useCase.title} className="bg-white p-6 border border-gray-200 hover:border-[var(--accent-border)] hover:shadow-sm transition-all">
                                <useCase.icon className="w-6 h-6 text-[var(--accent)] mb-4" />
                                <h3 className="text-gray-900 mb-2">{useCase.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{useCase.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Governance & Compliance */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                            [ GOVERNANCE &amp; COMPLIANCE ]
                        </p>
                        <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                            Built for enterprises with strict security requirements
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Bifrost ships with the governance features and compliance certifications platform teams need before rolling out AI tooling organization-wide.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {governanceFeatures.map((feature) => (
                            <div key={feature.title} className="p-6 border border-gray-200 bg-white">
                                <feature.icon className="w-6 h-6 text-[var(--accent)] mb-4" />
                                <h3 className="text-gray-900 mb-2 text-sm">{feature.title}</h3>
                                <p className="text-xs text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                    <div className="pt-8">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-mono text-center mb-6">
                            [ COMPLIANCE &amp; CERTIFICATIONS ]
                        </p>
                        <div className="flex justify-center">
                            <div className="border-t border-b border-gray-200 w-full max-w-4xl">
                                <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                                    {complianceBadges.map((badge) => (
                                        <div key={badge.label} className="text-center py-5 px-4">
                                            <badge.icon className="w-6 h-6 text-[var(--accent-text)] mx-auto mb-2" />
                                            <div className="text-sm md:text-base text-gray-900 mb-1 leading-none">
                                                {badge.label}
                                            </div>
                                            <div className="text-xs text-gray-400">
                                                {badge.sub}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                        Ready to bring enterprise controls to Claude Code?
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                        Bifrost is open source and production-ready. Teams get started in minutes and scale without rethinking the architecture.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center w-full">
                        <PrimaryButton href="https://github.com/maximhq/bifrost" external>
                            Get started free
                            <ArrowRight className="w-4 h-4" />
                        </PrimaryButton>
                        <SecondaryButton href="https://docs.getbifrost.ai/" external>
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
