import Link from 'next/link'
import { formatDate, type GhostPost } from '../../lib/ghostBlog'

interface PostCardProps {
  post: GhostPost
  type: 'articles' | 'blog'
  index: number
}

export function PostCard({ post, type, index }: PostCardProps) {
  return (
    <Link href={`/bifrost/${type}/${post.slug}`} className="group block h-full">
      <article className="flex h-full flex-col border border-gray-200 bg-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
        {/* Top: Illustration/Image Area - Full Width */}
        <div className="relative aspect-[4/3] w-full border-b border-gray-200 bg-gray-100">
          {post.feature_image && (
            <img
              src={post.feature_image}
              alt={post.feature_image_alt || post.title}
              className="h-full w-full object-cover"
            />
          )}
        </div>

        {/* Bottom: Content */}
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-2 font-mono text-xs font-medium tracking-wider text-gray-500 uppercase">
            {String(index + 1).padStart(2, '0')}{' '}
            {post.primary_tag ? post.primary_tag.name : 'Article'}
          </div>

          <h2 className="mb-3 text-lg leading-tight font-semibold text-gray-900 group-hover:text-emerald-600">
            {post.title}
          </h2>

          <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600">
            {post.custom_excerpt || post.excerpt}
          </p>

          <div className="mt-auto flex items-center gap-2 font-mono text-xs text-gray-400">
            <span>{formatDate(post.published_at)}</span>
            {post.primary_author && (
              <>
                <span>•</span>
                <span>{post.primary_author.name}</span>
              </>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}
