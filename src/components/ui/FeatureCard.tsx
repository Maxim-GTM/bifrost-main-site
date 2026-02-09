import { ReactNode } from 'react'

interface FeatureCardProps {
  plan: 'enterprise' | 'oss'
  icon: ReactNode
  title: string
  description: string
  readmeLinkTitle?: string
  readmeLink?: string
}

export function FeatureCard({
  plan,
  icon,
  title,
  description,
  readmeLinkTitle = 'Read more',
  readmeLink = undefined,
}: FeatureCardProps) {
  const planColors = {
    oss: {
      border: 'hover:border-green-300',
      background: 'bg-green-100',
      iconColor: 'text-accent',
      linkColor: 'text-accent hover:text-green-700',
    },
    enterprise: {
      border: 'hover:border-blue-300',
      background: 'bg-blue-100',
      iconColor: 'text-blue-600',
      linkColor: 'text-blue-600 hover:text-blue-700',
    },
  }

  const colors = planColors[plan]

  return (
    <div
      className={`flex items-start space-x-4 rounded-sm border border-gray-200 bg-white p-4 ${colors.border} transition-all duration-300 hover:shadow-lg`}
    >
      <div
        className={`h-12 w-12 flex-shrink-0 ${colors.background} flex items-center justify-center rounded-sm`}
      >
        <div className={colors.iconColor}>{icon}</div>
      </div>
      <div>
        <h4 className="mb-2 text-lg font-semibold text-gray-900">{title}</h4>
        <p className="mb-3 text-gray-600">{description}</p>
        {readmeLink && (
          <a
            href={readmeLink}
            className={`text-sm ${colors.linkColor} inline-flex items-center font-medium transition-colors duration-200`}
          >
            {readmeLinkTitle}
            <svg className="ml-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        )}
      </div>
    </div>
  )
}
