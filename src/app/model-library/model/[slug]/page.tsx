import { fetchAllModels, getModelBySlug } from '@/lib/model-library/api';
import { redirect } from 'next/navigation';
import { getModelLibraryBaseUrl } from '@/lib/utils';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Redirect old /model/[slug] routes to compare pages
export default async function ModelPage({ params }: PageProps) {
  const { slug } = await params;
  const modelsData = await fetchAllModels();
  const model = getModelBySlug(modelsData, slug);
  const basePath = `${getModelLibraryBaseUrl()}/model-library`;
  
  if (!model) {
    redirect(basePath);
  }
  
  // Redirect to compare page
  redirect(`${basePath}/compare/${encodeURIComponent(model.provider)}/${model.slug}`);
}
