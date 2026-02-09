import { AnimatedNumber } from './AnimatedNumber'

interface MetricCardProps {
  command: string
  value: number
  suffix: string
  label: string
  status: string
  animationKey?: number
}

export function MetricCard({
  command,
  value,
  suffix,
  label,
  status,
  animationKey = 0,
}: MetricCardProps) {
  return (
    <div className="rounded-sm border border-gray-200 bg-white p-6 font-mono transition-all duration-300 hover:border-green-300">
      <div className="mb-2 text-sm font-medium text-black">{command}</div>
      <div className="text-accent mb-2 text-3xl font-bold">
        <AnimatedNumber key={`metric-${animationKey}`} value={value} suffix={suffix} />
      </div>
      <div className="text-xs tracking-wider text-gray-500 uppercase">{label}</div>
      <div className="text-accent mt-2 text-xs">{status}</div>
    </div>
  )
}
