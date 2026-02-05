'use client'

import { useEffect } from 'react'

export default function SuccessPage () {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = 'https://www.getmaxim.ai/bifrost'
    }, 3000)
  }, [])

  return (
    <div>
      <h1>Welcome to Bifrost enterprise edition!</h1>
      <p>Redirecting to main website....</p>
    </div>
  )
}