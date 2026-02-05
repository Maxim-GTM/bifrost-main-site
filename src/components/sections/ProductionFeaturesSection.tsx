import { ArrowDown01Icon, ArrowUpDown, FileUpIcon, KeyIcon, NetworkIcon, PiggyBankIcon, PlugZapIcon, ReplaceIcon, ShieldIcon, SirenIcon, TelescopeIcon, VaultIcon } from "lucide-react";
import { FeatureCard } from '../ui';

export function FeaturesSection() {
  return (
    <>
    {/* Quick Start Section */}
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Get started in seconds
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Install Bifrost with a single command and start building AI applications immediately.
          </p>
        </div>
        
        {/* Enhanced Code Snippet */}
        <div className="relative mx-auto xl:w-2xl max-w-3xl">
          {/* Main code container */}
          <div className="relative bg-gray-900 border border-gray-700 rounded-sm  shadow-2xl">
            {/* Terminal header */}
            <div className="flex items-center mb-4 py-0 border-b border-gray-700">
              <div className="flex space-x-2 px-6 py-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex-1 text-center">
                
              </div>
            </div>
            
            {/* Command line */}
            <div className="flex items-center space-x-3 pb-5 px-6">
              <span className="text-green-400 font-mono text-sm">$</span>
              <code className="text-white font-mono text-lg font-medium tracking-wide">
                npx @maximhq/bifrost
              </code>
              <div className="-ml-2  w-2 h-5 bg-green-400 animate-pulse"></div>
            </div>
          </div>
                    
        </div>
        
        {/* Additional info */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            No configuration required • Built in observability • MCP clients • Advanced routing rules • Virtual keys
          </p>
        </div>
      </div>
    </section>

    <section id="features" className="py-20 lg:py-32 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(16,185,129,0.15)_1px,_transparent_0)] bg-[length:32px_32px]"></div>
      </div>
      
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Production-ready features out of the box
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to deploy, monitor, and scale AI applications in production environments.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* OSS Features */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">OSS Features</h3>
            </div>
            
            <div className="space-y-6">
              <FeatureCard
                plan="oss"
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                }
                title="Model Catalog"
                description="Access 8+ providers and 1000+ AI models from multiple providers through a unified interface. Also support custom deployed models!"
                readmeLink="https://docs.getbifrost.ai/integrations/what-is-an-integration"
              />

              <FeatureCard
                plan="oss"
                icon={<PiggyBankIcon className="h-7 w-7" />}
                title="Budgeting"
                description="Set spending limits and track costs across teams, projects, and models."
                readmeLink="https://docs.getbifrost.ai/features/governance"
              />

              <FeatureCard
                plan="oss"
                icon={<ArrowDown01Icon className="h-7 w-7" />}
                title="Provider Fallback"
                description="Automatic failover between providers ensures 99.99% uptime for your applications."
                readmeLink="https://docs.getbifrost.ai/features/fallbacks"
              />

              <FeatureCard
                plan="oss"
                icon={
                  <svg className="h-7 w-7" fill="currentColor" fillRule="evenodd" height="1em" style={{flex:'none',lineHeight:1}} viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.688 2.343a2.588 2.588 0 00-3.61 0l-9.626 9.44a.863.863 0 01-1.203 0 .823.823 0 010-1.18l9.626-9.44a4.313 4.313 0 016.016 0 4.116 4.116 0 011.204 3.54 4.3 4.3 0 013.609 1.18l.05.05a4.115 4.115 0 010 5.9l-8.706 8.537a.274.274 0 000 .393l1.788 1.754a.823.823 0 010 1.18.863.863 0 01-1.203 0l-1.788-1.753a1.92 1.92 0 010-2.754l8.706-8.538a2.47 2.47 0 000-3.54l-.05-.049a2.588 2.588 0 00-3.607-.003l-7.172 7.034-.002.002-.098.097a.863.863 0 01-1.204 0 .823.823 0 010-1.18l7.273-7.133a2.47 2.47 0 00-.003-3.537z"></path><path d="M14.485 4.703a.823.823 0 000-1.18.863.863 0 00-1.204 0l-7.119 6.982a4.115 4.115 0 000 5.9 4.314 4.314 0 006.016 0l7.12-6.982a.823.823 0 000-1.18.863.863 0 00-1.204 0l-7.119 6.982a2.588 2.588 0 01-3.61 0 2.47 2.47 0 010-3.54l7.12-6.982z"></path>
                  </svg>
                }
                title="MCP Server Connections"
                description="Connect to MCP servers to extend AI capabilities with external tools, databases, and services seamlessly. Central auth, access and budget control an security checks. Bye bye chaos!"
                readmeLink="https://docs.getbifrost.ai/features/mcp"
              />
          
              <FeatureCard
                plan="oss"
                icon={<KeyIcon className="h-7 w-7" />}
                title="Virtual Key Management"
                description="Create different virtual keys for different use-cases with independent budgets and access control."
                readmeLink="https://docs.getbifrost.ai/features/governance#configuration"
              />

              <FeatureCard
                plan="oss"
                icon={<PlugZapIcon className="w-7 h-7" />}
                title="Unified Interface"
                description="One consistent API for all providers. Switch models without changing code."
              />

              <FeatureCard
                plan="oss"
                icon={<ReplaceIcon className="w-7 h-7" />}
                title="Drop-in Replacement"
                description="Replace your existing SDK with just one line change. Compatible with OpenAI, Anthropic, LiteLLM, Google Genai, Langchain and more."
                readmeLink="https://docs.getbifrost.ai/features/drop-in-replacement"
              />

              <FeatureCard
                plan="oss"
                icon={<TelescopeIcon className="w-7 h-7" />}
                title="Built-in Observability"
                description="Out-of-the-box OpenTelemetry support for observability. Built-in dashboard for quick glances without any complex setup."
                readmeLink="https://docs.getbifrost.ai/features/tracing"
              />

              <FeatureCard
                plan="oss"
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                }
                title="Community Support"
                description="Active Discord community with responsive support and regular updates."
                readmeLink="https://getmax.im/bifrost-discord"
                readmeLinkTitle="Join the community"
              />
            </div>
          </div>

          {/* Enterprise Features */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Enterprise Features</h3>
            </div>
            
            <div className="space-y-6">
              <FeatureCard
                plan="enterprise"
                icon={<ShieldIcon className="h-7 w-7" />}
                title="Governance"
                description="SAML support for SSO and Role-based access control and policy enforcement for team collaboration."
                readmeLink="https://docs.getbifrost.ai/enterprise/governance"
              />

              <FeatureCard
                plan="enterprise"
                icon={<ArrowUpDown className="h-7 w-7" />}
                title="Adaptive Load Balancing"
                description="Automatically optimizes traffic distribution across provider keys and models based on real-time performance metrics."
                readmeLink="https://docs.getbifrost.ai/enterprise/intelligent-load-balancing"
              />

              <FeatureCard
                plan="enterprise"
                icon={<NetworkIcon className="h-7 w-7" />}
                title="Cluster Mode"
                description="High availability deployment with automatic failover and load balancing. Peer-to-peer clustering where every instance is equal."
                readmeLink="https://docs.getbifrost.ai/enterprise/clustering"
              />

              <FeatureCard
                plan="enterprise"
                icon={<SirenIcon className="h-7 w-7" />}
                title="Alerts"
                description="Real-time notifications for budget limits, failures, and performance issues on Email, Slack, PagerDuty, Teams, Webhook and more."                
              />

              <FeatureCard
                plan="enterprise"
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                }
                title="VPC Deployment"
                description="Deploy Bifrost within your private cloud infrastructure with VPC isolation, custom networking, and enhanced security controls for enterprise environments. Supports Google Cloud Platform, Amazon Web Services, Microsoft Azure, Cloudflare, and Vercel."
                readmeLink="https://docs.getbifrost.ai/enterprise/invpc-deployments"
              />

              <FeatureCard
                plan="enterprise"
                icon={<FileUpIcon className="h-7 w-7" />}
                title="Log Exports"
                description="Export and analyze request logs, traces, and telemetry data from Bifrost with enterprise-grade data export capabilities for compliance, monitoring, and analytics."
                readmeLink="https://docs.getbifrost.ai/enterprise/log-exports"
              />

              <FeatureCard
                plan="enterprise"
                icon={<VaultIcon className="h-7 w-7" />}
                title="Vault Support"
                description="Secure API key management with HashiCorp Vault, AWS Secrets Manager, Google Secret Manager, and Azure Key Vault integration. Store and retrieve sensitive credentials using enterprise-grade secret management."
                readmeLink="https://docs.getbifrost.ai/enterprise/vault-support"
              />

              <FeatureCard
                plan="enterprise"
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                }
                title="Audit Logs"
                description="Comprehensive logging and audit trails for compliance and debugging."                
              />
             
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}