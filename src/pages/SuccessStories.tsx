import CTAButton from '../components/CTAButton'
import PageHero from '../components/PageHero'
import ScrollReveal from '../components/ScrollReveal'
import SectionHeading from '../components/SectionHeading'

const CASE_FRAMING = [
  { label: 'The Challenge', desc: 'What the client was experiencing and what they sought help with.' },
  { label: 'The Assessment', desc: 'What was evaluated — direction mapping, zone analysis, elemental review.' },
  { label: 'Recommendations', desc: 'The changes and remedies suggested based on the assessment findings.' },
  { label: 'Client Outcome', desc: 'Changes reported by the client following implementation, as provided.' },
]

/**
 * Placeholder cards for testimonials not yet verified. Rendered as skeletons
 * with a shimmer rather than fake quotes, so nothing on the page reads as a
 * real review that isn't one.
 */
function TestimonialSkeleton({ delay }: { delay: number }) {
  return (
    <ScrollReveal delay={delay} className="h-full">
      <div className="relative h-full overflow-hidden border border-stone-200 p-8">
        <span
          className="mb-4 block text-5xl text-gold/20"
          style={{ fontFamily: 'var(--font-serif)' }}
          aria-hidden="true"
        >
          &ldquo;
        </span>
        <div className="space-y-2" aria-hidden="true">
          <div className="h-3 w-full rounded bg-stone-100" />
          <div className="h-3 w-5/6 rounded bg-stone-100" />
          <div className="h-3 w-4/6 rounded bg-stone-100" />
        </div>
        <div className="mt-6 flex items-center gap-3 border-t border-stone-100 pt-6" aria-hidden="true">
          <div className="h-10 w-10 rounded-full bg-stone-100" />
          <div>
            <div className="mb-1 h-3 w-24 rounded bg-stone-100" />
            <div className="h-2 w-16 rounded bg-stone-100" />
          </div>
        </div>

        {/* Shimmer sweep */}
        <span
          className="pointer-events-none absolute inset-0 -translate-x-full animate-[shimmer_2.6s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"
          aria-hidden="true"
        />

        <span className="absolute right-4 top-4 text-xs italic text-muted/40">Coming soon</span>
      </div>
    </ScrollReveal>
  )
}

export default function SuccessStories() {
  return (
    <main>
      <PageHero
        label="Results"
        title={
          <>
            Spaces transformed.
            <br />
            <em className="italic text-gold">Lives enriched.</em>
          </>
        }
        subtitle="Real outcomes from real clients — collected and verified before publication."
      />

      {/* Testimonials */}
      <section className="bg-ivory py-16 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <SectionHeading
            label="Client Stories"
            title="What our clients say."
            subtitle="Testimonials are currently being collected and verified. Please check back soon."
          />

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <TestimonialSkeleton key={i} delay={i * 0.1} />
            ))}
          </div>

          <ScrollReveal delay={0.35}>
            <div className="mx-auto mt-12 max-w-2xl bg-stone p-10 text-center">
              <p
                className="mb-2 text-lg italic text-muted"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                Verified client testimonials will appear here.
              </p>
              <p className="text-sm text-muted/70">
                We believe in honest representation. Only genuine, verified reviews will be
                published.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Case study framing */}
      <section className="relative overflow-hidden bg-navy py-16 md:py-32">
        <div className="grid-texture pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true" />

        <div className="relative mx-auto max-w-[1280px] px-6 md:px-10">
          <SectionHeading
            label="Case Studies"
            title="How we approach each engagement."
            subtitle="Our case study format — to be populated with verified client engagements."
            light
          />

          <ol className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
            {CASE_FRAMING.map((item, i) => (
              <ScrollReveal key={item.label} delay={i * 0.08} as="li">
                <div className="group h-full border border-white/10 p-8 transition-all duration-300 hover:border-gold/30 hover:bg-white/[0.03]">
                  <span className="section-label">{item.label}</span>
                  <p className="mt-3 leading-relaxed text-white/50">{item.desc}</p>
                  <span
                    className="mt-6 block h-px w-8 bg-gold/40 transition-all duration-300 group-hover:w-16"
                    aria-hidden="true"
                  />
                </div>
              </ScrollReveal>
            ))}
          </ol>

          <ScrollReveal delay={0.3}>
            <p className="mt-10 max-w-lg text-sm text-white/30">
              Case studies will be published only with verified client information and consent.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-stone py-14 md:py-20">
        <div className="mx-auto max-w-[1280px] px-6 text-center md:px-10">
          <ScrollReveal>
            <h2 className="text-4xl text-navy" style={{ fontFamily: 'var(--font-serif)' }}>
              Start your own story.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted">
              Begin with a personalized consultation designed around your specific space and goals.
            </p>
            <div className="mt-8">
              <CTAButton to="/appointment" variant="primary" showArrow>
                Book Your Appointment
              </CTAButton>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}