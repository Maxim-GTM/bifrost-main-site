import { getRequestContext } from '@cloudflare/next-on-pages'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

const KV_PREFIX = 'enterprise::customer::'

interface NotificationPreference {
  emails: string[]
  webhooks: string[]
  slackChannelId?: string
}

interface CustomerData {
  notificationPreference: NotificationPreference
}

interface CustomerWithName extends CustomerData {
  name: string
}

function validateAuth (request: NextRequest): NextResponse | null {
  const apiKey = request.headers.get('x-api-key')
  const godKey = process.env.GOD_KEY

  if (!godKey) {
    console.error('GOD_KEY not configured')
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    )
  }

  if (!apiKey || apiKey !== godKey) {
    return NextResponse.json(
      { error: 'Unauthorized: Invalid API key' },
      { status: 401 }
    )
  }

  return null
}

function getKvKey (name: string): string {
  return `${KV_PREFIX}${name}`
}

function extractCustomerName (key: string): string {
  return key.replace(KV_PREFIX, '')
}

function validateNotificationPreference (pref: unknown): pref is NotificationPreference {
  if (!pref || typeof pref !== 'object') return false
  const p = pref as Record<string, unknown>
  const hasRequiredFields = Array.isArray(p.emails) && Array.isArray(p.webhooks)
  const slackChannelIdValid = p.slackChannelId === undefined || typeof p.slackChannelId === 'string'
  return hasRequiredFields && slackChannelIdValid
}

// GET - List all customers or get specific customer by name
export async function GET (request: NextRequest) {
  const authError = validateAuth(request)
  if (authError) return authError

  try {
    const { env } = getRequestContext()
    const kvStore = env.BIFROST_KV

    if (!kvStore) {
      return NextResponse.json(
        { error: 'Storage service not available' },
        { status: 500 }
      )
    }

    const { searchParams } = new URL(request.url)
    const name = searchParams.get('name')

    // Get specific customer
    if (name) {
      const key = getKvKey(name)
      const data = await kvStore.get(key, 'text')

      if (!data) {
        return NextResponse.json(
          { error: 'Customer not found' },
          { status: 404 }
        )
      }

      const customerData: CustomerData = JSON.parse(data as string)
      return NextResponse.json({
        customer: { name, ...customerData }
      })
    }

    // List all customers
    const listResult = await kvStore.list({ prefix: KV_PREFIX })
    const customers: CustomerWithName[] = []

    for (const key of listResult.keys) {
      const data = await kvStore.get(key.name, 'text')
      if (data) {
        const customerData: CustomerData = JSON.parse(data as string)
        customers.push({
          name: extractCustomerName(key.name),
          ...customerData
        })
      }
    }

    return NextResponse.json({ customers })
  } catch (error) {
    console.error('Error in GET /api/customer:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create a new customer
export async function POST (request: NextRequest) {
  const authError = validateAuth(request)
  if (authError) return authError

  try {
    const { env } = getRequestContext()
    const kvStore = env.BIFROST_KV

    if (!kvStore) {
      return NextResponse.json(
        { error: 'Storage service not available' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { name, notificationPreference } = body

    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: 'Customer name is required' },
        { status: 400 }
      )
    }

    if (!validateNotificationPreference(notificationPreference)) {
      return NextResponse.json(
        { error: 'Invalid notificationPreference format. Expected { emails: [], webhooks: [], slackChannelId?: string }' },
        { status: 400 }
      )
    }

    const key = getKvKey(name)

    // Check if customer already exists
    const existing = await kvStore.get(key, 'text')
    if (existing) {
      return NextResponse.json(
        { error: 'Customer already exists' },
        { status: 409 }
      )
    }

    const customerData: CustomerData = { notificationPreference }
    await kvStore.put(key, JSON.stringify(customerData))

    return NextResponse.json(
      {
        message: 'Customer created successfully',
        customer: { name, ...customerData }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error in POST /api/customer:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update existing customer
export async function PUT (request: NextRequest) {
  const authError = validateAuth(request)
  if (authError) return authError

  try {
    const { env } = getRequestContext()
    const kvStore = env.BIFROST_KV

    if (!kvStore) {
      return NextResponse.json(
        { error: 'Storage service not available' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { name, notificationPreference } = body

    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: 'Customer name is required' },
        { status: 400 }
      )
    }

    if (!validateNotificationPreference(notificationPreference)) {
      return NextResponse.json(
        { error: 'Invalid notificationPreference format. Expected { emails: [], webhooks: [], slackChannelId?: string }' },
        { status: 400 }
      )
    }

    const key = getKvKey(name)

    // Check if customer exists
    const existing = await kvStore.get(key, 'text')
    if (!existing) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      )
    }

    const customerData: CustomerData = { notificationPreference }
    await kvStore.put(key, JSON.stringify(customerData))

    return NextResponse.json({
      message: 'Customer updated successfully',
      customer: { name, ...customerData }
    })
  } catch (error) {
    console.error('Error in PUT /api/customer:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete a customer
export async function DELETE (request: NextRequest) {
  const authError = validateAuth(request)
  if (authError) return authError

  try {
    const { env } = getRequestContext()
    const kvStore = env.BIFROST_KV

    if (!kvStore) {
      return NextResponse.json(
        { error: 'Storage service not available' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { name } = body

    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: 'Customer name is required' },
        { status: 400 }
      )
    }

    const key = getKvKey(name)

    // Check if customer exists
    const existing = await kvStore.get(key, 'text')
    if (!existing) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      )
    }

    await kvStore.delete(key)

    return NextResponse.json({
      message: 'Customer deleted successfully',
      name
    })
  } catch (error) {
    console.error('Error in DELETE /api/customer:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

