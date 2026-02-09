import { getBuiltWithBifrostBaseUrl } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-gray-900">404</h1>
        <h2 className="mb-4 text-2xl font-semibold text-gray-700">Page Not Found</h2>
        <p className="mb-8 text-gray-600">
          The page you're looking for doesn't exist or has been removed.
        </p>
        <Link href={`${getBuiltWithBifrostBaseUrl()}/built-with-bifrost`}>
          <Button size="lg">Go to Home</Button>
        </Link>
      </div>
    </div>
  )
}
