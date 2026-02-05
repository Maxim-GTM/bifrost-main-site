import { Metadata } from 'next';
import Image from 'next/image';
import FeatureMatrix from '@/components/resources/FeatureMatrix';
import DropInReplacement from '@/components/resources/DropInReplacement';
import PrimaryButton from '@/components/ui/PrimaryButton';
import SecondaryButton from '@/components/ui/SecondaryButton';
import { getCostCalculatorBaseUrl } from '@/lib/utils';
import {
    Activity,
    ArrowRight,
    Banknote,
    Building2,
    CheckCircle2,
    ExternalLink,
    FileText,
    Lock,
    ShieldCheck,
    SignalHigh,
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'Bifrost for Financial Institutions | Secure AI Gateway',
    description: 'Deploy Bifrost as a secure, low-latency AI gateway for regulated financial institutions with governance, auditability, and multi-provider resilience.',
};

const challenges = [
    {
        icon: ShieldCheck,
        title: 'Compliance bottlenecks',
        description: 'GLBA privacy rules, FFIEC guidance, and audit requirements demand full oversight of every model interaction.',
    },
    {
        icon: Building2,
        title: 'Operational fragmentation',
        description: 'Legacy systems make it difficult to deploy AI consistently across lending, AML monitoring, and risk operations.',
    },
    {
        icon: SignalHigh,
        title: 'Performance and scale',
        description: 'Fraud detection and market-risk workflows require low latency and predictable throughput under peak demand.',
    },
];

const governance = [
    {
        icon: Lock,
        title: 'In-VPC and on-prem deployment',
        description: 'Keep regulated data inside your network perimeter with private deployments and custom networking controls.',
    },
    {
        icon: FileText,
        title: 'Audit-grade logs',
        description: 'Capture complete request trails with user, provider, route, token, and latency metadata for compliance reviews.',
    },
    {
        icon: CheckCircle2,
        title: 'Role-based access control',
        description: 'Apply fine-grained permissions and rate limits by team, environment, and application.',
    },
    {
        icon: Banknote,
        title: 'Cost governance',
        description: 'Virtual keys enforce budgets and spend limits across departments and projects.',
    },
];

const useCases = [
    {
        title: 'Fraud detection and investigation',
        description: 'Route high-sensitivity requests through approved providers with audit logs and policy enforcement.',
    },
    {
        title: 'Regulatory and compliance monitoring',
        description: 'Centralize model access for monitoring and reporting across business units.',
    },
    {
        title: 'Credit and loan decisioning',
        description: 'Apply guardrails and data controls while meeting strict latency requirements.',
    },
    {
        title: 'Customer support and servicing',
        description: 'Scale AI assistance without exposing sensitive data or losing traceability.',
    },
    {
        title: 'Risk and market intelligence',
        description: 'Optimize routing across providers to balance cost, quality, and latency.',
    },
    {
        title: 'Enterprise AI copilots',
        description: 'Enable secure internal copilots with centralized governance and monitoring.',
    },
];

const platformCapabilities = [
    {
        icon: Activity,
        title: 'Centralized Observability',
        description: 'Track every request with latency, provider, and routing details.',
    },
    {
        icon: FileText,
        title: 'Audit-Ready Evidence',
        description: 'Generate compliance trails for internal and regulatory reviews.',
    },
    {
        icon: ShieldCheck,
        title: 'Policy Enforcement',
        description: 'Apply guardrails, redaction, and access control consistently.',
    },
    {
        icon: Banknote,
        title: 'Budget Governance',
        description: 'Set limits per team and prevent runaway spend.',
    },
    {
        icon: Building2,
        title: 'Enterprise Deployment',
        description: 'Deploy in VPC or on-prem with full network control.',
    },
    {
        icon: SignalHigh,
        title: 'High-Throughput Routing',
        description: 'Maintain performance even under peak load.',
    },
];

const interfaceHighlights = [
    {
        src: '/bifrost-screenshot/dashboard-main.png',
        title: 'Operations Dashboard',
        description: 'Live monitoring for system health, routing, and usage visibility.',
        objectPosition: 'center top',
    },
    {
        src: '/bifrost-screenshot/logs.png',
        title: 'Audit Logs',
        description: 'Detailed request trails ready for compliance and forensic analysis.',
        objectPosition: 'center center',
    },
    {
        src: '/bifrost-screenshot/Virtual%20Keys.png',
        title: 'Virtual Keys and Budgets',
        description: 'Budget enforcement and access segmentation across teams.',
        objectPosition: 'center',
    },
];

