import type {
  StatuspageSummaryResponse,
  StatuspageIncidentsResponse,
  BetterStackResponse,
  BetterStackResource,
  InstatusComponent,
  InstatusSummaryResponse,
  ProviderStatusLevel,
  ProviderStatusSummary,
  ProviderFullStatus,
  ComponentStatus,
  DayUptimeStatus,
  NormalizedIncident,
  NormalizedMaintenance,
  IncidentUpdate,
} from './types'
import { STATUS_PROVIDERS, type StatusProviderConfig } from './providers'

const REVALIDATE_SECONDS = 60

// ============================================================
// Status Level Mapping
// ============================================================

function mapStatuspageIndicator(indicator: string): ProviderStatusLevel {
  switch (indicator) {
    case 'none':
      return 'operational'
    case 'minor':
      return 'degraded'
    case 'major':
      return 'partial_outage'
    case 'critical':
      return 'major_outage'
    case 'maintenance':
      return 'maintenance'
    default:
      return 'unknown'
  }
}

function mapComponentStatus(status: string): ProviderStatusLevel {
  switch (status) {
    case 'operational':
      return 'operational'
    case 'degraded_performance':
      return 'degraded'
    case 'partial_outage':
      return 'partial_outage'
    case 'major_outage':
      return 'major_outage'
    case 'under_maintenance':
      return 'maintenance'
    default:
      return 'unknown'
  }
}

function mapBetterStackStatus(status: string): ProviderStatusLevel {
  switch (status) {
    case 'up':
      return 'operational'
    case 'down':
      return 'major_outage'
    case 'paused':
      return 'unknown'
    case 'maintenance':
      return 'maintenance'
    case 'validating':
      return 'degraded'
    // Aggregate states
    case 'operational':
      return 'operational'
    case 'downtime':
      return 'major_outage'
    case 'degraded':
      return 'degraded'
    default:
      return 'unknown'
  }
}

function mapInstatusComponentStatus(status: string): ProviderStatusLevel {
  switch (status) {
    case 'OPERATIONAL':
      return 'operational'
    case 'DEGRADEDPERFORMANCE':
      return 'degraded'
    case 'PARTIALOUTAGE':
      return 'partial_outage'
    case 'MAJOROUTAGE':
      return 'major_outage'
    case 'UNDERMAINTENANCE':
      return 'maintenance'
    default:
      return 'unknown'
  }
}

export function getStatusText(status: ProviderStatusLevel): string {
  switch (status) {
    case 'operational':
      return 'All Systems Operational'
    case 'degraded':
      return 'Degraded Performance'
    case 'partial_outage':
      return 'Partial Outage'
    case 'major_outage':
      return 'Major Outage'
    case 'maintenance':
      return 'Under Maintenance'
    case 'unknown':
    default:
      return 'Status Unavailable'
  }
}

export function getStatusColor(status: ProviderStatusLevel): string {
  switch (status) {
    case 'operational':
      return '#10b981'
    case 'degraded':
      return '#f59e0b'
    case 'partial_outage':
      return '#f97316'
    case 'major_outage':
      return '#ef4444'
    case 'maintenance':
      return '#3b82f6'
    case 'unknown':
    default:
      return '#9ca3af'
  }
}

// ============================================================
// Normalize Helpers (null-safe)
// ============================================================

function normalizeStatuspageComponents(
  components?: StatuspageSummaryResponse['components']
): ComponentStatus[] {
  if (!components) return []
  return components
    .filter((c) => !c.group_id && c.name !== 'Visit our status site')
    .sort((a, b) => a.position - b.position)
    .map((c) => ({
      name: c.name,
      status: mapComponentStatus(c.status),
      updatedAt: c.updated_at,
    }))
}

function normalizeIncidentUpdates(
  updates?: { status: string; body: string; created_at: string }[]
): IncidentUpdate[] {
  if (!updates) return []
  return updates.map((u) => ({
    status: u.status,
    body: u.body,
    createdAt: u.created_at,
  }))
}

