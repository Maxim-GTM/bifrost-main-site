import { fetchAllModels, getModelBySlug } from '@/lib/model-library/api'
import { notFound, redirect } from 'next/navigation'
import { getModelLibraryBaseUrl } from '@/lib/utils'

interface PageProps {
  params: Promise<{ provider: string; slug: string }>
}

export default async function ModelPage({ params }: PageProps) {
  const { provider, slug } = await params
  const decodedProvider = decodeURIComponent(provider)
  const decodedSlug = decodeURIComponent(slug)
  const basePath = `${getModelLibraryBaseUrl()}/model-library`
  const modelsData = await fetchAllModels()
  const model = getModelBySlug(modelsData, decodedSlug, decodedProvider)

  if (!model) {
    notFound()
  }

  redirect(`${basePath}/compare/${encodeURIComponent(model.provider)}/${model.slug}`)
}
