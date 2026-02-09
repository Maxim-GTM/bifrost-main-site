'use client'

import { useState } from 'react'
import { Code2, Building2 } from 'lucide-react'
import dynamic from 'next/dynamic'

interface Feature {
  number: string
  title: string
  description: string
  illustration: () => React.ReactNode
}

const RiveIllustration = dynamic(() => import('@/components/RiveIllustration'), { ssr: false })

// Scale factor to make Rive illustration lines appear thicker
const RIVE_SCALE = 1.08

// Keep enterprise illustrations in the same teal treatment as OSS
const ENTERPRISE_FILTER = 'none'

// Rive Illustrations for Enterprise Features
function EnterpriseRive(src: string) {
  const Illustration = () => (
    <div className="flex h-full w-full items-center justify-center overflow-hidden">
      <RiveIllustration
        src={src}
        className="h-full w-full"
        style={{
          transform: `scale(${RIVE_SCALE})`,
          filter: ENTERPRISE_FILTER,
        }}
      />
    </div>
  )
  Illustration.displayName = `EnterpriseRive(${src})`
  return Illustration
}

function OssAsset(url: string) {
  const Illustration = () => {
    if (url.toLowerCase().endsWith('.mp4')) {
      return (
        <video
          className="h-full w-full object-contain"
          src={url}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      )
    }

    return (
      <div className="flex h-full w-full items-center justify-center overflow-hidden">
        <RiveIllustration
          src={url}
          className="h-full w-full"
          style={{ transform: `scale(${RIVE_SCALE})` }}
        />
      </div>
    )
  }

  Illustration.displayName = `OssAsset(${url})`
  return Illustration
}

const ossFeatures: Feature[] = [
  {
    number: '01',
    title: 'Model Catalog',
    description:
      'Access 8+ providers and 1000+ AI models from multiple providers through a unified interface. Also support custom deployed models!',
    illustration: OssAsset('/rive/Es3z2R0xHt1d0u452ud4kaQzg.riv'),
  },
  {
    number: '02',
    title: 'Budgeting',
    description: 'Set spending limits and track costs across teams, projects, and models.',
    illustration: OssAsset('/bh4xci.mp4'),
  },
  {
    number: '03',
    title: 'Provider Fallback',
    description:
      'Automatic failover between providers ensures 99.99% uptime for your applications.',
    illustration: OssAsset('/rive/ICJL3DPmtEZZJ5XV96zkDyrgzU.riv'),
  },
  {
    number: '04',
    title: 'MCP Gateway',
    description:
      'Centralize all MCP tool connections, governance, security, and auth. Your AI can safely use MCP tools with centralized policy enforcement. Bye bye chaos!',
    illustration: OssAsset('/rive/CW6WL9AMphWwkwIwBG8o1ipGqdE.riv'),
  },
  {
    number: '05',
    title: 'Virtual Key Management',
    description:
      'Create different virtual keys for different use-cases with independent budgets and access control.',
    illustration: OssAsset('/rive/KBbyqDZQ7ko6obmMhOt3hllKA.riv'),
  },
  {
    number: '06',
    title: 'Unified Interface',
    description: 'One consistent API for all providers. Switch models without changing code.',
    illustration: OssAsset('/rive/ABhpjlXi56FtDgqi0PG1dpwbuk.riv'),
  },
  {
    number: '07',
    title: 'Drop-in Replacement',
    description:
      'Replace your existing SDK with just one line change. Compatible with OpenAI, Anthropic, LiteLLM, Google Genai, Langchain and more.',
    illustration: OssAsset('/rive/SKCB4zVmN4uuN9gFZgbiWgtNc40.riv'),
  },
  {
    number: '08',
    title: 'Built-in Observability',
    description:
      'Out-of-the-box OpenTelemetry support for observability. Built-in dashboard for quick glances without any complex setup.',
    illustration: OssAsset('/rive/lln9t3OuTneA9tQOi8XMPNlfNCk.riv'),
  },
  {
    number: '09',
    title: 'Community Support',
    description: 'Active Discord community with responsive support and regular updates.',
    illustration: OssAsset('/rive/D0EAkStzIv10JZlvu0Gm71lUl3c.riv'),
  },
]

