// Benchmark data comparing Bifrost vs LiteLLM
// Source: https://www.getmaxim.ai/blog/bifrost-a-drop-in-llm-proxy-40x-faster-than-litellm/

export interface BenchmarkMetric {
  name: string
  bifrost: number
  litellm: number
  unit: string
  lowerIsBetter: boolean
  description?: string
}

export interface LatencyDataPoint {
  timestamp: number
  bifrost: number
  litellm: number
}

export interface ThroughputDataPoint {
  timestamp: number
  bifrostRps: number
  litellmRps: number
  bifrostSuccess: number
  litellmSuccess: number
}

// Primary performance metrics at 500 RPS load test
export const primaryMetrics: BenchmarkMetric[] = [
  {
    name: 'Success Rate',
    bifrost: 100,
    litellm: 88.78,
    unit: '%',
    lowerIsBetter: false,
    description: 'Percentage of requests completed successfully',
  },
  {
    name: 'P50 Latency',
    bifrost: 804,
    litellm: 38650,
    unit: 'ms',
    lowerIsBetter: true,
    description: 'Median response time',
  },
  {
    name: 'P99 Latency',
    bifrost: 1680,
    litellm: 90720,
    unit: 'ms',
    lowerIsBetter: true,
    description: '99th percentile response time',
  },
  {
    name: 'Max Latency',
    bifrost: 6130,
    litellm: 92670,
    unit: 'ms',
    lowerIsBetter: true,
    description: 'Maximum observed response time',
  },
  {
    name: 'Throughput',
    bifrost: 424,
    litellm: 44.84,
    unit: 'req/s',
    lowerIsBetter: false,
    description: 'Requests processed per second',
  },
  {
    name: 'Peak Memory',
    bifrost: 120,
    litellm: 372,
    unit: 'MB',
    lowerIsBetter: true,
    description: 'Maximum memory consumption',
  },
]

// Internal latency overhead comparison
export const overheadMetrics: BenchmarkMetric[] = [
  {
    name: 'Median Latency',
    bifrost: 60.99,
    litellm: 100,
    unit: 'ms',
    lowerIsBetter: true,
    description: 'Median end-to-end latency',
  },
  {
    name: 'Gateway Overhead',
    bifrost: 0.99,
    litellm: 40,
    unit: 'ms',
    lowerIsBetter: true,
    description: 'Internal processing time (excluding 60ms mock OpenAI call)',
  },
  {
    name: 'RPS Capacity',
    bifrost: 500,
    litellm: 475,
    unit: 'req/s',
    lowerIsBetter: false,
    description: 'Maximum sustainable requests per second',
  },
]

// High-throughput stress test metrics
export const stressTestMetrics = {
  t3Medium: {
    overhead: 59,
    unit: 'µs',
    successRate: 100,
  },
  t3XLarge: {
    overhead: 11,
    unit: 'µs',
    successRate: 100,
  },
}

// Key comparison highlights
export const highlights = [
  { metric: '9.5x', label: 'Faster Throughput', description: 'More requests processed per second' },
  { metric: '54x', label: 'Lower P99 Latency', description: 'Consistently fast response times' },
  { metric: '68%', label: 'Less Memory', description: 'More efficient resource usage' },
  { metric: '40x', label: 'Less Overhead', description: 'Minimal gateway processing time' },
]

// Test environment details
export const testEnvironment = {
  instance: 't3.medium',
  cpu: '2 vCPU',
  memory: '4GB RAM',
  provider: 'AWS EC2',
  region: 'us-east-1',
  openaiTier: 'Tier 5',
  testDuration: '60 seconds',
  concurrentUsers: 500,
}

// Generate simulated live data points
export function generateLiveLatencyData(count: number = 60): LatencyDataPoint[] {
  const data: LatencyDataPoint[] = []
  const now = Date.now()

  for (let i = 0; i < count; i++) {
    const bifrostBase = 800 + Math.random() * 200
    const litellmBase = 35000 + Math.random() * 10000

    data.push({
      timestamp: now - (count - i) * 1000,
      bifrost: Math.round(bifrostBase),
      litellm: Math.round(litellmBase),
    })
  }

  return data
}

export function generateLiveThroughputData(count: number = 60): ThroughputDataPoint[] {
  const data: ThroughputDataPoint[] = []
  const now = Date.now()

  for (let i = 0; i < count; i++) {
    data.push({
      timestamp: now - (count - i) * 1000,
      bifrostRps: 400 + Math.round(Math.random() * 50),
      litellmRps: 40 + Math.round(Math.random() * 10),
      bifrostSuccess: 100,
      litellmSuccess: 85 + Math.round(Math.random() * 8),
    })
  }

  return data
}

// Comparison table data
export const comparisonTable = [
  { feature: 'Language', bifrost: 'Go', litellm: 'Python' },
  { feature: 'Async Runtime', bifrost: 'Goroutines', litellm: 'asyncio' },
  { feature: 'HTTP Server', bifrost: 'Fast http', litellm: 'FastAPI/Uvicorn' },
  { feature: 'Memory Model', bifrost: 'Efficient GC', litellm: 'GC-managed' },
  { feature: 'Concurrency', bifrost: 'Native goroutines', litellm: 'GIL-limited' },
  { feature: 'Binary Size', bifrost: '~80MB', litellm: '~500MB+ (with deps)' },
  { feature: 'Open Source', bifrost: 'Yes (Apache 2.0)', litellm: 'Yes (MIT)' },
]
