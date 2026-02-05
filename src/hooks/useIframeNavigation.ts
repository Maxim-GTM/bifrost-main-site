'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

const IFRAME_ORIGIN = 'https://bifrost-site.getmaxim.ai'

function getBasePath () {
  if (typeof window === 'undefined') return ''
  return window.location.pathname.startsWith('/bifrost') ? '/bifrost' : ''
}

export function useIframeNavigation () {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== IFRAME_ORIGIN || !event.data) return

      if (event.data?.type === 'hash') {
        const hash = String(event.data.url ?? '')
        if (!hash) return
        const normalizedHash = hash.startsWith('#') ? hash : `#${hash}`
        // For hash navigation, stay on the current page
        router.replace(`${pathname}${normalizedHash}`)
        return
      }

      if (event.data?.type === 'navigate' && event.data?.url) {
        const url = String(event.data.url)
        let targetUrl: URL
        try {
          targetUrl = new URL(url, IFRAME_ORIGIN)
        } catch {
          return
        }

        if (targetUrl.origin !== IFRAME_ORIGIN) {
          window.open(targetUrl.toString(), '_blank')
          return
        }

        const basePath = getBasePath()
        const targetPath = `${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`
        const nextUrl = `${basePath}${targetPath}`
        if (nextUrl !== `${pathname}${window.location.search}${window.location.hash}`) {
          router.push(nextUrl)
        }
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [router, pathname])
}