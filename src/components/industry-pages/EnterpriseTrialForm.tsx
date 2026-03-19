'use client'

import { useState } from 'react'
import { CheckCircle2, ChevronDown, Loader2 } from 'lucide-react'
import { submitEnterpriseTrialRequest } from '@/app/industry-pages/actions'

const companySizes = ['1-10', '11-50', '51-100', '101-500', '501-1000', '1000+']
const companyRegions = [
  'North America',
  'Asia-Pacific',
  'Europe, Middle East and Africa',
  'Latin America',
]

function Field({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={`relative border-b border-black/10 bg-white ${className}`}>{children}</div>
}

function SelectField({
  id,
  name,
  value,
  onChange,
  options,
  placeholder,
  required = true,
}: {
  id: string
  name: string
  value?: string
  onChange?: (value: string) => void
  options: string[]
  placeholder: string
  required?: boolean
}) {
  return (
    <Field>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange ? (event) => onChange(event.target.value) : undefined}
        required={required}
        className="h-14 w-full appearance-none bg-transparent px-4 pr-12 text-sm text-gray-900 outline-none"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-gray-400" />
    </Field>
  )
}

export default function EnterpriseTrialForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [usingGateway, setUsingGateway] = useState('')
  const [result, setResult] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isSubmitting) return

    setIsSubmitting(true)
    setResult(null)

    const form = event.currentTarget
    const formData = new FormData(form)
    const response = await submitEnterpriseTrialRequest(formData)

    if (response.success) {
      form.reset()
      setUsingGateway('')
      setResult({ type: 'success', text: response.message })
    } else {
      setResult({ type: 'error', text: response.message })
    }

    setIsSubmitting(false)
  }

  if (result?.type === 'success') {
    return (
      <div className="relative overflow-hidden border border-gray-200 bg-white">
        <div
          className="h-10 border-b border-gray-200 opacity-60"
          style={{
            backgroundImage:
              'repeating-linear-gradient(to right, transparent 0, transparent 46px, rgba(0,0,0,0.08) 46px, rgba(0,0,0,0.08) 47px)',
          }}
        />
        <div className="px-6 py-16 text-center sm:px-10">
          <p className="font-mono text-[12px] leading-[15px] font-medium tracking-[0.04em] text-emerald-500 uppercase">
            [ REQUEST RECEIVED ]
          </p>
          <CheckCircle2 className="mx-auto mt-6 mb-4 h-12 w-12 text-[var(--accent-text)]" />
          <h2 className="mx-auto max-w-xl text-[28px] leading-[120%] font-medium tracking-[-0.02em] text-black">
            Your free trial request is in
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#525252]">
            {result.text}
          </p>
        </div>
        <div
          className="h-10 border-t border-gray-200 opacity-60"
          style={{
            backgroundImage:
              'repeating-linear-gradient(to right, transparent 0, transparent 46px, rgba(0,0,0,0.08) 46px, rgba(0,0,0,0.08) 47px)',
          }}
        />
      </div>
    )
  }

  return (
    <section className="relative overflow-hidden border border-gray-200 bg-white">
      <div
        className="h-10 border-b border-gray-200 opacity-60"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to right, transparent 0, transparent 46px, rgba(0,0,0,0.08) 46px, rgba(0,0,0,0.08) 47px)',
        }}
      />

      <div className="px-6 py-12 sm:px-10 md:px-16 md:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[12px] leading-[15px] font-medium tracking-[0.04em] text-emerald-500 uppercase">
            [ SHIP RELIABLE AI ]
          </p>
          <h2 className="mx-auto mt-4 max-w-xl text-[28px] leading-[120%] font-medium tracking-[-0.02em] text-black">
            Try Bifrost Enterprise with a 14-day Free Trial
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-10 max-w-2xl"
          aria-busy={isSubmitting}
          noValidate
        >
          <div className="overflow-hidden border border-black/10 bg-[#F9F9F9] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="sr-only"
              aria-hidden="true"
            />

            <Field>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Enter your name"
                className="h-14 w-full bg-transparent px-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none"
              />
            </Field>

            <Field>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Enter your work email"
                className="h-14 w-full bg-transparent px-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none"
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2">
              <SelectField
                id="companySize"
                name="companySize"
                options={companySizes}
                placeholder="Select company size ..."
              />
              <SelectField
                id="companyHQ"
                name="companyHQ"
                options={companyRegions}
                placeholder="Select company HQ ..."
              />
            </div>

            <SelectField
              id="usingGateway"
              name="usingGateway"
              value={usingGateway}
              onChange={setUsingGateway}
              options={['Yes', 'No']}
              placeholder="Are you using an LLM Gateway today?"
            />

            {usingGateway === 'Yes' && (
              <Field className="border-b-0">
                <input
                  type="text"
                  id="existingGatewaySolution"
                  name="existingGatewaySolution"
                  required
                  placeholder="Name of existing LLM Gateway solution"
                  className="h-14 w-full bg-transparent px-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none"
                />
              </Field>
            )}

            {result?.type === 'error' && (
              <div className="border-t border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {result.text}
              </div>
            )}

            <div className="border-t border-black/10 p-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="relative flex h-12 w-full items-center justify-center overflow-hidden bg-[var(--accent)] px-4 font-mono text-[14px] leading-5 font-semibold tracking-[0.04em] text-white uppercase shadow-[0_0_6px_rgba(72,213,151,0.4),0_2px_2px_rgba(0,0,0,0.08),inset_2px_2px_0_rgba(255,255,255,0.3),inset_0_-2px_0_rgba(0,0,0,0.12)] transition-transform hover:scale-[0.995] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span
                  className="absolute top-0 left-0 h-2 w-2 border-t border-l"
                  style={{ borderColor: 'var(--btn-primary-corner)' }}
                />
                <span
                  className="absolute top-0 right-0 h-2 w-2 border-t border-r"
                  style={{ borderColor: 'var(--btn-primary-corner)' }}
                />
                <span
                  className="absolute bottom-0 left-0 h-2 w-2 border-b border-l"
                  style={{ borderColor: 'var(--btn-primary-corner)' }}
                />
                <span
                  className="absolute right-0 bottom-0 h-2 w-2 border-r border-b"
                  style={{ borderColor: 'var(--btn-primary-corner)' }}
                />
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending Request
                  </span>
                ) : (
                  'Request License'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      <div
        className="h-10 border-t border-gray-200 opacity-60"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to right, transparent 0, transparent 46px, rgba(0,0,0,0.08) 46px, rgba(0,0,0,0.08) 47px)',
        }}
      />
    </section>
  )
}
