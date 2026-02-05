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
  readmeLink = undefined
}: FeatureCardProps) {
  const planColors = {
    oss: {
      border: 'hover:border-green-300',
      background: 'bg-green-100',
      iconColor: 'text-accent',
      linkColor: 'text-accent hover:text-green-700'
    },
    enterprise: {
      border: 'hover:border-blue-300',
      background: 'bg-blue-100',
      iconColor: 'text-blue-600',
      linkColor: 'text-blue-600 hover:text-blue-700'
    }
  }

  const colors = planColors[plan]

  return (
    <div className={`flex items-start space-x-4 p-4 rounded-sm bg-white border border-gray-200 ${colors.border} hover:shadow-lg transition-all duration-300`}>
      <div className={`flex-shrink-0 w-12 h-12 ${colors.background} rounded-sm flex items-center justify-center`}>
        <div className={colors.iconColor}>
          {icon}
        </div>
      </div>
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-2">{title}</h4>
        <p className="text-gray-600 mb-3">{description}</p>
        {readmeLink && (
        <a 
          href={readmeLink} 
          className={`text-sm ${colors.linkColor} font-medium inline-flex items-center transition-colors duration-200`}
        >
          {readmeLinkTitle}
          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        )}
      </div>
    </div>
  )
}