function normalizeStatuspageIncidents(
  incidents?: StatuspageSummaryResponse['incidents']
): NormalizedIncident[] {
  if (!incidents) return []
  return incidents.map((inc) => ({
    id: inc.id,
    name: inc.name,
    status: inc.status,
    impact: inc.impact,
    createdAt: inc.created_at,
    updatedAt: inc.updated_at,
    resolvedAt: inc.resolved_at,
    shortlink: inc.shortlink ?? '',
    updates: normalizeIncidentUpdates(inc.incident_updates),
    affectedComponents: (inc.components ?? []).map((c) => c.name),
  }))
}

function normalizeStatuspageMaintenances(
  maintenances?: StatuspageSummaryResponse['scheduled_maintenances']
): NormalizedMaintenance[] {
  if (!maintenances) return []
  return maintenances.map((m) => ({
    id: m.id,
    name: m.name,
    status: m.status,
    impact: m.impact,
    scheduledFor: m.scheduled_for,
    scheduledUntil: m.scheduled_until,
    updates: normalizeIncidentUpdates(m.incident_updates),
    affectedComponents: (m.components ?? []).map((c) => c.name),
  }))
}

// ============================================================
// Fetcher: Statuspage.io
// ============================================================

async function fetchStatuspage(
  apiBaseUrl: string
): Promise<StatuspageSummaryResponse | null> {
  try {
    const res = await fetch(`${apiBaseUrl}/summary.json`, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) return null
    return (await res.json()) as StatuspageSummaryResponse
  } catch {
    return null
  }
}

async function fetchStatuspageIncidents(
  apiBaseUrl: string
): Promise<StatuspageIncidentsResponse | null> {
  try {
    const res = await fetch(`${apiBaseUrl}/incidents.json`, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) return null
    return (await res.json()) as StatuspageIncidentsResponse
  } catch {
    return null
  }
}

function statuspageToSummary(
  providerId: string,
  data: StatuspageSummaryResponse
): ProviderStatusSummary {
  return {
    providerId,
    status: mapStatuspageIndicator(data.status.indicator),
    statusText: data.status.description,
    activeIncidents: (data.incidents ?? []).length,
    lastUpdated: data.page.updated_at,
    components: normalizeStatuspageComponents(data.components),
  }
}

function statuspageToFull(
  providerId: string,
  data: StatuspageSummaryResponse,
  allIncidents: StatuspageIncidentsResponse | null,
  pageUrl: string
): ProviderFullStatus {
  const incidents = allIncidents
    ? normalizeStatuspageIncidents(allIncidents.incidents)
    : normalizeStatuspageIncidents(data.incidents)

  return {
    providerId,
    status: mapStatuspageIndicator(data.status.indicator),
    statusText: data.status.description,
    activeIncidents: (data.incidents ?? []).length,
    lastUpdated: data.page.updated_at,
    components: normalizeStatuspageComponents(data.components),
    incidents,
    scheduledMaintenances: normalizeStatuspageMaintenances(data.scheduled_maintenances),
    pageUrl,
  }
}

// ============================================================
// Fetcher: BetterStack
// ============================================================

async function fetchBetterStack(
  baseUrl: string
): Promise<BetterStackResponse | null> {
  try {
    const res = await fetch(`${baseUrl}/index.json`, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) return null
    return (await res.json()) as BetterStackResponse
  } catch {
    return null
  }
}

function mapBetterStackDayStatus(status: string): DayUptimeStatus['status'] {
  switch (status) {
    case 'operational':
      return 'operational'
    case 'downtime':
      return 'major_outage'
    case 'degraded':
      return 'degraded'
    case 'maintenance':
      return 'maintenance'
    default:
      return 'no_data'
  }
}

function extractBetterStackResources(data: BetterStackResponse): BetterStackResource[] {
  return (data.included ?? []).filter(
    (item): item is BetterStackResource => item.type === 'status_page_resource'
  )
}

