import type { NormalizedIncident, DayUptimeStatus, ComponentStatus as ComponentStatusType } from '@/lib/provider-status/types'
import { getStatusColor } from '@/lib/provider-status/api'

const DAYS = 90

export type DayStatus = 'operational' | 'degraded' | 'partial_outage' | 'major_outage' | 'maintenance' | 'no_data'

// ============================================================
// Fallback: Calculate daily status from incident history
// (used only when official data is not available)
// ============================================================

function calculateDailyStatusesFromIncidents(
  componentName: string,
  incidents: NormalizedIncident[]
): DayStatus[] {
  const now = new Date()
  const days: DayStatus[] = new Array(DAYS).fill('operational')

  for (const incident of incidents) {
    const affectsComponent =
      incident.affectedComponents.length === 0 ||
      incident.affectedComponents.some(
        (c) => c.toLowerCase() === componentName.toLowerCase()
      )

    if (!affectsComponent) continue

    const incidentStart = new Date(incident.createdAt)
    const incidentEnd = incident.resolvedAt ? new Date(incident.resolvedAt) : now

    for (let dayIdx = 0; dayIdx < DAYS; dayIdx++) {
      const dayStart = new Date(now)
      dayStart.setHours(0, 0, 0, 0)
      dayStart.setDate(dayStart.getDate() - (DAYS - 1 - dayIdx))

      const dayEnd = new Date(dayStart)
      dayEnd.setDate(dayEnd.getDate() + 1)

      if (incidentStart < dayEnd && incidentEnd > dayStart) {
        const severity = mapImpactToStatus(incident.impact)
        if (isWorse(severity, days[dayIdx])) {
          days[dayIdx] = severity
        }
      }
    }
  }

  return days
}

function mapImpactToStatus(impact: string): DayStatus {
  switch (impact) {
    case 'critical':
      return 'major_outage'
    case 'major':
      return 'partial_outage'
    case 'minor':
      return 'degraded'
    default:
      return 'degraded'
  }
}

const SEVERITY_ORDER: DayStatus[] = [
  'operational',
  'degraded',
  'partial_outage',
  'major_outage',
  'maintenance',
]

function isWorse(a: DayStatus, b: DayStatus): boolean {
  return SEVERITY_ORDER.indexOf(a) > SEVERITY_ORDER.indexOf(b)
}

function calculateUptimeFromDays(days: DayStatus[]): number {
  const operational = days.filter(
    (d) => d === 'operational' || d === 'no_data'
  ).length
  return (operational / days.length) * 100
}

// ============================================================
// Resolve uptime data: prefer official, fall back to calculated
// ============================================================

export interface ResolvedUptimeData {
  dailyStatuses: DayStatus[]
  uptimePercentage: number
  isOfficial: boolean
  /** True when the data is specific to this component (official history or attributed incidents) */
  isComponentSpecific: boolean
}

export function resolveUptimeData(
  component: ComponentStatusType,
  incidents: NormalizedIncident[]
): ResolvedUptimeData {
  if (component.dailyHistory && component.dailyHistory.length > 0) {
    const dailyStatuses = officialHistoryToDayStatuses(component.dailyHistory)
    const uptimePercentage = component.uptimePercentage ?? calculateUptimeFromDays(dailyStatuses)
    return { dailyStatuses, uptimePercentage, isOfficial: true, isComponentSpecific: true }
  }

  const attributedIncidents = incidents.filter(
    (inc) =>
      inc.affectedComponents.length > 0 &&
      inc.affectedComponents.some(
        (c) => c.toLowerCase() === component.name.toLowerCase()
      )
  )

  if (attributedIncidents.length > 0) {
    const dailyStatuses = calculateDailyStatusesFromIncidents(component.name, attributedIncidents)
    const uptimePercentage = component.uptimePercentage ?? calculateUptimeFromDays(dailyStatuses)
    return { dailyStatuses, uptimePercentage, isOfficial: false, isComponentSpecific: true }
  }

  if (incidents.length > 0) {
    const dailyStatuses = calculateDailyStatusesFromIncidents(component.name, incidents)
    const uptimePercentage = component.uptimePercentage ?? calculateUptimeFromDays(dailyStatuses)
    return { dailyStatuses, uptimePercentage, isOfficial: false, isComponentSpecific: false }
  }

  return {
    dailyStatuses: new Array(DAYS).fill('no_data'),
    uptimePercentage: 0,
    isOfficial: false,
    isComponentSpecific: false,
  }
}

