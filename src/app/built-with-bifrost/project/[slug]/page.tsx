import { getProjectBySlug } from '@/lib/built-with-bifrost/storage'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { User, Linkedin, Globe, Github, Youtube, ArrowLeft, Calendar } from 'lucide-react'
import { Metadata } from 'next'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import rehypeRaw from 'rehype-raw'
import { getBuiltWithBifrostBaseUrl } from '@/lib/utils'

// Force dynamic to ensure we get fresh data
export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: `${project.title} - Built with Bifrost`,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: project.imageUrls ? [project.imageUrls[0]] : [],
    },
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  const basePath = `${getBuiltWithBifrostBaseUrl()}/built-with-bifrost`

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <Link
            href={basePath}
            className="mb-8 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-[var(--accent-text-dark)]"
          >
            <ArrowLeft size={16} /> Back to Showcase
          </Link>

          <div className="max-w-4xl">
            <span className="mb-4 block font-mono text-[12px] leading-[15px] font-medium tracking-[0.04em] text-emerald-500 uppercase">
              [&ensp;FEATURED PROJECT&ensp;]
            </span>
            <h1 className="mb-4 text-[42px] leading-[120%] font-medium tracking-[-0.02em] text-gray-900 md:text-5xl">
              {project.title}
            </h1>
            <p className="mb-6 max-w-3xl text-[16px] leading-[140%] tracking-[0em] text-[#525252] md:text-xl">
              {project.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-6 font-mono text-xs font-medium tracking-wide text-gray-500 uppercase">
              <div className="flex items-center gap-2">
                <User size={14} /> {project.authorName}
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={14} /> {new Date(project.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Main Content */}
          <div className="order-last space-y-12 lg:order-none lg:col-span-8">
            {/* Images Gallery */}
            {project.imageUrls && project.imageUrls.length > 0 && (
              <div className="space-y-8">
                {project.imageUrls.map((url, idx) => (
                  <div
                    key={idx}
                    className="overflow-hidden rounded-xl border border-gray-100 bg-gray-50 shadow-sm"
                  >
                    <img
                      src={url.replace(
                        'https://t3.storage.dev/built-with-bifrost-images',
                        'https://built-with-bifrost-images.fly.storage.tigris.dev'
                      )}
                      alt={`${project.title} Screenshot ${idx + 1}`}
                      className="h-auto w-full"
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="prose prose-lg prose-headings:font-medium prose-a:text-[var(--accent-text)] prose-img:rounded-xl max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]} rehypePlugins={[rehypeRaw]}>
                {project.longDescription}
              </ReactMarkdown>
            </div>
          </div>

          {/* Sidebar */}
          <div className="order-first lg:order-none lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              {/* Links */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
                <h3 className="mb-4 border-b border-gray-100 pb-2 text-sm font-semibold tracking-widest text-gray-900 uppercase">
                  Project Links
                </h3>
                <div className="space-y-3">
                  {project.website && (
                    <a
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-50 hover:text-[var(--accent-text-dark)]"
                    >
                      <div className="rounded-full bg-gray-100 p-2 transition-colors group-hover:bg-white">
                        <Globe size={18} />
                      </div>
                      <span className="font-medium">Visit Website</span>
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-50 hover:text-[var(--accent-text-dark)]"
                    >
                      <div className="rounded-full bg-gray-100 p-2 transition-colors group-hover:bg-white">
                        <Github size={18} />
                      </div>
                      <span className="font-medium">GitHub Repo</span>
                    </a>
                  )}
                  {project.youtube && (
                    <a
                      href={project.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-50 hover:text-[var(--accent-text-dark)]"
                    >
                      <div className="rounded-full bg-gray-100 p-2 transition-colors group-hover:bg-white">
                        <Youtube size={18} />
                      </div>
                      <span className="font-medium">Watch Video</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Author */}
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                <h3 className="mb-4 border-b border-gray-200 pb-2 text-sm font-semibold tracking-widest text-gray-900 uppercase">
                  Creator
                </h3>

                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] text-lg font-bold text-white">
                    {project.authorName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{project.authorName}</div>
                    {project.authorEmail && (
                      <div className="text-xs text-gray-500">{project.authorEmail}</div>
                    )}
                  </div>
                </div>

                {project.authorLinkedin && (
                  <a
                    href={project.authorLinkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-[#0077b5] hover:underline"
                  >
                    <Linkedin size={14} /> LinkedIn Profile
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
