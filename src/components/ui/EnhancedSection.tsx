'use client'

import React from 'react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

interface EnhancedSectionProps {
  children: React.ReactNode
  className?: string
  backgroundElements?: React.ReactNode
}

export function EnhancedSection({
  children,
  className = '',
  backgroundElements = null,
}: EnhancedSectionProps) {
  const { scrollY } = useScrollAnimation()

  return (
    <section className={`relative overflow-hidden ${className}`}>
      {backgroundElements && (
        <div className="pointer-events-none absolute inset-0">
          <div style={{ transform: `translateY(${scrollY * 0.1}px)` }}>{backgroundElements}</div>
        </div>
      )}
      {children}
    </section>
  )
}
