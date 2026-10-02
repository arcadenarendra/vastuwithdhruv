import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Calendar, Check, Mail, MapPin, Phone } from 'lucide-react'
import CTAButton from '../components/CTAButton'
import EnquiryForm from '../components/EnquiryForm'
import PageHero from '../components/PageHero'
import ScrollReveal from '../components/ScrollReveal'
import SectionHeading from '../components/SectionHeading'
import { serviceLinks, siteConfig } from '../data/siteConfig'
import { formatSlot } from '../lib/submitEnquiry'

const SLOTS = ['10:00 AM', '12:00 PM', '3:00 PM', '5:00 PM', '7:00 PM']

const PREPARATION = [
  'Floor plan of your property, if available',
  'Which direction is North for the plot',
  'Photos of the space from each side',
  'The key concerns or goals you want to address',
]

const STEPS = ['Choose a service', 'Pick a slot', 'Your details'] as const

/** Today, as a date at midnight — the earliest bookable day. */
function today(): Date {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

/** Next `count` days starting tomorrow, so today can never be half-elapsed. */
function upcomingDays(count: number): Date[] {
  const start = today()
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(start)
    d.setDate(d.getDate() + i + 1)
    return d
  })
}

export default function Appointment() {
  const days = useMemo(() => upcomingDays(14), [])
  const [step, setStep] = useState(0)
  const [service, setService] = useState('')
  const [date, setDate] = useState<Date | null>(null)
  const [time, setTime] = useState('')

  const slotLabel = date && time ? formatSlot(date, time) : ''

  const canContinue = step === 0 ? Boolean(service) : Boolean(date && time)

  const next = () => {
    if (!canContinue) return
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }
  const back = () => setStep((s) => Math.max(s - 1, 0))

  return (
    <main>
      <PageHero
        label="Book a Consultation"
        title={
          <>
            Let&rsquo;s understand
            <br />
            <em className="italic text-gold">your space.</em>
          </>
        }
        subtitle="Book a consultation with Dhruv Dave — a focused, personalized assessment of your space, goals, and concerns."
      />

      <section className="bg-ivory py-16 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <div className="grid grid-cols-1 gap-10 lg:gap-16 lg:grid-cols-5">
            {/* Booking flow */}
            <div className="lg:col-span-3">
              <SectionHeading label="Schedule" title="Choose your appointment." />

              {/* Progress */}
              <ol className="mt-10 flex items-center gap-2" aria-label="Booking progress">
                {STEPS.map((label, i) => {
                  const done = i < step
                  const current = i === step
                  return (
                    <li key={label} className="flex flex-1 flex-col gap-2">
                      <span
                        className={`h-0.5 w-full origin-left transition-colors duration-500 ${
                          done || current ? 'bg-gold' : 'bg-stone-300'
                        }`}
                      />
                      <span
                        className={`text-[10px] uppercase tracking-[0.15em] transition-colors duration-300 ${
                          current ? 'text-gold' : done ? 'text-muted' : 'text-muted/40'
                        }`}
                      >
                        {done && <Check size={10} className="mr-1 inline" aria-hidden="true" />}
                        {label}
                      </span>
                    </li>
                  )
                })}
              </ol>

              <div className="mt-10">
                <AnimatePresence mode="wait">
                  {/* Step 1 — service */}
                  {step === 0 && (
                    <motion.div
                      key="step-0"
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <fieldset>
                        <legend className="mb-4 text-sm text-muted">
                          What would you like help with?
                        </legend>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {serviceLinks.map((s) => (
                            <label
                              key={s.id}
                              className={`group flex cursor-pointer items-center gap-3 border p-4 transition-all duration-300 ${
                                service === s.id
                                  ? 'border-gold bg-gold/5'
                                  : 'border-stone-200 hover:border-gold/40'
                              }`}
                            >
                              <input
                                type="radio"
                                name="service"
                                value={s.id}
                                checked={service === s.id}
                                onChange={() => setService(s.id)}
                                className="peer sr-only"
                              />
                              <span
                                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors ${
                                  service === s.id ? 'border-gold' : 'border-stone-300'
                                }`}
                                aria-hidden="true"
                              >
                                <span
                                  className={`h-2 w-2 rounded-full transition-transform ${
                                    service === s.id ? 'scale-100 bg-gold' : 'scale-0'
                                  }`}
                                />
                              </span>
                              <span className="text-sm text-navy">{s.label}</span>
                            </label>
                          ))}
                        </div>
                      </fieldset>
                    </motion.div>
                  )}

                  {/* Step 2 — date and time */}
                  {step === 1 && (
                    <motion.div
                      key="step-1"
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="space-y-8"
                    >
                      <fieldset>
                        <legend className="mb-4 flex items-center gap-2 text-sm text-muted">
                          <Calendar size={14} className="text-gold" aria-hidden="true" />
                          Preferred date — the next two weeks
                        </legend>
                        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                          {days.map((d) => {
                            const isSelected = date?.toDateString() === d.toDateString()
                            return (
                              <label
                                key={d.toISOString()}
                                className={`cursor-pointer border px-2 py-3 text-center transition-all duration-200 ${
                                  isSelected
                                    ? 'border-gold bg-gold text-navy'
                                    : 'border-stone-200 text-muted hover:border-gold/40 hover:text-gold'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="date"
                                  value={d.toISOString()}
                                  checked={isSelected}
                                  onChange={() => {
                                    setDate(d)
                                    setTime('')
                                  }}
                                  className="sr-only"
                                />
                                <span className="block text-[10px] uppercase tracking-[0.15em] opacity-70">
                                  {d.toLocaleDateString('en-IN', { weekday: 'short' })}
                                </span>
                                <span className="mt-1 block text-lg" style={{ fontFamily: 'var(--font-serif)' }}>
                                  {d.getDate()}
                                </span>
                              </label>
                            )
                          })}
                        </div>
                      </fieldset>

                      <fieldset disabled={!date}>
                        <legend className="mb-4 text-sm text-muted">
                          {date ? 'Preferred time' : 'Pick a date first'}
                        </legend>
                        <div
                          className={`flex flex-wrap gap-2 transition-opacity ${
                            date ? 'opacity-100' : 'pointer-events-none opacity-40'
                          }`}
                        >
                          {SLOTS.map((t) => (
                            <label
                              key={t}
                              className={`cursor-pointer border px-5 py-2.5 text-sm transition-all duration-200 ${
                                time === t
                                  ? 'border-gold bg-gold text-navy'
                                  : 'border-stone-200 text-muted hover:border-gold/40 hover:text-gold'
                              }`}
                            >
                              <input
                                type="radio"
                                name="time"
                                value={t}
                                checked={time === t}
                                onChange={() => setTime(t)}
                                className="sr-only"
                              />
                              {t}
                            </label>
                          ))}
                        </div>
                      </fieldset>
                    </motion.div>
                  )}

                  {/* Step 3 — details */}
                  {step === 2 && (
                    <motion.div
                      key="step-2"
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="mb-8 border border-gold/30 bg-gold/5 p-5">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <p className="text-xs uppercase tracking-[0.15em] text-gold">
                              Your selection
                            </p>
                            <p className="mt-1 text-navy" style={{ fontFamily: 'var(--font-serif)' }}>
                              {serviceLinks.find((s) => s.id === service)?.label}
                            </p>
                            <p className="mt-0.5 text-sm text-muted">{slotLabel}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setStep(0)}
                            className="link-underline text-xs uppercase tracking-[0.15em] text-muted hover:text-gold"
                          >
                            Change
                          </button>
                        </div>
                      </div>

                      <EnquiryForm
                        initialService={service}
                        submitLabel="Request This Appointment"
                        source="appointment"
                      >
                        <p className="text-sm leading-relaxed text-muted">
                          Add anything that will help Dhruv prepare — the direction of North, the
                          concerns you're hoping to resolve, or questions you'd like answered.
                        </p>
                      </EnquiryForm>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Step controls — hidden once the details form takes over. */}
                {step < 2 && (
                  <div className="mt-10 flex items-center gap-3 border-t border-stone-200 pt-8">
                    {step > 0 && (
                      <button
                        type="button"
                        onClick={back}
                        className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-muted transition-colors hover:text-gold"
                      >
                        <ArrowLeft
                          size={14}
                          className="transition-transform duration-300 group-hover:-translate-x-1"
                          aria-hidden="true"
                        />
                        Back
                      </button>
                    )}

                    <CTAButton
                      onClick={next}
                      variant="primary"
                      showArrow
                      disabled={!canContinue}
                      className="ml-auto"
                    >
                      Continue
                    </CTAButton>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-2">
              <SectionHeading label="Direct Contact" title="Reach out directly." />

              <ScrollReveal delay={0.15}>
                <p className="mt-6 leading-relaxed text-muted">
                  Prefer to talk it through first? Call or email Dhruv to discuss your space and
                  find a time that works for you.
                </p>

                <div className="mt-8 space-y-4">
                  {[
                    {
                      icon: <Phone size={16} aria-hidden="true" />,
                      label: 'Call',
                      value: siteConfig.phone,
                      href: `tel:${siteConfig.phoneClean}`,
                    },
                    {
                      icon: <Mail size={16} aria-hidden="true" />,
                      label: 'Email',
                      value: siteConfig.email,
                      href: `mailto:${siteConfig.email}`,
                    },
                  ].map((c) => (
                    <a
                      key={c.label}
                      href={c.href}
                      className="group flex items-center gap-4 border border-stone-200 p-5 transition-all duration-300 hover:border-gold/40"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-gold/40 text-gold transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-navy">
                        {c.icon}
                      </span>
                      <span className="min-w-0">
                        <span className="mb-0.5 block text-xs uppercase tracking-[0.15em] text-muted">
                          {c.label}
                        </span>
                        <span className="block break-words font-medium text-navy transition-colors duration-300 group-hover:text-gold">
                          {c.value}
                        </span>
                      </span>
                    </a>
                  ))}

                  <div className="flex items-center gap-4 border border-stone-200 p-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-gold/40 text-gold">
                      <MapPin size={16} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="mb-0.5 block text-xs uppercase tracking-[0.15em] text-muted">
                        Location
                      </span>
                      <span className="block text-navy">{siteConfig.location}</span>
                    </span>
                  </div>
                </div>

                <div className="mt-8 border-l-2 border-gold bg-stone p-6">
                  <h2 className="mb-3 text-sm font-semibold text-navy">What to prepare</h2>
                  <ul className="space-y-2 text-sm text-muted">
                    {PREPARATION.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-2 h-px w-3 shrink-0 bg-gold" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}