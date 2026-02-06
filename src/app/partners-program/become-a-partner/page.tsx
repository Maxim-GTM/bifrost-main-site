import Link from 'next/link';
import { ArrowLeft, Cloud, Building2, Layers, Handshake } from 'lucide-react';
import PartnerForm from '@/components/partners/PartnerForm';

export const metadata = {
    title: 'Become a Partner',
    description: 'Apply to join the Bifrost Partner Program. Cloud providers, system integrators, technology vendors, and channel partners welcome.',
};

const partnerHighlights = [
    { icon: Cloud, label: 'Cloud Providers / Hyperscalers' },
    { icon: Building2, label: 'Global System Integrators' },
    { icon: Layers, label: 'Technology Partners' },
    { icon: Handshake, label: 'Channel Partners' },
];

export default function BecomeAPartnerPage() {
    return (
        <div className="min-h-screen bg-gray-50/50 py-12 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <Link
                        href="/partners-program"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[var(--accent-text)] transition-colors"
                    >
                        <ArrowLeft size={16} /> Back to Partner Program
                    </Link>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* LHS — Info */}
                    <div className="lg:sticky lg:top-24">
                        <span className="provider-badge mb-4">
                            [ PARTNER APPLICATION ]
                        </span>
                        <h1 className="text-3xl md:text-4xl font-normal text-gray-900 mb-4 leading-[1.2] tracking-tight">
                            Join forces with Bifrost
                        </h1>
                        <p className="text-sm md:text-base text-gray-500 leading-relaxed mb-8">
                            Dedicated to the success of our partners&apos; businesses. Fill out the form and our partnerships team will be in touch within 2 business days.
                        </p>

                        {/* 2x2 partner type grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {partnerHighlights.map((item) => (
                                <div key={item.label} className="border border-gray-200 bg-white p-4 flex items-start gap-3">
                                    <div className="w-8 h-8 flex items-center justify-center bg-[var(--accent)]/10 text-[var(--accent-text)] flex-shrink-0">
                                        <item.icon className="w-4 h-4" />
                                    </div>
                                    <span className="text-xs text-gray-700 leading-snug">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RHS — Form */}
                    <div>
                        <PartnerForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
