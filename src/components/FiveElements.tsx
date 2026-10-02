import { useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { easeOutQuint } from '../lib/motion'

interface Element {
  name: string;
  symbol: string;
  quality: string;
  direction: string;
  desc: string;
  color: string;
  bg: string;
}

const elements: Element[] = [
  {
    name: 'Earth',
    symbol: '⊞',
    quality: 'Stability',
    direction: 'Southwest',
    desc: 'The Earth element governs the Southwest zone. It represents groundedness, strength, and long-term stability — in relationships, skills, and foundational support.',
    color: '#8B6914',
    bg: '#F5F0E8',
  },
  {
    name: 'Water',
    symbol: '◈',
    quality: 'Flow',
    direction: 'North',
    desc: 'The Water element is associated with the North direction — the zone of money, opportunity, and career. Water represents flow, abundance, and new beginnings.',
    color: '#2F6FB5',
    bg: '#EEF4FB',
  },
  {
    name: 'Fire',
    symbol: '△',
    quality: 'Transformation',
    direction: 'Southeast',
    desc: 'Fire governs the Southeast, the zone of cash flow and financial activity. It brings energy, transformation, and the power to convert effort into result.',
    color: '#C2410C',
    bg: '#FBF1EA',
  },
  {
    name: 'Air',
    symbol: '○',
    quality: 'Movement',
    direction: 'East',
    desc: 'Air corresponds to the East direction — movement, communication, marketing, and social connections. It brings freshness and the energy of new ideas.',
    color: '#0F766E',
    bg: '#ECF6F4',
  },
  {
    name: 'Space',
    symbol: '✦',
    quality: 'Expansion',
    direction: 'Northeast & Centre',
    desc: 'Space is the all-encompassing element, governing the center of the home (Brahmasthan) and the Northeast. It represents infinite potential, expansion, and mental clarity.',
    color: '#5B4BB5',
    bg: '#F1EFFA',
  },
]

export default function FiveElements() {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const reduceMotion = useReducedMotion()

  const el = elements[active]

  const onKeyDown = (e: KeyboardEvent, i: number) => {
    const last = elements.length - 1
    let next: number | null = null

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = i === last ? 0 : i + 1
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = i === 0 ? last : i - 1
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = last

    if (next === null) return
    e.preventDefault()
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <div className="flex flex-col items-center gap-10">
      {/* Tab list */}
      <div
        role="tablist"
        aria-label="The five elements"
        className="flex flex-wrap justify-center gap-3"
        onKeyDown={(e) => onKeyDown(e, active)}
      >
        {elements.map((e, i) => (
          <button
            key={e.name}
            ref={(node) => {
              tabRefs.current[i] = node
            }}
            role="tab"
            id={`element-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`element-panel-${i}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={`relative overflow-hidden border px-6 py-3 text-sm uppercase tracking-[0.15em] transition-colors duration-300 ${
              i === active
                ? 'border-transparent text-navy'
                : 'border-stone-200 text-muted hover:border-gold/40 hover:text-gold'
            }`}
          >
            {/* Fill wipes up from the bottom when selected. */}
            {i === active && (
              <motion.span
                layoutId="element-fill"
                className="absolute inset-0 -z-0"
                style={{ backgroundColor: e.bg }}
                transition={{ duration: 0.4, ease: easeOutQuint }}
                aria-hidden="true"
              />
            )}
            {i === active && (
              <motion.span
                layoutId="element-ring"
                className="absolute inset-0 border border-gold"
                transition={{ duration: 0.4, ease: easeOutQuint }}
                aria-hidden="true"
              />
            )}
            <span
              className="relative z-10 flex items-center gap-2"
              style={i === active ? { color: e.color } : undefined}
            >
              <span aria-hidden="true">{e.symbol}</span>
              {e.name}
            </span>
          </button>
        ))}
      </div>

      {/* Tab panel */}
      <div
        role="tabpanel"
        id={`element-panel-${active}`}
        aria-labelledby={`element-tab-${active}`}
        className="mx-auto w-full max-w-2xl"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.38, ease: easeOutQuint }}
            className="border border-stone-200 p-10 text-center md:p-14"
            style={{ backgroundColor: el.bg }}
          >
            <span
              className="mb-4 block text-5xl"
              style={{ color: el.color }}
              aria-hidden="true"
            >
              {el.symbol}
            </span>

            <span className="section-label" style={{ color: el.color }}>
              {el.quality}
            </span>

            <h3 className="mt-2 text-3xl text-navy" style={{ fontFamily: 'var(--font-serif)' }}>
              {el.name}
            </h3>

            <p className="mt-2 text-xs uppercase tracking-[0.15em] text-muted/70">
              Governs: {el.direction}
            </p>

            <p className="mt-5 leading-relaxed text-muted-dark">{el.desc}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}