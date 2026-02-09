'use client'

import { useEffect, useState } from 'react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

export function FloatingParticles() {
  const { scrollY } = useScrollAnimation()
  const [particles, setParticles] = useState<
    Array<{
      id: number
      size: number
      initialX: number
      initialY: number
      speed: number
      delay: number
      opacity: number
    }>
  >([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setParticles(
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        size: Math.random() * 8 + 3,
        initialX: Math.random() * 100,
        initialY: Math.random() * 100,
        speed: Math.random() * 0.8 + 0.3,
        delay: Math.random() * 8,
        opacity: Math.random() * 0.8 + 0.4,
      }))
    )
  }, [])

  if (!isClient) {
    return <div className="pointer-events-none absolute inset-0 overflow-hidden" />
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <div key={particle.id}>
          {/* Main particle with glow */}
          <div
            className="animate-drift absolute rounded-full bg-green-400/60 shadow-lg"
            style={{
              left: `${particle.initialX}%`,
              top: `${particle.initialY}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.delay}s`,
              opacity: particle.opacity,
              transform: `translateY(${scrollY * particle.speed * -1}px)`,
              boxShadow: `0 0 ${particle.size * 2}px rgba(16, 185, 129, 0.4)`,
            }}
          />
          {/* Inner bright core */}
          <div
            className="animate-twinkle absolute rounded-full bg-green-300/80"
            style={{
              left: `${particle.initialX}%`,
              top: `${particle.initialY}%`,
              width: `${particle.size * 0.5}px`,
              height: `${particle.size * 0.5}px`,
              animationDelay: `${particle.delay + 1}s`,
              transform: `translate(${particle.size * 0.25}px, ${particle.size * 0.25}px) translateY(${scrollY * particle.speed * -1}px)`,
            }}
          />
        </div>
      ))}
    </div>
  )
}
