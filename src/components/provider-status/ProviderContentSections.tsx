import type { ProviderPageContent } from '@/lib/provider-status/content'

interface ProviderContentSectionsProps {
  providerName: string
  content: ProviderPageContent
}

export default function ProviderContentSections({
  providerName,
  content,
}: ProviderContentSectionsProps) {
  return (
    <>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="border border-gray-200 bg-white p-6">
          <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
            [ ABOUT {providerName.toUpperCase()} ]
          </p>
          <h2 className="mb-4 text-xl text-gray-900 md:text-2xl">
            About {providerName}
          </h2>
          <div className="space-y-4">
            {content.overviewParagraphs.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-relaxed text-gray-600 md:text-base">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {content.topProducts.map((product) => (
              <span
                key={product}
                className="inline-flex items-center border border-gray-200 bg-gray-50 px-3 py-1 font-mono text-[11px] text-gray-600"
              >
                {product}
              </span>
            ))}
          </div>
        </div>

        <div className="border border-gray-200 bg-white p-6">
          <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
            [ DATA SOURCES ]
          </p>
          <h2 className="mb-2 text-xl text-gray-900 md:text-2xl">{content.coverageLabel}</h2>
          <p className="mb-5 text-sm leading-relaxed text-gray-600 md:text-base">
            {content.coverageDescription}
          </p>
          <ul className="space-y-3">
            {content.monitoringPoints.map((point) => (
              <li key={point} className="flex gap-3 border border-gray-200 bg-gray-50 px-4 py-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-[var(--accent)]" />
                <span className="text-sm leading-relaxed text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="border border-gray-200 bg-white p-6">
          <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
            [ RELIABILITY ]
          </p>
          <h2 className="mb-4 text-xl text-gray-900 md:text-2xl">
            Recent reliability
          </h2>
          <ul className="space-y-3">
            {content.reliabilityPoints.map((point) => (
              <li key={point} className="flex gap-3 border border-gray-200 bg-gray-50 px-4 py-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-[var(--accent)]" />
                <span className="text-sm leading-relaxed text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-gray-200 bg-white p-6">
          <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
            [ COMMON USE CASES ]
          </p>
          <h2 className="mb-4 text-xl text-gray-900 md:text-2xl">
            How teams use {providerName}
          </h2>
          <p className="mb-5 text-sm leading-relaxed text-gray-600 md:text-base">
            {content.whyTeamsMonitor}
          </p>
          <div className="space-y-3">
            {content.commonUseCases.map((useCase) => (
              <div
                key={useCase}
                className="relative flex items-center gap-3 border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700"
              >
                <div className="absolute top-2 left-2 h-1.5 w-1.5 border-t border-l border-[var(--accent)] opacity-40" />
                <div className="absolute top-2 right-2 h-1.5 w-1.5 border-t border-r border-[var(--accent)] opacity-40" />
                <div className="absolute bottom-2 left-2 h-1.5 w-1.5 border-b border-l border-[var(--accent)] opacity-40" />
                <div className="absolute right-2 bottom-2 h-1.5 w-1.5 border-r border-b border-[var(--accent)] opacity-40" />
                <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                <span>{useCase}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
