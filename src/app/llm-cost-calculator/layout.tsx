import type { Metadata } from 'next'

export const metadata: Metadata = {
  icons: {
    icon: 'https://bifrost.getmaxim.ai/favicon.ico',
  },
}

export default function LlmCostCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children
}
