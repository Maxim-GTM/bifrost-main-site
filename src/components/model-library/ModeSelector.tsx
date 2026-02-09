'use client'

import { useRouter } from 'next/navigation'
import { getModeDisplayName } from '@/lib/model-library/calculator'
import Dropdown, { DropdownOption } from './Dropdown'
import { getModelLibraryBaseUrl } from '@/lib/utils'

interface SelectorOption {
  label: string
  value: string
  type: 'provider' | 'mode'
}

interface ModeSelectorProps {
  currentSlug: string
  currentProvider: string
  availableOptions: SelectorOption[]
  type: 'provider' | 'mode'
  optionProviders?: Record<string, string> // Map of option value to provider
}

export default function ModeSelector({
  currentSlug,
  currentProvider,
  availableOptions,
  type,
  optionProviders = {},
}: ModeSelectorProps) {
  const router = useRouter()

  const handleChange = (value: string) => {
    const selectedOption = availableOptions.find((opt) => opt.value === value)
    if (selectedOption && selectedOption.value !== currentSlug) {
      // If selecting a provider, use that provider; otherwise use current provider
      const targetProvider = optionProviders[selectedOption.value] || currentProvider
      const basePath = `${getModelLibraryBaseUrl()}/model-library`
      router.push(
        `${basePath}/provider/${encodeURIComponent(targetProvider)}/model/${selectedOption.value}`
      )
    }
  }

  const label = type === 'provider' ? 'Select Provider:' : 'Select Mode:'
  const description =
    type === 'provider'
      ? `This model is available from ${availableOptions.length} different providers. Select a provider to view its specific pricing.`
      : `This model supports ${availableOptions.length} different modes. Select a mode to view its specific pricing.`

  const dropdownOptions: DropdownOption[] = availableOptions.map((option) => ({
    value: option.value,
    label: option.label,
  }))

  return (
    <div className="bg-accent-light border-accent-border rounded-lg border p-4">
      <label className="mb-2 block text-sm font-medium text-gray-700">{label}</label>
      <Dropdown
        options={dropdownOptions}
        value={currentSlug}
        onChange={handleChange}
        placeholder={`Select ${type === 'provider' ? 'Provider' : 'Mode'}`}
        className="w-full md:w-auto"
      />
      <p className="mt-2 text-xs text-gray-500">{description}</p>
    </div>
  )
}
