'use client'

import { useEffect, useState } from 'react'

export function AnimatedDots() {
  const [dotCount, setDotCount] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev === 3 ? 1 : prev + 1))
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return <span>{'.'.repeat(dotCount)}</span>
}
