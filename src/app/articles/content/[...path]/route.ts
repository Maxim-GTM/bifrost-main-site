import { NextRequest, NextResponse } from 'next/server'

const GHOST_URL = 'https://bifrost-articles.ghost.io'

export const runtime = 'edge'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
): Promise<NextResponse> {
  const { path } = await params
  const contentPath = path.join('/')

  try {
    const ghostUrl = `${GHOST_URL}/content/${contentPath}`

    const response = await fetch(ghostUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Bifrost/1.0)',
      },
    })

    if (!response.ok) {
      return new NextResponse(`Content not found: ${contentPath}`, {
        status: response.status,
      })
    }

    const contentType = response.headers.get('content-type') || 'application/octet-stream'
    const buffer = await response.arrayBuffer()

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    console.error('Error proxying content:', error)
    return new NextResponse('Error fetching content', { status: 500 })
  }
}
