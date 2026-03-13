'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  faqs: FAQItem[]
  title?: string
  subtitle?: string
}

export default function FAQSection({
  faqs,
  title = 'Frequently Asked Questions',
  subtitle,
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <section className="bg-white py-16 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
            [ FAQ ]
          </p>
          <h2 className="mb-2 text-2xl text-gray-900 md:text-3xl">{title}</h2>
          {subtitle && <p className="mx-auto max-w-2xl text-gray-600">{subtitle}</p>}
        </div>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 bg-white transition-colors hover:border-gray-300"
            >
              <button
                onClick={() => toggle(index)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left"
                aria-expanded={openIndex === index}
              >
                <span className="text-sm font-medium text-gray-900">{faq.question}</span>
                <ChevronDown
                  className={`h-4 w-4 flex-shrink-0 text-gray-400 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-200 ${
                  openIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-gray-200 px-5 pt-3 pb-5 text-sm leading-relaxed text-gray-600">
                    {(() => {
                      const blocks: { type: 'text' | 'bullet'; content: string }[] = []
                      faq.answer.split('\n').forEach((line) => {
                        const trimmed = line.trim()
                        if (!trimmed) return
                        if (trimmed.startsWith('•')) {
                          blocks.push({ type: 'bullet', content: trimmed.replace(/^•\s*/, '') })
                        } else {
                          blocks.push({ type: 'text', content: trimmed })
                        }
                      })
                      const elements: React.ReactNode[] = []
                      let bulletGroup: string[] = []
                      const flushBullets = () => {
                        if (bulletGroup.length > 0) {
                          elements.push(
                            <ul key={`ul-${elements.length}`} className="mt-2 space-y-1.5 list-disc pl-5">
                              {bulletGroup.map((b, i) => (
                                <li key={i}>{b}</li>
                              ))}
                            </ul>
                          )
                          bulletGroup = []
                        }
                      }
                      blocks.forEach((block) => {
                        if (block.type === 'bullet') {
                          bulletGroup.push(block.content)
                        } else {
                          flushBullets()
                          elements.push(<p key={`p-${elements.length}`} className={elements.length > 0 ? 'mt-2' : ''}>{block.content}</p>)
                        }
                      })
                      flushBullets()
                      return elements
                    })()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
