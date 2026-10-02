import { Link, useParams } from 'react-router-dom'
import { CheckCircle, ChevronRight } from 'lucide-react'
import CTAButton from '../../components/CTAButton'
import FAQ from '../../components/FAQ'
import ScrollReveal from '../../components/ScrollReveal'
import SectionHeading from '../../components/SectionHeading'
import { generalFaqs } from '../../data/faqs'
import { services } from '../../data/services'

const HERO_IMAGES: Record<string, string> = {
  'residential-vastu':
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&h=700&fit=crop&auto=format',
  'business-vastu':
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&h=700&fit=crop&auto=format',
  'corporate-industrial-vastu':
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&h=700&fit=crop&auto=format',
  'land-selection':
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1400&h=700&fit=crop&auto=format',
}

const METHOD = [
  {
    n: '01',
    t: 'Initial Brief',
    d: 'Understanding your space, goals, and primary concerns through a focused discussion.',
  },
  {
    n: '02',
    t: 'Detailed Assessment',
    d: 'Systematic evaluation using floor plans, site photos, and directional tools.',
  },
  {
    n: '03',
    t: 'Vastu Analysis',
    d: 'Mapping energy zones, identifying directional imbalances, and noting key areas.',
  },
  {
    n: '04',
    t: 'Recommendation Report',
    d: 'A structured, written report with prioritized, practical remedies and suggestions.',
  },
]

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>()
  const service = services.find((s) => s.id === slug)

  if (!service) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-ivory">
        <div className="px-6 text-center">
          <h1
            className="text-3xl text-navy md:text-4xl"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Service not found
          </h1>
          <p className="mt-3 text-muted">
            The service you're looking for doesn't exist or has moved.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <CTAButton to="/services" variant="primary" showArrow>
              Back to Services
            </CTAButton>
            <CTAButton to="/" variant="ghost">
              Go Home
            </CTAButton>
          </div>
        </div>
      </main>
    )
  }

  const image = HERO_IMAGES[service.id] ?? HERO_IMAGES['residential-vastu']
  const others = services.filter((s) => s.id !== service.id)

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy">
        <img
          src={image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-20"
          loading="eager"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/60" />

        <div className="relative mx-auto max-w-[1280px] px-6 pb-24 pt-32 md:px-10 md:pt-40">
          <div className="max-w-2xl">
            <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-white/40">
              <Link to="/services" className="transition-colors hover:text-gold">
                Services
              </Link>
              <ChevronRight size={12} aria-hidden="true" />
              <span className="text-white/60">{service.title}</span>
            </nav>

            <span className="section-label">Service {service.number}</span>

            <h1
              className="mt-4 text-4xl leading-tight text-white md:text-6xl"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {service.heroHeadline}
            </h1>

            <span className="gold-divider mt-6 block" aria-hidden="true" />

            <p className="mt-6 text-lg leading-relaxed text-white/70">{service.heroSub}</p>

            <div className="mt-10">
              <CTAButton to="/appointment" variant="primary" showArrow>
                {service.cta}
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges + coverage */}
      <section className="bg-ivory py-16 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <div className="grid grid-cols-1 gap-10 lg:gap-16 lg:grid-cols-2">
            <div>
              <SectionHeading label="Common Challenges" title="What brings clients to us?" />
              <ul className="mt-10 space-y-4">
                {service.challenges.map((c) => (
                  <ScrollReveal key={c} as="li" delay={0.05}>
                    <span className="group flex items-start gap-3">
                      <span className="mt-2 h-px w-5 shrink-0 bg-gold/50 transition-all duration-300 group-hover:w-8" />
                      <span className="leading-relaxed text-muted-dark">{c}</span>
                    </span>
                  </ScrollReveal>
                ))}
              </ul>
            </div>

            <div>
              <SectionHeading label="What We Assess" title="Areas covered in consultation." />
              <ul className="mt-10 space-y-4">
                {service.covers.map((c) => (
                  <ScrollReveal key={c} as="li" delay={0.05}>
                    <span className="group flex items-start gap-3">
                      <CheckCircle
                        size={16}
                        className="mt-0.5 shrink-0 text-gold transition-transform duration-300 group-hover:scale-110"
                        aria-hidden="true"
                      />
                      <span className="leading-relaxed text-muted-dark">{c}</span>
                    </span>
                  </ScrollReveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Method */}
      <section className="relative overflow-hidden bg-navy py-16 md:py-32">
        <div className="grid-texture pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true" />

        <div className="relative mx-auto max-w-[1280px] px-6 md:px-10">
          <SectionHeading label="Our Approach" title="How a consultation works." light />

          <ol className="mt-16 grid grid-cols-1 gap-px border border-white/10 bg-white/10 md:grid-cols-4">
            {METHOD.map((s, i) => (
              <ScrollReveal key={s.n} delay={i * 0.08} as="li">
                <div className="group h-full bg-navy p-8 transition-colors duration-300 hover:bg-navy-soft">
                  <span
                    className="text-4xl font-light text-white/10 transition-colors duration-300 group-hover:text-gold/40"
                    style={{ fontFamily: 'var(--font-serif)' }}
                    aria-hidden="true"
                  >
                    {s.n}
                  </span>
                  <h3 className="mt-4 text-lg text-white" style={{ fontFamily: 'var(--font-serif)' }}>
                    {s.t}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">{s.d}</p>
                </div>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-stone py-16 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <SectionHeading label="After Consultation" title="What you can expect." />
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {service.benefits.map((b, i) => (
              <ScrollReveal key={b} delay={i * 0.08}>
                <div className="group flex h-full items-start gap-4 border border-stone-200 bg-ivory p-6 transition-all duration-300 hover:border-gold/40">
                  <span
                    className="text-lg font-light text-gold/40"
                    style={{ fontFamily: 'var(--font-serif)' }}
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="leading-relaxed text-muted-dark">{b}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="bg-ivory py-14 md:py-20">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-stone-200 pt-10">
            <h2 className="text-2xl text-navy" style={{ fontFamily: 'var(--font-serif)' }}>
              Explore other services
            </h2>
            <nav className="flex flex-wrap gap-x-8 gap-y-2" aria-label="Other services">
              {others.map((s) => (
                <Link
                  key={s.id}
                  to={s.slug}
                  className="link-underline text-sm text-muted transition-colors hover:text-gold"
                >
                  {s.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-ivory pb-24">
        <div className="mx-auto max-w-[800px] px-6 md:px-10">
          <SectionHeading label="FAQ" title="Common Questions" center />
          <div className="mt-12">
            <FAQ items={generalFaqs.slice(0, 4)} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-stone py-14 md:py-20">
        <div className="mx-auto max-w-[1280px] px-6 text-center md:px-10">
          <ScrollReveal>
            <h2 className="text-4xl text-navy" style={{ fontFamily: 'var(--font-serif)' }}>
              Ready to begin?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted">
              Start with a personalized consultation designed around your space, your goals, and
              your concerns.
            </p>
            <div className="mt-8">
              <CTAButton to="/appointment" variant="primary" showArrow>
                {service.cta}
              </CTAButton>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}