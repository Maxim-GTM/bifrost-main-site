'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function CTAModal() {
  return (
    <div className="mt-auto mb-12 hidden w-full lg:block">
      <div
        className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-[#1E293B] to-[#1a2d2a] text-white"
        style={{
          boxShadow:
            '0 4px 6px -1px rgba(59, 183, 143, 0.1), 0 2px 4px -1px rgba(59, 183, 143, 0.06)',
        }}
      >
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-[rgba(59,183,143,0.2)] blur-3xl transition-all duration-700 hover:bg-[rgba(59,183,143,0.3)]"></div>
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[rgba(59,183,143,0.1)] blur-2xl"></div>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        ></div>
        <div className="relative flex flex-col items-start gap-8 p-8 md:flex-row md:items-center lg:p-10">
          <div className="flex-grow space-y-5">
            <div className="flex items-center justify-between">
              <Image
                src="https://mintcdn.com/bifrost/qFMmk8bNSnvgFYDI/media/bifrost-logo-dark.png?fit=max&auto=format&n=qFMmk8bNSnvgFYDI&q=85&s=84d264aad5f421c526dd17893e7c5739"
                alt="Bifrost Logo"
                width={120}
                height={32}
                className="h-8 w-auto"
                unoptimized
              />
            </div>
            <div className="space-y-3">
              <h3 className="text-3xl leading-tight font-bold lg:text-4xl">
                Scale with the <span className="text-[#3BB78F]">Fastest LLM Gateway</span>
              </h3>
              <p className="max-w-2xl text-lg leading-relaxed text-gray-300">
                Built for enterprise-grade reliability, governance, and scale.
              </p>
            </div>
          </div>
          <div className="flex w-full shrink-0 flex-col space-y-3 md:w-72">
            <div className="flex items-center justify-center rounded-lg border border-white/10 bg-black/40 px-4 py-3 font-mono text-sm backdrop-blur-sm">
              <span className="mr-2 text-[#3BB78F]">$</span>
              <span className="text-gray-300">npx @maximhq/bifrost</span>
            </div>
            <Link
              className="group relative flex transform items-center justify-center overflow-hidden rounded-lg border border-transparent bg-[#3BB78F] px-4 py-3 font-mono text-sm font-bold tracking-wide text-white uppercase shadow-lg transition-all hover:border-[rgba(59,183,143,0.5)] hover:bg-[#2fa37d] active:scale-95"
              href="https://github.com/maximhq/bifrost"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="relative z-10 flex items-center gap-3">
                Get Started
                <svg
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
              <div className="absolute top-0 left-0 h-3 w-3 -translate-x-0.5 -translate-y-0.5 border-t-2 border-l-2 border-white/40"></div>
              <div className="absolute right-0 bottom-0 h-3 w-3 translate-x-0.5 translate-y-0.5 border-r-2 border-b-2 border-white/40"></div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
