import type { StatusProviderConfig, StatusPagePlatform } from './providers'
import type { ProviderFullStatus } from './types'

const LOOKBACK_DAYS = 90

interface ProviderContentBlueprint {
  categoryLabel: string
  topProducts: string[]
  commonUseCases: string[]
  whyTeamsMonitor: string
}

export interface ProviderPageMetric {
  value: string
  label: string
  description: string
}

export interface ProviderFaqItem {
  question: string
  answer: string
}

export interface ProviderPageContent {
  topProducts: string[]
  commonUseCases: string[]
  whyTeamsMonitor: string
  overviewParagraphs: string[]
  monitoringPoints: string[]
  reliabilityPoints: string[]
  metrics: ProviderPageMetric[]
  faqItems: ProviderFaqItem[]
  coverageLabel: string
  coverageDescription: string
}

const PROVIDER_CONTENT: Record<string, ProviderContentBlueprint> = {
  openai: {
    categoryLabel: 'Foundation model platform',
    topProducts: ['ChatGPT', 'OpenAI API', 'GPT-4o', 'o-series reasoning models', 'DALL-E'],
    commonUseCases: ['Customer support copilots', 'Internal productivity tools', 'Realtime assistants'],
    whyTeamsMonitor:
      'Teams depend on OpenAI for both end-user chat products and API-driven application traffic, so even short disruptions can affect support, automation, and revenue-critical workflows.',
  },
  anthropic: {
    categoryLabel: 'Foundation model platform',
    topProducts: ['Claude', 'Claude API', 'Claude Code', 'Claude Sonnet', 'Claude Opus'],
    commonUseCases: ['Coding assistants', 'Enterprise knowledge workflows', 'Agentic automation'],
    whyTeamsMonitor:
      'Anthropic outages often matter most to engineering, agent, and internal tooling use cases where Claude is deeply embedded into day-to-day developer workflows.',
  },
  cohere: {
    categoryLabel: 'Enterprise language model platform',
    topProducts: ['Command models', 'Embed', 'Rerank', 'Coral'],
    commonUseCases: ['Enterprise search', 'Retrieval pipelines', 'Classification and reranking'],
    whyTeamsMonitor:
      'Cohere status is especially important for production retrieval and ranking systems where latency and model availability directly shape search relevance and workflow quality.',
  },
  groq: {
    categoryLabel: 'High-performance inference platform',
    topProducts: ['GroqCloud API', 'LPU inference', 'Open model serving'],
    commonUseCases: ['Low-latency inference', 'Realtime copilots', 'High-throughput chat workloads'],
    whyTeamsMonitor:
      'Groq is often chosen for speed-sensitive applications, so status changes can immediately impact latency-sensitive user experiences and throughput targets.',
  },
  azure: {
    categoryLabel: 'Cloud AI platform',
    topProducts: ['Azure OpenAI Service', 'Azure AI Foundry', 'Microsoft cloud AI infrastructure'],
    commonUseCases: ['Enterprise AI deployments', 'Compliance-heavy workloads', 'Regional cloud rollouts'],
    whyTeamsMonitor:
      'Azure AI status matters for enterprises running provider access, quotas, and compliance workflows through Microsoft-managed regions and infrastructure.',
  },
  elevenlabs: {
    categoryLabel: 'Voice AI platform',
    topProducts: ['Text-to-speech', 'Voice cloning', 'Speech-to-text', 'Conversational voice APIs'],
    commonUseCases: ['Voice assistants', 'Media generation', 'Call automation'],
    whyTeamsMonitor:
      'Voice AI outages can interrupt customer-facing voice flows, content pipelines, and speech interfaces that depend on fast and reliable audio generation.',
  },
  cerebras: {
    categoryLabel: 'Inference and compute platform',
    topProducts: ['Cerebras Inference', 'Developer console', 'Cloud AI services'],
    commonUseCases: ['High-speed inference', 'Model experimentation', 'Developer platform integrations'],
    whyTeamsMonitor:
      'Cerebras status is relevant for teams using specialized inference infrastructure where throughput and availability are tightly linked to developer productivity.',
  },
  deepseek: {
    categoryLabel: 'Model API platform',
    topProducts: ['DeepSeek API', 'DeepSeek Chat', 'DeepSeek reasoning models'],
    commonUseCases: ['General chat apps', 'Cost-sensitive inference', 'Reasoning-heavy workflows'],
    whyTeamsMonitor:
      'Teams monitor DeepSeek when they need fast visibility into API health, especially for applications balancing performance, cost, and fallback behavior across model providers.',
  },
  'stability-ai': {
    categoryLabel: 'Generative image platform',
    topProducts: ['Stable Diffusion', 'Image generation APIs', 'Stability platform services'],
    commonUseCases: ['Image generation', 'Creative tooling', 'Content production pipelines'],
    whyTeamsMonitor:
      'Stability AI status matters for image generation products and media workflows where failed generations or degraded inference can block downstream creative operations.',
  },
  replicate: {
    categoryLabel: 'Model hosting platform',
    topProducts: ['Replicate API', 'Hosted open models', 'Inference jobs'],
    commonUseCases: ['Hosted model APIs', 'Batch generation', 'Product experimentation'],
    whyTeamsMonitor:
      'Replicate is used to access a wide range of models, so availability issues can impact multiple AI features at once across image, audio, and text workflows.',
  },
  'together-ai': {
    categoryLabel: 'Open-model inference platform',
    topProducts: ['Together Inference', 'Serverless endpoints', 'Fine-tuning workflows', 'Model APIs'],
    commonUseCases: ['Open model serving', 'GPU-backed inference', 'Application-level failover'],
    whyTeamsMonitor:
      'Together AI status matters for teams serving open models in production, especially when inference reliability and provider redundancy are core parts of the deployment strategy.',
  },
  'fireworks-ai': {
    categoryLabel: 'Inference platform',
    topProducts: ['Fireworks inference APIs', 'Serverless deployments', 'Open and proprietary model endpoints'],
    commonUseCases: ['Production inference', 'Latency-sensitive APIs', 'Model platform orchestration'],
    whyTeamsMonitor:
      'Fireworks AI is frequently used as a production inference layer, so downtime or degradation can ripple across customer-facing features and internal AI services.',
  },
  huggingface: {
    categoryLabel: 'Open AI ecosystem platform',
    topProducts: ['Hugging Face Hub', 'Inference Endpoints', 'Spaces', 'Model hosting'],
    commonUseCases: ['Model hosting', 'Demo applications', 'Private inference endpoints'],
    whyTeamsMonitor:
      'Hugging Face outages can affect both developer workflows and live inference systems, especially when teams rely on Hub access, endpoints, or Spaces for demos and tooling.',
  },
  perplexity: {
    categoryLabel: 'AI search platform',
    topProducts: ['Perplexity search', 'Sonar models', 'Perplexity API'],
    commonUseCases: ['Answer engines', 'Search copilots', 'Research workflows'],
    whyTeamsMonitor:
      'Perplexity status matters when teams rely on search and answer-generation APIs for research, customer support, and other freshness-sensitive use cases.',
  },
  openrouter: {
    categoryLabel: 'Unified model gateway',
    topProducts: ['OpenRouter API', 'Provider routing', 'Model access aggregation'],
    commonUseCases: ['Provider abstraction', 'Cost-aware routing', 'Model experimentation'],
    whyTeamsMonitor:
      'OpenRouter sits between applications and multiple upstream model providers, so status visibility is critical when teams depend on it as a unified model access layer.',
  },
}