function betterStackToSummary(
  providerId: string,
  data: BetterStackResponse
): ProviderStatusSummary {
  const resources = extractBetterStackResources(data)

  const components: ComponentStatus[] = resources.map((r) => ({
    name: r.attributes.public_name,
    status: mapBetterStackStatus(r.attributes.status),
    updatedAt: new Date().toISOString(),
    uptimePercentage: r.attributes.availability * 100,
    dailyHistory: (r.attributes.status_history ?? []).map((day) => ({
      day: day.day,
      status: mapBetterStackDayStatus(day.status),
      downtimeSeconds: day.downtime_duration,
    })),
  }))

  const overallStatus = data.data?.attributes?.aggregate_state
    ? mapBetterStackStatus(data.data.attributes.aggregate_state)
    : components.length > 0
      ? components.every((c) => c.status === 'operational')
        ? 'operational'
        : components.some((c) => c.status === 'major_outage')
          ? 'major_outage'
          : 'degraded'
      : ('unknown' as ProviderStatusLevel)

  const downCount = components.filter(
    (c) => c.status !== 'operational' && c.status !== 'unknown'
  ).length

  return {
    providerId,
    status: overallStatus,
    statusText: getStatusText(overallStatus),
    activeIncidents: downCount,
    lastUpdated: new Date().toISOString(),
    components,
  }
}

function betterStackToFull(
  providerId: string,
  data: BetterStackResponse,
  pageUrl: string
): ProviderFullStatus {
  const summary = betterStackToSummary(providerId, data)
  return {
    ...summary,
    incidents: [],
    scheduledMaintenances: [],
    pageUrl,
  }
}

// ============================================================
// Fetcher: Instatus
// ============================================================

async function fetchInstatus(
  baseUrl: string
): Promise<{ summary: InstatusSummaryResponse | null; components: InstatusComponent[] }> {
  try {
    const [summaryRes, componentsRes] = await Promise.all([
      fetch(`${baseUrl}/summary.json`, {
        next: { revalidate: REVALIDATE_SECONDS },
        headers: { Accept: 'application/json' },
      }),
      fetch(`${baseUrl}/v2/components.json`, {
        next: { revalidate: REVALIDATE_SECONDS },
        headers: { Accept: 'application/json' },
      }),
    ])

    const summary = summaryRes.ok
      ? ((await summaryRes.json()) as InstatusSummaryResponse)
      : null

    let components: InstatusComponent[] = []
    if (componentsRes.ok) {
      const componentsData = await componentsRes.json()
      // Instatus v2 returns { components: [...] } wrapper
      if (componentsData?.components && Array.isArray(componentsData.components)) {
        components = componentsData.components
      } else if (Array.isArray(componentsData)) {
        components = componentsData
      }
    }

    return { summary, components }
  } catch {
    return { summary: null, components: [] }
  }
}

function mapInstatusPageStatus(status: string): ProviderStatusLevel {
  switch (status?.toUpperCase()) {
    case 'UP':
      return 'operational'
    case 'HASISSUES':
      return 'degraded'
    case 'UNDERMAINTENANCE':
      return 'maintenance'
    default:
      return 'unknown'
  }
}

function instatusToSummary(
  providerId: string,
  summary: InstatusSummaryResponse | null,
  components: InstatusComponent[]
): ProviderStatusSummary {
  const normalizedComponents: ComponentStatus[] = components.map((c) => ({
    name: c.name,
    status: mapInstatusComponentStatus(c.status),
    updatedAt: new Date().toISOString(),
  }))

  // Prefer page-level status from summary, fall back to component-level derivation
  const overallStatus: ProviderStatusLevel = summary?.page?.status
    ? mapInstatusPageStatus(summary.page.status)
    : normalizedComponents.length > 0
      ? normalizedComponents.every((c) => c.status === 'operational')
        ? 'operational'
        : normalizedComponents.some((c) => c.status === 'major_outage')
          ? 'major_outage'
          : 'degraded'
      : 'unknown'

  const activeIncidents = summary?.activeIncidents?.length ?? 0

  return {
    providerId,
    status: overallStatus,
    statusText: getStatusText(overallStatus),
    activeIncidents,
    lastUpdated: new Date().toISOString(),
    components: normalizedComponents,
  }
}

