import { getBuiltWithBifrostBaseUrl } from '@/lib/utils';
import PrimaryButton from '@/components/ui/PrimaryButton';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been removed.
        </p>
        <PrimaryButton href={`${getBuiltWithBifrostBaseUrl()}/built-with-bifrost`}>
          Go to Home
        </PrimaryButton>
      </div>
    </div>
  );
}
