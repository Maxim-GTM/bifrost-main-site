import type { Metadata } from 'next'
import EnterpriseClientPageContent from './pageContent'

export const metadata: Metadata = {
  alternates: {
    canonical: 'http://getmaxim.ai/bifrost/enterprise',
  },
}

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

export default async function Enterprise() {
  return <EnterpriseClientPageContent />
}
