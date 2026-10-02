import CTAButton from '../components/CTAButton'
import DirectionExplorer from '../components/DirectionExplorer'
import FAQ from '../components/FAQ'
import FiveElements from '../components/FiveElements'
import PageHero from '../components/PageHero'
import ScrollReveal from '../components/ScrollReveal'
import SectionHeading from '../components/SectionHeading'
import { scienceFaqs } from '../data/faqs'

const PROCESS = [
  {
    n: '01',
    t: 'Understanding Your Space',
    d: 'Every consultation begins with the specific characteristics of your space — its orientation, construction, use, and your personal goals.',
  },
  {
    n: '02',
    t: 'Directional Mapping',
    d: 'Using the compass and Vastu grid, each zone of the property is mapped to understand which directional energies are active, balanced, or misaligned.',
  },
  {
    n: '03',
    t: 'Elemental Analysis',
    d: 'The balance of the five elements is evaluated — identifying any zones where elemental energies may be disproportionate or conflicting.',
  },
  {
    n: '04',
    t: 'Practical Recommendations',
    d: 'Based on the analysis, structured recommendations are provided — from non-structural adjustments to layout considerations, in a clear written report.',
  },
]

const RADII = [190, 140, 80]

export default function ScienceOfVastu() {
  return (
    <main>
      <PageHero
        label="Knowledge"
        title={
          <>
            The Science of
            <br />
            <em className="italic text-gold">Vastu Shastra</em>
          </>
        }
        subtitle="An ancient system of spatial arrangement, direction, and elemental balance — explored."
      >
        {/* Decorative mandala, kept clear of the copy on smaller screens. */}
        <div
          className="pointer-events-none absolute right-[4%] top-1/2 hidden -translate-y-1/2 opacity-10 xl:block"
          aria-hidden="true"
        >
          <svg viewBox="0 0 400 400" width={380} height={380}>
            {RADII.map((r, i) => (
              <circle key={r} cx={200} cy={200} r={r} fill="none" stroke="#D4AF37" strokeWidth={i === 0 ? 1 : 0.5} />
            ))}
            <circle cx={200} cy={200} r={10} fill="#D4AF37" />
            {Array.from({ length: 16 }, (_, i) => i * 22.5).map((a) => {
              const r = (a * Math.PI) / 180
              return (
                <line
                  key={a}
                  x1={200 + 190 * Math.sin(r)}
                  y1={200 - 190 * Math.cos(r)}
                  x2={200 + 80 * Math.sin(r)}
                  y2={200 - 80 * Math.cos(r)}
                  stroke="#D4AF37"
                  strokeWidth="0.5"
                />
              )
            })}
          </svg>
        </div>
      </PageHero>

      {/* What is Vastu */}
      <section className="bg-ivory py-16 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <div className="grid grid-cols-1 items-center gap-10 lg:gap-16 lg:grid-cols-2">
            <div>
              <SectionHeading label="Foundation" title="What Is Vastu Shastra?" />
              <ScrollReveal delay={0.15}>
                <p className="mt-8 text-lg leading-relaxed text-muted">
                  Vastu Shastra is one of India's oldest documented systems of architecture and
                  spatial planning. &ldquo;Vastu&rdquo; refers to the dwelling or site;
                  &ldquo;Shastra&rdquo; refers to a body of knowledge or science. Together they
                  describe a systematic approach to creating living and working environments in
                  alignment with natural forces and directional energies.
                </p>
                <p className="mt-5 leading-relaxed text-muted">
                  The system maps how physical spaces interact with the five natural elements —
                  Earth, Water, Fire, Air, and Space — and the energies associated with different
                  directions. The goal is a space where these elements exist in balance, which is
                  traditionally understood to support well-being, productivity, and prosperity.
                </p>
                <p className="mt-5 leading-relaxed text-muted">
                  Vastu principles have influenced Indian architecture for centuries. Many
                  significant structures were planned with Vastu considerations — temples,
                  palaces, and civic buildings. Today these principles are applied practically to
                  homes, offices, and commercial spaces through structured consultation.
                </p>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="right">
              <figure className="flex flex-col items-center gap-8 bg-stone p-10 md:p-14">
                <VastuMandala />
                <figcaption className="text-center">
                  <p
                    className="text-2xl italic text-navy"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    &ldquo;A perfect place to reside, grow, prosper, and succeed.&rdquo;
                  </p>
                  <span className="gold-divider mx-auto mt-4 block" aria-hidden="true" />
                </figcaption>
              </figure>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Five elements */}
      <section className="bg-stone py-16 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <SectionHeading
            label="Pancha Bhuta"
            title="The Five Elements"
            subtitle="Vastu Shastra is grounded in the balance of five natural elements, each associated with specific directions and qualities."
            center
          />
          <div className="mt-16">
            <FiveElements />
          </div>
        </div>
      </section>

      {/* 16 directions */}
      <section className="bg-ivory py-16 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <SectionHeading
            label="Shodasha Disha"
            title="The 16 Directions"
            subtitle="Vastu maps a space into 16 directional zones, each with distinct qualities and influences. Explore them below."
          />
          <div className="mt-16">
            <DirectionExplorer />
          </div>
          <ScrollReveal delay={0.2}>
            <p className="mt-8 max-w-lg text-sm text-muted/70">
              The zones shown are the currently documented directions. Further detail is added as
              the knowledge base grows.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Process */}
      <section className="relative overflow-hidden bg-navy py-16 md:py-32">
        <div className="grid-texture pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true" />

        <div className="relative mx-auto max-w-[1280px] px-6 md:px-10">
          <SectionHeading
            label="The Process"
            title="How a Vastu consultation works."
            subtitle="A structured, transparent approach from initial discussion to actionable recommendations."
            light
          />

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
            {PROCESS.map((s, i) => (
              <ScrollReveal key={s.n} delay={i * 0.08}>
                <div className="group h-full border border-white/10 p-8 transition-all duration-300 hover:border-gold/30 hover:bg-white/[0.03]">
                  <span
                    className="text-4xl font-light text-white/10 transition-colors duration-300 group-hover:text-gold/40"
                    style={{ fontFamily: 'var(--font-serif)' }}
                    aria-hidden="true"
                  >
                    {s.n}
                  </span>
                  <h3 className="mt-4 text-xl text-white" style={{ fontFamily: 'var(--font-serif)' }}>
                    {s.t}
                  </h3>
                  <p className="mt-3 leading-relaxed text-white/50">{s.d}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-stone py-16 md:py-24">
        <div className="mx-auto max-w-[800px] px-6 md:px-10">
          <SectionHeading label="FAQ" title="Questions about Vastu" center />
          <div className="mt-12">
            <FAQ items={scienceFaqs} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ivory py-14 md:py-20">
        <div className="mx-auto max-w-[1280px] px-6 text-center md:px-10">
          <ScrollReveal>
            <h2 className="text-4xl text-navy" style={{ fontFamily: 'var(--font-serif)' }}>
              Ready to explore your space?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted">
              Book a consultation and see how Vastu principles apply to your specific property.
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

/** Concentric mandala used as a figure on the "What is Vastu" section. */
function VastuMandala() {
  return (
    <svg viewBox="0 0 200 200" width={180} height={180} className="max-w-full" aria-hidden="true">
      <circle cx={100} cy={100} r={90} fill="none" stroke="#D4AF37" strokeWidth="0.8" opacity="0.4" />
      <circle cx={100} cy={100} r={65} fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3" />
      <circle cx={100} cy={100} r={35} fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3" />
      <rect x={40} y={40} width={120} height={120} fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3" />
      <rect x={62} y={62} width={76} height={76} fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.2" />
      <circle cx={100} cy={100} r={5} fill="#D4AF37" opacity="0.6" />
      {Array.from({ length: 8 }, (_, i) => i * 45).map((a) => {
        const r = (a * Math.PI) / 180
        return (
          <line
            key={a}
            x1={100 + 90 * Math.sin(r)}
            y1={100 - 90 * Math.cos(r)}
            x2={100 - 90 * Math.sin(r)}
            y2={100 + 90 * Math.cos(r)}
            stroke="#D4AF37"
            strokeWidth="0.4"
            opacity="0.25"
          />
        )
      })}
    </svg>
  )
}