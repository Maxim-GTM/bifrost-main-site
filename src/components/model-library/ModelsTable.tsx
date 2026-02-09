'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ProcessedModel } from '@/types/model'
import { formatCurrency, getModeDisplayName } from '@/lib/model-library/calculator'
import { formatProviderName } from '@/lib/model-library/api'
import { getProviderLogo } from '@/lib/model-library/providerLogos'
import { formatTokenCount, formatNumber } from '@/lib/model-library/format'
import { getModelLibraryBaseUrl } from '@/lib/utils'
import Dropdown, { DropdownOption } from './Dropdown'

interface ModelsTableProps {
  models: ProcessedModel[]
  hideProviderFilter?: boolean
  totalModels?: number
  // If "all", the component will fetch a full search index (on-demand) and
  // perform keyword search + filtering client-side across all models.
  searchScope?: 'page' | 'all'
  // Optional provider to scope the search index (used on provider pages).
  searchProvider?: string
  // IDs of server pagination wrappers to hide when client-side search is active.
  serverPaginationContainerId?: string
  // Mode to prioritize in sorting (e.g. for provider pages with filter)
  highlightMode?: string
}

export default function ModelsTable({
  models,
  hideProviderFilter = false,
  totalModels,
  searchScope = 'page',
  searchProvider,
  serverPaginationContainerId,
  highlightMode,
}: ModelsTableProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProvider, setSelectedProvider] = useState<string>('all')
  const [selectedMode, setSelectedMode] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'name' | 'provider' | 'price'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const basePath = `${getModelLibraryBaseUrl()}/model-library`

  const [allModels, setAllModels] = useState<ProcessedModel[] | null>(null)
  const [loadingAllModels, setLoadingAllModels] = useState(false)
  const [allModelsError, setAllModelsError] = useState<string | null>(null)
  const [providerIndex, setProviderIndex] = useState<ProcessedModel[] | null>(null)
  const [loadingProviderIndex, setLoadingProviderIndex] = useState(false)

  const searchActive =
    searchQuery.trim() !== '' || selectedProvider !== 'all' || selectedMode !== 'all'

  const baseModels = useMemo(() => {
    if (searchScope === 'all' && allModels) return allModels
    return models
  }, [searchScope, allModels, models])

  const providerSource = useMemo(() => {
    if (searchProvider) return models
    return providerIndex || allModels || models
  }, [searchProvider, providerIndex, allModels, models])

  // Fetch full search index on-demand
  useEffect(() => {
    if (searchScope !== 'all') return
    if (!searchActive) return
    if (allModels || loadingAllModels) return

    const run = async () => {
      try {
        setLoadingAllModels(true)
        setAllModelsError(null)
        const qs = searchProvider ? `?provider=${encodeURIComponent(searchProvider)}` : ''
        const res = await fetch(`${getModelLibraryBaseUrl()}/api/models${qs}`)
        if (!res.ok) {
          throw new Error(`Failed to load models (${res.status})`)
        }
        const data = (await res.json()) as ProcessedModel[]
        setAllModels(data)
      } catch (e: any) {
        setAllModelsError(e?.message || 'Failed to load models')
      } finally {
        setLoadingAllModels(false)
      }
    }

    run()
  }, [searchScope, searchActive, allModels, loadingAllModels, searchProvider])

  // Fetch providers index once so the dropdown can list all providers.
  useEffect(() => {
    if (hideProviderFilter) return
    if (searchProvider) return
    if (providerIndex || loadingProviderIndex || allModels) return

    const run = async () => {
      try {
        setLoadingProviderIndex(true)
        const res = await fetch(`${getModelLibraryBaseUrl()}/api/models`)
        if (!res.ok) {
          throw new Error(`Failed to load providers (${res.status})`)
        }
        const data = (await res.json()) as ProcessedModel[]
        setProviderIndex(data)
      } catch {
        // If provider index fails, fall back to the current page models.
      } finally {
        setLoadingProviderIndex(false)
      }
    }

    run()
  }, [hideProviderFilter, searchProvider, providerIndex, loadingProviderIndex, allModels])

  // Hide server pagination when client-side search is active (keeps SSR pagination for default view).
  useEffect(() => {
    if (!serverPaginationContainerId) return
    const el = document.getElementById(serverPaginationContainerId)
    if (!el) return

    if (searchScope === 'all' && searchActive) {
      el.classList.add('hidden')
    } else {
      el.classList.remove('hidden')
    }
  }, [serverPaginationContainerId, searchScope, searchActive])

  // Get unique providers and modes
  const providers = useMemo(() => {
    return Array.from(new Set(providerSource.map((m) => m.provider))).sort()
  }, [providerSource])

  const modeSource = providerSource

  const modes = useMemo(() => {
    // Filter out empty/invalid modes
    return Array.from(
      new Set(modeSource.map((m) => m.data.mode).filter((mode) => mode && mode.trim() !== ''))
    ).sort()
  }, [modeSource])

  // Generate search suggestions
  const searchSuggestions = useMemo(() => {
    if (!searchQuery || searchQuery.trim() === '') {
      return []
    }

    const query = searchQuery.toLowerCase()
    const suggestions: Array<{
      type: 'model' | 'provider' | 'mode'
      value: string
      display: string
      subtitle?: string
      model?: ProcessedModel
    }> = []

    // Group models by display name to detect duplicates
    const modelsByName = new Map<string, ProcessedModel[]>()
    baseModels.forEach((model) => {
      const name = model.displayName
      if (!modelsByName.has(name)) {
        modelsByName.set(name, [])
      }
      modelsByName.get(name)!.push(model)
    })

    // Add model name suggestions
    const matchingModels = baseModels.filter(
      (model) =>
        model.displayName.toLowerCase().includes(query) || model.id.toLowerCase().includes(query)
    )

    // If there are multiple models with the same name, show them separately with distinguishing info
    const modelMatches: typeof suggestions = []
    const seenNames = new Set<string>()

    matchingModels.forEach((model) => {
      const sameNameModels = modelsByName.get(model.displayName) || []
      const hasMultipleVariants = sameNameModels.length > 1

      if (hasMultipleVariants) {
        // Show each variant separately with provider/mode info
        if (!seenNames.has(model.displayName)) {
          sameNameModels.forEach((variant) => {
            const subtitle = `${formatProviderName(variant.provider)} • ${getModeDisplayName(variant.data.mode)}`
            modelMatches.push({
              type: 'model' as const,
              value: variant.displayName,
              display: variant.displayName,
              subtitle: subtitle,
              model: variant,
            })
          })
          seenNames.add(model.displayName)
        }
      } else {
        // Single variant, but still show provider/mode for clarity
        if (!seenNames.has(model.displayName)) {
          const subtitle = `${formatProviderName(model.provider)} • ${getModeDisplayName(model.data.mode)}`
          modelMatches.push({
            type: 'model' as const,
            value: model.displayName,
            display: model.displayName,
            subtitle: subtitle,
            model: model,
          })
          seenNames.add(model.displayName)
        }
      }
    })

    // Limit model suggestions and add to main suggestions
    suggestions.push(...modelMatches.slice(0, 8))

    // Add provider suggestions
    const providerMatches = providers
      .filter((provider) => provider.toLowerCase().includes(query))
      .slice(0, 3)
      .map((provider) => ({
        type: 'provider' as const,
        value: provider,
        display: formatProviderName(provider),
      }))
    suggestions.push(...providerMatches)

    // Add mode suggestions
    const modeMatches = modes
      .filter((mode) => mode.toLowerCase().includes(query))
      .slice(0, 3)
      .map((mode) => ({
        type: 'mode' as const,
        value: mode,
        display: getModeDisplayName(mode),
      }))
    suggestions.push(...modeMatches)

    return suggestions.slice(0, 10) // Increased limit to accommodate variants
  }, [searchQuery, baseModels, providers, modes])

  // Handle clicking outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || searchSuggestions.length === 0) {
      if (e.key === 'ArrowDown' && searchSuggestions.length > 0) {
        setShowSuggestions(true)
        setFocusedIndex(0)
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setFocusedIndex((prev) => (prev < searchSuggestions.length - 1 ? prev + 1 : prev))
        break
      case 'ArrowUp':
        e.preventDefault()
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case 'Enter':
        e.preventDefault()
        if (focusedIndex >= 0 && focusedIndex < searchSuggestions.length) {
          const suggestion = searchSuggestions[focusedIndex]
          if (suggestion.type === 'model' && suggestion.model) {
            window.open(
              `${basePath}/compare/${encodeURIComponent(suggestion.model.provider)}/${suggestion.model.slug}`,
              '_blank',
              'noopener,noreferrer'
            )
            setShowSuggestions(false)
            setFocusedIndex(-1)
            searchInputRef.current?.blur()
          } else {
            setSearchQuery(suggestion.value)
            setShowSuggestions(false)
            setFocusedIndex(-1)
            searchInputRef.current?.blur()
          }
        }
        break
      case 'Escape':
        setShowSuggestions(false)
        setFocusedIndex(-1)
        searchInputRef.current?.blur()
        break
    }
  }

  const handleSuggestionClick = (suggestion: (typeof searchSuggestions)[0]) => {
    if (suggestion.type === 'model' && suggestion.model) {
      // Navigate directly to the compare page if it's a model suggestion
      window.open(
        `${basePath}/compare/${encodeURIComponent(suggestion.model.provider)}/${suggestion.model.slug}`,
        '_blank',
        'noopener,noreferrer'
      )
      setShowSuggestions(false)
      setFocusedIndex(-1)
    } else {
      setSearchQuery(suggestion.value)
      setShowSuggestions(false)
      setFocusedIndex(-1)
      searchInputRef.current?.focus()
    }
  }

  // Keyword filter + sort (client-side)
  const getSortablePrice = (model: ProcessedModel) => {
    const data = model.data
    return (
      data.input_cost_per_token ??
      data.output_cost_per_token ??
      data.input_cost_per_image ??
      data.output_cost_per_image ??
      data.input_cost_per_second ??
      data.output_cost_per_second ??
      data.ocr_cost_per_page ??
      Number.POSITIVE_INFINITY
    )
  }

  const getPricingLines = (model: ProcessedModel) => {
    const lines: string[] = []
    const data = model.data

    if (data.input_cost_per_token != null) {
      lines.push(`Input ${formatCurrency(data.input_cost_per_token * 1_000_000)} / 1M tokens`)
    }
    if (data.output_cost_per_token != null) {
      lines.push(`Output ${formatCurrency(data.output_cost_per_token * 1_000_000)} / 1M tokens`)
    }

    if (
      lines.length === 0 &&
      (data.input_cost_per_image != null || data.output_cost_per_image != null)
    ) {
      if (data.input_cost_per_image != null) {
        lines.push(`Input ${formatCurrency(data.input_cost_per_image)} / image`)
      }
      if (data.output_cost_per_image != null) {
        lines.push(`Output ${formatCurrency(data.output_cost_per_image)} / image`)
      }
    }

    if (
      lines.length === 0 &&
      (data.input_cost_per_second != null || data.output_cost_per_second != null)
    ) {
      if (data.input_cost_per_second != null) {
        lines.push(`Input ${formatCurrency(data.input_cost_per_second)} / second`)
      }
      if (data.output_cost_per_second != null) {
        lines.push(`Output ${formatCurrency(data.output_cost_per_second)} / second`)
      }
    }

    if (lines.length === 0 && data.ocr_cost_per_page != null) {
      lines.push(`${formatCurrency(data.ocr_cost_per_page)} / page`)
    }

    return lines
  }

  const filteredAndSortedModels = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    const list = baseModels.filter((model) => {
      const matchesSearch =
        q === '' ||
        model.displayName.toLowerCase().includes(q) ||
        model.provider.toLowerCase().includes(q) ||
        model.data.mode.toLowerCase().includes(q) ||
        model.id.toLowerCase().includes(q)

      const matchesProvider = selectedProvider === 'all' || model.provider === selectedProvider
      const matchesMode = selectedMode === 'all' || model.data.mode === selectedMode

      return matchesSearch && matchesProvider && matchesMode
    })

    list.sort((a, b) => {
      // Prioritize highlightMode if present
      if (highlightMode) {
        const aMatch = a.data.mode === highlightMode
        const bMatch = b.data.mode === highlightMode
        if (aMatch && !bMatch) return -1
        if (!aMatch && bMatch) return 1
      }

      let comparison = 0

      switch (sortBy) {
        case 'name':
          comparison = a.displayName.localeCompare(b.displayName)
          break
        case 'provider':
          comparison = a.provider.localeCompare(b.provider)
          break
        case 'price':
          comparison = getSortablePrice(a) - getSortablePrice(b)
          break
      }

      return sortOrder === 'asc' ? comparison : -comparison
    })

    return list
  }, [baseModels, searchQuery, selectedProvider, selectedMode, sortBy, sortOrder, highlightMode])

  // Client paging only when we have the full index loaded and search/filters are active.
  const PAGE_SIZE = 100
  const [clientPage, setClientPage] = useState(1)

  useEffect(() => {
    setClientPage(1)
  }, [searchQuery, selectedProvider, selectedMode])

  const clientPagingEnabled = searchScope === 'all' && !!allModels && searchActive
  const totalClientPages = Math.max(1, Math.ceil(filteredAndSortedModels.length / PAGE_SIZE))
  const currentClientPage = Math.min(Math.max(1, clientPage), totalClientPages)
  const pagedDisplayedModels = clientPagingEnabled
    ? filteredAndSortedModels.slice(
        (currentClientPage - 1) * PAGE_SIZE,
        currentClientPage * PAGE_SIZE
      )
    : filteredAndSortedModels

  const handleSort = (column: typeof sortBy) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  // Row navigation is handled via <Link> so it works without JS.

  const SortIcon = ({ column }: { column: typeof sortBy }) => {
    if (sortBy !== column) return null
    return sortOrder === 'asc' ? '↑' : '↓'
  }

  return (
    <div className="w-full">
      {/* Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col gap-4 md:flex-row">
          {/* Search */}
          <div className="relative flex-1">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search models, providers..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setShowSuggestions(true)
                setFocusedIndex(-1)
              }}
              onFocus={() => {
                if (searchSuggestions.length > 0) {
                  setShowSuggestions(true)
                }
              }}
              onKeyDown={handleKeyDown}
              className="focus:ring-accent box-border w-full rounded-lg border border-gray-300 px-4 py-2 text-base leading-normal focus:border-transparent focus:ring-2 focus:outline-none"
            />
            {showSuggestions && searchSuggestions.length > 0 && (
              <div
                ref={suggestionsRef}
                className="absolute z-50 mt-1 max-h-64 w-full overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-lg"
              >
                {searchSuggestions.map((suggestion, index) => (
                  <button
                    key={`${suggestion.type}-${suggestion.value}-${index}`}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                    onMouseEnter={() => setFocusedIndex(index)}
                    className={`hover:bg-accent-light w-full px-4 py-2 text-left transition-colors ${
                      index === focusedIndex ? 'bg-accent-light' : ''
                    } ${index === 0 ? 'rounded-t-lg' : ''} ${
                      index === searchSuggestions.length - 1 ? 'rounded-b-lg' : ''
                    }`}
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded px-2 py-0.5 text-xs ${
                            suggestion.type === 'model'
                              ? 'bg-blue-100 text-blue-700'
                              : suggestion.type === 'provider'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-purple-100 text-purple-700'
                          }`}
                        >
                          {suggestion.type === 'model'
                            ? 'Model'
                            : suggestion.type === 'provider'
                              ? 'Provider'
                              : 'Mode'}
                        </span>
                        <span className="font-medium text-gray-900">{suggestion.display}</span>
                      </div>
                      {suggestion.subtitle && (
                        <div className="ml-0 pl-0 text-xs text-gray-500">{suggestion.subtitle}</div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Provider Filter */}
          {!hideProviderFilter && (
            <Dropdown
              options={providers.map((provider) => ({
                value: provider,
                label: formatProviderName(provider),
              }))}
              value={selectedProvider}
              onChange={(v) => {
                setSelectedProvider(v)
              }}
              placeholder="All Providers"
              allOptionLabel="All Providers"
              showAllOption={true}
            />
          )}

          {/* Mode Filter */}
          <Dropdown
            options={modes.map((mode) => ({
              value: mode,
              label: getModeDisplayName(mode),
            }))}
            value={selectedMode}
            onChange={(v) => {
              setSelectedMode(v)
            }}
            placeholder="All Modes"
            allOptionLabel="All Modes"
            showAllOption={true}
          />
        </div>

        {/* Results count */}
        <div className="text-sm text-gray-600">
          {loadingAllModels && searchScope === 'all' && searchActive ? (
            <span>Loading all models…</span>
          ) : (
            <span>
              Showing {pagedDisplayedModels.length} of{' '}
              {clientPagingEnabled
                ? filteredAndSortedModels.length
                : (totalModels ?? models.length)}{' '}
              models
              {clientPagingEnabled && totalClientPages > 1 ? (
                <span className="ml-2 text-gray-500">
                  (Page {currentClientPage} of {totalClientPages})
                </span>
              ) : null}
            </span>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="w-full overflow-x-auto lg:overflow-x-visible">
          <table className="w-full divide-y divide-gray-200 lg:table-auto">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th
                  className="min-w-[200px] cursor-pointer py-3 pr-3 pl-4 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase transition-colors hover:bg-gray-100 sm:min-w-[220px] sm:px-4 sm:py-4 lg:w-[20%]"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-2">
                    Model Name
                    <SortIcon column="name" />
                  </div>
                </th>
                <th
                  className="min-w-[100px] cursor-pointer px-3 py-3 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase transition-colors hover:bg-gray-100 sm:px-4 sm:py-4 lg:w-[11%]"
                  onClick={() => handleSort('provider')}
                >
                  <div className="flex items-center gap-2 leading-tight">
                    Provider
                    <SortIcon column="provider" />
                  </div>
                </th>
                <th className="min-w-[80px] px-3 py-3 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase sm:px-4 sm:py-4 lg:w-[8%]">
                  <div className="leading-tight">Mode</div>
                </th>
                <th
                  className="min-w-[200px] cursor-pointer px-3 py-3 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase transition-colors hover:bg-gray-100 sm:px-4 sm:py-4 lg:w-[20%]"
                  onClick={() => handleSort('price')}
                >
                  <div className="leading-tight">
                    <div className="flex items-center gap-1">
                      <span>Pricing</span>
                      <SortIcon column="price" />
                    </div>
                    <div className="mt-1 hidden text-xs font-normal text-gray-500 sm:block">
                      (tokens, images, audio, or pages)
                    </div>
                  </div>
                </th>
                <th className="hidden min-w-[110px] px-3 py-3 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase sm:px-4 sm:py-4 md:table-cell lg:w-[10%]">
                  <div className="leading-tight">
                    Max Input
                    <br />
                    Tokens
                  </div>
                </th>
                <th className="hidden min-w-[110px] px-3 py-3 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase sm:px-4 sm:py-4 md:table-cell lg:w-[10%]">
                  <div className="leading-tight">
                    Max Output
                    <br />
                    Tokens
                  </div>
                </th>
                <th className="min-w-[140px] px-3 py-3 pr-4 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase sm:min-w-[160px] sm:px-4 sm:py-4 lg:w-[19%]">
                  <div className="leading-tight">Capabilities</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pagedDisplayedModels.map((model) => {
                const pricingLines = getPricingLines(model)

                const modelUrl = `${basePath}/compare/${encodeURIComponent(model.provider)}/${model.slug}`

                return (
                  <tr
                    key={model.id}
                    className="hover:bg-accent-light cursor-pointer transition-colors"
                  >
                    <td className="p-0 lg:w-[20%]">
                      <Link
                        href={modelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block h-full w-full py-3 pr-3 pl-4 sm:px-4 sm:py-4"
                      >
                        <div className="min-w-[200px] text-sm font-medium break-words text-gray-900 sm:min-w-[220px] lg:min-w-0">
                          {model.displayName}
                        </div>
                        <div className="max-w-[200px] font-mono text-xs break-all text-gray-500 sm:max-w-none lg:max-w-none">
                          {model.id}
                        </div>
                      </Link>
                    </td>
                    <td className="p-0 lg:w-[11%]">
                      <Link
                        href={modelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block h-full w-full px-3 py-3 sm:px-4 sm:py-4"
                      >
                        <span className="text-accent bg-accent-light inline-flex max-w-full items-center gap-2 rounded px-2 py-1 text-xs font-medium break-words">
                          <img
                            src={getProviderLogo(model.provider)}
                            alt={`${formatProviderName(model.provider)} logo`}
                            className="provider-tag-icon"
                            loading="lazy"
                          />
                          {formatProviderName(model.provider)}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0 whitespace-nowrap lg:w-[8%]">
                      <Link
                        href={modelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block h-full w-full px-3 py-3 sm:px-4 sm:py-4"
                      >
                        <span className="inline-block rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                          {getModeDisplayName(model.data.mode)}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0 lg:w-[20%]">
                      <Link
                        href={modelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block h-full w-full px-3 py-3 sm:px-4 sm:py-4"
                      >
                        {pricingLines.length > 0 ? (
                          <div className="flex flex-col gap-1">
                            {pricingLines.map((line, idx) => (
                              <span
                                key={`${model.id}-price-${idx}`}
                                className="font-mono text-xs text-gray-700"
                              >
                                {line}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">—</span>
                        )}
                      </Link>
                    </td>
                    <td className="hidden p-0 whitespace-nowrap md:table-cell lg:w-[10%]">
                      <Link
                        href={modelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block h-full w-full px-3 py-3 sm:px-4 sm:py-4"
                      >
                        {model.data.max_input_tokens ? (
                          <span className="font-mono text-sm text-gray-700">
                            {formatTokenCount(model.data.max_input_tokens)}
                          </span>
                        ) : (
                          <span className="text-sm text-gray-400">—</span>
                        )}
                      </Link>
                    </td>
                    <td className="hidden p-0 whitespace-nowrap md:table-cell lg:w-[10%]">
                      <Link
                        href={modelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block h-full w-full px-3 py-3 sm:px-4 sm:py-4"
                      >
                        {model.data.max_output_tokens ? (
                          <span className="font-mono text-sm text-gray-700">
                            {formatTokenCount(model.data.max_output_tokens)}
                          </span>
                        ) : (
                          <span className="text-sm text-gray-400">—</span>
                        )}
                      </Link>
                    </td>
                    <td className="min-w-[140px] p-0 sm:min-w-[160px] lg:w-[19%]">
                      <Link
                        href={modelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block h-full w-full px-3 py-3 pr-4 sm:px-4 sm:py-4"
                      >
                        <div className="flex flex-wrap gap-1">
                          {model.data.supports_function_calling && (
                            <span className="rounded bg-gray-100 px-2 py-0.5 text-xs whitespace-nowrap text-gray-600">
                              Functions
                            </span>
                          )}
                          {model.data.supports_vision && (
                            <span className="rounded bg-gray-100 px-2 py-0.5 text-xs whitespace-nowrap text-gray-600">
                              Vision
                            </span>
                          )}
                          {model.data.supports_reasoning && (
                            <span className="rounded bg-gray-100 px-2 py-0.5 text-xs whitespace-nowrap text-gray-600">
                              Reasoning
                            </span>
                          )}
                          {model.data.supports_web_search && (
                            <span className="rounded bg-gray-100 px-2 py-0.5 text-xs whitespace-nowrap text-gray-600">
                              Web Search
                            </span>
                          )}
                          {model.data.supports_audio_input && (
                            <span className="rounded bg-gray-100 px-2 py-0.5 text-xs whitespace-nowrap text-gray-600">
                              Audio In
                            </span>
                          )}
                          {model.data.supports_audio_output && (
                            <span className="rounded bg-gray-100 px-2 py-0.5 text-xs whitespace-nowrap text-gray-600">
                              Audio Out
                            </span>
                          )}
                        </div>
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {pagedDisplayedModels.length === 0 && (
          <div className="px-6 py-12 text-center text-gray-500">
            {allModelsError
              ? `Failed to load models: ${allModelsError}`
              : 'No models found matching your criteria.'}
          </div>
        )}
      </div>

      {/* Client pagination controls (only when searching across full index) */}
      {clientPagingEnabled && totalClientPages > 1 && (
        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="text-sm text-gray-600">
            Showing{' '}
            <span className="font-mono">
              {formatNumber((currentClientPage - 1) * PAGE_SIZE + 1)}
            </span>
            –
            <span className="font-mono">
              {formatNumber(
                Math.min(currentClientPage * PAGE_SIZE, filteredAndSortedModels.length)
              )}
            </span>{' '}
            of <span className="font-mono">{formatNumber(filteredAndSortedModels.length)}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setClientPage((p) => Math.max(1, p - 1))}
              disabled={currentClientPage === 1}
              className={
                currentClientPage === 1
                  ? 'inline-flex h-10 cursor-not-allowed items-center justify-center rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-300'
                  : 'hover:bg-accent-light hover:border-accent-border inline-flex h-10 items-center justify-center rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 transition-colors'
              }
            >
              Prev
            </button>
            <div className="text-sm text-gray-700">
              Page <span className="font-medium">{currentClientPage}</span> of{' '}
              <span className="font-medium">{totalClientPages}</span>
            </div>
            <button
              type="button"
              onClick={() => setClientPage((p) => Math.min(totalClientPages, p + 1))}
              disabled={currentClientPage === totalClientPages}
              className={
                currentClientPage === totalClientPages
                  ? 'inline-flex h-10 cursor-not-allowed items-center justify-center rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-300'
                  : 'hover:bg-accent-light hover:border-accent-border inline-flex h-10 items-center justify-center rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 transition-colors'
              }
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
