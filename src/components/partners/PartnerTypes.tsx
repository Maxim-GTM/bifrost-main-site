'use client';

import dynamic from 'next/dynamic';

const RiveIllustration = dynamic(() => import('@/components/RiveIllustration'), { ssr: false });

const RIVE_SCALE = 1.08;

interface PartnerType {
    title: string;
    illustration: string;
}

const partnerTypes: PartnerType[] = [
    {
        title: 'Cloud Providers / Hyperscalers',
        illustration: '/rive/asuJ0YiIaQEBiTd0gLMK4ymRbo.riv',
    },
    {
        title: 'Global System Integrators',
        illustration: '/rive/BVg6Gzh91qsE0zrrZqcNtRFvME.riv',
    },
    {
        title: 'Technology Partners',
        illustration: '/rive/CW6WL9AMphWwkwIwBG8o1ipGqdE.riv',
    },
    {
        title: 'Channel Partners',
        illustration: '/rive/D0EAkStzIv10JZlvu0Gm71lUl3c.riv',
    },
    {
        title: 'Others',
        illustration: '/rive/ABhpjlXi56FtDgqi0PG1dpwbuk.riv',
    },
];

const ACCENT_COLOR = '#35c09e';

function PartnerCard({ partner, compact }: { partner: PartnerType; compact?: boolean }) {
    return (
        <div className="bg-white border border-gray-200 hover:border-[var(--accent-border)] hover:shadow-sm transition-all flex flex-col h-full">
            {/* Illustration Area */}
            <div
                className={`relative flex items-center justify-center border-b border-gray-100 flex-shrink-0 p-6 ${
                    compact ? 'h-[140px]' : 'h-[200px]'
                }`}
            >
                {/* Decorative corner accents */}
                <div
                    className="absolute top-3 left-3 w-2 h-2 border-t border-l"
                    style={{ borderColor: ACCENT_COLOR, opacity: 0.4 }}
                />
                <div
                    className="absolute top-3 right-3 w-2 h-2 border-t border-r"
                    style={{ borderColor: ACCENT_COLOR, opacity: 0.4 }}
                />
                <div
                    className="absolute bottom-3 left-3 w-2 h-2 border-b border-l"
                    style={{ borderColor: ACCENT_COLOR, opacity: 0.4 }}
                />
                <div
                    className="absolute bottom-3 right-3 w-2 h-2 border-b border-r"
                    style={{ borderColor: ACCENT_COLOR, opacity: 0.4 }}
                />

                <div
                    className={`w-full h-full overflow-hidden flex items-center justify-center ${
                        compact ? 'max-w-[120px] max-h-[100px]' : 'max-w-[180px] max-h-[160px]'
                    }`}
                >
                    <RiveIllustration
                        src={partner.illustration}
                        className="w-full h-full"
                        style={{ transform: `scale(${RIVE_SCALE})` }}
                    />
                </div>
            </div>

            {/* Title */}
            <div className={`flex items-center justify-center ${compact ? 'p-3' : 'p-5'}`}>
                <h3 className={`text-gray-900 text-center ${compact ? 'text-xs' : 'text-sm'}`}>{partner.title}</h3>
            </div>
        </div>
    );
}

export default function PartnerTypes({ compact }: { compact?: boolean }) {
    const topRow = partnerTypes.slice(0, 3);
    const bottomRow = partnerTypes.slice(3);

    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {topRow.map((partner) => (
                    <PartnerCard key={partner.title} partner={partner} compact={compact} />
                ))}
            </div>
            <div className="grid grid-cols-2 gap-6 max-w-[66.666%] sm:max-w-[66.666%] mx-auto w-full">
                {bottomRow.map((partner) => (
                    <PartnerCard key={partner.title} partner={partner} compact={compact} />
                ))}
            </div>
        </div>
    );
}
