import { Zap, Server, Cpu, HardDrive, Clock, CheckCircle2, ExternalLink } from 'lucide-react'
import BenchmarkLive from '@/components/resources/BenchmarkLive'
import BenchmarkMetrics from '@/components/resources/BenchmarkMetrics'
import DropInReplacement from '@/components/resources/DropInReplacement'
import FeatureMatrix from '@/components/resources/FeatureMatrix'
import {
  primaryMetrics,
  overheadMetrics,
  highlights,
  testEnvironment,
  comparisonTable,
} from '@/lib/benchmark-data'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export const metadata = {
  title: 'Bifrost vs LiteLLM Benchmarks | 40x Faster LLM Gateway',
  description:
    'See how Bifrost outperforms LiteLLM with 9.5x faster throughput, 54x lower P99 latency, and 68% less memory usage. Live benchmark comparison.',
}

export default function BenchmarksPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="text-center">
            <span className="provider-badge">[ PERFORMANCE BENCHMARKS ]</span>
            <h1 className="mb-4 text-center text-4xl leading-[1.2] font-normal tracking-tight text-gray-900 md:text-5xl">
              Bifrost vs LiteLLM
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-gray-500 md:text-base">
              Enterprise-grade performance comparison. Built in Go for maximum throughput and
              minimal latency. See the numbers that matter.
            </p>

            {/* Quick Stats */}
            <div className="flex justify-center">
              <div className="w-full max-w-4xl border-t border-b border-gray-200">
                <div className="grid grid-cols-2 divide-y divide-gray-200 md:grid-cols-4 md:divide-x md:divide-y-0">
                  {highlights.map((item, index) => (
                    <div key={index} className="px-4 py-5 text-center">
                      <div className="mb-1 font-mono text-2xl leading-none font-semibold text-[var(--accent-text)] md:text-3xl">
                        {item.metric}
                      </div>
                      <div className="mb-1 font-mono text-xs font-medium tracking-wider text-gray-500 uppercase">
                        {item.label}
                      </div>
                      <div className="text-xs text-gray-400">{item.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Benchmark Section */}
      <div className="mx-auto mb-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-center">
          <p className="font-mono text-xs tracking-widest text-gray-400 uppercase">
            [ LIVE SIMULATION ]
          </p>
        </div>
        <BenchmarkLive />
        <p className="mt-3 text-center font-mono text-xs text-gray-400">
          Simulated data based on actual benchmark results. Adjust load intensity to see performance
          under stress.
        </p>
      </div>

      {/* Test Environment */}
      <div className="mx-auto mb-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border border-gray-200 bg-white p-6">
          <div className="mb-4 flex items-center gap-2">
            <Server className="h-4 w-4 text-[var(--accent-text)]" />
            <h3 className="text-sm tracking-wider text-gray-900 uppercase">Test Environment</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
            <div>
              <div className="font-mono text-xs text-gray-400 uppercase">Instance</div>
              <div className="text-sm font-medium text-gray-900">{testEnvironment.instance}</div>
            </div>
            <div>
              <div className="font-mono text-xs text-gray-400 uppercase">CPU</div>
              <div className="text-sm font-medium text-gray-900">{testEnvironment.cpu}</div>
            </div>
            <div>
              <div className="font-mono text-xs text-gray-400 uppercase">Memory</div>
              <div className="text-sm font-medium text-gray-900">{testEnvironment.memory}</div>
            </div>
            <div>
              <div className="font-mono text-xs text-gray-400 uppercase">Provider</div>
              <div className="text-sm font-medium text-gray-900">{testEnvironment.provider}</div>
            </div>
            <div>
              <div className="font-mono text-xs text-gray-400 uppercase">Region</div>
              <div className="text-sm font-medium text-gray-900">{testEnvironment.region}</div>
            </div>
            <div>
              <div className="font-mono text-xs text-gray-400 uppercase">OpenAI Tier</div>
              <div className="text-sm font-medium text-gray-900">{testEnvironment.openaiTier}</div>
            </div>
            <div>
              <div className="font-mono text-xs text-gray-400 uppercase">Duration</div>
              <div className="text-sm font-medium text-gray-900">
                {testEnvironment.testDuration}
              </div>
            </div>
            <div>
              <div className="font-mono text-xs text-gray-400 uppercase">Concurrent</div>
              <div className="text-sm font-medium text-gray-900">
                {testEnvironment.concurrentUsers} VUs
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="mx-auto mb-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-center">
          <p className="font-mono text-xs tracking-widest text-gray-400 uppercase">
            [ DETAILED METRICS ]
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <BenchmarkMetrics
            metrics={primaryMetrics}
            title="500 RPS Load Test"
            description="Primary performance metrics under sustained load"
          />
          <BenchmarkMetrics
            metrics={overheadMetrics}
            title="Gateway Overhead"
            description="Internal latency overhead (60ms mock OpenAI response)"
          />
        </div>
      </div>

      {/* Stress Test Results */}
      <div className="mx-auto mb-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-center">
          <p className="font-mono text-xs tracking-widest text-gray-400 uppercase">
            [ HIGH-THROUGHPUT STRESS TEST ]
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* t3.medium */}
          <div className="border border-gray-200 bg-white p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center bg-[var(--accent)]/10 text-[var(--accent-text)]">
                <Cpu className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm text-gray-900">t3.medium</h4>
                <p className="text-xs text-gray-500">2 vCPU, 4GB RAM</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="border-l-2 border-[var(--accent)] pl-3">
                <div className="text-2xl font-bold text-gray-900">59µs</div>
                <div className="font-mono text-xs text-gray-500 uppercase">Gateway Overhead</div>
              </div>
              <div className="border-l-2 border-[var(--accent)] pl-3">
                <div className="text-2xl font-bold text-gray-900">100%</div>
                <div className="font-mono text-xs text-gray-500 uppercase">Success Rate</div>
              </div>
            </div>
          </div>

          {/* t3.xlarge */}
          <div className="border border-gray-200 bg-white p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center bg-[var(--accent)]/10 text-[var(--accent-text)]">
                <Cpu className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm text-gray-900">t3.xlarge</h4>
                <p className="text-xs text-gray-500">4 vCPU, 16GB RAM</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="border-l-2 border-[var(--accent)] pl-3">
                <div className="text-2xl font-bold text-gray-900">11µs</div>
                <div className="font-mono text-xs text-gray-500 uppercase">Gateway Overhead</div>
              </div>
              <div className="border-l-2 border-[var(--accent)] pl-3">
                <div className="text-2xl font-bold text-gray-900">100%</div>
                <div className="font-mono text-xs text-gray-500 uppercase">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-4 text-center font-mono text-xs text-gray-400">
          Tested at 5000 RPS with production-level stress
        </p>
      </div>

      {/* Architecture Comparison */}
      <div className="mx-auto mb-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-center">
          <p className="font-mono text-xs tracking-widest text-gray-400 uppercase">
            [ WHY BIFROST IS FASTER ]
          </p>
        </div>
        <div className="overflow-hidden border border-gray-200 bg-white">
          <table className="w-full table-fixed">
            <colgroup>
              <col className="w-[20%]" />
              <col className="w-[30%]" />
              <col className="w-[30%]" />
            </colgroup>
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Feature
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-[var(--accent-text)] uppercase">
                  Bifrost
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  LiteLLM
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {comparisonTable.map((row, index) => (
                <tr key={index} className="transition-colors hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-600">{row.feature}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="inline-flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[var(--accent-text)]" />
                      </span>
                      <span>{row.bifrost}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{row.litellm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Insights */}
      <div className="mx-auto mb-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="border border-gray-200 bg-white p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center bg-[var(--accent)]/10 text-[var(--accent-text)]">
              <Zap className="h-5 w-5" />
            </div>
            <h4 className="mb-2 text-sm text-gray-900">Optimized Architecture</h4>
            <p className="text-xs leading-relaxed text-gray-500">
              Bifrost&apos;s Go implementation uses efficient parsing and memory-optimized data
              structures, minimizing allocations and leveraging Go&apos;s highly efficient garbage
              collector.
            </p>
          </div>
          <div className="border border-gray-200 bg-white p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center bg-[var(--accent)]/10 text-[var(--accent-text)]">
              <Clock className="h-5 w-5" />
            </div>
            <h4 className="mb-2 text-sm text-gray-900">Native Concurrency</h4>
            <p className="text-xs leading-relaxed text-gray-500">
              Built with Go&apos;s goroutines, Bifrost handles thousands of concurrent connections
              efficiently without the Python GIL bottleneck that limits LiteLLM&apos;s parallelism.
            </p>
          </div>
          <div className="border border-gray-200 bg-white p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center bg-[var(--accent)]/10 text-[var(--accent-text)]">
              <HardDrive className="h-5 w-5" />
            </div>
            <h4 className="mb-2 text-sm text-gray-900">Efficient Memory Model</h4>
            <p className="text-xs leading-relaxed text-gray-500">
              With Go&apos;s low-latency garbage collector and efficient memory management, Bifrost
              maintains consistent performance under load while using 68% less memory.
            </p>
          </div>
        </div>
      </div>

      {/* Feature Matrix Section */}
      <div className="mx-auto mb-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-center">
          <p className="font-mono text-xs tracking-widest text-gray-400 uppercase">
            [ BIFROST FEATURES ]
          </p>
        </div>
        <FeatureMatrix />
      </div>

      {/* Drop-in Replacement Section */}
      <div className="mx-auto mb-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-center">
          <p className="font-mono text-xs font-medium tracking-widest text-gray-400 uppercase">
            [ EASY MIGRATION ]
          </p>
        </div>
        <DropInReplacement />
      </div>

      {/* Blog Link */}
      <div className="mx-auto mb-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border border-gray-200 bg-gray-50 p-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <h4 className="mb-1 text-sm text-gray-900">Read the Full Benchmark Analysis</h4>
              <p className="text-xs text-gray-500">
                Detailed methodology, test configurations, and in-depth performance analysis.
              </p>
            </div>

            <Link
              href="https://www.getmaxim.ai/blog/bifrost-a-drop-in-llm-proxy-40x-faster-than-litellm/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-xs"
            >
              <Button>
                Read Full Article
                <ExternalLink className="size-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
