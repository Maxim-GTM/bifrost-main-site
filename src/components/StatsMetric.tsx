'use client'

interface StatsMetricProps {
  label: string
  value: string
  unit?: string
}

export function StatsMetric({ label, value, unit }: StatsMetricProps) {
  return (
    <div className="text-center">
      <div className="mb-2 text-xs font-medium tracking-wider text-gray-500 uppercase">{label}</div>
      <div className="flex items-baseline justify-center gap-1">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        {unit && <span className="text-sm font-medium text-gray-600">{unit}</span>}
      </div>
    </div>
  )
}