function officialHistoryToDayStatuses(history: DayUptimeStatus[]): DayStatus[] {
  // Ensure we have exactly 90 days, pad with 'no_data' if needed
  const result: DayStatus[] = new Array(DAYS).fill('no_data')
  const now = new Date()

  for (const entry of history) {
    const entryDate = new Date(entry.day)
    const diffMs = now.getTime() - entryDate.getTime()
    const daysAgo = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const idx = DAYS - 1 - daysAgo

    if (idx >= 0 && idx < DAYS) {
      result[idx] = entry.status
    }
  }

  return result
}

// ============================================================
// Component
// ============================================================

function getDayColor(status: DayStatus): string {
  switch (status) {
    case 'operational':
      return getStatusColor('operational')
    case 'degraded':
      return getStatusColor('degraded')
    case 'partial_outage':
      return getStatusColor('partial_outage')
    case 'major_outage':
      return getStatusColor('major_outage')
    case 'maintenance':
      return getStatusColor('maintenance')
    case 'no_data':
    default:
      return '#e5e7eb'
  }
}

function getDayLabel(status: DayStatus): string {
  switch (status) {
    case 'operational':
      return 'Operational'
    case 'degraded':
      return 'Degraded Performance'
    case 'partial_outage':
      return 'Partial Outage'
    case 'major_outage':
      return 'Major Outage'
    case 'maintenance':
      return 'Maintenance'
    case 'no_data':
    default:
      return 'No Data'
  }
}

interface UptimeBarProps {
  dailyStatuses: DayStatus[]
  uptimePercentage: number
  isComponentSpecific?: boolean
}

export default function UptimeBar({
  dailyStatuses,
  uptimePercentage,
  isComponentSpecific = true,
}: UptimeBarProps) {
  return (
    <div className="space-y-1.5">
      {isComponentSpecific ? (
        <div className="flex justify-end">
          <span
            className="font-mono text-xs font-medium"
            style={{
              color:
                uptimePercentage >= 99.9
                  ? '#10b981'
                  : uptimePercentage >= 99
                    ? '#f59e0b'
                    : '#ef4444',
            }}
          >
            {uptimePercentage.toFixed(uptimePercentage === 100 ? 0 : 3)}% uptime
          </span>
        </div>
      ) : (
        <div className="flex justify-end">
          <span className="font-mono text-[10px] text-gray-400">
            system-wide incident history
          </span>
        </div>
      )}

      {/* Bar */}
      <div className="flex h-8 items-stretch gap-[1.5px] rounded-[3px] bg-gray-100 p-[3px]">
        {dailyStatuses.map((status, idx) => {
          const color = getDayColor(status)
          const dayDate = new Date()
          dayDate.setDate(dayDate.getDate() - (DAYS - 1 - idx))
          const dateStr = dayDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })
          const label = getDayLabel(status)

          return (
            <div
              key={idx}
              className="group relative flex-1 rounded-[2px] transition-transform hover:scale-y-110"
              style={{ backgroundColor: color }}
              title={`${dateStr}: ${label}`}
            >
              {/* Tooltip */}
              <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-none border border-gray-200 bg-white px-2.5 py-1.5 text-center shadow-sm group-hover:block">
                <div className="font-mono text-[10px] text-gray-500">{dateStr}</div>
                <div className="text-xs font-medium" style={{ color }}>
                  {label}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer labels */}
      <div className="flex justify-between">
        <span className="font-mono text-[10px] text-gray-400">{DAYS} days ago</span>
        <span className="font-mono text-[10px] text-gray-400">Today</span>
      </div>
    </div>
  )
}
