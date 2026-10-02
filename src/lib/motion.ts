import type { Variants } from 'framer-motion'

/**
 * Shared easing curves. `easeOutQuint` is the house easing — it decelerates
 * hard, which is what makes the reveals feel weighted rather than floaty.
 */
export const easeOutQuint = [0.22, 1, 0.36, 1] as const
export const easeInOutQuart = [0.76, 0, 0.24, 1] as const

/**
 * The two reveals used across every page. `fadeUp` is the default; `fadeIn`
 * exists for elements that should not shift position (labels, dividers).
 *
 * Both animate `transform` and `opacity` only, so they stay on the compositor
 * and never trigger layout.
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: easeOutQuint },
  }),
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, delay, ease: 'easeOut' },
  }),
}

/** Staggered container for lists and grids. */
export const staggerParent: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
}

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeOutQuint },
  },
}

/** Default viewport trigger: fire once, slightly before the element is centred. */
export const inViewOnce = { once: true, amount: 0.2, margin: '0px 0px -80px 0px' } as const