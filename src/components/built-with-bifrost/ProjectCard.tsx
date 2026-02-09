import Link from 'next/link'
import { Submission } from '@/types/submission'
import { ArrowUpRight, User } from 'lucide-react'
import { getBuiltWithBifrostBaseUrl } from '@/lib/utils'

interface ProjectCardProps {
  project: Submission
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const basePath = `${getBuiltWithBifrostBaseUrl()}/built-with-bifrost`
  return (
    <Link
      href={`${basePath}/project/${project.slug}`}
      className="group block overflow-hidden rounded-xl border border-gray-100 bg-white transition-all duration-300 hover:border-[var(--accent-border)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
        {project.imageUrls && project.imageUrls.length > 0 ? (
          <img
            src={project.imageUrls[0].replace(
              'https://t3.storage.dev/built-with-bifrost-images',
              'https://built-with-bifrost-images.fly.storage.tigris.dev'
            )}
            alt={project.title}
            className="h-full w-full transform object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-50 text-gray-300">
            <span className="font-mono text-sm tracking-widest uppercase">No Image</span>
          </div>
        )}

        {/* Overlay Badge */}
        <div className="absolute top-3 right-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="flex items-center gap-1 rounded-full border border-gray-200 bg-white/90 px-2 py-1 text-xs font-medium text-[var(--accent-text-dark)] shadow-sm backdrop-blur-sm">
            View Details <ArrowUpRight size={10} />
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-2 flex items-start justify-between gap-4">
          <h3 className="text-lg leading-tight font-semibold text-gray-900 transition-colors group-hover:text-[var(--accent-text-dark)]">
            {project.title}
          </h3>
        </div>

        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-500">
          {project.shortDescription}
        </p>

        <div className="flex items-center justify-between border-t border-gray-50 pt-4">
          <div className="flex items-center gap-2 text-xs font-medium tracking-wide text-gray-400 uppercase">
            <div className="rounded-full bg-gray-50 p-1">
              <User size={12} />
            </div>
            {project.authorName}
          </div>

          {/* Optional: Add tags or date here */}
        </div>
      </div>
    </Link>
  )
}
