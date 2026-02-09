'use client'

import { BenchmarkMetric } from '@/lib/benchmark-data'

interface BenchmarkMetricsProps {
  metrics: BenchmarkMetric[]
  title: string
  description?: string
}

export default function BenchmarkMetrics({ metrics, title, description }: BenchmarkMetricsProps) {
  const formatValue = (value: number, unit: string) => {
    if (unit === 'ms' && value >= 1000) {
      return `${(value / 1000).toFixed(2)}s`
    }
    if (unit === 'req/s') {
      return `${value.toFixed(value < 100 ? 2 : 0)} req/s`
    }
    return `${value}${unit}`
  }

  const calculateImprovement = (metric: BenchmarkMetric) => {
    if (metric.lowerIsBetter) {
      return metric.litellm / metric.bifrost
    }
    return metric.bifrost / metric.litellm
  }

  return (
    <div className="border border-gray-200 bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <h3 className="text-sm font-medium tracking-wider text-gray-900 uppercase">{title}</h3>
        {description && <p className="mt-1 text-xs text-gray-500">{description}</p>}
      </div>

      {/* Metrics Grid */}
      <div className="divide-y divide-gray-200">
        {metrics.map((metric) => {
          const improvement = calculateImprovement(metric)
          const bifrostWins = metric.lowerIsBetter
            ? metric.bifrost < metric.litellm
            : metric.bifrost > metric.litellm
          const barWidth = Math.min(100, (metric.bifrost / metric.litellm) * 100)

          return (
            <div key={metric.name} className="p-4">
              {/* Metric Name */}
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-900">{metric.name}</span>
                  {metric.description && (
                    <p className="mt-0.5 text-xs text-gray-400">{metric.description}</p>
                  )}
                </div>
                {bifrostWins && (
                  <span className="bg-[var(--accent)]/10 px-2 py-1 font-mono text-xs font-semibold text-[var(--accent-text)]">
                    {improvement.toFixed(1)}x {metric.lowerIsBetter ? 'faster' : 'better'}
                  </span>
                )}
              </div>

              {/* Comparison Bars */}
              <div className="space-y-2">
                {/* Bifrost */}
                {(() => {
                  const bifrostBarWidth = metric.lowerIsBetter
                    ? Math.min(100, (metric.bifrost / metric.litellm) * 100)
                    : Math.min(
                        100,
                        (metric.bifrost / Math.max(metric.bifrost, metric.litellm)) * 100
                      )
                  const isNarrow = bifrostBarWidth < 15

                  return (
                    <div className="flex items-center gap-3">
                      <span className="w-16 font-mono text-xs text-gray-500">Bifrost</span>
                      <div className="relative h-6 flex-1 bg-gray-100">
                        <div
                          className="absolute inset-y-0 left-0 bg-[var(--accent)] transition-all duration-500"
                          style={{ width: `${bifrostBarWidth}%` }}
                        />
                        <span
                          className={`absolute inset-y-0 flex items-center font-mono text-xs font-semibold ${
                            isNarrow ? 'text-gray-700' : 'text-white'
                          }`}
                          style={{ left: isNarrow ? `calc(${bifrostBarWidth}% + 8px)` : '8px' }}
                        >
                          {formatValue(metric.bifrost, metric.unit)}
                        </span>
                      </div>
                    </div>
                  )
                })()}

                {/* LiteLLM */}
                {(() => {
                  const litellmBarWidth = metric.lowerIsBetter
                    ? 100
                    : Math.min(
                        100,
                        (metric.litellm / Math.max(metric.bifrost, metric.litellm)) * 100
                      )
                  const isNarrow = litellmBarWidth < 15

                  return (
                    <div className="flex items-center gap-3">
                      <span className="w-16 font-mono text-xs text-gray-500">LiteLLM</span>
                      <div className="relative h-6 flex-1 bg-gray-100">
                        <div
                          className="absolute inset-y-0 left-0 bg-red-500/70 transition-all duration-500"
                          style={{ width: `${litellmBarWidth}%` }}
                        />
                        <span
                          className={`absolute inset-y-0 flex items-center font-mono text-xs font-semibold ${
                            isNarrow ? 'text-gray-700' : 'text-white'
                          }`}
                          style={{ left: isNarrow ? `calc(${litellmBarWidth}% + 8px)` : '8px' }}
                        >
                          {formatValue(metric.litellm, metric.unit)}
                        </span>
                      </div>
                    </div>
                  )
                })()}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
