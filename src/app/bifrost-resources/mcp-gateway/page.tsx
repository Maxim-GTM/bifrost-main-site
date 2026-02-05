import { Metadata } from 'next';
import PrimaryButton from '@/components/ui/PrimaryButton';
import SecondaryButton from '@/components/ui/SecondaryButton';
import FeatureMatrix from '@/components/resources/FeatureMatrix';
import DropInReplacement from '@/components/resources/DropInReplacement';
import SetupSteps from '@/components/resources/SetupSteps';
import {
    Activity,
    ArrowRight,
    BadgeCheck,
    CheckCircle2,
    Code2,
    Cpu,
    ExternalLink,
    Filter,
    Globe,
    KeyRound,
    Layers,
    Lock,
    Play,
    Plug,
    RefreshCw,
    Server,
    Shield,
    ShieldCheck,
    Terminal,
    Wrench,
    XCircle,
    Zap,
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'MCP Gateway | High-Performance Tool Execution for AI Agents',
    description: 'Enable AI models to discover and execute external tools dynamically. The fastest open-source MCP gateway with 11µs overhead, Code Mode for 50% token savings, and complete security control.',
};

const performanceMetrics = [
    { label: 'Internal Overhead', value: '11µs', description: 'Ultra-low latency at high throughput' },
    { label: 'Token Savings', value: '50%+', description: 'With Code Mode vs classic MCP' },
    { label: 'Latency Reduction', value: '40-50%', description: 'Code Mode execution pipeline' },
    { label: 'Provider Support', value: '15+', description: 'LLM providers supported' },
];

const coreCapabilities = [
    {
        icon: Plug,
        title: 'Connect to MCP servers',
        description: 'Connect to any MCP-compliant server via STDIO, HTTP, or SSE. Bifrost auto-discovers tools and their schemas at runtime so your AI models can use them immediately.',
        tag: 'STDIO + HTTP + SSE',
    },
    {
        icon: Server,
        title: 'Expose as MCP server',
        description: 'Bifrost doubles as an MCP server. Connect Claude Desktop, Cursor, or any MCP client directly to your Bifrost instance and give them access to all connected tools through a single gateway URL.',
        tag: 'Claude Desktop ready',
    },
    {
        icon: Play,
        title: 'Explicit tool execution',
        description: 'Tool calls from LLMs are suggestions only. Execution requires a separate API call, giving your app full control to validate, filter, and approve every action before it runs.',
        tag: 'Security-first',
    },
    {
        icon: Zap,
        title: 'Agent Mode',
        description: 'Enable autonomous multi-step tool execution with configurable auto-approval. Specify exactly which tools can auto-execute while keeping human oversight for sensitive operations.',
        tag: 'Configurable auto-approval',
    },
    {
        icon: Code2,
        title: 'Code Mode',
        description: 'For 3+ MCP servers, Code Mode has the AI write Python to orchestrate tools in a sandbox instead of exposing 100+ tool definitions directly. Cuts tokens by 50%+ and latency by 40-50%.',
        tag: '50% fewer tokens',
    },
    {
        icon: Filter,
        title: 'Tool filtering & RBAC',
        description: 'Blacklist, whitelist, and apply role-based tool availability per request, per client, or per virtual key. Control exactly which tools are accessible in every context.',
        tag: 'Per-request control',
    },
];

const setupSteps = [
    {
        step: '01',
        title: 'Connect MCP servers',
        description: 'Configure your MCP server connections. Bifrost supports STDIO for local tools, HTTP for remote APIs, and SSE for real-time streaming.',
        code: `# bifrost config with MCP servers
mcp_servers:
  - name: "filesystem"
    transport: "stdio"
    command: "npx"
    args: ["-y", "@anthropic/mcp-filesystem"]
  - name: "database"
    transport: "http"
    url: "https://db-tools.internal/mcp"`,
    },
    {
        step: '02',
        title: 'Send a chat completion',
        description: 'Use the standard OpenAI-compatible API. Bifrost discovers available tools and includes them in the request. The LLM suggests tool calls but does NOT execute them.',
        code: `# standard chat completions API
curl -X POST http://localhost:8080/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -d '{"model": "gpt-4o",
       "messages": [{"role": "user",
         "content": "List files in /projects"}]}'`,
    },
    {
        step: '03',
        title: 'Execute approved tools',
        description: 'Review the suggested tool calls, apply your security rules, then explicitly execute only the approved ones. Results flow back into the conversation.',
        code: `# execute approved tool calls
curl -X POST http://localhost:8080/v1/mcp/tool/execute \\
  -H "Content-Type: application/json" \\
  -d '{"tool_call_id": "call_abc123",
       "name": "list_directory",
       "arguments": {"path": "/projects"}}'`,
    },
];

