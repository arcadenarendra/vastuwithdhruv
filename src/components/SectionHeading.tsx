import ScrollReveal from './ScrollReveal'

interface SectionHeadingProps {
  label?: string
  title: string
  subtitle?: string
  center?: boolean
  /** Use on dark sections — flips heading and body copy to the light palette. */
  light?: boolean
}

/**
 * Section eyebrow + title + optional lede, with a gold rule underneath.
 * `light` is the only switch a caller needs to make for dark sections.
 */
export default function SectionHeading({
  label,
  title,
  subtitle,
  center = false,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={center ? 'text-center' : ''}>
      {label && (
        <ScrollReveal>
          <span className="section-label">{label}</span>
        </ScrollReveal>
      )}

      <ScrollReveal delay={0.1}>
        <h2
          className="mt-2 text-3xl leading-tight md:mt-3 md:text-5xl"
          style={{
            fontFamily: 'var(--font-serif)',
            color: light ? '#FDFBF7' : '#0F172A',
          }}
        >
          {title}
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <span
          className={`gold-divider mt-4 block md:mt-5 ${center ? 'mx-auto' : ''}`}
          aria-hidden="true"
        />
      </ScrollReveal>

      {subtitle && (
        <ScrollReveal delay={0.2}>
          <p
            className="mt-4 max-w-2xl text-base leading-relaxed md:mt-6 md:text-lg"
            style={{
              color: light ? 'rgba(253,251,247,0.72)' : '#8B7D6B',
              marginLeft: center ? 'auto' : undefined,
              marginRight: center ? 'auto' : undefined,
            }}
          >
            {subtitle}
          </p>
        </ScrollReveal>
      )}
    </div>
  )
}