const enterpriseFeatures: Feature[] = [
  {
    number: '01',
    title: 'Governance',
    description:
      'SAML support for SSO and Role-based access control and policy enforcement for team collaboration.',
    illustration: EnterpriseRive('/rive/BVg6Gzh91qsE0zrrZqcNtRFvME.riv'),
  },
  {
    number: '02',
    title: 'Adaptive Load Balancing',
    description:
      'Automatically optimizes traffic distribution across provider keys and models based on real-time performance metrics.',
    illustration: EnterpriseRive('/rive/R7fWBQUHHbJ3mWO0GsGPrzEJCs.riv'),
  },
  {
    number: '03',
    title: 'Cluster Mode',
    description:
      'High availability deployment with automatic failover and load balancing. Peer-to-peer clustering where every instance is equal.',
    illustration: EnterpriseRive('/rive/xnWTDwPAQyMu7jrAgokGDOcoEQ.riv'),
  },
  {
    number: '04',
    title: 'Alerts',
    description:
      'Real-time notifications for budget limits, failures, and performance issues on Email, Slack, PagerDuty, Teams, Webhook and more.',
    illustration: EnterpriseRive('/rive/JthU6CHsxNW4DcCuHTHJBExuGE.riv'),
  },
  {
    number: '05',
    title: 'Log Exports',
    description:
      'Export and analyze request logs, traces, and telemetry data from Bifrost with enterprise-grade data export capabilities for compliance, monitoring, and analytics.',
    illustration: EnterpriseRive('/rive/sRUWq9d3xSSel8cxVqxw9zjeN4.riv'),
  },
  {
    number: '06',
    title: 'Audit Logs',
    description: 'Comprehensive logging and audit trails for compliance and debugging.',
    illustration: EnterpriseRive('/rive/c0tVyQYkMtvuhTCKvA0SjGVHkY.riv'),
  },
  {
    number: '07',
    title: 'Vault Support',
    description:
      'Secure API key management with HashiCorp Vault, AWS Secrets Manager, Google Secret Manager, and Azure Key Vault integration.',
    illustration: EnterpriseRive('/rive/VaDh1xt2GHPGRpXDaTXVWVFk3sk.riv'),
  },
  {
    number: '08',
    title: 'VPC Deployment',
    description:
      'Deploy Bifrost within your private cloud infrastructure with VPC isolation, custom networking, and enhanced security controls.',
    illustration: EnterpriseRive('/rive/asuJ0YiIaQEBiTd0gLMK4ymRbo.riv'),
  },
  {
    number: '09',
    title: 'Guardrails',
    description:
      'Automatically detect and block unsafe model outputs with real-time policy enforcement and content moderation across all agents.',
    illustration: EnterpriseRive('/rive/9vcMVbT2Zgw72tJbQrZ94StxF0.riv'),
  },
]

function FeatureCard({ feature, accentColor }: { feature: Feature; accentColor: string }) {
  return (
    <div className="flex h-full flex-col bg-white">
      {/* Visual Area */}
      <div
        className="relative flex h-[200px] flex-shrink-0 items-center justify-center border-b p-6"
        style={{ borderColor: 'rgba(0, 0, 0, 0.1)' }}
      >
        {/* Decorative corner accents */}
        <div
          className="absolute top-3 left-3 h-2 w-2 border-t border-l"
          style={{ borderColor: accentColor, opacity: 0.4 }}
        />
        <div
          className="absolute top-3 right-3 h-2 w-2 border-t border-r"
          style={{ borderColor: accentColor, opacity: 0.4 }}
        />
        <div
          className="absolute bottom-3 left-3 h-2 w-2 border-b border-l"
          style={{ borderColor: accentColor, opacity: 0.4 }}
        />
        <div
          className="absolute right-3 bottom-3 h-2 w-2 border-r border-b"
          style={{ borderColor: accentColor, opacity: 0.4 }}
        />

        <div className="h-full max-h-[160px] w-full max-w-[180px]">{feature.illustration()}</div>
      </div>

      {/* Content Area */}
      <div className="flex flex-1 flex-col justify-start p-4">
        <p
          className="mb-1 text-xs font-medium"
          style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            color: 'rgba(0, 0, 0, 0.95)',
            lineHeight: '140%',
          }}
        >
          {feature.number} {feature.title}
        </p>
        <p
          className="text-xs"
          style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            color: 'rgba(0, 0, 0, 0.5)',
            lineHeight: '140%',
          }}
        >
          {feature.description}
        </p>
      </div>
    </div>
  )
}

