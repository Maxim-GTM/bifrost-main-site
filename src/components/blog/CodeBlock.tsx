'use client'

import { Check, Copy } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { EditorView, lineNumbers, highlightSpecialChars } from '@codemirror/view'
import { EditorState, Extension } from '@codemirror/state'
import { syntaxHighlighting, HighlightStyle } from '@codemirror/language'
import { tags } from '@lezer/highlight'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { json } from '@codemirror/lang-json'
import { markdown } from '@codemirror/lang-markdown'
import { yaml } from '@codemirror/lang-yaml'
import { xml } from '@codemirror/lang-xml'
import { rust } from '@codemirror/lang-rust'
import { go } from '@codemirror/lang-go'
import { java } from '@codemirror/lang-java'
import { cpp } from '@codemirror/lang-cpp'
import { sql } from '@codemirror/lang-sql'
import { php } from '@codemirror/lang-php'

interface CodeBlockProps {
  code: string
  language?: string
}

// Bifrost syntax highlighting colors
const bifrostHighlightStyle = HighlightStyle.define([
  { tag: tags.keyword, color: '#10b981', fontWeight: '500' },
  { tag: tags.controlKeyword, color: '#10b981', fontWeight: '500' },
  { tag: tags.moduleKeyword, color: '#10b981', fontWeight: '500' },
  { tag: tags.operatorKeyword, color: '#10b981' },
  { tag: tags.operator, color: '#10b981' },
  { tag: tags.compareOperator, color: '#10b981' },
  { tag: tags.arithmeticOperator, color: '#10b981' },
  { tag: tags.logicOperator, color: '#10b981' },
  { tag: tags.bitwiseOperator, color: '#10b981' },
  { tag: tags.definitionOperator, color: '#10b981' },
  { tag: tags.updateOperator, color: '#10b981' },
  { tag: tags.typeOperator, color: '#10b981' },

  { tag: tags.typeName, color: '#60a5fa' },
  { tag: tags.className, color: '#60a5fa' },
  { tag: tags.namespace, color: '#60a5fa' },
  { tag: tags.labelName, color: '#60a5fa' },
  { tag: tags.attributeName, color: '#60a5fa' },
  { tag: tags.propertyName, color: '#60a5fa' },

  { tag: tags.function(tags.variableName), color: '#a78bfa' },
  { tag: tags.function(tags.propertyName), color: '#a78bfa' },
  { tag: tags.macroName, color: '#a78bfa' },

  { tag: tags.variableName, color: '#e5e7eb' },
  { tag: tags.definition(tags.variableName), color: '#e5e7eb' },
  { tag: tags.local(tags.variableName), color: '#e5e7eb' },
  { tag: tags.special(tags.variableName), color: '#a78bfa' },

  { tag: tags.string, color: '#fbbf24' },
  { tag: tags.character, color: '#fbbf24' },
  { tag: tags.regexp, color: '#fbbf24' },
  { tag: tags.docString, color: '#fbbf24' },

  { tag: tags.number, color: '#f472b6' },
  { tag: tags.integer, color: '#f472b6' },
  { tag: tags.float, color: '#f472b6' },
  { tag: tags.bool, color: '#f472b6' },
  { tag: tags.null, color: '#f472b6' },
  { tag: tags.atom, color: '#f472b6' },
  { tag: tags.literal, color: '#f472b6' },
  { tag: tags.escape, color: '#f472b6' },

  { tag: tags.comment, color: '#6b7280', fontStyle: 'italic' },
  { tag: tags.lineComment, color: '#6b7280', fontStyle: 'italic' },
  { tag: tags.blockComment, color: '#6b7280', fontStyle: 'italic' },
  { tag: tags.docComment, color: '#6b7280', fontStyle: 'italic' },

  { tag: tags.meta, color: '#9ca3af' },
  { tag: tags.annotation, color: '#9ca3af' },
  { tag: tags.processingInstruction, color: '#9ca3af' },

  { tag: tags.tagName, color: '#10b981' },
  { tag: tags.self, color: '#f472b6' },

  { tag: tags.punctuation, color: '#9ca3af' },
  { tag: tags.paren, color: '#e5e7eb' },
  { tag: tags.brace, color: '#e5e7eb' },
  { tag: tags.squareBracket, color: '#e5e7eb' },
  { tag: tags.angleBracket, color: '#6b7280' },
  { tag: tags.separator, color: '#9ca3af' },
  { tag: tags.derefOperator, color: '#9ca3af' },

  { tag: tags.heading, color: '#60a5fa', fontWeight: 'bold' },
  { tag: tags.heading1, color: '#60a5fa', fontWeight: 'bold' },
  { tag: tags.heading2, color: '#60a5fa', fontWeight: 'bold' },
  { tag: tags.heading3, color: '#60a5fa', fontWeight: 'bold' },
  { tag: tags.link, color: '#10b981', textDecoration: 'underline' },
  { tag: tags.url, color: '#10b981' },
  { tag: tags.emphasis, fontStyle: 'italic' },
  { tag: tags.strong, fontWeight: 'bold' },
  { tag: tags.strikethrough, textDecoration: 'line-through' },

  { tag: tags.inserted, color: '#10b981' },
  { tag: tags.deleted, color: '#ef4444' },
  { tag: tags.changed, color: '#fbbf24' },
  { tag: tags.invalid, color: '#ef4444', textDecoration: 'underline' },
])

