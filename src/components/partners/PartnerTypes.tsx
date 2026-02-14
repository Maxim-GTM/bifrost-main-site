'use client'

import dynamic from 'next/dynamic'

const RiveIllustration = dynamic(() => import('@/components/RiveIllustration'), { ssr: false })

const RIVE_SCALE = 1.0

interface PartnerType {
  title: string
  illustration: string
}

const partnerTypes: PartnerType[] = [
  {
    title: 'Cloud Providers / Hyperscalers',
    illustration: '/rive/asuJ0YiIaQEBiTd0gLMK4ymRbo.riv',
  },
  {
    title: 'Global System Integrators',
    illustration: '/rive/BVg6Gzh91qsE0zrrZqcNtRFvME.riv',
  },
  {
    title: 'Technology Partners',
    illustration: '/rive/CW6WL9AMphWwkwIwBG8o1ipGqdE.riv',
  },
  {
    title: 'Channel Partners',
    illustration: '/rive/D0EAkStzIv10JZlvu0Gm71lUl3c.riv',
  },
]

const ACCENT_COLOR = '#35c09e'

function PartnerCard({ partner, compact }: { partner: PartnerType; compact?: boolean }) {
  return (
    <div className="flex h-full flex-col border border-gray-200 bg-white transition-all hover:border-[var(--accent-border)] hover:shadow-sm">
      {/* Illustration Area */}
      <div
        className={`relative flex flex-shrink-0 items-center justify-center border-b border-gray-100 p-2 ${
          compact ? 'h-[170px]' : 'h-[240px]'
        }`}
      >
        {/* Decorative corner accents */}
        <div
          className="absolute top-3 left-3 h-2 w-2 border-t border-l"
          style={{ borderColor: ACCENT_COLOR, opacity: 0.4 }}
        />
        <div
          className="absolute top-3 right-3 h-2 w-2 border-t border-r"
          style={{ borderColor: ACCENT_COLOR, opacity: 0.4 }}
        />
        <div
          className="absolute bottom-3 left-3 h-2 w-2 border-b border-l"
          style={{ borderColor: ACCENT_COLOR, opacity: 0.4 }}
        />
        <div
          className="absolute right-3 bottom-3 h-2 w-2 border-r border-b"
          style={{ borderColor: ACCENT_COLOR, opacity: 0.4 }}
        />

        <div className="flex h-full w-full items-center justify-center overflow-hidden">
          <RiveIllustration
            src={partner.illustration}
            className="h-full w-full"
            style={{ transform: `scale(${RIVE_SCALE})` }}
          />
        </div>
      </div>

      {/* Title */}
      <div className={`flex items-center justify-center ${compact ? 'p-3' : 'p-5'}`}>
        <h3 className={`text-center text-gray-900 ${compact ? 'text-xs' : 'text-sm'}`}>
          {partner.title}
        </h3>
      </div>
    </div>
  )
}

export default function PartnerTypes({ compact }: { compact?: boolean }) {
  return (
    <div className="grid grid-cols-2 gap-6">
      {partnerTypes.map((partner) => (
        <PartnerCard key={partner.title} partner={partner} compact={compact} />
      ))}
    </div>
  )
}
