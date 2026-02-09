'use client'

import { useState } from 'react'
import { Zap, Copy, Check } from 'lucide-react'

type SDKTab = 'openai' | 'anthropic' | 'litellm' | 'genai'

interface CodeLine {
  number: number
  content: React.ReactNode
  highlighted?: boolean
}

const codeExamples: Record<SDKTab, { filename: string; lines: CodeLine[] }> = {
  openai: {
    filename: 'openAI.py',
    lines: [
      {
        number: 1,
        content: (
          <>
            <span className="text-[#3a7eb4]">import</span> os
          </>
        ),
      },
      {
        number: 2,
        content: (
          <>
            <span className="text-[#3a7eb4]">from</span> openai{' '}
            <span className="text-[#3a7eb4]">import</span> OpenAI
          </>
        ),
      },
      { number: 3, content: '' },
      { number: 4, content: 'client = OpenAI(' },
      {
        number: 5,
        content: (
          <>
            {' '}
            api_key=os.environ.get(
            <span className="text-[#ca643c]">&quot;OPENAI_API_KEY&quot;</span>),
          </>
        ),
      },
      {
        number: 6,
        content: (
          <>
            {' '}
            base_url=
            <span className="text-[#ca643c]">&quot;https://&lt;bifrost_url&gt;/openai&quot;</span>,
          </>
        ),
        highlighted: true,
      },
      { number: 7, content: ')' },
      { number: 8, content: '' },
      { number: 9, content: 'response = client.chat.completions.create(' },
      {
        number: 10,
        content: (
          <>
            {' '}
            model=<span className="text-[#ca643c]">&quot;gpt-4o&quot;</span>,
          </>
        ),
      },
      { number: 11, content: '    messages=[' },
      {
        number: 12,
        content: (
          <> {'{&quot;role&quot;: &quot;user&quot;, &quot;content&quot;: &quot;Hello!&quot;}'}</>
        ),
      },
      { number: 13, content: '    ]' },
      { number: 14, content: ')' },
    ],
  },
  anthropic: {
    filename: 'Anthropic.py',
    lines: [
      {
        number: 1,
        content: (
          <>
            <span className="text-[#3a7eb4]">import</span> os
          </>
        ),
      },
      {
        number: 2,
        content: (
          <>
            <span className="text-[#3a7eb4]">from</span> anthropic{' '}
            <span className="text-[#3a7eb4]">import</span> Anthropic
          </>
        ),
      },
      { number: 3, content: '' },
      { number: 4, content: 'anthropic = Anthropic(' },
      {
        number: 5,
        content: (
          <>
            {' '}
            api_key=os.environ.get(
            <span className="text-[#ca643c]">&quot;ANTHROPIC_API_KEY&quot;</span>),
          </>
        ),
      },
      {
        number: 6,
        content: (
          <>
            {' '}
            base_url=
            <span className="text-[#ca643c]">
              &quot;https://&lt;bifrost_url&gt;/anthropic&quot;
            </span>
            ,
          </>
        ),
        highlighted: true,
      },
      { number: 7, content: ')' },
      { number: 8, content: '' },
      { number: 9, content: 'message = anthropic.messages.create(' },
      {
        number: 10,
        content: (
          <>
            {' '}
            model=<span className="text-[#ca643c]">&quot;claude-3-5-sonnet-20241022&quot;</span>,
          </>
        ),
      },
      { number: 11, content: '    max_tokens=1024,' },
      { number: 12, content: '    messages=[' },
      { number: 13, content: <> {'{"role": "user", "content": "Hello, Claude"}'}</> },
      { number: 14, content: '    ]' },
      { number: 15, content: ')' },
    ],
  },
  litellm: {
    filename: 'LiteLLM.py',
    lines: [
      {
        number: 1,
        content: (
          <>
            <span className="text-[#3a7eb4]">import</span> litellm
          </>
        ),
      },
      { number: 2, content: '' },
      { number: 3, content: <># Set the base URL to your Bifrost deployment</> },
      {
        number: 4,
        content: (
          <>
            litellm.api_base ={' '}
            <span className="text-[#ca643c]">&quot;https://&lt;bifrost_url&gt;&quot;</span>
          </>
        ),
        highlighted: true,
      },
      { number: 5, content: '' },
      { number: 6, content: 'response = litellm.completion(' },
      {
        number: 7,
        content: (
          <>
            {' '}
            model=<span className="text-[#ca643c]">&quot;gpt-4o&quot;</span>,
          </>
        ),
      },
      { number: 8, content: '    messages=[' },
      { number: 9, content: <> {'{"role": "user", "content": "Hello!"}'}</> },
      { number: 10, content: '    ]' },
      { number: 11, content: ')' },
    ],
  },
  genai: {
    filename: 'Genai.py',
    lines: [
      {
        number: 1,
        content: (
          <>
            <span className="text-[#3a7eb4]">import</span> google.generativeai{' '}
            <span className="text-[#3a7eb4]">as</span> genai
          </>
        ),
      },
      { number: 2, content: '' },
      { number: 3, content: 'genai.configure(' },
      {
        number: 4,
        content: (
          <>
            {' '}
            api_key=<span className="text-[#ca643c]">&quot;YOUR_API_KEY&quot;</span>,
          </>
        ),
      },
      {
        number: 5,
        content: (
          <>
            {' '}
            transport=<span className="text-[#ca643c]">&quot;rest&quot;</span>,
          </>
        ),
      },
      {
        number: 6,
        content: <> client_options={'{"api_endpoint": "<bifrost_url>/google"}'}</>,
        highlighted: true,
      },
      { number: 7, content: ')' },
      { number: 8, content: '' },
      {
        number: 9,
        content: (
          <>
            model = genai.GenerativeModel(
            <span className="text-[#ca643c]">&quot;gemini-pro&quot;</span>)
          </>
        ),
      },
      {
        number: 10,
        content: (
          <>
            response = model.generate_content(
            <span className="text-[#ca643c]">&quot;Hello!&quot;</span>)
          </>
        ),
      },
    ],
  },
}

export default function DropInReplacement() {
  const [activeTab, setActiveTab] = useState<SDKTab>('anthropic')
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    // Create plain text version of code
    const code = codeExamples[activeTab].lines
      .map((line) => {
        if (typeof line.content === 'string') return line.content
        return line.content?.toString() || ''
      })
      .join('\n')
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const tabs: { id: SDKTab; label: string; active: boolean }[] = [
    { id: 'openai', label: 'openAI.py', active: activeTab === 'openai' },
    { id: 'anthropic', label: 'Anthropic.py', active: activeTab === 'anthropic' },
    { id: 'litellm', label: 'LiteLLM.py', active: activeTab === 'litellm' },
    { id: 'genai', label: 'Genai.py', active: activeTab === 'genai' },
  ]

  return (
    <div className="border border-gray-200 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side - Text Content */}
        <div className="flex flex-col justify-center border-b border-gray-200 p-6 sm:p-8 lg:border-r lg:border-b-0 lg:p-12">
          {/* Badge */}
          <div className="mb-6 flex items-center gap-2">
            <Zap className="h-4 w-4 text-[var(--accent-text)]" strokeWidth={1.5} />
            <span className="font-mono text-xs font-medium tracking-wider text-[var(--accent-text)] uppercase">
              [quick setup]
            </span>
          </div>

          {/* Title */}
          <h2 className="mb-4 text-2xl leading-tight font-medium tracking-tight text-gray-900 lg:text-3xl">
            Drop-in replacement for any AI SDK
          </h2>

          {/* Description */}
          <p className="text-sm leading-relaxed text-gray-600 lg:text-base">
            Change just one line of code. Works with OpenAI, Anthropic, Vercel AI SDK, LangChain,
            and more.
          </p>
        </div>

        {/* Right Side - Code Editor */}
        <div className="flex flex-col">
          {/* Tab Bar */}
          <div className="flex flex-col border-b border-gray-200 bg-gray-50 sm:flex-row">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex-none border-r border-gray-200 px-4 py-3 font-mono text-xs font-semibold tracking-wider whitespace-nowrap uppercase transition-all ${
                    tab.active
                      ? 'bg-white text-gray-900'
                      : 'bg-gray-50 text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {tab.active && (
                    <>
                      <div className="absolute top-1 left-1 h-1.5 w-1.5 border-t border-l border-[var(--accent)]" />
                      <div className="absolute top-1 right-1 h-1.5 w-1.5 border-t border-r border-[var(--accent)]" />
                      <div className="absolute bottom-1 left-1 h-1.5 w-1.5 border-b border-l border-[var(--accent)]" />
                      <div className="absolute right-1 bottom-1 h-1.5 w-1.5 border-r border-b border-[var(--accent)]" />
                    </>
                  )}
                  {tab.label}
                </button>
              ))}
            </div>
            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-2 border-t border-r border-gray-200 bg-gray-50 px-4 py-3 transition-colors hover:bg-gray-100 sm:border-t-0 sm:border-l"
            >
              {copied ? (
                <Check className="h-4 w-4 text-[var(--accent)]" />
              ) : (
                <Copy className="h-4 w-4 text-gray-500" />
              )}
              <span className="font-mono text-xs font-semibold text-gray-700 uppercase">
                {copied ? 'Copied!' : 'Copy'}
              </span>
            </button>
          </div>

          {/* Code Editor */}
          <div className="overflow-x-auto bg-white p-4">
            <div className="space-y-0.5 font-mono text-[10px] leading-relaxed">
              {codeExamples[activeTab].lines.map((line) => (
                <div
                  key={line.number}
                  className={`flex ${line.highlighted ? '-mx-4 bg-[var(--accent)]/10 px-4 py-0.5' : ''}`}
                >
                  <span className="w-6 flex-shrink-0 text-[var(--accent-text)] select-none">
                    {line.number}
                  </span>
                  <span className="whitespace-pre text-gray-900">{line.content}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-2 border-t border-gray-200 bg-gray-50 px-4 py-3">
            <svg viewBox="0 0 16 16" className="h-4 w-4 text-gray-400">
              <path
                d="M8 0L0 4v8l8 4 8-4V4L8 0zm0 2l6 3-6 3-6-3 6-3zm-6 5l6 3 6-3v4l-6 3-6-3V7z"
                fill="currentColor"
              />
            </svg>
            <span className="font-mono text-xs tracking-wider text-gray-500 uppercase opacity-50">
              Drop in once, run everywhere.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
