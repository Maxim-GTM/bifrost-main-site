'use client'

import { useState } from 'react'
import { submitPartnerApplication } from '@/app/partners-program/actions'
import { Loader2, CheckCircle2 } from 'lucide-react'

const companySizes = ['1-10', '11-50', '51-200', '201-1000', '1001-5000', '5000+']

const partnerTypes = [
  'Cloud Provider / Hyperscaler',
  'Global System Integrator',
  'Technology Partner',
  'Channel Partner',
  'Others',
]

export default function PartnerForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isSubmitting) return
    setIsSubmitting(true)
    setResult(null)

    const formData = new FormData(event.currentTarget)
    const response = await submitPartnerApplication(formData)

    if (response.success) {
      setResult({ type: 'success', text: response.message })
    } else {
      setResult({ type: 'error', text: response.message })
    }
    setIsSubmitting(false)
  }

  if (result?.type === 'success') {
    return (
      <div className="border border-gray-200 bg-white p-8 text-center md:p-12">
        <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-[var(--accent-text)]" />
        <h3 className="mb-2 text-xl text-gray-900">Application received</h3>
        <p className="mx-auto max-w-md text-sm text-gray-600">{result.text}</p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 border border-gray-200 bg-white p-6 md:p-8"
      aria-busy={isSubmitting}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="firstName"
            className="mb-1.5 block font-mono text-xs tracking-wider text-gray-500 uppercase"
          >
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            className="w-full border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-[var(--accent)] focus:outline-none"
            placeholder="Jane"
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="mb-1.5 block font-mono text-xs tracking-wider text-gray-500 uppercase"
          >
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            className="w-full border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-[var(--accent)] focus:outline-none"
            placeholder="Doe"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="workEmail"
          className="mb-1.5 block font-mono text-xs tracking-wider text-gray-500 uppercase"
        >
          Work Email *
        </label>
        <input
          type="email"
          id="workEmail"
          name="workEmail"
          required
          className="w-full border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-[var(--accent)] focus:outline-none"
          placeholder="jane@company.com"
        />
      </div>

      <div>
        <label
          htmlFor="companyName"
          className="mb-1.5 block font-mono text-xs tracking-wider text-gray-500 uppercase"
        >
          Company Name *
        </label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          required
          className="w-full border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-[var(--accent)] focus:outline-none"
          placeholder="Acme Corp"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="companySize"
            className="mb-1.5 block font-mono text-xs tracking-wider text-gray-500 uppercase"
          >
            Company Size *
          </label>
          <select
            id="companySize"
            name="companySize"
            required
            className="w-full border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 transition-colors focus:border-[var(--accent)] focus:outline-none"
          >
            <option value="">Select size</option>
            {companySizes.map((size) => (
              <option key={size} value={size}>
                {size} employees
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="companyHQ"
            className="mb-1.5 block font-mono text-xs tracking-wider text-gray-500 uppercase"
          >
            Company HQ *
          </label>
          <input
            type="text"
            id="companyHQ"
            name="companyHQ"
            required
            className="w-full border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-[var(--accent)] focus:outline-none"
            placeholder="San Francisco, CA"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="partnerType"
          className="mb-1.5 block font-mono text-xs tracking-wider text-gray-500 uppercase"
        >
          Partnership Type *
        </label>
        <select
          id="partnerType"
          name="partnerType"
          required
          className="w-full border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 transition-colors focus:border-[var(--accent)] focus:outline-none"
        >
          <option value="">Select type</option>
          {partnerTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block font-mono text-xs tracking-wider text-gray-500 uppercase"
        >
          How can we help? *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="w-full resize-none border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-[var(--accent)] focus:outline-none"
          placeholder="Tell us about your partnership goals and how you'd like to work with Bifrost..."
        />
      </div>

      {result?.type === 'error' && (
        <div className="border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {result.text}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 bg-[var(--accent)] px-6 py-3 font-mono text-sm tracking-wider text-white uppercase transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit Application'
        )}
      </button>
    </form>
  )
}
