import { X2jOptions, XMLBuilder, XmlBuilderOptions, XMLParser } from 'fast-xml-parser'

const parserOptions: Partial<X2jOptions> = {
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  preserveOrder: true,
  ignoreDeclaration: false,
  ignorePiTags: true,
}

const builderOptions: Partial<XmlBuilderOptions> = {
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  preserveOrder: true,
  format: false,
}

function replaceUrls(sourceUrl: string, targetUrl: string, obj: unknown): unknown {
  if (typeof obj === 'string') {
    return obj.replace(new RegExp(sourceUrl, 'g'), targetUrl)
  }
  if (Array.isArray(obj)) {
    return obj.map((v) => replaceUrls(sourceUrl, targetUrl, v))
  }
  if (obj !== null && typeof obj === 'object') {
    const result: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(obj)) {
      result[key] = replaceUrls(sourceUrl, targetUrl, value)
    }
    return result
  }
  return obj
}

function filterSitemapElements(parsed: unknown[], excludeUrls: string[]): unknown[] {
  return parsed.map((node) => {
    if (typeof node !== 'object' || node === null) return node

    const nodeObj = node as Record<string, unknown>

    if ('sitemapindex' in nodeObj && Array.isArray(nodeObj.sitemapindex)) {
      nodeObj.sitemapindex = nodeObj.sitemapindex.filter((child) => {
        if (typeof child !== 'object' || child === null) return true
        const childObj = child as Record<string, unknown>

        if ('sitemap' in childObj && Array.isArray(childObj.sitemap)) {
          const locElement = childObj.sitemap.find(
            (el): el is Record<string, unknown> =>
              typeof el === 'object' && el !== null && 'loc' in el
          )
          if (locElement && Array.isArray(locElement.loc)) {
            const textNode = locElement.loc.find(
              (t): t is Record<string, string> =>
                typeof t === 'object' && t !== null && '#text' in t
            )
            if (textNode) {
              return !excludeUrls.includes(textNode['#text'])
            }
          }
        }
        return true
      })
    }

    return nodeObj
  })
}

export interface TransformOptions {
  excludeSitemaps?: string[]
}

export function transformSitemapXml(
  xml: string,
  sourceUrl: string,
  targetUrl: string,
  options: TransformOptions = {}
): string {
  const parser = new XMLParser(parserOptions)
  const builder = new XMLBuilder(builderOptions)

  let parsed = parser.parse(xml)

  // Replace source URLs with target URLs
  parsed = replaceUrls(sourceUrl, targetUrl, parsed)

  // Filter out excluded sitemap entries
  if (options.excludeSitemaps && options.excludeSitemaps.length > 0) {
    const excludeUrls = options.excludeSitemaps.map((path) => `${targetUrl}/${path}`)
    parsed = filterSitemapElements(parsed, excludeUrls)
  }

  const result = builder.build(parsed)

  // Add XML declaration if not present
  if (!result.startsWith('<?xml')) {
    return '<?xml version="1.0" encoding="UTF-8"?>' + result
  }

  return result
}
