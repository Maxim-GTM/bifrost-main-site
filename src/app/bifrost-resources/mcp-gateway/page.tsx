import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import FeatureMatrix from '@/components/resources/FeatureMatrix'
import DropInReplacement from '@/components/resources/DropInReplacement'
import SetupSteps from '@/components/resources/SetupSteps'
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
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'MCP Gateway | High-Performance Tool Execution for AI Agents',
  description:
    'Connect AI models to external tools with an open-source MCP gateway that delivers 11µs overhead and complete security control.',
}

const performanceMetrics = [
  {
    label: 'Internal Overhead',
    value: '11µs',
    description: 'Ultra-low latency at high throughput',
  },
  { label: 'Token Savings', value: '50%+', description: 'With Code Mode vs classic MCP' },
  { label: 'Faster Execution', value: '40%', description: 'Code Mode execution pipeline' },
  { label: 'Provider Support', value: '20+', description: 'LLM providers supported' },
]

const setupSteps = [
  {
    step: '01',
    title: 'Register MCP servers',
    description:
      'Connect Bifrost to any MCP-compliant server. Bifrost auto-discovers available tools and their schemas at startup.',
    code: `# bifrost config
mcp_servers:
  - name: filesystem
    transport: stdio
    command: npx @modelcontextprotocol/server-filesystem`,
  },
  {
    step: '02',
    title: 'Send a chat request',
    description:
      'Your app sends a standard chat completion request. Bifrost injects discovered MCP tools into the request automatically.',
    code: `curl http://localhost:8080/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -d '{"model": "claude-sonnet", "messages": [...]}'`,
  },
  {
    step: '03',
    title: 'Execute tool calls',
    description:
      'When the LLM suggests a tool call, your app decides whether to execute it. Bifrost handles the MCP protocol and returns results.',
    code: `# tool call returned in response
# your app approves → Bifrost executes
# full audit trail logged automatically`,
  },
]

const coreCapabilities = [
  {
    icon: Plug,
    title: 'Connect to MCP servers',
    description:
      'Connect to any MCP-compliant server via STDIO, HTTP, or SSE. Bifrost auto-discovers tools and their schemas at runtime so your AI models can use them immediately.',
    tag: 'STDIO + HTTP + SSE',
  },
  {
    icon: KeyRound,
    title: 'OAuth Authentication',
    description: 'Secure OAuth 2.0 authentication with automatic token refresh',
    tag: 'OAuth 2.0 with automatic token refresh',
  },
  {
    icon: Play,
    title: 'Explicit tool execution',
    description:
      'Tool calls from LLMs are suggestions only. Execution requires a separate API call, giving your app full control to validate, filter, and approve every action before it runs.',
    tag: 'Security-first',
  },
  {
    icon: Zap,
    title: 'Agent Mode',
    description:
      'Enable autonomous multi-step tool execution with configurable auto-approval. Specify exactly which tools can auto-execute while keeping human oversight for sensitive operations.',
    tag: 'Configurable auto-approval',
  },
  {
    icon: Code2,
    title: 'Code Mode',
    description: 'Let AI write Python to orchestrate multiple tools in one request.',
    tag: 'Token efficiency',
  },
  {
    icon: Globe,
    title: 'MCP Gateway URL',
    description: 'A single endpoint for tool discovery, execution, and management.',
    tag: 'Single gateway URL',
  },
]

const securityPrinciples = [
  {
    icon: ShieldCheck,
    principle: 'Explicit execution',
    description:
      'Tool calls from LLMs are suggestions only. Execution requires a separate API call from your application.',
  },
  {
    icon: Filter,
    principle: 'Granular control',
    description:
      'Filter tools per-request, per-client, or per-virtual-key. Blacklist dangerous tools globally.',
  },
  {
    icon: Lock,
    principle: 'Opt-in auto-execution',
    description:
      'Agent Mode with auto-execution must be explicitly configured. Specify exactly which tools are allowed.',
  },
  {
    icon: Layers,
    principle: 'Stateless design',
    description:
      'Each API call is independent. Your app controls conversation state with full audit trails at every step.',
  },
]

