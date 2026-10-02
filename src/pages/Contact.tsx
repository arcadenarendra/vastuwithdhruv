import { Mail, MapPin, Phone } from 'lucide-react'
import EnquiryForm from '../components/EnquiryForm'
import PageHero from '../components/PageHero'
import ScrollReveal from '../components/ScrollReveal'
import SectionHeading from '../components/SectionHeading'
import { siteConfig } from '../data/siteConfig'

const CHANNELS = [
  {
    icon: <Phone size={16} aria-hidden="true" />,
    label: 'Phone',
    value: siteConfig.phone,
    href: `tel:${siteConfig.phoneClean}`,
  },
  {
    icon: <Mail size={16} aria-hidden="true" />,
    label: 'Email',
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: <MapPin size={16} aria-hidden="true" />,
    label: 'Location',
    value: siteConfig.location,
    href: null,
  },
]

export default function Contact() {
  return (
    <main>
      <PageHero
        label="Get in Touch"
        title={
          <>
            We&rsquo;d love to hear
            <br />
            <em className="italic text-gold">from you.</em>
          </>
        }
        subtitle="Whether you have a question about our services or are ready to book — reach out and we'll respond promptly."
      />

      <section className="bg-ivory py-16 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <div className="grid grid-cols-1 gap-10 lg:gap-16 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <SectionHeading label="Enquiry" title="Send a message." />

              <div className="mt-10">
                <EnquiryForm submitLabel="Send Enquiry" />
              </div>
            </div>

            <div className="lg:col-span-2">
              <SectionHeading label="Contact Details" title="Find us." />

              <ScrollReveal delay={0.15}>
                <div className="mt-8 space-y-6">
                  {CHANNELS.map((c) => {
                    const body = (
                      <>
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-gold/40 text-gold transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-navy">
                          {c.icon}
                        </span>
                        <span className="min-w-0">
                          <span className="mb-1 block text-xs uppercase tracking-[0.15em] text-muted">
                            {c.label}
                          </span>
                          <span className="break-words text-navy transition-colors duration-300 group-hover:text-gold">
                            {c.value}
                          </span>
                        </span>
                      </>
                    )

                    return c.href ? (
                      <a
                        key={c.label}
                        href={c.href}
                        className="group flex items-start gap-4"
                      >
                        {body}
                      </a>
                    ) : (
                      <div key={c.label} className="group flex items-start gap-4">
                        {body}
                      </div>
                    )
                  })}
                </div>

                <div className="mt-10 border-l-2 border-gold bg-stone p-6">
                  <h2 className="mb-2 text-sm font-semibold text-navy">Response time</h2>
                  <p className="text-sm leading-relaxed text-muted">
                    We aim to respond to all enquiries within 24 hours on working days. For anything
                    urgent, calling is always fastest.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}