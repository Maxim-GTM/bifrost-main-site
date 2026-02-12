'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'

const links = [
  {
    name: 'Features',
    links: [
      {
        name: 'Guardrails',
        link: 'https://docs.getbifrost.ai/enterprise/guardrails?utm_medium=Bifrost_Footer',
      },
      {
        name: 'Adaptive Load Balancing',
        link: 'https://docs.getbifrost.ai/enterprise/adaptive-load-balancing?utm_medium=Bifrost_Footer',
      },
      {
        name: 'Governance',
        link: 'https://docs.getbifrost.ai/enterprise/advanced-governance?utm_medium=Bifrost_Footer',
      },
      {
        name: 'Observability',
        link: 'https://docs.getbifrost.ai/features/observability/default?utm_medium=Bifrost_Footer',
      },
      {
        name: 'MCP Gateway',
        link: 'https://docs.getbifrost.ai/mcp/overview?utm_medium=Bifrost_Footer',
      },
      {
        name: 'Vault Support',
        link: 'https://docs.getbifrost.ai/enterprise/vault-support?utm_medium=Bifrost_Footer',
      },
      {
        name: 'In VPC Deployments',
        link: 'https://docs.getbifrost.ai/enterprise/invpc-deployments?utm_medium=Bifrost_Footer',
      },
      {
        name: 'Custom Plugins',
        link: 'https://docs.getbifrost.ai/enterprise/custom-plugins?utm_medium=Bifrost_Footer',
      },
      {
        name: 'Role-Based Access Control',
        link: 'https://docs.getbifrost.ai/enterprise/rbac?utm_medium=Bifrost_Footer',
      },
      {
        name: 'Cost Optimization',
        link: 'https://docs.getbifrost.ai/features/governance/budget-and-limits?utm_medium=Bifrost_Footer',
      },
      {
        name: 'LiteLLM Compatibility',
        link: 'https://docs.getbifrost.ai/features/litellm-compat?utm_medium=Bifrost_Footer',
      },
      {
        name: 'Telemetry',
        link: 'https://docs.getbifrost.ai/features/telemetry?utm_medium=Bifrost_Footer',
      },
      {
        name: 'Semantic Caching',
        link: 'https://docs.getbifrost.ai/features/semantic-caching?utm_medium=Bifrost_Footer',
      },
    ],
  },
  {
    name: 'Developers',
    links: [
      {
        name: 'Enterprise',
        link: 'https://bifrost-site.getmaxim.ai/enterprise?utm_medium=Bifrost_Footer',
      },
      {
        name: 'Github',
        link: 'https://github.com/maximhq/bifrost',
      },
      {
        name: 'Docs',
        link: 'https://docs.getbifrost.ai/quickstart/gateway/setting-up?utm_medium=Bifrost_Footer',
      },
      {
        name: 'Community',
        link: 'https://discord.com/invite/EN6EMhQduQ',
      },
      {
        name: 'API Reference',
        link: 'https://docs.getbifrost.ai/api-reference/models/list-available-models?utm_medium=Bifrost_Footer',
      },
      {
        name: 'Integrations',
        link: 'https://docs.getbifrost.ai/quickstart/gateway/integrations?utm_medium=Bifrost_Footer',
      },
      {
        name: 'Developer Guides',
        link: 'https://docs.getbifrost.ai/contributing/setting-up-repo?utm_medium=Bifrost_Footer',
      },
      {
        name: 'Deployment Guides',
        link: 'https://docs.getbifrost.ai/deployment-guides/k8s?utm_medium=Bifrost_Footer',
      },
      {
        name: 'Architecture',
        link: 'https://docs.getbifrost.ai/architecture/core/concurrency?utm_medium=Bifrost_Footer',
      },
      {
        name: 'Changelog',
        link: 'https://docs.getbifrost.ai/changelogs?utm_medium=Bifrost_Footer',
      },
      {
        name: 'OSS Friends',
        link: 'https://www.getmaxim.ai/bifrost/oss-friends?utm_medium=Bifrost_Footer',
      },
    ],
  },
  {
    name: 'Resources',
    links: [
      {
        name: 'LLM Cost Calculator',
        link: 'https://www.getmaxim.ai/bifrost/llm-cost-calculator?utm_medium=Bifrost_Footer',
      },
      {
        name: 'Benchmarks',
        link: 'https://docs.getbifrost.ai/benchmarking/getting-started?utm_medium=Bifrost_Footer',
      },
      {
        name: 'Developer Guides',
        link: 'https://docs.getbifrost.ai/contributing/setting-up-repo?utm_medium=Bifrost_Footer',
      },
      {
        name: 'Deployment Guides',
        link: 'https://docs.getbifrost.ai/deployment-guides/k8s?utm_medium=Bifrost_Footer',
      },
      {
        name: 'Architecture',
        link: 'https://docs.getbifrost.ai/architecture/core/concurrency?utm_medium=Bifrost_Footer',
      },
      {
        name: 'Blogs',
        link: 'https://www.getmaxim.ai/bifrost/blog?utm_medium=Bifrost_Footer',
      },
    ],
  },
  {
    name: 'Company',
    links: [
      {
        name: 'Book a Demo',
        link: 'https://www.getmaxim.ai/bifrost/book-a-demo?utm_medium=Bifrost_Footer',
      },
      {
        name: 'Security',
        link: 'https://trust.getmaxim.ai/?utm_medium=Bifrost_Footer',
      },
      {
        name: 'Careers',
        link: 'https://www.getmaxim.ai/careers?utm_medium=Bifrost_Footer',
      },
      { name: 'Contact Us', link: 'mailto:conatct@getmaxim.ai' },
      {
        name: 'Terms of Service',
        link: 'https://www.getmaxim.ai/terms-of-service?utm_medium=Bifrost_Footer',
      },
      {
        name: 'Privacy Policy',
        link: 'https://www.getmaxim.ai/privacy-policy?utm_medium=Bifrost_Footer',
      },
    ],
  },
]

