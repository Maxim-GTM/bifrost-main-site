import { Metadata } from 'next'
import SetupSteps from '@/components/resources/SetupSteps'
import FeatureMatrix from '@/components/resources/FeatureMatrix'
import DropInReplacement from '@/components/resources/DropInReplacement'
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
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Claude Code + Bifrost | Enterprise LLM Gateway for Claude Code',
  description:
    'Add multi-provider routing, cost control, guardrails, and governance to Claude Code at scale with Bifrost - the fastest enterprise LLM gateway.',
}

const painPoints = [
  {
    icon: DollarSign,
    problem: 'No cost visibility',
    detail:
      'No way to track which teams, projects, or developers are driving Claude Code spend. Budgets are managed manually.',
  },
  {
    icon: AlertTriangle,
    problem: 'Single provider dependency',
    detail:
      'When Anthropic hits rate limits or has an outage, every developer using Claude Code stops working. No fallback, no failover.',
  },
  {
    icon: Shield,
    problem: 'No guardrails at scale',
    detail:
      'Sensitive data, PII, and internal code flow freely through the API. No content policies, no redaction, no audit trail for compliance.',
  },
  {
    icon: Eye,
    problem: 'Zero observability',
    detail:
      'No centralized view of requests, token usage, latency, or error rates. Platform teams fly blind when rolling out AI tooling org-wide.',
  },
]

const coreFeatures = [
  {
    icon: DollarSign,
    title: 'Cost management and optimization',
    description:
      'Track LLM spend per request with breakdowns by provider, model, team, and developer. Virtual keys enforce team-level budgets. Semantic caching reduces costs on repeat queries.',
    tag: 'LLM cost control + budgets',
  },
  {
    icon: RefreshCw,
    title: 'Multi-provider routing with failover',
    description:
      'Automatic failover across Anthropic, AWS Bedrock, and Google Vertex AI when rate limits or outages hit. Adaptive load balancing keeps throughput stable even under heavy load.',
    tag: '99.99% uptime target',
  },
  {
    icon: Shield,
    title: 'Guardrails and governance',
    description:
      'Enforce content policies, PII redaction, and safety checks before requests reach the model. Role-based access controls and rate limits per team provide fine-grained LLM governance across the organization.',
    tag: 'AWS Bedrock + Azure AI',
  },
  {
    icon: Zap,
    title: 'Reduce latency, high throughput',
    description:
      'Built in Go for production workloads. Bifrost adds only 11µs mean overhead at 5,000 requests per second, making it 50x faster than Python-based gateways. Coding workflows stay fast at scale.',
    tag: '11µs @ 5K RPS',
  },
  {
    icon: Eye,
    title: 'Centralized LLM API observability',
    description:
      'Every Claude Code request is logged with full metadata including user, team, provider, route, token count, and latency. Filter and export through the dashboard or push to any observability stack via OpenTelemetry.',
    tag: 'OTEL native',
  },
  {
    icon: KeyRound,
    title: 'Centralized credential management',
    description:
      'API keys for all providers live in one place. Integrate with HashiCorp Vault for secure key storage or manage them directly in Bifrost. SSO support for Google, GitHub, and enterprise identity providers.',
    tag: 'Vault + SSO ready',
  },
]

const setupSteps = [
  {
    step: '01',
    title: 'Deploy Bifrost',
    description:
      'Bifrost runs as a standalone Go service. Teams deploy it in-VPC or via managed hosting. No agent installation on developer machines.',
    code: `# pull and start bifrost
docker pull bifrost-gateway
docker run -p 8080:8080 bifrost`,
  },
  {
    step: '02',
    title: 'Point Claude Code at it',
    description:
      'Developers set one environment variable. Claude Code sends all requests through Bifrost without any code changes or plugin installation.',
    code: `export ANTHROPIC_BASE_URL="http://localhost:8080"
# that's it - claude code just works`,
  },
  {
    step: '03',
    title: 'Configure from the dashboard',
    description:
      "Set team budgets, apply guardrails, configure provider fallbacks, and view real-time analytics, all from Bifrost's web interface. No code required.",
    code: `# dashboard available at
localhost:8080/logs
# virtual keys, budgets, guardrails`,
  },
]

