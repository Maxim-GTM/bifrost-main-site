import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import PartnerForm from '@/components/partners/PartnerForm'
import PartnerTypes from '@/components/partners/PartnerTypes'

export const metadata = {
  title: 'Become a Partner',
  description:
    'Apply to join the Bifrost Partner Program. Cloud providers, system integrators, technology vendors, and channel partners welcome.',
  alternates: {
    canonical: 'https://www.getmaxim.ai/bifrost/partners-program/become-a-partner',
  },
}

export default function BecomeAPartnerPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/partners-program"
            className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-[var(--accent-text)]"
          >
            <ArrowLeft size={16} /> Back to Partner Program
          </Link>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* LHS — Info */}
          <div className="lg:sticky lg:top-24">
            {/* <div className="text-center mb-4">
                <span className="font-mono text-[12px] leading-[15px] font-medium tracking-[0.04em] text-emerald-500 uppercase">
                  [&ensp;PARTNER APPLICATION&ensp;]
                </span>
            </div> */}
            <h1 className="mb-4 text-3xl leading-[1.2] font-normal tracking-tight text-gray-900 md:text-4xl">
              Join forces with Bifrost
            </h1>
            <p className="mb-8 text-sm leading-relaxed text-gray-500 md:text-base">
              Dedicated to the success of our partners&apos; businesses. Fill out the form and our
              partnerships team will be in touch within 2 business days.
            </p>

            {/* 2x3 partner type grid */}
            <PartnerTypes compact />
          </div>

          {/* RHS — Form */}
          <div>
            <PartnerForm />
          </div>
        </div>
      </div>
    </div>
  )
}
