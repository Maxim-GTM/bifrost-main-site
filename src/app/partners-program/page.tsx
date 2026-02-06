import PrimaryButton from '@/components/ui/PrimaryButton';
import SecondaryButton from '@/components/ui/SecondaryButton';
import {
    ArrowRight,
    Cloud,
    ExternalLink,
    Globe,
    Handshake,
    Layers,
    CheckCircle2,
    Zap,
    ShieldCheck,
    Users,
    Building2,
} from 'lucide-react';

const partnerTypes = [
    {
        icon: Cloud,
        title: 'Cloud Providers / Hyperscalers',
        description: 'Integrate Bifrost as a managed AI gateway offering within your cloud marketplace. Provide customers with enterprise-grade LLM routing, governance, and observability natively inside their cloud environment.',
        benefits: [
            'Marketplace listing and co-sell motion',
            'Joint solution architecture support',
            'Dedicated partner engineering resources',
        ],
    },
    {
        icon: Building2,
        title: 'Global System Integrators',
        description: 'Deliver Bifrost as part of enterprise AI transformation engagements. Help clients implement production-grade LLM infrastructure with multi-provider routing, guardrails, and compliance controls.',
        benefits: [
            'Implementation and deployment training',
            'Joint go-to-market programs',
            'Enterprise reference architectures',
        ],
    },
    {
        icon: Layers,
        title: 'Technology Partners',
        description: 'Build integrations between your platform and Bifrost. Connect observability stacks, guardrail engines, vector databases, and AI development tools into the Bifrost ecosystem.',
        benefits: [
            'Integration development support',
            'Co-marketing and joint content',
            'Early access to new features and APIs',
        ],
    },
    {
        icon: Handshake,
        title: 'Channel Partners',
        description: 'Resell and distribute Bifrost Enterprise to your customer base. Offer managed AI gateway services backed by Bifrost\'s performance, security, and enterprise support.',
        benefits: [
            'Partner pricing and margin structure',
            'Sales enablement and training',
            'Deal registration and protection',
        ],
    },
];

const whyPartner = [
    {
        icon: Zap,
        title: 'Fastest LLM gateway',
        description: '11µs overhead, 50x faster than Python alternatives. Customers get production-grade performance from day one.',
    },
    {
        icon: ShieldCheck,
        title: 'Enterprise-ready',
        description: 'SOC 2, HIPAA, GDPR compliance. In-VPC deployment, guardrails, audit trails, and role-based access control.',
    },
    {
        icon: Users,
        title: 'Growing ecosystem',
        description: 'Thousands of developers and enterprises building on Bifrost. Open source community with Apache 2.0 licensing.',
    },
    {
        icon: Globe,
        title: 'Multi-provider, multi-cloud',
        description: '15+ LLM providers supported. Works across AWS, GCP, Azure, and on-prem deployments.',
    },
];

const partnerLogos = [
    // Row 1
    { name: 'AWS', domain: 'aws.amazon.com' },
    { name: 'Google Cloud', domain: 'cloud.google.com' },
    { name: 'Microsoft Azure', domain: 'azure.microsoft.com' },
    { name: 'Anthropic', domain: 'anthropic.com' },
    { name: 'OpenAI', domain: 'openai.com' },
    { name: 'Datadog', domain: 'datadoghq.com' },
    { name: 'Snowflake', domain: 'snowflake.com' },
    { name: 'Confluent', domain: 'confluent.io' },
    { name: 'HashiCorp', domain: 'hashicorp.com' },
    // Row 2
    { name: 'LangChain', domain: 'langchain.com' },
    { name: 'Cohere', domain: 'cohere.com' },
    { name: 'Mistral AI', domain: 'mistral.ai' },
    { name: 'MongoDB', domain: 'mongodb.com' },
    { name: 'Elastic', domain: 'elastic.co' },
    { name: 'Grafana', domain: 'grafana.com' },
    { name: 'Cloudflare', domain: 'cloudflare.com' },
    { name: 'Vercel', domain: 'vercel.com' },
    { name: 'Supabase', domain: 'supabase.com' },
];

