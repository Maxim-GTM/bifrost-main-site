'use client'

import { useEffect, useState } from 'react'

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  html: string
}

export function TableOfContents({ html }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // Parse headings from HTML
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const elements = doc.querySelectorAll('h2, h3')
    
    const items: TocItem[] = Array.from(elements).map((el, index) => {
      const id = el.id || `heading-${index}`
      return {
        id,
        text: el.textContent || '',
        level: parseInt(el.tagName[1])
      }
    })
    
    setHeadings(items)
  }, [html])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0px -80% 0px' }
    )

    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav>
      <h4 className="mb-4 text-sm font-semibold text-gray-900 uppercase tracking-wider font-sans">
        In this article
      </h4>
      <ul className="space-y-2 text-sm">
        {headings.map(heading => (
          <li 
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
          >
            <a
              href={`#${heading.id}`}
              className={`block py-1 transition-colors font-sans ${
                activeId === heading.id
                  ? 'text-accent font-medium'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
              onClick={e => {
                e.preventDefault()
                const element = document.getElementById(heading.id)
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