const securityPrinciples = [
    {
        icon: ShieldCheck,
        principle: 'Explicit execution',
        description: 'Tool calls from LLMs are suggestions only. Execution requires a separate API call from your application.',
    },
    {
        icon: Filter,
        principle: 'Granular control',
        description: 'Filter tools per-request, per-client, or per-virtual-key. Blacklist dangerous tools globally.',
    },
    {
        icon: Lock,
        principle: 'Opt-in auto-execution',
        description: 'Agent Mode with auto-execution must be explicitly configured. Specify exactly which tools are allowed.',
    },
    {
        icon: Layers,
        principle: 'Stateless design',
        description: 'Each API call is independent. Your app controls conversation state with full audit trails at every step.',
    },
];

const comparisonData = [
    { feature: 'Tool definition overhead', classic: '100+ tool schemas sent every request', bifrost: 'AI writes code to call tools' },
    { feature: 'Token usage', classic: 'High (all tool schemas in context)', bifrost: '50%+ reduction' },
    { feature: 'Execution latency', classic: 'Multiple round-trips per tool', bifrost: '40-50% faster' },
    { feature: 'Multi-tool orchestration', classic: 'Sequential tool calls only', bifrost: 'Python orchestrates in one pass' },
    { feature: 'Scalability with servers', classic: 'Degrades with 3+ servers', bifrost: 'Scales to any number' },
    { feature: 'Error handling', classic: 'LLM retries each tool call', bifrost: 'Python try/catch in sandbox' },
];

const connectionTypes = [
    {
        icon: Terminal,
        title: 'STDIO',
        description: 'Local process execution via stdin/stdout for filesystem tools, code search, git operations, and dev environment scripts.',
        latency: '1-10ms',
        bestFor: 'Local tools & dev environments',
    },
    {
        icon: Globe,
        title: 'HTTP',
        description: 'Remote MCP servers via stateless HTTP requests for database tools, internal APIs, microservices, and authentication systems.',
        latency: '10-500ms',
        bestFor: 'APIs & microservices',
    },
    {
        icon: Activity,
        title: 'SSE',
        description: 'Persistent server-sent events for real-time monitoring, live dashboards, streaming data, and event-driven tool workflows.',
        latency: 'Event-driven',
        bestFor: 'Real-time & streaming',
    },
];

const useCases = [
    {
        icon: Wrench,
        title: 'Agentic coding pipelines',
        description: 'Connect AI coding agents to filesystem tools, databases, and deployment pipelines. Bifrost handles tool injection transparently with full audit trails for every operation.',
    },
    {
        icon: Shield,
        title: 'Regulated enterprise environments',
        description: 'Deploy in healthcare, finance, or government with explicit approval workflows, PII redaction, and tamper-evident audit logs for SOC 2 and HIPAA compliance.',
    },
    {
        icon: RefreshCw,
        title: 'Multi-tool orchestration',
        description: 'Coordinate filesystem operations, database queries, and API calls in a single request using Code Mode. Reduce token waste and latency when using 3+ MCP servers.',
    },
    {
        icon: Cpu,
        title: 'DevOps & infrastructure automation',
        description: 'Supervised infrastructure actions and deployments with role-based tool access. Only approved tools execute, with complete visibility into every automated step.',
    },
    {
        icon: KeyRound,
        title: 'Centralized tool governance',
        description: 'Manage tool access across teams with virtual keys and per-key tool filtering. Set different tool policies for development, staging, and production environments.',
    },
    {
        icon: Globe,
        title: 'Claude Desktop & MCP clients',
        description: 'Expose your entire tool ecosystem through a single Bifrost gateway URL. Claude Desktop and other MCP clients connect once and discover all available tools automatically.',
    },
];

