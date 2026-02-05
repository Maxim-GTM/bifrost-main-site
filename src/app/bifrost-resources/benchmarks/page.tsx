import { Zap, Server, Cpu, HardDrive, Clock, CheckCircle2, ExternalLink } from 'lucide-react';
import BenchmarkLive from '@/components/resources/BenchmarkLive';
import BenchmarkMetrics from '@/components/resources/BenchmarkMetrics';
import DropInReplacement from '@/components/resources/DropInReplacement';
import FeatureMatrix from '@/components/resources/FeatureMatrix';
import PrimaryButton from '@/components/ui/PrimaryButton';
import {
    primaryMetrics,
    overheadMetrics,
    highlights,
    testEnvironment,
    comparisonTable
} from '@/lib/benchmark-data';

export const metadata = {
    title: 'Bifrost vs LiteLLM Benchmarks | 40x Faster LLM Gateway',
    description: 'See how Bifrost outperforms LiteLLM with 9.5x faster throughput, 54x lower P99 latency, and 68% less memory usage. Live benchmark comparison.',
};

export default function BenchmarksPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    <div className="text-center">
                        <span className="provider-badge">
                           [ PERFORMANCE BENCHMARKS ]
                        </span>
                        <h1 className="text-4xl md:text-5xl font-normal text-gray-900 mb-4 leading-[1.2] tracking-tight text-center">
                            Bifrost vs LiteLLM
                        </h1>
                        <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed mb-8">
                            Enterprise-grade performance comparison. Built in Go for maximum throughput
                            and minimal latency. See the numbers that matter.
                        </p>

                        {/* Quick Stats */}
                        <div className="flex justify-center">
                            <div className="border-t border-b border-gray-200 w-full max-w-4xl">
                                <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                                    {highlights.map((item, index) => (
                                        <div key={index} className="text-center py-5 px-4">
                                            <div className="text-2xl md:text-3xl text-[var(--accent-text)] mb-1 leading-none font-mono font-semibold">
                                                {item.metric}
                                            </div>
                                            <div className="text-xs text-gray-500 uppercase tracking-wider font-medium font-mono mb-1">
                                                {item.label}
                                            </div>
                                            <div className="text-xs text-gray-400">
                                                {item.description}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Live Benchmark Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="text-center mb-6">
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-mono">
                        [ LIVE SIMULATION ]
                    </p>
                </div>
                <BenchmarkLive />
                <p className="text-xs text-gray-400 text-center mt-3 font-mono">
                    Simulated data based on actual benchmark results. Adjust load intensity to see performance under stress.
                </p>
            </div>

            {/* Test Environment */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="border border-gray-200 bg-white p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Server className="w-4 h-4 text-[var(--accent-text)]" />
                        <h3 className="text-sm text-gray-900 uppercase tracking-wider">
                            Test Environment
                        </h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                        <div>
                            <div className="text-xs text-gray-400 font-mono uppercase">Instance</div>
                            <div className="text-sm font-medium text-gray-900">{testEnvironment.instance}</div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-400 font-mono uppercase">CPU</div>
                            <div className="text-sm font-medium text-gray-900">{testEnvironment.cpu}</div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-400 font-mono uppercase">Memory</div>
                            <div className="text-sm font-medium text-gray-900">{testEnvironment.memory}</div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-400 font-mono uppercase">Provider</div>
                            <div className="text-sm font-medium text-gray-900">{testEnvironment.provider}</div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-400 font-mono uppercase">Region</div>
                            <div className="text-sm font-medium text-gray-900">{testEnvironment.region}</div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-400 font-mono uppercase">OpenAI Tier</div>
                            <div className="text-sm font-medium text-gray-900">{testEnvironment.openaiTier}</div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-400 font-mono uppercase">Duration</div>
                            <div className="text-sm font-medium text-gray-900">{testEnvironment.testDuration}</div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-400 font-mono uppercase">Concurrent</div>
                            <div className="text-sm font-medium text-gray-900">{testEnvironment.concurrentUsers} VUs</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Metrics */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="text-center mb-6">
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-mono">
                        [ DETAILED METRICS ]
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="text-center mb-6">
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-mono">
                        [ HIGH-THROUGHPUT STRESS TEST ]
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* t3.medium */}
                    <div className="border border-gray-200 bg-white p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 flex items-center justify-center bg-[var(--accent)]/10 text-[var(--accent-text)]">
                                <Cpu className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-sm text-gray-900">t3.medium</h4>
                                <p className="text-xs text-gray-500">2 vCPU, 4GB RAM</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="border-l-2 border-[var(--accent)] pl-3">
                                <div className="text-2xl font-bold text-gray-900">59µs</div>
                                <div className="text-xs text-gray-500 font-mono uppercase">Gateway Overhead</div>
                            </div>
                            <div className="border-l-2 border-[var(--accent)] pl-3">
                                <div className="text-2xl font-bold text-gray-900">100%</div>
                                <div className="text-xs text-gray-500 font-mono uppercase">Success Rate</div>
                            </div>
                        </div>
                    </div>

                    {/* t3.xlarge */}
                    <div className="border border-gray-200 bg-white p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 flex items-center justify-center bg-[var(--accent)]/10 text-[var(--accent-text)]">
                                <Cpu className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-sm text-gray-900">t3.xlarge</h4>
                                <p className="text-xs text-gray-500">4 vCPU, 16GB RAM</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="border-l-2 border-[var(--accent)] pl-3">
                                <div className="text-2xl font-bold text-gray-900">11µs</div>
                                <div className="text-xs text-gray-500 font-mono uppercase">Gateway Overhead</div>
                            </div>
                            <div className="border-l-2 border-[var(--accent)] pl-3">
                                <div className="text-2xl font-bold text-gray-900">100%</div>
                                <div className="text-xs text-gray-500 font-mono uppercase">Success Rate</div>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="text-xs text-gray-400 text-center mt-4 font-mono">
                    Tested at 5000 RPS with production-level stress
                </p>
            </div>

            {/* Architecture Comparison */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="text-center mb-6">
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-mono">
                        [ WHY BIFROST IS FASTER ]
                    </p>
                </div>
                <div className="border border-gray-200 bg-white overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200 bg-gray-50">
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Feature
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-[var(--accent-text)] uppercase tracking-wider">
                                    Bifrost
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    LiteLLM
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {comparisonTable.map((row, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-3 text-sm text-gray-600">
                                        {row.feature}
                                    </td>
                                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                        <span className="inline-flex items-center gap-1.5">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-text)]" />
                                            {row.bifrost}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-500">
                                        {row.litellm}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Key Insights */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="border border-gray-200 bg-white p-6">
                        <div className="w-10 h-10 flex items-center justify-center bg-[var(--accent)]/10 text-[var(--accent-text)] mb-4">
                            <Zap className="w-5 h-5" />
                        </div>
                        <h4 className="text-sm text-gray-900 mb-2">Optimized Architecture</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            Bifrost&apos;s Go implementation uses efficient parsing and memory-optimized data structures,
                            minimizing allocations and leveraging Go&apos;s highly efficient garbage collector.
                        </p>
                    </div>
                    <div className="border border-gray-200 bg-white p-6">
                        <div className="w-10 h-10 flex items-center justify-center bg-[var(--accent)]/10 text-[var(--accent-text)] mb-4">
                            <Clock className="w-5 h-5" />
                        </div>
                        <h4 className="text-sm text-gray-900 mb-2">Native Concurrency</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            Built with Go&apos;s goroutines, Bifrost handles thousands of concurrent connections efficiently without
                            the Python GIL bottleneck that limits LiteLLM&apos;s parallelism.
                        </p>
                    </div>
                    <div className="border border-gray-200 bg-white p-6">
                        <div className="w-10 h-10 flex items-center justify-center bg-[var(--accent)]/10 text-[var(--accent-text)] mb-4">
                            <HardDrive className="w-5 h-5" />
                        </div>
                        <h4 className="text-sm text-gray-900 mb-2">Efficient Memory Model</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            With Go&apos;s low-latency garbage collector and efficient memory management, Bifrost maintains
                            consistent performance under load while using 68% less memory.
                        </p>
                    </div>
                </div>
            </div>

            {/* Feature Matrix Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="text-center mb-6">
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-mono">
                        [ BIFROST FEATURES ]
                    </p>
                </div>
                <FeatureMatrix />
            </div>

            {/* Drop-in Replacement Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="text-center mb-6">
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-medium font-mono">
                        [ EASY MIGRATION ]
                    </p>
                </div>
                <DropInReplacement />
            </div>

            {/* Blog Link */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="border border-gray-200 bg-gray-50 p-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                                <h4 className="text-sm text-gray-900 mb-1">
                                Read the Full Benchmark Analysis
                            </h4>
                            <p className="text-xs text-gray-500">
                                Detailed methodology, test configurations, and in-depth performance analysis.
                            </p>
                        </div>
                        <PrimaryButton
                            href="https://www.getmaxim.ai/blog/bifrost-a-drop-in-llm-proxy-40x-faster-than-litellm/"
                            external
                            className="px-4 py-2 text-xs"
                        >
                            Read Full Article
                            <ExternalLink className="w-3.5 h-3.5" />
                        </PrimaryButton>
                    </div>
                </div>
            </div>

        </div>
    );
}
