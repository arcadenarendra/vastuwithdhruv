import { CheckCircle, Clock, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'
import CTAButton from '../components/CTAButton'
import PageHero from '../components/PageHero'
import ScrollReveal from '../components/ScrollReveal'
import SectionHeading from '../components/SectionHeading'

const COMMITMENTS = [
  'Personalized assessment for every client',
  'Practical, implementable recommendations',
  'Respectful of structural limitations',
  'Clear communication throughout',
  'Transparent about what Vastu can and cannot address',
  'Follow-up support after consultation',
]

export default function About() {
  return (
    <main>
      <PageHero
        label="About"
        title={
          <>
            Meet <em className="italic text-gold">Dhruv Dave</em>
          </>
        }
        subtitle="Vastu consultant. Spatial thinker. Based in Ahmedabad, Gujarat."
      />

      {/* Bio */}
      <section className="bg-ivory py-16 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <div className="grid grid-cols-1 gap-10 lg:gap-16 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <ScrollReveal direction="left">
                <figure className="group relative">
                  <div className="aspect-3/4 overflow-hidden bg-stone-100">
                    <img
                      src="../public/profile.jpeg"
                      alt="Dhruv Dave, Vastu Consultant, Ahmedabad"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="absolute -bottom-5 -right-5 hidden bg-gold p-5 md:block">
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-navy">
                      Ahmedabad
                    </p>
                    <p className="text-xs tracking-wide text-navy/70">Gujarat, India</p>
                  </figcaption>
                </figure>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-3">
              <SectionHeading label="The Consultant" title="Guided by practice, driven by results." />

              <ScrollReveal delay={0.2}>
                <p className="mt-8 text-lg leading-relaxed text-muted">
                  Dhruv Dave is a Vastu consultant with over two years of dedicated practice. His
                  in-depth understanding of Vastu principles, combined with a sharp eye for spatial
                  energy, has helped clients across homes, businesses, factories, and corporate
                  offices work through persistent challenges and unlock new levels of success.
                </p>
                <p className="mt-5 leading-relaxed text-muted">
                  He approaches every consultation as a distinct engagement. There is no template —
                  each space is evaluated individually, taking into account its specific
                  orientation, construction, and the unique circumstances of the people who occupy
                  it.
                </p>
                <p className="mt-5 leading-relaxed text-muted">
                  His work spans residential homes, business premises, corporate campuses, industrial
                  facilities, and land selection — delivering structured, practical recommendations
                  that can be applied within the real constraints of modern spaces.
                </p>
              </ScrollReveal>

              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {COMMITMENTS.map((item, i) => (
                  <ScrollReveal key={item} delay={i * 0.06}>
                    <div className="group flex items-start gap-3">
                      <CheckCircle
                        size={16}
                        className="mt-0.5 shrink-0 text-gold transition-transform duration-300 group-hover:scale-110"
                        aria-hidden="true"
                      />
                      <span className="text-sm text-muted-dark">{item}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal delay={0.4}>
                <div className="mt-10 flex flex-wrap gap-4">
                  <CTAButton to="/appointment" variant="primary" showArrow>
                    Book a Consultation
                  </CTAButton>
                  <CTAButton to="/contact" variant="secondary" showArrow>
                    Get in Touch
                  </CTAButton>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="bg-stone py-14 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {[
              {
                icon: <Shield size={28} aria-hidden="true" />,
                title: '100% Money-Back Guarantee',
                body: (
                  <>
                    If you are not satisfied with the service, you are eligible for a money-back
                    guarantee subject to the applicable refund policy. We encourage you to review the
                    full terms before booking.
                  </>
                ),
                link: { label: 'View Refund Policy', href: '/refund-policy' },
              },
              {
                icon: <Clock size={28} aria-hidden="true" />,
                title: 'Lifetime Backup Support',
                body: (
                  <>
                    Continued support even after the consultation is complete. You can reach out for
                    follow-up questions related to the recommendations provided — so you can
                    implement with confidence.
                  </>
                ),
                link: null,
              },
            ].map((card, i) => (
              <ScrollReveal key={card.title} delay={i * 0.12}>
                <div className="group h-full border border-stone-200 bg-ivory p-8 transition-all duration-300 hover:border-gold/40 hover:shadow-[0_20px_40px_-24px_rgba(15,23,42,0.25)] md:p-10">
                  <span className="mb-4 block text-gold transition-transform duration-300 group-hover:scale-110">
                    {card.icon}
                  </span>
                  <h3
                    className="mb-3 text-2xl text-navy"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {card.title}
                  </h3>
                  <p className="leading-relaxed text-muted">{card.body}</p>
                  {card.link && (
                    <Link
                      to={card.link.href}
                      className="link-underline mt-5 inline-block text-xs uppercase tracking-[0.15em] text-gold"
                    >
                      {card.link.label} →
                    </Link>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}