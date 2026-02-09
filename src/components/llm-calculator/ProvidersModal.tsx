'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { formatProviderName } from '@/lib/llm-calculator/api'
import { getCostCalculatorBaseUrl } from '@/lib/utils'

interface Provider {
  name: string
  count: number
}

interface ProvidersModalProps {
  providers: Provider[]
  isOpen: boolean
  onClose: () => void
}

export default function ProvidersModal({ providers, isOpen, onClose }: ProvidersModalProps) {
  const [searchQuery, setSearchQuery] = useState('')

  // Filter providers based on search
  const filteredProviders = providers.filter((provider) =>
    provider.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex max-h-[80vh] w-full max-w-4xl flex-col rounded-lg bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">All Providers</h2>
            <p className="mt-1 text-sm text-gray-600">
              {filteredProviders.length} of {providers.length} providers
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 transition-colors hover:text-gray-600"
            aria-label="Close modal"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="border-b border-gray-200 p-6">
          <input
            type="text"
            placeholder="Search providers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
            autoFocus
          />
        </div>

        {/* Providers Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex flex-wrap gap-2">
            {filteredProviders.map((provider) => (
              <Link
                key={provider.name}
                href={`${getCostCalculatorBaseUrl()}/llm-cost-calculator/provider/${encodeURIComponent(provider.name)}`}
                onClick={onClose}
                className="llm-calc-provider-tag"
              >
                {formatProviderName(provider.name)} ({provider.count})
              </Link>
            ))}
          </div>
          {filteredProviders.length === 0 && (
            <div className="py-12 text-center text-gray-500">
              No providers found matching &quot;{searchQuery}&quot;
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
