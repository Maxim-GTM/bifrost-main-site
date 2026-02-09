import { Metadata } from 'next'
import { PostCard } from '../../components/blog'
import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/sections'
import { getPosts } from '../../lib/ghostBlog'
import CornerBracketLink from '@/components/CornerBracketLink'
import './blog.css'

export const metadata: Metadata = {
  title: 'Blog | Bifrost - AI Gateway',
  description:
    'Latest updates, tutorials, and insights about Bifrost - the fastest LLM gateway in the world.',
  openGraph: {
    title: 'Blog | Bifrost - AI Gateway',
    description:
      'Latest updates, tutorials, and insights about Bifrost - the fastest LLM gateway in the world.',
  },
}

export const revalidate = 60

export default async function BlogPage() {
  const { posts } = await getPosts()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mt-16 mb-32 text-center">
          <h3 className="font-mono text-[12px] leading-[15px] font-medium tracking-[0.04em] text-emerald-500 uppercase">
            [&ensp;BIFROST BLOG&ensp;]
          </h3>
          <h1 className="mt-2 mb-4 text-[48px] leading-[120%] font-medium tracking-[-0.02em] text-black">
            Latest Updates & Tutorials
          </h1>
          <p className="text-[16px] leading-[140%] tracking-[0em] text-[#525252]">
            Insights, integration guides, and updates from the Bifrost team.
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} type="blog" />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="font-mono text-gray-500">No posts yet. Check back soon!</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
