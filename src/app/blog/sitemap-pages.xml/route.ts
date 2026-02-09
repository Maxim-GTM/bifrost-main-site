import { transformSitemapXml } from '@/lib/sitemap'
import { NextResponse } from 'next/server'

const SOURCE_URL = 'https://bifrost-1.ghost.io'
const TARGET_URL = 'https://www.getmaxim.ai/bifrost/blog'

export const runtime = 'edge'

async function handler(): Promise<NextResponse> {
  try {
    const response = await fetch('https://bifrost-1.ghost.io/sitemap-pages.xml', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Bifrost/1.0)',
        Origin: 'https://bifrost-1.ghost.io',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch sitemap-pages.xml: ${response.status}`)
    }

    const xml = await response.text()
    const transformedXml = transformSitemapXml(xml, SOURCE_URL, TARGET_URL)

    return new NextResponse(transformedXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch (error) {
    console.error('Error fetching sitemap-pages.xml:', error)
    return new NextResponse('Error fetching sitemap-pages.xml', { status: 500 })
  }
}

export const GET = handler
