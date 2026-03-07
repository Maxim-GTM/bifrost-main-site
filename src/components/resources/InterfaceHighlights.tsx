'use client'

import dynamic from 'next/dynamic'

const RiveIllustration = dynamic(() => import('@/components/RiveIllustration'), { ssr: false })

const RIVE_SCALE = 1.08

export interface InterfaceHighlightItem {
  riveSrc: string
  title: string
  description: string
}

function RiveCard({ item }: { item: InterfaceHighlightItem }) {
  return (
    <div className="relative border border-gray-200 bg-white">
      <div className="absolute top-3 left-3 z-10 h-2 w-2 border-t border-l border-[var(--accent)] opacity-40" />
      <div className="absolute top-3 right-3 z-10 h-2 w-2 border-t border-r border-[var(--accent)] opacity-40" />
      <div className="absolute bottom-3 left-3 z-10 h-2 w-2 border-b border-l border-[var(--accent)] opacity-40" />
      <div className="absolute right-3 bottom-3 z-10 h-2 w-2 border-r border-b border-[var(--accent)] opacity-40" />
      <div className="relative aspect-[16/9] overflow-hidden bg-gray-50 flex items-center justify-center">
        <div className="flex h-full w-full items-center justify-center overflow-hidden">
          <RiveIllustration
            src={item.riveSrc}
            className="h-full w-full"
            style={{ transform: `scale(${RIVE_SCALE})` }}
          />
        </div>
      </div>
      <div className="border-t border-gray-200 p-4">
        <h3 className="mb-1 text-sm text-gray-900">{item.title}</h3>
        <p className="text-xs text-gray-500">{item.description}</p>
      </div>
    </div>
  )
}

export default function InterfaceHighlights({ items }: { items: InterfaceHighlightItem[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <RiveCard key={item.title} item={item} />
      ))}
    </div>
  )
}
