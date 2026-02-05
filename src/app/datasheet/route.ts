import { filterByCapability, filterByMode, filterByProvider, transformData } from '@/lib/modelData'
import { ModelMode, ModelPricing } from '@/types/modelPricing'
import { getRequestContext } from '@cloudflare/next-on-pages'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

const CACHE_KEY_PREFIX = 'datasheet'
const CACHE_TTL = 3600 // 1 hour in seconds

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Extract query parameters
    const searchParams = request.nextUrl.searchParams
    const provider = searchParams.get('provider')
    const mode = searchParams.get('mode')
    const capability = searchParams.get('capability')
    const modelName = searchParams.get('model')
    const forceRefresh = searchParams.get('forceRefresh')
    
    // Create cache key based on query params
    const queryString = searchParams.toString()
    const cacheKey = queryString ? `${CACHE_KEY_PREFIX}:${queryString}` : `${CACHE_KEY_PREFIX}:all`
    
    // Try to get cached data from Cloudflare KV
    try {
      const { env } = getRequestContext()
      const kv = env.BIFROST_KV

      if (kv && !forceRefresh) {
        const cached = await kv.get(cacheKey, 'json')
        if (cached) {
          return NextResponse.json(cached, {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type, Authorization',
              'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
              'X-Cache': 'HIT'
            }
          })
        }
      }
    } catch (kvError) {
      // If KV fails, continue to fetch from source
      console.warn('KV cache read failed:', kvError)
    }

    // Fetch the data
    const response = await fetch(
      'https://raw.githubusercontent.com/BerriAI/litellm/refs/heads/main/litellm/model_prices_and_context_window_backup.json',
      {
        headers: {
          Accept: 'application/json'
        }
      }
    )
    if (!response.ok) {
      const errorText = await response.text()
      console.error(`GitHub API error: ${response.status} - ${errorText}`)
      return NextResponse.json(
        {
          error: 'Failed to fetch model data',
          status: response.status,
          details: response.statusText,
        },
        { status: response.status }
      )
    }
    const rawData: ModelPricing = await response.json()

    // Transform the data to map litellm_provider to provider
    let data: ModelPricing = transformData(rawData)

    if (modelName) {
      if (provider) {
        const models = filterByProvider(data, provider)
        if (provider === 'openai' && modelName.startsWith('openai/')) {
          return NextResponse.json(models[modelName.replace('openai/', '')] || {})
        }
        return NextResponse.json(models[modelName] || {})
      }
      return NextResponse.json(data[modelName] ?? {})
    }

    // Apply filters if query parameters are present
    if (provider) {
      data = filterByProvider(data, provider)
    }

    if (mode) {
      data = filterByMode(data, mode as ModelMode)
    }

    if (capability) {
      // Use type assertion with a more specific type
      const capabilityKey = `supports_${capability}` as
        | 'supports_vision'
        | 'supports_function_calling'
        | 'supports_audio_input'
        | 'supports_audio_output'
        | 'supports_reasoning'
        | 'supports_web_search'
      data = filterByCapability(data, capabilityKey)
    }

    // Store in Cloudflare KV cache
    try {
      const { env } = getRequestContext()
      const kv = env.BIFROST_KV
      if (kv) {
        await kv.put(cacheKey, JSON.stringify(data), {
          expirationTtl: CACHE_TTL
        })
      }
    } catch (kvError) {
      // If KV fails, just log and continue
      console.warn('KV cache write failed:', kvError)
    }

    // Forward the data with appropriate headers
    return NextResponse.json(data, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        'X-Cache': 'MISS'
      }
    })
  } catch (error) {
    console.error('Error fetching model data:', error)
    // Determine if the error is a network error
    const isNetworkError =
      error instanceof Error &&
      (error.message.includes('fetch') || error.message.includes('network'))

    return NextResponse.json(
      {
        error: 'Failed to fetch model data',
        message: error instanceof Error ? error.message : 'Unknown error',
        type: isNetworkError ? 'network_error' : 'unknown_error',
      },
      {
        status: isNetworkError ? 503 : 500,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      }
    )
  }
}