function humanizeStatus(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
}

function joinList(items: string[]): string {
  if (items.length === 0) return ''
  if (items.length === 1) return items[0]
  if (items.length === 2) return `${items[0]} and ${items[1]}`
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`
}

function getMostAffectedSystems(status: ProviderFullStatus): string[] {
  const counts = new Map<string, number>()

  for (const incident of status.incidents) {
    for (const component of incident.affectedComponents) {
      counts.set(component, (counts.get(component) ?? 0) + 1)
    }
  }

  if (counts.size === 0) {
    return status.components
      .filter((component) => component.status !== 'operational' && component.status !== 'unknown')
      .map((component) => component.name)
      .slice(0, 3)
  }

  return Array.from(counts.entries())
    .sort((left, right) => right[1] - left[1])
    .slice(0, 3)
    .map(([name]) => name)
}

function getDaysSinceLastIncident(status: ProviderFullStatus): number | null {
  if (status.incidents.length === 0) return null

  const lastTimestamp = status.incidents
    .map((incident) => incident.resolvedAt ?? incident.updatedAt ?? incident.createdAt)
    .map((value) => new Date(value).getTime())
    .filter((value) => Number.isFinite(value))
    .sort((left, right) => right - left)[0]

  if (!lastTimestamp) return null

  const diffMs = Date.now() - lastTimestamp
  return Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)))
}

function getIncidentCountWithinDays(status: ProviderFullStatus, days: number): number {
  const threshold = Date.now() - days * 24 * 60 * 60 * 1000
  return status.incidents.filter((incident) => new Date(incident.createdAt).getTime() >= threshold).length
}

function getCoverageSummary(
  provider: StatusProviderConfig
): { label: string; description: string } {
  const coverageByPlatform: Record<StatusPagePlatform, { label: string; description: string }> = {
    statuspage: {
      label: 'Full incident history available',
      description: `${provider.name} publishes detailed component status, a full incident archive, and scheduled maintenance data through their official status page.`,
    },
    betterstack: {
      label: 'Component history and status reports',
      description: `${provider.name} publishes per-component availability history and status reports. Incident detail may be lighter than providers using Statuspage.`,
    },
    instatus: {
      label: 'Live status only — no historical data',
      description: `${provider.name} shares current status and any active incidents, but does not publish historical incident data through their public status page.`,
    },
    onlineornot: {
      label: 'Current status only — no incident data',
      description: `${provider.name} shares current component status, but does not publish incident history or maintenance schedules publicly.`,
    },
    none: {
      label: 'Limited coverage',
      description: `${provider.name} does not have a compatible public status API, so coverage on this page is limited.`,
    },
  }

  return coverageByPlatform[provider.platform]
}

function getProviderBlueprint(provider: StatusProviderConfig): ProviderContentBlueprint {
  return (
    PROVIDER_CONTENT[provider.id] ?? {
      categoryLabel: 'AI platform',
      topProducts: provider.aliases.slice(0, 5),
      commonUseCases: ['Production inference', 'Developer tooling', 'Customer-facing AI features'],
      whyTeamsMonitor:
        'Teams monitor this provider to understand current availability, component health, and the operational impact of upstream AI outages.',
    }
  )
}

export function buildProviderPageContent(
  provider: StatusProviderConfig,
  status: ProviderFullStatus
): ProviderPageContent {
  const blueprint = getProviderBlueprint(provider)
  const coverage = getCoverageSummary(provider)

  const platformHasIncidentHistory =
    provider.platform === 'statuspage' || provider.platform === 'betterstack'
  const hasAnyIncidents = status.incidents.length > 0





  const daysSinceLastIncident = getDaysSinceLastIncident(status)
  const recentIncidentCount = platformHasIncidentHistory
    ? getIncidentCountWithinDays(status, LOOKBACK_DAYS)
    : null
  const affectedSystems = getMostAffectedSystems(status)
  const currentlyAffected = status.components.filter(
    (component) => component.status !== 'operational' && component.status !== 'unknown'
  )

  const metrics: ProviderPageMetric[] = [
    {
      value: humanizeStatus(status.status),
      label: 'Current Status',
      description: status.statusText,
    },
    {
      value: String(status.components.length),
      label: 'Components',
      description: 'Service areas tracked on this page',
    },
    {
      value: recentIncidentCount !== null ? recentIncidentCount.toString() : '—',
      label: '90d Incidents',
      description:
        recentIncidentCount !== null
          ? 'Incidents reported in the last 90 days'
          : `${provider.name} does not publish historical incident data`,
    },
  ]

  const overviewParagraphs = [
    `${provider.name} provides ${joinList(blueprint.topProducts.slice(0, 4))}. ${blueprint.whyTeamsMonitor}`,
    platformHasIncidentHistory
      ? `This page pulls data from ${provider.name}'s official status page to show current service health, any active incidents, and a history of recent issues — all in one view.`
      : `This page checks ${provider.name}'s official status page for current service health and any active issues. ${provider.name} does not publish historical incident data publicly, so this page focuses on live status.`,
  ]

  let statusDomain: string
  try {
    statusDomain = new URL(provider.statusPageUrl).hostname
  } catch {
    statusDomain = provider.statusPageUrl
  }

  const monitoringPoints = [
    `Data pulled from ${provider.name}'s official status page (${statusDomain})`,
    `Refreshed every 60 seconds`,
    `Covers ${joinList(blueprint.topProducts.slice(0, 5))}`,
  ]

  if (!platformHasIncidentHistory) {
    monitoringPoints.push(
      `${provider.name} does not expose historical incident data through their public status page — coverage here is limited to current status and active issues`
    )
  } else if (provider.platform === 'betterstack') {
    monitoringPoints.push(
      `Includes component-level availability history and published status reports`
    )
  } else {
    monitoringPoints.push(`Includes full incident archive and scheduled maintenance history`)
  }

  const reliabilityPoints: string[] = []

  if (!platformHasIncidentHistory) {
    reliabilityPoints.push(
      `We don't have enough public data from ${provider.name} to assess recent reliability. This typically means the provider doesn't publish detailed historical status data.`
    )
  } else if (recentIncidentCount === 0) {
    reliabilityPoints.push(
      `No incidents reported in the last 90 days based on the available data.`
    )
  } else {
    reliabilityPoints.push(
      `${recentIncidentCount} incident${recentIncidentCount === 1 ? '' : 's'} reported over the last 90 days.`
    )
  }

  if (!platformHasIncidentHistory) {
    reliabilityPoints.push(
      `Historical incident records are not available from ${provider.name}'s public status page. Only currently active incidents are shown when they exist.`
    )
  } else if (daysSinceLastIncident === null) {
    reliabilityPoints.push(
      `No incidents have been reported by ${provider.name} in the data currently available.`
    )
  } else if (daysSinceLastIncident === 0) {
    reliabilityPoints.push(`The most recent incident was reported today.`)
  } else {
    reliabilityPoints.push(
      `Last reported incident was ${daysSinceLastIncident} day${daysSinceLastIncident === 1 ? '' : 's'} ago.`
    )
  }

  if (currentlyAffected.length > 0) {
    reliabilityPoints.push(
      `${currentlyAffected.length} component${currentlyAffected.length === 1 ? ' is' : 's are'} currently showing issues: ${joinList(currentlyAffected.map((component) => component.name))}.`
    )
  } else {
    reliabilityPoints.push(
      `All ${status.components.length} monitored components are currently operational.`
    )
  }

  if (affectedSystems.length > 0 && platformHasIncidentHistory && hasAnyIncidents) {
    reliabilityPoints.push(`Most frequently affected: ${joinList(affectedSystems)}.`)
  }

  const faqItems: ProviderFaqItem[] = [
    {
      question: `Is ${provider.name} down right now?`,
      answer: `Check the status indicator at the top of this page — it pulls directly from ${provider.name}'s official status page. If ${provider.name} is experiencing any issues, you'll see it reflected here.`,
    },
    {
      question: `What does this ${provider.name} status page track?`,
      answer: platformHasIncidentHistory
        ? `This page tracks ${joinList(blueprint.topProducts.slice(0, 5))} using data from ${provider.name}'s official status page. You can see current component health, active incidents, and a history of past issues.`
        : `This page tracks ${joinList(blueprint.topProducts.slice(0, 5))} using data from ${provider.name}'s official status page. Note that ${provider.name} only exposes current status publicly — historical incident data is not available.`,
    },
    {
      question: `How often is ${provider.name} status updated here?`,
      answer: `We check ${provider.name}'s status page every 60 seconds. How quickly issues show up here depends on how fast ${provider.name} updates their own official status.`,
    },
    {
      question: `Why monitor ${provider.name} status?`,
      answer: blueprint.whyTeamsMonitor,
    },
    {
      question: `What can I do if ${provider.name} goes down?`,
      answer: `The most common approach is to set up automatic failover to an alternative provider. Bifrost is an open-source AI gateway that can route requests away from ${provider.name} when it's experiencing issues, keeping your application running even when a single provider has problems.`,
    },
  ]

  return {
    topProducts: blueprint.topProducts,
    commonUseCases: blueprint.commonUseCases,
    whyTeamsMonitor: blueprint.whyTeamsMonitor,
    overviewParagraphs,
    monitoringPoints,
    reliabilityPoints,
    metrics,
    faqItems,
    coverageLabel: coverage.label,
    coverageDescription: coverage.description,
  }
}

export function getProviderSeoSummary(provider: StatusProviderConfig): {
  topProducts: string[]
  whyTeamsMonitor: string
  categoryLabel: string
} {
  const blueprint = getProviderBlueprint(provider)
  return {
    topProducts: blueprint.topProducts,
    whyTeamsMonitor: blueprint.whyTeamsMonitor,
    categoryLabel: blueprint.categoryLabel,
  }
}
