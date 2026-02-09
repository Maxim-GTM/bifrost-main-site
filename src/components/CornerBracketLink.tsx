'use client'

import { useState, useEffect, useRef, useCallback, forwardRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { LinkProps } from 'next/link'

/* ─── Config types ─── */

interface CornerBracketConfig {
  /** Color of the text and brackets */
  color?: string
  /** Color on hover */
  hoverColor?: string
  /** Background color on hover */
  hoverBgColor?: string
  /** Length of each bracket arm in pixels */
  bracketSize?: number
  /** Thickness of bracket lines in pixels */
  bracketThickness?: number
  /** Horizontal padding in pixels */
  paddingX?: number
  /** Vertical padding in pixels */
  paddingY?: number
  /** Extra horizontal expansion in pixels on hover */
  expandBy?: number
  /** Font size in pixels */
  fontSize?: number
  /** Duration of the initial text scramble in ms */
  scrambleDuration?: number
  /** Delay before the scramble starts in ms */
  scrambleDelay?: number
  /** Custom character set for the scramble effect */
  characterSet?: string[] | readonly string[]
}

type CornerBracketLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
  LinkProps & {
    children: string
  } & CornerBracketConfig

/* ─── Helpers ─── */

const DEFAULT_CHARACTER_SET = Object.freeze(
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ=%&!?@/*.()'.split('')
) as readonly string[]

const getRandomInt = (max: number) => Math.floor(Math.random() * max)

/* ─── Corner bracket ─── */

function CornerBracket({
  position,
  size,
  thickness,
  color,
}: {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  size: number
  thickness: number
  color: string
}) {
  const isTop = position.includes('top')
  const isLeft = position.includes('left')

  return (
    <span
      aria-hidden
      style={{
        position: 'absolute',
        top: isTop ? 0 : undefined,
        bottom: !isTop ? 0 : undefined,
        left: isLeft ? 0 : undefined,
        right: !isLeft ? 0 : undefined,
        width: size,
        height: size,
        pointerEvents: 'none',
        borderColor: color,
        borderStyle: 'solid',
        borderWidth: 0,
        ...(isTop &&
          isLeft && {
            borderTopWidth: thickness,
            borderLeftWidth: thickness,
          }),
        ...(isTop &&
          !isLeft && {
            borderTopWidth: thickness,
            borderRightWidth: thickness,
          }),
        ...(!isTop &&
          isLeft && {
            borderBottomWidth: thickness,
            borderLeftWidth: thickness,
          }),
        ...(!isTop &&
          !isLeft && {
            borderBottomWidth: thickness,
            borderRightWidth: thickness,
          }),
      }}
    />
  )
}

const POSITIONS = ['top-left', 'top-right', 'bottom-left', 'bottom-right'] as const

/* ─── Component ─── */

const CornerBracketLink = forwardRef<HTMLAnchorElement, CornerBracketLinkProps>(
  (
    {
      children,
      color = '#999999',
      hoverBgColor = '#F0F0F0',
      hoverColor = '#7F7F7F',
      bracketSize = 4,
      bracketThickness = 1,
      paddingX = 0,
      paddingY = 4,
      expandBy = 6,
      fontSize = 14,
      scrambleDuration = 600,
      scrambleDelay = 0,
      characterSet = DEFAULT_CHARACTER_SET,
      style,
      ...linkProps
    },
    ref
  ) => {
    const [hovered, setHovered] = useState(false)
    const [displayText, setDisplayText] = useState<string[]>(() => children.split(''))
    const hasAnimated = useRef(false)
    const resolvedHoverColor = hoverColor ?? color

    // Run scramble exactly once on mount
    useEffect(() => {
      if (hasAnimated.current) return
      hasAnimated.current = true

      const text = children
      const maxIterations = text.length
      let raf: number
      let startTime: number | null = null

      const delayTimeout = setTimeout(() => {
        const animate = (now: number) => {
          if (!startTime) startTime = now
          const progress = Math.min((now - startTime) / scrambleDuration, 1)
          const resolved = progress * maxIterations

          setDisplayText(
            text
              .split('')
              .map((ch, i) =>
                ch === ' '
                  ? ' '
                  : i <= resolved
                    ? text[i]
                    : characterSet[getRandomInt(characterSet.length)]
              )
          )

          if (progress < 1) {
            raf = requestAnimationFrame(animate)
          }
        }

        raf = requestAnimationFrame(animate)
      }, scrambleDelay)

      return () => {
        clearTimeout(delayTimeout)
        cancelAnimationFrame(raf)
      }
      // Only run on mount
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLAnchorElement>) => {
        setHovered(true)
        linkProps.onMouseEnter?.(e)
      },
      [linkProps.onMouseEnter]
    )

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLAnchorElement>) => {
        setHovered(false)
        linkProps.onMouseLeave?.(e)
      },
      [linkProps.onMouseLeave]
    )

    return (
      <Link
        ref={ref}
        {...linkProps}
        style={{ textDecoration: 'none', ...style }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.span
          style={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: paddingY,
            paddingBottom: paddingY,
            background: hovered ? hoverBgColor : 'transparent',
          }}
          animate={{
            paddingLeft: hovered ? paddingX + expandBy : paddingX,
            paddingRight: hovered ? paddingX + expandBy : paddingX,
            marginLeft: hovered ? -expandBy : 0,
            marginRight: hovered ? -expandBy : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 30,
          }}
        >
          {/* Corner brackets */}
          {POSITIONS.map((pos) => (
            <motion.span
              key={pos}
              style={{ position: 'absolute', inset: 0 }}
              initial={false}
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <CornerBracket
                position={pos}
                size={bracketSize}
                thickness={bracketThickness}
                color={resolvedHoverColor}
              />
            </motion.span>
          ))}

          {/* Text */}
          <span
            style={{
              fontSize,
              fontWeight: 500,
              letterSpacing: '0.04em',
              lineHeight: '140%',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              fontFamily: 'monospace',
              color: hovered ? resolvedHoverColor : color,
              transition: 'color 0.2s',
              display: 'inline-flex',
            }}
          >
            {displayText.map((letter, index) => (
              <span
                key={index}
                style={{
                  display: 'inline-block',
                  width: letter === ' ' ? '0.3em' : undefined,
                }}
              >
                {letter.toUpperCase()}
              </span>
            ))}
          </span>
        </motion.span>
      </Link>
    )
  }
)

CornerBracketLink.displayName = 'CornerBracketLink'

export default CornerBracketLink
