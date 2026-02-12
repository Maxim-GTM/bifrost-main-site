import { SiteConfig } from '@/lib/built-with-bifrost/site.config'
import Link from 'next/link'
import { getApprovedSubmissions } from '@/lib/built-with-bifrost/storage'
import ProjectCard from '@/components/built-with-bifrost/ProjectCard'
import { Plus } from 'lucide-react'
import { getBuiltWithBifrostBaseUrl } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

// Force dynamic rendering to ensure we get the latest submissions
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const projects = await getApprovedSubmissions()
  const basePath = `${getBuiltWithBifrostBaseUrl()}/built-with-bifrost`

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <div className="relative z-10 text-center">
            <span className="font-mono text-[12px] leading-[15px] font-medium tracking-[0.04em] text-emerald-500 uppercase">
              [&ensp;BUILT WITH BIFROST&ensp;]
            </span>
            <h1 className="mx-auto mt-2 mb-6 max-w-2xl text-[42px] leading-[120%] font-medium tracking-[-0.02em] text-black">
              Built With Bifrost
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-[16px] leading-[140%] tracking-[0em] text-[#525252]">
              Discover amazing projects, tools, and applications created by the community using
              Bifrost by Maxim AI.
            </p>

            <div className="flex justify-center gap-4">
              <Link href={`${basePath}/submit`}>
                <Button size="lg">
                  <Plus size={16} /> Submit Project
                </Button>
              </Link>
            </div>
          </div>

          {/* Background decoration */}
          <div className="pointer-events-none absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-30">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--accent-light)] to-transparent blur-3xl" />
          </div>
        </div>
      </div>

      {/* Main Content Area with Decorations */}
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
            <div className="mb-12 text-center">
              <p className="mb-2 font-mono text-xs font-medium tracking-widest text-gray-400 uppercase">
                [ COMMUNITY PROJECTS ]
              </p>
              <div className="mx-auto h-px w-20 bg-[var(--accent)] opacity-30"></div>
            </div>

            {projects.length > 0 ? (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-gray-200 bg-white py-20 text-center">
                <p className="mb-4 text-gray-500">No projects have been approved yet.</p>
                <Link
                  href={`${basePath}/submit`}
                  className="text-sm font-medium tracking-wide text-[var(--accent-text-dark)] uppercase hover:underline"
                >
                  Be the first to submit
                </Link>
              </div>
            )}
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
