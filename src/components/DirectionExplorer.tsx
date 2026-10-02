import { useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { directions } from '../data/directions'
import { easeOutQuint } from '../lib/motion'

const C = 190
const RING_R = 130
const LABEL_R = 158

/** Accent colour per element — used for the node ring and the info panel. */
const ELEMENT_COLOR: Record<string, string> = {
  Earth: '#8B6914',
  Water: '#2F6FB5',
  Fire: '#C2410C',
  Air: '#0F766E',
  Space: '#5B4BB5',
}

const AXES = [0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5]

export default function DirectionExplorer() {
  const [selected, setSelected] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)
  const reduceMotion = useReducedMotion()

  const active = directions[selected]
  const activeColor = ELEMENT_COLOR[active.element ?? ''] ?? '#D4AF37'

  /** Wraps around at both ends so arrowing past North lands on North-Northwest. */
  const step = (delta: number) => {
    setSelected((prev) => (prev + delta + directions.length) % directions.length)
  }

  const onKeyDown = (e: KeyboardEvent<SVGSVGElement>) => {
    const map: Record<string, number> = {
      ArrowRight: 1,
      ArrowDown: 1,
      ArrowLeft: -1,
      ArrowUp: -1,
    }
    if (e.key in map) {
      e.preventDefault()
      step(map[e.key])
      return
    }
    if (e.key === 'Home') {
      e.preventDefault()
      setSelected(0)
    }
    if (e.key === 'End') {
      e.preventDefault()
      setSelected(directions.length - 1)
    }
  }

  return (
    <div className="flex flex-col items-center gap-14 lg:flex-row lg:gap-16">
      {/* Compass */}
      <svg
        viewBox="0 0 380 380"
        className="h-auto w-full max-w-[340px] shrink-0 select-none md:max-w-[380px]"
        role="radiogroup"
        aria-label="Vastu 16-direction compass. Use arrow keys to browse directions."
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        {/* Slow sweep of the outer ring. Kept in its own group so the nodes
            below stay locked to their real bearings. */}
        {!reduceMotion && (
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: `${C}px ${C}px` }}
          >
            <circle
              cx={C}
              cy={C}
              r={172}
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1"
              strokeDasharray="2 14"
              opacity="0.35"
            />
          </motion.g>
        )}

        <circle cx={C} cy={C} r={172} fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.2" />
        <circle cx={C} cy={C} r={155} fill="none" stroke="#D4AF37" strokeWidth="0.4" opacity="0.12" />
        <circle cx={C} cy={C} r={RING_R} fill="none" stroke="#D4AF37" strokeWidth="0.4" opacity="0.1" />

        {/* Cardinal spokes */}
        {AXES.map((deg) => {
          const r = (deg * Math.PI) / 180
          const cos = Math.cos(r)
          const sin = Math.sin(r)
          return (
            <line
              key={deg}
              x1={C + 172 * sin}
              y1={C - 172 * cos}
              x2={C - 172 * sin}
              y2={C + 172 * cos}
              stroke="#D4AF37"
              strokeWidth="0.4"
              opacity="0.18"
            />
          )
        })}

        <circle cx={C} cy={C} r={55} fill="none" stroke="#D4AF37" strokeWidth="0.6" opacity="0.3" />
        <circle cx={C} cy={C} r={26} fill="#D4AF37" opacity="0.08" />
        <circle cx={C} cy={C} r={5} fill="#D4AF37" opacity="0.7" />
        <text
          x={C}
          y={C + 18}
          textAnchor="middle"
          fontSize="6.5"
          fill="#D4AF37"
          opacity="0.6"
          fontFamily="var(--font-sans)"
          letterSpacing="2"
        >
          VASTU
        </text>

        {/* Pulsing halo behind the selected direction. */}
        <motion.circle
          cx={C + RING_R * Math.cos((active.angle * Math.PI) / 180)}
          cy={C - RING_R * Math.sin((active.angle * Math.PI) / 180)}
          r={13}
          fill={activeColor}
          initial={false}
          animate={{ scale: [1, 1.9, 1], opacity: [0.35, 0, 0.35] }}
          transition={reduceMotion ? undefined : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'center' }}
          aria-hidden="true"
        />

        {/* Direction nodes */}
        {directions.map((dir, i) => {
          const rad = (dir.angle * Math.PI) / 180
          const nx = C + RING_R * Math.cos(rad)
          const ny = C - RING_R * Math.sin(rad)
          const lx = C + LABEL_R * Math.cos(rad)
          const ly = C - LABEL_R * Math.sin(rad)
          const isActive = i === selected
          const isHovered = i === hovered

          // Keep labels from spilling off the left and right edges.
          const anchor = lx > C + 8 ? 'start' : lx < C - 8 ? 'end' : 'middle'

          return (
            <motion.g
              key={dir.abbreviation}
              role="radio"
              aria-checked={isActive}
              aria-label={`${dir.name} — ${dir.significance}`}
              tabIndex={-1}
              className="cursor-pointer outline-none"
              onClick={() => setSelected(i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              initial={false}
              animate={{ opacity: isActive || isHovered ? 1 : 0.55 }}
              transition={{ duration: 0.25 }}
            >
              {/* Spoke from centre to node */}
              <line
                x1={C}
                y1={C}
                x2={nx}
                y2={ny}
                stroke={isActive ? activeColor : '#D4AF37'}
                strokeWidth={isActive ? 1.4 : 0.5}
                opacity={isActive ? 0.9 : 0.2}
              />

              {/* Node */}
              <motion.circle
                cx={nx}
                cy={ny}
                animate={{ r: isActive ? 7.5 : isHovered ? 6 : 4.5 }}
                transition={{ duration: 0.25, ease: easeOutQuint }}
                fill={isActive ? activeColor : '#0F172A'}
                stroke={isActive ? activeColor : '#D4AF37'}
                strokeWidth={isActive ? 2 : 1}
              />

              <text
                x={lx}
                y={ly + 3.5}
                textAnchor={anchor}
                fontSize={isActive ? 10 : 7.5}
                fontWeight={isActive ? 700 : 400}
                fill={isActive ? activeColor : isHovered ? '#D4AF37' : '#8B7D6B'}
                fontFamily="var(--font-sans)"
              >
                {dir.abbreviation}
              </text>
            </motion.g>
          )
        })}
      </svg>

      {/* Info panel */}
      <div className="min-w-0 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.32, ease: easeOutQuint }}
          >
            <span className="section-label">
              Direction {String(selected + 1).padStart(2, '0')} / {directions.length}
            </span>

            <h3
              className="mt-3 text-4xl leading-tight text-navy md:text-5xl"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {active.name}
            </h3>

            <span className="gold-divider mt-4 block" aria-hidden="true" />

            <p className="mt-5 text-lg leading-relaxed text-muted">{active.significance}</p>

            {active.element && (
              <div className="mt-6 inline-flex items-center gap-3 border border-stone-200 bg-ivory px-4 py-2.5">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: ELEMENT_COLOR[active.element] ?? '#D4AF37' }}
                  aria-hidden="true"
                />
                <span className="text-xs uppercase tracking-[0.15em] text-muted">Element</span>
                <span className="h-4 w-px bg-stone-300" aria-hidden="true" />
                <span className="text-sm text-navy">{active.element}</span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Direction picker — the keyboard-navigable equivalent of the compass. */}
        <div
          className="mt-8 flex flex-wrap gap-2"
          role="radiogroup"
          aria-label="Select a direction"
        >
          {directions.map((dir, i) => (
            <button
              key={dir.abbreviation}
              type="button"
              role="radio"
              aria-checked={i === selected}
              tabIndex={i === selected ? 0 : -1}
              onClick={() => setSelected(i)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                  e.preventDefault()
                  step(1)
                } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                  e.preventDefault()
                  step(-1)
                }
              }}
              className={`border px-3 py-1.5 text-xs uppercase tracking-[0.1em] transition-all duration-200 ${
                i === selected
                  ? 'border-gold bg-gold text-navy'
                  : 'border-stone-200 text-muted hover:border-gold/50 hover:text-gold'
              }`}
            >
              {dir.abbreviation}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}