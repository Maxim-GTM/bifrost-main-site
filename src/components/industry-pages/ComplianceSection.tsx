import Image from 'next/image'

const complianceBadges = [
  { src: '/soc.png', alt: 'AICPA SOC', label: 'SOC 2 Type II', sublabel: 'Audit-ready controls' },
  { src: '/gdpr.png', alt: 'GDPR', label: 'GDPR', sublabel: 'Privacy-aligned workflows' },
  { src: '/iso.png', alt: 'ISO 27001', label: 'ISO 27001', sublabel: 'Security management' },
  { src: '/hipaa.png', alt: 'HIPAA', label: 'HIPAA', sublabel: 'BAA-ready deployments' },
]

export default function ComplianceSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
            [ TRUST & COMPLIANCE ]
          </p>
          <h2 className="mb-4 text-2xl text-gray-900 md:text-3xl">
            Compliance for enterprise AI deployments
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Built for regulated deployments with policy controls, auditability, and the standards
            enterprise teams expect.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {complianceBadges.map((badge) => (
            <div
              key={badge.label}
              className="relative flex min-h-[180px] flex-col items-center justify-center border border-gray-200 bg-white px-4 py-6 text-center"
            >
              <div className="absolute top-3 left-3 h-2 w-2 border-t border-l border-[var(--accent)] opacity-40" />
              <div className="absolute top-3 right-3 h-2 w-2 border-t border-r border-[var(--accent)] opacity-40" />
              <div className="absolute bottom-3 left-3 h-2 w-2 border-b border-l border-[var(--accent)] opacity-40" />
              <div className="absolute right-3 bottom-3 h-2 w-2 border-r border-b border-[var(--accent)] opacity-40" />

              <div className="relative mb-4 flex h-16 items-center justify-center">
                <Image
                  src={badge.src}
                  alt={badge.alt}
                  width={96}
                  height={96}
                  className="h-14 w-auto object-contain sm:h-16"
                />
              </div>

              <p className="text-sm font-medium text-gray-900">{badge.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-gray-500">{badge.sublabel}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
