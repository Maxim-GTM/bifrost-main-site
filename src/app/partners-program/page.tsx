import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import PartnerTypes from '@/components/partners/PartnerTypes'
import { ArrowRight, ExternalLink, Globe, Zap, ShieldCheck, Users } from 'lucide-react'

const whyPartner = [
  {
    icon: Zap,
    title: 'Fastest LLM gateway',
    description:
      '11µs overhead, 50x faster than Python alternatives. Customers get production-grade performance from day one.',
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise-ready',
    description:
      'SOC 2, HIPAA, GDPR compliance. In-VPC deployment, guardrails, audit trails, and role-based access control.',
  },
  {
    icon: Users,
    title: 'Growing ecosystem',
    description:
      'Thousands of developers and enterprises building on Bifrost. Open source community with Apache 2.0 licensing.',
  },
  {
    icon: Globe,
    title: 'Multi-provider, multi-cloud',
    description:
      '15+ LLM providers supported. Works across AWS, GCP, Azure, and on-prem deployments.',
  },
]

const partnerLogos = [
  // Row 1
  { name: 'AWS', domain: 'aws.amazon.com', href: 'https://aws.amazon.com' },
  {
    name: 'Google Cloud',
    domain: 'cloud.google.com',
    href: 'https://cloud.google.com/find-a-partner/partner/maxim-ai',
  },
  {
    name: 'Anthropic',
    domain: 'anthropic.com',
    href: 'https://www.getmaxim.ai/docs/sdk/python/integrations/anthropic/anthropic',
  },
  {
    name: 'OpenAI',
    domain: 'openai.com',
    href: 'https://openai.github.io/openai-agents-python/tracing/#external-tracing-processors-list',
  },
  {
    name: 'LangChain',
    domain: 'langchain.com',
    href: 'https://www.getmaxim.ai/docs/sdk/python/integrations/langchain/langchain',
  },
  { name: 'CrewAI', domain: 'crewai.com', href: 'https://docs.crewai.com/en/observability/maxim' },
  {
    name: 'Mistral AI',
    domain: 'mistral.ai',
    href: 'https://docs.mistral.ai/cookbooks/third_party-maxim-cookbook_maxim_mistral_integration',
  },
  { name: 'MongoDB', domain: 'mongodb.com', href: 'https://cloud.mongodb.com/ecosystem/maxim-ai' },
  {
    name: 'Vercel',
    domain: 'vercel.com',
    href: 'https://www.getmaxim.ai/docs/sdk/typescript/integrations/vercel/vercel',
  },
]

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="text-center">
            <span className="provider-badge">[ PARTNER PROGRAM ]</span>
            <h1 className="mb-4 text-center text-4xl leading-[1.2] font-normal tracking-tight text-gray-900 md:text-5xl">
              Welcome to The Bifrost
              <br />
              <span className="text-[var(--accent-text)]">Partner Program</span>
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-sm leading-relaxed text-gray-500 md:text-base">
              Join the Bifrost Partner Program and help accelerate the leading AI companies in the
              world. Whether you&apos;re a cloud provider, system integrator, technology vendor, or
              channel partner — there&apos;s a program built for you.
            </p>
            <div className="flex w-full flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
              <Link href="/partners-program/become-a-partner">
                <Button size="lg">
                  Become a partner
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="https://docs.getbifrost.ai/" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg">
                  View documentation
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ BIFROST PARTNERS ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">Ways to partner</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Choose the partnership model that fits your business. Each program is designed for
              mutual growth with dedicated resources and support.
            </p>
          </div>
          <PartnerTypes />
        </div>
      </section>

      {/* Why Partner with Bifrost */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ WHY BIFROST ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
              The platform your customers are already asking for
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyPartner.map((item) => (
              <div key={item.title} className="border border-gray-200 bg-white p-6">
                <item.icon className="mb-4 h-6 w-6 text-[var(--accent)]" />
                <h3 className="mb-2 text-sm font-medium text-gray-900">{item.title}</h3>
                <p className="text-xs leading-relaxed text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Logos / Social Proof Placeholder */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ ECOSYSTEM ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
              Join a growing partner ecosystem
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Bifrost integrates with the tools and platforms your customers already use.
            </p>
          </div>
          <div className="border border-gray-200 bg-white">
            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9">
              {partnerLogos.map((partner) => (
                <a
                  key={partner.name}
                  href={partner.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col items-center justify-center border-r border-b border-gray-200 px-3 py-5 last:border-r-0 [&:nth-child(3n)]:border-r-0 sm:[&:nth-child(3n)]:border-r sm:[&:nth-child(5n)]:border-r-0 lg:[&:nth-child(5n)]:border-r lg:[&:nth-child(9n)]:border-r-0"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://img.logo.dev/${partner.domain}?token=pk_DRMfSAu-ReyrEks2PcRCfw`}
                    alt={`${partner.name} logo`}
                    className="mb-2 h-8 w-auto object-contain opacity-60 grayscale transition-all group-hover:opacity-100 group-hover:grayscale-0"
                  />
                  <span className="text-center font-mono text-[10px] leading-tight text-gray-400 transition-colors group-hover:text-gray-600">
                    {partner.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
          {/* <p className="text-[10px] text-gray-400 text-center mt-3 font-mono">
                        Logos shown represent integration compatibility — not endorsement or formal partnership.
                    </p> */}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">Join forces with Bifrost</h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-600">
            Dedicated to the success of our partners&apos; businesses. Let&apos;s build the future
            of enterprise AI infrastructure together.
          </p>
          <div className="flex w-full flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
            <Link href="/partners-program/become-a-partner">
              <Button size="lg">
                Become a partner
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link
              href="https://github.com/maximhq/bifrost"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg">
                View on GitHub
                <ExternalLink className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
