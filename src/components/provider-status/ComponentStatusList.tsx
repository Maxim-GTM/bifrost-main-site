import type { ComponentStatus as ComponentStatusType, NormalizedIncident } from '@/lib/provider-status/types'
import { getStatusColor, getStatusText } from '@/lib/provider-status/api'
import UptimeBar, { resolveUptimeData } from './UptimeBar'

interface ComponentStatusListProps {
  components: ComponentStatusType[]
  incidents?: NormalizedIncident[]
}

export default function ComponentStatusList({ components, incidents = [] }: ComponentStatusListProps) {
  if (components.length === 0) {
    return (
      <div className="border border-gray-200 bg-white px-5 py-8 text-center">
        <p className="font-mono text-sm text-gray-400">
          Component data not available for this provider.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {components.map((comp) => {
        const color = getStatusColor(comp.status)
        const text = getStatusText(comp.status)
        const { dailyStatuses, uptimePercentage } = resolveUptimeData(comp, incidents)

        return (
          <div
            key={comp.name}
            className="border border-gray-200 bg-white px-5 py-4"
          >
            {/* Header row: name + status */}
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-800">{comp.name}</span>
              <span className="inline-flex items-center gap-2">
                <span className="font-mono text-xs font-medium" style={{ color }}>
                  {text}
                </span>
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: color }}
                />
              </span>
            </div>

            {/* Uptime bar */}
            <UptimeBar
              dailyStatuses={dailyStatuses}
              uptimePercentage={uptimePercentage}
            />
          </div>
        )
      })}
    </div>
  )
}
