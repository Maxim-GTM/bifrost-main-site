import { MetadataRoute } from 'next'

const BASE_URL = 'https://www.getmaxim.ai/bifrost/alternatives'

const subpages = [
  'litellm-alternatives',
  'envoy-alternatives',
  'portkey-alternatives',
]

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...subpages.map((slug) => ({
      url: `${BASE_URL}/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
