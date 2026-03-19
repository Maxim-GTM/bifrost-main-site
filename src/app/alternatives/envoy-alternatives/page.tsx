
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/Button'
import FeatureMatrix from '@/components/resources/FeatureMatrix'
import DropInReplacement from '@/components/resources/DropInReplacement'
import SetupSteps from '@/components/resources/SetupSteps'
import EnterpriseTrialForm from '@/components/industry-pages/EnterpriseTrialForm'

import {
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle2,
  Cpu,
  DollarSign,
  ExternalLink,
  Gauge,
  HardDrive,
  Lock,
  RefreshCw,
  Server,
  Shield,
  X,
  Zap,
} from 'lucide-react'
export const metadata: Metadata = {
    title: 'Top Envoy AI Gateway Alternatives for Production Teams (2026)',
    description:
      'Compare top Envoy AI Gateway alternatives with built-in caching, guardrails, and MCP support. See how Bifrost is the best alternative for production AI gateways.',
    alternates: {
      canonical: 'https://www.getmaxim.ai/bifrost/alternatives/envoy-alternatives',
    },
  }

  const performanceMetrics = [
    { label: 'Gateway Overhead', value: '11µs', description: 'At 5,000 RPS sustained' },
    { label: 'Success Rate', value: '100%', description: 'Even under extreme load' },
    { label: 'K8S Dependency', value: '0', description: 'Runs anywhere: NPX, Docker, zero config' },
    { label: 'Setup Time', value: '<30s', description: 'NPX or Docker, zero config' },
  ]

  const envoyLimitations = [
    {
      icon: Lock,
      title: 'Kubernetes Required',
      description:
        "Requires a Kubernetes cluster, Helm, and Gateway API CRDs. Teams without K8s infrastructure cannot use it at all.",
    },
    {
      icon: RefreshCw,
      title: 'Early-Stage APIs',
      description:
        "APIs are v1alpha1. Release notes acknowledge known limitations including inability to route to Kubernetes services. The project is still maturing.",
    },
    {
      icon: HardDrive,
      title: 'AI Features Bolted On, Not Native',
      description:
        " AI routing is layered on top of a general-purpose proxy via external processors and WASM filters. Solo.io acknowledged fundamental mismatches with MCP's bidirectional streaming.",
    },
    {
      icon: Server,
      title: 'No Caching, Budgets, or Guardrails',
      description:
        'Ships without semantic caching, cost tracking, budget enforcement, virtual key management, PII redaction, or jailbreak detection, all table-stakes for modern AI gateways.',
    },

  ]
  
  const envoyStrengths = [
    {
      icon: Zap,
      title: 'OpenAI-Compatible Endpoint',
      description:
        "Single API for multiple LLM providers with OpenAI-compatible interface, enabling fast model switching during experimentation.",
    },
    {
      icon: Gauge,
      title: 'Open Source (Apache 2.0)',
      description:
        'Fully open-source under the Envoy project umbrella. Transparent development process with community governance.',
    },
    {
      icon: HardDrive,
      title: 'Kubernetes-Native Architecture',
      description:
        'Deep integration with Gateway API, Kubernetes CRDs, and cloud-native tooling for teams already invested in K8s infrastructure.',
    },
    {
      icon: Cpu,
      title: 'Token-Based Rate Limiting',
      description:
        'Supports token-level rate limiting and upstream credential injection at the gateway layer, giving platform teams basic controls over LLM traffic consumption.',
    },
  ]

  const whyMigrate = [
    {
      icon: Zap,
      title: 'Heavy Infrastructure Requirements',
      description:
        "Deploying Envoy AI Gateway requires a running Kubernetes cluster, Helm, and familiarity with Gateway API specifications. Configuration is done via CRDs like AIServiceBackend, AIGatewayRoute, and BackendSecurityPolicy, infrastructure-engineer territory, not developer-friendly.",
    },
    {
      icon: Shield,
      title: 'Not AI-Native by Design',
      description:
        'Envoy was built for HTTP/TCP traffic management. AI capabilities are added through external processors and WASM filters, not as first-class features.',
    },
    {
      icon: DollarSign,
      title: 'Zero Cost Management',
      description:
        'No virtual keys, no per-team or per-project budgets, no spend tracking, and no token-level cost attribution. Teams have no mechanism to prevent runaway LLM costs or enforce financial governance across teams.',
    },
    {
      icon: Lock,
      title: 'No Built-in Guardrails',
      description:
        'Ships without content moderation, PII redaction, jailbreak detection, or any prompt/response filtering. Teams in regulated industries must build these safety layers entirely from scratch.',
    },
    {
      icon: BarChart3,
      title: 'No Caching of Any Kind',
      description:
        "Neither simple nor semantic caching is available. Every identical prompt results in a full round-trip to the LLM provider, meaning no cost savings and no latency reduction for repeated queries.",
    },
    {
      icon: RefreshCw,
      title: 'Minimal SDK & Multimodal Support',
      description:
        "Only OpenAI SDK drop-in is supported. No Anthropic, Google GenAI, Bedrock, LangChain, or Go SDK integration. No support for vision, audio, image generation, or video APIs.",
    },
  ]

  interface ComparisonRow {
    feature: string
    bifrost: string | null
    envoy: string | null
    bifrostCheck?: boolean
    envoyCheck?: boolean
  }

  const featureComparison: { title: string; rows: ComparisonRow[] }[] = [
    {
      title: 'Speed & Performance',
      rows: [

        { feature: 'Language', bifrost: 'Go', envoy: 'C++ (Envoy) + Go' },

        
        {
            feature: 'Gateway Overhead (per request)',
            bifrost: '11µs (Go native)',
            envoy: '~1-5ms',
          },
          {
            feature: 'Object Pooling',
            bifrost: '✅',
            envoy: '❌',
          },  

        
      ],
    },
    {
      title: 'ROUTING AND RELIABILITY',
      rows: [
        
        {
          feature: 'Basic Weighted LB',
          bifrost: '✅',
          envoy: '✅',
        
        },
        {
          feature: 'Automatic Fallbacks',
          bifrost: '✅',
          envoy: '✅',
        
        },
        {
          feature: 'Adaptive Load Balancing',
          bifrost: '✅',
          envoy: '❌',
        
        },
        
          {
            feature: 'Geo-Aware Routing',
            bifrost: '✅',
            envoy: '❌',
          
          },  
        { feature: 'Token-Aware Routing', bifrost: '✅', envoy: '✅' },

        
      ],
    },


    {
        title: 'MCP GATEWAY',
        rows: [
          
          {
            feature: 'MCP Server Management',
            bifrost: '✅',
            envoy: '✅',
          
          },
          {
            feature: 'MCP Agent Mode',
            bifrost: '✅',
            envoy: '❌',
          
          },
          {
            feature: 'MCP Code Mode',
            bifrost: '✅',
            envoy: '❌',
          
          },
          {
            feature: 'MCP Tool Hosting',
            bifrost: '✅',
            envoy: '❌',
          
          },
          {
            feature: 'MCP OAuth',
            bifrost: '✅',
            envoy: '✅',
          
          },
        ],
      },

      {
        title: 'GUARDRAILS',
        rows: [
          
          {
            feature: 'Built-in Guardrails',
            bifrost: '✅',
            envoy: '❌',
          
          },
          {
            feature: 'Input & Output Guardrails',
            bifrost: '✅',
            envoy: '❌',
          
          },
          {
            feature: 'Jailbreak Detection',
            bifrost: '✅',
            envoy: '❌',
          
          },
          {
            feature: 'PII Redaction',
            bifrost: '✅',
            envoy: '❌',
          
          },
        ],
      },

      {
        title: 'CACHING',
        rows: [
          
          {
            feature: 'Simple Cache',
            bifrost: '✅',
            envoy: '❌',
          
          },
          {
            feature: 'Semantic Cache',
            bifrost: '✅',
            envoy: '❌',
          
          },
          {
            feature: 'Built-in Vector Store',
            bifrost: '✅',
            envoy: '❌',
          
          },
        ],
      },
    {
      title: 'Governance & Budget',
      rows: [
        {
          feature: 'Virtual Keys with Budgets',
          bifrost: '✅',
          envoy: '❌',
        
        },
        {
            feature: 'Heirarchial Budgets',
            bifrost: '✅',
            envoy: '❌',
          
          },

          {
            feature: 'Spend Tracking',
            bifrost: '✅',
            envoy: '❌',
          
          },
        
        {
          feature: 'Audit Logs',
          bifrost: '✅',
          envoy: '✅',
        
        },
        {
          feature: 'SSO Integration',
          bifrost: '✅',
          envoy: 'via K8s RBAC',
      
        },
        {
            feature: 'RBAC',
            bifrost: '✅',
            envoy: 'via K8s-native RBAC',
        
          },
        
      ],
    },
    {
      title: 'Observability',
      rows: [
        {
          feature: 'Native Prometheus',
          bifrost: '✅',
          envoy: '✅',
      
        },
        {
          feature: 'Built-in Log Viewer',
          bifrost: '✅',
          envoy: '❌',
        
        },
        {
          feature: 'Cost per Request Tracking',
          bifrost: '✅',
          envoy: '❌',
        
        },
        {
            feature: 'Request/Response Debug',
            bifrost: '✅',
            envoy: '❌',
        
          },

    
      ],
    },

    {
        title: 'Multimodal Support',
        rows: [
          
          {
            feature: 'Vision',
            bifrost: '✅',
            envoy: '❌',
          
          },
          {
            feature: 'Audio',
            bifrost: '✅',
            envoy: '❌',
          
          },
          {
              feature: 'Image Gen',
              bifrost: '✅',
              envoy: '❌',
          
            },

            {
                feature: 'Video API',
                bifrost: '✅',
                envoy: '❌',
            
              },
  
      
        ],
      },
    {
        title: 'SDK INTEGRATIONS',
        rows: [
         
            {
                feature: 'OpenAI SDK Drop-in',
                bifrost: '✅',
                envoy: '✅',
               
              },

          {
            feature: 'Anthropic SDK Drop-in',
            bifrost: '✅',
            envoy: '❌',
           
          },
          {
            feature: 'GenAI SDK Drop-in',
            bifrost: '✅',
            envoy: '❌',
          
          },
          {
            feature: 'Bedrock SDK Drop-in',
            bifrost: '✅',
            envoy: '❌',
          
          },
          {
            feature: 'LiteLLM SDK Compat',
            bifrost: '✅',
            envoy: '❌',
          
          },
          {
            feature: 'Go SDK (Library)',
            bifrost: '✅',
            envoy: '❌',
          
          },
        ],
      },
      {
        title: 'ENTERPRISE AND DEPLOYMENT',
        rows: [
         
            {
                feature: 'Cluster Mode / HA',
                bifrost: '✅',
                envoy: '✅ (K8s)',
               
              },

          {
            feature: 'In-VPC Deployment',
            bifrost: '✅',
            envoy: '✅',
           
          },
          {
            feature: 'Helm Charts',
            bifrost: '✅',
            envoy: '✅',
          
          },
          {
            feature: 'K8s Required',
            bifrost: 'No',
            envoy: 'Yes',
          
          },
          {
            feature: 'SOC2',
            bifrost: '✅',
            envoy: '❌',
          
          },
          {
            feature: 'HIPAA',
            bifrost: '✅',
            envoy: '❌',
          
          },
        
          {
            feature: 'Vault Support',
            bifrost: '✅',
            envoy: '✅',
          
          },
          
        ],
      },
    
    {
      title: 'UNIQUE FEATURES',
      rows: [
       
  
        
        
        {
          feature: 'Prompt Studio / Editor',
          bifrost: '✅',
          envoy: '❌',
        
        },
        {
            feature: 'Self-Hosted Model Mgmt',
            bifrost: '✅',
            envoy: '✅',
          
          },
       
          {
            feature: 'Mock Responses',
            bifrost: '✅',
            envoy: '❌',
          
          },
         

    
      ],
    },
    

  ]

  const setupSteps = [
    {
      step: '01',
      title: 'Install Bifrost',
      description: 'One command. No configuration files, no Redis, no databases required.',
      code: `# Option 1: NPX (fastest)
  npx -y @maximhq/bifrost
  # Option 2: Docker
  docker run -p 8080:8080 maximhq/bifrost
  # Option 3: Go SDK
  go get github.com/maximhq/bifrost/core@latest`,
    },
    {
      step: '02',
      title: 'Configure via Web UI',
      description:
        'Add provider keys, configure models, set up fallback chains, all from the browser.',
      code: `# open the dashboard
  open http://localhost:8080
  # add API keys for providers
  # configure models and weights
  # set up fallback chains`,
    },
    {
      step: '03',
      title: 'Update your endpoint',
      description: 'Change the base URL in your code. Everything else stays the same.',
      code: `# just update the base URL
  # before: http://localhost:4000
  # after:  http://localhost:8080
  curl http://localhost:8080/v1/chat/completions \\
    -H "Content-Type: application/json" \\
    -d '{"model":"openai/gpt-4o-mini","messages":[{"role":"user","content":"Hello!"}]}'`,
    },
  ]
  
  const chooseBifrost = [
    'You need a purpose-built AI gateway with caching, budgets, guardrails, and MCP, and not a general proxy with AI bolted on',
    'You want to deploy without Kubernete - on Docker, or via NPX in under 30 seconds',
    'You use multiple AI SDKs (Anthropic, GenAI, Bedrock, LangChain) and need native drop-in support for all of them',
    'You need multimodal support: vision, audio, image generation, and video APIs through a unified gateway',
    'You want SOC2/HIPAA compliance certifications and enterprise-grade governance from day one',
  ]

  const chooseEnvoy = [
    "You're already running Envoy Gateway / Envoy Proxy in your Kubernetes cluster",
    'Your platform engineering team is deeply invested in Kubernetes Gateway API and CRD-based workflows',
    'You only need basic LLM routing (chat completions, embeddings) with no caching, budgets, or guardrails',
    "You prefer infrastructure managed through the CNCF ecosystem and don't mind writing CRDs for all configuration",
  ]
  
  function tableCellStyle(
    value: string | null,
    hasCheck: boolean | undefined,
    isEnvoy: boolean
  ): 'sy' | 'sn' | 'sp' | 'sv' {
    if (value === null || value === '') return 'sn'
    const v = value.toLowerCase().trim()
    if (v === 'n/a') return 'sn'
    if (hasCheck === false && isEnvoy) return 'sn'
    if (/\d+(\.\d+)?(µs|ms|s|%| rps)/i.test(value) || v.includes('99.999') || v.includes('1.68')) return 'sv'
    const partialPhrases = [
      'community-maintained',
      'manual config',
      'via callbacks',
      'basic',
      'self-hosted',
      'available',
      'load balancer needed',
      'admin panel available',
      'yaml config',
      'beta integration',
      'python package',
      'python callbacks',
      'multiple backends',
      'unpredictable',
      'async overhead',
    ]
    if (partialPhrases.some((s) => v.includes(s))) return 'sp'
    return 'sy'
  }
  

  export default function EnvoyAlternativesPage() {
    return (
      <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="text-center">
            <span className="font-mono text-[12px] leading-[15px] font-medium tracking-[0.04em] text-emerald-500 uppercase">
              [&ensp;ENVOY AI GATEWAY ALTERNATIVES&ensp;]
            </span>
            <h1 className="mt-2 mb-4 text-center text-4xl leading-[1.2] font-normal tracking-tight text-gray-900 md:text-5xl">
              Top Envoy AI Gateway Alternatives
              <br />
              <span className="text-[var(--accent-text)]">for Production AI Teams </span>
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-sm leading-relaxed text-gray-500 md:text-base">
            While Envoy AI Gateway handles basic proxy routing for teams already deep in Kubernetes, it ships without caching, budgets, or guardrails. Compare purpose-built AI gateways for developer experience, MCP support, and production-grade governance.
            
            </p>
            <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row sm:items-center">
              <Link href="#comparison" >
                <Button size="lg">
                  Compare Platforms
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="https://docs.getbifrost.ai" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg">
                  View documentation
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-center font-mono text-[10px] tracking-widest text-gray-400 uppercase">
            [ BIFROST PERFORMANCE AT A GLANCE ]
          </p>
          <div className="border-y border-gray-200">
            <div className="w-full">
              <div className="grid grid-cols-2 divide-y md:grid-cols-6 md:divide-y-0">
                <div className="hidden border-r border-gray-200 md:col-span-1 md:block" />
                {performanceMetrics.map((item) => (
                  <div
                    key={item.label}
                    className="border-r border-gray-200 px-4 py-5 text-center last:border-r-0"
                  >
                    <div className="mb-1 font-mono text-xl leading-none text-[var(--accent-text)] md:text-2xl">
                      {item.value}
                    </div>
                    <div className="mb-1 font-mono text-[10px] font-medium tracking-wider text-gray-500 uppercase">
                      {item.label}
                    </div>
                    <div className="text-[11px] text-gray-400">{item.description}</div>
                  </div>
                ))}
                <div className="hidden border-gray-200 md:col-span-1 md:block" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
      <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
        [ ENVOY AI GATEWAY OVERVIEW ]
      </p>

      <h2 className="mb-6 text-2xl text-gray-900 md:text-3xl">
        What is Envoy AI Gateway?
      </h2>

      <p className="leading-relaxed text-gray-600">
      Envoy Gateway is an open source project for managing Envoy Proxy as a standalone or Kubernetes-based application gateway.  It was initiated by Bloomberg and Tetrate to address GenAI traffic challenges within cloud-native infrastructure.
      </p>
    </div>

    {/* Bottom row: Strengths vs Limitations - symmetrical, equidistant */}
    <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-12 md:gap-y-0 py-10">
      {/* Strengths of Envoy */}
      <div className="flex min-w-0 flex-col gap-6">
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-[var(--accent-text)]">
          Strengths of Envoy
        </p>
        <div className="flex min-h-0 flex-col gap-6">
          {envoyStrengths.map((item) => (
            <div key={item.title} className="relative min-h-[7.5rem] flex flex-col border border-gray-200 bg-white p-5">
              <div className="absolute top-3 left-3 h-2 w-2 border-t border-l border-[var(--accent)] opacity-40" />
              <div className="absolute top-3 right-3 h-2 w-2 border-t border-r border-[var(--accent)] opacity-40" />
              <div className="absolute bottom-3 left-3 h-2 w-2 border-b border-l border-[var(--accent)] opacity-40" />
              <div className="absolute right-3 bottom-3 h-2 w-2 border-r border-b border-[var(--accent)] opacity-40" />
              <div className="mb-2 flex items-center gap-3">
                <item.icon className="h-4 w-4 shrink-0 text-[var(--accent-text)]" />
                <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
              </div>
              <p className="flex-1 text-xs leading-relaxed text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Limitations of Envoy */}
      <div className="flex min-w-0 flex-col gap-6">
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-gray-400">
          Limitations of Envoy
        </p>
        <div className="flex min-h-0 flex-col gap-6">
          {envoyLimitations.map((item) => (
            <div key={item.title} className="relative min-h-[7.5rem] flex flex-col border border-gray-200 bg-white p-5">
              <div className="absolute top-3 left-3 h-2 w-2 border-t border-l border-gray-300 opacity-40" />
              <div className="absolute top-3 right-3 h-2 w-2 border-t border-r border-gray-300 opacity-40" />
              <div className="absolute bottom-3 left-3 h-2 w-2 border-b border-l border-gray-300 opacity-40" />
              <div className="absolute right-3 bottom-3 h-2 w-2 border-r border-b border-gray-300 opacity-40" />
              <div className="mb-2 flex items-center gap-3">
                <item.icon className="h-4 w-4 shrink-0 text-gray-400" />
                <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
              </div>
              <p className="flex-1 text-xs leading-relaxed text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>

<section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ PRODUCTION CHALLENGES ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">Why Teams Look for Envoy AI Gateway Alternatives?</h2>
            <p className="mx-auto max-w-3xl text-gray-600">
            While Envoy Proxy is battle-tested for HTTP/TCP traffic, teams building AI applications quickly discover that a general-purpose proxy with AI extensions is not the same as a purpose-built AI gateway.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyMigrate.map((item) => (
              <div
                key={item.title}
                className="relative border border-gray-200 bg-white p-6 transition-all hover:border-[var(--accent-border)] hover:shadow-sm"
              >
                <div className="absolute top-3 left-3 h-2 w-2 border-t border-l border-[var(--accent)] opacity-40" />
                <div className="absolute top-3 right-3 h-2 w-2 border-t border-r border-[var(--accent)] opacity-40" />
                <div className="absolute bottom-3 left-3 h-2 w-2 border-b border-l border-[var(--accent)] opacity-40" />
                <div className="absolute right-3 bottom-3 h-2 w-2 border-r border-b border-[var(--accent)] opacity-40" />
                <item.icon className="mb-4 h-6 w-6 text-[var(--accent)]" />
                <h3 className="mb-2 text-gray-900">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      

      <section id="comparison" className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ FEATURE COMPARISON ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
              Feature-By-Feature Comparison
            </h2>
          </div>
          <div className="mt-container">
            <table className="mt mt-fixed">
              <colgroup>
                <col className="mt-col-feature" />
                <col className="mt-col-platform-wide" />
                <col className="mt-col-platform-wide" />
              </colgroup>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th className="col-b">Bifrost</th>
                  <th>Envoy</th>
                </tr>
              </thead>
              <tbody>
                {featureComparison.map((section) => (
                  <React.Fragment key={section.title}>
                    <tr className="row-cat">
                      <td colSpan={3}>{section.title}</td>
                    </tr>
                    {section.rows.map((row) => {
                      const isLanguage = row.feature === 'Language'
                      const bifrostVal = row.bifrost ?? '—'
                      const envoyVal = row.envoy ?? '—'
                      const envoyClass = tableCellStyle(row.envoy, row.envoyCheck, true)
                      const isAvailable =
                        (row.envoy ?? '').toLowerCase().trim() === 'available'
                      const isNa = (row.envoy ?? '').toLowerCase().trim() === 'n/a'
                      const isCheckOrCross =
                        envoyVal === '✅' || String(envoyVal).startsWith('✅') || envoyVal === '❌'
                      const envoyDisplayClass = isAvailable
                        ? 'sy'
                        : isNa
                          ? 'text-[#5A606D]'
                          : isCheckOrCross
                            ? envoyClass
                            : 'sp'
                      return (
                        <tr key={`${section.title}-${row.feature}`}>
                          <td>{row.feature}</td>
                          <td className="col-b-c">
                            {isLanguage ? (
                              <span className="arch-tag">{bifrostVal}</span>
                            ) : bifrostVal === '✅' || String(bifrostVal).startsWith('✅') ? (
                              <span className="sy inline-flex items-center gap-1">
                                <Check className="h-5 w-5 shrink-0" strokeWidth={2.5} />
                                {String(bifrostVal).startsWith('✅') && String(bifrostVal).slice(1) ? String(bifrostVal).slice(1) : null}
                              </span>
                            ) : (
                              <span className="sy">{bifrostVal}</span>
                            )}
                          </td>
                          <td>
                            {isLanguage ? (
                              <span className="arch-tag py">{envoyVal}</span>
                            ) : envoyVal === '✅' || String(envoyVal).startsWith('✅') ? (
                              <span className={`${envoyDisplayClass} inline-flex items-center gap-1`}>
                                <Check className="h-5 w-5 shrink-0" strokeWidth={2.5} />
                                {String(envoyVal).startsWith('✅') && String(envoyVal).slice(1) ? String(envoyVal).slice(1) : null}
                              </span>
                            ) : envoyVal === '❌' ? (
                              <span className={`${envoyDisplayClass} inline-flex items-center`}>
                                <X className="h-5 w-5 shrink-0 text-red-500" strokeWidth={2.5} />
                              </span>
                            ) : (
                            <span className={envoyDisplayClass}>{envoyVal}</span>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

       
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ FEATURE GAPS ACROSS ALTERNATIVES ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">What&apos;s Missing from Other Gateways?</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              A direct capability comparison across all evaluated platforms.
            </p>
          </div>

          <div className="mt-container">
            <table className="mt mt-fixed">
              <colgroup>
                <col className="mt-col-feature" />
                <col className="mt-col-platform-narrow" />
                <col className="mt-col-platform-narrow" />
                <col className="mt-col-platform-narrow" />
                <col className="mt-col-platform-narrow" />
                <col className="mt-col-platform-narrow" />
              </colgroup>
              <thead>
                <tr>
                  <th>Features</th>
                  <th className="col-b">Bifrost</th>
                  <th>Portkey</th>
                  <th>TrueFoundry</th>
                  <th>HAProxy</th>
                  <th>LiteLLM</th>
                </tr>
              </thead>
              <tbody>
                {/* Performance & Architecture */}
                <tr className="row-cat">
                  <td colSpan={6}>Performance & Architecture</td>
                </tr>

                <tr>
                  <td>Gateway Overhead</td>
                  <td className="col-b-c">
                    <span className="sy inline-flex items-center">~11µs @ 5K RPS</span>
                  </td>
                  <td>
                    <span className="sp inline-flex items-center">~20-25 ms @ 100 RPS</span>
                  </td>
                  <td>
                    <span className="sp inline-flex items-center">~5-15 ms (managed)</span>
                  </td>
                  <td>
                    <span className="sp">~1 ms (raw proxy)</span>
                  </td>
                  <td>
                    <span className="sp inline-flex items-center">~20-25 ms @ 100 RPS</span>
                  </td>
                  
                </tr>
          
                <tr>
                  <td>Object pooling / memory reuse</td>
                  <td className="col-b-c">
                    <span className="sy inline-flex items-center"><Check className="h-5 w-5 shrink-0" strokeWidth={2.5} /></span>
                  </td>
                  <td>
                    <span className="sv inline-flex items-center"><X className="h-5 w-5 shrink-0 text-red-500" strokeWidth={2.5} /></span>
                  </td>
                  <td>
                    <span className="sv inline-flex items-center"><X className="h-5 w-5 shrink-0 text-red-500" strokeWidth={2.5} /></span>
                  </td>
                  <td>
                    <span className="sN">N/A</span>
                  </td>
                  <td>
                    <span className="sn inline-flex items-center"><X className="h-5 w-5 shrink-0 text-red-500" strokeWidth={2.5} /></span>
                  </td>
                  
                </tr>
          

                {/* Routing & Reliability */}
                <tr className="row-cat">
                  <td colSpan={6}>Routing &amp; Intelligence</td>
                </tr>
                <tr>
                  <td>Adaptive Load Balancing</td>
                  <td className="col-b-c">
                    <span className="sy inline-flex items-center"><Check className="h-5 w-5 shrink-0" strokeWidth={2.5} /></span>
                  </td>
                  <td>
                    <span className="sn inline-flex items-center"><X className="h-5 w-5 shrink-0 text-red-500" strokeWidth={2.5} /></span>
                  </td>
                  <td>
                    <span className="sp">Latency-Based</span>
                  </td>
                  <td>
                    <span className="sy inline-flex items-center"><Check className="h-5 w-5 shrink-0" strokeWidth={2.5} /></span>
                  </td>
                  <td>
                    <span className="sn inline-flex items-center"><X className="h-5 w-5 shrink-0 text-red-500" strokeWidth={2.5} /></span>
                  </td>
                </tr>
                
                <tr>
                  <td>Semantic Caching</td>
                  <td className="col-b-c">
                    <span className="sy inline-flex items-center"><Check className="h-5 w-5 shrink-0" strokeWidth={2.5} /></span>
                  </td>
                  <td>
                    <span className="sp">Cloud</span>
                  </td>
                  <td>
                    <span className="sy inline-flex items-center"><Check className="h-5 w-5 shrink-0" strokeWidth={2.5} /></span>
                  </td>
                  <td>
                    <span className="sn inline-flex items-center"><X className="h-5 w-5 shrink-0 text-red-500" strokeWidth={2.5} /></span>
                  </td>
                  <td>
                    <span className="sn inline-flex items-center"><X className="h-5 w-5 shrink-0 text-red-500" strokeWidth={2.5} /></span>
                  </td>
                  
                </tr>
                <tr>
                  <td>Geo-aware routing</td>
                  <td className="col-b-c">
                    <span className="sy inline-flex items-center"><Check className="h-5 w-5 shrink-0" strokeWidth={2.5} /></span>
                  </td>
                  <td>
                    <span className="sn inline-flex items-center"><X className="h-5 w-5 shrink-0 text-red-500" strokeWidth={2.5} /></span>
                  </td>
                  <td>
                    <span className="sy inline-flex items-center"><Check className="h-5 w-5 shrink-0" strokeWidth={2.5} /></span>
                  </td>
                  <td>
                    <span className="sy inline-flex items-center"><Check className="h-5 w-5 shrink-0" strokeWidth={2.5} /></span>
                  </td>
                  <td>
                    <span className="sn inline-flex items-center"><X className="h-5 w-5 shrink-0 text-red-500" strokeWidth={2.5} /></span>
                  </td>
                  
                </tr>
                <tr>
                  <td>Backpressure handling</td>
                  <td className="col-b-c">
                    <span className="sy inline-flex items-center"><Check className="h-5 w-5 shrink-0" strokeWidth={2.5} /></span>
                  </td>
                  <td>
                    <span className="sn inline-flex items-center"><X className="h-5 w-5 shrink-0 text-red-500" strokeWidth={2.5} /></span>
                  </td>
                  <td>
                    <span className="sn inline-flex items-center"><X className="h-5 w-5 shrink-0 text-red-500" strokeWidth={2.5} /></span>
                  </td>
                  <td>
                    <span className="sy inline-flex items-center"><Check className="h-5 w-5 shrink-0" strokeWidth={2.5} /></span>
                  </td>
                  <td>
                    <span className="sn inline-flex items-center"><X className="h-5 w-5 shrink-0 text-red-500" strokeWidth={2.5} /></span>
                  </td>
                
                </tr>

                {/* Observability & Governance */}
                <tr className="row-cat">
                  <td colSpan={6}>MCP &amp; AGENT INFRASTRUCTURE</td>
                </tr>

                <tr>
                  <td>MCP Code Mode</td>
                  <td className="col-b-c">
                    <span className="sy inline-flex items-center"><Check className="h-5 w-5 shrink-0" strokeWidth={2.5} /></span>
                  </td>
                  <td>
                    <span className="sn inline-flex items-center"><X className="h-5 w-5 shrink-0 text-red-500" strokeWidth={2.5} /></span>
                  </td>
                  <td>
                    <span className="sn inline-flex items-center"><X className="h-5 w-5 shrink-0 text-red-500" strokeWidth={2.5} /></span>
                  </td>
                  <td>
                    <span className="sn inline-flex items-center"><X className="h-5 w-5 shrink-0 text-red-500" strokeWidth={2.5} /></span>
                  </td>
                  <td>
                    <span className="sn inline-flex items-center"><X className="h-5 w-5 shrink-0 text-red-500" strokeWidth={2.5} /></span>
                  </td>
                  
                </tr>
                <tr>
                  <td>MCP Tool Hosting</td>
                  <td className="col-b-c">
                    <span className="sy inline-flex items-center"><Check className="h-5 w-5 shrink-0" strokeWidth={2.5} /></span>
                  </td>
                  <td>
                    <span className="sn inline-flex items-center"><X className="h-5 w-5 shrink-0 text-red-500" strokeWidth={2.5} /></span>
                  </td>
                  <td>
                    <span className="sn inline-flex items-center"><X className="h-5 w-5 shrink-0 text-red-500" strokeWidth={2.5} /></span>
                  </td>
                  <td>
                    <span className="sn inline-flex items-center"><X className="h-5 w-5 shrink-0 text-red-500" strokeWidth={2.5} /></span>
                  </td>
                  <td>
                    <span className="sn inline-flex items-center"><X className="h-5 w-5 shrink-0 text-red-500" strokeWidth={2.5} /></span>
                  </td>
                  
                </tr>
                <tr>
                  <td>MCP Agent Mode</td>
                  <td className="col-b-c">
                    <span className="sy inline-flex items-center"><Check className="h-5 w-5 shrink-0" strokeWidth={2.5} /></span>
                  </td>
                  <td>
                    <span className="sn inline-flex items-center"><X className="h-5 w-5 shrink-0 text-red-500" strokeWidth={2.5} /></span>
                  </td>
                  <td>
                    <span className="sn inline-flex items-center"><X className="h-5 w-5 shrink-0 text-red-500" strokeWidth={2.5} /></span>
                  </td>
                  <td>
                    <span className="sn inline-flex items-center"><X className="h-5 w-5 shrink-0 text-red-500" strokeWidth={2.5} /></span>
                  </td>
                  <td>
                    <span className="sy inline-flex items-center"><Check className="h-5 w-5 shrink-0" strokeWidth={2.5} /></span>
                  </td>
                  
                </tr>
                

                {/* Enterprise Deployment */}
                <tr className="row-cat">
                  <td colSpan={6}>SDK &amp; Developer Experience</td>
                </tr>
                
                <tr>
                  <td>Zero-config startup</td>
                  <td className="col-b-c">
                    <span className="sy inline-flex items-center"><Check className="h-5 w-5 shrink-0" strokeWidth={2.5} /></span>
                  </td>
                  <td>
                    <span className="sn inline-flex items-center"><X className="h-5 w-5 shrink-0 text-red-500" strokeWidth={2.5} /></span>
                  </td>
                  <td>
                    <span className="sn inline-flex items-center"><X className="h-5 w-5 shrink-0 text-red-500" strokeWidth={2.5} /></span>
                  </td>
                  <td>
                    <span className="sn inline-flex items-center"><X className="h-5 w-5 shrink-0 text-red-500" strokeWidth={2.5} /></span>
                  </td>
                  <td>
                    <span className="sn inline-flex items-center"><X className="h-5 w-5 shrink-0 text-red-500" strokeWidth={2.5} /></span>
                  </td>
                  
                </tr>
                <tr>
                  <td>Traffic mirroring</td>
                  <td className="col-b-c">
                    <span className="sy inline-flex items-center"><Check className="h-5 w-5 shrink-0" strokeWidth={2.5} /></span>
                  </td>
                  <td>
                    <span className="sn inline-flex items-center"><X className="h-5 w-5 shrink-0 text-red-500" strokeWidth={2.5} /></span>
                  </td>
                  <td>
                    <span className="sn inline-flex items-center"><X className="h-5 w-5 shrink-0 text-red-500" strokeWidth={2.5} /></span>
                  </td>
                  <td>
                    <span className="sy inline-flex items-center"><Check className="h-5 w-5 shrink-0" strokeWidth={2.5} /></span>
                  </td>
                  <td>
                    <span className="sy inline-flex items-center"><Check className="h-5 w-5 shrink-0" strokeWidth={2.5} /></span>
                  </td>                  
                </tr>   

                <tr>
                  <td>Prompt Studio / Editor</td>
                  <td className="col-b-c">
                    <span className="sy inline-flex items-center"><Check className="h-5 w-5 shrink-0" strokeWidth={2.5} /></span>
                  </td>
                  <td>
                    <span className="sy inline-flex items-center"><Check className="h-5 w-5 shrink-0" strokeWidth={2.5} /></span>
                  </td>
                  <td>
                    <span className="sy inline-flex items-center"><Check className="h-5 w-5 shrink-0" strokeWidth={2.5} /></span>
                  </td>
                  <td>
                    <span className="sn inline-flex items-center"><X className="h-5 w-5 shrink-0 text-red-500" strokeWidth={2.5} /></span>
                  </td>
                  <td>
                    <span className="sn inline-flex items-center"><X className="h-5 w-5 shrink-0 text-red-500" strokeWidth={2.5} /></span>
                  </td>                  
                </tr>      

                <tr>
                  <td>Mock Responses</td>
                  <td className="col-b-c">
                    <span className="sy inline-flex items-center"><Check className="h-5 w-5 shrink-0" strokeWidth={2.5} /></span>
                  </td>
                  <td>
                    <span className="sn inline-flex items-center"><X className="h-5 w-5 shrink-0 text-red-500" strokeWidth={2.5} /></span>
                  </td>
                  <td>
                    <span className="sn inline-flex items-center"><X className="h-5 w-5 shrink-0 text-red-500" strokeWidth={2.5} /></span>
                  </td>
                  <td>
                    <span className="sn inline-flex items-center"><X className="h-5 w-5 shrink-0 text-red-500" strokeWidth={2.5} /></span>
                  </td>
                  <td>
                    <span className="sn inline-flex items-center"><X className="h-5 w-5 shrink-0 text-red-500" strokeWidth={2.5} /></span>
                  </td>                  
                </tr>  

                   

              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ QUICK START ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">Get Started in Three Steps</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              No configuration files, no Redis, no external databases. Just install and go.
            </p>
          </div>
          <SetupSteps steps={setupSteps} />
        </div>
      </section>

      {/* When to Choose */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ DECISION GUIDE ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">When to Choose What</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="border-2 border-[var(--accent-border)] bg-white">
              <div className="border-b border-[var(--accent-border)] bg-[var(--accent)]/5 px-6 py-4">
                <h3 className="text-sm font-medium tracking-wider text-[var(--accent-text)] uppercase">
                  Choose Bifrost when
                </h3>
              </div>
              <ul className="divide-y divide-gray-200">
                {chooseBifrost.map((reason) => (
                  <li key={reason} className="flex items-start gap-3 px-6 py-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--accent-text)]" />
                    <span className="text-sm text-gray-700">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative border border-gray-200 bg-white">
              <div className="absolute top-3 left-3 h-2 w-2 border-t border-l border-gray-300 opacity-40" />
              <div className="absolute top-3 right-3 h-2 w-2 border-t border-r border-gray-300 opacity-40" />
              <div className="absolute bottom-3 left-3 h-2 w-2 border-b border-l border-gray-300 opacity-40" />
              <div className="absolute right-3 bottom-3 h-2 w-2 border-r border-b border-gray-300 opacity-40" />
              <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                <h3 className="text-sm font-medium tracking-wider text-gray-600 uppercase">
                  Envoy might be better when
                </h3>
              </div>
              <ul className="divide-y divide-gray-200">
                {chooseEnvoy.map((reason) => (
                  <li key={reason} className="flex items-start gap-3 px-6 py-3">
                    <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center text-xs text-gray-400">
                      •
                    </span>
                    <span className="text-sm text-gray-600">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Summary Table */}
      

      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
            Ready to Upgrade Your LLM Infrastructure?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-600">
            100% open source under Apache 2.0. Free forever. No vendor lock-in. Get started in under
            30 seconds.
          </p>
          <div className="mb-12 flex w-full flex-col items-center justify-center gap-4 sm:flex-row sm:items-center">
            <Link
              href="https://github.com/maximhq/bifrost"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg">
                Get started on GitHub
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="https://docs.getbifrost.ai" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg">
                Read the docs
                <ExternalLink className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Documentation', href: 'https://docs.getbifrost.ai' },
              { label: 'GitHub', href: 'https://github.com/maximhq/bifrost' },
              { label: 'Migration Guide', href: '/resources/migrating-from-litellm' },
              { label: 'Book a Demo', href: 'https://www.getmaxim.ai/bifrost/book-a-demo' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.href.startsWith('http')
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="relative flex items-center justify-center gap-2 border border-gray-200 bg-white p-4 text-sm text-gray-700 transition-all hover:border-[var(--accent-border)] hover:text-[var(--accent-text)]"
              >
                <div className="absolute top-2 left-2 h-1.5 w-1.5 border-t border-l border-[var(--accent)] opacity-40" />
                <div className="absolute top-2 right-2 h-1.5 w-1.5 border-t border-r border-[var(--accent)] opacity-40" />
                <div className="absolute bottom-2 left-2 h-1.5 w-1.5 border-b border-l border-[var(--accent)] opacity-40" />
                <div className="absolute right-2 bottom-2 h-1.5 w-1.5 border-r border-b border-[var(--accent)] opacity-40" />
                {link.label}
                {link.href.startsWith('http') && <ExternalLink className="h-3 w-3" />}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
              [ BIFROST FEATURES ]
            </p>
            <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
              Open Source &amp; Enterprise
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Everything you need to run AI in production, from free open source to enterprise-grade
              features.
            </p>
          </div>
          <FeatureMatrix />
        </div>
      </section>

      {/* Free Trial Form */}
      <section className="bg-white py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <EnterpriseTrialForm />
        </div>
      </section>

      {/* Drop-in Replacement */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <DropInReplacement />
        </div>
      </section>
      </div>
    );
  } 