'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { IframePreloader } from '../components/IframePreloader'
import PostHogPageView from '../components/PostHogPageView'
import { useIframeNavigation } from '../hooks/useIframeNavigation'

function isHardRefresh () {
  if (typeof window === 'undefined') return false
  
  // Use PerformanceNavigationTiming API (modern browsers)
  const navEntries = performance.getEntriesByType('navigation')
  if (navEntries.length > 0) {
    const navEntry = navEntries[0] as PerformanceNavigationTiming
    return navEntry.type === 'reload'
  }
  
  // Fallback to deprecated navigation API
  if (performance.navigation) {
    return performance.navigation.type === 1 // TYPE_RELOAD
  }
  
  return false
}

export default function Home () {
  const [isLoaded, setIsLoaded] = useState(true) // Default to loaded
  const [showLoader, setShowLoader] = useState(false)
  const [iframeSrc, setIframeSrc] = useState<string | null>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const initialHashRef = useRef<string>('')

  useEffect(() => {
    // Capture initial hash from URL on page load
    const hash = typeof window !== 'undefined' ? window.location.hash : ''
    initialHashRef.current = hash
    // Load iframe without hash first, we'll navigate to hash after load
    setIframeSrc('https://bifrost-site.getmaxim.ai/')
  }, [])

  useEffect(() => {
    // Only show loader on hard refresh
    if (isHardRefresh()) {
      setIsLoaded(false)
      setShowLoader(true)
    }
  }, [])

  useEffect(() => {
    // Prevent scrollbar issues and ensure proper sizing
    document.documentElement.style.overflow = 'hidden'
    document.documentElement.style.height = '100%'
    document.body.style.overflow = 'hidden'
    document.body.style.height = '100%'
    document.body.style.margin = '0'
    document.body.style.padding = '0'
    
    return () => {
      document.documentElement.style.overflow = ''
      document.documentElement.style.height = ''
      document.body.style.overflow = ''
      document.body.style.height = ''
      document.body.style.margin = ''
      document.body.style.padding = ''
    }
  }, [])

  // Listen for navigation messages from iframe
  useIframeNavigation()

  const handleLoad = useCallback(() => {
    setIsLoaded(true)
    setShowLoader(false)
    
    // If there was an initial hash, navigate to it after iframe loads
    if (initialHashRef.current && iframeRef.current) {
      // Small delay to ensure iframe content is fully ready
      setTimeout(() => {
        if (iframeRef.current) {
          // Navigate iframe to the hash by updating src
          iframeRef.current.src = `https://bifrost-site.getmaxim.ai/${initialHashRef.current}`
          // Clear the ref so we don't navigate again on subsequent loads
          initialHashRef.current = ''
        }
      }, 100)
    }
  }, [])

  return (
    <div 
      className="fixed inset-0 overflow-hidden"
      style={{ 
        width: '100vw', 
        height: '100vh',
        margin: 0,
        padding: 0
      }}
    >
      <PostHogPageView />
      
      {/* Loading indicator - only shown on hard refresh */}
      {showLoader && !isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-[#F9F9F9]">
          <div className="relative flex items-center justify-center">
            <video
              src="https://res.cloudinary.com/dwgurk0yg/video/upload/v1761212446/Artboard_xpedzc.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="object-contain"
            />            
          </div>
        </div>
      )}

      {iframeSrc && (
        <iframe
          ref={iframeRef}
          src={iframeSrc}
          title="Bifrost Website"
          loading="eager"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
          onLoad={handleLoad}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
            margin: 0,
            padding: 0,
            display: 'block',
            backgroundColor: 'white'
          }}
        />
      )}

      {/* Preload enterprise page iframe */}
      <IframePreloader src="https://bifrost-site.getmaxim.ai/enterprise" />
    </div>
  )
}
