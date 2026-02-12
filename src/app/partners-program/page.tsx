import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import PartnerTypes from '@/components/partners/PartnerTypes'
import { ArrowRight, ExternalLink, Globe, Zap, ShieldCheck, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Bifrost Partner Program - Cloud, Technology & Channel Partnerships',
  description:
    'Join the Bifrost Partner Program. Grow your business as a cloud, technology, or channel partner and help accelerate the leading AI companies in the world.',
  keywords: [
    'Bifrost',
    'Partner Program',
    'AI partnerships',
    'LLM Gateway partners',
    'Cloud Partners',
    'System Integrators',
    'Technology Partners',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.getmaxim.ai/bifrost/partners-program',
    siteName: 'Bifrost by Maxim AI',
    title: 'Bifrost Partner Program - Cloud, Technology & Channel Partnerships',
    description:
      'Join the Bifrost Partner Program. Grow your business and help accelerate the leading AI companies in the world.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bifrost Partner Program',
    description:
      'Join the Bifrost Partner Program. Grow your business and help accelerate the leading AI companies in the world.',
  },
  alternates: {
    canonical: 'https://www.getmaxim.ai/bifrost/partners-program',
  },
}

const logoUrls = [
  'aws.amazon.com',
  'cloud.google.com',
  'anthropic.com',
  'openai.com',
  'langchain.com',
  'crewai.com',
  'mistral.ai',
  'mongodb.com',
  'vercel.com',
].map((d) => `https://img.logo.dev/${d}?token=pk_DRMfSAu-ReyrEks2PcRCfw`)

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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Bifrost Partner Program - Cloud, Technology & Channel Partnerships',
  description:
    'Join the Bifrost Partner Program. Grow your business as a cloud, technology, or channel partner and help accelerate the leading AI companies in the world.',
  url: 'https://www.getmaxim.ai/bifrost/partners-program',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Bifrost by Maxim AI',
    url: 'https://www.getmaxim.ai/bifrost/',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Maxim AI',
    url: 'https://www.getmaxim.ai',
    sameAs: ['https://github.com/maximhq/bifrost'],
  },
  about: {
    '@type': 'Organization',
    name: 'Bifrost by Maxim AI',
    description:
      'The fastest LLM gateway with 11µs overhead, supporting 15+ AI providers across AWS, GCP, Azure, and on-prem deployments.',
  },
}

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Preconnect + preload logo images so they appear instantly */}
      <link rel="preconnect" href="https://img.logo.dev" />
      <link rel="dns-prefetch" href="https://img.logo.dev" />
      {logoUrls.map((url) => (
        <link key={url} rel="preload" as="image" href={url} />
      ))}
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="text-center">
            <span className="font-mono text-[12px] leading-[15px] font-medium tracking-[0.04em] text-emerald-500 uppercase">
              [&ensp;PARTNER PROGRAM&ensp;]
            </span>
            <h1 className="mx-auto mt-2 mb-4 max-w-2xl text-[42px] leading-[120%] font-medium tracking-[-0.02em] text-black">
              Welcome to The Bifrost
              <br />
              <span className="text-[var(--accent-text)]">Partner Program</span>
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-[16px] leading-[140%] tracking-[0em] text-[#525252]">
              Join the Bifrost Partner Program and help accelerate the leading AI companies in the
              world. Whether you&apos;re a cloud provider, system integrator, technology vendor, or
              channel partner - there&apos;s a program built for you.
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
      <div className="relative flex w-full justify-center">
        {/* Left Side Decoration - Box Style */}
        <div className="hidden w-20 flex-none flex-col items-end gap-4 border-r border-black/10 xl:flex">
          <div
            className="h-full w-full bg-[#F6F6F6] opacity-[0.07]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='4' y='4' width='4' height='4' fill='black'/%3E%3Crect y='8' width='4' height='4' fill='black'/%3E%3Crect x='8' width='4' height='4' fill='black'/%3E%3C/svg%3E")`,
              backgroundSize: '4px 4px',
            }}
          ></div>
        </div>

        {/* Center Content - Max 1100px */}
        <div className="w-full max-w-[1100px] px-4 py-0">
          <div className="absolute right-0 left-0 h-px w-full bg-black/10" />

          <div className="pt-8">
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
        </div>

        {/* Right Side Decoration */}
        <div className="hidden w-20 flex-none flex-col items-start gap-4 border-l border-black/10 xl:flex">
          <div
            className="h-full w-full bg-[#F6F6F6] opacity-[0.07]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='4' y='4' width='4' height='4' fill='black'/%3E%3Crect y='8' width='4' height='4' fill='black'/%3E%3Crect x='8' width='4' height='4' fill='black'/%3E%3C/svg%3E")`,
              backgroundSize: '4px 4px',
            }}
          ></div>
        </div>
      </div>

      {/* Why Partner with Bifrost */}
      <div className="relative flex w-full justify-center">
        {/* Left Side Decoration - Box Style */}
        <div className="hidden w-20 flex-none flex-col items-end gap-4 border-r border-black/10 xl:flex">
          <div
            className="h-full w-full bg-[#F6F6F6] opacity-[0.07]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='4' y='4' width='4' height='4' fill='black'/%3E%3Crect y='8' width='4' height='4' fill='black'/%3E%3Crect x='8' width='4' height='4' fill='black'/%3E%3C/svg%3E")`,
              backgroundSize: '4px 4px',
            }}
          ></div>
        </div>

        {/* Center Content - Max 1100px */}
        <div className="w-full max-w-[1100px] px-4 py-16 md:py-24">
          <div className="absolute right-0 left-0 h-px w-full bg-black/10" />

          <div className="pt-8">
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
        </div>

        {/* Right Side Decoration */}
        <div className="hidden w-20 flex-none flex-col items-start gap-4 border-l border-black/10 xl:flex">
          <div
            className="h-full w-full bg-[#F6F6F6] opacity-[0.07]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='4' y='4' width='4' height='4' fill='black'/%3E%3Crect y='8' width='4' height='4' fill='black'/%3E%3Crect x='8' width='4' height='4' fill='black'/%3E%3C/svg%3E")`,
              backgroundSize: '4px 4px',
            }}
          ></div>
        </div>
      </div>

      {/* Partner Logos - Horizontal scrolling marquee */}
      <div className="relative flex w-full justify-center">
        {/* Left Side Decoration - Box Style */}
        <div className="hidden w-20 flex-none flex-col items-end gap-4 border-r border-black/10 xl:flex">
          <div
            className="h-full w-full bg-[#F6F6F6] opacity-[0.07]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='4' y='4' width='4' height='4' fill='black'/%3E%3Crect y='8' width='4' height='4' fill='black'/%3E%3Crect x='8' width='4' height='4' fill='black'/%3E%3C/svg%3E")`,
              backgroundSize: '4px 4px',
            }}
          ></div>
        </div>

        {/* Center Content - Max 1100px */}
        <div className="w-full max-w-[1100px] px-4 py-16 md:py-24">
          <div className="absolute right-0 left-0 h-px w-full bg-black/10" />

          <div className="pt-8">
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
            <div className="group/marquee relative overflow-hidden">
              <p className="mb-6 text-center font-mono text-xs font-medium tracking-widest text-gray-400">
                TRUSTED BY
              </p>
              {/* Edge fade overlays */}
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />
              <div className="overflow-hidden">
                <div className="animate-marquee flex w-max shrink-0 gap-12 pr-12 group-hover/marquee:[animation-play-state:paused]">
                  {[...partnerLogos, ...partnerLogos].map((partner, i) => (
                    <a
                      key={`${partner.name}-${i}`}
                      href={partner.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group/logo flex shrink-0 flex-col items-center justify-center"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://img.logo.dev/${partner.domain}?token=pk_DRMfSAu-ReyrEks2PcRCfw`}
                        alt={`${partner.name} logo`}
                        loading="eager"
                        decoding="async"
                        className="h-10 w-auto object-contain opacity-60 grayscale transition-all group-hover/logo:opacity-100 group-hover/logo:grayscale-0 md:h-12"
                      />
                      <span className="mt-2 text-center font-mono text-[10px] leading-tight text-gray-400 transition-colors group-hover/logo:text-gray-600">
                        {partner.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Decoration */}
        <div className="hidden w-20 flex-none flex-col items-start gap-4 border-l border-black/10 xl:flex">
          <div
            className="h-full w-full bg-[#F6F6F6] opacity-[0.07]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='4' y='4' width='4' height='4' fill='black'/%3E%3Crect y='8' width='4' height='4' fill='black'/%3E%3Crect x='8' width='4' height='4' fill='black'/%3E%3C/svg%3E")`,
              backgroundSize: '4px 4px',
            }}
          ></div>
        </div>
      </div>

      {/* CTA */}
      <div className="relative flex w-full justify-center">
        {/* Left Side Decoration - Box Style */}
        <div className="hidden w-20 flex-none flex-col items-end gap-4 border-r border-black/10 xl:flex">
          <div
            className="h-full w-full bg-[#F6F6F6] opacity-[0.07]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='4' y='4' width='4' height='4' fill='black'/%3E%3Crect y='8' width='4' height='4' fill='black'/%3E%3Crect x='8' width='4' height='4' fill='black'/%3E%3C/svg%3E")`,
              backgroundSize: '4px 4px',
            }}
          ></div>
        </div>

        {/* Center Content - Max 1100px */}
        <div className="w-full max-w-[1100px] px-4 py-16 md:py-24">
          <div className="absolute right-0 left-0 h-px w-full bg-black/10" />

          <div className="pt-8 text-center">
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
        </div>

        {/* Right Side Decoration */}
        <div className="hidden w-20 flex-none flex-col items-start gap-4 border-l border-black/10 xl:flex">
          <div
            className="h-full w-full bg-[#F6F6F6] opacity-[0.07]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='4' y='4' width='4' height='4' fill='black'/%3E%3Crect y='8' width='4' height='4' fill='black'/%3E%3Crect x='8' width='4' height='4' fill='black'/%3E%3C/svg%3E")`,
              backgroundSize: '4px 4px',
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}
