'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import ProvidersModal from './ProvidersModal'
import { formatProviderName } from '@/lib/llm-calculator/api'
import { getCostCalculatorBaseUrl } from '@/lib/utils'

interface Provider {
  name: string
  count: number
}

interface ProvidersListProps {
  providers: Provider[]
  maxVisible?: number
  showAllProvidersParam?: boolean
}

export default function ProvidersList({
  providers,
  maxVisible = 20,
  showAllProvidersParam = false,
}: ProvidersListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const showAllProviders = showAllProvidersParam || searchParams?.get('showAllProviders') === 'true'

  const visibleProviders = showAllProviders ? providers : providers.slice(0, maxVisible)
  const remainingCount = providers.length - maxVisible

  // Open modal if URL parameter is set (for JS-enabled users)
  useEffect(() => {
    if (showAllProviders && !isModalOpen && typeof window !== 'undefined') {
      setIsModalOpen(true)
      // Clean up URL parameter without page reload
      if (searchParams?.get('showAllProviders') === 'true') {
        router.replace(`${getCostCalculatorBaseUrl()}/llm-cost-calculator`, { scroll: false })
      }
    }
  }, [showAllProviders, isModalOpen, router, searchParams])

  return (
    <>
      <div className="llm-calc-provider-list-tags">
        {visibleProviders.map((provider) => (
          <Link
            key={provider.name}
            href={`${getCostCalculatorBaseUrl()}/llm-cost-calculator/provider/${encodeURIComponent(provider.name)}`}
            className="llm-calc-provider-tag"
          >
            {formatProviderName(provider.name)} ({provider.count})
          </Link>
        ))}
        {remainingCount > 0 && (
          <>
            {/* Link for SSR/no-JS support - always visible */}
            <Link
              href={`${getCostCalculatorBaseUrl()}/llm-cost-calculator?showAllProviders=true`}
              className="llm-calc-provider-tag"
              onClick={(e) => {
                // If JS is enabled, prevent default and open modal instead
                if (typeof window !== 'undefined') {
                  e.preventDefault()
                  setIsModalOpen(true)
                }
              }}
            >
              +{remainingCount} more
            </Link>
          </>
        )}
      </div>
      <ProvidersModal
        providers={providers}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
