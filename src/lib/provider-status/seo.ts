import { type Metadata } from 'next'
import { STATUS_PROVIDERS, type StatusProviderConfig } from './providers'
import type { ProviderFaqItem } from './content'
import { getProviderSeoSummary } from './content'
import { getProviderStatusBaseUrl } from '@/lib/utils'

export function getMainPageMetadata(): Metadata {
  const baseUrl = `https://www.getmaxim.ai${getProviderStatusBaseUrl()}/provider-status`
  const featuredProviders = STATUS_PROVIDERS.slice(0, 4)
    .map((provider) => provider.name)
    .join(', ')

  return {
    title: 'AI Provider Status Monitor — Real-Time Uptime for LLM APIs | Bifrost',
    description:
      `Real-time status monitoring for AI model providers including ${featuredProviders}, and more. Track current uptime, component health, active incidents, and incident history from official status sources.`,
    keywords:
      'ai status, ai provider status, llm api status, openai status, anthropic status, groq status, provider uptime, ai outage tracker, ai incident history',
    alternates: {
      canonical: baseUrl,
    },
    openGraph: {
      title: 'AI Provider Status Monitor | Bifrost',
      description:
        'Track AI provider uptime, component health, active incidents, and maintenance windows from official provider status sources.',
      url: baseUrl,
      type: 'website',
    },
  }
}

export function getProviderPageMetadata(provider: StatusProviderConfig): Metadata {
  const baseUrl = `https://www.getmaxim.ai${getProviderStatusBaseUrl()}/provider-status`
  const url = `${baseUrl}/${provider.id}`
  const seoSummary = getProviderSeoSummary(provider)

  const aliasKeywords = provider.aliases
    .flatMap((a) => [`is ${a} down`, `${a} status`, `${a} outage`])
    .join(', ')

  return {
    title: `Is ${provider.name} Down? — ${provider.name} Status | Bifrost`,
    description: `Real-time ${provider.name} status, uptime, incident history, and component monitoring for ${seoSummary.topProducts.slice(0, 4).join(', ')}. Check whether ${provider.name} is down and understand what service issues could affect.`,
    keywords: `${provider.name.toLowerCase()} status, is ${provider.name.toLowerCase()} down, ${aliasKeywords}, ${provider.name.toLowerCase()} outage, ${provider.name.toLowerCase()} uptime, ${provider.name.toLowerCase()} incident history`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${provider.name} Status — Is ${provider.name} Down? | Bifrost`,
      description: `Monitor ${provider.name} uptime, active incidents, component health, and recent reliability signals in one status page.`,
      url,
      type: 'website',
    },
  }
}

export function getProviderPageJsonLd(provider: StatusProviderConfig, faqItems: ProviderFaqItem[]) {
  const baseUrl = `https://www.getmaxim.ai${getProviderStatusBaseUrl()}/provider-status`
  const url = `${baseUrl}/${provider.id}`
  const seoSummary = getProviderSeoSummary(provider)

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: `Is ${provider.name} Down?`,
        url,
        description: `Real-time ${provider.name} status monitoring for ${seoSummary.topProducts.slice(0, 4).join(', ')}.`,
        about: {
          '@type': 'SoftwareApplication',
          name: provider.name,
          applicationCategory: seoSummary.categoryLabel,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'AI Provider Status',
            item: baseUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: provider.name,
            item: url,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
      {
        '@type': 'ItemList',
        name: `${provider.name} monitored products`,
        itemListElement: seoSummary.topProducts.map((product, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: product,
        })),
      },
    ],
  }
}

export function getMainPageJsonLd() {
  const baseUrl = `https://www.getmaxim.ai${getProviderStatusBaseUrl()}/provider-status`

  const faqItems = [
    {
      question: 'What is the AI Provider Status Monitor?',
      answer:
        'The AI Provider Status Monitor is a real-time tracking dashboard that aggregates uptime, incident, and maintenance data from official status pages of major AI model providers including OpenAI, Anthropic, Groq, Azure AI, and 15+ others. It provides a single view of operational health across the AI infrastructure ecosystem.',
    },
    {
      question: 'How often is provider status data updated?',
      answer:
        'Status data is fetched directly from each provider\'s official status API in real-time when you load the page. The dashboard automatically refreshes every 30 seconds to ensure you always see the latest operational status, active incidents, and component health across all monitored providers.',
    },
    {
      question: 'Which AI providers are monitored?',
      answer:
        'We currently monitor 15+ major AI providers including OpenAI (ChatGPT, GPT-4, GPT-4o), Anthropic (Claude 4, Claude 3.5), Azure AI, Groq, Cohere, ElevenLabs, Together AI, Fireworks AI, Perplexity, OpenRouter, Hugging Face, Cerebras, DeepSeek, Stability AI, and Replicate. Each provider page shows detailed component status and incident history.',
    },
    {
      question: 'How can I check if a specific AI service is down?',
      answer:
        'Click on any provider from the main status table or quick links section to view detailed component-level status. Each provider page breaks down services by component (API, Chat Interface, Embeddings, etc.) and shows real-time operational status, active incidents, and recent incident history with root cause analysis.',
    },
    {
      question: 'What does "operational", "degraded", and "major outage" mean?',
      answer:
        'Operational means all services are functioning normally. Degraded performance indicates partial service disruptions or slower response times. Major outage means critical services are unavailable. Maintenance indicates scheduled downtime. Unknown means status data is temporarily unavailable from the provider\'s API.',
    },
    {
      question: 'Can I see historical incident data for AI providers?',
      answer:
        'Yes, each provider page includes a complete incident history section showing past outages, degraded performance events, maintenance windows, and resolutions. This helps teams understand reliability patterns, plan redundancy strategies, and make informed decisions about AI infrastructure dependencies.',
    },
    {
      question: 'Why should I monitor AI provider status?',
      answer:
        'Production AI applications depend on external provider uptime. Real-time status monitoring helps engineering teams detect issues immediately, implement automatic failover to backup providers, communicate proactively with end users, and maintain SLA compliance. Bifrost AI Gateway users can configure automatic routing around degraded providers.',
    },
    {
      question: 'How does this relate to Bifrost AI Gateway?',
      answer:
        'Bifrost is a high-performance AI gateway that provides intelligent routing, automatic failover, and centralized governance across 20+ AI providers. This status monitor complements Bifrost by providing transparency into provider health. Bifrost users can configure automatic failover rules based on real-time status signals to maximize uptime.',
    },
    {
      question: 'What data sources are used for status monitoring?',
      answer:
        'All status data comes directly from each provider\'s official status page APIs including Statuspage.io (Atlassian), BetterStack, Instatus, and OnlineOrNot platforms. We do not perform independent uptime checks. All data reflects what providers report publicly about their service health.',
    },
    {
      question: 'Is this status monitor free to use?',
      answer:
        'Yes, the AI Provider Status Monitor is completely free and publicly accessible. No account or authentication is required. The data is aggregated from public status APIs and updated in real-time. This is a community resource for developers, platform engineers, and AI teams building production systems.',
    },
  ]

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: 'AI Provider Status Monitor',
        description:
          'Real-time status monitoring for AI model providers including OpenAI, Anthropic, Groq, and more.',
        url: baseUrl,
        publisher: {
          '@type': 'Organization',
          name: 'Bifrost',
          url: 'https://www.getmaxim.ai/bifrost',
        },
      },
      {
        '@type': 'ItemList',
        name: 'Monitored AI providers',
        itemListElement: STATUS_PROVIDERS.map((provider, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: provider.name,
          url: `${baseUrl}/${provider.id}`,
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  }
}
