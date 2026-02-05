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
  animationKey = 0
}: MetricCardProps) {
  return (
    <div 
      className="border border-gray-200 rounded-sm p-6 font-mono transition-all duration-300  hover:border-green-300 bg-white"      
    >
      <div className="text-black font-medium text-sm mb-2">
        {command}
      </div>
      <div className="text-accent text-3xl font-bold mb-2">
        <AnimatedNumber 
          key={`metric-${animationKey}`} 
          value={value} 
          suffix={suffix}
        />
      </div>
      <div className="text-gray-500 text-xs uppercase tracking-wider">{label}</div>
      <div className="text-accent text-xs mt-2">{status}</div>
    </div>
  )
} 