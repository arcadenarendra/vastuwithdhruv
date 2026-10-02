import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp } from '../lib/motion'

interface PageHeroProps {
  label: string
  /** Main heading. Wrap the accented words in <em> to pick up the gold. */
  title: ReactNode
  subtitle?: string
  children?: ReactNode
}

/**
 * Shared dark hero for every inner page. The previous design repeated the same
 * inline SVG grid + heading stack six times across six files; this is that
 * markup written once.
 */
export default function PageHero({ label, title, subtitle, children }: PageHeroProps) {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden bg-navy pt-24 pb-14 md:pt-40 md:pb-24">
      {/* Hairline grid + a soft gold bloom in the upper right. */}
      <div
        className="grid-texture pointer-events-none absolute inset-0 opacity-[0.06]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full opacity-60 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.28) 0%, transparent 65%)' }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-10">
        <motion.span
          className="section-label"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.05}
        >
          {label}
        </motion.span>

        <motion.h1
          className="mt-4 max-w-4xl text-4xl leading-[1.1] text-white md:text-6xl"
          style={{ fontFamily: 'var(--font-serif)' }}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.15}
        >
          {title}
        </motion.h1>

        <motion.span
          className="gold-divider mt-6 block"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
          aria-hidden="true"
        />

        {subtitle && (
          <motion.p
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/60"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.4}
          >
            {subtitle}
          </motion.p>
        )}

        {children && (
          <motion.div
            className="mt-10"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.5}
          >
            {children}
          </motion.div>
        )}
      </div>

      {/* Bottom hairline anchors the hero against the light sections below. */}
      <div
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        aria-hidden="true"
      />
      {!reduceMotion && (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ivory/5 to-transparent"
          aria-hidden="true"
        />
      )}
    </section>
  )
}