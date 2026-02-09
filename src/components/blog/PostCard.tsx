import Link from 'next/link'
import { formatDate, type GhostPost } from '../../lib/ghostBlog'

interface PostCardProps {
  post: GhostPost
  type: 'articles' | 'blog'
}

export function PostCard({ post, type }: PostCardProps) {
  return (
    <Link href={`/bifrost/${type}/${post.slug}`} className="group block">
      <article className="h-full overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/10">
        {post.feature_image && (
          <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
            <img
              src={post.feature_image}
              alt={post.feature_image_alt || post.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}

        <div className="p-5">
          {post.primary_tag && (
            <span className="mb-3 inline-block rounded-full border border-green-200 bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
              {post.primary_tag.name}
            </span>
          )}

          <h2 className="group-hover:text-accent mb-2 line-clamp-2 text-lg font-semibold text-gray-900 transition-colors">
            {post.title}
          </h2>

          <p className="mb-4 line-clamp-2 font-mono text-sm text-gray-600">
            {post.custom_excerpt || post.excerpt}
          </p>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-2">
              {post.primary_author?.profile_image && (
                <img
                  src={post.primary_author.profile_image}
                  alt={post.primary_author.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              )}
              <span className="font-medium">{post.primary_author?.name}</span>
            </div>
            <time dateTime={post.published_at} className="font-mono">
              {formatDate(post.published_at)}
            </time>
          </div>
        </div>
      </article>
    </Link>
  )
}
