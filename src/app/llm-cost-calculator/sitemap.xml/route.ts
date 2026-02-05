import { NextResponse } from 'next/server';
import { getAllModels } from '@/lib/llm-calculator/api';
import { getCostCalculatorBaseUrl } from '@/lib/utils';

export const runtime = 'edge';

const SITE_URL = 'https://www.getmaxim.ai';

function buildSitemapXml(urls: string[]): string {
    const entries = urls
        .map((loc) => `<url><loc>${loc}</loc></url>`)
        .join('');

    return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`;
}

export async function GET(): Promise<NextResponse> {
    const basePath = getCostCalculatorBaseUrl();
    const baseUrl = `${SITE_URL}${basePath}/llm-cost-calculator`;

    const models = getAllModels();
    const providerSet = new Set(models.map((model) => model.provider));

    const providerUrls = Array.from(providerSet).map(
        (provider) =>
            `${baseUrl}/provider/${encodeURIComponent(provider)}`
    );

    const modelUrls = models.map(
        (model) =>
            `${baseUrl}/provider/${encodeURIComponent(model.provider)}/model/${encodeURIComponent(model.slug)}`
    );

    const sitemapXml = buildSitemapXml([baseUrl, ...providerUrls, ...modelUrls]);

    return new NextResponse(sitemapXml, {
        status: 200,
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    });
}
