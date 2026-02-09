'use client'

import parse, { DOMNode, Element, HTMLReactParserOptions } from 'html-react-parser'
import { useMemo } from 'react'
import { CodeBlock } from './CodeBlock'

interface BlogContentProps {
  html: string
}

export function BlogContent({ html }: BlogContentProps) {
  const content = useMemo(() => {
    const options: HTMLReactParserOptions = {
      replace: (domNode) => {
        // Handle pre > code blocks
        if (domNode instanceof Element && domNode.name === 'pre') {
          const codeElement = domNode.children.find(
            (child): child is Element => child instanceof Element && child.name === 'code'
          )

          if (codeElement) {
            // Extract language from class (e.g., "language-javascript")
            const className = codeElement.attribs?.class || ''
            const languageMatch = className.match(/language-(\w+)/)
            const language = languageMatch ? languageMatch[1] : 'plaintext'

            // Extract code content
            const code = extractTextContent(codeElement)

            return <CodeBlock code={code} language={language} />
          }
        }

        // Handle Ghost's kg-code-card which wraps pre blocks
        if (domNode instanceof Element && domNode.attribs?.class?.includes('kg-code-card')) {
          const preElement = findElement(domNode, 'pre')
          if (preElement) {
            const codeElement = findElement(preElement, 'code')
            if (codeElement) {
              const className = codeElement.attribs?.class || ''
              const languageMatch = className.match(/language-(\w+)/)
              const language = languageMatch ? languageMatch[1] : 'plaintext'
              const code = extractTextContent(codeElement)

              return <CodeBlock code={code} language={language} />
            }
          }
        }

        return undefined
      },
    }

    return parse(html, options)
  }, [html])

  return <div className="blog-content">{content}</div>
}

// Helper function to extract text content from an element
function extractTextContent(element: Element): string {
  let text = ''

  function traverse(nodes: DOMNode[]) {
    for (const node of nodes) {
      if (node.type === 'text') {
        text += (node as unknown as { data: string }).data
      } else if (node instanceof Element && node.children) {
        traverse(node.children as DOMNode[])
      }
    }
  }

  traverse(element.children as DOMNode[])
  return text.trim()
}

// Helper function to find an element by tag name
function findElement(parent: Element, tagName: string): Element | null {
  for (const child of parent.children) {
    if (child instanceof Element) {
      if (child.name === tagName) {
        return child
      }
      const found = findElement(child, tagName)
      if (found) return found
    }
  }
  return null
}
