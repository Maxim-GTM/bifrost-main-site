'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

type SetupStep = {
  step: string
  title: string
  description: string
  code: string
}

type SetupStepsProps = {
  steps: SetupStep[]
}

export default function SetupSteps({ steps }: SetupStepsProps) {
  const [copiedStep, setCopiedStep] = useState<string | null>(null)

  const handleCopyStep = (stepId: string, code: string) => {
    const commandsOnly = code
      .split('\n')
      .filter((line) => line.trim() && !line.trim().startsWith('#'))
      .join('\n')

    navigator.clipboard.writeText(commandsOnly)
    setCopiedStep(stepId)
    setTimeout(() => setCopiedStep(null), 2000)
  }

  return (
    <div className="grid items-stretch gap-6 md:grid-cols-3">
      {steps.map((step) => (
        <div key={step.step} className="flex flex-col border border-gray-200 bg-white">
          <div className="flex-1 p-6">
            <span className="font-mono text-xs tracking-wider text-[var(--accent-text)] uppercase">
              Step {step.step}
            </span>
            <h3 className="mt-2 mb-2 font-semibold text-gray-900">{step.title}</h3>
            <p className="text-sm leading-relaxed text-gray-600">{step.description}</p>
          </div>
          <div className="min-h-[120px] border-t border-gray-800 bg-gray-900">
            <div className="flex items-center justify-between border-b border-gray-800 bg-gray-900/80 px-4 py-2">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-gray-600" />
                <span className="h-2 w-2 rounded-full bg-gray-600" />
                <span className="h-2 w-2 rounded-full bg-gray-600" />
                <span className="ml-2 font-mono text-[10px] tracking-wider text-gray-400 uppercase">
                  Terminal
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleCopyStep(step.step, step.code)}
                className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-gray-300 uppercase transition-colors hover:text-white"
              >
                {copiedStep === step.step ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[var(--accent-text)]" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <div className="space-y-1 overflow-x-auto px-4 py-3 font-mono text-xs text-gray-200">
              {step.code.split('\n').map((line, index) => {
                const isComment = line.trim().startsWith('#')
                return (
                  <div
                    key={`${step.step}-${index}`}
                    className="grid grid-cols-[24px_12px_1fr] items-start gap-3 leading-5"
                  >
                    <span className="text-right text-gray-500 tabular-nums">{index + 1}</span>
                    <span className="text-gray-500">$</span>
                    <span
                      className={`break-all whitespace-pre-wrap ${isComment ? 'text-gray-400 italic' : 'text-gray-100'}`}
                    >
                      {line}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
