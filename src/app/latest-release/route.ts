import { getRequestContext } from '@cloudflare/next-on-pages'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

const CACHE_KEY = 'latest-release'
const CACHE_TTL = 600 // 10 minutes in seconds

async function handler() {
  try {
    const { env } = getRequestContext()
    const kv = env.BIFROST_KV

    // Try to get cached data from Cloudflare KV
    if (kv) {
      const cached = await kv.get(CACHE_KEY, 'json')
      if (cached) {
        return NextResponse.json(cached, {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=3600',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            'X-Cache': 'HIT',
          },
        })
      }
    }
  } catch (kvError) {
    // If KV fails, continue to fetch from GitHub
    console.warn('KV cache read failed:', kvError)
  }
  try {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    }

    // Add authorization if GITHUB_TOKEN is available
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
    }

    // Paginate through tags to find the latest transports/* tag
    let page = 1
    const perPage = 30 // Max allowed by GitHub API
    let latestTransportTag = null

    while (!latestTransportTag && page <= 10) {
      // Limit to 10 pages (1000 tags max)
      const response = await fetch(
        `https://api.github.com/repos/maximhq/bifrost/tags?per_page=${perPage}&page=${page}`,
        { headers }
      )

      if (!response.ok) {
        throw new Error(`Failed to fetch tags: ${response.status}`)
      }

      const tags = await response.json()

      // If no tags returned, we've reached the end
      if (!Array.isArray(tags) || tags.length === 0) {
        break
      }

      // Find the first transports/* tag
      latestTransportTag = tags.find((tag: { name: string }) => tag.name.startsWith('transports/'))

      // If found, break out of the loop
      if (latestTransportTag) {
        break
      }

      page++
    }

    if (!latestTransportTag) {
      return NextResponse.json({ error: 'No transport tags found' }, { status: 404 })
    }

    // Return the latest transport tag
    const latestVersion = latestTransportTag.name.replace('transports/', '')
    const responseData = {
      name: latestVersion,
      changelogUrl: `https://docs.getbifrost.ai/changelogs/${latestVersion}`,
    }

    // Store in Cloudflare KV cache
    try {
      const { env } = getRequestContext()
      const kv = env.BIFROST_KV
      if (kv) {
        await kv.put(CACHE_KEY, JSON.stringify(responseData), {
          expirationTtl: CACHE_TTL,
        })
      }
    } catch (kvError) {
      // If KV fails, just log and continue
      console.warn('KV cache write failed:', kvError)
    }

    return NextResponse.json(responseData, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=3600',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        'X-Cache': 'MISS',
      },
    })
  } catch (error) {
    console.error('Error fetching latest Bifrost transport release:', error)
    return NextResponse.json({ error: 'Failed to fetch latest release' }, { status: 500 })
  }
}

export const GET = handler
