'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Play, Pause, RefreshCw } from 'lucide-react'

// All data sourced from:
// https://www.getmaxim.ai/blog/bifrost-a-drop-in-llm-proxy-40x-faster-than-litellm/
//
// 500 RPS Load Test (t3.medium, 2 vCPU, 4GB RAM):
//   Bifrost:  P50=804ms, P99=1.68s, Max=6.13s, Throughput=424/s, Success=100%, Memory=120MB
//   LiteLLM:  P50=38.65s, P99=90.72s, Max=92.67s, Throughput=44.84/s, Success=88.78%, Memory=372MB
//
// Apples-to-apples single-instance test:
//   Bifrost overhead: 0.99ms, LiteLLM overhead: 40ms (with 60ms mock upstream)

interface DataPoint {
  bifrostLatency: number
  litellmLatency: number
  bifrostThroughput: number
  litellmThroughput: number
  bifrostSuccess: number
  litellmSuccess: number
  bifrostMemory: number
  litellmMemory: number
}

type MetricView = 'latency' | 'throughput' | 'success' | 'memory'

interface MetricConfig {
  label: string
  shortLabel: string
  getBifrost: (d: DataPoint) => number
  getLitellm: (d: DataPoint) => number
  yMax: number // shared Y-axis max for both charts
  yLabels: string[] // shared Y-axis labels
  formatValue: (v: number) => string
  bifrostBenchmark: string
  litellmBenchmark: string
  multiplier: string
  bifrostStatus: string
  litellmStatus: string
  litellmStatusColor: string
}

// Shared Y-axis per metric so both charts use the same scale.
// The "winner" will appear compressed near one edge — that IS the point.
const METRIC_CONFIGS: Record<MetricView, MetricConfig> = {
  latency: {
    label: 'P50 Latency',
    shortLabel: 'Latency',
    getBifrost: (d) => d.bifrostLatency,
    getLitellm: (d) => d.litellmLatency,
    yMax: 95000, // 95s — accommodates LiteLLM P99 of 90.72s
    yLabels: ['90s', '60s', '30s', '0'],
    formatValue: (v) => {
      if (v >= 60000) return `${(v / 60000).toFixed(1)}m`
      if (v >= 1000) return `${(v / 1000).toFixed(2)}s`
      return `${Math.round(v)}ms`
    },
    bifrostBenchmark: 'P50: 804ms · P99: 1.68s',
    litellmBenchmark: 'P50: 38.65s · P99: 90.72s',
    multiplier: '48x faster P50',
    bifrostStatus: 'STABLE',
    litellmStatus: 'STRUGGLING',
    litellmStatusColor: 'bg-amber-500 text-white',
  },
  throughput: {
    label: 'Throughput (req/s)',
    shortLabel: 'Throughput',
    getBifrost: (d) => d.bifrostThroughput,
    getLitellm: (d) => d.litellmThroughput,
    yMax: 500, // Bifrost peaks ~424/s
    yLabels: ['500', '375', '250', '125', '0'],
    formatValue: (v) => `${v < 100 ? v.toFixed(1) : Math.round(v)}/s`,
    bifrostBenchmark: '424 req/s sustained',
    litellmBenchmark: '44.84 req/s sustained',
    multiplier: '9.5x higher',
    bifrostStatus: 'FULL CAPACITY',
    litellmStatus: 'BOTTLENECKED',
    litellmStatusColor: 'bg-red-500 text-white',
  },
  success: {
    label: 'Success Rate (%)',
    shortLabel: 'Success',
    getBifrost: (d) => d.bifrostSuccess,
    getLitellm: (d) => d.litellmSuccess,
    yMax: 105,
    yLabels: ['100%', '75%', '50%', '25%', '0'],
    formatValue: (v) => `${v.toFixed(1)}%`,
    bifrostBenchmark: '100% success rate',
    litellmBenchmark: '88.78% — 11.22% dropped',
    multiplier: '100% vs 88.78%',
    bifrostStatus: 'ALL PASSING',
    litellmStatus: 'DROPPING',
    litellmStatusColor: 'bg-red-500 text-white',
  },
  memory: {
    label: 'Peak Memory (MB)',
    shortLabel: 'Memory',
    getBifrost: (d) => d.bifrostMemory,
    getLitellm: (d) => d.litellmMemory,
    yMax: 450, // LiteLLM peaks ~372MB
    yLabels: ['450', '300', '150', '0'],
    formatValue: (v) => `${Math.round(v)} MB`,
    bifrostBenchmark: 'Peak: 120 MB',
    litellmBenchmark: 'Peak: 372 MB',
    multiplier: '68% less memory',
    bifrostStatus: 'EFFICIENT',
    litellmStatus: 'HEAVY',
    litellmStatusColor: 'bg-amber-500 text-white',
  },
}

