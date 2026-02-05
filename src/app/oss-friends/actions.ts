'use server'

interface FormbricksOSSFriend {
  name: string
  description: string
  href: string
}

interface OSSFriend {
  id: string
  name: string
  description: string
  url: string
  githubUrl: string
  logo: string
  category: string
  stars?: number
  language?: string
}

// Helper function to extract domain from URL and generate logo URL with Logo.dev
function getLogoUrl(url: string): string {
  try {
    const domain = new URL(url).hostname.replace('www.', '')
    
    // Use Logo.dev API with your token
    const logoDevToken = 'pk_C1s8CGvARzeNAolBBFW-dg'
    return `https://img.logo.dev/${domain}?token=${logoDevToken}&size=128&format=webp&retina=true`
  } catch {
    return ''
  }
}

export async function getOSSFriends(): Promise<OSSFriend[]> {
  try {
    const response = await fetch('https://formbricks.com/api/oss-friends', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Add cache control to prevent stale data
      next: { revalidate: 3600 } // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch OSS friends: ${response.status} ${response.statusText}`)
    }

    const result = await response.json()
    const formbricksData: FormbricksOSSFriend[] = result.data || []

    // Transform Formbricks data to match our interface
    const transformedData: OSSFriend[] = formbricksData.map((friend, index) => ({
      id: `formbricks-${index}`,
      name: friend.name,
      description: friend.description,
      url: friend.href,
      githubUrl: `https://github.com/${friend.name.toLowerCase()}`, // Approximate GitHub URL
      logo: getLogoUrl(friend.href), // Use Logo.dev API
      category: 'Open Source', // Default category since not provided
      stars: undefined,
      language: undefined
    }))

    // Add our original friends to the list
    const originalFriends: OSSFriend[] = []

    return [...originalFriends, ...transformedData]
  } catch (error) {
    console.error('Error fetching OSS friends:', error)
    // Return fallback data on error
    return [
      {
        id: 'litellm',
        name: 'LiteLLM',
        description: 'Use any LLM as a drop in replacement for gpt-3.5-turbo. Use Azure, OpenAI, Cohere, Anthropic, Ollama, VLLM, Sagemaker, HuggingFace, Replicate (100+ LLMs)',
        url: 'https://litellm.ai',
        githubUrl: 'https://github.com/BerriAI/litellm',
        logo: '/litellm-logo.png',
        category: 'LLM Gateway',
        stars: 12500,
        language: 'Python'
      },
      {
        id: 'composio',
        name: 'Composio',
        description: 'Integration platform for AI agents & LLMs. Connect to 200+ tools with natural language',
        url: 'https://composio.dev',
        githubUrl: 'https://github.com/ComposioHQ/composio',
        logo: '/composio-logo.svg',
        category: 'AI Tools',
        stars: 8900,
        language: 'Python'
      }
    ]
  }
} 