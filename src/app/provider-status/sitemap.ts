import type { MetadataRoute } from 'next'
import { STATUS_PROVIDERS } from '@/lib/provider-status/providers'
import { getProviderStatusBaseUrl } from '@/lib/utils'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `https://www.getmaxim.ai${getProviderStatusBaseUrl()}/provider-status`

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1,
    },
    ...STATUS_PROVIDERS.map((provider) => ({
      url: `${baseUrl}/${provider.id}`,
      lastModified: new Date(),
      changeFrequency: 'hourly' as const,
      priority: 0.8,
    })),
  ]
}
