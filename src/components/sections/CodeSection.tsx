'use client'

import { EnhancedSection } from '../ui'
import { TypewriterCode } from '../ui/TypewriterCode'

export function CodeSection() {
  return (
    <EnhancedSection
      className="border-t border-gray-200 bg-white py-20 lg:py-32"
      backgroundElements={
        <>
          {/* Code section background elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="animate-drift absolute top-40 left-10 h-24 w-24 rounded-full bg-gray-100 blur-2xl"></div>
            <div
              className="animate-float absolute right-10 bottom-40 h-32 w-32 rounded-full bg-gray-50 blur-3xl"
              style={{ animationDelay: '3s' }}
            ></div>
            <div
              className="absolute top-20 right-1/3 h-16 w-16 animate-pulse rounded-full bg-gray-100/50 blur-xl"
              style={{ animationDelay: '1s' }}
            ></div>
          </div>
        </>
      }
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center lg:mb-20">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 lg:text-4xl">
            Get started in minutes
          </h2>
          <p className="text-lg text-gray-600 lg:text-xl">Simple configuration, powerful results</p>
        </div>
        <div className="mx-auto max-w-4xl">
          <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900 p-8 shadow-2xl">
            <TypewriterCode />
          </div>
        </div>
      </div>
    </EnhancedSection>
  )
}
