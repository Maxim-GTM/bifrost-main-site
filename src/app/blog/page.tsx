import { Metadata } from 'next'
import { PostCard } from '../../components/blog'
import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/sections'
import { getPosts } from '../../lib/ghostBlog'
import './blog.css'

export const metadata: Metadata = {
  title: 'Blog | Bifrost - AI Gateway',
  description: 'Latest updates, tutorials, and insights about Bifrost - the fastest LLM gateway in the world.',
  openGraph: {
    title: 'Blog | Bifrost - AI Gateway',
    description: 'Latest updates, tutorials, and insights about Bifrost - the fastest LLM gateway in the world.',
  }
}

export const revalidate = 60

export default async function BlogPage() {
  const { posts } = await getPosts()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <span className="inline-block mb-4 px-3 py-1 text-xs font-mono text-green-700 bg-green-50 rounded-full border border-green-200">
            [ BIFROST BLOG ]
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Latest Updates & Tutorials
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-mono">
            Insights, integration guides, and updates from the Bifrost team.
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <PostCard key={post.id} post={post} type="blog" />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 font-mono">No posts yet. Check back soon!</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