// Bifrost Logo SVG Component
function BifrostLogo({ className = '' }: { className?: string }) {
  return (
    <svg width="464" height="90" viewBox="0 0 464 110" fill="none" className={className}>
      <path
        d="M157.368 9.35449C166.274 9.35449 173.168 11.4075 178.049 15.5146C183.015 19.6218 185.499 24.97 185.499 31.5586C185.499 36.5214 184.214 40.6717 181.646 44.0088C179.162 47.2604 176.036 49.5713 172.269 50.9404C175.78 52.0528 178.82 53.7215 181.389 55.9463C183.958 58.171 185.97 60.7806 187.426 63.7754C188.882 66.7703 189.609 70.1077 189.609 73.7871C189.609 78.5789 188.496 82.9004 186.27 86.751C184.129 90.6014 180.917 93.6386 176.636 95.8633C172.354 98.088 167.002 99.2011 160.58 99.2012H124.871V9.35449H157.368ZM256.408 21.1377H252.64C249.521 21.1377 247.311 21.7779 246.012 23.0576C244.712 24.252 244.063 26.2997 244.062 29.2002L244.063 35.2148H257.838V46.6045H244.063L244.062 99.2002H230.288V46.6045H221.711V35.2148H230.288V29.0723C230.288 22.1619 232.064 17.2135 235.616 14.2275C239.168 11.1564 244.107 9.62109 250.431 9.62109H256.408V21.1377ZM302.655 49.2705H298.93C292.85 49.2705 288.312 50.8537 285.314 54.0195C282.317 57.0999 280.818 61.8492 280.818 68.2666V99.2002H267.203V36.5635H280.305L280.69 47.3457C282.831 43.4952 285.743 40.5005 289.425 38.3613C293.193 36.1366 297.603 35.0234 302.655 35.0234V49.2705ZM334.774 35.0234C340.624 35.0234 345.906 36.2991 350.618 38.8496C355.331 41.4002 359.108 45.0619 361.952 49.834C364.796 54.606 366.218 60.3239 366.218 66.9883C366.218 73.2414 364.837 78.7951 362.074 83.6494C359.393 88.5037 355.656 92.3295 350.862 95.127C346.069 97.8421 340.543 99.2002 334.287 99.2002C328.437 99.2002 323.156 97.9246 318.443 95.374C313.812 92.7412 310.116 88.9976 307.354 84.1436C304.672 79.2892 303.331 73.5705 303.331 66.9883C303.331 60.4062 304.712 54.729 307.475 49.957C310.318 45.185 314.097 41.5232 318.81 38.9727C323.603 36.34 328.925 35.0235 334.774 35.0234ZM393.257 35.0234C399.905 35.0235 405.445 36.7107 409.877 40.084C414.309 43.375 416.77 48.2292 417.263 54.6465H404.706C404.378 51.767 403.146 49.5456 401.013 47.9824C398.961 46.4192 396.294 45.6378 393.011 45.6377C389.974 45.6377 387.512 46.2543 385.624 47.4883C383.736 48.6402 382.792 50.4099 382.792 52.7959C382.792 54.4413 383.449 55.8404 384.762 56.9922C386.075 58.0617 387.758 58.9666 389.81 59.707C391.943 60.3652 394.159 60.9817 396.457 61.5576C400.643 62.4626 404.377 63.5742 407.66 64.8906C410.943 66.2071 413.57 68.0583 415.54 70.4443C417.51 72.8303 418.535 76.1215 418.617 80.3174C418.617 84.1021 417.55 87.4348 415.416 90.3145C413.364 93.1116 410.533 95.2923 406.922 96.8555C403.393 98.4187 399.329 99.2002 394.733 99.2002C389.973 99.2001 385.624 98.3769 381.685 96.7314C377.745 95.0036 374.543 92.5767 372.081 89.4502C369.619 86.3237 368.183 82.6619 367.772 78.4658H380.945C381.52 81.4278 383.039 83.8557 385.501 85.748C387.963 87.6401 391.041 88.5859 394.733 88.5859C398.016 88.5859 400.684 87.887 402.736 86.4883C404.788 85.0073 405.813 83.0735 405.813 80.6875C405.813 78.6306 405.116 77.0259 403.721 75.874C402.408 74.7223 400.684 73.8173 398.551 73.1592C396.499 72.501 394.241 71.9253 391.779 71.4316C388.004 70.5266 384.433 69.416 381.068 68.0996C377.785 66.7832 375.118 64.9727 373.066 62.6689C371.015 60.3653 369.988 57.2799 369.988 53.4131C369.988 49.6284 370.974 46.3782 372.943 43.6631C374.995 40.8657 377.785 38.7261 381.314 37.2451C384.844 35.7641 388.825 35.0234 393.257 35.0234ZM212.716 99.1992H199.101L198.963 35.0234H212.578L212.716 99.1992ZM447.219 35.0234H463.404V46.4463H447.219L447.22 79.4336C447.22 82.6849 447.948 84.8671 449.403 85.9795C450.859 87.0919 453.129 87.6475 456.212 87.6475H463.405V99.1992H453.386C447.049 99.1992 442.168 97.6595 438.742 94.5791C435.317 91.4987 433.605 86.45 433.604 79.4336L433.604 46.4463H423.97V35.0234H433.604L433.604 20.1348H447.22L447.219 35.0234ZM334.531 46.3779C330.713 46.3779 327.422 47.2827 324.659 49.0928C321.978 50.9029 319.906 53.3715 318.443 56.498C317.062 59.5422 316.372 63.0391 316.372 66.9883C316.372 71.5135 317.185 75.3393 318.81 78.4658C320.516 81.5924 322.75 83.9377 325.513 85.501C328.275 87.0641 331.241 87.8457 334.409 87.8457C337.984 87.8457 341.153 86.9408 343.915 85.1309C346.759 83.3208 348.993 80.8521 350.618 77.7256C352.243 74.5168 353.056 70.8967 353.056 66.8652C353.056 62.7514 352.243 59.1722 350.618 56.1279C349.074 53.0014 346.922 50.6153 344.159 48.9697C341.397 47.2419 338.187 46.378 334.531 46.3779ZM138.486 87.6494H158.14C163.877 87.6493 168.244 86.4082 171.241 83.9268C174.324 81.4453 175.865 77.6803 175.865 72.6318C175.865 67.4977 174.238 63.6895 170.984 61.208C167.73 58.7266 163.362 57.4863 157.882 57.4863H138.486V87.6494ZM138.486 46.1914H156.341C161.393 46.1914 165.203 45.079 167.772 42.8545C170.341 40.6297 171.626 37.5061 171.626 33.4844C171.626 29.4627 170.341 26.339 167.772 24.1143C165.289 21.8897 161.35 20.7773 155.955 20.7773H138.486V46.1914ZM205.908 9.07422C208.477 9.07422 210.618 9.93023 212.331 11.6416C214.129 13.3529 215.028 15.4493 215.028 17.9307C215.028 20.4976 214.129 22.6797 212.331 24.4766C210.618 26.1879 208.477 27.0439 205.908 27.0439C203.425 27.0439 201.284 26.1879 199.485 24.4766C197.773 22.6797 196.917 20.4975 196.917 17.9307C196.917 15.4494 197.773 13.3529 199.485 11.6416C201.284 9.93026 203.425 9.07424 205.908 9.07422Z"
        fill="black"
      />
      <path
        d="M65.8047 109.59H0V87.6719H65.8047V109.59ZM87.7393 87.6719H65.8047V65.7539H87.7393V87.6719ZM43.8701 65.7539H21.9355V43.8359H43.8701V65.7539ZM87.7393 43.8359H65.8047V21.918H87.7393V43.8359ZM65.8047 21.918H0V0H65.8047V21.918Z"
        fill="#33C19E"
      />
    </svg>
  )
}