const enterpriseFeatures = [
  {
    icon: Zap,
    title: 'Automatic failovers',
    description: 'Requests reroute seamlessly when a provider fails or hits rate limits.',
  },
  {
    icon: Gauge,
    title: 'Adaptive load balancing',
    description: 'Traffic distributes intelligently based on real-time health signals.',
  },
  {
    icon: Database,
    title: 'Semantic caching',
    description: 'Repeat or near-identical queries resolve instantly, cutting costs and reducing latency.',
  },
  {
    icon: KeyRound,
    title: 'Virtual keys & budgets',
    description: 'Create separate virtual API keys for each team with independent limits.',
  },
  {
    icon: Shield,
    title: 'Guardrails',
    description: 'Enforce content policies, PII redaction, and safety checks.',
  },
  {
    icon: FileText,
    title: 'Audit logs',
    description: 'Complete, tamper-evident record of every request for compliance.',
  },
  {
    icon: Lock,
    title: 'SSO integration',
    description: 'Authenticate via Google, GitHub, Okta, or any SAML/OIDC provider.',
  },
  {
    icon: Server,
    title: 'Vault support',
    description: 'API keys stored in HashiCorp Vault, never touch developer machines.',
  },
  {
    icon: Globe,
    title: 'Cluster mode',
    description: 'Horizontal scaling with zero downtime across multiple nodes.',
  },
  {
    icon: Cpu,
    title: 'Code Mode (MCP)',
    description: 'AI generates Python to orchestrate multiple MCP tools in one execution.',
  },
  {
    icon: Bell,
    title: 'Alerts',
    description: 'Threshold-based alerts for cost overruns, rate limits, and errors.',
  },
  {
    icon: Activity,
    title: 'MCP Gateway',
    description: 'Inject filesystem tools, database connectors, and custom integrations.',
  },
]

const comparisonData = [
  { feature: 'Multi-model support', standalone: false, withBifrost: '20+ providers' },
  { feature: 'MCP tool gateway', standalone: false, withBifrost: 'Full MCP injection' },
  { feature: 'Cost tracking', standalone: false, withBifrost: 'Real-time per-request' },
  { feature: 'Provider failover', standalone: false, withBifrost: 'Automatic across providers' },
  { feature: 'Semantic caching', standalone: false, withBifrost: 'Reduce costs and latency' },
  { feature: 'Team budgets', standalone: false, withBifrost: 'Virtual keys + limits' },
  {
    feature: 'Request observability',
    standalone: false,
    withBifrost: 'Full log trail + OTEL export',
  },
  { feature: 'Gateway latency', standalone: null, withBifrost: '11µs at 5,000 RPS' },
]

const useCases = [
  {
    icon: DollarSign,
    title: 'Enterprise cost management',
    description:
      'Platform teams set department-level budgets for Claude Code usage. Real-time cost tracking surfaces which teams, projects, or developers are driving LLM spend. Automated alerts fire when budgets approach limits.',
  },
  {
    icon: RefreshCw,
    title: 'Multi-model testing and comparison',
    description:
      'Engineering teams route the same Claude Code workflow through Claude Sonnet, GPT-4, and Gemini to compare code quality, latency, and cost. Bifrost logs performance metrics for each provider.',
  },
  {
    icon: Shield,
    title: 'Regulatory compliance and governance',
    description:
      "Organizations in healthcare, finance, or government use Bifrost's guardrails to enforce PII redaction and content policies. Audit logs provide tamper-evident records for SOC 2, HIPAA, and GDPR compliance.",
  },
  {
    icon: Zap,
    title: 'High-availability production deployments',
    description:
      "Teams running Claude Code at scale rely on Bifrost's automatic failover and load balancing to maintain 99.99% uptime. When Anthropic hits rate limits, requests automatically route to Bedrock or Vertex AI.",
  },
  {
    icon: Users,
    title: 'Startups scaling AI development',
    description:
      "Early-stage teams use Bifrost's LLM gateway to experiment with multiple providers without vendor lock-in. Semantic caching cuts costs and latency during rapid prototyping.",
  },
  {
    icon: Activity,
    title: 'Agentic coding with MCP tools',
    description:
      'Developers connect Claude Code to databases, APIs, and deployment pipelines via MCP. Bifrost handles tool injection transparently, enabling automated database migrations and cloud deployment scripts.',
  },
]

