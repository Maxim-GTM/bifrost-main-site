'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect } from 'react'

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
    person_profiles: 'always', // or 'always' to create profiles for anonymous users as well
    // Other useful configurations
    capture_pageview: false, // We'll capture pageviews manually
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
