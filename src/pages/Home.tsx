import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Building2,
  Clock,
  Factory,
  Home as HomeIcon,
  Landmark,
  Shield,
  Star,
} from 'lucide-react'
import CTAButton from '../components/CTAButton'
import DirectionExplorer from '../components/DirectionExplorer'
import FAQ from '../components/FAQ'
import ScrollReveal from '../components/ScrollReveal'
import SectionHeading from '../components/SectionHeading'
import ServiceCard from '../components/ServiceCard'
import { generalFaqs } from '../data/faqs'
import { services } from '../data/services'
import { fadeUp } from '../lib/motion'

const TRUST_ITEMS = [
  { label: '2+ Years', sub: 'Dedicated Experience', icon: <Star size={18} aria-hidden="true" /> },
  { label: 'Residential & Business', sub: 'Corporate • Industrial', icon: <Building2 size={18} aria-hidden="true" /> },
  { label: 'Lifetime', sub: 'Backup Support', icon: <Clock size={18} aria-hidden="true" /> },
  { label: '100%', sub: 'Money-Back Guarantee*', icon: <Shield size={18} aria-hidden="true" /> },
]

const SERVICE_ICONS = [<HomeIcon size={24} />, <Building2 size={24} />, <Factory size={24} />, <Landmark size={24} />]

const COMPASS_LABELS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']