const architectureFeatures = [
    {
        role: 'MCP Client',
        description: 'Bifrost connects to your external MCP servers — filesystem tools, web search, databases, custom APIs — and discovers their capabilities automatically.',
        items: [
            'Auto-discover tools from any MCP server',
            'STDIO, HTTP, and SSE transports',
            'OAuth 2.0 with automatic token refresh',
            'Tool filtering and access control',
        ],
    },
    {
        role: 'MCP Server',
        description: 'Bifrost exposes all connected tools through a single gateway URL. MCP clients like Claude Desktop connect to Bifrost and access everything.',
        items: [
            'Single gateway URL for all tools',
            'Claude Desktop, Cursor, and any MCP client',
            'Unified tool discovery and execution',
            'Centralized security and audit trails',
        ],
    },
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
                            Turn AI Models into
                            <br />
                            <span className="text-[var(--accent-text)]">Action-Capable Agents</span>
                        </h1>
                        <p className="text-sm md:text-base text-gray-500 max-w-3xl mx-auto leading-relaxed mb-8">
                            Bifrost&apos;s MCP Gateway connects AI models to external tools — filesystems, databases, APIs, and custom integrations — with explicit security controls at every step. Acts as both MCP client and MCP server through a single deployment.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center w-full">
                            <PrimaryButton href="https://github.com/maximhq/bifrost" external>
                                Get started
                                <ArrowRight className="w-4 h-4" />
                            </PrimaryButton>
                            <SecondaryButton href="https://docs.getbifrost.ai/mcp/overview" external>
                                MCP documentation
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

            {/* Architecture: Dual Role */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                            [ ARCHITECTURE ]
                        </p>
                        <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                            One gateway, two roles
                        </h2>
                        <p className="text-gray-600 max-w-3xl mx-auto">
                            Bifrost acts as both an MCP client (connecting to external tool servers) and an MCP server (exposing tools to external clients like Claude Desktop) through a single deployment.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {architectureFeatures.map((arch) => (
                            <div key={arch.role} className="border border-gray-200 bg-white p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 flex items-center justify-center bg-[var(--accent)]/10 text-[var(--accent-text)]">
                                        {arch.role === 'MCP Client' ? (
                                            <Plug className="w-5 h-5" />
                                        ) : (
                                            <Server className="w-5 h-5" />
                                        )}
                                    </div>
                                    <h3 className="text-lg text-gray-900">{arch.role}</h3>
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed mb-5">{arch.description}</p>
                                <ul className="space-y-2.5">
                                    {arch.items.map((item) => (
                                        <li key={item} className="flex items-start gap-2.5">
                                            <CheckCircle2 className="w-4 h-4 text-[var(--accent-text)] mt-0.5 flex-shrink-0" />
                                            <span className="text-sm text-gray-700">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    {/* Architecture Flow */}
                    <div className="mt-8 border border-gray-200 bg-white p-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
                            <div className="flex items-center gap-3 text-center md:text-left">
                                <div className="w-10 h-10 flex items-center justify-center bg-blue-50 text-blue-600 border border-blue-200">
                                    <Cpu className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-gray-900">Your Application</div>
                                    <div className="text-xs text-gray-500">Chat completions API</div>
                                </div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-300 hidden md:block" />
                            <div className="w-px h-6 bg-gray-300 md:hidden" />
                            <div className="flex items-center gap-3 text-center md:text-left">
                                <div className="w-10 h-10 flex items-center justify-center bg-[var(--accent)]/10 text-[var(--accent-text)] border border-[var(--accent-border)]">
                                    <Zap className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-gray-900">Bifrost Gateway</div>
                                    <div className="text-xs text-gray-500">MCP Client + Server</div>
                                </div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-300 hidden md:block" />
                            <div className="w-px h-6 bg-gray-300 md:hidden" />
                            <div className="flex items-center gap-3 text-center md:text-left">
                                <div className="w-10 h-10 flex items-center justify-center bg-orange-50 text-orange-600 border border-orange-200">
                                    <Wrench className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-gray-900">MCP Servers</div>
                                    <div className="text-xs text-gray-500">Filesystem, DB, APIs</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Capabilities */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                            [ CORE CAPABILITIES ]
                        </p>
                        <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                            Everything you need for production tool execution
                        </h2>
                        <p className="text-gray-600 max-w-3xl mx-auto">
                            Connect, secure, filter, and execute tools with explicit approval workflows, autonomous agent mode, and Code Mode for high-efficiency orchestration.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {coreCapabilities.map((item) => (
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

            {/* How It Works - Setup Steps */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                            [ HOW IT WORKS ]
                        </p>
                        <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                            Stateless tool calling with explicit approval
                        </h2>
                        <p className="text-gray-600 max-w-3xl mx-auto">
                            The default tool calling pattern is stateless with explicit execution. No unintended API calls, no accidental data modifications, full audit trail of every operation.
                        </p>
                    </div>
                    <SetupSteps steps={setupSteps} />
                    <div className="mt-8 grid md:grid-cols-3 gap-4">
                        <div className="border border-gray-200 bg-white p-4 text-sm text-gray-700">
                            <strong className="text-gray-900">No automatic execution:</strong> Tool calls from LLMs are suggestions — your app decides what runs.
                        </div>
                        <div className="border border-gray-200 bg-white p-4 text-sm text-gray-700">
                            <strong className="text-gray-900">Full audit trail:</strong> Every tool suggestion, approval, and execution is logged with metadata.
                        </div>
                        <div className="border border-gray-200 bg-white p-4 text-sm text-gray-700">
                            <strong className="text-gray-900">Stateless design:</strong> Each API call is independent — your app controls conversation state entirely.
                        </div>
                    </div>
                </div>
            </section>

            {/* Code Mode Highlight */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                                [ CODE MODE ]
                            </p>
                            <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                                50% fewer tokens.<br />40% lower latency.
                            </h2>
                            <p className="text-sm text-gray-600 leading-relaxed mb-6">
                                If you&apos;re using 3+ MCP servers, classic tool calling becomes expensive. Every request sends all tool schemas to the LLM, burning tokens on definitions instead of work.
                            </p>
                            <p className="text-sm text-gray-600 leading-relaxed mb-6">
                                Code Mode takes a different approach: instead of exposing 100+ tool definitions, the AI writes Python code to orchestrate tools in a sandboxed environment. One round-trip handles what would take multiple sequential tool calls.
                            </p>
                            <div className="space-y-3">
                                {[
                                    'AI generates Python to orchestrate multiple tools',
                                    'Sandboxed execution with full error handling',
                                    'One round-trip replaces sequential tool calls',
                                    'Scales to any number of MCP servers',
                                ].map((item) => (
                                    <div key={item} className="flex items-start gap-2.5">
                                        <CheckCircle2 className="w-4 h-4 text-[var(--accent-text)] mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-gray-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="border border-gray-200 bg-gray-50 p-6">
                                <div className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">Classic MCP</div>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Token usage</span>
                                        <span className="text-sm text-gray-900 font-mono">High</span>
                                    </div>
                                    <div className="w-full bg-gray-200 h-2"><div className="bg-gray-400 h-2 w-full" /></div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Round-trips per workflow</span>
                                        <span className="text-sm text-gray-900 font-mono">N tools = N calls</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Scalability</span>
                                        <span className="text-sm text-gray-900 font-mono">Degrades at 3+ servers</span>
                                    </div>
                                </div>
                            </div>
                            <div className="border-2 border-[var(--accent-border)] bg-white p-6">
                                <div className="text-xs text-[var(--accent-text)] uppercase tracking-widest font-mono mb-4">Bifrost Code Mode</div>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Token usage</span>
                                        <span className="text-sm text-[var(--accent-text)] font-mono font-semibold">50%+ reduction</span>
                                    </div>
                                    <div className="w-full bg-gray-200 h-2"><div className="bg-[var(--accent)] h-2 w-[45%]" /></div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Round-trips per workflow</span>
                                        <span className="text-sm text-[var(--accent-text)] font-mono font-semibold">1 round-trip</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Scalability</span>
                                        <span className="text-sm text-[var(--accent-text)] font-mono font-semibold">Any number of servers</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Security Principles */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                            [ SECURITY-FIRST DESIGN ]
                        </p>
                        <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                            No tool runs unless you approve it
                        </h2>
                        <p className="text-gray-600 max-w-3xl mx-auto">
                            By default, Bifrost does NOT automatically execute tool calls. All tool execution requires explicit API calls from your application, ensuring human oversight for every operation.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {securityPrinciples.map((item) => (
                            <div key={item.principle} className="bg-white p-6 border border-gray-200">
                                <item.icon className="w-6 h-6 text-[var(--accent)] mb-4" />
                                <h3 className="text-gray-900 mb-2 text-sm font-medium">{item.principle}</h3>
                                <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Table: Classic MCP vs Bifrost Code Mode */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                            [ COMPARISON ]
                        </p>
                        <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                            Classic MCP vs Bifrost Code Mode
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Standard MCP tool calling works, but it doesn&apos;t scale. Code Mode solves the hard problems.
                        </p>
                    </div>
                    <div className="border border-gray-200 bg-white overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50">
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Dimension
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Classic MCP
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-[var(--accent-text)] uppercase tracking-wider">
                                        Bifrost Code Mode
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
                                                <XCircle className="w-3.5 h-3.5 text-gray-400" />
                                                {row.classic}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                            <span className="inline-flex items-center gap-1.5">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-text)]" />
                                                {row.bifrost}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Connection Types */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                            [ TRANSPORT PROTOCOLS ]
                        </p>
                        <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                            Connect any way you need
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {connectionTypes.map((item) => (
                            <div key={item.title} className="bg-white p-6 border border-gray-200 hover:border-[var(--accent-border)] hover:shadow-sm transition-all">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 flex items-center justify-center bg-[var(--accent)]/10 text-[var(--accent-text)]">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-gray-900">{item.title}</h3>
                                        <div className="text-xs text-gray-400 font-mono">{item.latency}</div>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed mb-3">{item.description}</p>
                                <span className="inline-block text-xs font-mono text-[var(--accent-text)] bg-[var(--accent-light)] px-2 py-1">
                                    {item.bestFor}
                                </span>
                            </div>
                        ))}
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
                            What teams build with Bifrost MCP
                        </h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {useCases.map((item) => (
                            <div key={item.title} className="bg-white p-6 border border-gray-200 hover:border-[var(--accent-border)] hover:shadow-sm transition-all">
                                <item.icon className="w-6 h-6 text-[var(--accent)] mb-4" />
                                <h3 className="text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Bifrost */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                            [ WHY BIFROST ]
                        </p>
                        <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                            The fastest open-source MCP gateway
                        </h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            '11µs overhead at 5,000 requests per second',
                            'Stateless architecture with explicit approval',
                            'Code Mode: 50% fewer tokens, 40% lower latency',
                            'Dual role: MCP Client and MCP Server',
                            'Built-in OAuth 2.0 with automatic token refresh',
                            'Production-proven at millions of requests/day',
                            'Complete audit trails and OpenTelemetry export',
                            'Open source (Apache 2.0) with enterprise support',
                            'Go-native with zero Python GIL bottleneck',
                        ].map((item) => (
                            <div key={item} className="flex items-start gap-3 border border-gray-200 bg-white p-4">
                                <BadgeCheck className="w-5 h-5 text-[var(--accent-text)] mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-gray-700">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                        Build production AI agents with Bifrost
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                        Get enterprise-grade MCP gateway performance with explicit security controls, Code Mode for token efficiency, and a single gateway URL for your entire tool ecosystem.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center w-full">
                        <PrimaryButton href="https://github.com/maximhq/bifrost" external>
                            Get started on GitHub
                            <ArrowRight className="w-4 h-4" />
                        </PrimaryButton>
                        <SecondaryButton href="https://docs.getbifrost.ai/mcp/overview" external>
                            Read MCP docs
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
