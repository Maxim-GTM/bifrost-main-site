'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ProcessedModel } from '@/types/model'
import { formatCurrency, getModeDisplayName } from '@/lib/llm-calculator/calculator'
import { formatProviderName } from '@/lib/llm-calculator/api'
import { LLM_MODELS, MODELS_BY_PROVIDER } from '@/data/llm-models'
import Dropdown from './Dropdown'
import { getCostCalculatorBaseUrl } from '@/lib/utils'

interface ModelsTableProps {
  models: ProcessedModel[]
  hideProviderFilter?: boolean
  totalModels?: number
  // If "all", the component will use static data for full search
  searchScope?: 'page' | 'all'
  // Optional provider to scope the search index (used on provider pages).
  searchProvider?: string
  // IDs of server pagination wrappers to hide when client-side search is active.
  serverPaginationContainerId?: string
}

export default function ModelsTable({
  models,
  hideProviderFilter = false,
  totalModels,
  searchScope = 'page',
  searchProvider,
  serverPaginationContainerId,
}: ModelsTableProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProvider, setSelectedProvider] = useState<string>('all')
  const [selectedMode, setSelectedMode] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'name' | 'provider' | 'input' | 'output'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  const searchActive =
    searchQuery.trim() !== '' || selectedProvider !== 'all' || selectedMode !== 'all'

  // Use static data directly instead of fetching from API
  const allModels = useMemo(() => {
    if (searchScope !== 'all') return null
    if (searchProvider) {
      return MODELS_BY_PROVIDER.get(searchProvider) || []
    }
    return LLM_MODELS
  }, [searchScope, searchProvider])

  const baseModels = useMemo(() => {
    if (searchScope === 'all' && allModels && searchActive) return allModels
    return models
  }, [searchScope, allModels, models, searchActive])

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
    return Array.from(new Set(baseModels.map((m) => m.provider))).sort()
  }, [baseModels])

  const modes = useMemo(() => {
    // Filter out empty/invalid modes
    return Array.from(
      new Set(baseModels.map((m) => m.data.mode).filter((mode) => mode && mode.trim() !== ''))
    ).sort()
  }, [baseModels])

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
            router.push(
              `${getCostCalculatorBaseUrl()}/llm-cost-calculator/provider/${encodeURIComponent(suggestion.model.provider)}/model/${suggestion.model.slug}`
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
      // Navigate directly to the model page if it's a model suggestion
      router.push(
        `${getCostCalculatorBaseUrl()}/llm-cost-calculator/provider/${encodeURIComponent(suggestion.model.provider)}/model/${suggestion.model.slug}`
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
      let comparison = 0

      switch (sortBy) {
        case 'name':
          comparison = a.displayName.localeCompare(b.displayName)
          break
        case 'provider':
          comparison = a.provider.localeCompare(b.provider)
          break
        case 'input':
          const aInput = a.data.input_cost_per_token || 0
          const bInput = b.data.input_cost_per_token || 0
          comparison = aInput - bInput
          break
        case 'output':
          const aOutput = a.data.output_cost_per_token || 0
          const bOutput = b.data.output_cost_per_token || 0
          comparison = aOutput - bOutput
          break
      }

      return sortOrder === 'asc' ? comparison : -comparison
    })

    return list
  }, [baseModels, searchQuery, selectedProvider, selectedMode, sortBy, sortOrder])

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
              className="box-border w-full rounded-lg border border-gray-300 px-4 py-2 text-base leading-normal text-black focus:border-transparent focus:ring-2 focus:ring-green-500 focus:outline-none"
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
                    className={`w-full px-4 py-2 text-left transition-colors hover:bg-green-50 ${
                      index === focusedIndex ? 'bg-green-50' : ''
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
          <span>
            Showing {pagedDisplayedModels.length} of{' '}
            {clientPagingEnabled ? filteredAndSortedModels.length : (totalModels ?? models.length)}{' '}
            models
            {clientPagingEnabled && totalClientPages > 1 ? (
              <span className="ml-2 text-gray-500">
                (Page {currentClientPage} of {totalClientPages})
              </span>
            ) : null}
          </span>
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
                  className="min-w-[120px] cursor-pointer px-3 py-3 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase transition-colors hover:bg-gray-100 sm:px-4 sm:py-4 lg:w-[11%]"
                  onClick={() => handleSort('input')}
                >
                  <div className="leading-tight">
                    <div className="flex items-center gap-1">
                      <span>Input</span>
                      <span className="hidden lg:inline">Cost</span>
                      <SortIcon column="input" />
                    </div>
                    <div className="mt-1 hidden text-xs font-normal text-gray-500 sm:block">
                      (per 1M tokens)
                    </div>
                  </div>
                </th>
                <th
                  className="min-w-[120px] cursor-pointer px-3 py-3 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase transition-colors hover:bg-gray-100 sm:px-4 sm:py-4 lg:w-[11%]"
                  onClick={() => handleSort('output')}
                >
                  <div className="leading-tight">
                    <div className="flex items-center gap-1">
                      <span>Output</span>
                      <span className="hidden lg:inline">Cost</span>
                      <SortIcon column="output" />
                    </div>
                    <div className="mt-1 hidden text-xs font-normal text-gray-500 sm:block">
                      (per 1M tokens)
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
                const inputCostPer1M = model.data.input_cost_per_token
                  ? model.data.input_cost_per_token * 1000000
                  : null
                const outputCostPer1M = model.data.output_cost_per_token
                  ? model.data.output_cost_per_token * 1000000
                  : null

                const modelUrl = `${getCostCalculatorBaseUrl()}/llm-cost-calculator/provider/${encodeURIComponent(model.provider)}/model/${model.slug}`

                return (
                  <tr key={model.id} className="cursor-pointer transition-colors hover:bg-green-50">
                    <td className="p-0 lg:w-[20%]">
                      <Link
                        href={modelUrl}
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
                        className="block h-full w-full px-3 py-3 sm:px-4 sm:py-4"
                      >
                        <span className="inline-block max-w-full rounded bg-green-50 px-2 py-1 text-xs font-medium break-words text-green-700">
                          {formatProviderName(model.provider)}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0 whitespace-nowrap lg:w-[8%]">
                      <Link
                        href={modelUrl}
                        className="block h-full w-full px-3 py-3 sm:px-4 sm:py-4"
                      >
                        <span className="inline-block rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                          {getModeDisplayName(model.data.mode)}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0 whitespace-nowrap lg:w-[11%]">
                      <Link
                        href={modelUrl}
                        className="block h-full w-full px-3 py-3 sm:px-4 sm:py-4"
                      >
                        {inputCostPer1M !== null ? (
                          <span className="text-accent font-mono text-sm font-semibold">
                            ${inputCostPer1M.toFixed(2)}
                          </span>
                        ) : (
                          <span className="text-sm text-gray-400">—</span>
                        )}
                      </Link>
                    </td>
                    <td className="p-0 whitespace-nowrap lg:w-[11%]">
                      <Link
                        href={modelUrl}
                        className="block h-full w-full px-3 py-3 sm:px-4 sm:py-4"
                      >
                        {outputCostPer1M !== null ? (
                          <span className="text-accent font-mono text-sm font-semibold">
                            ${outputCostPer1M.toFixed(2)}
                          </span>
                        ) : (
                          <span className="text-sm text-gray-400">—</span>
                        )}
                      </Link>
                    </td>
                    <td className="hidden p-0 whitespace-nowrap md:table-cell lg:w-[10%]">
                      <Link
                        href={modelUrl}
                        className="block h-full w-full px-3 py-3 sm:px-4 sm:py-4"
                      >
                        {model.data.max_input_tokens ? (
                          <span className="font-mono text-sm text-gray-700">
                            {model.data.max_input_tokens > 100000
                              ? `${(model.data.max_input_tokens / 1000).toFixed(0)}k`
                              : model.data.max_input_tokens.toLocaleString()}
                          </span>
                        ) : (
                          <span className="text-sm text-gray-400">—</span>
                        )}
                      </Link>
                    </td>
                    <td className="hidden p-0 whitespace-nowrap md:table-cell lg:w-[10%]">
                      <Link
                        href={modelUrl}
                        className="block h-full w-full px-3 py-3 sm:px-4 sm:py-4"
                      >
                        {model.data.max_output_tokens ? (
                          <span className="font-mono text-sm text-gray-700">
                            {model.data.max_output_tokens > 100000
                              ? `${(model.data.max_output_tokens / 1000).toFixed(0)}k`
                              : model.data.max_output_tokens.toLocaleString()}
                          </span>
                        ) : (
                          <span className="text-sm text-gray-400">—</span>
                        )}
                      </Link>
                    </td>
                    <td className="min-w-[140px] p-0 sm:min-w-[160px] lg:w-[19%]">
                      <Link
                        href={modelUrl}
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
            No models found matching your criteria.
          </div>
        )}
      </div>

      {/* Client pagination controls (only when searching across full index) */}
      {clientPagingEnabled && totalClientPages > 1 && (
        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="text-sm text-gray-600">
            Showing{' '}
            <span className="font-mono">
              {((currentClientPage - 1) * PAGE_SIZE + 1).toLocaleString()}
            </span>
            –
            <span className="font-mono">
              {Math.min(
                currentClientPage * PAGE_SIZE,
                filteredAndSortedModels.length
              ).toLocaleString()}
            </span>{' '}
            of <span className="font-mono">{filteredAndSortedModels.length.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setClientPage((p) => Math.max(1, p - 1))}
              disabled={currentClientPage === 1}
              className={
                currentClientPage === 1
                  ? 'inline-flex h-10 cursor-not-allowed items-center justify-center rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-300'
                  : 'inline-flex h-10 items-center justify-center rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 transition-colors hover:border-green-200 hover:bg-green-50'
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
                  : 'inline-flex h-10 items-center justify-center rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 transition-colors hover:border-green-200 hover:bg-green-50'
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