function instatusToFull(
  providerId: string,
  summary: InstatusSummaryResponse | null,
  components: InstatusComponent[],
  pageUrl: string
): ProviderFullStatus {
  const base = instatusToSummary(providerId, summary, components)

  const incidents: NormalizedIncident[] = (summary?.activeIncidents ?? []).map((inc) => ({
    id: inc.id,
    name: inc.name,
    status: inc.status,
    impact: inc.impact ?? 'minor',
    createdAt: inc.started,
    updatedAt: inc.started,
    resolvedAt: inc.resolved,
    shortlink: '',
    updates: (inc.updates ?? []).map((u) => ({
      status: u.status,
      body: u.message,
      createdAt: u.created,
    })),
    affectedComponents: [],
  }))

  const maintenances: NormalizedMaintenance[] = (summary?.activeMaintenances ?? []).map((m) => ({
    id: m.id,
    name: m.name,
    status: m.status,
    impact: 'maintenance',
    scheduledFor: m.start,
    scheduledUntil: m.end,
    updates: (m.updates ?? []).map((u) => ({
      status: u.status,
      body: u.message,
      createdAt: u.created,
    })),
    affectedComponents: [],
  }))

  return {
    ...base,
    incidents,
    scheduledMaintenances: maintenances,
    pageUrl,
  }
}

// ============================================================
// Fetcher: OnlineOrNot
// ============================================================

interface OnlineOrNotApiResponse {
  success: boolean
  result: {
    status: { description: string }
    status_page: { id: string; name: string; subdomain: string }
    components: {
      id: string
      name: string
      status: string
      group_id: string | null
      sort_order: number
      created_at: string
      updated_at: string
    }[]
  }
}

async function fetchOnlineOrNot(
  subdomain: string
): Promise<OnlineOrNotApiResponse | null> {
  try {
    const res = await fetch(
      `https://api.onlineornot.com/v1/status_pages/${subdomain}/summary`,
      {
        next: { revalidate: REVALIDATE_SECONDS },
        headers: { Accept: 'application/json' },
      }
    )
    if (!res.ok) return null
    return (await res.json()) as OnlineOrNotApiResponse
  } catch {
    return null
  }
}

function mapOnlineOrNotStatus(status: string): ProviderStatusLevel {
  switch (status?.toUpperCase()) {
    case 'OPERATIONAL':
      return 'operational'
    case 'DEGRADED_PERFORMANCE':
    case 'DEGRADED':
      return 'degraded'
    case 'PARTIAL_OUTAGE':
      return 'partial_outage'
    case 'MAJOR_OUTAGE':
      return 'major_outage'
    case 'UNDER_MAINTENANCE':
      return 'maintenance'
    default:
      return 'unknown'
  }
}

function onlineOrNotToSummary(
  providerId: string,
  data: OnlineOrNotApiResponse | null
): ProviderStatusSummary {
  if (!data?.result) {
    return makeErrorSummary(providerId)
  }

  const allComponents = data.result.components ?? []

  const components: ComponentStatus[] = allComponents.map((c) => ({
    name: c.name,
    status: mapOnlineOrNotStatus(c.status),
    updatedAt: c.updated_at ?? new Date().toISOString(),
  }))

  const overallStatus: ProviderStatusLevel = components.length > 0
    ? components.every((c) => c.status === 'operational')
      ? 'operational'
      : components.some((c) => c.status === 'major_outage')
        ? 'major_outage'
        : 'degraded'
    : 'unknown'

  return {
    providerId,
    status: overallStatus,
    statusText: data.result.status?.description ?? getStatusText(overallStatus),
    activeIncidents: 0,
    lastUpdated: new Date().toISOString(),
    components,
  }
}

// ============================================================
// Unified Provider Fetching
// ============================================================

