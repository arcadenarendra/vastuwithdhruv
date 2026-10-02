import { Building2, Factory, Home, Landmark } from 'lucide-react'
import CTAButton from '../components/CTAButton'
import PageHero from '../components/PageHero'
import ScrollReveal from '../components/ScrollReveal'
import SectionHeading from '../components/SectionHeading'
import ServiceCard from '../components/ServiceCard'
import { services } from '../data/services'

const ICONS = [<Home size={24} />, <Building2 size={24} />, <Factory size={24} />, <Landmark size={24} />]

const PROCESS = [
  {
    step: '01',
    title: 'Initial Discussion',
    desc: 'A brief conversation about your space, your goals, and the concerns that matter most to you.',
  },
  {
    step: '02',
    title: 'Space Assessment',
    desc: 'A detailed evaluation of your property — in person, or remotely using plans and photos.',
  },
  {
    step: '03',
    title: 'Analysis & Report',
    desc: 'Directional mapping, zone analysis, and identification of the areas that need attention.',
  },
  {
    step: '04',
    title: 'Recommendations',
    desc: 'Practical, actionable recommendations tailored to your space, budget, and lifestyle.',
  },
]

export default function Services() {
  return (
    <main>
      <PageHero
        label="Services"
        title={
          <>
            Expert Vastu
            <br />
            <em className="italic text-gold">Consulting Services</em>
          </>
        }
        subtitle="Personalized Vastu solutions shaped around your space, your goals, and your concerns."
      />

      {/* Service grid */}
      <section className="bg-ivory py-16 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {services.map((s, i) => (
              <ScrollReveal key={s.id} delay={i * 0.08}>
                <ServiceCard
                  number={s.number}
                  title={s.title}
                  shortDesc={s.shortDesc}
                  slug={s.slug}
                  icon={ICONS[i]}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-stone py-16 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <SectionHeading
            label="How It Works"
            title="The consultation process."
            subtitle="A structured, respectful approach to every engagement."
          />

          <ol className="mt-16 grid grid-cols-1 gap-px border border-stone-200 bg-stone-200 md:grid-cols-4">
            {PROCESS.map((s, i) => (
              <ScrollReveal key={s.step} delay={i * 0.08} as="li">
                <div className="group relative h-full bg-stone p-8 transition-colors duration-300 hover:bg-ivory">
                  <span
                    className="text-5xl font-light text-stone-dark transition-colors duration-300 group-hover:text-gold/40"
                    style={{ fontFamily: 'var(--font-serif)' }}
                    aria-hidden="true"
                  >
                    {s.step}
                  </span>
                  <h3 className="mt-4 text-lg text-navy" style={{ fontFamily: 'var(--font-serif)' }}>
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </ol>

          <ScrollReveal delay={0.35}>
            <div className="mt-16 text-center">
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