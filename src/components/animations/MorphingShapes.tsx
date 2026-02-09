'use client'

import { useScrollAnimation } from '../../hooks/useScrollAnimation'

export function MorphingShapes() {
  const { scrollY } = useScrollAnimation()

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="animate-morph absolute right-1/4 bottom-1/3 h-72 w-72 bg-gradient-to-tl from-green-200/45 to-green-100/40 blur-2xl"
        style={{
          transform: `translateY(${scrollY * -0.18}px) rotate(${scrollY * 0.12}deg)`,
          animationDelay: '2s',
          boxShadow: '0 0 90px rgba(16, 185, 129, 0.15)',
        }}
      />
    </div>
  )
}
