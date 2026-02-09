import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogContent, PostHeader, TableOfContents } from '../../../components/blog'
import { Navbar } from '../../../components/Navbar'
import { Footer } from '../../../components/sections'
import { getAllPostSlugs, getPostBySlug } from '../../../lib/ghostBlog'
import '../blog.css'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found | Bifrost Blog',
    }
  }

  return {
    title: `${post.title} | Bifrost Blog`,
    description: post.custom_excerpt || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.custom_excerpt || post.excerpt,
      type: 'article',
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      authors: post.authors?.map((a) => a.name),
      images: post.feature_image ? [{ url: post.feature_image }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.custom_excerpt || post.excerpt,
      images: post.feature_image ? [post.feature_image] : [],
    },
  }
}

export const revalidate = 60

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  // Add IDs to headings for ToC navigation
  const htmlWithIds = post.html.replace(
    /<h([23])([^>]*)>(.*?)<\/h\1>/gi,
    (match, level, attrs, content) => {
      const id = content
        .toLowerCase()
        .replace(/<[^>]*>/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      return `<h${level}${attrs} id="${id}">${content}</h${level}>`
    }
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="lg:flex lg:gap-8">
          {/* Main Content */}
          <main className="min-w-0 flex-1">
            <article className="max-w-3xl">
              <PostHeader post={post} type="blog" />

              <BlogContent html={htmlWithIds} />
            </article>
          </main>

          {/* Sticky ToC Widget */}
          <aside className="hidden w-[280px] flex-shrink-0 lg:block">
            <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-md border border-gray-200 bg-white p-5">
              <TableOfContents html={htmlWithIds} />
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  )
}
