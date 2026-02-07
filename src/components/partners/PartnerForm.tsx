'use client';

import { useState } from 'react';
import { submitPartnerApplication } from '@/app/partners-program/actions';
import { Loader2, CheckCircle2 } from 'lucide-react';

const companySizes = [
    '1-10',
    '11-50',
    '51-200',
    '201-1000',
    '1001-5000',
    '5000+',
];

const partnerTypes = [
    'Cloud Provider / Hyperscaler',
    'Global System Integrator',
    'Technology Partner',
    'Channel Partner',
    'Others',
];

export default function PartnerForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        setResult(null);

        const formData = new FormData(event.currentTarget);
        const response = await submitPartnerApplication(formData);

        if (response.success) {
            setResult({ type: 'success', text: response.message });
        } else {
            setResult({ type: 'error', text: response.message });
        }
        setIsSubmitting(false);
    }

    if (result?.type === 'success') {
        return (
            <div className="border border-gray-200 bg-white p-8 md:p-12 text-center">
                <CheckCircle2 className="w-12 h-12 text-[var(--accent-text)] mx-auto mb-4" />
                <h3 className="text-xl text-gray-900 mb-2">Application received</h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                    {result.text}
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="border border-gray-200 bg-white p-6 md:p-8 space-y-5" aria-busy={isSubmitting}>
            <div className="grid sm:grid-cols-2 gap-5">
                <div>
                    <label htmlFor="firstName" className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-1.5">
                        First Name *
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        className="w-full px-3 py-2.5 border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[var(--accent)] transition-colors"
                        placeholder="Jane"
                    />
                </div>
                <div>
                    <label htmlFor="lastName" className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-1.5">
                        Last Name *
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        className="w-full px-3 py-2.5 border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[var(--accent)] transition-colors"
                        placeholder="Doe"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="workEmail" className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-1.5">
                    Work Email *
                </label>
                <input
                    type="email"
                    id="workEmail"
                    name="workEmail"
                    required
                    className="w-full px-3 py-2.5 border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[var(--accent)] transition-colors"
                    placeholder="jane@company.com"
                />
            </div>

            <div>
                <label htmlFor="companyName" className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-1.5">
                    Company Name *
                </label>
                <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    required
                    className="w-full px-3 py-2.5 border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[var(--accent)] transition-colors"
                    placeholder="Acme Corp"
                />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
                <div>
                    <label htmlFor="companySize" className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-1.5">
                        Company Size *
                    </label>
                    <select
                        id="companySize"
                        name="companySize"
                        required
                        className="w-full px-3 py-2.5 border border-gray-200 bg-white text-sm text-gray-900 focus:outline-none focus:border-[var(--accent)] transition-colors"
                    >
                        <option value="">Select size</option>
                        {companySizes.map((size) => (
                            <option key={size} value={size}>{size} employees</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="companyHQ" className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-1.5">
                        Company HQ *
                    </label>
                    <input
                        type="text"
                        id="companyHQ"
                        name="companyHQ"
                        required
                        className="w-full px-3 py-2.5 border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[var(--accent)] transition-colors"
                        placeholder="San Francisco, CA"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="partnerType" className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-1.5">
                    Partnership Type *
                </label>
                <select
                    id="partnerType"
                    name="partnerType"
                    required
                    className="w-full px-3 py-2.5 border border-gray-200 bg-white text-sm text-gray-900 focus:outline-none focus:border-[var(--accent)] transition-colors"
                >
                    <option value="">Select type</option>
                    {partnerTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="message" className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-1.5">
                    How can we help? *
                </label>
                <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full px-3 py-2.5 border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                    placeholder="Tell us about your partnership goals and how you'd like to work with Bifrost..."
                />
            </div>

            {result?.type === 'error' && (
                <div className="p-3 border border-red-200 bg-red-50 text-sm text-red-700">
                    {result.text}
                </div>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[var(--accent)] text-white text-sm font-mono uppercase tracking-wider hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                    </>
                ) : (
                    'Submit Application'
                )}
            </button>
        </form>
    );
}
