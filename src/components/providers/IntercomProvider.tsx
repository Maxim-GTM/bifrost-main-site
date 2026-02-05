'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    Intercom: (...args: unknown[]) => void
    intercomSettings: Record<string, unknown>
  }
}

export function IntercomProvider ({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const appId = process.env.NEXT_PUBLIC_INTERCOM_APP_ID

    if (!appId) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Intercom App ID not found. Set NEXT_PUBLIC_INTERCOM_APP_ID env variable.')
      }
      return
    }

    // Initialize Intercom settings
    window.intercomSettings = {
      api_base: 'https://api-iam.intercom.io',
      app_id: appId
    }

    // Load Intercom script
    const script = document.createElement('script')
    script.async = true
    script.src = `https://widget.intercom.io/widget/${appId}`
    script.onload = () => {
      if (window.Intercom) {
        window.Intercom('boot', { app_id: appId })
      }
    }
    document.body.appendChild(script)

    return () => {
      // Cleanup on unmount
      if (window.Intercom) {
        window.Intercom('shutdown')
      }
      script.remove()
    }
  }, [])

  return <>{children}</>
}

