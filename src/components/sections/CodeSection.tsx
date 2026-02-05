'use client'

import { EnhancedSection } from '../ui'
import { TypewriterCode } from '../ui/TypewriterCode'

export function CodeSection() {
  return (
    <EnhancedSection 
      className="bg-white border-t border-gray-200 py-20 lg:py-32"
      backgroundElements={
        <>
          {/* Code section background elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-40 left-10 w-24 h-24 bg-gray-100 rounded-full blur-2xl animate-drift"></div>
            <div className="absolute bottom-40 right-10 w-32 h-32 bg-gray-50 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
            <div className="absolute top-20 right-1/3 w-16 h-16 bg-gray-100/50 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </>
      }
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Get started in minutes
          </h2>
          <p className="text-lg lg:text-xl text-gray-600">Simple configuration, powerful results</p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900 rounded-xl p-8 overflow-x-auto shadow-2xl border border-gray-800">
            <TypewriterCode />
          </div>
        </div>
      </div>
    </EnhancedSection>
  )
} 