import Link from 'next/link'
import { formatNumber } from '@/lib/model-library/format'

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n))
}

function buildHref(basePath: string, query: Record<string, string | undefined>): string {
  const params = new URLSearchParams()
  Object.entries(query).forEach(([k, v]) => {
    if (v != null && v !== '') params.set(k, v)
  })
  const qs = params.toString()
  return qs ? `${basePath}?${qs}` : basePath
}

export default function Pagination({
  basePath,
  currentPage,
  totalItems,
  pageSize,
  query = {},
}: {
  basePath: string
  currentPage: number
  totalItems: number
  pageSize: number
  query?: Record<string, string | undefined>
}) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const page = clamp(currentPage, 1, totalPages)

  if (totalPages <= 1) return null

  const windowSize = 2 // pages around current
  const start = Math.max(2, page - windowSize)
  const end = Math.min(totalPages - 1, page + windowSize)

  const rangeStart = (page - 1) * pageSize + 1
  const rangeEnd = Math.min(totalItems, page * pageSize)

  const pageHref = (p: number) =>
    buildHref(basePath, { ...query, page: p === 1 ? undefined : String(p) })

  const PageLink = ({
    p,
    label,
    isCurrent = false,
  }: {
    p: number
    label?: string
    isCurrent?: boolean
  }) => (
    <Link
      href={pageHref(p)}
      aria-current={isCurrent ? 'page' : undefined}
      className={
        isCurrent
          ? 'bg-accent border-accent inline-flex h-10 min-w-[40px] items-center justify-center rounded-lg border px-3 text-sm font-medium text-white'
          : 'hover:bg-accent-light hover:border-accent-border inline-flex h-10 min-w-[40px] items-center justify-center rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 transition-colors'
      }
    >
      {label ?? String(p)}
    </Link>
  )

  const Ellipsis = () => (
    <span className="inline-flex h-10 min-w-[40px] items-center justify-center px-3 text-gray-400">
      …
    </span>
  )

  return (
    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-sm text-gray-600">
        Showing <span className="font-mono">{formatNumber(rangeStart)}</span>–
        <span className="font-mono">{formatNumber(rangeEnd)}</span> of{' '}
        <span className="font-mono">{formatNumber(totalItems)}</span>
      </div>
      <nav
        className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-start"
        aria-label="Pagination"
      >
        <Link
          href={pageHref(Math.max(1, page - 1))}
          aria-disabled={page === 1}
          className={
            page === 1
              ? 'pointer-events-none inline-flex h-10 items-center justify-center rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-300'
              : 'hover:bg-accent-light hover:border-accent-border inline-flex h-10 items-center justify-center rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 transition-colors'
          }
        >
          Prev
        </Link>

        {/* Mobile: compact indicator to avoid horizontal overflow */}
        <div className="flex-1 text-center text-sm text-gray-600 sm:hidden">
          Page <span className="font-mono">{page}</span> of{' '}
          <span className="font-mono">{totalPages}</span>
        </div>

        {/* Desktop/tablet: full page controls */}
        <div className="hidden items-center gap-2 sm:flex">
          <PageLink p={1} isCurrent={page === 1} />
          {start > 2 && <Ellipsis />}
          {Array.from({ length: Math.max(0, end - start + 1) }, (_, i) => {
            const p = start + i
            return <PageLink key={p} p={p} isCurrent={p === page} />
          })}
          {end < totalPages - 1 && <Ellipsis />}
          {totalPages > 1 && <PageLink p={totalPages} isCurrent={page === totalPages} />}
        </div>

        <Link
          href={pageHref(Math.min(totalPages, page + 1))}
          aria-disabled={page === totalPages}
          className={
            page === totalPages
              ? 'pointer-events-none inline-flex h-10 items-center justify-center rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-300'
              : 'hover:bg-accent-light hover:border-accent-border inline-flex h-10 items-center justify-center rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 transition-colors'
          }
        >
          Next
        </Link>
      </nav>
    </div>
  )
}
