import type { NormalizedIncident, NormalizedMaintenance } from '@/lib/provider-status/types'

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatDateTime(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  })
}

function getImpactColor(impact: string): string {
  switch (impact) {
    case 'critical':
      return 'border-red-500 bg-red-50 text-red-700'
    case 'major':
      return 'border-orange-500 bg-orange-50 text-orange-700'
    case 'minor':
      return 'border-yellow-500 bg-yellow-50 text-yellow-700'
    default:
      return 'border-gray-300 bg-gray-50 text-gray-700'
  }
}

function getStatusBadge(status: string): { color: string; label: string } {
  switch (status) {
    case 'investigating':
      return { color: 'bg-red-100 text-red-700', label: 'Investigating' }
    case 'identified':
      return { color: 'bg-orange-100 text-orange-700', label: 'Identified' }
    case 'monitoring':
      return { color: 'bg-blue-100 text-blue-700', label: 'Monitoring' }
    case 'resolved':
      return { color: 'bg-green-100 text-green-700', label: 'Resolved' }
    case 'postmortem':
      return { color: 'bg-gray-100 text-gray-700', label: 'Postmortem' }
    default:
      return { color: 'bg-gray-100 text-gray-600', label: status }
  }
}

function IncidentCard({ incident }: { incident: NormalizedIncident }) {
  const badge = getStatusBadge(incident.status)
  const impactColor = getImpactColor(incident.impact)
  const isActive = !incident.resolvedAt

  return (
    <div className={`border-l-2 ${impactColor} bg-white`}>
      <div className="px-5 py-4">
        {/* Header */}
        <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
          <div className="flex-1">
            <h4 className="text-sm font-medium text-gray-900">{incident.name}</h4>
            <p className="mt-0.5 font-mono text-xs text-gray-500">
              {formatDate(incident.createdAt)}
              {incident.resolvedAt && ` — Resolved ${formatDate(incident.resolvedAt)}`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isActive && (
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>
            )}
            <span
              className={`inline-flex items-center rounded-none px-2 py-0.5 font-mono text-xs font-medium ${badge.color}`}
            >
              {badge.label}
            </span>
            <span className="rounded-none bg-gray-100 px-2 py-0.5 font-mono text-xs text-gray-600 capitalize">
              {incident.impact}
            </span>
          </div>
        </div>

        {/* Affected Components */}
        {incident.affectedComponents.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {incident.affectedComponents.map((comp) => (
              <span
                key={comp}
                className="inline-flex items-center border border-gray-200 bg-gray-50 px-2 py-0.5 font-mono text-xs text-gray-600"
              >
                {comp}
              </span>
            ))}
          </div>
        )}

        {/* Updates Timeline */}
        {incident.updates.length > 0 && (
          <div className="mt-3 space-y-3 border-t border-gray-100 pt-3">
            {incident.updates.slice(0, 5).map((update, idx) => {
              const updateBadge = getStatusBadge(update.status)
              return (
                <div key={idx} className="flex gap-3">
                  <div className="flex shrink-0 flex-col items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                    {idx < Math.min(incident.updates.length, 5) - 1 && (
                      <div className="mt-1 w-px flex-1 bg-gray-200" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1 pb-2">
                    <div className="mb-1 flex items-center gap-2">
                      <span
                        className={`inline-flex items-center rounded-none px-1.5 py-px font-mono text-[10px] font-medium ${updateBadge.color}`}
                      >
                        {updateBadge.label}
                      </span>
                      <span className="font-mono text-[10px] text-gray-400">
                        {formatDateTime(update.createdAt)}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-600">{update.body}</p>
                  </div>
                </div>
              )
            })}
            {incident.updates.length > 5 && (
              <p className="pl-4 font-mono text-xs text-gray-400">
                + {incident.updates.length - 5} more updates
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function MaintenanceCard({ maintenance }: { maintenance: NormalizedMaintenance }) {
  return (
    <div className="border-l-2 border-blue-400 bg-white">
      <div className="px-5 py-4">
        <div className="mb-1 flex items-start justify-between gap-2">
          <h4 className="text-sm font-medium text-gray-900">{maintenance.name}</h4>
          <span className="inline-flex shrink-0 items-center rounded-none bg-blue-100 px-2 py-0.5 font-mono text-xs font-medium text-blue-700">
            Scheduled
          </span>
        </div>
        <p className="font-mono text-xs text-gray-500">
          {formatDateTime(maintenance.scheduledFor)} — {formatDateTime(maintenance.scheduledUntil)}
        </p>
        {maintenance.affectedComponents.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {maintenance.affectedComponents.map((comp) => (
              <span
                key={comp}
                className="inline-flex items-center border border-gray-200 bg-gray-50 px-2 py-0.5 font-mono text-xs text-gray-600"
              >
                {comp}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

interface IncidentTimelineProps {
  incidents: NormalizedIncident[]
  scheduledMaintenances?: NormalizedMaintenance[]
  maxIncidents?: number
  providerName?: string
  statusPageUrl?: string
}

export default function IncidentTimeline({
  incidents,
  scheduledMaintenances = [],
  maxIncidents = 20,
  providerName,
  statusPageUrl,
}: IncidentTimelineProps) {
  const activeIncidents = incidents.filter((i) => !i.resolvedAt)
  const resolvedIncidents = incidents.filter((i) => i.resolvedAt).slice(0, maxIncidents)

  return (
    <div className="space-y-8">
      {/* Scheduled Maintenances */}
      {scheduledMaintenances.length > 0 && (
        <div>
          <h3 className="mb-4 font-mono text-xs font-medium tracking-wider text-gray-500 uppercase">
            Scheduled Maintenance
          </h3>
          <div className="space-y-3">
            {scheduledMaintenances.map((m) => (
              <MaintenanceCard key={m.id} maintenance={m} />
            ))}
          </div>
        </div>
      )}

      {/* Active Incidents */}
      {activeIncidents.length > 0 && (
        <div>
          <h3 className="mb-4 flex items-center gap-2 font-mono text-xs font-medium tracking-wider text-gray-500 uppercase">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
            Active Incidents ({activeIncidents.length})
          </h3>
          <div className="space-y-3">
            {activeIncidents.map((inc) => (
              <IncidentCard key={inc.id} incident={inc} />
            ))}
          </div>
        </div>
      )}

      {/* Resolved Incidents */}
      {resolvedIncidents.length > 0 && (
        <div>
          <h3 className="mb-4 font-mono text-xs font-medium tracking-wider text-gray-500 uppercase">
            Past Incidents
          </h3>
          <div className="space-y-3">
            {resolvedIncidents.map((inc) => (
              <IncidentCard key={inc.id} incident={inc} />
            ))}
          </div>
        </div>
      )}

      {/* No incidents */}
      {activeIncidents.length === 0 && resolvedIncidents.length === 0 && scheduledMaintenances.length === 0 && (
        <div className="border border-gray-200 bg-white px-5 py-12 text-center">
          {incidents.length === 0 && statusPageUrl ? (
            <>
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-900">Incident history not available</p>
              <p className="mt-1 text-xs text-gray-500">
                {providerName ?? 'This provider'} does not publish incident logs through their public status API.
              </p>
              <a
                href={statusPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block font-mono text-xs text-gray-400 underline decoration-gray-300 underline-offset-2 transition-colors hover:text-[#35c09e]"
              >
                Check their official status page &rarr;
              </a>
            </>
          ) : (
            <>
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50">
                <svg className="h-5 w-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-900">No recent incidents</p>
              <p className="mt-1 text-xs text-gray-500">All systems have been running smoothly.</p>
            </>
          )}
        </div>
      )}
    </div>
  )
}
