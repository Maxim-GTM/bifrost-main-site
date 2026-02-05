import { getRequestContext } from '@cloudflare/next-on-pages'
import { NextRequest, NextResponse } from 'next/server'

interface EmailResult {
  email: string
  success: boolean
  error?: string
}

interface SlackResult {
  channelId: string
  customerName: string
  success: boolean
  error?: string
}

interface RequestBody {
  transactionalId?: string
  dataVariables?: Record<string, string>
}

interface NotificationPreference {
  emails: string[]
  webhooks: string[]
  slackChannelId?: string
}

interface CustomerData {
  notificationPreference: NotificationPreference
}

interface CustomerSlackInfo {
  name: string
  slackChannelId: string
}

interface SlackUser {
  id: string
  is_bot: boolean
  profile?: {
    email?: string
  }
}

interface SlackMemberResult {
  emails: string[]
  error?: string
}

const KV_PREFIX = 'enterprise::customer::'

export const runtime = 'edge'

// Workers-compatible Loops send function using native fetch
async function sendLoopsEmail (
  apiKey: string,
  transactionalId: string,
  email: string,
  dataVariables: Record<string, string>
): Promise<{ success: boolean, error?: string }> {
  try {
    const response = await fetch('https://app.loops.so/api/v1/transactional', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        transactionalId,
        email,
        dataVariables
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      const errorMessage = (errorData as { message?: string }).message || `HTTP ${response.status}`
      return { success: false, error: `Loops error: ${errorMessage}` }
    }

    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown fetch error'
    }
  }
}

// Format dataVariables into Slack Block Kit blocks
interface SlackBlock {
  type: string
  text?: {
    type: string
    text: string
    emoji?: boolean
  }
}

function formatSlackBlocks (dataVariables: Record<string, string>): { text: string, blocks: SlackBlock[] } {
  const blocks: SlackBlock[] = []
  const fallbackText = '📦 New Enterprise Update Available'

  // Header block
  blocks.push({
    type: 'header',
    text: {
      type: 'plain_text',
      text: '📦 New Enterprise Update Available',
      emoji: true
    }
  })

  const entries = Object.entries(dataVariables)
  if (entries.length === 0) {
    blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: 'A new update has been released for your Bifrost instance.'
      }
    })
    return { text: fallbackText, blocks }
  }

  // Extract version separately
  const version = dataVariables.version
  if (version) {
    blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Version:* \`${version}\``
      }
    })
  }

  // Get changelog items (all entries except version, skip empty values)
  const changelogItems = entries
    .filter(([key, value]) => key !== 'version' && value && value.trim() !== '')
    .map(([, value]) => value)

  if (changelogItems.length > 0) {
    blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*Changelog:*\n' + changelogItems.map(item => `• ${item}`).join('\n')
      }
    })
  }

  return { text: fallbackText, blocks }
}

// Fetch all member emails from a Slack channel (filtering out bots)
async function fetchSlackChannelMemberEmails (
  botToken: string,
  channelId: string
): Promise<SlackMemberResult> {
  try {
    // Step 1: Get all member IDs from the channel
    const membersResponse = await fetch(`https://slack.com/api/conversations.members?channel=${channelId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${botToken}`,
        'Content-Type': 'application/json'
      }
    })

    if (!membersResponse.ok) {
      return { emails: [], error: `HTTP ${membersResponse.status}` }
    }

    const membersData = await membersResponse.json() as {
      ok: boolean
      members?: string[]
      error?: string
    }

    if (!membersData.ok) {
      return { emails: [], error: `Slack error: ${membersData.error}` }
    }

    const memberIds = membersData.members || []
    if (memberIds.length === 0) {
      return { emails: [] }
    }

    // Step 2: Fetch user info for each member to get their email
    const emails: string[] = []

    for (const userId of memberIds) {
      try {
        const userResponse = await fetch(`https://slack.com/api/users.info?user=${userId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${botToken}`,
            'Content-Type': 'application/json'
          }
        })

        if (!userResponse.ok) {
          console.warn(`Failed to fetch user info for ${userId}: HTTP ${userResponse.status}`)
          continue
        }

        const userData = await userResponse.json() as {
          ok: boolean
          user?: SlackUser
          error?: string
        }

        if (!userData.ok || !userData.user) {
          console.warn(`Failed to fetch user info for ${userId}: ${userData.error}`)
          continue
        }

        const user = userData.user

        // Skip bots
        if (user.is_bot) {
          continue
        }

        // Add email if available
        const email = user.profile?.email
        if (email) {
          emails.push(email)
        }
      } catch (userError) {
        console.warn(`Error fetching user ${userId}:`, userError)
        continue
      }
    }

    return { emails }
  } catch (error) {
    return {
      emails: [],
      error: error instanceof Error ? error.message : 'Unknown fetch error'
    }
  }
}

