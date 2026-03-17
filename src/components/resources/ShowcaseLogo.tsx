'use client'

import Image from 'next/image'
import { Globe } from 'lucide-react'
import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'

const LOGO_DEV_TOKEN = 'pk_DRMfSAu-ReyrEks2PcRCfw'

function getHostname(website?: string) {
  if (!website) return null

  try {
    const normalizedWebsite = /^https?:\/\//i.test(website) ? website : `https://${website}`
    return new URL(normalizedWebsite).hostname.replace(/^www\./, '')
  } catch {
    return null
  }
}

function getLogoUrl(website?: string) {
  const hostname = getHostname(website)
  return hostname ? `https://img.logo.dev/${hostname}?token=${LOGO_DEV_TOKEN}` : null
}

interface ShowcaseLogoProps {
  name: string
  website?: string
  className?: string
}

export default function ShowcaseLogo({ name, website, className }: ShowcaseLogoProps) {
  const [hasError, setHasError] = useState(false)
  const logoUrl = useMemo(() => getLogoUrl(website), [website])

  if (!logoUrl || hasError) {
    return (
      <div
        className={cn(
          'flex h-14 w-14 items-center justify-center border border-gray-200 bg-gray-50 text-gray-400',
          className
        )}
        aria-label={`${name} website`}
      >
        <Globe className="h-6 w-6" />
      </div>
    )
  }

  return (
    <div
      className={cn(
        'relative flex h-14 w-14 items-center justify-center overflow-hidden border border-gray-200 bg-white p-3',
        className
      )}
    >
      <Image
        src={logoUrl}
        alt={`${name} logo`}
        fill
        sizes="56px"
        className="object-contain p-3"
        onError={() => setHasError(true)}
      />
    </div>
  )
}
