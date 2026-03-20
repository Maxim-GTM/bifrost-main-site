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
    title: 'Single Binary',
    tags: ['npx', 'Docker', 'Binary'],
    description:
      'Bifrost is deployed as a single binary that you can run via NPX or Docker, no additional dependencies needed.',
  },
  {
    icon: Cloud,
    title: 'Cluster Mode',
   
    tags: ['Multi-Node', 'P2P gossip'],
    description:
      'Built-in high availability with gossip-protocol, automatic service discovery, and zero-downtime rolling deployments.',
  },
  {
    icon: ShieldCheck,
    title: 'Air-Gapped (in-VPC, on-prem)',
    tags: ['AWS', 'GCP', 'Azure', 'On-Prem'],
    description:
      'Deploy on-prem or in your VPC with full network isolation. Data never crosses your security boundary. SOC 2 Type II, HIPAA, and ISO 27001 compliant.',
  },
  {
    icon: Globe,
    title: 'Helm Chart (K8s)',
    tags: ['K8s', 'Helm', 'Auto-scaling'],
    description:
      'Bifrost is available as a Helm chart for easy deployment to your Kubernetes cluster.',
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