export default function FeatureMatrix() {
  const [activeTab, setActiveTab] = useState<'oss' | 'enterprise'>('oss')

  const features = activeTab === 'oss' ? ossFeatures : enterpriseFeatures
  const accentColor = '#35c09e'

  return (
    <div style={{ borderColor: 'rgba(0, 0, 0, 0.1)' }} className="border-b">
      {/* Tab Switcher */}
      <div
        className="flex border-r border-b border-l"
        style={{ borderColor: 'rgba(0, 0, 0, 0.1)' }}
      >
        {/* OSS Tab */}
        <button
          onClick={() => setActiveTab('oss')}
          className={`relative flex flex-1 items-center justify-center gap-2 px-6 py-4 text-xs font-medium tracking-wider uppercase transition-all ${
            activeTab === 'oss'
              ? 'bg-white text-gray-900'
              : 'bg-gray-50 text-gray-500 hover:text-gray-700'
          }`}
          style={{
            borderRight: '1px solid rgba(0, 0, 0, 0.1)',
          }}
        >
          {activeTab === 'oss' && (
            <>
              <div className="absolute top-1 left-1 h-1.5 w-1.5 border-t border-l border-[#35c09e]" />
              <div className="absolute top-1 right-1 h-1.5 w-1.5 border-t border-r border-[#35c09e]" />
              <div className="absolute bottom-1 left-1 h-1.5 w-1.5 border-b border-l border-[#35c09e]" />
              <div className="absolute right-1 bottom-1 h-1.5 w-1.5 border-r border-b border-[#35c09e]" />
            </>
          )}
          <Code2
            className="h-3.5 w-3.5"
            style={{ color: activeTab === 'oss' ? '#35c09e' : undefined }}
          />
          <span>OSS Features</span>
        </button>

        {/* Enterprise Tab */}
        <button
          onClick={() => setActiveTab('enterprise')}
          className={`relative flex flex-1 items-center justify-center gap-2 px-6 py-4 text-xs font-medium tracking-wider uppercase transition-all ${
            activeTab === 'enterprise'
              ? 'bg-white text-gray-900'
              : 'bg-gray-50 text-gray-500 hover:text-gray-700'
          }`}
        >
          {activeTab === 'enterprise' && (
            <>
              <div
                className="absolute top-1 left-1 h-1.5 w-1.5 border-t border-l"
                style={{ borderColor: accentColor }}
              />
              <div
                className="absolute top-1 right-1 h-1.5 w-1.5 border-t border-r"
                style={{ borderColor: accentColor }}
              />
              <div
                className="absolute bottom-1 left-1 h-1.5 w-1.5 border-b border-l"
                style={{ borderColor: accentColor }}
              />
              <div
                className="absolute right-1 bottom-1 h-1.5 w-1.5 border-r border-b"
                style={{ borderColor: accentColor }}
              />
            </>
          )}
          <Building2
            className="h-3.5 w-3.5"
            style={{ color: activeTab === 'enterprise' ? accentColor : undefined }}
          />
          <span>Enterprise Features</span>
        </button>
      </div>

      {/* Feature Grid */}
      <div
        className="grid auto-rows-fr grid-cols-1 border-l sm:grid-cols-2 lg:grid-cols-3"
        style={{ borderColor: 'rgba(0, 0, 0, 0.1)' }}
      >
        {features.map((feature) => (
          <div
            key={feature.number + feature.title}
            className="h-full border-r border-b"
            style={{ borderColor: 'rgba(0, 0, 0, 0.1)' }}
          >
            <FeatureCard feature={feature} accentColor={accentColor} />
          </div>
        ))}
      </div>
    </div>
  )
}
