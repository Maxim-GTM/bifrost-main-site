'use client'

import { useRef } from 'react'

interface MetricCard {
  title: string
  bifrostValue: string
  litellmValue: string
  bifrostLabel: string
  litellmLabel: string
  improvement: string
  improvementType: 'less' | 'faster' | 'higher'
}

const metrics: MetricCard[] = [
  {
    title: 'Memory Usage',
    bifrostValue: '120MB',
    litellmValue: '372MB',
    bifrostLabel: 'Bifrost',
    litellmLabel: 'LiteLLM',
    improvement: '68% less',
    improvementType: 'less',
  },
  {
    title: 'P99 Latency',
    bifrostValue: '1.68s',
    litellmValue: '90.72s',
    bifrostLabel: 'Bifrost',
    litellmLabel: 'LiteLLM',
    improvement: '54x faster',
    improvementType: 'faster',
  },
  {
    title: 'Throughput',
    bifrostValue: '424/s',
    litellmValue: '44.84/s',
    bifrostLabel: 'Bifrost',
    litellmLabel: 'LiteLLM',
    improvement: '9.5x higher',
    improvementType: 'higher',
  },
  {
    title: 'Success Rate',
    bifrostValue: '100%',
    litellmValue: '88.78%',
    bifrostLabel: 'Bifrost',
    litellmLabel: 'LiteLLM',
    improvement: '11.22% higher',
    improvementType: 'higher',
  },
]

export function ShufflingCards() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="mb-8 flex flex-col px-4 sm:px-6 lg:mb-16 lg:px-8">
      <div className="mx-auto mb-4 inline-flex items-center rounded-full border border-green-200 bg-green-50 px-3 py-2 font-mono text-xs font-medium text-green-700 sm:mb-6 sm:px-4 sm:text-sm">
        <span className="relative mr-2 flex h-2 w-2 sm:mr-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-600"></span>
        </span>
        Performance Comparison
      </div>
      <h2 className="mx-auto mb-2 flex flex-row items-center px-4 text-center text-xl font-bold text-black sm:mb-3 sm:text-2xl lg:text-3xl">
        <img
          src="https://bifrost.getmaxim.ai/rocket.png"
          alt="Rocket icon"
          className="mr-2 h-6 w-6 sm:mr-3 sm:h-8 sm:w-8"
        />{' '}
        50x faster than LiteLLM
      </h2>
      <p className="mb-6 px-4 text-center text-xs text-gray-600 sm:text-sm lg:mb-0">
        (P99 latency) Bifrost vs LiteLLM at 500 RPS on identical hardware <br />
        (beyond this, LiteLLM breaks with latency going up to 4 minutes)
      </p>
      <div className="mt-6 flex w-full items-center justify-center lg:mt-8 lg:p-8">
        <div ref={containerRef}>
          {/* Marquee strip */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-4">
            {metrics.map((metric, index) => (
              <div
                key={`${metric.title}-${index}`}
                className="h-full w-full min-w-[300px] flex-shrink-0 md:w-[calc(50%-12px)] lg:w-80"
              >
                <div className="h-full rounded-sm border-1 border-gray-200 bg-white px-3 pt-4 pb-2 hover:border-teal-200 sm:rounded-sm sm:px-4 sm:pt-5 sm:pb-3 lg:px-6 lg:pt-6">
                  <h3 className="mb-4 text-center text-sm font-semibold text-gray-900 sm:mb-5 sm:text-base lg:mb-6 lg:text-lg">
                    {metric.title}
                  </h3>

                  <div className="mb-3 flex items-center justify-between sm:mb-4">
                    <div className="text-center">
                      <div className="mb-1 text-xs font-medium text-teal-600 sm:text-sm">
                        {metric.bifrostLabel}
                      </div>
                      <div className="text-lg font-bold text-teal-700 sm:text-xl lg:text-2xl">
                        {metric.bifrostValue}
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="mb-1 text-xs font-medium text-gray-500 sm:text-sm">
                        {metric.litellmLabel}
                      </div>
                      <div className="text-lg font-bold text-gray-700 sm:text-xl lg:text-2xl">
                        {metric.litellmValue}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-md bg-teal-50 p-2 text-center sm:rounded-lg sm:p-3">
                    <div className="text-xs font-medium text-teal-700 sm:text-sm">
                      {metric.improvement}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
