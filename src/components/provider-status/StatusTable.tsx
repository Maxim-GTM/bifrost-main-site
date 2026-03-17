'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import StatusIndicator from './StatusIndicator'
import type { ProviderStatusSummary } from '@/lib/provider-status/types'
import type { StatusProviderConfig } from '@/lib/provider-status/providers'
import { getProviderStatusBaseUrl } from '@/lib/utils'

interface ProviderWithStatus extends ProviderStatusSummary {
  provider: StatusProviderConfig
}

interface StatusTableProps {
  statuses: ProviderWithStatus[]
}

export default function StatusTable({ statuses }: StatusTableProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredStatuses = useMemo(() => {
    let results = statuses

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      results = results.filter(
        (s) =>
          s.provider.name.toLowerCase().includes(query) ||
          s.provider.aliases.some((a) => a.toLowerCase().includes(query))
      )
    }

    if (filterStatus !== 'all') {
      results = results.filter((s) => s.status === filterStatus)
    }

    return results
  }, [statuses, searchQuery, filterStatus])

  const statusCounts = useMemo(() => {
    const counts = { operational: 0, issues: 0, unknown: 0 }
    for (const s of statuses) {
      if (s.status === 'operational') counts.operational++
      else if (s.status === 'unknown') counts.unknown++
      else counts.issues++
    }
    return counts
  }, [statuses])

  const baseUrl = getProviderStatusBaseUrl()

  return (
    <div>
      {/* Search and Filter Bar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <svg
            className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search providers (e.g., ChatGPT, Claude, Gemini...)"
            className="w-full rounded-none border border-gray-200 bg-white py-2 pr-4 pl-10 font-mono text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[#35c09e]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          {[
            { value: 'all', label: `All (${statuses.length})` },
            { value: 'operational', label: `Up (${statusCounts.operational})` },
            { value: 'issues', label: `Issues (${statusCounts.issues})` },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilterStatus(opt.value)}
              className={`rounded-none border px-3 py-1.5 font-mono text-xs font-medium transition-colors ${
                filterStatus === opt.value
                  ? 'border-[#35c09e] bg-[#35c09e]/5 text-[#35c09e]'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden border border-gray-200 bg-white">
        {/* Header */}
        <div className="hidden border-b border-gray-200 bg-gray-50/80 sm:block">
          <div className="grid grid-cols-12 gap-4 px-5 py-3">
            <div className="col-span-4 font-mono text-xs font-medium tracking-wider text-gray-500 uppercase">
              Provider
            </div>
            <div className="col-span-3 font-mono text-xs font-medium tracking-wider text-gray-500 uppercase">
              Status
            </div>
            <div className="col-span-2 font-mono text-xs font-medium tracking-wider text-gray-500 uppercase">
              Incidents
            </div>
            <div className="col-span-2 font-mono text-xs font-medium tracking-wider text-gray-500 uppercase">
              Components
            </div>
            <div className="col-span-1 font-mono text-xs font-medium tracking-wider text-gray-500 uppercase">
              &nbsp;
            </div>
          </div>
        </div>

        {/* Rows */}
        {filteredStatuses.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <p className="font-mono text-sm text-gray-400">
              No providers match your search.
            </p>
          </div>
        ) : (
          filteredStatuses.map((item, idx) => {
            const operationalComponents = item.components.filter(
              (c) => c.status === 'operational'
            ).length
            const totalComponents = item.components.length

            return (
              <Link
                key={item.providerId}
                href={`${baseUrl}/provider-status/${item.provider.id}`}
                className={`block transition-colors hover:bg-gray-50/80 ${
                  idx < filteredStatuses.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                {/* Desktop */}
                <div className="hidden grid-cols-12 items-center gap-4 px-5 py-4 sm:grid">
                  <div className="col-span-4 flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-none border border-gray-100 bg-white p-1">
                      <Image
                        src={item.provider.logoPath}
                        alt={item.provider.name}
                        width={20}
                        height={20}
                        className="h-5 w-5 object-contain"
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {item.provider.name}
                    </span>
                  </div>
                  <div className="col-span-3">
                    <StatusIndicator status={item.status} size="sm" />
                  </div>
                  <div className="col-span-2">
                    {item.activeIncidents > 0 ? (
                      <span className="inline-flex items-center gap-1 font-mono text-xs font-medium text-orange-600">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-orange-500" />
                        {item.activeIncidents} active
                      </span>
                    ) : (
                      <span className="font-mono text-xs text-gray-400">None</span>
                    )}
                  </div>
                  <div className="col-span-2">
                    {totalComponents > 0 ? (
                      <span className="font-mono text-xs text-gray-500">
                        {operationalComponents}/{totalComponents} up
                      </span>
                    ) : (
                      <span className="font-mono text-xs text-gray-400">—</span>
                    )}
                  </div>
                  <div className="col-span-1 text-right">
                    <svg
                      className="inline h-4 w-4 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Mobile */}
                <div className="flex items-center justify-between px-4 py-3 sm:hidden">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-none border border-gray-100 bg-white p-1">
                      <Image
                        src={item.provider.logoPath}
                        alt={item.provider.name}
                        width={20}
                        height={20}
                        className="h-5 w-5 object-contain"
                      />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-900">
                        {item.provider.name}
                      </span>
                      {item.activeIncidents > 0 && (
                        <span className="ml-2 font-mono text-xs text-orange-600">
                          {item.activeIncidents} incident{item.activeIncidents !== 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  </div>
                  <StatusIndicator status={item.status} showText={false} size="sm" />
                </div>
              </Link>
            )
          })
        )}
      </div>
    </div>
  )
}
