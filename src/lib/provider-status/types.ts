// ============================================================
// Statuspage.io API Response Types
// ============================================================

export interface StatuspagePageInfo {
  id: string
  name: string
  url: string
  updated_at: string
}

export interface StatuspageStatus {
  indicator: 'none' | 'minor' | 'major' | 'critical' | 'maintenance'
  description: string
}

export interface StatuspageComponent {
  id: string
  name: string
  status:
    | 'operational'
    | 'degraded_performance'
    | 'partial_outage'
    | 'major_outage'
    | 'under_maintenance'
  description: string | null
  updated_at: string
  position: number
  group_id: string | null
  only_show_if_degraded: boolean
}

export interface StatuspageIncidentUpdate {
  id: string
  status: string
  body: string
  created_at: string
  updated_at: string
}

export interface StatuspageIncident {
  id: string
  name: string
  status: 'investigating' | 'identified' | 'monitoring' | 'resolved' | 'postmortem'
  impact: 'none' | 'minor' | 'major' | 'critical'
  created_at: string
  updated_at: string
  resolved_at: string | null
  shortlink: string
  incident_updates?: StatuspageIncidentUpdate[]
  components?: { id: string; name: string; status: string }[]
}

export interface StatuspageScheduledMaintenance {
  id: string
  name: string
  status: string
  impact: string
  scheduled_for: string
  scheduled_until: string
  created_at: string
  updated_at: string
  incident_updates?: StatuspageIncidentUpdate[]
  components?: { id: string; name: string; status: string }[]
}

export interface StatuspageSummaryResponse {
  page: StatuspagePageInfo
  status: StatuspageStatus
  components?: StatuspageComponent[]
  incidents?: StatuspageIncident[]
  scheduled_maintenances?: StatuspageScheduledMaintenance[]
}

export interface StatuspageStatusResponse {
  page: StatuspagePageInfo
  status: StatuspageStatus
}

export interface StatuspageIncidentsResponse {
  page: StatuspagePageInfo
  incidents: StatuspageIncident[]
}

// ============================================================
// BetterStack API Response Types
// ============================================================

export interface BetterStackDayStatus {
  day: string
  status: string
  downtime_duration: number
  maintenance_duration: number
}

export interface BetterStackResource {
  id: string
  type: 'status_page_resource'
  attributes: {
    status_page_section_id: number
    resource_id: number
    resource_type: string
    public_name: string
    explanation: string
    position: number
    /** Official uptime as a 0–1 float */
    availability: number
    status: string
    /** Per-day status for the last 90 days */
    status_history: BetterStackDayStatus[]
  }
}

export interface BetterStackAffectedResource {
  status_page_resource_id: string
  status: string
}

export interface BetterStackSection {
  id: string
  type: 'status_page_section'
  attributes: {
    name: string
    position: number
  }
}

export interface BetterStackStatusUpdate {
  id: string
  type: 'status_update'
  attributes: {
    message: string
    published_at: string
    published_at_timezone?: string
    notify_subscribers?: boolean
    affected_resources?: BetterStackAffectedResource[]
  }
}

export interface BetterStackStatusReport {
  id: string
  type: 'status_report'
  attributes: {
    title: string
    report_type: 'manual' | 'automatic' | 'maintenance'
    starts_at: string
    ends_at: string | null
    status_page_id?: number
    affected_resources?: BetterStackAffectedResource[]
    aggregate_state: string
  }
  relationships?: {
    status_updates?: {
      data?: { id: string; type: 'status_update' }[]
    }
  }
}

export interface BetterStackResponse {
  data: {
    id: string
    type: string
    attributes: {
      aggregate_state: 'operational' | 'downtime' | 'degraded' | 'maintenance'
      url: string
      company_name: string
      updated_at?: string
    }
    relationships?: {
      sections?: { data: { id: string; type: 'status_page_section' }[] }
      resources?: { data: { id: string; type: 'status_page_resource' }[] }
      status_reports?: { data: { id: string; type: 'status_report' }[] }
    }
  }
  included: (BetterStackResource | BetterStackSection | BetterStackStatusReport | BetterStackStatusUpdate)[]
}

// ============================================================
// Instatus API Response Types
// ============================================================

export interface InstatusComponent {
  id: string
  name: string
  status: 'OPERATIONAL' | 'UNDERMAINTENANCE' | 'DEGRADEDPERFORMANCE' | 'PARTIALOUTAGE' | 'MAJOROUTAGE'
  description: string
  order: number
}

export interface InstatusSummaryResponse {
  page: { name: string; url: string; status: string }
  activeIncidents: InstatusIncident[]
  activeMaintenances: InstatusMaintenance[]
}

export interface InstatusIncident {
  id: string
  name: string
  status: string
  impact: string
  started: string
  resolved: string | null
  updates: { message: string; status: string; created: string }[]
}

export interface InstatusMaintenance {
  id: string
  name: string
  status: string
  start: string
  end: string
  updates: { message: string; status: string; created: string }[]
}

// ============================================================
// OnlineOrNot API Response Types
// ============================================================

export interface OnlineOrNotCheck {
  id: string
  name: string
  status: 'up' | 'down' | 'degraded'
  lastChecked: string
}

export interface OnlineOrNotResponse {
  statusPage: {
    name: string
    url: string
    status: 'up' | 'down' | 'degraded'
  }
  checks: OnlineOrNotCheck[]
}

// ============================================================
// Normalized Application Types
// ============================================================

export type ProviderStatusLevel =
  | 'operational'
  | 'degraded'
  | 'partial_outage'
  | 'major_outage'
  | 'maintenance'
  | 'unknown'

export interface DayUptimeStatus {
  day: string
  status: 'operational' | 'degraded' | 'partial_outage' | 'major_outage' | 'maintenance' | 'no_data'
  downtimeSeconds: number
}

export interface ComponentStatus {
  name: string
  status: ProviderStatusLevel
  updatedAt: string
  /** Official uptime percentage (0–100) if available from provider API */
  uptimePercentage?: number
  /** Per-day status history (90 days) if available from provider API */
  dailyHistory?: DayUptimeStatus[]
}

export interface IncidentUpdate {
  status: string
  body: string
  createdAt: string
}

export interface NormalizedIncident {
  id: string
  name: string
  status: string
  impact: string
  createdAt: string
  updatedAt: string
  resolvedAt: string | null
  shortlink: string
  updates: IncidentUpdate[]
  affectedComponents: string[]
}

export interface NormalizedMaintenance {
  id: string
  name: string
  status: string
  impact: string
  scheduledFor: string
  scheduledUntil: string
  updates: IncidentUpdate[]
  affectedComponents: string[]
}

export interface ProviderStatusSummary {
  providerId: string
  status: ProviderStatusLevel
  statusText: string
  activeIncidents: number
  lastUpdated: string
  components: ComponentStatus[]
  error?: boolean
}

export interface ProviderFullStatus extends ProviderStatusSummary {
  incidents: NormalizedIncident[]
  scheduledMaintenances: NormalizedMaintenance[]
  pageUrl: string
}
