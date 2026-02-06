import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/sections/Footer';

export const metadata: Metadata = {
    title: {
        default: 'Bifrost Partner Program',
        template: '%s | Bifrost Partner Program',
    },
    description: 'Join the Bifrost Partner Program. Grow your business and help accelerate the leading AI companies in the world.',
    keywords: ['Bifrost', 'Partners', 'AI', 'LLM Gateway', 'Cloud Partners', 'System Integrators', 'Technology Partners'],
    openGraph: {
        type: 'website',
        locale: 'en_US',
        siteName: 'Bifrost Partner Program',
        title: 'Bifrost Partner Program',
        description: 'Grow your business and help accelerate the leading AI companies in the world.',
    },
};

export default function PartnersLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div style={{ colorScheme: 'light' }}>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}
