'use client'

import type React from 'react'
import { useRive } from '@rive-app/react-canvas'

type RiveIllustrationProps = {
  src: string
  className?: string
  style?: React.CSSProperties
}

export default function RiveIllustration({ src, className, style }: RiveIllustrationProps) {
  const { RiveComponent } = useRive({
    src,
    autoplay: true,
  })

  // Apply filter/tint on a wrapper to ensure it affects the canvas.
  return (
    <div className={className} style={style}>
      <RiveComponent className="h-full w-full" />
    </div>
  )
}
