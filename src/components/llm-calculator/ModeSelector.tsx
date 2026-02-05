'use client';

import { getCostCalculatorBaseUrl } from '@/lib/utils';
import Link from 'next/link';

interface ModeSelectorProps {
    options: Array<{
        label: string;
        value: string;
        type: 'provider' | 'mode';
    }>;
    currentSlug: string;
    currentProvider: string;
    optionProviders?: Record<string, string>;
}

