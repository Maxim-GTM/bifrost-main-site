const SITE_URL = 'https://getbifrost.ai';

export function buildCanonicalUrl(
    path: string,
    query?: Record<string, string | undefined>
): string {
    const url = new URL(path, SITE_URL);

    if (query) {
        Object.entries(query).forEach(([key, value]) => {
            if (value != null && value !== '') {
                url.searchParams.set(key, value);
            }
        });
    }

    return url.toString();
}