const MAX_POINTS = 50
const CHART_HEIGHT = 120

export default function BenchmarkLive() {
  const [isRunning, setIsRunning] = useState(true)
  const [metricView, setMetricView] = useState<MetricView>('latency')
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([])
  const chartRef = useRef<HTMLDivElement>(null)
  const [chartWidth, setChartWidth] = useState(400)

  const config = METRIC_CONFIGS[metricView]

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

  // Generate samples using realistic distributions based on blog data
  const generateDataPoint = useCallback((): DataPoint => {
    const r1 = Math.random()
    const r2 = Math.random()

    // Bifrost latency: P50=804ms, P99=1680ms, Max=6130ms
    let bifrostLatency: number
    if (r1 < 0.5) {
      bifrostLatency = 650 + Math.random() * 154
    } else if (r1 < 0.95) {
      bifrostLatency = 804 + Math.random() * 596
    } else if (r1 < 0.99) {
      bifrostLatency = 1400 + Math.random() * 280
    } else {
      bifrostLatency = 1680 + Math.random() * 4450
    }

    // LiteLLM latency: P50=38650ms, P99=90720ms, Max=92670ms
    let litellmLatency: number
    if (r2 < 0.5) {
      litellmLatency = 20000 + Math.random() * 18650
    } else if (r2 < 0.95) {
      litellmLatency = 38650 + Math.random() * 36350
    } else if (r2 < 0.99) {
      litellmLatency = 75000 + Math.random() * 15720
    } else {
      litellmLatency = 90720 + Math.random() * 1950
    }

    // Throughput: Bifrost 424/s, LiteLLM 44.84/s
    const bifrostThroughput = 400 + Math.random() * 48
    const litellmThroughput = 38 + Math.random() * 14

    // Success rate: Bifrost 100%, LiteLLM 88.78%
    const bifrostSuccess = 100
    const litellmSuccess = 86.5 + Math.random() * 4.5

    // Memory: Bifrost 120MB, LiteLLM 372MB
    const bifrostMemory = 112 + Math.random() * 16
    const litellmMemory = 350 + Math.random() * 44

    return {
      bifrostLatency: Math.round(bifrostLatency),
      litellmLatency: Math.round(litellmLatency),
      bifrostThroughput,
      litellmThroughput,
      bifrostSuccess,
      litellmSuccess,
      bifrostMemory,
      litellmMemory,
    }
  }, [])

  useEffect(() => {
    if (!isRunning) return
    const interval = setInterval(() => {
      setDataPoints((prev) => {
        const next = [...prev, generateDataPoint()]
        return next.length > MAX_POINTS ? next.slice(-MAX_POINTS) : next
      })
    }, 600)
    return () => clearInterval(interval)
  }, [isRunning, generateDataPoint])

  const pointSpacing = chartWidth / MAX_POINTS

  const generatePath = (
    getValue: (d: DataPoint) => number,
    maxValue: number
  ) => {
    if (dataPoints.length < 2) return ''
    return dataPoints
      .map((d, i) => {
        const x = i * pointSpacing
        const val = Math.min(getValue(d), maxValue)
        const y = CHART_HEIGHT - (val / maxValue) * CHART_HEIGHT
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${Math.max(2, Math.min(CHART_HEIGHT - 2, y)).toFixed(1)}`
      })
      .join(' ')
  }

  const generateAreaPath = (
    getValue: (d: DataPoint) => number,
    maxValue: number
  ) => {
    if (dataPoints.length < 2) return ''
    const linePath = generatePath(getValue, maxValue)
    const lastX = (dataPoints.length - 1) * pointSpacing
    return `${linePath} L ${lastX.toFixed(1)} ${CHART_HEIGHT} L 0 ${CHART_HEIGHT} Z`
  }

  const currentBifrost =
    dataPoints.length > 0 ? config.getBifrost(dataPoints[dataPoints.length - 1]) : 0
  const currentLitellm =
    dataPoints.length > 0 ? config.getLitellm(dataPoints[dataPoints.length - 1]) : 0

  const metricOptions: { key: MetricView; label: string }[] = [
    { key: 'latency', label: 'Latency' },
    { key: 'throughput', label: 'Throughput' },
    { key: 'success', label: 'Success' },
    { key: 'memory', label: 'Memory' },
  ]

  // Summary stats from blog — shown below chart
  const summaryStats = [
    { label: 'P50 Latency', bifrost: '804ms', litellm: '38.65s', diff: '48x faster' },
    { label: 'P99 Latency', bifrost: '1.68s', litellm: '90.72s', diff: '54x faster' },
    { label: 'Throughput', bifrost: '424/s', litellm: '44.84/s', diff: '9.5x higher' },
    { label: 'Success', bifrost: '100%', litellm: '88.78%', diff: '11.2% more' },
    { label: 'Memory', bifrost: '120 MB', litellm: '372 MB', diff: '68% less' },
    { label: 'Overhead', bifrost: '0.99ms', litellm: '40ms', diff: '40x less' },
  ]

  return (
    <div className="border border-gray-200 bg-white">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 px-4 py-3">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-medium tracking-wider text-gray-900 uppercase">
            Live Benchmark Simulation
          </h3>
          <div
            className={`flex items-center gap-1.5 rounded px-2 py-0.5 font-mono text-[10px] ${
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
          {/* Metric selector */}
          <div className="flex items-center gap-1">
            {metricOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setMetricView(opt.key)}
                className={`px-2 py-1 font-mono text-[10px] transition-colors ${
                  metricView === opt.key
                    ? 'bg-[var(--accent)] text-white'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="rounded p-1.5 transition-colors hover:bg-gray-100"
              aria-label={isRunning ? 'Pause' : 'Play'}
            >
              {isRunning ? (
                <Pause className="h-3.5 w-3.5 text-gray-500" />
              ) : (
                <Play className="h-3.5 w-3.5 text-gray-500" />
              )}
            </button>
            <button
              onClick={() => setDataPoints([])}
              className="rounded p-1.5 transition-colors hover:bg-gray-100"
              aria-label="Reset"
            >
              <RefreshCw className="h-3.5 w-3.5 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Multiplier callout */}
      <div className="flex items-center justify-center border-b border-gray-200 bg-[var(--accent)]/5 py-2">
        <span className="font-mono text-xs font-medium text-[var(--accent-text)]">
          {config.multiplier}
        </span>
        <span className="mx-2 text-gray-300">|</span>
        <span className="font-mono text-[10px] text-gray-400">500 RPS on t3.medium</span>
      </div>

      {/* Dual charts — same Y-axis scale */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Bifrost chart */}
        <div className="border-b border-gray-200 p-4 lg:border-r lg:border-b-0">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#35c09e]" />
              <span className="text-xs font-medium text-gray-900">Bifrost</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-semibold text-[#35c09e]">
                {dataPoints.length > 0 ? config.formatValue(currentBifrost) : '—'}
              </span>
              <span className="rounded bg-green-50 px-1.5 py-0.5 font-mono text-[9px] font-medium text-green-700">
                {config.bifrostStatus}
              </span>
            </div>
          </div>
          <div className="mb-1 font-mono text-[9px] text-gray-400">{config.bifrostBenchmark}</div>
          <div className="flex">
            <div
              className="flex flex-col justify-between pr-2 font-mono text-[8px] text-gray-400"
              style={{ height: CHART_HEIGHT }}
            >
              {config.yLabels.map((label, i) => (
                <span key={i}>{label}</span>
              ))}
            </div>
            <div
              ref={chartRef}
              className="relative flex-1 overflow-hidden border border-gray-100 bg-gray-50/30"
              style={{ height: CHART_HEIGHT }}
            >
              <svg width={chartWidth} height={CHART_HEIGHT} className="absolute inset-0">
                {/* Grid lines */}
                {[1, 2, 3].map((i) => (
                  <line
                    key={i}
                    x1="0"
                    y1={(CHART_HEIGHT * i) / 4}
                    x2={chartWidth}
                    y2={(CHART_HEIGHT * i) / 4}
                    stroke="#f3f4f6"
                    strokeWidth="0.5"
                  />
                ))}
                {dataPoints.length > 1 && (
                  <>
                    <path
                      d={generateAreaPath(config.getBifrost, config.yMax)}
                      fill="#35c09e"
                      fillOpacity="0.1"
                    />
                    <path
                      d={generatePath(config.getBifrost, config.yMax)}
                      fill="none"
                      stroke="#35c09e"
                      strokeWidth="1.5"
                    />
                  </>
                )}
                {dataPoints.length > 0 && (
                  <circle
                    cx={(dataPoints.length - 1) * pointSpacing}
                    cy={Math.max(
                      2,
                      Math.min(
                        CHART_HEIGHT - 2,
                        CHART_HEIGHT -
                          (Math.min(currentBifrost, config.yMax) / config.yMax) * CHART_HEIGHT
                      )
                    )}
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

        {/* LiteLLM chart */}
        <div className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-red-500" />
              <span className="text-xs font-medium text-gray-900">LiteLLM</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-semibold text-red-500">
                {dataPoints.length > 0 ? config.formatValue(currentLitellm) : '—'}
              </span>
              <span
                className={`rounded px-1.5 py-0.5 font-mono text-[9px] font-medium ${config.litellmStatusColor}`}
              >
                {config.litellmStatus}
              </span>
            </div>
          </div>
          <div className="mb-1 font-mono text-[9px] text-gray-400">{config.litellmBenchmark}</div>
          <div className="flex">
            <div
              className="flex flex-col justify-between pr-2 font-mono text-[8px] text-gray-400"
              style={{ height: CHART_HEIGHT }}
            >
              {config.yLabels.map((label, i) => (
                <span key={i}>{label}</span>
              ))}
            </div>
            <div
              className="relative flex-1 overflow-hidden border border-gray-100 bg-gray-50/30"
              style={{ height: CHART_HEIGHT }}
            >
              <svg width={chartWidth} height={CHART_HEIGHT} className="absolute inset-0">
                {/* Grid lines */}
                {[1, 2, 3].map((i) => (
                  <line
                    key={i}
                    x1="0"
                    y1={(CHART_HEIGHT * i) / 4}
                    x2={chartWidth}
                    y2={(CHART_HEIGHT * i) / 4}
                    stroke="#f3f4f6"
                    strokeWidth="0.5"
                  />
                ))}
                {dataPoints.length > 1 && (
                  <>
                    <path
                      d={generateAreaPath(config.getLitellm, config.yMax)}
                      fill="#ef4444"
                      fillOpacity="0.08"
                    />
                    <path
                      d={generatePath(config.getLitellm, config.yMax)}
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="1.5"
                      strokeOpacity="0.7"
                    />
                  </>
                )}
                {dataPoints.length > 0 && (
                  <circle
                    cx={(dataPoints.length - 1) * pointSpacing}
                    cy={Math.max(
                      2,
                      Math.min(
                        CHART_HEIGHT - 2,
                        CHART_HEIGHT -
                          (Math.min(currentLitellm, config.yMax) / config.yMax) * CHART_HEIGHT
                      )
                    )}
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

      {/* Summary stats */}
      <div className="grid grid-cols-2 border-t border-gray-200 sm:grid-cols-3 lg:grid-cols-6">
        {summaryStats.map((s) => (
          <div
            key={s.label}
            className="border-b border-r border-gray-200 p-3 last:border-r-0 sm:[&:nth-child(3n)]:border-r-0 lg:[&:nth-child(3n)]:border-r"
          >
            <div className="mb-1.5 font-mono text-[9px] tracking-wide text-gray-400 uppercase">
              {s.label}
            </div>
            <div className="mb-0.5 flex items-baseline gap-1.5">
              <span className="font-mono text-xs font-semibold text-[#35c09e]">{s.bifrost}</span>
              <span className="font-mono text-[9px] text-gray-300">vs</span>
              <span className="font-mono text-[11px] text-red-400">{s.litellm}</span>
            </div>
            <div className="font-mono text-[9px] font-medium text-[var(--accent-text)]">
              {s.diff}
            </div>
          </div>
        ))}
      </div>

      {/* Source */}
      <div className="border-t border-gray-200 bg-gray-50 px-4 py-2">
        <p className="text-center font-mono text-[10px] leading-relaxed text-gray-400">
          All values from actual benchmark at 500 RPS on AWS t3.medium (2 vCPU, 4GB RAM).
          Simulated samples reflect measured P50/P99/Max distributions.{' '}
          <a
            href="https://www.getmaxim.ai/blog/bifrost-a-drop-in-llm-proxy-40x-faster-than-litellm/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 underline"
          >
            Full benchmark report
          </a>
        </p>
      </div>
    </div>
  )
}
