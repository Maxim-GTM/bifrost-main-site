'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { use3DTilt } from '../../hooks/use3DTilt'

export function AnimatedTerminal() {
  const [currentScene, setCurrentScene] = useState(0)
  const [displayLines, setDisplayLines] = useState<string[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const { tilt, handleMouseMove, handleMouseEnter, handleMouseLeave } = use3DTilt()

  const scenes = [
    {
      title: 'Load Testing',
      lines: [
        { text: '$ bifrost benchmark --rps 5000 --instance t3.xlarge', type: 'command', delay: 0 },
        { text: 'Running benchmark on t3.xlarge instance...', type: 'info', delay: 1000 },
        { text: '', type: 'empty', delay: 800 },
        { text: '📊 Performance Metrics:', type: 'info', delay: 500 },
        { text: '   Success Rate: 100.00% ✓', type: 'success', delay: 400 },
        { text: '   Average Latency: 1.61s ✓', type: 'success', delay: 400 },
        { text: '   Response Size: 10.32 KB ✓', type: 'success', delay: 400 },
        { text: '   Peak Memory: 3.34 GB ✓', type: 'success', delay: 400 },
        { text: '   Queue Wait: 1.67 µs ✓', type: 'success', delay: 400 },
        { text: '   HTTP Request: 1.50s ✓', type: 'success', delay: 400 },
        { text: '   Bifrost Overhead: 11 µs ✓', type: 'success', delay: 400 },
        { text: '', type: 'empty', delay: 300 },
        { text: '🏆 Benchmark complete!', type: 'highlight', delay: 600 },
        { text: '   Ultra-low gateway overhead', type: 'success', delay: 300 },
        { text: '   100% success rate maintained', type: 'success', delay: 300 },
      ],
    },
    {
      title: 'Failover Demo',
      lines: [
        { text: '$ bifrost failover --demo', type: 'command', delay: 0 },
        { text: 'Initializing failover test...', type: 'info', delay: 800 },
        { text: '', type: 'empty', delay: 500 },
        { text: '🔄 Primary: OpenAI GPT-4 (active)', type: 'success', delay: 600 },
        { text: '⚡ Backup: Anthropic Claude-3.5 (standby)', type: 'info', delay: 400 },
        { text: '', type: 'empty', delay: 800 },
        { text: '❌ Primary endpoint failure detected!', type: 'error', delay: 1200 },
        { text: '⚡ Switching to backup provider...', type: 'warning', delay: 600 },
        { text: '✅ Failover completed in 89ms', type: 'success', delay: 800 },
        { text: '', type: 'empty', delay: 400 },
        { text: '🔄 New Primary: Anthropic Claude-3.5 (active)', type: 'success', delay: 500 },
        { text: '📊 Zero requests dropped during failover', type: 'highlight', delay: 600 },
        { text: '🎯 99.9999% uptime maintained', type: 'success', delay: 400 },
      ],
    },
  ]

  // Cleanup function
  const cleanup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  // Cursor blinking effect
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return cleanup
  }, [cleanup])

  // Simplified typing animation
  const typeCharacter = useCallback(() => {
    const currentSceneData = scenes[currentScene]
    if (currentLineIndex >= currentSceneData.lines.length) {
      // Scene complete, wait then move to next scene
      timeoutRef.current = setTimeout(() => {
        setCurrentScene((prev) => (prev + 1) % scenes.length)
        setDisplayLines([])
        setCurrentLineIndex(0)
        setCurrentCharIndex(0)
      }, 3000)
      return
    }

    const currentLine = currentSceneData.lines[currentLineIndex]

    // Handle empty lines
    if (currentLine.type === 'empty') {
      timeoutRef.current = setTimeout(() => {
        setDisplayLines((prev) => [...prev, ''])
        setCurrentLineIndex((prev) => prev + 1)
        setCurrentCharIndex(0)
      }, currentLine.delay)
      return
    }

    // Start typing after delay
    if (currentCharIndex === 0) {
      timeoutRef.current = setTimeout(() => {
        setIsTyping(true)
        setCurrentCharIndex(1)
      }, currentLine.delay)
      return
    }

    // Continue typing
    if (currentCharIndex <= currentLine.text.length) {
      const typingSpeed = currentLine.type === 'command' ? 80 : 30

      timeoutRef.current = setTimeout(() => {
        setDisplayLines((prev) => {
          const newLines = [...prev]
          newLines[currentLineIndex] = currentLine.text.slice(0, currentCharIndex)
          return newLines
        })

        if (currentCharIndex < currentLine.text.length) {
          setCurrentCharIndex((prev) => prev + 1)
        } else {
          // Line complete
          setIsTyping(false)
          setCurrentLineIndex((prev) => prev + 1)
          setCurrentCharIndex(0)
        }
      }, typingSpeed)
    }
  }, [currentScene, currentLineIndex, currentCharIndex])

  // Main animation controller
  useEffect(() => {
    if (!isTyping && currentCharIndex === 0) {
      typeCharacter()
    } else if (isTyping) {
      typeCharacter()
    }
  }, [isTyping, currentCharIndex, typeCharacter])

  // Cleanup on unmount
  useEffect(() => {
    return cleanup
  }, [cleanup])

  const getLineClass = (lineIndex: number) => {
    const currentSceneData = scenes[currentScene]
    if (lineIndex >= currentSceneData.lines.length) return 'text-gray-300'

    const lineType = currentSceneData.lines[lineIndex]?.type
    switch (lineType) {
      case 'command':
        return 'text-green-400'
      case 'success':
        return 'text-gray-300'
      case 'warning':
        return 'text-yellow-400'
      case 'info':
        return 'text-blue-400'
      case 'highlight':
        return 'text-green-400 font-bold'
      case 'empty':
        return 'text-gray-300'
      default:
        return 'text-gray-300'
    }
  }

  return (
    <div className="mx-auto mb-16 max-w-[650px] xl:w-[650px]">
      <div
        className="overflow-hidden rounded-sm bg-gray-900 shadow-2xl ring-4 shadow-green-400/30 ring-green-400/40 transition-all duration-700 will-change-transform"
        style={{
          transform: `perspective(1200px) rotateX(${tilt.x * 0.3}deg) rotateY(${tilt.y * 0.3}deg)`,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between bg-gray-800 px-4 py-3">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-2">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-sm font-medium text-gray-400">❤️ Ghostty</div>
          </div>
          <div className="text-xs text-gray-500">{scenes[currentScene].title}</div>
        </div>

        {/* Terminal Content */}
        <div className="h-[30rem] overflow-hidden p-6 font-mono text-[15px]">
          {displayLines.map((line, index) => (
            <div
              key={`${currentScene}-${index}`}
              className={`${getLineClass(index)} mb-1 min-h-[1.25rem]`}
            >
              {line}
              {index === currentLineIndex && isTyping && showCursor && (
                <span className="animate-pulse text-green-400">▋</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
