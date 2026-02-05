interface KVListKey {
  name: string
  expiration?: number
  metadata?: unknown
}

interface KVListResult {
  keys: KVListKey[]
  list_complete: boolean
  cursor?: string
}

interface KVNamespace {
  get: (key: string, type?: 'text' | 'json' | 'arrayBuffer' | 'stream') => Promise<unknown>
  put: (key: string, value: string, options?: { expirationTtl?: number }) => Promise<void>
  delete: (key: string) => Promise<void>
  list: (options?: { prefix?: string; limit?: number; cursor?: string }) => Promise<KVListResult>
}

interface RequestContext {
  env: {
    BIFROST_KV?: KVNamespace
  }
  cf: Record<string, unknown>
  ctx: Record<string, unknown>
}

declare module '@cloudflare/next-on-pages' {
  export function getRequestContext(): RequestContext
  
  interface CloudflareEnv {
    BIFROST_KV?: KVNamespace
    MAILGUN_API_KEY?: string
    MAILGUN_DOMAIN?: string
    ENTERPRISE_API_KEY?: string
    FROM_EMAIL?: string
  }
}

