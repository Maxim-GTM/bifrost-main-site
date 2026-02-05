'use client';

import { useState } from 'react';

export function EmailCaptureForm() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Add your form submission logic here
    console.log('Email submitted:', email);
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail('');
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-0 max-w-2xl mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your work email"
        required
        className="flex-1 px-6 py-4 text-base border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-8 py-4 bg-accent text-white font-medium text-sm uppercase tracking-wide rounded-r-lg hover:bg-accent-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
      >
        {isSubmitting ? 'REQUESTING...' : 'REQUEST LICENSE'}
      </button>
    </form>
  );
}
