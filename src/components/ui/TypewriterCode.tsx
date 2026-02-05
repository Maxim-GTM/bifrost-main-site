'use client'

import { useEffect, useMemo, useState } from 'react'

export function TypewriterCode() {
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [showCursor, setShowCursor] = useState(true)
  const [isClient, setIsClient] = useState(false)

  const codeLines = useMemo(() => [
    { text: '# Install with Docker', className: 'text-gray-500 mb-4 font-medium' },
    { text: 'docker pull maximhq/bifrost', className: 'text-green-400 mb-1' },
    { text: 'docker run -p 8080:8080 \\', className: 'text-green-400 mb-1' },
    { text: '  -v $(pwd)/config.json:/app/config/config.json \\', className: 'text-green-400 mb-1' },
    { text: '  -e OPENAI_API_KEY \\', className: 'text-green-400 mb-1' },
    { text: '  maximhq/bifrost', className: 'text-green-400 mb-6' },
    { text: '', className: 'mb-2' },
    { text: '# Simple config.json', className: 'text-gray-500 mb-4 font-medium' },
    { text: '{', className: 'text-gray-300' },
    { text: '  "providers": {', className: 'text-gray-300 ml-2' },
    { text: '    "openai": {', className: 'text-gray-300 ml-4' },
    { text: '      "keys": [{', className: 'text-gray-300 ml-6' },
    { text: '        "value": "env.OPENAI_API_KEY",', className: 'text-gray-300 ml-8' },
    { text: '        "models": ["gpt-4o-mini"],', className: 'text-gray-300 ml-8' },
    { text: '        "weight": 1.0', className: 'text-gray-300 ml-8' },
    { text: '      }]', className: 'text-gray-300 ml-6' },
    { text: '    }', className: 'text-gray-300 ml-4' },
    { text: '  }', className: 'text-gray-300 ml-2' },
    { text: '}', className: 'text-gray-300' }
  ], [])

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    if (currentLineIndex >= codeLines.length) {
      // Animation complete, hide cursor after a delay
      const timer = setTimeout(() => setShowCursor(false), 1000)
      return () => clearTimeout(timer)
    }

    const currentLine = codeLines[currentLineIndex]
    const typingDelay = currentLine.text === '' ? 200 : 50 // Shorter delay for empty lines

    if (currentCharIndex <= currentLine.text.length) {
      const timer = setTimeout(() => {
        if (currentCharIndex === currentLine.text.length) {
          // Line complete, move to next line
          setDisplayedLines(prev => [...prev, currentLine.text])
          setCurrentLineIndex(prev => prev + 1)
          setCurrentCharIndex(0)
        } else {
          // Continue typing current line
          setCurrentCharIndex(prev => prev + 1)
        }
      }, typingDelay)

      return () => clearTimeout(timer)
    }
  }, [currentLineIndex, currentCharIndex, codeLines, isClient])

  // Cursor blinking effect
  useEffect(() => {
    if (!isClient || !showCursor) return
    
    const interval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => clearInterval(interval)
  }, [isClient, showCursor])

  const renderLineWithSyntaxHighlighting = (text: string) => {
    // Apply syntax highlighting for JSON lines
    if (text.includes('"') && (text.includes('providers') || text.includes('openai') || text.includes('keys') || text.includes('value') || text.includes('models') || text.includes('weight'))) {
      return (
        <span>
          {text.split('"').map((part, i) => {
            if (i % 2 === 1) {
              // Inside quotes
              if (['providers', 'openai', 'keys', 'value', 'models', 'weight'].includes(part)) {
                return <span key={i} className="text-emerald-400">&quot;{part}&quot;</span>
              } else if (part === 'env.OPENAI_API_KEY' || part === 'gpt-4o-mini') {
                return <span key={i} className="text-yellow-300">&quot;{part}&quot;</span>
              }
              return `"${part}"`
            }
            // Handle numbers
            if (part.includes('1.0')) {
              return part.replace('1.0', '')
            }
            return part
          })}
          {text.includes('1.0') && <span className="text-orange-400">1.0</span>}
        </span>
      )
    }
    
    return text
  }

  return (
    <div className="text-gray-300 font-mono text-sm leading-relaxed">
      {displayedLines.map((line, index) => (
        <div key={index} className={codeLines[index]?.className || 'text-gray-300'}>
          {renderLineWithSyntaxHighlighting(line)}
        </div>
      ))}
      
      {/* Current typing line */}
      {currentLineIndex < codeLines.length && (
        <div className={codeLines[currentLineIndex].className}>
          {renderLineWithSyntaxHighlighting(
            codeLines[currentLineIndex].text.substring(0, currentCharIndex)
          )}
          {showCursor && <span className="animate-pulse bg-green-400 text-green-400 inline-block w-[1px] h-4">█</span>}
        </div>
      )}
    </div>
  )
} 