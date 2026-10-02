import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline-light'

interface CTAButtonProps {
  /** Internal route. Takes precedence over `href`. */
  to?: string
  /** External URL, mailto:, tel: — anything that is not a client-side route. */
  href?: string
  children: ReactNode
  variant?: Variant
  className?: string
  showArrow?: boolean
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: () => void
  'aria-label'?: string
}

const BASE =
  'group/cta relative inline-flex items-center justify-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 disabled:pointer-events-none disabled:opacity-50'

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-gold text-navy px-6 py-3.5 hover:bg-gold-light hover:shadow-[0_10px_30px_-10px_rgba(212,175,55,0.7)] active:scale-[0.98]',
  secondary:
    'border border-gold px-6 py-3.5 text-gold hover:bg-gold hover:text-navy active:scale-[0.98]',
  ghost:
    'px-0 py-1.5 text-navy border-b border-gold/40 hover:text-gold hover:border-gold',
  'outline-light':
    'border border-white/40 px-6 py-3.5 text-white hover:bg-white hover:text-navy active:scale-[0.98]',
}

/**
 * Primary call-to-action. Renders as a router `Link`, an `<a>`, or a `<button>`
 * depending on which of `to` / `href` / neither is supplied.
 *
 * The arrow nudges right on hover via the `group/cta` marker rather than a
 * nested `whileHover`, which previously never fired because the hover was
 * tracked on the child element rather than the link.
 */
export default function CTAButton({
  to,
  href,
  children,
  variant = 'primary',
  className = '',
  showArrow = false,
  type = 'button',
  disabled,
  onClick,
  'aria-label': ariaLabel,
}: CTAButtonProps) {
  const classes = `${BASE} ${VARIANTS[variant]} ${className}`

  const content = (
    <>
      {children}
      {showArrow && (
        <ArrowRight
          size={14}
          className="transition-transform duration-300 group-hover/cta:translate-x-1"
          aria-hidden="true"
        />
      )}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel}>
        {content}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes} aria-label={ariaLabel}>
      {content}
    </button>
  )
}