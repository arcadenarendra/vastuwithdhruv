import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import type { FAQ as FAQItem } from '../data/faqs'

interface FAQProps {
  items: FAQItem[];
  /** Allow several panels open at once. Single-open by default. */
  multiple?: boolean;
}

export default function FAQ({ items, multiple = false }: FAQProps) {
  const [open, setOpen] = useState<number[]>([])

  const toggle = (i: number) => {
    setOpen((prev) => {
      if (prev.includes(i)) return prev.filter((n) => n !== i)
      return multiple ? [...prev, i] : [i]
    })
  }

  return (
    <div className="divide-y divide-stone-200 border-y border-stone-200">
      {items.map((item, i) => {
        const isOpen = open.includes(i)
        const panelId = `faq-panel-${i}`
        const buttonId = `faq-button-${i}`

        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="group flex w-full items-start justify-between gap-6 py-6 text-left"
              >
                <span
                  className={`pr-2 text-base transition-colors md:text-lg ${
                    isOpen ? 'text-gold' : 'text-navy group-hover:text-gold'
                  }`}
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {item.question}
                </span>

                <span
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center border transition-all duration-300 ${
                    isOpen
                      ? 'rotate-45 border-gold bg-gold text-navy'
                      : 'border-stone-300 text-muted group-hover:border-gold group-hover:text-gold'
                  }`}
                  aria-hidden="true"
                >
                  <Plus size={14} />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-6 pr-10 leading-relaxed text-muted">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}