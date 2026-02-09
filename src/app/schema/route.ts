import { NextResponse } from 'next/server'

export const runtime = 'edge'
export const revalidate = 3600 // Revalidate this data once per hour

async function handler(): Promise<NextResponse> {
  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/maximhq/bifrost/refs/heads/main/transports/config.schema.json',
      {
        headers: {
          Accept: 'application/json',
        },
        next: { revalidate },
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch schema: ${response.status}`)
    }

    const schema = await response.json()

    return NextResponse.json(schema, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  } catch (error) {
    console.error('Error fetching Bifrost schema:', error)
    return NextResponse.json({ error: 'Failed to fetch schema' }, { status: 500 })
  }
}

export const GET = handler
