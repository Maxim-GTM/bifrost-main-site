import { NextResponse } from 'next/server'
import { getAllProviderStatuses } from '@/lib/provider-status/api'

export const runtime = 'edge'

export async function GET() {
  try {
    const statuses = await getAllProviderStatuses()

    const data = statuses.map(({ provider, ...status }) => ({
      ...status,
      providerName: provider.name,
      providerLogo: provider.logoPath,
    }))

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    })
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch provider statuses' },
      { status: 500 }
    )
  }
}
