'use client'

import { useState } from 'react'

export function use3DTilt() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY
    
    const rotateX = (mouseY / rect.height) * -10 // Max 10 degrees
    const rotateY = (mouseX / rect.width) * 10   // Max 10 degrees
    
    setTilt({ x: rotateX, y: rotateY })
  }

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => {
    setIsHovered(false)
    setTilt({ x: 0, y: 0 })
  }

  return {
    tilt,
    isHovered,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave
  }
} 