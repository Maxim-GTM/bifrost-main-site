import { NextResponse } from 'next/server'
import { getProviderById } from '@/lib/provider-status/providers'
import { getProviderFullStatus } from '@/lib/provider-status/api'

export const runtime = 'edge'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ provider: string }> }
) {
  const { provider: providerId } = await params
  const provider = getProviderById(providerId)

  if (!provider) {
    return NextResponse.json({ error: 'Provider not found' }, { status: 404 })
  }

  try {
    const status = await getProviderFullStatus(provider)

    return NextResponse.json(
      { ...status, providerName: provider.name, providerLogo: provider.logoPath },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        },
      }
    )
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch provider status' },
      { status: 500 }
    )
  }
}