function makeErrorSummary(providerId: string): ProviderStatusSummary {
  return {
    providerId,
    status: 'unknown',
    statusText: 'Status Unavailable',
    activeIncidents: 0,
    lastUpdated: new Date().toISOString(),
    components: [],
    error: true,
  }
}

function makeErrorFull(providerId: string, pageUrl: string): ProviderFullStatus {
  return {
    ...makeErrorSummary(providerId),
    incidents: [],
    scheduledMaintenances: [],
    pageUrl,
  }
}

/**
 * Get status summary for a single provider (lightweight).
 */
export async function getProviderStatusSummary(
  provider: StatusProviderConfig
): Promise<ProviderStatusSummary> {
  if (!provider.apiBaseUrl) {
    return makeErrorSummary(provider.id)
  }

  try {
    switch (provider.platform) {
      case 'statuspage': {
        const data = await fetchStatuspage(provider.apiBaseUrl)
        if (!data) return makeErrorSummary(provider.id)
        return statuspageToSummary(provider.id, data)
      }
      case 'betterstack': {
        const data = await fetchBetterStack(provider.apiBaseUrl)
        if (!data) return makeErrorSummary(provider.id)
        return betterStackToSummary(provider.id, data)
      }
      case 'instatus': {
        const { summary, components } = await fetchInstatus(provider.apiBaseUrl)
        return instatusToSummary(provider.id, summary, components)
      }
      case 'onlineornot': {
        const data = await fetchOnlineOrNot(provider.apiBaseUrl)
        return onlineOrNotToSummary(provider.id, data)
      }
      default:
        return makeErrorSummary(provider.id)
    }
  } catch {
    return makeErrorSummary(provider.id)
  }
}

/**
 * Get full status details for a single provider.
 */
export async function getProviderFullStatus(
  provider: StatusProviderConfig
): Promise<ProviderFullStatus> {
  if (!provider.apiBaseUrl) {
    return makeErrorFull(provider.id, provider.statusPageUrl)
  }

  try {
    switch (provider.platform) {
      case 'statuspage': {
        const [data, allIncidents] = await Promise.all([
          fetchStatuspage(provider.apiBaseUrl),
          fetchStatuspageIncidents(provider.apiBaseUrl),
        ])
        if (!data) return makeErrorFull(provider.id, provider.statusPageUrl)
        return statuspageToFull(provider.id, data, allIncidents, provider.statusPageUrl)
      }
      case 'betterstack': {
        const data = await fetchBetterStack(provider.apiBaseUrl)
        if (!data) return makeErrorFull(provider.id, provider.statusPageUrl)
        return betterStackToFull(provider.id, data, provider.statusPageUrl)
      }
      case 'instatus': {
        const { summary, components } = await fetchInstatus(provider.apiBaseUrl)
        return instatusToFull(provider.id, summary, components, provider.statusPageUrl)
      }
      case 'onlineornot': {
        const data = await fetchOnlineOrNot(provider.apiBaseUrl)
        const summaryResult = onlineOrNotToSummary(provider.id, data)
        return {
          ...summaryResult,
          incidents: [],
          scheduledMaintenances: [],
          pageUrl: provider.statusPageUrl,
        }
      }
      default:
        return makeErrorFull(provider.id, provider.statusPageUrl)
    }
  } catch {
    return makeErrorFull(provider.id, provider.statusPageUrl)
  }
}

/**
 * Get status summaries for ALL providers (for the main listing page).
 */
export async function getAllProviderStatuses(): Promise<
  (ProviderStatusSummary & { provider: StatusProviderConfig })[]
> {
  const results = await Promise.allSettled(
    STATUS_PROVIDERS.map(async (provider) => {
      const status = await getProviderStatusSummary(provider)
      return { ...status, provider }
    })
  )

  return results.map((result, idx) => {
    if (result.status === 'fulfilled') {
      return result.value
    }
    return {
      ...makeErrorSummary(STATUS_PROVIDERS[idx].id),
      provider: STATUS_PROVIDERS[idx],
    }
  })
}