export default function Home() {
  return (
    <main>
      {/* ── HERO ── */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-navy">
        <HeroBackdrop />

        <div className="relative mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-10 px-6 pb-16 pt-20 md:gap-16 md:px-10 md:pb-28 md:pt-28 lg:grid-cols-2">
          <div>
            <motion.span
              className="section-label"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.1}
            >
              Vastu Consulting · Ahmedabad
            </motion.span>

            <motion.h1
              className="mt-5 text-5xl leading-[1.05] tracking-tight text-white md:text-6xl xl:text-7xl"
              style={{ fontFamily: 'var(--font-serif)' }}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.25}
            >
              Align your space.
              <br />
              <em className="italic text-gold">Transform your life.</em>
            </motion.h1>

            <motion.span
              className="gold-divider mt-8 block"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.4}
              aria-hidden="true"
            />

            <motion.p
              className="mt-6 max-w-lg text-lg leading-relaxed text-white/70"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.5}
            >
              Designing Vastu solutions for life that truly work — where the timeless wisdom of
              Vastu Shastra meets modern-day living.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap gap-4"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.65}
            >
              <CTAButton to="/appointment" variant="primary" showArrow>
                Book Your Appointment
              </CTAButton>
              <CTAButton to="/services" variant="outline-light" showArrow>
                Explore Services
              </CTAButton>
            </motion.div>
          </div>

          <motion.div
            className="hidden justify-center lg:flex"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <VastuGridDiagram />
          </motion.div>
        </div>

      </section>

      {/* ── TRUST BAR ── */}
      <section id="trust" className="border-b border-stone-200 bg-ivory">
        <div className="mx-auto max-w-[1280px] px-6 py-12 md:px-10">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {TRUST_ITEMS.map((item, i) => (
              <ScrollReveal key={item.label} delay={i * 0.1}>
                <div className="group flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-gold/30 text-gold transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-navy">
                    {item.icon}
                  </span>
                  <div>
                    <div
                      className="text-xl font-semibold text-navy"
                      style={{ fontFamily: 'var(--font-serif)' }}
                    >
                      {item.label}
                    </div>
                    <div className="mt-0.5 text-xs tracking-wide text-muted">{item.sub}</div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted/60">
            * Subject to refund policy terms.{' '}
            <Link to="/refund-policy" className="link-underline hover:text-gold">
              View Refund Policy
            </Link>
          </p>
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section className="bg-ivory py-16 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <div className="grid grid-cols-1 items-center gap-10 lg:gap-16 lg:grid-cols-2">
            <ScrollReveal direction="left">
              <div className="relative">
                <div className="aspect-4/5 overflow-hidden bg-stone-100">
                  <img
                    src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800&h=1000&fit=crop&auto=format"
                    alt="Elegant modern Indian interior with thoughtful spatial design"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 hidden h-32 w-32 items-center justify-center bg-navy md:flex">
                  <div className="text-center">
                    <span
                      className="block text-3xl text-gold"
                      style={{ fontFamily: 'var(--font-serif)' }}
                    >
                      2+
                    </span>
                    <span className="text-xs uppercase tracking-[0.2em] text-white/60">Years</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <div>
              <SectionHeading label="Our Philosophy" title="Vastu that works with the way you live." />
              <ScrollReveal delay={0.2}>
                <p className="mt-8 leading-relaxed text-muted">
                  At Vastu with Dhruv, we combine traditional Vastu Shastra principles with a
                  practical understanding of contemporary spaces and lifestyles. Consultation isn't
                  about imposing rigid rules — it's about understanding your specific space, your
                  goals, and finding a thoughtful path toward greater balance.
                </p>
                <p className="mt-4 leading-relaxed text-muted">
                  Whether you're evaluating a new home, adjusting an office layout, or choosing land
                  to build on, our approach centres on clarity, respect for your existing space, and
                  actionable recommendations you can actually implement.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.35}>
                <div className="mt-8">
                  <CTAButton to="/about" variant="ghost" showArrow>
                    Meet Dhruv
                  </CTAButton>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="bg-stone py-16 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <SectionHeading
            label="What We Offer"
            title="Expert Vastu Services"
            subtitle="Personalized Vastu solutions shaped around your space, your goals, and your concerns."
          />
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {services.map((s, i) => (
              <ScrollReveal key={s.id} delay={i * 0.08}>
                <ServiceCard
                  number={s.number}
                  title={s.title}
                  shortDesc={s.shortDesc}
                  slug={s.slug}
                  icon={SERVICE_ICONS[i]}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONSULTANT ── */}
      <section className="relative overflow-hidden bg-navy py-16 md:py-32">
        <div className="grid-texture pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true" />

        <div className="relative mx-auto max-w-[1280px] px-6 md:px-10">
          <div className="grid grid-cols-1 items-center gap-10 lg:gap-16 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <ScrollReveal>
                <span className="section-label">The Consultant</span>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h2
                  className="mt-4 text-4xl leading-tight text-white md:text-5xl"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  Meet <em className="italic text-gold">Dhruv Dave</em>
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <span className="gold-divider mt-5 block" aria-hidden="true" />
                <p className="mt-6 text-lg leading-relaxed text-white/70">
                  Dhruv Dave is a Vastu consultant with over two years of dedicated practice. His
                  understanding of Vastu principles, combined with a sharp eye for spatial energy,
                  has helped clients across homes, businesses, factories, and corporate offices
                  work through persistent challenges and reach new levels of success.
                </p>
              </ScrollReveal>

              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {[
                  {
                    icon: <Shield size={20} aria-hidden="true" />,
                    title: '100% Money-Back Guarantee',
                    body: (
                      <>
                        If you're not satisfied, you're eligible for a refund subject to our{' '}
                        <Link to="/refund-policy" className="link-underline text-gold">
                          refund policy
                        </Link>
                        .
                      </>
                    ),
                  },
                  {
                    icon: <Clock size={20} aria-hidden="true" />,
                    title: 'Lifetime Backup Support',
                    body: <>Continued guidance even after your consultation is complete.</>,
                  },
                ].map((item, i) => (
                  <ScrollReveal key={item.title} delay={0.3 + i * 0.1}>
                    <div className="h-full border border-white/10 p-6 transition-colors duration-300 hover:border-gold/40 hover:bg-white/[0.03]">
                      <span className="mb-3 block text-gold">{item.icon}</span>
                      <h3 className="mb-2 text-sm font-semibold tracking-wide text-white">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-white/50">{item.body}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal delay={0.5}>
                <div className="mt-8">
                  <CTAButton to="/about" variant="secondary" showArrow>
                    Learn More About Dhruv
                  </CTAButton>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-2">
              <ScrollReveal direction="right">
                <figure className="group relative aspect-3/4 overflow-hidden bg-navy-soft">
                  <img
                    src="../public/profile.jpeg"
                    alt="Dhruv Dave, Vastu consultant"
                    className="h-full w-full object-cover opacity-85 transition-all duration-700 group-hover:scale-[1.03] group-hover:opacity-95"
                    loading="lazy"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy via-navy/80 to-transparent p-6 pt-16">
                    <span className="text-lg text-white" style={{ fontFamily: 'var(--font-serif)' }}>
                      Dhruv Dave
                    </span>
                    <br />
                    <span className="text-xs uppercase tracking-[0.2em] text-gold">
                      Vastu Consultant
                    </span>
                  </figcaption>
                  {/* Gold hairline frame that tightens on hover. */}
                  <span
                    className="pointer-events-none absolute inset-3 border border-gold/0 transition-all duration-500 group-hover:inset-2 group-hover:border-gold/40"
                    aria-hidden="true"
                  />
                </figure>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── SCIENCE ── */}
      <section className="bg-ivory py-16 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <div className="grid grid-cols-1 items-center gap-10 lg:gap-16 lg:grid-cols-2">
            <div>
              <SectionHeading label="The Science" title="An ancient system, thoughtfully applied." />
              <ScrollReveal delay={0.2}>
                <p className="mt-6 leading-relaxed text-muted">
                  Vastu Shastra is one of the world's oldest documented systems of spatial
                  arrangement. Rooted in ancient Indian architecture and philosophy, it maps the
                  relationships between physical space, directional energy, and the five natural
                  elements — Earth, Water, Fire, Air, and Space.
                </p>
                <p className="mt-4 leading-relaxed text-muted">
                  A Vastu consultation evaluates your space through this framework to identify areas
                  of imbalance and provide structured, practical recommendations.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <div className="mt-8">
                  <CTAButton to="/science-of-vastu" variant="ghost" showArrow>
                    Explore the Science of Vastu
                  </CTAButton>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="right">
              <Link
                to="/science-of-vastu"
                className="group block bg-stone p-8 transition-colors duration-300 hover:bg-stone-dark md:p-12"
              >
                <p className="section-label mb-6">Explore the 16 Directions</p>
                <div className="grid grid-cols-4 gap-2">
                  {['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'].map(
                    (d) => (
                      <span
                        key={d}
                        className="flex aspect-square items-center justify-center border border-stone-200 text-sm font-semibold text-muted transition-all duration-300 group-hover:border-gold/40 group-hover:text-gold"
                      >
                        {d}
                      </span>
                    )
                  )}
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-gold">
                  Explore all directions
                  <ArrowRight
                    size={12}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── DIRECTION EXPLORER ── */}
      <section className="bg-stone py-16 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <SectionHeading
            label="Directions"
            title="Explore the Vastu Compass"
            subtitle="Each direction carries distinct qualities. Select one to understand its significance."
          />
          <div className="mt-16">
            <DirectionExplorer />
          </div>
        </div>
      </section>

      {/* ── SUCCESS STORIES ── */}
      <section className="bg-ivory py-16 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <SectionHeading
            label="Success Stories"
            title="Spaces transformed. Lives enriched."
            subtitle="Client testimonials and results will be featured here as they are collected and verified."
            center
          />
          <ScrollReveal delay={0.3}>
            <div className="mx-auto mt-16 max-w-2xl border border-stone-200 p-12 text-center md:p-16">
              <span
                className="mb-6 block text-5xl text-gold/30"
                style={{ fontFamily: 'var(--font-serif)' }}
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <p className="text-lg italic text-muted">
                Client testimonials are currently being collected and will be verified before
                publication.
              </p>
              <div className="mt-8">
                <CTAButton to="/success-stories" variant="ghost" showArrow>
                  View Success Stories
                </CTAButton>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-stone py-16 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <div className="grid grid-cols-1 gap-10 lg:gap-16 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <SectionHeading label="FAQ" title="Common Questions" />
              <ScrollReveal delay={0.2}>
                <p className="mt-6 leading-relaxed text-muted">
                  Have more questions? Reach out directly — we're happy to discuss your specific
                  space and goals.
                </p>
                <div className="mt-6">
                  <CTAButton to="/contact" variant="ghost" showArrow>
                    Contact Us
                  </CTAButton>
                </div>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-3">
              <ScrollReveal>
                <FAQ items={generalFaqs} />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

/** Concentric rings, hairline grid and a soft gold bloom behind the hero copy. */
function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -right-[10%] top-[10%] aspect-square w-[70vw] max-h-[700px] max-w-[700px] rounded-full border border-gold/10" />
      <div className="absolute -right-[5%] top-[15%] aspect-square w-[55vw] max-h-[560px] max-w-[560px] rounded-full border border-gold/[0.08]" />
      <div className="grid-texture absolute inset-0 opacity-[0.05]" />

      <div
        className="absolute -left-40 top-1/3 h-[36rem] w-[36rem] -translate-y-1/2 rounded-full opacity-70 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.20) 0%, transparent 65%)' }}
      />

      <div className="absolute right-[4%] top-1/2 hidden -translate-y-1/2 opacity-15 lg:block">
        <svg viewBox="0 0 300 300" width={320} height={320}>
          <circle cx={150} cy={150} r={140} fill="none" stroke="#D4AF37" strokeWidth="1" />
          <circle cx={150} cy={150} r={100} fill="none" stroke="#D4AF37" strokeWidth="0.5" />
          <circle cx={150} cy={150} r={60} fill="none" stroke="#D4AF37" strokeWidth="0.5" />
          <circle cx={150} cy={150} r={6} fill="#D4AF37" />
          {COMPASS_LABELS.map((_, i) => {
            const a = (i * 45 * Math.PI) / 180
            return (
              <line
                key={i}
                x1={150 + 140 * Math.sin(a)}
                y1={150 - 140 * Math.cos(a)}
                x2={150 - 140 * Math.sin(a)}
                y2={150 + 140 * Math.cos(a)}
                stroke="#D4AF37"
                strokeWidth="0.5"
              />
            )
          })}
          {['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'].map((label, i) => {
            const a = (i * 45 * Math.PI) / 180
            return (
              <text
                key={label}
                x={150 + 155 * Math.sin(a)}
                y={150 - 155 * Math.cos(a) + 4}
                textAnchor="middle"
                fontSize="10"
                fill="#D4AF37"
                fontFamily="sans-serif"
              >
                {label}
              </text>
            )
          })}
        </svg>
      </div>
    </div>
  )
}

/** The 3×3 zone diagram that replaces the old static SVG placeholder. */
function VastuGridDiagram() {
  const zones = [
    { label: 'NW', desc: 'Air', highlight: false },
    { label: 'N', desc: 'Water', highlight: true },
    { label: 'NE', desc: 'Space', highlight: false },
    { label: 'W', desc: 'Space', highlight: false },
    { label: '✦', desc: 'Centre', highlight: true },
    { label: 'E', desc: 'Air', highlight: false },
    { label: 'SW', desc: 'Earth', highlight: false },
    { label: 'S', desc: 'Fire', highlight: false },
    { label: 'SE', desc: 'Fire', highlight: true },
  ]

  const cardinals = [
    { label: 'N', className: 'left-1/2 top-0 -translate-x-1/2' },
    { label: 'S', className: 'bottom-0 left-1/2 -translate-x-1/2' },
    { label: 'E', className: 'right-0 top-1/2 -translate-y-1/2' },
    { label: 'W', className: 'left-0 top-1/2 -translate-y-1/2' },
  ]

  return (
    <div className="relative h-[320px] w-[320px]">
      {/* Concentric rings behind the grid */}
      <div className="absolute inset-0 animate-[spin_60s_linear_infinite] rounded-full border border-dashed border-gold/20" />

      <div className="absolute inset-10 grid grid-cols-3 gap-1">
        {zones.map((z, i) => (
          <motion.div
            key={`${z.label}-${i}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className={`group flex flex-col items-center justify-center border transition-colors duration-300 ${
              z.highlight
                ? 'border-gold/50 bg-gold/10'
                : 'border-white/10 bg-white/5 hover:border-gold/30'
            }`}
          >
            <span
              className={`text-sm font-semibold transition-colors duration-300 ${
                z.highlight ? 'text-gold' : 'text-white/60 group-hover:text-gold'
              }`}
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {z.label}
            </span>
            <span className="mt-0.5 text-[9px] uppercase tracking-[0.15em] text-white/30">
              {z.desc}
            </span>
          </motion.div>
        ))}
      </div>

      {cardinals.map((c) => (
        <span
          key={c.label}
          className={`absolute text-[10px] font-bold tracking-[0.15em] text-gold/50 ${c.className}`}
          aria-hidden="true"
        >
          {c.label}
        </span>
      ))}
    </div>
  )
}