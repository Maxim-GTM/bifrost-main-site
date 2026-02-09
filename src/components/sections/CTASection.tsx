'use client'

import Link from 'next/link'
import { EnhancedSection } from '../ui'
import { Button } from '@/components/ui/Button'

export function CTASection() {
  return (
    <EnhancedSection
      className="bg-gradient-to-br from-green-50 via-white to-green-50/50 py-20 lg:py-32"
      backgroundElements={
        <>
          {/* CTA section background elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="animate-morph absolute top-10 left-1/4 h-40 w-40 rounded-full bg-green-100/40 blur-3xl"></div>
            <div
              className="animate-morph absolute right-1/4 bottom-10 h-48 w-48 rounded-full bg-green-50/50 blur-3xl"
              style={{ animationDelay: '4s' }}
            ></div>
            <div
              className="animate-drift absolute top-1/2 left-10 h-20 w-20 rounded-full bg-green-200/30 blur-2xl"
              style={{ animationDelay: '2s' }}
            ></div>
            <div
              className="animate-float absolute top-1/3 right-10 h-24 w-24 rounded-full bg-green-100/35 blur-2xl"
              style={{ animationDelay: '1.5s' }}
            ></div>
          </div>
        </>
      }
    >
      <div className="mx-auto max-w-[1200px] px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 lg:text-4xl">
          Ready to build reliable AI applications?
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-600 lg:text-xl">
          Join developers who trust Bifrost for their AI infrastructure
        </p>
        <Link
          href="https://calendly.com/maximai/bifrost-demo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button size="lg">Book a demo</Button>
        </Link>
      </div>
    </EnhancedSection>
  )
}
