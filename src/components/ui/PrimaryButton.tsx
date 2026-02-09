'use client'

import Link from 'next/link'
import { ReactNode, useState, MouseEventHandler } from 'react'

interface PrimaryButtonProps {
  as?: 'link' | 'button'
  href?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  children: ReactNode
  external?: boolean
  className?: string
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>
}

function CornerAccents({ color = '#1A7A64' }: { color?: string }) {
  const size = 4
  const thickness = 1
  const offset = -(size / 2) // Half inside, half outside the button edge

  const cornerStyle = {
    position: 'absolute' as const,
    width: `${size}px`,
    height: `${size}px`,
    pointerEvents: 'none' as const,
  }

  return (
    <>
      {/* Top-left corner */}
      <span
        style={{
          ...cornerStyle,
          top: `${offset}px`,
          left: `${offset}px`,
          borderTop: `${thickness}px solid ${color}`,
          borderLeft: `${thickness}px solid ${color}`,
        }}
      />
      {/* Top-right corner */}
      <span
        style={{
          ...cornerStyle,
          top: `${offset}px`,
          right: `${offset}px`,
          borderTop: `${thickness}px solid ${color}`,
          borderRight: `${thickness}px solid ${color}`,
        }}
      />
      {/* Bottom-left corner */}
      <span
        style={{
          ...cornerStyle,
          bottom: `${offset}px`,
          left: `${offset}px`,
          borderBottom: `${thickness}px solid ${color}`,
          borderLeft: `${thickness}px solid ${color}`,
        }}
      />
      {/* Bottom-right corner */}
      <span
        style={{
          ...cornerStyle,
          bottom: `${offset}px`,
          right: `${offset}px`,
          borderBottom: `${thickness}px solid ${color}`,
          borderRight: `${thickness}px solid ${color}`,
        }}
      />
    </>
  )
}

export default function PrimaryButton({
  as = 'link',
  href,
  type = 'button',
  disabled = false,
  children,
  external = false,
  className = '',
  onClick,
}: PrimaryButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const baseClasses = `
        relative inline-flex items-center justify-center gap-1
        px-[14px] py-[7px]
        text-white text-sm font-medium tracking-wider uppercase font-mono
        transition-all duration-200
        ${disabled ? 'opacity-70 cursor-not-allowed' : ''}
        ${className}
    `.trim()

  const buttonStyle = {
    background: isHovered ? '#2DB08A' : '#33C19E',
    border: '2px solid rgba(255, 255, 255, 0.6)',
    boxShadow: isHovered
      ? `
                0px 0px 10px 0px rgba(72, 213, 151, 0.6),
                0px 2px 2px 0px rgba(0, 0, 0, 0.08),
                inset 2px 2px 0px 0px rgba(255, 255, 255, 0.35),
                inset -2px -2px 0px 0px rgba(0, 0, 0, 0.15)
            `
          .replace(/\s+/g, ' ')
          .trim()
      : `
                0px 0px 6px 0px rgba(72, 213, 151, 0.4),
                0px 2px 2px 0px rgba(0, 0, 0, 0.08),
                inset 2px 2px 0px 0px rgba(255, 255, 255, 0.3),
                inset -2px -2px 0px 0px rgba(0, 0, 0, 0.12)
            `
          .replace(/\s+/g, ' ')
          .trim(),
  }

  const sharedProps = {
    className: baseClasses,
    style: buttonStyle,
    onMouseEnter: () => !disabled && setIsHovered(true),
    onMouseLeave: () => !disabled && setIsHovered(false),
    onClick,
  }

  if (as === 'button') {
    return (
      <button type={type} disabled={disabled} {...sharedProps}>
        <CornerAccents />
        {children}
      </button>
    )
  }

  const resolvedHref = href || '#'

  if (external) {
    return (
      <Link href={resolvedHref} target="_blank" rel="noopener noreferrer" {...sharedProps}>
        <CornerAccents />
        {children}
      </Link>
    )
  }

  return (
    <Link href={resolvedHref} {...sharedProps}>
      <CornerAccents />
      {children}
    </Link>
  )
}

export { CornerAccents }
