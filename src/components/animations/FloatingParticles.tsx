'use client'

import { useMemo } from 'react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

function seededRandom(seed: number) {
  const value = Math.sin(seed) * 10000
  return value - Math.floor(value)
}

export function FloatingParticles() {
  const { scrollY } = useScrollAnimation()
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        size: seededRandom(i + 1) * 8 + 3,
        initialX: seededRandom(i + 101) * 100,
        initialY: seededRandom(i + 201) * 100,
        speed: seededRandom(i + 301) * 0.8 + 0.3,
        delay: seededRandom(i + 401) * 8,
        opacity: seededRandom(i + 501) * 0.8 + 0.4,
      })),
    []
  )

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