export default function PartnersPage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    <div className="text-center">
                        <span className="provider-badge">[ PARTNER PROGRAM ]</span>
                        <h1 className="text-4xl md:text-5xl font-normal text-gray-900 mb-4 leading-[1.2] tracking-tight text-center">
                            Welcome to The Bifrost
                            <br />
                            <span className="text-[var(--accent-text)]">Partner Program</span>
                        </h1>
                        <p className="text-sm md:text-base text-gray-500 max-w-3xl mx-auto leading-relaxed mb-8">
                            Join the Bifrost Partner Program and help accelerate the leading AI companies in the world. Whether you&apos;re a cloud provider, system integrator, technology vendor, or channel partner — there&apos;s a program built for you.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center w-full">
                            <PrimaryButton href="/partners-program/become-a-partner">
                                Become a partner
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

            {/* Partner Types — 2x2 Grid */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                            [ BIFROST PARTNERS ]
                        </p>
                        <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                            Four ways to partner
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Choose the partnership model that fits your business. Each program is designed for mutual growth with dedicated resources and support.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {partnerTypes.map((partner) => (
                            <div key={partner.title} className="bg-white border border-gray-200 hover:border-[var(--accent-border)] hover:shadow-sm transition-all">
                                <div className="p-6 md:p-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 flex items-center justify-center bg-[var(--accent)]/10 text-[var(--accent-text)]">
                                            <partner.icon className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-gray-900">{partner.title}</h3>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed mb-5">{partner.description}</p>
                                    <ul className="space-y-2.5">
                                        {partner.benefits.map((benefit) => (
                                            <li key={benefit} className="flex items-start gap-2.5">
                                                <CheckCircle2 className="w-4 h-4 text-[var(--accent-text)] mt-0.5 flex-shrink-0" />
                                                <span className="text-sm text-gray-700">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Partner with Bifrost */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                            [ WHY BIFROST ]
                        </p>
                        <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                            The platform your customers are already asking for
                        </h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {whyPartner.map((item) => (
                            <div key={item.title} className="p-6 border border-gray-200 bg-white">
                                <item.icon className="w-6 h-6 text-[var(--accent)] mb-4" />
                                <h3 className="text-gray-900 mb-2 text-sm font-medium">{item.title}</h3>
                                <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Partner Logos / Social Proof Placeholder */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-4">
                            [ ECOSYSTEM ]
                        </p>
                        <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                            Join a growing partner ecosystem
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Bifrost integrates with the tools and platforms your customers already use.
                        </p>
                    </div>
                    <div className="border border-gray-200 bg-white">
                        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9">
                            {partnerLogos.map((partner) => (
                                <div
                                    key={partner.name}
                                    className="flex flex-col items-center justify-center py-5 px-3 border-r border-b border-gray-200 last:border-r-0 [&:nth-child(3n)]:border-r-0 sm:[&:nth-child(3n)]:border-r sm:[&:nth-child(5n)]:border-r-0 lg:[&:nth-child(5n)]:border-r lg:[&:nth-child(9n)]:border-r-0 group"
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={`https://img.logo.dev/${partner.domain}?token=pk_DRMfSAu-ReyrEks2PcRCfw`}
                                        alt={`${partner.name} logo`}
                                        className="h-8 w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all mb-2"
                                    />
                                    <span className="text-[10px] font-mono text-gray-400 group-hover:text-gray-600 transition-colors text-center leading-tight">
                                        {partner.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <p className="text-[10px] text-gray-400 text-center mt-3 font-mono">
                        Logos shown represent integration compatibility — not endorsement or formal partnership.
                    </p>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
                        Join forces with Bifrost
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                        Dedicated to the success of our partners&apos; businesses. Let&apos;s build the future of enterprise AI infrastructure together.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center w-full">
                        <PrimaryButton href="/partners-program/become-a-partner">
                            Become a partner
                            <ArrowRight className="w-4 h-4" />
                        </PrimaryButton>
                        <SecondaryButton href="https://github.com/maximhq/bifrost" external>
                            View on GitHub
                            <ExternalLink className="w-4 h-4" />
                        </SecondaryButton>
                    </div>
                </div>
            </section>
        </div>
    );
}
