import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/sections'

export default function BifrostResourcesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ colorScheme: 'light' }}>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
