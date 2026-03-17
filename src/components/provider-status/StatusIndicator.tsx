import type { ProviderStatusLevel } from '@/lib/provider-status/types'
import { getStatusColor, getStatusText } from '@/lib/provider-status/api'

interface StatusIndicatorProps {
  status: ProviderStatusLevel
  showText?: boolean
  size?: 'sm' | 'md' | 'lg'
  pulse?: boolean
}

export default function StatusIndicator({
  status,
  showText = true,
  size = 'md',
  pulse = true,
}: StatusIndicatorProps) {
  const color = getStatusColor(status)
  const text = getStatusText(status)

  const dotSize = {
    sm: 'h-2 w-2',
    md: 'h-2.5 w-2.5',
    lg: 'h-3 w-3',
  }[size]

  const textSize = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  }[size]

  const shouldPulse = pulse && status !== 'unknown'

  return (
    <span className="inline-flex items-center gap-2">
      <span className="relative flex">
        {shouldPulse && status !== 'operational' && (
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-50"
            style={{ backgroundColor: color }}
          />
        )}
        <span
          className={`relative inline-flex rounded-full ${dotSize}`}
          style={{ backgroundColor: color }}
        />
      </span>
      {showText && (
        <span className={`${textSize} font-medium`} style={{ color }}>
          {text}
        </span>
      )}
    </span>
  )
}