const comparisonData = [
  {
    feature: 'Tool definition overhead',
    classic: '100+ tool schemas sent every request',
    bifrost: 'AI writes code to call tools',
  },
  {
    feature: 'Token usage',
    classic: 'High (all tool schemas in context)',
    bifrost: '50%+ reduction',
  },
  {
    feature: 'Execution latency',
    classic: 'Multiple round-trips per tool',
    bifrost: '40% faster execution',
  },
  {
    feature: 'Multi-tool orchestration',
    classic: 'Sequential tool calls only',
    bifrost: 'Python orchestrates in one pass',
  },
  {
    feature: 'Scalability with servers',
    classic: 'Degrades with 3+ servers',
    bifrost: 'Scales to any number',
  },
  {
    feature: 'Error handling',
    classic: 'LLM retries each tool call',
    bifrost: 'Python try/catch in sandbox',
  },
]

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
]

const securityFeatures = [
  'No automatic execution',
  'Request-level filtering',
  'Tool blacklisting',
  'Permission mapping with RBAC',
  'Complete audit trail',
  'Environment-based controls',
]

const useCases = [
  {
    icon: Wrench,
    title: 'Agentic coding pipelines',
    description:
      'Connect AI coding agents to filesystem tools, databases, and deployment pipelines. Bifrost handles tool injection transparently with full audit trails for every operation.',
  },
  {
    icon: Shield,
    title: 'Regulated enterprise environments',
    description:
      'Deploy in healthcare, finance, or government with explicit approval workflows, PII redaction, and tamper-evident audit logs for SOC 2 and HIPAA compliance.',
  },
  {
    icon: RefreshCw,
    title: 'Multi-tool orchestration',
    description:
      'Coordinate filesystem operations, database queries, and API calls in a single request using Code Mode. Reduce token waste and latency when using 3+ MCP servers.',
  },
  {
    icon: Cpu,
    title: 'DevOps & infrastructure automation',
    description:
      'Supervised infrastructure actions and deployments with role-based tool access. Only approved tools execute, with complete visibility into every automated step.',
  },
  {
    icon: KeyRound,
    title: 'Centralized tool governance',
    description:
      'Manage tool access across teams with virtual keys and per-key tool filtering. Set different tool policies for development, staging, and production environments.',
  },
  {
    icon: Globe,
    title: 'Claude Desktop & MCP clients',
    description:
      'Expose your entire tool ecosystem through a single Bifrost gateway URL. Claude Desktop and other MCP clients connect once and discover all available tools automatically.',
  },
]

const architectureFeatures = [
  {
    role: 'MCP Client',
    description:
      'Bifrost connects to your external MCP servers - filesystem tools, web search, databases, custom APIs, and discovers their capabilities automatically.',
    items: [
      'Auto-discover tools from any MCP server',
      'STDIO, HTTP, and SSE transports',
      'OAuth 2.0 with automatic token refresh',
      'Tool filtering and access control',
    ],
  },
  {
    role: 'MCP Server',
    description:
      'Bifrost exposes all connected tools through a single gateway URL. MCP clients like Claude Desktop connect to Bifrost and access everything.',
    items: [
      'Single gateway URL for all tools',
      'Claude Desktop, Cursor, and any MCP client',
      'Unified tool discovery and execution',
      'Centralized security and audit trails',
    ],
  },
]

