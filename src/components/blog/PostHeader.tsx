import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { formatDate, type GhostPost } from '../../lib/ghostBlog'

interface PostHeaderProps {
  post: GhostPost
  type: 'articles' | 'blog'
}

export function PostHeader({ post, type }: PostHeaderProps) {
  return (
    <header className="mb-8">
      <Link
        href={type === 'articles' ? '/bifrost/articles' : '/bifrost/blog'}
        className="hover:text-accent mb-6 inline-flex items-center gap-2 font-mono text-sm text-gray-600 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to {type === 'articles' ? 'Articles' : 'Blog'}
      </Link>

      <div className="mb-4 flex items-center gap-2">
        {post.tags?.map((tag) => (
          <span
            key={tag.id}
            className="rounded-full border border-green-200 bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700"
          >
            {tag.name}
          </span>
        ))}
      </div>

      <h1 className="mb-6 text-3xl leading-tight font-bold text-gray-900 md:text-4xl lg:text-5xl">
        {post.title}
      </h1>

      <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-3">
          {post.primary_author?.profile_image && (
            <img
              src={post.primary_author.profile_image}
              alt={post.primary_author.name}
              width={40}
              height={40}
              className="rounded-full"
            />
          )}
          <div>
            <p className="font-medium text-gray-900">{post.primary_author?.name}</p>
            <p className="font-mono text-xs text-gray-500">
              {formatDate(post.published_at)} · {post.reading_time} min read
            </p>
          </div>
        </div>
      </div>

      {post.feature_image && (
        <div className="relative mb-8 aspect-[21/9] overflow-hidden rounded-xl bg-gray-100">
          <img
            src={post.feature_image}
            alt={post.feature_image_alt || post.title}
            className="h-full w-full object-cover"
          />
          {post.feature_image_caption && (
            <p className="absolute right-0 bottom-0 left-0 bg-black/50 p-2 text-center text-xs text-white">
              {post.feature_image_caption}
            </p>
          )}
        </div>
      )}
    </header>
  )
}
