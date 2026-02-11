'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Play, Pause, RefreshCw } from 'lucide-react'

// High-throughput stress test data from:
// https://www.getmaxim.ai/blog/bifrost-a-drop-in-llm-proxy-40x-faster-than-litellm/
//
// Bifrost-only at 5000 RPS:
//   t3.medium (2 vCPU, 4GB RAM):  59µs internal overhead, 100% success, buffer=15000, pool=10000
//   t3.xlarge (4 vCPU, 16GB RAM): 11µs internal overhead, 100% success, buffer=20000, pool=15000
//   Response payload: ~10KB average

interface DataPoint {
  t3Medium: number // µs
  t3XLarge: number // µs
}

const MAX_POINTS = 50
const CHART_HEIGHT = 130

export default function StressTestLive() {
  const [isRunning, setIsRunning] = useState(true)
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([])
  const chartRef = useRef<HTMLDivElement>(null)
  const [chartWidth, setChartWidth] = useState(400)

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
    // t3.medium: 59µs average with realistic jitter
    const t3Medium = 45 + Math.random() * 28 // 45-73µs range centered ~59

    // t3.xlarge: 11µs average with realistic jitter
    const t3XLarge = 6 + Math.random() * 10 // 6-16µs range centered ~11

    return {
      t3Medium: Math.round(t3Medium * 10) / 10,
      t3XLarge: Math.round(t3XLarge * 10) / 10,
    }
  }, [])

  useEffect(() => {
    if (!isRunning) return
    const interval = setInterval(() => {
      setDataPoints((prev) => {
        const next = [...prev, generateDataPoint()]
        return next.length > MAX_POINTS ? next.slice(-MAX_POINTS) : next
      })
    }, 500)
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

  const currentMedium = dataPoints.length > 0 ? dataPoints[dataPoints.length - 1].t3Medium : 59
  const currentXLarge = dataPoints.length > 0 ? dataPoints[dataPoints.length - 1].t3XLarge : 11

  // Y-axis max: 100µs — both lines well within this range
  const Y_MAX = 100

  return (
    <div className="border border-gray-200 bg-white">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 px-4 py-3">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-medium tracking-wider text-gray-900 uppercase">
            Bifrost Stress Test &mdash; 5000 RPS
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

      {/* Callout */}
      <div className="flex items-center justify-center border-b border-gray-200 bg-[var(--accent)]/5 py-2">
        <span className="font-mono text-xs font-medium text-[var(--accent-text)]">
          &lt;15µs target overhead per request at 5000 RPS
        </span>
        <span className="mx-2 text-gray-300">|</span>
        <span className="font-mono text-[10px] text-gray-400">100% success rate on both instances</span>
      </div>

      {/* Combined chart — both instance types on same plot */}
      <div className="px-4 pt-4 pb-3">
        {/* Legend + live values */}
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5">
              <span className="inline-block h-[3px] w-4 rounded bg-[#35c09e]" />
              <span className="font-mono text-xs text-gray-600">
                t3.medium (2 vCPU){' '}
                <span className="font-semibold text-[#35c09e]">{currentMedium.toFixed(0)}µs</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block h-[3px] w-4 rounded bg-[#2563eb]" />
              <span className="font-mono text-xs text-gray-600">
                t3.xlarge (4 vCPU){' '}
                <span className="font-semibold text-[#2563eb]">{currentXLarge.toFixed(0)}µs</span>
              </span>
            </div>
          </div>
          <span className="font-mono text-[10px] tracking-wide text-gray-400">
            GATEWAY OVERHEAD &middot; MICROSECONDS
          </span>
        </div>

        <div className="flex">
          {/* Y-axis */}
          <div
            className="flex flex-col justify-between pr-2 font-mono text-[8px] text-gray-400"
            style={{ height: CHART_HEIGHT }}
          >
            <span>100µs</span>
            <span>75µs</span>
            <span>50µs</span>
            <span>25µs</span>
            <span>0</span>
          </div>

          {/* Chart area */}
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

              {/* 15µs target line */}
              <line
                x1="0"
                y1={CHART_HEIGHT - (15 / Y_MAX) * CHART_HEIGHT}
                x2={chartWidth}
                y2={CHART_HEIGHT - (15 / Y_MAX) * CHART_HEIGHT}
                stroke="#35c09e"
                strokeWidth="0.5"
                strokeDasharray="6 3"
                strokeOpacity="0.4"
              />
              {dataPoints.length >= 5 && (
                <text
                  x={chartWidth - 4}
                  y={CHART_HEIGHT - (15 / Y_MAX) * CHART_HEIGHT - 4}
                  textAnchor="end"
                  fill="#35c09e"
                  fontSize="8"
                  fontFamily="monospace"
                  fillOpacity="0.5"
                >
                  15µs target
                </text>
              )}

              {/* t3.medium area + line */}
              {dataPoints.length > 1 && (
                <>
                  <path
                    d={generateAreaPath((d) => d.t3Medium, Y_MAX)}
                    fill="#35c09e"
                    fillOpacity="0.08"
                  />
                  <path
                    d={generatePath((d) => d.t3Medium, Y_MAX)}
                    fill="none"
                    stroke="#35c09e"
                    strokeWidth="1.5"
                  />
                </>
              )}

              {/* t3.xlarge area + line */}
              {dataPoints.length > 1 && (
                <>
                  <path
                    d={generateAreaPath((d) => d.t3XLarge, Y_MAX)}
                    fill="#2563eb"
                    fillOpacity="0.06"
                  />
                  <path
                    d={generatePath((d) => d.t3XLarge, Y_MAX)}
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="1.5"
                  />
                </>
              )}

              {/* Current point indicators */}
              {dataPoints.length > 0 && (
                <>
                  <circle
                    cx={(dataPoints.length - 1) * pointSpacing}
                    cy={Math.max(
                      2,
                      Math.min(
                        CHART_HEIGHT - 2,
                        CHART_HEIGHT - (Math.min(currentMedium, Y_MAX) / Y_MAX) * CHART_HEIGHT
                      )
                    )}
                    r="3"
                    fill="#35c09e"
                    stroke="white"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx={(dataPoints.length - 1) * pointSpacing}
                    cy={Math.max(
                      2,
                      Math.min(
                        CHART_HEIGHT - 2,
                        CHART_HEIGHT - (Math.min(currentXLarge, Y_MAX) / Y_MAX) * CHART_HEIGHT
                      )
                    )}
                    r="3"
                    fill="#2563eb"
                    stroke="white"
                    strokeWidth="1.5"
                  />
                </>
              )}
            </svg>
          </div>
        </div>
      </div>

      {/* Instance comparison stats */}
      <div className="grid grid-cols-2 border-t border-gray-200">
        {/* t3.medium */}
        <div className="border-r border-gray-200 p-4">
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-[#35c09e]" />
            <span className="text-xs font-medium text-gray-900">t3.medium</span>
            <span className="font-mono text-[9px] text-gray-400">2 vCPU · 4GB RAM</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <div className="font-mono text-[9px] text-gray-400 uppercase">Overhead</div>
              <div className="font-mono text-sm font-semibold text-gray-900">59µs</div>
            </div>
            <div>
              <div className="font-mono text-[9px] text-gray-400 uppercase">Success</div>
              <div className="font-mono text-sm font-semibold text-gray-900">100%</div>
            </div>
            <div>
              <div className="font-mono text-[9px] text-gray-400 uppercase">Buffer</div>
              <div className="font-mono text-sm font-semibold text-gray-900">15,000</div>
            </div>
          </div>
        </div>

        {/* t3.xlarge */}
        <div className="p-4">
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-[#2563eb]" />
            <span className="text-xs font-medium text-gray-900">t3.xlarge</span>
            <span className="font-mono text-[9px] text-gray-400">4 vCPU · 16GB RAM</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <div className="font-mono text-[9px] text-gray-400 uppercase">Overhead</div>
              <div className="font-mono text-sm font-semibold text-gray-900">11µs</div>
            </div>
            <div>
              <div className="font-mono text-[9px] text-gray-400 uppercase">Success</div>
              <div className="font-mono text-sm font-semibold text-gray-900">100%</div>
            </div>
            <div>
              <div className="font-mono text-[9px] text-gray-400 uppercase">Buffer</div>
              <div className="font-mono text-sm font-semibold text-gray-900">20,000</div>
            </div>
          </div>
        </div>
      </div>

      {/* Source */}
      <div className="border-t border-gray-200 bg-gray-50 px-4 py-2">
        <p className="text-center font-mono text-[10px] leading-relaxed text-gray-400">
          Bifrost-only stress test at 5000 RPS with ~10KB response payloads. Gateway overhead
          excludes upstream response time.{' '}
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
