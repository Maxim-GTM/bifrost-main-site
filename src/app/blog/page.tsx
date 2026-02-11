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

      <main className="relative flex w-full justify-center">
        {/* Left Side Decoration - Box Style */}
        <div className="hidden w-20 flex-none flex-col items-end gap-4 border-r border-black/10 lg:flex">
          <div
            className="h-full w-full bg-[#F6F6F6] opacity-[0.07]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='4' y='4' width='4' height='4' fill='black'/%3E%3Crect y='8' width='4' height='4' fill='black'/%3E%3Crect x='8' width='4' height='4' fill='black'/%3E%3C/svg%3E")`,
              backgroundSize: '4px 4px',
            }}
          ></div>
        </div>

        {/* Center Content - Max 1100px */}
        <div className="w-full max-w-[1100px] px-4">
          {/* Hero Section */}
          <div className="my-24 text-center">
            <span className="font-mono text-[12px] leading-[15px] font-medium tracking-[0.04em] text-emerald-500 uppercase">
              [&ensp;BIFROST BLOG&ensp;]
            </span>
            <h1 className="mt-2 mb-4 text-[42px] leading-[120%] font-medium tracking-[-0.02em] text-black">
              Latest Updates & Tutorials
            </h1>
            <p className="text-[16px] leading-[140%] tracking-[0em] text-[#525252]">
              Insights, integration guides, and updates from the Bifrost team.
            </p>
          </div>

          {/* Full-width Line */}
          <div className="absolute right-0 left-0 h-px w-full bg-black/10" />

          {/* Posts Grid */}
          <div className="relative z-10 py-4">
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post, index) => (
                  <PostCard key={post.id} post={post} type="blog" index={index} />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <p className="font-mono text-gray-500">No posts yet. Check back soon!</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side Decoration */}
        <div className="hidden w-20 flex-none flex-col items-start gap-4 border-l border-black/10 lg:flex">
          <div
            className="h-full w-full bg-[#F6F6F6] opacity-[0.07]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='4' y='4' width='4' height='4' fill='black'/%3E%3Crect y='8' width='4' height='4' fill='black'/%3E%3Crect x='8' width='4' height='4' fill='black'/%3E%3C/svg%3E")`,
              backgroundSize: '4px 4px',
            }}
          ></div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