export function Footer() {
  return (
    <div className="flex w-full flex-col justify-center border-t border-black/10">
      <div className="flex w-full justify-center bg-[#f9f9f9]">
        {/* Left Side Decoration - Box Style */}
        <div className="hidden w-20 flex-none flex-col items-end gap-4 border-r border-black/10 xl:flex">
          <div
            className="h-full w-full bg-[#F6F6F6] opacity-[0.07]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='4' y='4' width='4' height='4' fill='black'/%3E%3Crect y='8' width='4' height='4' fill='black'/%3E%3Crect x='8' width='4' height='4' fill='black'/%3E%3C/svg%3E")`,
              backgroundSize: '4px 4px',
            }}
          ></div>
        </div>

        <div className="h-20 w-full max-w-[1100px]"></div>

        {/* Right Side Decoration */}
        <div className="hidden w-20 flex-none flex-col items-start gap-4 border-l border-black/10 xl:flex">
          <div
            className="h-full w-full bg-[#F6F6F6] opacity-[0.07]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='4' y='4' width='4' height='4' fill='black'/%3E%3Crect y='8' width='4' height='4' fill='black'/%3E%3Crect x='8' width='4' height='4' fill='black'/%3E%3C/svg%3E")`,
              backgroundSize: '4px 4px',
            }}
          ></div>
        </div>
      </div>

      <footer className="flex w-full justify-center bg-[#f9f9f9]">
        <div className="flex-1 border-t border-black/10"></div>

        {/* Left Side Decoration - Box Style */}
        <div className="hidden w-20 flex-none flex-col items-end gap-4 border-r border-black/10 xl:flex">
          <div
            className="h-full w-full bg-[#F6F6F6] opacity-[0.07]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='4' y='4' width='4' height='4' fill='black'/%3E%3Crect y='8' width='4' height='4' fill='black'/%3E%3Crect x='8' width='4' height='4' fill='black'/%3E%3C/svg%3E")`,
              backgroundSize: '4px 4px',
            }}
          ></div>
        </div>

        <div className="w-full max-w-[1100px] border-t border-black/10 px-4 pt-4 sm:px-16 sm:pt-8 md:px-24 md:pt-16">
          {/* CTA Section */}
          <div className="mx-auto">
            <div className="relative border border-gray-200 bg-white px-6 py-12">
              <div className="absolute top-1 left-1 size-1.5 rounded-md border border-black/10"></div>
              <div className="absolute top-1 right-1 size-1.5 rounded-md border border-black/10"></div>
              <div className="absolute top-[50%] right-1 size-1.5 rounded-md border border-black/10"></div>
              <div className="absolute bottom-1 left-1 size-1.5 rounded-md border border-black/10"></div>
              <div className="absolute bottom-[50%] left-1 size-1.5 rounded-md border border-black/10"></div>
              <div className="absolute right-1 bottom-1 size-1.5 rounded-md border border-black/10"></div>
              <div className="flex flex-col items-center text-center">
                {/* Headline */}
                <h2 className="mb-2 text-xl font-medium text-gray-900 md:text-2xl">
                  Ready to build reliable AI applications?
                </h2>

                {/* Subtitle */}
                <p className="mb-8 max-w-lg text-gray-500">
                  Join developers who trust Bifrost for their AI infrastructure
                </p>

                {/* CTA Button */}
                <Button asChild variant="primary">
                  <Link
                    href="https://www.getmaxim.ai/bifrost/book-a-demo"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book a Demo
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="mx-auto font-sans text-gray-600">
            <div className="mx-auto max-w-7xl border-x border-b border-gray-200 px-8 py-8">
              {/* Layout Wrapper: Flex Col on Mobile, Flex Row on Desktop */}
              <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
                {/* LEFT SECTION: Branding, Copyright, Compliance */}
                <div className="w-fit flex-1 space-y-4">
                  {/* Logo Area */}
                  <div className="flex items-center gap-2">
                    <Link href="https://getbifrost.ai">
                      <BifrostLogo className="h-6 w-auto -translate-x-2" />
                    </Link>
                  </div>

                  {/* Copyright */}
                  <p className="text-sm text-gray-500">
                    © 2025 H3 Labs Inc. Open source under Apache 2.0 License.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <img src="/soc.png" alt="AICPA SOC" className="h-12 w-auto object-contain" />
                    <img src="/gdpr.png" alt="GDPR" className="h-12 w-auto object-contain" />
                    <img src="/iso.png" alt="ISO" className="h-12 w-auto object-contain" />
                    <img src="/hipaa.png" alt="HIPAA" className="h-12 w-auto object-contain" />
                  </div>
                </div>

                <div className="grid w-fit flex-2 grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-2">
                  {links.map((link, i) => (
                    <div key={`footer-link-${i}`} className="space-y-2">
                      <h3 className="text-xs font-medium tracking-wide text-[var(--primary)] uppercase">
                        [ {link.name} ]
                      </h3>
                      <ul className="space-y-1 font-mono text-gray-500">
                        {link.links.map((l) => (
                          <li key={l.name}>
                            <Link href={l.link} className="text-xs transition-colors">
                              {l.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - Full Width */}
          <div className="order-gray-200 mx-auto">
            <div className="flex flex-col items-center justify-between gap-4 border-x border-gray-200 px-4 py-2 sm:flex-row sm:px-6 lg:px-8">
              {/* Made with love */}
              <p className="text-[12px] tracking-wide text-gray-400 uppercase">
                Made with lots of ❤️ by{' '}
                <Link
                  href="https://www.getmaxim.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#33C19E] underline transition-all hover:no-underline"
                >
                  Maxim Team
                </Link>
              </p>

              {/* Badges */}
              <div className="flex items-center gap-2">
                {/* Product Hunt Badge */}
                <Link
                  href="https://www.producthunt.com/products/maxim-ai?embed=true&utm_source=badge-top-post-badge&utm_medium=badge&utm_source=badge-bifrost-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-40 items-center justify-center gap-2 border border-gray-200 bg-white px-3 py-2 transition-all"
                >
                  <img src="/producthunt.png" alt="Product Hunt" className="h-6" />
                </Link>

                {/* Peerlist Badge */}
                <Link
                  href="https://peerlist.io/getmaximai/project/bifrost"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-40 items-center justify-center gap-2 border border-gray-200 bg-white px-3 py-2 transition-all"
                >
                  <img src="/peerlist.svg" alt="Peerlist" className="h-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Decoration */}
        <div className="hidden w-20 flex-none flex-col items-start gap-4 border-l border-black/10 xl:flex">
          <div
            className="h-full w-full bg-[#F6F6F6] opacity-[0.07]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='4' y='4' width='4' height='4' fill='black'/%3E%3Crect y='8' width='4' height='4' fill='black'/%3E%3Crect x='8' width='4' height='4' fill='black'/%3E%3C/svg%3E")`,
              backgroundSize: '4px 4px',
            }}
          ></div>
        </div>

        <div className="flex-1 border-t border-black/10" />
      </footer>
    </div>
  )
}