export default function MCPGatewayPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="text-center">
            <span className="provider-badge">[ MCP GATEWAY ]</span>
            <h1 className="mb-4 text-center text-4xl leading-[1.2] font-normal tracking-tight text-gray-900 md:text-5xl">
              Turn AI Models into
              <br />
              <span className="text-[var(--accent-text)]">Action-Capable Agents</span>
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-sm leading-relaxed text-gray-500 md:text-base">
              Enable AI models to discover and execute external tools dynamically with the fastest
              open-source MCP gateway that delivers 11µs overhead and complete security control
              without automatic execution.
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
              <Link
                href="https://docs.getbifrost.ai/mcp/overview"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg">
                  MCP documentation
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

      {/* Architecture: Dual Role */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ ARCHITECTURE ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
              Complete MCP Gateway Solution
            </h2>
            <p className="mx-auto max-w-3xl text-gray-600">
              Bifrost acts as both an MCP client (connecting to external tool servers) and an MCP
              server (exposing tools to external clients like Claude Desktop) through a single
              deployment.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {architectureFeatures.map((arch) => (
              <div key={arch.role} className="relative border border-gray-200 bg-white p-6 md:p-8">
                <div className="absolute top-3 left-3 h-2 w-2 border-t border-l border-[var(--accent)] opacity-40" />
                <div className="absolute top-3 right-3 h-2 w-2 border-t border-r border-[var(--accent)] opacity-40" />
                <div className="absolute bottom-3 left-3 h-2 w-2 border-b border-l border-[var(--accent)] opacity-40" />
                <div className="absolute right-3 bottom-3 h-2 w-2 border-r border-b border-[var(--accent)] opacity-40" />
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center bg-[var(--accent)]/10 text-[var(--accent-text)]">
                    {arch.role === 'MCP Client' ? (
                      <Plug className="h-5 w-5" />
                    ) : (
                      <Server className="h-5 w-5" />
                    )}
                  </div>
                  <h3 className="text-lg text-gray-900">{arch.role}</h3>
                </div>
                <p className="mb-5 text-sm leading-relaxed text-gray-600">{arch.description}</p>
                <ul className="space-y-2.5">
                  {arch.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--accent-text)]" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {/* Architecture Flow */}
          <div className="relative mt-8 border border-gray-200 bg-white p-6">
            <div className="absolute top-3 left-3 h-2 w-2 border-t border-l border-[var(--accent)] opacity-40" />
            <div className="absolute top-3 right-3 h-2 w-2 border-t border-r border-[var(--accent)] opacity-40" />
            <div className="absolute bottom-3 left-3 h-2 w-2 border-b border-l border-[var(--accent)] opacity-40" />
            <div className="absolute right-3 bottom-3 h-2 w-2 border-r border-b border-[var(--accent)] opacity-40" />
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:gap-4">
              <div className="flex items-center gap-3 text-center md:text-left">
                <div className="flex h-10 w-10 items-center justify-center border border-blue-200 bg-blue-50 text-blue-600">
                  <Cpu className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Your Application</div>
                  <div className="text-xs text-gray-500">Chat completions API</div>
                </div>
              </div>
              <ArrowRight className="hidden h-5 w-5 text-gray-300 md:block" />
              <div className="h-6 w-px bg-gray-300 md:hidden" />
              <div className="flex items-center gap-3 text-center md:text-left">
                <div className="flex h-10 w-10 items-center justify-center border border-[var(--accent-border)] bg-[var(--accent)]/10 text-[var(--accent-text)]">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Bifrost Gateway</div>
                  <div className="text-xs text-gray-500">MCP Client + Server</div>
                </div>
              </div>
              <ArrowRight className="hidden h-5 w-5 text-gray-300 md:block" />
              <div className="h-6 w-px bg-gray-300 md:hidden" />
              <div className="flex items-center gap-3 text-center md:text-left">
                <div className="flex h-10 w-10 items-center justify-center border border-orange-200 bg-orange-50 text-orange-600">
                  <Wrench className="h-5 w-5" />
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
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ CORE CAPABILITIES ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">How MCP Works in Bifrost</h2>
            <p className="mx-auto max-w-3xl text-gray-600">
              Connect, secure, filter, and execute tools with explicit approval workflows,
              autonomous agent mode, and Code Mode for high-efficiency orchestration.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coreCapabilities.map((item) => (
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

      {/* How It Works - Setup Steps */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ HOW IT WORKS ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
              Stateless Tool Calling with Explicit Approval
            </h2>
            <p className="mx-auto max-w-3xl text-gray-600">
              The default tool calling pattern is stateless with explicit execution. No unintended
              API calls, no accidental data modifications, full audit trail of every operation.
            </p>
          </div>
          <SetupSteps steps={setupSteps} />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="relative border border-gray-200 bg-white p-4 text-sm text-gray-700">
              <div className="absolute top-2 left-2 h-1.5 w-1.5 border-t border-l border-[var(--accent)] opacity-40" />
              <div className="absolute top-2 right-2 h-1.5 w-1.5 border-t border-r border-[var(--accent)] opacity-40" />
              <div className="absolute bottom-2 left-2 h-1.5 w-1.5 border-b border-l border-[var(--accent)] opacity-40" />
              <div className="absolute right-2 bottom-2 h-1.5 w-1.5 border-r border-b border-[var(--accent)] opacity-40" />
              <strong className="text-gray-900">No automatic execution:</strong> Tool calls from
              LLMs are suggestions, your app decides what runs.
            </div>
            <div className="relative border border-gray-200 bg-white p-4 text-sm text-gray-700">
              <div className="absolute top-2 left-2 h-1.5 w-1.5 border-t border-l border-[var(--accent)] opacity-40" />
              <div className="absolute top-2 right-2 h-1.5 w-1.5 border-t border-r border-[var(--accent)] opacity-40" />
              <div className="absolute bottom-2 left-2 h-1.5 w-1.5 border-b border-l border-[var(--accent)] opacity-40" />
              <div className="absolute right-2 bottom-2 h-1.5 w-1.5 border-r border-b border-[var(--accent)] opacity-40" />
              <strong className="text-gray-900">Full audit trail:</strong> Every tool suggestion,
              approval, and execution is logged with metadata.
            </div>
            <div className="relative border border-gray-200 bg-white p-4 text-sm text-gray-700">
              <div className="absolute top-2 left-2 h-1.5 w-1.5 border-t border-l border-[var(--accent)] opacity-40" />
              <div className="absolute top-2 right-2 h-1.5 w-1.5 border-t border-r border-[var(--accent)] opacity-40" />
              <div className="absolute bottom-2 left-2 h-1.5 w-1.5 border-b border-l border-[var(--accent)] opacity-40" />
              <div className="absolute right-2 bottom-2 h-1.5 w-1.5 border-r border-b border-[var(--accent)] opacity-40" />
              <strong className="text-gray-900">Stateless design:</strong> Each API call is
              independent, your app controls conversation state entirely.
            </div>
          </div>
        </div>
      </section>

      {/* Code Mode Highlight */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
                [ CODE MODE ]
              </p>
              <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
                50% Fewer Tokens.
                <br />
                40% Faster Execution.
              </h2>
              <p className="mb-6 text-sm leading-relaxed text-gray-600">
                If you&apos;re using 3+ MCP servers, classic tool calling becomes expensive. Every
                request sends all tool schemas to the LLM, burning tokens on definitions instead of
                work.
              </p>
              <p className="mb-6 text-sm leading-relaxed text-gray-600">
                Code Mode takes a different approach: instead of exposing 100+ tool definitions, the
                AI writes Python code to orchestrate tools in a sandboxed environment. One
                round-trip handles what would take multiple sequential tool calls.
              </p>
              <div className="space-y-3">
                {[
                  'AI generates Python to orchestrate multiple tools',
                  'Sandboxed execution with full error handling',
                  'One round-trip replaces sequential tool calls',
                  'Scales to any number of MCP servers',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--accent-text)]" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="border border-gray-200 bg-gray-50 p-6">
                <div className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
                  Classic MCP
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Token usage</span>
                    <span className="font-mono text-sm text-gray-900">High</span>
                  </div>
                  <div className="h-2 w-full bg-gray-200">
                    <div className="h-2 w-full bg-gray-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Round-trips per workflow</span>
                    <span className="font-mono text-sm text-gray-900">N tools = N calls</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Scalability</span>
                    <span className="font-mono text-sm text-gray-900">Degrades at 3+ servers</span>
                  </div>
                </div>
              </div>
              <div className="border-2 border-[var(--accent-border)] bg-white p-6">
                <div className="mb-4 font-mono text-xs tracking-widest text-[var(--accent-text)] uppercase">
                  Bifrost Code Mode
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Token usage</span>
                    <span className="font-mono text-sm font-semibold text-[var(--accent-text)]">
                      50%+ reduction
                    </span>
                  </div>
                  <div className="h-2 w-full bg-gray-200">
                    <div className="h-2 w-[45%] bg-[var(--accent)]" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Round-trips per workflow</span>
                    <span className="font-mono text-sm font-semibold text-[var(--accent-text)]">
                      1 round-trip
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Scalability</span>
                    <span className="font-mono text-sm font-semibold text-[var(--accent-text)]">
                      Any number of servers
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Principles */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ SECURITY-FIRST DESIGN ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
              STDIO, HTTP, and SSE Support
            </h2>
            <p className="mx-auto max-w-3xl text-gray-600">
              By default, Bifrost does NOT automatically execute tool calls. All tool execution
              requires explicit API calls from your application, ensuring human oversight for every
              operation.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {securityPrinciples.map((item) => (
              <div key={item.principle} className="relative border border-gray-200 bg-white p-6">
                <div className="absolute top-3 left-3 h-2 w-2 border-t border-l border-[var(--accent)] opacity-40" />
                <div className="absolute top-3 right-3 h-2 w-2 border-t border-r border-[var(--accent)] opacity-40" />
                <div className="absolute bottom-3 left-3 h-2 w-2 border-b border-l border-[var(--accent)] opacity-40" />
                <div className="absolute right-3 bottom-3 h-2 w-2 border-r border-b border-[var(--accent)] opacity-40" />
                <item.icon className="mb-4 h-6 w-6 text-[var(--accent)]" />
                <h3 className="mb-2 text-gray-900">{item.principle}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table: Classic MCP vs Bifrost Code Mode */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ COMPARISON ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
              Enterprise-Grade Security Controls
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Standard MCP tool calling works, but it doesn&apos;t scale. Code Mode solves the hard
              problems.
            </p>
          </div>
          <div className="overflow-hidden border border-gray-200 bg-white">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Dimension
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Classic MCP
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-[var(--accent-text)] uppercase">
                    Bifrost Code Mode
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {comparisonData.map((row, index) => (
                  <tr key={index} className="transition-colors hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-600">{row.feature}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      <span className="inline-flex items-center gap-1.5">
                        <XCircle className="h-3.5 w-3.5 text-gray-400" />
                        {row.classic}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      <span className="inline-flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[var(--accent-text)]" />
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
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ TRANSPORT PROTOCOLS ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">What You Can Build</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {connectionTypes.map((item) => (
              <div
                key={item.title}
                className="relative border border-gray-200 bg-white p-6 transition-all hover:border-[var(--accent-border)] hover:shadow-sm"
              >
                <div className="absolute top-3 left-3 h-2 w-2 border-t border-l border-[var(--accent)] opacity-40" />
                <div className="absolute top-3 right-3 h-2 w-2 border-t border-r border-[var(--accent)] opacity-40" />
                <div className="absolute bottom-3 left-3 h-2 w-2 border-b border-l border-[var(--accent)] opacity-40" />
                <div className="absolute right-3 bottom-3 h-2 w-2 border-r border-b border-[var(--accent)] opacity-40" />
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center bg-[var(--accent)]/10 text-[var(--accent-text)]">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-gray-900">{item.title}</h3>
                  </div>
                </div>
                <p className="mb-3 text-sm leading-relaxed text-gray-600">{item.description}</p>
                <span className="mb-3 inline-block bg-[var(--accent-light)] px-2 py-1 font-mono text-xs text-[var(--accent-text)]">
                  {item.bestFor}
                </span>
                <ul className="list-inside list-disc text-xs text-gray-500">
                  {item.useCases.map((useCase) => (
                    <li key={useCase}>{useCase}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ USE CASES ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">Deployment Options</h2>
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
                <item.icon className="mb-4 h-6 w-6 text-[var(--accent)]" />
                <h3 className="mb-2 text-gray-900">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Bifrost */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ WHY BIFROST ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
              The Fastest Open-Source MCP Gateway
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              '11µs overhead at 5,000 requests per second',
              'Stateless architecture with explicit approval',
              'Code Mode: 50% fewer tokens, 40% faster execution',
              'Dual role: MCP Client and MCP Server',
              'Built-in OAuth 2.0 with automatic token refresh',
              'Production-proven at millions of requests/day',
              'Complete audit trails and OpenTelemetry export',
              'Open source (Apache 2.0) with enterprise support',
              'Go-native with zero Python GIL bottleneck',
            ].map((item) => (
              <div
                key={item}
                className="relative flex items-start gap-3 border border-gray-200 bg-white p-4"
              >
                <div className="absolute top-2 left-2 h-1.5 w-1.5 border-t border-l border-[var(--accent)] opacity-40" />
                <div className="absolute top-2 right-2 h-1.5 w-1.5 border-t border-r border-[var(--accent)] opacity-40" />
                <div className="absolute bottom-2 left-2 h-1.5 w-1.5 border-b border-l border-[var(--accent)] opacity-40" />
                <div className="absolute right-2 bottom-2 h-1.5 w-1.5 border-r border-b border-[var(--accent)] opacity-40" />
                <BadgeCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-[var(--accent-text)]" />
                <p className="text-sm text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
            Build production AI agents with Bifrost
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-600">
            Get enterprise-grade MCP gateway performance with explicit security controls, Code Mode
            for token efficiency, and a single gateway URL for your entire tool ecosystem.
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
            <Link
              href="https://docs.getbifrost.ai/mcp/overview"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg">
                Read MCP docs
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
