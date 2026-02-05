const GHOST_URL = 'https://bifrost-1.ghost.io'
const GHOST_KEY = 'abf19aa6ad80f3dc293be1f9f3'
const GHOST_VERSION = 'v5.0'
const PROXY_BASE_URL = 'https://www.getmaxim.ai/bifrost/blog'

/**
 * Rewrites Ghost URLs to use our proxy
 */
export function proxyGhostUrl(url: string | null): string | null {
  if (!url) return null
  return url.replace(GHOST_URL, PROXY_BASE_URL)
}

/**
 * Rewrites all Ghost URLs in HTML content to use our proxy
 */
export function proxyGhostContent(html: string): string {
  return html.replace(new RegExp(GHOST_URL, 'g'), PROXY_BASE_URL)
}

export interface GhostAuthor {
  id: string
  name: string
  slug: string
  profile_image: string | null
  bio: string | null
  url: string
}

export interface GhostTag {
  id: string
  name: string
  slug: string
  description: string | null
  url: string
}

export interface GhostPost {
  id: string
  uuid: string
  title: string
  slug: string
  html: string
  excerpt: string
  feature_image: string | null
  feature_image_alt: string | null
  feature_image_caption: string | null
  featured: boolean
  published_at: string
  updated_at: string
  created_at: string
  reading_time: number
  authors: GhostAuthor[]
  primary_author: GhostAuthor
  tags: GhostTag[]
  primary_tag: GhostTag | null
  url: string
  custom_excerpt: string | null
}

export interface GhostPostsResponse {
  posts: GhostPost[]
  meta: {
    pagination: {
      page: number
      limit: number
      pages: number
      total: number
      next: number | null
      prev: number | null
    }
  }
}

async function ghostFetch<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`${GHOST_URL}/ghost/api/content/${endpoint}`)
  url.searchParams.set('key', GHOST_KEY)
  
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value)
  })

  const res = await fetch(url.toString(), {
    headers: {
      'Accept-Version': GHOST_VERSION
    },
    next: { revalidate: 60 } // Revalidate every 60 seconds
  })

  if (!res.ok) {
    throw new Error(`Ghost API error: ${res.status} ${res.statusText}`)
  }

  return res.json()
}

export async function getPosts(options: { limit?: number; page?: number; filter?: string } = {}): Promise<GhostPostsResponse> {
  const params: Record<string, string> = {
    include: 'tags,authors',
    limit: options.limit?.toString() || 'all',
    order: 'published_at desc'
  }

  if (options.page) {
    params.page = options.page.toString()
  }

  if (options.filter) {
    params.filter = options.filter
  }

  return ghostFetch<GhostPostsResponse>('posts/', params)
}

export async function getPostBySlug(slug: string): Promise<GhostPost | null> {
  try {
    const response = await ghostFetch<{ posts: GhostPost[] }>(`posts/slug/${slug}/`, {
      include: 'tags,authors'
    })
    return response.posts[0] || null
  } catch {
    return null
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  const response = await getPosts({ limit: 100 })
  return response.posts.map(post => post.slug)
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

export function calculateReadingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, '')
  const words = text.split(/\s+/).length
  return Math.ceil(words / 200)
}




