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
            <div className="absolute top-20 right-20 w-32 h-32 bg-green-100 rounded-full blur-xl animate-float"></div>
            <div className="absolute bottom-20 left-20 w-48 h-48 bg-green-50 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
          </div>
        </>
      }
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Everything you need for reliable AI
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            Built for developers who need their AI applications to be fast, reliable, and scalable.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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