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
        className="inline-flex items-center gap-2 mb-6 text-sm text-gray-600 hover:text-accent transition-colors font-mono"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to {type === 'articles' ? 'Articles' : 'Blog'}
      </Link>
      
      <div className="flex items-center gap-2 mb-4">
        {post.tags?.map(tag => (
          <span 
            key={tag.id}
            className="px-2.5 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-full border border-green-200"
          >
            {tag.name}
          </span>
        ))}
      </div>
      
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
        {post.title}
      </h1>
      
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-8">
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
            <p className="text-xs text-gray-500 font-mono">
              {formatDate(post.published_at)} · {post.reading_time} min read
            </p>
          </div>
        </div>
      </div>
      
      {post.feature_image && (
        <div className="relative aspect-[21/9] overflow-hidden rounded-xl bg-gray-100 mb-8">
          <img
            src={post.feature_image}
            alt={post.feature_image_alt || post.title}
            className="w-full h-full object-cover"
          />
          {post.feature_image_caption && (
            <p className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-2 text-center">
              {post.feature_image_caption}
            </p>
          )}
        </div>
      )}
    </header>
  )
}

