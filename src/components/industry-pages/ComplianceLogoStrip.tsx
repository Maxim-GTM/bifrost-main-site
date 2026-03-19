import Image from 'next/image'

type ComplianceLogoStripProps = {
  className?: string
}

const logos = [
  { src: '/soc.png', alt: 'AICPA SOC' },
  { src: '/gdpr.png', alt: 'GDPR' },
  { src: '/iso.png', alt: 'ISO 27001' },
  { src: '/hipaa.png', alt: 'HIPAA' },
]

export default function ComplianceLogoStrip({ className = '' }: ComplianceLogoStripProps) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-3 sm:gap-4 ${className}`.trim()}>
      {logos.map((logo) => (
        <div
          key={logo.alt}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-200 bg-white/80 p-2 shadow-[0_1px_0_rgba(0,0,0,0.03)] sm:h-16 sm:w-16"
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            width={56}
            height={56}
            className="h-full w-full object-contain"
          />
        </div>
      ))}
    </div>
  )
}
