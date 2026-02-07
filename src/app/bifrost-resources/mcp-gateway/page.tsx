import { Metadata } from 'next';
import PrimaryButton from '@/components/ui/PrimaryButton';
import SecondaryButton from '@/components/ui/SecondaryButton';
import FeatureMatrix from '@/components/resources/FeatureMatrix';
import DropInReplacement from '@/components/resources/DropInReplacement';
import {
    Activity,
    ArrowRight,
    BadgeCheck,
    CheckCircle2,
    ExternalLink,
    Globe,
    KeyRound,
    Plug,
    ShieldCheck,
    Terminal,
    Zap,
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'MCP Gateway | High-Performance Tool Execution for AI Agents',
    description: 'Connect AI models to external tools with an open-source MCP gateway that delivers 11µs overhead and complete security control.',
};

const performanceMetrics = [
    { label: 'Internal Overhead', value: '11µs', description: 'Ultra-low latency at high throughput' },
    { label: 'Performance', value: '50x Faster', description: 'Than LiteLLM and Python alternatives' },
    { label: 'Architecture', value: '100% Stateless', description: 'Complete control over execution' },
    { label: 'Provider Support', value: '15+', description: 'LLM providers supported' },
];

const coreFeatures = [
    {
        icon: Plug,
        title: 'Connect to MCP Servers',
        description: 'Connect via STDIO, HTTP, or SSE. Discover tools automatically from any MCP-compliant server.',
    },
    {
        icon: KeyRound,
        title: 'OAuth Authentication',
        description: 'Secure OAuth 2.0 authentication with automatic token refresh',
    },
    {
        icon: Activity,
        title: 'Tool Execution',
        description: 'Explicit approval workflows with complete audit trails for every execution.',
    },
    {
        icon: Zap,
        title: 'Agent Mode',
        description: 'Multi-step tool orchestration while keeping human oversight in the loop.',
    },
    {
        icon: Terminal,
        title: 'Code Mode',
        description: 'Let AI write Python to orchestrate multiple tools in one request.',
    },
    {
        icon: Globe,
        title: 'MCP Gateway URL',
        description: 'A single endpoint for tool discovery, execution, and management.',
    },
    {
        icon: ShieldCheck,
        title: 'Tool Hosting',
        description: 'Host internal MCP servers alongside third-party integrations with governance.',
    },
    {
        icon: CheckCircle2,
        title: 'Tool Filtering',
        description: 'Blacklist, whitelist, and apply role-based tool availability per request.',
    },
];

const workflowSteps = [
    { step: '01', title: 'Connect MCP Servers', description: 'Configure STDIO, HTTP, or SSE connections.' },
    { step: '02', title: 'Discover Tools', description: 'Bifrost discovers tools and their schemas automatically.' },
    { step: '03', title: 'AI Request', description: 'Your app sends a chat completion request to Bifrost.' },
    { step: '04', title: 'Tool Suggestions', description: 'Models suggest tools but do NOT execute them.' },
    { step: '05', title: 'Security Review', description: 'Your app validates and approves tool execution.' },
    { step: '06', title: 'Execute Tools', description: 'Only approved tools run and results return.' },
    { step: '07', title: 'Continue Chat', description: 'Results flow into the next model response.' },
];

const connectionTypes = [
    {
        icon: Terminal,
        title: 'STDIO',
        description: 'Local process execution via stdin/stdout.',
        bestFor: 'Local tools',
        useCases: ['Filesystem operations', 'Code search', 'Dev scripts'],
    },
    {
        icon: Globe,
        title: 'HTTP',
        description: 'Remote MCP servers via HTTP requests.',
        bestFor: 'Microservices',
        useCases: ['Database tools', 'Internal APIs', 'Authentication'],
    },
    {
        icon: Activity,
        title: 'SSE',
        description: 'Persistent streaming for real-time data.',
        bestFor: 'Live data',
        useCases: ['Monitoring', 'Live dashboards', 'Streaming'],
    },
];

const securityFeatures = [
    'No automatic execution',
    'Request-level filtering',
    'Tool blacklisting',
    'Permission mapping with RBAC',
    'Complete audit trail',
    'Environment-based controls',
];

const useCases = [
    { title: 'Code Review Agents', description: 'Controlled filesystem access for automated reviews and scans.' },
    { title: 'Database Agents', description: 'Read-first database operations with granular permissions.' },
    { title: 'Web Research Agents', description: 'Safe, rate-limited search and content extraction.' },
    { title: 'DevOps Automation', description: 'Supervised infrastructure actions and deployments.' },
    { title: 'Multi-Tool Workflows', description: 'Coordinate filesystem, DB, and API operations.' },
    { title: 'Data Analysis Agents', description: 'Automated reporting with full observability.' },
];

const deploymentOptions = [
    { title: 'NPX', description: 'Start in 30 seconds with npx for dev and prototyping.' },
    { title: 'Docker', description: 'Production-ready containers with persistent volumes.' },
    { title: 'Kubernetes', description: 'Enterprise clusters with scaling and load balancing.' },
    { title: 'Private Cloud', description: 'VPC deployments with custom security controls.' },
    { title: 'Self-Hosted', description: 'On-prem deployment with full data sovereignty.' },
];

const resourceLinks = [
    { label: 'Bifrost Documentation', href: 'https://docs.getbifrost.ai/' },
    { label: 'MCP Documentation', href: 'https://docs.getbifrost.ai/features/mcp' },
    { label: 'Quick Start Guide', href: 'https://docs.getbifrost.ai/quickstart/gateway/setting-up' },
    { label: 'Architecture Overview', href: 'https://www.getmaxim.ai/docs/bifrost/architecture/mcp' },
];

