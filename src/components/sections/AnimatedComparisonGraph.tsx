'use client'

import { useEffect, useRef, useState } from 'react'

export function AnimatedComparisonGraph() {
  const [currentView, setCurrentView] = useState<'overview' | 'detailed'>('overview')
  const [selectedMetric, setSelectedMetric] = useState(0)
  const [animationPhase, setAnimationPhase] = useState<
    'idle' | 'loading' | 'revealing' | 'complete'
  >('idle')
  const [visibleMetrics, setVisibleMetrics] = useState<number[]>([])
  const [isClient, setIsClient] = useState(false)
  const observerRef = useRef<HTMLDivElement>(null)

  const metrics = [
    {
      name: 'Memory Usage',
      description: 'RAM consumption under load',
      unit: 'MB',
      bifrost: { value: 120, label: '120MB' },
      litellm: { value: 372, label: '372MB' },
      improvement: '68% less',
      icon: '🧠',
      isLowerBetter: true,
      context: 'Critical for scaling and cost optimization',
    },
    {
      name: 'Success Rate',
      description: 'Requests completed successfully',
      unit: '%',
      bifrost: { value: 100, label: '100%' },
      litellm: { value: 88.78, label: '88.78%' },
      improvement: '11.22% higher',
      icon: '✅',
      isLowerBetter: false,
      context: 'Essential for production reliability',
    },
    {
      name: 'P99 Latency',
      description: '99th percentile response time',
      unit: 's',
      bifrost: { value: 1.68, label: '1.68s' },
      litellm: { value: 90.72, label: '90.72s' },
      improvement: '54x faster',
      icon: '⚡',
      isLowerBetter: true,
      context: 'User experience under peak load',
    },
    {
      name: 'Throughput',
      description: 'Requests processed per second',
      unit: '/s',
      bifrost: { value: 424, label: '424/s' },
      litellm: { value: 44.84, label: '44.84/s' },
      improvement: '9.5x higher',
      icon: '🚀',
      isLowerBetter: false,
      context: 'Revenue-generating capacity',
    },
    {
      name: 'P50 Latency',
      description: 'Median response time',
      unit: 'ms',
      bifrost: { value: 804, label: '804ms' },
      litellm: { value: 38650, label: '38.65s' },
      improvement: '48x faster',
      icon: '⚡',
      isLowerBetter: true,
      context: 'Typical user experience',
    },
    {
      name: 'Max Latency',
      description: 'Worst-case response time',
      unit: 's',
      bifrost: { value: 6.13, label: '6.13s' },
      litellm: { value: 92.67, label: '92.67s' },
      improvement: '15x faster',
      icon: '🔥',
      isLowerBetter: true,
      context: 'Peak stress handling',
    },
  ]

  const overviewMetrics = [
    {
      label: 'Memory Usage',
      bifrost: '120MB',
      litellm: '372MB',
      improvement: '68% less',
      color: 'bg-blue-500',
    },
    {
      label: 'P99 Latency',
      bifrost: '1.68s',
      litellm: '90.72s',
      improvement: '54x faster',
      color: 'bg-purple-500',
    },
    {
      label: 'Throughput',
      bifrost: '424/s',
      litellm: '44.84/s',
      improvement: '9.5x higher',
      color: 'bg-green-500',
    },
    {
      label: 'Success Rate',
      bifrost: '100%',
      litellm: '88.78%',
      improvement: '11.22% higher',
      color: 'bg-orange-500',
    },
  ]

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startAnimation()
        }
      },
      { threshold: 0.3 }
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => observer.disconnect()
  }, [isClient])

  const startAnimation = () => {
    if (animationPhase !== 'idle') return

    setAnimationPhase('loading')

    setTimeout(() => {
      setAnimationPhase('revealing')

      // Reveal metrics one by one
      overviewMetrics.forEach((_, index) => {
        setTimeout(() => {
          setVisibleMetrics((prev) => [...prev, index])
        }, index * 200)
      })

      setTimeout(
        () => {
          setAnimationPhase('complete')
        },
        overviewMetrics.length * 200 + 1000
      )
    }, 500)
  }

  const handleMetricClick = (index: number) => {
    setSelectedMetric(index)
    setCurrentView('detailed')
  }

  const getBarHeight = (value: number, maxValue: number) => {
    return Math.max((value / maxValue) * 100, 5) // Minimum 5% height for visibility
  }

  const currentMetric = metrics[selectedMetric]
  const maxValue = Math.max(currentMetric.bifrost.value, currentMetric.litellm.value)

  if (!isClient) {
    return <div className="h-96 animate-pulse rounded-xl bg-gray-100" />
  }

  return (
    <div ref={observerRef} className="mb-16">
      {/* Tab Navigation */}
      <div className="mb-8 flex justify-center">
        <div className="inline-flex rounded-lg bg-gray-100 p-1">
          <button
            onClick={() => setCurrentView('overview')}
            className={`rounded-md px-6 py-2 text-sm font-medium transition-all duration-200 ${
              currentView === 'overview'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Performance Overview
          </button>
          <button
            onClick={() => setCurrentView('detailed')}
            className={`rounded-md px-6 py-2 text-sm font-medium transition-all duration-200 ${
              currentView === 'detailed'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Detailed Analysis
          </button>
        </div>
      </div>

      {currentView === 'overview' ? (
        /* Overview View */
        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-8 shadow-lg">
          <div className="mb-8 text-center">
            <h3 className="mb-2 text-3xl font-bold text-gray-900">Performance at a Glance</h3>
            <p className="text-gray-600">Bifrost vs LiteLLM at 500 RPS on identical hardware</p>
          </div>

          {/* Loading Animation */}
          {animationPhase === 'loading' && (
            <div className="py-12 text-center">
              <div className="text-accent inline-flex items-center space-x-2">
                <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-green-600"></div>
                <span className="text-lg font-medium">Running benchmark...</span>
              </div>
            </div>
          )}

          {/* Metrics Grid */}
          {animationPhase !== 'loading' && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {overviewMetrics.map((metric, index) => (
                <div
                  key={metric.label}
                  onClick={() => handleMetricClick(index)}
                  className={`cursor-pointer rounded-xl border-2 bg-white p-6 transition-all duration-500 hover:scale-105 hover:shadow-lg ${
                    visibleMetrics.includes(index)
                      ? 'translate-y-0 border-green-200 opacity-100'
                      : 'translate-y-4 border-gray-200 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="text-center">
                    <div className={`h-3 w-3 ${metric.color} mx-auto mb-3 rounded-full`}></div>
                    <h4 className="mb-4 text-sm font-semibold text-gray-900">{metric.label}</h4>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Bifrost</span>
                        <span className="text-accent text-lg font-bold">{metric.bifrost}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">LiteLLM</span>
                        <span className="text-lg font-bold text-gray-700">{metric.litellm}</span>
                      </div>

                      <div className="border-t border-gray-100 pt-2">
                        <div className="text-accent rounded bg-green-50 px-2 py-1 text-xs font-medium">
                          {metric.improvement}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Call to Action */}
          {animationPhase === 'complete' && (
            <div className="mt-8 animate-[fadeIn_0.5s_ease-out_1s_forwards] text-center opacity-0">
              <p className="mb-4 text-gray-600">Click any metric for detailed analysis</p>
              <div className="text-accent inline-flex items-center space-x-2 text-sm font-medium">
                <span>Benchmark methodology</span>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Detailed View */
        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-lg">
          <div className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{currentMetric.icon}</span>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{currentMetric.name}</h3>
                  <p className="text-gray-600">{currentMetric.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="mb-1 text-sm text-gray-500">Improvement</div>
                <div className="text-accent text-2xl font-bold">{currentMetric.improvement}</div>
              </div>
            </div>
            <div className="rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-500">
              {currentMetric.context}
            </div>
          </div>

          {/* Detailed Comparison Chart */}
          <div className="mb-8">
            <div className="flex h-64 items-end space-x-8">
              {/* Bifrost Bar */}
              <div className="flex flex-1 flex-col items-center">
                <div className="relative mb-4 w-full overflow-hidden rounded-lg bg-gray-100">
                  <div
                    className="flex items-end justify-center rounded-lg bg-gradient-to-t from-green-600 to-green-400 font-bold text-white transition-all duration-2000 ease-out"
                    style={{
                      height: `${getBarHeight(currentMetric.bifrost.value, maxValue)}%`,
                      minHeight: '40px',
                    }}
                  >
                    <span className="p-2">{currentMetric.bifrost.label}</span>
                  </div>
                  <div className="absolute top-2 left-2">
                    <div className="h-3 w-3 animate-pulse rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-accent text-lg font-bold">Bifrost</div>
                  <div className="text-sm text-gray-500">
                    {currentMetric.isLowerBetter ? 'Lower is better' : 'Higher is better'}
                  </div>
                </div>
              </div>

              {/* LiteLLM Bar */}
              <div className="flex flex-1 flex-col items-center">
                <div className="relative mb-4 w-full overflow-hidden rounded-lg bg-gray-100">
                  <div
                    className="flex items-end justify-center rounded-lg bg-gradient-to-t from-gray-700 to-gray-500 font-bold text-white transition-all delay-500 duration-2000 ease-out"
                    style={{
                      height: `${getBarHeight(currentMetric.litellm.value, maxValue)}%`,
                      minHeight: '40px',
                    }}
                  >
                    <span className="p-2">{currentMetric.litellm.label}</span>
                  </div>
                  <div className="absolute top-2 left-2">
                    <div className="h-3 w-3 animate-pulse rounded-full bg-red-500"></div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-700">LiteLLM</div>
                  <div className="text-sm text-gray-500">Baseline</div>
                </div>
              </div>
            </div>
          </div>

          {/* Metric Selector */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {metrics.map((metric, index) => (
              <button
                key={metric.name}
                onClick={() => setSelectedMetric(index)}
                className={`rounded-lg border p-3 text-left transition-all duration-200 ${
                  index === selectedMetric
                    ? 'border-green-500 bg-green-50 shadow-md'
                    : 'hover:bg-green-25 border-gray-200 hover:border-green-300'
                }`}
              >
                <div className="mb-1 flex items-center space-x-2">
                  <span>{metric.icon}</span>
                  <span className="text-sm font-medium text-gray-900">{metric.name}</span>
                </div>
                <div className="text-accent text-xs font-medium">{metric.improvement}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
