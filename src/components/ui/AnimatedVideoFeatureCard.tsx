'use client'

import React from 'react'
import { use3DTilt } from '../../hooks/use3DTilt'

export function AnimatedVideoFeatureCard({
  videoSrc,
  title,
  description,
}: {
  videoSrc: string
  title: string
  description: string
}) {
  const { tilt, isHovered, handleMouseMove, handleMouseEnter, handleMouseLeave } = use3DTilt()
  const videoRef = React.useRef<HTMLVideoElement>(null)

  const handleCardMouseEnter = () => {
    handleMouseEnter()
    if (videoRef.current) {
      videoRef.current.currentTime = 0 // Reset to beginning
      videoRef.current.play()
    }
  }

  const handleCardMouseLeave = () => {
    handleMouseLeave()
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0 // Reset to beginning
    }
  }

  return (
    <div
      className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:border-green-200 hover:shadow-lg hover:shadow-green-600/5"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.02 : 1})`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleCardMouseEnter}
      onMouseLeave={handleCardMouseLeave}
    >
      <div className="text-accent relative mb-6 transition-colors group-hover:text-green-700">
        <video
          ref={videoRef}
          className="h-12 w-12 object-cover"
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>
      <h3 className="mb-3 text-xl font-bold tracking-tight text-gray-900">{title}</h3>
      <p className="leading-relaxed text-gray-600">{description}</p>
    </div>
  )
}
