import SubmissionForm from '@/components/built-with-bifrost/SubmissionForm'
import { SiteConfig } from '@/lib/built-with-bifrost/site.config'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getBuiltWithBifrostBaseUrl } from '@/lib/utils'

export const metadata = {
  title: `Submit Project - ${SiteConfig.siteName}`,
  description: 'Submit your Bifrost project to the showcase.',
  alternates: {
    canonical: 'https://www.getmaxim.ai/bifrost/built-with-bifrost/submit',
  },
}

export default function SubmitPage() {
  const basePath = `${getBuiltWithBifrostBaseUrl()}/built-with-bifrost`
  return (
    <div className="min-h-screen bg-gray-50/50 py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href={basePath}
            className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-[var(--accent-text-dark)]"
          >
            <ArrowLeft size={16} /> Back to Showcase
          </Link>
        </div>

        <div className="mb-12 text-center">
          <span className="provider-badge mb-4">[ CALL FOR SUBMISSIONS ]</span>
          <h1 className="mb-4 text-3xl font-medium tracking-tight text-gray-900 md:text-5xl">
            Submit your Project
          </h1>
          <p className="mx-auto max-w-2xl text-gray-500">
            Built something amazing with Bifrost? Share it with the community. Approved projects
            will be featured in our showcase.
          </p>
        </div>

        <SubmissionForm />
      </div>
    </div>
  )
}
