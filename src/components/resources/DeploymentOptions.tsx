import { Cloud, Globe, Server, ShieldCheck } from 'lucide-react'

interface DeploymentCard {
  icon: React.ElementType
  title: string
  badge?: string
  tags: string[]
  description: string
}

const defaultCards: DeploymentCard[] = [
  {
    icon: Server,
    title: 'Self-Hosted',
    tags: ['npx', 'Docker', 'Binary'],
    description:
      'Single binary, zero dependencies. Deploy anywhere. Full control over data, config, and networking.',
  },
  {
    icon: Cloud,
    title: 'Kubernetes / Helm',
    tags: ['K8s', 'Helm charts'],
    description:
      'Official Helm charts in the repo. Horizontal scaling, readiness probes, and rolling deployments out of the box.',
  },
  {
    icon: ShieldCheck,
    title: 'In-VPC',
    tags: ['AWS VPC', 'GCP VPC', 'Azure VNet'],
    description:
      'Deploy within your private cloud with VPC isolation. Data never leaves your network boundary.',
  },
  {
    icon: Globe,
    title: 'Multi-Cloud Deployment',
    tags: ['AWS', 'GCP', 'Azure', 'Cloudflare'],
    description:
      'Deploy Bifrost Enterprise across multiple cloud providers.',
  },
]

interface DeploymentOptionsProps {
  cards?: DeploymentCard[]
}

export default function DeploymentOptions({ cards = defaultCards }: DeploymentOptionsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="relative flex flex-col border border-gray-200 bg-white transition-all hover:border-[var(--accent-border)] hover:shadow-sm"
        >
          {/* Corner brackets */}
          <div className="absolute top-3 left-3 h-2 w-2 border-t border-l border-[var(--accent)] opacity-40" />
          <div className="absolute top-3 right-3 h-2 w-2 border-t border-r border-[var(--accent)] opacity-40" />
          <div className="absolute bottom-3 left-3 h-2 w-2 border-b border-l border-[var(--accent)] opacity-40" />
          <div className="absolute right-3 bottom-3 h-2 w-2 border-r border-b border-[var(--accent)] opacity-40" />

          {/* Body */}
          <div className="flex flex-1 flex-col p-6">
            {/* Icon + badge row */}
            <div className="mb-4 flex items-center justify-between">
              <card.icon className="h-5 w-5 text-[var(--accent)]" strokeWidth={1.5} />
              {card.badge && (
                <span className="font-mono text-[10px] tracking-wider text-[var(--accent-dark)] uppercase">
                  [ {card.badge} ]
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="mb-2 text-sm font-medium text-gray-900">{card.title}</h3>

            {/* Description */}
            <p className="text-xs leading-relaxed text-gray-500">{card.description}</p>
          </div>

          {/* Tag footer — pinned to bottom, always aligned */}
          <div className="border-t border-gray-100 px-6 py-3">
            <p className="text-center font-mono text-[10px] tracking-wide text-[var(--accent-dark)]">
              {card.tags.join(' · ')}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
