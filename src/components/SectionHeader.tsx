interface SectionHeaderProps {
  title: string
  description?: string
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="mb-16 text-center">
      <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">{title}</h2>
      {description && <p className="mx-auto max-w-3xl text-lg text-gray-600">{description}</p>}
    </div>
  )
}
