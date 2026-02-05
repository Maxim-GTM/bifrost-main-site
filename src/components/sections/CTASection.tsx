'use client'

import { EnhancedSection } from '../ui'
import PrimaryButton from '@/components/ui/PrimaryButton'

export function CTASection() {
  return (
    <EnhancedSection
      className="bg-gradient-to-br from-green-50 via-white to-green-50/50 py-20 lg:py-32"
      backgroundElements={
        <>
          {/* CTA section background elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 left-1/4 w-40 h-40 bg-green-100/40 rounded-full blur-3xl animate-morph"></div>
            <div className="absolute bottom-10 right-1/4 w-48 h-48 bg-green-50/50 rounded-full blur-3xl animate-morph" style={{ animationDelay: '4s' }}></div>
            <div className="absolute top-1/2 left-10 w-20 h-20 bg-green-200/30 rounded-full blur-2xl animate-drift" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/3 right-10 w-24 h-24 bg-green-100/35 rounded-full blur-2xl animate-float" style={{ animationDelay: '1.5s' }}></div>
          </div>
        </>
      }
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
          Ready to build reliable AI applications?
        </h2>
        <p className="text-lg lg:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Join developers who trust Bifrost for their AI infrastructure
        </p>
        <PrimaryButton
          href="https://calendly.com/maximai/bifrost-demo"
          external
          className="px-10 py-4 text-lg"
        >
          Book a demo
        </PrimaryButton>
      </div>
    </EnhancedSection>
  )
} 