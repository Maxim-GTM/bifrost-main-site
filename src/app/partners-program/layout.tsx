import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/sections/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.getmaxim.ai'),
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
}

export default function PartnersLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div style={{ colorScheme: 'light' }}>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