// Workers-compatible Slack send function using native fetch
async function sendSlackMessage (
  botToken: string,
  channelId: string,
  dataVariables: Record<string, string>
): Promise<{ success: boolean, error?: string }> {
  try {
    const { text, blocks } = formatSlackBlocks(dataVariables)

    const response = await fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${botToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        channel: channelId,
        text,
        blocks
      })
    })

    if (!response.ok) {
      return { success: false, error: `HTTP ${response.status}` }
    }

    const data = await response.json() as { ok: boolean, error?: string }

    if (!data.ok) {
      return { success: false, error: `Slack error: ${data.error}` }
    }

    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown fetch error'
    }
  }
}

export async function POST (request: NextRequest) {
  try {
    // 1. Validate API key authentication
    const apiKey = request.headers.get('x-api-key')
    const expectedApiKey = process.env.GOD_KEY
    
    if (!expectedApiKey) {
      console.error('GOD_KEY not configured')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }
    
    if (!apiKey || apiKey !== expectedApiKey) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid API key' },
        { status: 401 }
      )
    }

    // 2. Validate Loops configuration
    const loopsApiKey = process.env.LOOPS_API_KEY
    const defaultTransactionalId = process.env.LOOPS_TRANSACTIONAL_ID

    if (!loopsApiKey) {
      console.error('LOOPS_API_KEY not configured')
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    // 3. Get email list from Cloudflare KV
    const { env } = getRequestContext()
    const kvStore = env.BIFROST_KV
    
    if (!kvStore) {
      console.error('KV store not available')
      return NextResponse.json(
        { error: 'Storage service not available' },
        { status: 500 }
      )
    }

    // Get all enterprise customers from KV
    const listResult = await kvStore.list({ prefix: KV_PREFIX })
    
    if (!listResult.keys || listResult.keys.length === 0) {
      console.error('No enterprise customers found in KV store')
      return NextResponse.json(
        { error: 'No subscribers found', sent: 0, failed: 0 },
        { status: 404 }
      )
    }
    
    // Collect all emails and Slack channels from all customers
    const emailSet = new Set<string>()
    const slackChannels: CustomerSlackInfo[] = []
    for (const key of listResult.keys) {
      try {
        const data = await kvStore.get(key.name, 'text')
        if (data && typeof data === 'string') {
          const customerData: CustomerData = JSON.parse(data)
          const customerName = key.name.replace(KV_PREFIX, '')
          if (customerData.notificationPreference?.emails) {
            for (const email of customerData.notificationPreference.emails) {
              emailSet.add(email)
            }
          }
          if (customerData.notificationPreference?.slackChannelId) {
            slackChannels.push({
              name: customerName,
              slackChannelId: customerData.notificationPreference.slackChannelId
            })
          }
        }
      } catch (parseError) {
        console.error(`Failed to parse customer data for ${key.name}:`, parseError)
      }
    }

    // Fetch emails from Slack channel members and add to email set (deduped)
    const slackBotToken = process.env.SLACK_BOT_TOKEN
    if (slackBotToken && slackChannels.length > 0) {
      for (const { name, slackChannelId } of slackChannels) {
        const result = await fetchSlackChannelMemberEmails(slackBotToken, slackChannelId)
        if (result.error) {
          console.warn(`Failed to fetch Slack channel members for ${name} (${slackChannelId}): ${result.error}`)
        } else if (result.emails.length > 0) {
          console.log(`Found ${result.emails.length} emails from Slack channel ${slackChannelId} for customer ${name}`)
          for (const email of result.emails) {
            // if its getmaxim.ai email address, then we skip it
            if (email.includes('@getmaxim.ai')) {
              continue
            }
            emailSet.add(email)
          }
        }
      }
    }

    const emailList = Array.from(emailSet)

    if (emailList.length === 0) {
      return NextResponse.json(
        { error: 'No valid email addresses found', sent: 0, failed: 0 },
        { status: 404 }
      )
    }

    // 4. Parse request body for email customization
    let body: RequestBody = {}
    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      )
    }

    // Use transactionalId from request or fallback to env
    const transactionalId = body.transactionalId || defaultTransactionalId
    if (!transactionalId) {
      return NextResponse.json(
        { error: 'transactionalId is required (pass in body or set LOOPS_TRANSACTIONAL_ID env)' },
        { status: 400 }
      )
    }

    // 5. Use dataVariables from request body (forward as-is to Loops)
    const dataVariables = body.dataVariables || {}

    // 6. Send emails to all subscribers using Loops API
    const results: EmailResult[] = []
    
    for (const email of emailList) {
      const result = await sendLoopsEmail(
        loopsApiKey,
        transactionalId,
        email,
        dataVariables
      )

      results.push({
        email,
        success: result.success,
        error: result.error
      })

      if (result.success) {
        console.log(`Successfully sent email to: ${email}`)
      } else {
        console.error(`Failed to send email to ${email}:`, result.error)
      }
    }

    // 7. Calculate email results
    const successCount = results.filter(r => r.success).length
    const failureCount = results.filter(r => !r.success).length
    const failedEmails = results.filter(r => !r.success).map(r => ({
      email: r.email,
      error: r.error
    }))

    // 8. Send Slack notifications
    const slackResults: SlackResult[] = []

    if (slackBotToken && slackChannels.length > 0) {
      for (const { name, slackChannelId } of slackChannels) {
        const result = await sendSlackMessage(
          slackBotToken,
          slackChannelId,
          dataVariables
        )

        slackResults.push({
          channelId: slackChannelId,
          customerName: name,
          success: result.success,
          error: result.error
        })

        if (result.success) {
          console.log(`Successfully sent Slack message to channel ${slackChannelId} for customer ${name}`)
        } else {
          console.error(`Failed to send Slack message to channel ${slackChannelId} for customer ${name}:`, result.error)
        }
      }
    } else if (slackChannels.length > 0 && !slackBotToken) {
      console.warn('SLACK_BOT_TOKEN not configured, skipping Slack notifications')
    }

    // 9. Calculate Slack results
    const slackSuccessCount = slackResults.filter(r => r.success).length
    const slackFailureCount = slackResults.filter(r => !r.success).length
    const failedSlackMessages = slackResults.filter(r => !r.success).map(r => ({
      channelId: r.channelId,
      customerName: r.customerName,
      error: r.error
    }))

    // 10. Return response based on results
    if (successCount === 0) {
      return NextResponse.json(
        {
          error: 'All emails failed to send',
          sent: 0,
          failed: failureCount,
          failures: failedEmails,
          slack: {
            sent: slackSuccessCount,
            failed: slackFailureCount,
            total: slackChannels.length,
            ...(slackFailureCount > 0 && { failures: failedSlackMessages })
          }
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        message: 'Email campaign completed',
        sent: successCount,
        failed: failureCount,
        total: emailList.length,
        ...(failureCount > 0 && { failures: failedEmails }),
        slack: {
          sent: slackSuccessCount,
          failed: slackFailureCount,
          total: slackChannels.length,
          ...(slackFailureCount > 0 && { failures: failedSlackMessages })
        }
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Unexpected error in trigger-enterprise-update:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
