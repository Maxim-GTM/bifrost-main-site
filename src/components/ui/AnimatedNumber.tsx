'use client'

import { useEffect, useState } from 'react'

interface AnimatedNumberProps {
  value: number | string
  suffix?: string
  duration?: number
  onComplete?: () => void
}

export function AnimatedNumber({
  value,
  suffix = '',
  duration = 2000,
  onComplete,
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    let startTime: number | undefined
    const startValue = 0
    const endValue = typeof value === 'string' ? parseInt(value.replace(/[^\d]/g, '')) : value

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart)

      setDisplayValue(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else if (onComplete) {
        onComplete()
      }
    }

    const timer = setTimeout(() => {
      requestAnimationFrame(animate)
    }, 500) // Delay start

    return () => clearTimeout(timer)
  }, [value, duration, isClient, onComplete])

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  )
}
