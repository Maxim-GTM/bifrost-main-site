import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { getModelLibraryBaseUrl } from "@/lib/utils";

const basePath = `${getModelLibraryBaseUrl()}/model-library`;

export const metadata: Metadata = {
  metadataBase: new URL(`https://www.getmaxim.ai${basePath}`),
  title: {
    default: 'Bifrost AI Model Library - Explore Providers and Capabilities',
    template: '%s | Bifrost AI Model Library',
  },
  description: 'Browse AI models across providers. Compare capabilities, context limits, and pricing details.',
  keywords: ['Bifrost AI Model Library', 'model catalog', 'AI providers', 'model capabilities', 'model pricing'],
  authors: [{ name: 'Bifrost AI Model Library' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `https://www.getmaxim.ai${basePath}`,
    siteName: 'Bifrost AI Model Library',
    title: 'Bifrost AI Model Library - Explore Providers and Capabilities',
    description: 'Browse AI models across providers. Compare capabilities, context limits, and pricing details.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bifrost AI Model Library',
    description: 'Browse AI models across providers. Compare capabilities, context limits, and pricing details.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="model-library" style={{ colorScheme: 'light' }}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
