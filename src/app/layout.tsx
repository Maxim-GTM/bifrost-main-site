import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { CSPostHogProvider, IntercomProvider } from '../components/providers';
import "./globals.css";
import "./model-library.css";
import "./built-with-bifrost.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bifrost - The fastest way to build AI applications that never go down",
  description: "High-performance AI gateway that connects multiple AI providers through a single API. Get 100% uptime with automatic failover and load balancing.",
  keywords: ["AI", "API", "Gateway", "OpenAI", "Anthropic", "Machine Learning", "Developer Tools"],
  authors: [{ name: "Maxim" }],
  creator: "Maxim",
  publisher: "Maxim",
  robots: "index, follow",  
  openGraph: {
    title: "Bifrost - AI Gateway",
    siteName:"Bifrost: The fastest way to build AI applications that never go down",
    description: "High-performance AI gateway that connects multiple AI providers through a single API.",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bifrost - AI Gateway",
    description: "High-performance AI gateway that connects multiple AI providers through a single API.",
  },
  metadataBase: new URL("https://www.getmaxim.ai"),
      alternates: {
        canonical: `/bifrost`,
      },
};

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;
const TAG_ID = process.env.NEXT_PUBLIC_TAG_MANAGER;

const CRAWL_DOCTOR_ORIGIN = "https://crawldoctor.fly.dev";
const CRAWL_DOCTOR_TID = "bifrost-main";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${geistSans.variable} ${geistMono.variable}`}
      style={{ colorScheme: 'light' }}
    >
      <head>
        {process.env.NODE_ENV !== 'development' && (
          <>
            <link rel="dns-prefetch" href={CRAWL_DOCTOR_ORIGIN} />
            <link rel="preconnect" href={CRAWL_DOCTOR_ORIGIN} crossOrigin="" />
            <link
              rel="prefetch"
              href={`${CRAWL_DOCTOR_ORIGIN}/track/json?tid=${CRAWL_DOCTOR_TID}&source=prefetch`}
              as="fetch"
            />
            <meta
              name="track-data"
              content={`${CRAWL_DOCTOR_ORIGIN}/track/data-uri?tid=${CRAWL_DOCTOR_TID}&source=meta`}
            />
            <link
              rel="alternate"
              type="application/json"
              href={`${CRAWL_DOCTOR_ORIGIN}/track/json?tid=${CRAWL_DOCTOR_TID}&source=alternate`}
            />
          </>
        )}
      </head>
      {TAG_ID && <GoogleTagManager gtmId={TAG_ID} />}
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      <body className="antialiased bg-gray-50 text-gray-900">
        {process.env.NODE_ENV !== 'development' && (
          <>
            <img
              src={`${CRAWL_DOCTOR_ORIGIN}/track/pixel.gif?tid=${CRAWL_DOCTOR_TID}`}
              alt=""
              width="1"
              height="1"
              style={{ display: "none" }}
            />
            <Script
              src={`${CRAWL_DOCTOR_ORIGIN}/track/js?tid=${CRAWL_DOCTOR_TID}`}
              strategy="lazyOnload"
            />
          </>
        )}
        <CSPostHogProvider>
          <IntercomProvider>
            {children}
          </IntercomProvider>
        </CSPostHogProvider>
      </body>
    </html>
  );
}
