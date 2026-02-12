import SubmissionForm from '@/components/built-with-bifrost/SubmissionForm'
import { SiteConfig } from '@/lib/built-with-bifrost/site.config'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getBuiltWithBifrostBaseUrl } from '@/lib/utils'

export const metadata = {
  title: `Submit Project - ${SiteConfig.siteName}`,
  description: 'Submit your Bifrost project to the showcase.',
}

export default function SubmitPage() {
  const basePath = `${getBuiltWithBifrostBaseUrl()}/built-with-bifrost`
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Above Decorations */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href={basePath}
            className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-[var(--accent-text-dark)]"
          >
            <ArrowLeft size={16} /> Back to Showcase
          </Link>
        </div>

        <div className="mx-auto my-16 max-w-4xl text-center">
          <span className="font-mono text-[12px] leading-[15px] font-medium tracking-[0.04em] text-emerald-500 uppercase">
            [&ensp;CALL FOR SUBMISSIONS&ensp;]
          </span>
          <h1 className="mx-auto mt-2 mb-4 max-w-2xl text-[42px] leading-[120%] font-medium tracking-[-0.02em] text-black">
            Submit your Project
          </h1>
          <p className="mx-auto max-w-2xl text-[16px] leading-[140%] tracking-[0em] text-[#525252]">
            Built something amazing with Bifrost? Share it with the community. Approved projects
            will be featured in our showcase.
          </p>
        </div>
      </div>

      {/* Form Section - With Side Decorations */}
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
        <div className="w-full max-w-[1100px] px-4 pb-16">
          <div className="absolute right-0 left-0 h-px w-full bg-black/10" />

          <div className="pt-8">
            <SubmissionForm />
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
