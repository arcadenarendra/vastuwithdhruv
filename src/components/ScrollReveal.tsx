import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, type ComponentType, type ReactNode, type Ref } from 'react'
import { easeOutQuint } from '../lib/motion'

type Direction = 'up' | 'left' | 'right' | 'none'

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  className?: string
  direction?: Direction
  /** Fraction of the element that must be visible before it animates in. */
  amount?: number
  as?: 'div' | 'section' | 'li' | 'article'
}

/** Distance travelled, per direction, before settling into place. */
const OFFSET: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 32 },
  left: { x: -32, y: 0 },
  right: { x: 32, y: 0 },
  none: { x: 0, y: 0 },
}

/**
 * Fades and slides its children into view the first time they are scrolled
 * into frame. Respects `prefers-reduced-motion` by rendering the final state
 * immediately rather than animating to it.
 */
export default function ScrollReveal({
  children,
  delay = 0,
  className = '',
  direction = 'up',
  amount = 0.2,
  as = 'div',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount, margin: '0px 0px -80px 0px' })
  const reduceMotion = useReducedMotion()

  // `motion[as]` is a union of component types whose `ref` parameter they
  // declare inconsistently, so the indexed access needs the loose signature.
  const MotionTag = motion[as] as ComponentType<{
    ref?: Ref<HTMLDivElement>
    className?: string
    initial?: { opacity: number; x: number; y: number }
    animate?: { opacity: number; x: number; y: number }
    transition?: { duration: number; delay: number; ease: readonly number[] }
    children?: ReactNode
  }>

  const { x, y } = OFFSET[direction]

  if (reduceMotion) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={{ opacity: 0, x, y }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y }}
      transition={{ duration: 0.7, delay, ease: easeOutQuint }}
    >
      {children}
    </MotionTag>
  )
}