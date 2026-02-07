import Link from 'next/link';
import { ArrowRight, Activity, BookOpen, ShieldCheck, Building2, Stethoscope, Shield, ShoppingCart, Plug, RefreshCw, Zap } from 'lucide-react';
import { getCostCalculatorBaseUrl } from '@/lib/utils';

const basePath = getCostCalculatorBaseUrl();

const resources = [
  {
    title: 'Performance Benchmarks',
    description: 'Live comparisons, latency metrics, and throughput data that show why Bifrost is the fastest LLM gateway.',
    href: `${basePath}/bifrost-resources/benchmarks`,
    icon: Activity,
    label: 'Performance',
  },
  {
    title: 'LLM Gateway Buyer\'s Guide',
    description: 'A comprehensive comparison of leading AI gateway platforms, capabilities, and trade-offs.',
    href: `${basePath}/bifrost-resources/buyers-guide`,
    icon: BookOpen,
    label: 'Guide',
  },
  {
    title: 'Claude Code Integration',
    description: 'Enterprise controls for Claude Code with multi-provider routing, governance, and observability.',
    href: `${basePath}/bifrost-resources/claude-code`,
    icon: ShieldCheck,
    label: 'Integration',
  },
  {
    title: 'MCP Gateway',
    description: 'High-performance tool execution for AI agents with explicit approvals and full audit trails.',
    href: `${basePath}/bifrost-resources/mcp-gateway`,
    icon: Plug,
    label: 'MCP',
  },
  {
    title: 'Migrating from LiteLLM',
    description: 'Step-by-step guide to migrate from LiteLLM to Bifrost in 15 minutes with zero code changes.',
    href: `${basePath}/bifrost-resources/migrating-from-litellm`,
    icon: RefreshCw,
    label: 'Migration',
  },
  {
    title: 'LiteLLM Alternative',
    description: 'Why teams choose Bifrost over LiteLLM — 50x faster, zero-config deployment, and native observability.',
    href: `${basePath}/bifrost-resources/litellm-alternative`,
    icon: Zap,
    label: 'Alternative',
  },
];

const industries = [
  {
    title: 'Financial Institutions',
    description: 'Secure AI gateway for regulated banking, insurance, and investment services with audit-grade controls.',
    href: `${basePath}/bifrost-resources/financial-institutions`,
    icon: Building2,
    label: 'Financial Services',
  },
  {
    title: 'Healthcare & Life Sciences',
    description: 'Governed AI workflows with auditability and data controls for sensitive clinical systems.',
    href: `${basePath}/bifrost-resources/healthcare-life-sciences`,
    icon: Stethoscope,
    label: 'Healthcare',
  },
  {
    title: 'Retail',
    description: 'High-performance AI gateway for personalization, recommendations, and omnichannel retail experiences.',
    href: `${basePath}/bifrost-resources/retail`,
    icon: ShoppingCart,
    label: 'Retail',
  },
  {
    title: 'Public Sector',
    description: 'Secure deployments with policy enforcement for government and regulated programs.',
    href: '#',
    icon: Shield,
    label: 'Government',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center">
            <span className="provider-badge">
             [ BIFROST RESOURCES HUB ]
            </span>
            <h1 className="text-4xl md:text-5xl font-normal text-gray-900 mb-4 leading-[1.2] tracking-tight text-center">
              The Fastest Path to Bifrost Insights
            </h1>
            <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Explore benchmarks, buyer guidance, and integration playbooks. Everything you need to evaluate and deploy Bifrost with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs text-gray-400 uppercase tracking-widest font-mono">
              [ RESOURCES ]
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <Link
                key={resource.title}
                href={resource.href}
                className="group border border-gray-200 bg-white hover:border-[var(--accent-border)] hover:shadow-sm transition-all"
              >
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center bg-[var(--accent)]/10 text-[var(--accent-text)]">
                      <resource.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-widest font-mono">
                        {resource.label}
                      </p>
                      <h3 className="text-sm text-gray-900">
                        {resource.title}
                      </h3>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[var(--accent-text)] transition-colors" />
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {resource.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs text-gray-400 uppercase tracking-widest font-mono">
              [ INDUSTRIES ]
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry) => (
              <Link
                key={industry.title}
                href={industry.href}
                className="group border border-gray-200 bg-white hover:border-[var(--accent-border)] hover:shadow-sm transition-all"
              >
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center bg-[var(--accent)]/10 text-[var(--accent-text)]">
                      <industry.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-widest font-mono">
                        {industry.label}
                      </p>
                      <h3 className="text-sm text-gray-900">
                        {industry.title}
                      </h3>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[var(--accent-text)] transition-colors" />
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {industry.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