const governanceFeatures = [
  {
    icon: Lock,
    title: 'Role-based access control',
    description:
      'Define teams, roles, and environment-specific access at the organization level. Developers, platform engineers, and finance teams each get appropriate visibility and control.',
  },
  {
    icon: Activity,
    title: 'Comprehensive audit trails',
    description:
      'Every request, policy enforcement action, and configuration change is logged with full context. Export audit trails to your SIEM or compliance platform.',
  },
  {
    icon: Shield,
    title: 'Content filtering and PII redaction',
    description:
      "Bifrost's guardrails detect and redact sensitive information like SSNs, credit card numbers, and API keys before requests reach the model.",
  },
  {
    icon: Building2,
    title: 'In-VPC deployment',
    description:
      'Deploy Bifrost entirely within your VPC for maximum security and data control. All LLM requests stay within your network perimeter.',
  },
]

const complianceBadges = [
  { icon: ShieldCheck, label: 'SOC 2 Type II', sub: 'Audited quarterly' },
  { icon: Globe, label: 'GDPR', sub: 'EU data residency' },
  { icon: Heart, label: 'HIPAA', sub: 'BAA available' },
  { icon: Award, label: 'ISO 27001', sub: 'Certified' },
]

export default function ClaudeCodePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="text-center">
            <span className="provider-badge">[ CLAUDE CODE + BIFROST ]</span>
            <h1 className="mb-4 text-center text-4xl leading-[1.2] font-normal tracking-tight text-gray-900 md:text-5xl">
              Enterprise LLM Gateway for
              <br />
              <span className="text-[var(--accent-text)]">Claude Code</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-gray-500 md:text-base">
              Use Bifrost to scale Claude Code across your organization with multi-provider routing,
              cost controls, security guardrails, role-based access control, and compliance-ready
              governance.
            </p>

            {/* CTAs */}
            <div className="flex w-full flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
              <Link
                href="https://github.com/maximhq/bifrost"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg">
                  Get started free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>

              <Link href="https://docs.getbifrost.ai/quickstart/gateway/cli-agents#claude-code" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg">
                  View documentation
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Stats */}
      <section className="bg-white py-10">
        <div className="w-full">
          <p className="mb-4 text-center font-mono text-[10px] tracking-widest text-gray-400 uppercase">
            [ PERFORMANCE AT A GLANCE ]
          </p>
          <div className="border-y border-gray-200">
            <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-2 divide-y md:grid-cols-6 md:divide-y-0">
                <div className="hidden border-r border-gray-200 md:col-span-1 md:block" />
                {[
                  {
                    metric: '11µs',
                    label: 'Mean Latency',
                    description: 'Gateway overhead per request',
                  },
                  {
                    metric: '5K RPS',
                    label: 'Throughput',
                    description: 'Requests per second sustained',
                  },
                  { metric: '50x', label: 'Faster', description: 'Than Python-based gateways' },
                  { metric: '20+', label: 'Providers', description: 'Model APIs supported' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="border-r border-gray-200 px-4 py-5 text-center last:border-r-0"
                  >
                    <div className="mb-1 font-mono text-xl leading-none text-[var(--accent-text)] md:text-2xl">
                      {item.metric}
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

      {/* The Problem */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ THE PROBLEM ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
              What Happens When 50+ Developers use Claude Code without Governance
            </h2>
            <p className="mx-auto max-w-3xl text-gray-600">
              Claude Code is powerful out of the box for individual developers. But scaling it
              across an engineering organization surfaces problems that Anthropic doesn&apos;t
              solve.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {painPoints.map((item) => (
              <div key={item.problem} className="border border-gray-200 bg-white p-6">
                <item.icon className="mb-4 h-6 w-6 text-gray-400" />
                <h3 className="mb-2 text-sm font-medium text-gray-900">{item.problem}</h3>
                <p className="text-xs leading-relaxed text-gray-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Flow */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ HOW IT WORKS ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
             Zero-Friction Integration: How Bifrost Works with Claude Code
            </h2>
            <p className="mx-auto max-w-3xl text-gray-600">
            Set one environment variable to route Claude Code through Bifrost, developers work unchanged while platform teams gain full control over budgets, guardrails, failover routing, and real-time observability across 20+ providers.
            </p>
          </div>

          {/* Visual Flow */}
          <div className="mb-8 border border-gray-200 bg-gray-50 p-6 md:p-8">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:gap-4">
              <div className="flex items-center gap-3 text-center md:text-left">
                <div className="flex h-12 w-12 items-center justify-center border border-gray-200 bg-white">
                  <Terminal className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Claude Code</div>
                  <div className="text-xs text-gray-500">Developer&apos;s IDE</div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-1">
                <ArrowRight className="hidden h-5 w-5 text-gray-300 md:block" />
                <div className="h-6 w-px bg-gray-300 md:hidden" />
                <span className="font-mono text-[10px] text-gray-400">ANTHROPIC_BASE_URL</span>
              </div>

              <div className="flex items-center gap-3 text-center md:text-left">
                <div className="flex h-12 w-12 items-center justify-center border border-[var(--accent-border)] bg-[var(--accent)]/10">
                  <Zap className="h-6 w-6 text-[var(--accent-text)]" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Bifrost Gateway</div>
                  <div className="text-xs text-gray-500">
                    Routing, guardrails, caching, observability
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-1">
                <ArrowRight className="hidden h-5 w-5 text-gray-300 md:block" />
                <div className="h-6 w-px bg-gray-300 md:hidden" />
                <span className="font-mono text-[10px] text-gray-400">Failover routing</span>
              </div>

              <div className="flex items-center gap-3 text-center md:text-left">
                <div className="flex h-12 w-12 items-center justify-center border border-gray-200 bg-white">
                  <Globe className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Model Providers</div>
                  <div className="text-xs text-gray-500">Anthropic, Bedrock, Vertex AI</div>
                </div>
              </div>
            </div>
          </div>

          {/* Two perspectives */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="border border-gray-200 bg-white p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center bg-[var(--accent)]/10 text-[var(--accent-text)]">
                  <Terminal className="h-5 w-5" />
                </div>
                <h3 className="text-gray-900">For developers</h3>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-gray-600">
                Nothing changes. Set one environment variable and Claude Code works exactly as
                before. Same API, same workflow, same speed.
              </p>
              <ul className="space-y-2">
                {[
                  'No plugin or agent installation',
                  'No code changes required',
                  'Works with existing Claude Code config',
                  'Access to 20+ model providers transparently',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--accent-text)]" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-gray-200 bg-white p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center bg-[var(--accent)]/10 text-[var(--accent-text)]">
                  <Server className="h-5 w-5" />
                </div>
                <h3 className="text-gray-900">For platform teams</h3>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-gray-600">
                Full control. Set budgets per team, enforce guardrails, configure failover routes,
                and get real-time observability across every Claude Code request in the
                organization.
              </p>
              <ul className="space-y-2">
                {[
                  'Per-team budgets with virtual keys',
                  'Content policies and PII redaction',
                  'Multi-provider failover configuration',
                  'Real-time dashboard and OTEL export',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--accent-text)]" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ CORE CAPABILITIES ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
              Enterprise Controls without Changing how Engineers Code
            </h2>
            <p className="mx-auto max-w-3xl text-gray-600">
              Bifrost manages request routing transparently, giving your entire engineering org
              centralized visibility, budget management, access controls, guardrails, and model
              performance.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coreFeatures.map((feature) => (
              <div
                key={feature.title}
                className="border border-gray-200 bg-white p-6 transition-all hover:border-[var(--accent-border)] hover:shadow-sm"
              >
                <feature.icon className="mb-4 h-6 w-6 text-[var(--accent)]" />
                <h3 className="mb-2 text-gray-900">{feature.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-gray-600">{feature.description}</p>
                <span className="inline-block bg-[var(--accent-light)] px-2 py-1 font-mono text-xs text-[var(--accent-text)]">
                  {feature.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Setup Steps */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ SETUP ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
              Three Steps to Full Team Control
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              No SDK changes, no plugin installation, no developer workflow disruption.
            </p>
          </div>
          <SetupSteps steps={setupSteps} />
        </div>
      </section>

      {/* Performance Stats */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="w-full max-w-4xl border-t border-b border-gray-200">
              <div className="grid grid-cols-2 divide-y divide-gray-200 md:grid-cols-4 md:divide-x md:divide-y-0">
                {[
                  {
                    metric: '11µs',
                    label: 'Mean Latency',
                    description: 'Gateway overhead per request',
                  },
                  {
                    metric: '5K RPS',
                    label: 'Throughput',
                    description: 'Requests per second sustained',
                  },
                  { metric: '50x', label: 'Faster', description: 'Than Python-based gateways' },
                  { metric: '20+', label: 'Providers', description: 'Model APIs supported' },
                ].map((item, index) => (
                  <div key={index} className="px-4 py-5 text-center">
                    <div className="mb-1 font-mono text-2xl leading-none font-semibold text-[var(--accent-text)] md:text-3xl">
                      {item.metric}
                    </div>
                    <div className="mb-1 font-mono text-xs font-medium tracking-wider text-gray-500 uppercase">
                      {item.label}
                    </div>
                    <div className="text-xs text-gray-400">{item.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Features Grid */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ BUILT FOR PRODUCTION ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
              Enterprise Features, Ready on Deploy
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Bifrost ships with the full set of controls platform teams expect before rolling out
              AI tooling organization-wide.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {enterpriseFeatures.map((feature) => (
              <div
                key={feature.title}
                className="border border-gray-200 bg-white p-4 transition-all hover:border-[var(--accent)] hover:shadow-sm"
              >
                <feature.icon className="mb-3 h-5 w-5 text-[var(--accent)]" />
                <h3 className="mb-1 text-sm text-gray-900">{feature.title}</h3>
                <p className="text-xs leading-relaxed text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ COMPARISON ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
              Claude Code alone vs. Claude Code + Bifrost
            </h2>
          </div>
          <div className="overflow-hidden border border-gray-200 bg-white">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Feature
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Claude Code (standalone)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-[var(--accent-text)] uppercase">
                    Claude Code + Bifrost
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {comparisonData.map((row, index) => (
                  <tr key={index} className="transition-colors hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-600">{row.feature}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      <span className="inline-flex items-center gap-1.5">
                        {row.standalone === null ? (
                          <span className="text-gray-400">N/A</span>
                        ) : (
                          <>
                            <XCircle className="h-3.5 w-3.5 text-gray-400" />
                            No
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      <span className="inline-flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[var(--accent-text)]" />
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
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ BUILT FOR PRODUCTION ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
              Enterprise Features, Ready on Deploy
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Bifrost ships with the full set of controls platform teams expect before rolling out
              AI tooling organization-wide.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {enterpriseFeatures.map((feature) => (
              <div
                key={feature.title}
                className="border border-gray-200 bg-white p-4 transition-all hover:border-[var(--accent)] hover:shadow-sm"
              >
                <feature.icon className="mb-3 h-5 w-5 text-[var(--accent)]" />
                <h3 className="mb-1 text-sm text-gray-900">{feature.title}</h3>
                <p className="text-xs leading-relaxed text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MCP + Agentic Workflows */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ AGENTIC WORKFLOWS ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
              Native MCP Tool Support for Agentic Workflows
            </h2>
            <p className="mx-auto max-w-3xl text-gray-600">
              Bifrost connects Claude Code to filesystem tools, databases, web search, and custom
              integrations via Model Context Protocol without modifying the Claude Code client or
              adding configuration steps on the developer side.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="border border-gray-200 bg-white p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center bg-[var(--accent)]/10 text-[var(--accent-text)]">
                <RefreshCw className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-gray-900">Multi-provider development</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Teams test code across Claude Sonnet, GPT-4, and Gemini from the same Claude Code
                workspace. Model performance and cost comparisons happen in real time inside
                Bifrost&apos;s dashboard.
              </p>
            </div>
            <div className="border border-gray-200 bg-white p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center bg-[var(--accent)]/10 text-[var(--accent-text)]">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-gray-900">Agentic coding pipelines</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Claude Code combines with MCP-connected tools for database queries, API testing,
                deployment scripts, and custom integrations all routed and monitored through a
                single gateway.
              </p>
            </div>
            <div className="border border-gray-200 bg-white p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center bg-[var(--accent)]/10 text-[var(--accent-text)]">
                <Database className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-gray-900">Semantic caching at scale</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Repeat or near-identical queries across developers resolve instantly from cache.
                Teams running large codebases see cost savings on common operations like
                code explanations and documentation generation.
              </p>
            </div>
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
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
              Real-world Scenarios where Bifrost Changes the Game
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((useCase) => (
              <div
                key={useCase.title}
                className="border border-gray-200 bg-white p-6 transition-all hover:border-[var(--accent-border)] hover:shadow-sm"
              >
                <useCase.icon className="mb-4 h-6 w-6 text-[var(--accent)]" />
                <h3 className="mb-2 text-gray-900">{useCase.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance & Compliance */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ GOVERNANCE &amp; COMPLIANCE ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
              Built for Enterprises with Strict Security Requirements
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Bifrost ships with the governance features and compliance certifications platform
              teams need before rolling out AI tooling organization-wide.
            </p>
          </div>
          <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {governanceFeatures.map((feature) => (
              <div key={feature.title} className="border border-gray-200 bg-white p-6">
                <feature.icon className="mb-4 h-6 w-6 text-[var(--accent)]" />
                <h3 className="mb-2 text-sm text-gray-900">{feature.title}</h3>
                <p className="text-xs leading-relaxed text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
          <div className="pt-8">
            <p className="mb-6 text-center font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ COMPLIANCE &amp; CERTIFICATIONS ]
            </p>
            <div className="flex justify-center">
              <div className="w-full max-w-4xl border-t border-b border-gray-200">
                <div className="grid grid-cols-2 divide-y divide-gray-200 md:grid-cols-4 md:divide-x md:divide-y-0">
                  {complianceBadges.map((badge) => (
                    <div key={badge.label} className="px-4 py-5 text-center">
                      <badge.icon className="mx-auto mb-2 h-6 w-6 text-[var(--accent-text)]" />
                      <div className="mb-1 text-sm leading-none text-gray-900 md:text-base">
                        {badge.label}
                      </div>
                      <div className="text-xs text-gray-400">{badge.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
            Ready to Bring Enterprise Controls to Claude Code?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-600">
            Bifrost is open source and production-ready. Teams get started in minutes and scale
            without rethinking the architecture.
          </p>
          <div className="flex w-full flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
            <Link
              href="https://github.com/maximhq/bifrost"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button>
                Get started free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="https://docs.getbifrost.ai/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline">
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