// Custom dark theme
const bifrostTheme = EditorView.theme(
  {
    '&': {
      backgroundColor: '#111827',
      color: '#e5e7eb',
      fontSize: '14px',
      fontFamily: "'Geist Mono', 'Cascadia Code', 'Fira Code', ui-monospace, monospace",
    },
    '.cm-content': {
      padding: '16px 0',
      caretColor: '#10b981',
    },
    '.cm-line': {
      padding: '0 16px',
      lineHeight: '1.6',
    },
    '.cm-gutters': {
      backgroundColor: '#111827',
      color: '#4b5563',
      border: 'none',
      paddingLeft: '8px',
    },
    '.cm-lineNumbers .cm-gutterElement': {
      padding: '0 12px 0 8px',
      minWidth: '40px',
      fontSize: '13px',
    },
    '.cm-activeLineGutter': {
      backgroundColor: 'transparent',
      color: '#9ca3af',
    },
    '&.cm-focused': {
      outline: 'none',
    },
    '.cm-selectionBackground': {
      backgroundColor: '#374151 !important',
    },
    '&.cm-focused .cm-selectionBackground': {
      backgroundColor: '#374151 !important',
    },
    '.cm-cursor': {
      borderLeftColor: '#10b981',
    },
  },
  { dark: true }
)

// Get language extension based on language name
function getLanguageExtension(language: string): Extension | null {
  const langMap: Record<string, () => Extension> = {
    javascript: () => javascript(),
    js: () => javascript(),
    jsx: () => javascript({ jsx: true }),
    typescript: () => javascript({ typescript: true }),
    ts: () => javascript({ typescript: true }),
    tsx: () => javascript({ jsx: true, typescript: true }),
    python: () => python(),
    py: () => python(),
    html: () => html(),
    htm: () => html(),
    css: () => css(),
    scss: () => css(),
    less: () => css(),
    json: () => json(),
    markdown: () => markdown(),
    md: () => markdown(),
    yaml: () => yaml(),
    yml: () => yaml(),
    xml: () => xml(),
    svg: () => xml(),
    rust: () => rust(),
    rs: () => rust(),
    go: () => go(),
    golang: () => go(),
    java: () => java(),
    cpp: () => cpp(),
    'c++': () => cpp(),
    c: () => cpp(),
    cxx: () => cpp(),
    sql: () => sql(),
    mysql: () => sql(),
    postgresql: () => sql(),
    php: () => php(),
    shell: () => javascript(), // Basic fallback
    bash: () => javascript(), // Basic fallback
    sh: () => javascript(), // Basic fallback
  }

  const factory = langMap[language.toLowerCase()]
  return factory ? factory() : null
}

export function CodeBlock({ code, language = 'plaintext' }: CodeBlockProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<EditorView | null>(null)
  const [isCopied, setIsCopied] = useState(false)

  // Map common language aliases for display
  const displayLanguage = language
    .toLowerCase()
    .replace('javascript', 'js')
    .replace('typescript', 'ts')
    .replace('python', 'py')
    .replace('markdown', 'md')

  useEffect(() => {
    if (!editorRef.current) return

    // Clean up any existing editor
    if (viewRef.current) {
      viewRef.current.destroy()
      viewRef.current = null
    }

    // Get language extension first
    const langExt = getLanguageExtension(language)

    // Build extensions array - order matters!
    const extensions: Extension[] = [
      // Language extension must come first for parsing
      ...(langExt ? [langExt] : []),
      // Then syntax highlighting
      syntaxHighlighting(bifrostHighlightStyle),
      // Theme and visual settings
      bifrostTheme,
      lineNumbers(),
      highlightSpecialChars(),
      EditorState.readOnly.of(true),
      EditorView.editable.of(false),
      EditorView.lineWrapping,
    ]

    const state = EditorState.create({
      doc: code,
      extensions,
    })

    const view = new EditorView({
      state,
      parent: editorRef.current,
    })

    viewRef.current = view

    return () => {
      view.destroy()
    }
  }, [code, language])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className="group relative my-8 overflow-hidden rounded-xl border border-gray-700 bg-[#111827]">
      {/* Language badge and copy button */}
      <div className="flex items-center justify-between border-b border-gray-700 bg-[#0d1117] px-4 py-2.5">
        <span className="font-mono text-xs font-medium tracking-wider text-gray-400 uppercase">
          {displayLanguage}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded px-2 py-1 text-xs text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
          aria-label="Copy code"
        >
          {isCopied ? (
            <>
              <Check className="h-3.5 w-3.5 text-green-500" />
              <span className="text-green-500">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* CodeMirror Editor */}
      <div ref={editorRef} className="max-h-[500px] w-full overflow-auto" />
    </div>
  )
}