export default function FinancialInstitutionsPage() {
    const basePath = getCostCalculatorBaseUrl();

    return (
        <div className="bg-white min-h-screen">
            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    <div className="text-center">
                        <span className="provider-badge">
                            [ ENTERPRISE READY: VPC | ON-PREM | AIR-GAPPED ]
                        </span>
                        <h1 className="text-4xl md:text-5xl font-normal text-gray-900 mb-4 leading-[1.2] tracking-tight text-center">
                            Secure AI Gateway for
                            <br />
                            <span className="text-[var(--accent-text)]">Financial Institutions</span>
                        </h1>
                        <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed mb-8">
                            Bifrost provides centralized governance, compliance-grade auditability, and low-latency routing for banks, insurers, and investment platforms.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center w-full">
                            <PrimaryButton href={`${basePath}/bifrost-resources/benchmarks`}>
                                View benchmarks
                                <ArrowRight className="w-4 h-4" />
                            </PrimaryButton>
                            <SecondaryButton href="https://docs.getmaxim.ai/bifrost" external>
                                View documentation
                                <ExternalLink className="w-4 h-4" />
                            </SecondaryButton>
                        </div>
                    </div>
                </div>
            </section>

            {/* Challenges */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                            [ CHALLENGES ]
                        </p>
                        <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                            Barriers to scalable AI in financial services
                        </h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {challenges.map((item) => (
                            <div key={item.title} className="bg-white p-6 border border-gray-200 hover:border-[var(--accent-border)] hover:shadow-sm transition-all">
                                <item.icon className="w-6 h-6 text-[var(--accent)] mb-4" />
                                <h3 className="text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Governance */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                            [ GOVERNANCE ]
                        </p>
                        <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                            Enterprise-grade controls without slowing teams down
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Deploy Bifrost in your environment and enforce consistent policies across every model request.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {governance.map((item) => (
                            <div key={item.title} className="p-6 border border-gray-200 bg-white">
                                <item.icon className="w-6 h-6 text-[var(--accent)] mb-4" />
                                <h3 className="text-gray-900 mb-2 text-sm">{item.title}</h3>
                                <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Platform Capabilities */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                            [ PLATFORM CAPABILITIES ]
                        </p>
                        <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                            Designed for regulated financial operations
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Unified governance, routing, and observability with the controls financial institutions require.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {platformCapabilities.map((item) => (
                            <div key={item.title} className="bg-white p-6 border border-gray-200 hover:border-[var(--accent-border)] hover:shadow-sm transition-all">
                                <item.icon className="w-6 h-6 text-[var(--accent)] mb-4" />
                                <h3 className="text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Interface Highlights */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                            [ BIFROST INTERFACE ]
                        </p>
                        <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                            Operational Views Built for Compliance
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Focused dashboard panels that highlight routing, audit trails, and budget governance.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {interfaceHighlights.map((shot) => (
                            <div key={shot.title} className="border border-gray-200 bg-white">
                                <div className="relative aspect-[16/9] bg-gray-50 overflow-hidden">
                                    <Image
                                        src={shot.src}
                                        alt={shot.title}
                                        fill
                                        className="object-cover"
                                        style={{ objectPosition: shot.objectPosition }}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                                <div className="p-4 border-t border-gray-200">
                                    <h3 className="text-sm text-gray-900 mb-1">{shot.title}</h3>
                                    <p className="text-xs text-gray-500">{shot.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use cases */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                            [ USE CASES ]
                        </p>
                        <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                            Industry workflows powered by Bifrost
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

            {/* CTA */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                        [ NEXT STEPS ]
                    </p>
                    <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                        Bring regulated AI workloads under control
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                        Talk to the Bifrost team about deploying a compliant, low-latency gateway in your environment.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center w-full">
                        <PrimaryButton href="https://calendly.com/maximai/bifrost-demo?month=2026-01" external>
                            Book a demo
                            <ArrowRight className="w-4 h-4" />
                        </PrimaryButton>
                        <SecondaryButton href={`${basePath}/bifrost-resources/claude-code`}>
                            Claude Code integration
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
                            Open Source & Enterprise
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
