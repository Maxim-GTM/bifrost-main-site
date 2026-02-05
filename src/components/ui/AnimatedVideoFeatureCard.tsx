'use client'

import React from 'react'
import { use3DTilt } from '../../hooks/use3DTilt'

export function AnimatedVideoFeatureCard({ 
  videoSrc, 
  title, 
  description 
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
      className="group p-8 bg-white border border-gray-200 rounded-xl hover:shadow-lg hover:shadow-green-600/5 hover:border-green-200 transition-all duration-300 cursor-pointer"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.02 : 1})`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleCardMouseEnter}
      onMouseLeave={handleCardMouseLeave}
    >
      <div className="text-accent mb-6 group-hover:text-green-700 transition-colors relative">
        <video
          ref={videoRef}
          className="w-12 h-12 object-cover"
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  )
} 