const GHOST_ARTICLES_URL = 'https://bifrost-articles.ghost.io'
const GHOST_ARTICLES_KEY = 'b9ab014e6d5ff7dc437ecac883'
const GHOST_ARTICLES_VERSION = 'v5.0'
const PROXY_ARTICLES_BASE_URL = 'https://www.getmaxim.ai/bifrost/articles'

/**
 * Rewrites Ghost URLs to use our proxy
 */
export function proxyArticlesUrl(url: string | null): string | null {
  if (!url) return null
  return url.replace(GHOST_ARTICLES_URL, PROXY_ARTICLES_BASE_URL)
}

/**
 * Rewrites all Ghost URLs in HTML content to use our proxy
 */
export function proxyArticlesContent(html: string): string {
  return html.replace(new RegExp(GHOST_ARTICLES_URL, 'g'), PROXY_ARTICLES_BASE_URL)
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

async function ghostArticlesFetch<T>(
  endpoint: string,
  params: Record<string, string> = {}
): Promise<T> {
  const url = new URL(`${GHOST_ARTICLES_URL}/ghost/api/content/${endpoint}`)
  url.searchParams.set('key', GHOST_ARTICLES_KEY)

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value)
  })

  const res = await fetch(url.toString(), {
    headers: {
      'Accept-Version': GHOST_ARTICLES_VERSION,
    },
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  })

  if (!res.ok) {
    throw new Error(`Ghost Articles API error: ${res.status} ${res.statusText}`)
  }

  return res.json()
}

export async function getArticles(
  options: { limit?: number; page?: number; filter?: string } = {}
): Promise<GhostPostsResponse> {
  const params: Record<string, string> = {
    include: 'tags,authors',
    limit: options.limit?.toString() || 'all',
    order: 'published_at desc',
  }

  if (options.page) {
    params.page = options.page.toString()
  }

  if (options.filter) {
    params.filter = options.filter
  }

  return ghostArticlesFetch<GhostPostsResponse>('posts/', params)
}

export async function getArticleBySlug(slug: string): Promise<GhostPost | null> {
  try {
    const response = await ghostArticlesFetch<{ posts: GhostPost[] }>(`posts/slug/${slug}/`, {
      include: 'tags,authors',
    })
    return response.posts[0] || null
  } catch {
    return null
  }
}

export async function getAllArticleSlugs(): Promise<string[]> {
  const response = await getArticles({ limit: 100 })
  return response.posts.map((post) => post.slug)
}
