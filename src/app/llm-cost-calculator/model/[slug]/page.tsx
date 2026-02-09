import { getModelBySlug } from '@/lib/llm-calculator/api'
import { redirect, notFound } from 'next/navigation'
import { getCostCalculatorBaseUrl } from '@/lib/utils'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ModelRedirectPage({ params }: PageProps) {
  const { slug } = await params
  const model = getModelBySlug(slug)

  if (!model) {
    notFound()
  }

  // Redirect to the nested route with provider
  redirect(
    `${getCostCalculatorBaseUrl()}/llm-cost-calculator/provider/${encodeURIComponent(model.provider)}/model/${slug}`
  )
}