const differentiators = [
    '11µs overhead, 50x faster than alternatives',
    'Stateless architecture with explicit approval',
    'STDIO, HTTP, and SSE support',
    'Production-proven at millions of requests/day',
    'Built-in metrics, tracing, and audit trails',
    'Open source (Apache 2.0) with enterprise support',
];

export default function MCPGatewayPage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    <div className="text-center">
                        <span className="provider-badge">[ MCP GATEWAY ]</span>
                        <h1 className="text-4xl md:text-5xl font-normal text-gray-900 mb-4 leading-[1.2] tracking-tight text-center">
                            MCP Gateway Built for
                            <br />
                            <span className="text-[var(--accent-text)]">Speed &amp; Security</span>
                        </h1>
                        <p className="text-sm md:text-base text-gray-500 max-w-3xl mx-auto leading-relaxed mb-8">
                            Enable AI models to discover and execute external tools dynamically with the fastest open-source MCP gateway that delivers 11µs overhead and complete security control without automatic execution.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center w-full">
                            <PrimaryButton href="https://github.com/maximhq/bifrost" external>
                                Get started
                                <ArrowRight className="w-4 h-4" />
                            </PrimaryButton>
                            <SecondaryButton href="https://docs.getbifrost.ai/features/mcp" external>
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
                        [ OUR NUMBERS AT A GLANCE ]
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

            {/* Core Features */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                            [ CORE FEATURES ]
                        </p>
                        <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                            Complete MCP Gateway Solution
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Connect, secure, and execute tools with explicit approval and full observability.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {coreFeatures.map((item) => (
                            <div key={item.title} className="bg-white p-6 border border-gray-200 hover:border-[var(--accent-border)] hover:shadow-sm transition-all">
                                <item.icon className="w-6 h-6 text-[var(--accent)] mb-4" />
                                <h3 className="text-gray-900 mb-2 text-sm">{item.title}</h3>
                                <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Workflow */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                            [ WORKFLOW ]
                        </p>
                        <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                            How MCP Works in Bifrost
                        </h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {workflowSteps.map((step) => (
                            <div key={step.step} className="border border-gray-200 bg-white p-6">
                                <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-3">
                                    Step {step.step}
                                </p>
                                <h3 className="text-gray-900 mb-2">{step.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 grid md:grid-cols-3 gap-4">
                        <div className="border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
                            <strong className="text-gray-900">Security checkpoint:</strong> Every tool execution requires explicit approval.
                        </div>
                        <div className="border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
                            <strong className="text-gray-900">Stateless:</strong> Each step is independent with no automatic state management.
                        </div>
                        <div className="border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
                            <strong className="text-gray-900">Observable:</strong> Complete audit trails and metrics at every stage.
                        </div>
                    </div>
                </div>
            </section>

            {/* Connection Types */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                            [ CONNECTION TYPES ]
                        </p>
                        <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                            STDIO, HTTP, and SSE Support
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {connectionTypes.map((item) => (
                            <div key={item.title} className="bg-white p-6 border border-gray-200">
                                <item.icon className="w-6 h-6 text-[var(--accent)] mb-4" />
                                <h3 className="text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                                <div className="text-xs text-gray-500 space-y-1">
                                    <div><strong>Best for:</strong> {item.bestFor}</div>
                                </div>
                                <ul className="mt-3 text-xs text-gray-500 list-disc list-inside">
                                    {item.useCases.map((useCase) => (
                                        <li key={useCase}>{useCase}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Security */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                            [ SECURITY ]
                        </p>
                        <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                            Enterprise-Grade Security Controls
                        </h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {securityFeatures.map((item) => (
                            <div key={item} className="flex items-start gap-3 border border-gray-200 bg-white p-4">
                                <CheckCircle2 className="w-5 h-5 text-[var(--accent-text)] mt-0.5" />
                                <p className="text-sm text-gray-700">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                            [ USE CASES ]
                        </p>
                        <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                            What You Can Build
                        </h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {useCases.map((item) => (
                            <div key={item.title} className="bg-white p-6 border border-gray-200 hover:border-[var(--accent-border)] hover:shadow-sm transition-all">
                                <h3 className="text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Deployment */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                            [ DEPLOYMENT ]
                        </p>
                        <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                            Deployment Options
                        </h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {deploymentOptions.map((item) => (
                            <div key={item.title} className="border border-gray-200 bg-white p-6">
                                <h3 className="text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Resources */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                        [ RESOURCES ]
                    </p>
                    <h2 className="text-2xl md:text-3xl text-gray-900 mb-6">
                        Documentation and guides
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {resourceLinks.map((item) => (
                            <SecondaryButton key={item.label} href={item.href} external>
                                {item.label}
                                <ExternalLink className="w-4 h-4" />
                            </SecondaryButton>
                        ))}
                    </div>
                </div>
            </section>

            {/* Differentiators */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                        [ WHY BIFROST ]
                    </p>
                    <h2 className="text-2xl md:text-3xl text-gray-900 mb-6">
                        Key differentiators
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4 text-left">
                        {differentiators.map((item) => (
                            <div key={item} className="flex items-start gap-3 border border-gray-200 p-4">
                                <BadgeCheck className="w-5 h-5 text-[var(--accent-text)] mt-0.5" />
                                <p className="text-sm text-gray-700">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                        Build production AI agents with Bifrost
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                        Get enterprise-grade MCP gateway performance without compromising on security or control.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center w-full">
                        <PrimaryButton href="https://github.com/maximhq/bifrost" external>
                            Get started on GitHub
                            <ArrowRight className="w-4 h-4" />
                        </PrimaryButton>
                        <SecondaryButton href="https://docs.getbifrost.ai/" external>
                            View documentation
                            <ExternalLink className="w-4 h-4" />
                        </SecondaryButton>
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
