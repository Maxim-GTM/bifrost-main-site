'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface LiveRefresherProps {
  intervalMs?: number
}

export default function LiveRefresher({ intervalMs = 60000 }: LiveRefresherProps) {
  const router = useRouter()
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date())
  const [secondsAgo, setSecondsAgo] = useState(0)

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      router.refresh()
      setLastRefreshed(new Date())
    }, intervalMs)

    return () => clearInterval(refreshInterval)
  }, [router, intervalMs])

  useEffect(() => {
    const tickInterval = setInterval(() => {
      setSecondsAgo(Math.floor((Date.now() - lastRefreshed.getTime()) / 1000))
    }, 1000)

    return () => clearInterval(tickInterval)
  }, [lastRefreshed])

  const handleManualRefresh = () => {
    router.refresh()
    setLastRefreshed(new Date())
    setSecondsAgo(0)
  }

  return (
    <div className="flex items-center gap-3 font-mono text-xs text-gray-400">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
      </span>
      <span>
        Live — updated {secondsAgo < 5 ? 'just now' : `${secondsAgo}s ago`}
      </span>
      <button
        onClick={handleManualRefresh}
        className="underline decoration-gray-300 underline-offset-2 transition-colors hover:text-gray-600"
      >
        Refresh
      </button>
    </div>
  )
}
