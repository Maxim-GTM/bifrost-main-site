'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect } from 'react'

if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
    person_profiles: 'always',
    capture_pageview: false,
    capture_pageleave: true,
    loaded: () => {
      if (process.env.NODE_ENV === 'development') {
        console.log('PostHog initialized')
      }
    },
  })
}

export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}

// Custom hook for manual pageview tracking
export function usePostHogPageView() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      posthog?.capture('$pageview')
    }
  }, [])
}
