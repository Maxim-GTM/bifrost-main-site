import { Metadata } from 'next'
import { PostCard } from '../../components/blog'
import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/sections'
import { getArticles } from '../../lib/ghostArticles'
import './blog.css'

export const metadata: Metadata = {
  title: 'Articles | Bifrost - AI Gateway',
  description:
    'Latest updates, tutorials, and insights about Bifrost - the fastest LLM gateway in the world.',
  openGraph: {
    title: 'Articles | Bifrost - AI Gateway',
    description:
      'Latest updates, tutorials, and insights about Bifrost - the fastest LLM gateway in the world.',
  },
}

export const revalidate = 60

export default async function BlogPage() {
  const { posts } = await getArticles()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full border border-green-200 bg-green-50 px-3 py-1 font-mono text-xs text-green-700">
            [ BIFROST ARTICLES ]
          </span>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Latest Updates & Tutorials
          </h1>
          <p className="mx-auto max-w-2xl font-mono text-lg text-gray-600">
            Insights, integration guides, and updates from the Bifrost team.
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <PostCard index={index} post={post} type="articles" />
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
