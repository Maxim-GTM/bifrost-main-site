'use client'

import { AnimatedVideoFeatureCard, EnhancedSection } from '../ui'

export function FeaturesSection() {
  return (
    <EnhancedSection
      className="py-20 lg:py-32"
      backgroundElements={
        <>
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-40">
            <div className="animate-float absolute top-20 right-20 h-32 w-32 rounded-full bg-green-100 blur-xl"></div>
            <div
              className="animate-float absolute bottom-20 left-20 h-48 w-48 rounded-full bg-green-50 blur-2xl"
              style={{ animationDelay: '2s' }}
            ></div>
          </div>
        </>
      }
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center lg:mb-20">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 lg:text-4xl">
            Everything you need for reliable AI
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 lg:text-xl">
            Built for developers who need their AI applications to be fast, reliable, and scalable.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <AnimatedVideoFeatureCard
            videoSrc="/lightning.mp4"
            title="Multi-Provider Support"
            description="Connect to openai, anthropic, bedrock, vertex, cohere (v1), ollama, mistral, and azure AI through a single API."
          />

          <AnimatedVideoFeatureCard
            videoSrc="/failover.mp4"
            title="Automatic Failover"
            description="Built-in failover and load balancing ensures your applications never go down."
          />

          <AnimatedVideoFeatureCard
            videoSrc="/performance.mp4"
            title="High Performance"
            description="Minimal latency overhead with connection pooling, concurrency control and optimized patterns for high throughput."
          />

          <AnimatedVideoFeatureCard
            videoSrc="/integration.mp4"
            title="Easy Integration"
            description="Drop-in replacement for existing AI SDK and frameworks with one line code changes."
          />

          <AnimatedVideoFeatureCard
            videoSrc="/monitoring.mp4"
            title="Built-in Monitoring"
            description="Prometheus metrics and comprehensive observability for your AI applications."
          />

          <AnimatedVideoFeatureCard
            videoSrc="/plugin.mp4"
            title="Plugin Architecture"
            description="Extensible plugin system with native MCP support for custom integrations."
          />
        </div>
      </div>
    </EnhancedSection>
  )
}
