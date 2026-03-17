import { type Metadata } from 'next'
import { type StatusProviderConfig } from './providers'
import { getProviderStatusBaseUrl } from '@/lib/utils'

export function getMainPageMetadata(): Metadata {
  const baseUrl = `https://getmaxim.ai${getProviderStatusBaseUrl()}/provider-status`

  return {
    title: 'AI Provider Status Monitor — Real-Time Uptime for LLM APIs | Bifrost',
    description:
      'Real-time status monitoring for AI model providers. Check if ChatGPT, Claude, Gemini, Mistral, and other AI services are down. Live uptime tracking and incident history.',
    keywords:
      'ai status, chatgpt status, claude status, is chatgpt down, is claude down, openai status, anthropic status, llm status, ai provider uptime, ai api status',
    alternates: {
      canonical: baseUrl,
    },
    openGraph: {
      title: 'AI Provider Status Monitor | Bifrost',
      description:
        'Real-time status monitoring for AI model providers. Check if ChatGPT, Claude, Gemini, and other AI services are operational.',
      url: baseUrl,
      type: 'website',
    },
  }
}

export function getProviderPageMetadata(provider: StatusProviderConfig): Metadata {
  const baseUrl = `https://getmaxim.ai${getProviderStatusBaseUrl()}/provider-status`
  const url = `${baseUrl}/${provider.id}`

  const aliasKeywords = provider.aliases
    .flatMap((a) => [`is ${a} down`, `${a} status`, `${a} outage`])
    .join(', ')

  return {
    title: `Is ${provider.name} Down? — ${provider.name} Status | Bifrost`,
    description: `Real-time ${provider.name} status and uptime monitoring. Check if ${provider.name} API is down, view active incidents, component status, and incident history. ${provider.description}`,
    keywords: `${provider.name.toLowerCase()} status, is ${provider.name.toLowerCase()} down, ${aliasKeywords}, ${provider.name.toLowerCase()} outage, ${provider.name.toLowerCase()} uptime`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${provider.name} Status — Is ${provider.name} Down? | Bifrost`,
      description: `Real-time ${provider.name} status monitoring. Check current uptime, active incidents, and service health.`,
      url,
      type: 'website',
    },
  }
}

export function getProviderPageJsonLd(provider: StatusProviderConfig) {
  const baseUrl = `https://getmaxim.ai${getProviderStatusBaseUrl()}/provider-status`

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Is ${provider.name} down right now?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Check the real-time ${provider.name} status on this page. We monitor ${provider.name}'s official status page and display live component status, active incidents, and incident history. If ${provider.name} is experiencing issues, consider using Bifrost to automatically route your requests to an alternative provider with zero code changes.`,
        },
      },
      {
        '@type': 'Question',
        name: `What should I do when ${provider.name} is down?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `When ${provider.name} experiences an outage, you can use Bifrost — an open-source AI gateway — to automatically failover to alternative providers. Bifrost routes your LLM API requests through multiple providers, so if one goes down, your application keeps running. No code changes required.`,
        },
      },
      {
        '@type': 'Question',
        name: `How can I avoid downtime from ${provider.name} outages?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Use Bifrost to add automatic failover to your AI infrastructure. Bifrost is an open-source LLM gateway that sits between your application and AI providers. It monitors provider health and automatically routes requests to healthy alternatives when an outage is detected — giving you 99.999% effective uptime.`,
        },
      },
    ],
  }
}

export function getMainPageJsonLd() {
  const baseUrl = `https://getmaxim.ai${getProviderStatusBaseUrl()}/provider-status`

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'AI Provider Status Monitor',
    description:
      'Real-time status monitoring for AI model providers including OpenAI, Anthropic, Mistral, and more.',
    url: baseUrl,
    publisher: {
      '@type': 'Organization',
      name: 'Bifrost',
      url: 'https://www.getmaxim.ai/bifrost',
    },
  }
}
