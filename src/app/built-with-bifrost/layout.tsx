import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { SiteConfig } from "@/lib/built-with-bifrost/site.config";
import { getBuiltWithBifrostBaseUrl } from "@/lib/utils";

const basePath = `${getBuiltWithBifrostBaseUrl()}/built-with-bifrost`;

export const metadata: Metadata = {
  metadataBase: new URL(`https://www.getmaxim.ai${basePath}`),
  title: {
    default: SiteConfig.title,
    template: `%s | ${SiteConfig.siteName}`,
  },
  description: SiteConfig.description,
  keywords: SiteConfig.keywords,
  authors: [{ name: SiteConfig.siteName }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `https://www.getmaxim.ai${basePath}`,
    siteName: SiteConfig.siteName,
    title: SiteConfig.title,
    description: SiteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: SiteConfig.title,
    description: SiteConfig.description,
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
    <div className="built-with-bifrost" style={{ colorScheme: 'light' }}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
