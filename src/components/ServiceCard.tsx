import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

interface ServiceCardProps {
  number: string;
  title: string;
  shortDesc: string;
  slug: string;
  icon?: ReactNode;
}

/**
 * Service tile. The whole card is a link, so the hit target is the full
 * surface rather than just the "Explore" link at the bottom — the previous
 * version advertised `cursor-pointer` on the card but only wired up the link.
 */
export default function ServiceCard({ number, title, shortDesc, slug, icon }: ServiceCardProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { y: -6 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Link
        to={slug}
        className="group relative flex h-full flex-col overflow-hidden border border-stone-200 bg-ivory p-8 transition-all duration-300 hover:border-gold/50 hover:shadow-[0_24px_48px_-24px_rgba(15,23,42,0.25)] md:p-10"
      >
        {/* Corner wash that blooms from the top-right on hover. */}
        <span
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gold/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden="true"
        />

        <div className="relative flex items-start justify-between">
          <span
            className="text-5xl font-light text-stone-200 transition-colors duration-300 group-hover:text-gold/25"
            style={{ fontFamily: 'var(--font-serif)' }}
            aria-hidden="true"
          >
            {number}
          </span>
          {icon && (
            <span className="flex h-12 w-12 items-center justify-center border border-gold/25 text-gold/60 transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-navy">
              {icon}
            </span>
          )}
        </div>

        <h3
          className="relative mt-2 text-2xl text-navy"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          {title}
        </h3>

        <p className="relative mb-8 mt-3 text-sm leading-relaxed text-muted">{shortDesc}</p>

        <span className="relative mt-auto inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-gold">
          Explore
          <ArrowRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-1.5"
            aria-hidden="true"
          />
        </span>

        {/* Gold underline that draws in from the left on hover. */}
        <span
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gold transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
          aria-hidden="true"
        />
      </Link>
    </motion.div>
  )
}