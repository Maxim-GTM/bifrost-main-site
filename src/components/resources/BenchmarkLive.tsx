'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Play, Pause, RefreshCw } from 'lucide-react'

interface DataPoint {
  bifrost: number
  litellm: number
}

interface LiveMetrics {
  bifrostLatency: number
  litellmLatency: number
  bifrostRps: number
  litellmRps: number
  bifrostSuccess: number
  litellmSuccess: number
}

const MAX_POINTS = 50
const BIFROST_MAX = 10000 // 0-10s scale for Bifrost (800ms appears at ~8% from bottom)
const LITELLM_MAX = 60000 // 0-60s scale for LiteLLM (38s appears at ~63% up)

export default function BenchmarkLive() {
  const [isRunning, setIsRunning] = useState(true)
  const [rpsLevel, setRpsLevel] = useState(500)
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([])
  const [metrics, setMetrics] = useState<LiveMetrics>({
    bifrostLatency: 804,
    litellmLatency: 38650,
    bifrostRps: 424,
    litellmRps: 45,
    bifrostSuccess: 100,
    litellmSuccess: 89,
  })
  const chartRef = useRef<HTMLDivElement>(null)
  const [chartWidth, setChartWidth] = useState(400)

  // Measure chart width
  useEffect(() => {
    const updateWidth = () => {
      if (chartRef.current) {
        setChartWidth(chartRef.current.offsetWidth)
      }
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  const generateDataPoint = useCallback((): DataPoint => {
    const loadFactor = rpsLevel / 500
    return {
      bifrost: Math.round(750 + Math.random() * 150 * loadFactor),
      litellm: Math.round(32000 + Math.random() * 12000 * loadFactor),
    }
  }, [rpsLevel])

  const updateMetrics = useCallback(() => {
    const loadFactor = rpsLevel / 500
    setMetrics({
      bifrostLatency: Math.round(780 + Math.random() * 80 * loadFactor),
      litellmLatency: Math.round(34000 + Math.random() * 6000 * loadFactor),
      bifrostRps: Math.round(400 + Math.random() * 40),
      litellmRps: Math.round(40 + Math.random() * 10),
      bifrostSuccess: 100,
      litellmSuccess: Math.round(85 + Math.random() * 7),
    })
  }, [rpsLevel])

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setDataPoints((prev) => {
        const newPoint = generateDataPoint()
        const newData = [...prev, newPoint]
        // Only keep MAX_POINTS once we've reached that limit
        if (newData.length > MAX_POINTS) {
          return newData.slice(-MAX_POINTS)
        }
        return newData
      })
      updateMetrics()
    }, 800)

    return () => clearInterval(interval)
  }, [isRunning, generateDataPoint, updateMetrics])

  const formatLatency = (ms: number) => {
    if (ms >= 1000) return `${(ms / 1000).toFixed(1)}s`
    return `${ms}ms`
  }

  const currentBifrost = dataPoints.length > 0 ? dataPoints[dataPoints.length - 1].bifrost : 0
  const currentLitellm = dataPoints.length > 0 ? dataPoints[dataPoints.length - 1].litellm : 0

  // Calculate the width each point should occupy
  const pointSpacing = chartWidth / MAX_POINTS

  // Generate path that grows from left
  const generatePath = (getValue: (d: DataPoint) => number, maxValue: number, height: number) => {
    if (dataPoints.length < 2) return ''

    const points = dataPoints.map((d, i) => {
      const x = i * pointSpacing
      const y = height - (getValue(d) / maxValue) * height
      return { x, y: Math.max(2, Math.min(height - 2, y)) }
    })

    return points
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
      .join(' ')
  }

  // Generate area path for fill
  const generateAreaPath = (
    getValue: (d: DataPoint) => number,
    maxValue: number,
    height: number
  ) => {
    if (dataPoints.length < 2) return ''

    const linePath = generatePath(getValue, maxValue, height)
    const lastX = (dataPoints.length - 1) * pointSpacing

    return `${linePath} L ${lastX} ${height} L 0 ${height} Z`
  }

  const rpsOptions = [500, 1000, 2000, 5000]
  const chartHeight = 100

  const handleReset = () => {
    setDataPoints([])
    setRpsLevel(500)
  }

  return (
    <div className="border border-gray-200 bg-white">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 p-4">
        <div className="flex items-center gap-4">
          <h3 className="text-sm font-medium tracking-wider text-gray-900 uppercase">
            Live Benchmark Simulation
          </h3>
          <div
            className={`flex items-center gap-1.5 rounded px-2 py-1 font-mono text-xs ${
              isRunning ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${isRunning ? 'animate-pulse bg-green-500' : 'bg-gray-400'}`}
            />
            {isRunning ? 'RUNNING' : 'PAUSED'}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* RPS Control */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-gray-500">RPS:</span>
            {rpsOptions.map((rps) => (
              <button
                key={rps}
                onClick={() => setRpsLevel(rps)}
                className={`px-2 py-1 font-mono text-xs transition-colors ${
                  rpsLevel === rps
                    ? 'bg-[var(--accent)] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {rps >= 1000 ? `${rps / 1000}k` : rps}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsRunning(!isRunning)}
            className="p-2 transition-colors hover:bg-gray-100"
          >
            {isRunning ? (
              <Pause className="h-4 w-4 text-gray-600" />
            ) : (
              <Play className="h-4 w-4 text-gray-600" />
            )}
          </button>

          <button onClick={handleReset} className="p-2 transition-colors hover:bg-gray-100">
            <RefreshCw className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Chart Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Bifrost Chart */}
        <div className="border-b border-gray-200 p-4 lg:border-r lg:border-b-0">
          <div className="mb-3 flex items-baseline justify-between">
            <span className="font-mono text-sm text-gray-600">
              avg latency:{' '}
              <span className="font-semibold text-[#35c09e]">{formatLatency(currentBifrost)}</span>
            </span>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-[#35c09e]" />
              <span className="text-xs font-medium text-gray-900">Bifrost</span>
            </div>
          </div>
          <div className="flex">
            {/* Y-axis labels - 0-10s scale */}
            <div className="flex h-[100px] flex-col justify-between pr-2 font-mono text-[9px] text-gray-400">
              <span>10s</span>
              <span>5s</span>
              <span>2s</span>
              <span>0</span>
            </div>
            <div
              ref={chartRef}
              className="relative h-[100px] flex-1 overflow-hidden rounded border border-gray-100 bg-white"
            >
              <svg width={chartWidth} height={chartHeight} className="absolute inset-0">
                {/* Area fill */}
                {dataPoints.length > 1 && (
                  <path
                    d={generateAreaPath((d) => d.bifrost, BIFROST_MAX, chartHeight)}
                    fill="#35c09e"
                    fillOpacity="0.1"
                  />
                )}
                {/* Line */}
                {dataPoints.length > 1 && (
                  <path
                    d={generatePath((d) => d.bifrost, BIFROST_MAX, chartHeight)}
                    fill="none"
                    stroke="#35c09e"
                    strokeWidth="1.5"
                  />
                )}
                {/* Current point indicator */}
                {dataPoints.length > 0 && (
                  <circle
                    cx={(dataPoints.length - 1) * pointSpacing}
                    cy={chartHeight - (currentBifrost / BIFROST_MAX) * chartHeight}
                    r="3"
                    fill="#35c09e"
                    stroke="white"
                    strokeWidth="1.5"
                  />
                )}
              </svg>
            </div>
          </div>
        </div>

        {/* LiteLLM Chart */}
        <div className="p-4">
          <div className="mb-3 flex items-baseline justify-between">
            <span className="font-mono text-sm text-gray-600">
              avg latency:{' '}
              <span className="font-semibold text-red-500">{formatLatency(currentLitellm)}</span>
            </span>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-red-500" />
              <span className="text-xs font-medium text-gray-900">LiteLLM</span>
            </div>
          </div>
          <div className="flex">
            {/* Y-axis labels - 0-60s scale */}
            <div className="flex h-[100px] flex-col justify-between pr-2 font-mono text-[9px] text-gray-400">
              <span>60s</span>
              <span>40s</span>
              <span>20s</span>
              <span>0</span>
            </div>
            <div className="relative h-[100px] flex-1 overflow-hidden rounded border border-gray-100 bg-white">
              <svg width={chartWidth} height={chartHeight} className="absolute inset-0">
                {/* Area fill */}
                {dataPoints.length > 1 && (
                  <path
                    d={generateAreaPath((d) => d.litellm, LITELLM_MAX, chartHeight)}
                    fill="#ef4444"
                    fillOpacity="0.1"
                  />
                )}
                {/* Line */}
                {dataPoints.length > 1 && (
                  <path
                    d={generatePath((d) => d.litellm, LITELLM_MAX, chartHeight)}
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="1.5"
                  />
                )}
                {/* Current point indicator */}
                {dataPoints.length > 0 && (
                  <circle
                    cx={(dataPoints.length - 1) * pointSpacing}
                    cy={chartHeight - (currentLitellm / LITELLM_MAX) * chartHeight}
                    r="3"
                    fill="#ef4444"
                    stroke="white"
                    strokeWidth="1.5"
                  />
                )}
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Live Metrics */}
      <div className="grid grid-cols-2 border-t border-gray-200 lg:grid-cols-6">
        <div className="border-r border-b border-gray-200 bg-[#35c09e]/5 p-3 lg:border-b-0">
          <div className="mb-0.5 font-mono text-[10px] text-gray-500 uppercase">Bifrost P50</div>
          <div className="font-mono text-lg font-semibold text-[#35c09e] tabular-nums">
            {formatLatency(metrics.bifrostLatency)}
          </div>
        </div>
        <div className="border-r border-b border-gray-200 bg-[#35c09e]/5 p-3 lg:border-b-0">
          <div className="mb-0.5 font-mono text-[10px] text-gray-500 uppercase">Bifrost RPS</div>
          <div className="font-mono text-lg font-semibold text-[#35c09e] tabular-nums">
            {metrics.bifrostRps}
          </div>
        </div>
        <div className="border-r border-b border-gray-200 bg-[#35c09e]/5 p-3 lg:border-b-0">
          <div className="mb-0.5 font-mono text-[10px] text-gray-500 uppercase">
            Bifrost Success
          </div>
          <div className="font-mono text-lg font-semibold text-[#35c09e] tabular-nums">
            {metrics.bifrostSuccess}%
          </div>
        </div>
        <div className="border-r border-gray-200 bg-red-50/50 p-3">
          <div className="mb-0.5 font-mono text-[10px] text-gray-500 uppercase">LiteLLM P50</div>
          <div className="font-mono text-lg font-semibold text-red-600 tabular-nums">
            {formatLatency(metrics.litellmLatency)}
          </div>
        </div>
        <div className="border-r border-gray-200 bg-red-50/50 p-3">
          <div className="mb-0.5 font-mono text-[10px] text-gray-500 uppercase">LiteLLM RPS</div>
          <div className="font-mono text-lg font-semibold text-red-600 tabular-nums">
            {metrics.litellmRps}
          </div>
        </div>
        <div className="bg-red-50/50 p-3">
          <div className="mb-0.5 font-mono text-[10px] text-gray-500 uppercase">
            LiteLLM Success
          </div>
          <div className="font-mono text-lg font-semibold text-red-600 tabular-nums">
            {metrics.litellmSuccess}%
          </div>
        </div>
      </div>
    </div>
  )
}
