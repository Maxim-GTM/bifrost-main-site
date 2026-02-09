'use client'

import { useState } from 'react'

export function EmailCaptureForm() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Add your form submission logic here
    console.log('Email submitted:', email)
    setTimeout(() => {
      setIsSubmitting(false)
      setEmail('')
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex max-w-2xl gap-0">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your work email"
        required
        className="focus:ring-accent flex-1 rounded-l-lg border border-gray-300 px-6 py-4 text-base focus:border-transparent focus:ring-2 focus:outline-none"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-accent hover:bg-accent-dark rounded-r-lg px-8 py-4 text-sm font-medium tracking-wide whitespace-nowrap text-white uppercase transition-colors disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? 'REQUESTING...' : 'REQUEST LICENSE'}
      </button>
    </form>
  )
}
