'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: 'What is the AI Provider Status Monitor?',
    answer:
      'The AI Provider Status Monitor is a real-time tracking dashboard that aggregates uptime, incident, and maintenance data from official status pages of major AI model providers including OpenAI, Anthropic, Groq, Azure AI, and 15+ others. It provides a single view of operational health across the AI infrastructure ecosystem.',
  },
  {
    question: 'How often is provider status data updated?',
    answer:
      'Status data is fetched directly from each provider\'s official status API in real-time when you load the page. The dashboard automatically refreshes every 30 seconds to ensure you always see the latest operational status, active incidents, and component health across all monitored providers.',
  },
  {
    question: 'Which AI providers are monitored?',
    answer:
      'We currently monitor 15+ major AI providers including OpenAI (ChatGPT, GPT-4, GPT-4o), Anthropic (Claude 4, Claude 3.5), Azure AI, Groq, Cohere, ElevenLabs, Together AI, Fireworks AI, Perplexity, OpenRouter, Hugging Face, Cerebras, DeepSeek, Stability AI, and Replicate. Each provider page shows detailed component status and incident history.',
  },
  {
    question: 'How can I check if a specific AI service is down?',
    answer:
      'Click on any provider from the main status table or quick links section to view detailed component-level status. Each provider page breaks down services by component (API, Chat Interface, Embeddings, etc.) and shows real-time operational status, active incidents, and recent incident history with root cause analysis.',
  },
  {
    question: 'What does "operational", "degraded", and "major outage" mean?',
    answer:
      'Operational means all services are functioning normally. Degraded performance indicates partial service disruptions or slower response times. Major outage means critical services are unavailable. Maintenance indicates scheduled downtime. Unknown means status data is temporarily unavailable from the provider\'s API.',
  },
  {
    question: 'Can I see historical incident data for AI providers?',
    answer:
      'Yes, each provider page includes a complete incident history section showing past outages, degraded performance events, maintenance windows, and resolutions. This helps teams understand reliability patterns, plan redundancy strategies, and make informed decisions about provider infrastructure dependencies.',
  },
  {
    question: 'What data sources are used for status monitoring?',
    answer:
      'All status data comes directly from each provider\'s official status page APIs including Statuspage.io (Atlassian), BetterStack, Instatus, and OnlineOrNot platforms. We do not perform independent uptime checks. All data reflects what providers report publicly about their service health.',
  },
]

export default function ProviderStatusFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div>
      <div className="mb-8 text-center">
        <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
          [ FREQUENTLY ASKED QUESTIONS ]
        </p>
        <h2 className="mb-2 text-2xl font-medium tracking-tight text-gray-900 md:text-3xl">
          Everything You Need to Know About Bifrost AI Provider Status Monitor
        </h2>
      </div>

      <div className="mx-auto max-w-3xl space-y-3">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 bg-white transition-all hover:border-[var(--accent-border)]"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors"
              aria-expanded={openIndex === index}
            >
              <span className="pr-4 text-sm font-medium text-gray-900 md:text-base">
                {item.question}
              </span>
              <ChevronDown
                className={`h-5 w-5 flex-shrink-0 text-gray-400 transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="border-t border-gray-200 px-6 py-4">
                <p className="text-sm leading-relaxed text-gray-600">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export { faqItems }
