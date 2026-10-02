import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp, Mail, MapPin, Phone } from 'lucide-react'
import { serviceLinks, siteConfig } from '../data/siteConfig'

const NAV_LINKS = siteConfig.nav.filter((item) => item.label !== 'The Science of Vastu')

const navLink =
  'group/nav inline-flex w-fit items-center gap-2 text-sm text-white/50 transition-colors hover:text-gold'
const navArrow =
  'h-px w-0 bg-gold transition-all duration-300 group-hover/nav:w-4'

export default function Footer() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <footer className="relative bg-navy text-white">
      {/* Pre-footer CTA */}
      <div className="relative overflow-hidden border-t border-white/10">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(ellipse at 50% 120%, #D4AF37 0%, transparent 60%)',
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-[1280px] px-6 py-16 text-center md:px-10 md:py-32">
          <span className="section-label">Begin Your Journey</span>
          <h2
            className="mt-4 text-4xl leading-tight text-white md:text-5xl lg:text-6xl"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Let your space
            <br />
            <em className="text-gold italic">work with you.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/60">
            Book a consultation and discover how Vastu principles can be thoughtfully applied to
            your home, workplace, or property.
          </p>
          <div className="mt-10">
            <Link
              to="/appointment"
              className="group/cta inline-flex items-center gap-2 bg-gold px-6 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-navy transition-all duration-300 hover:bg-gold-light hover:shadow-[0_10px_30px_-10px_rgba(212,175,55,0.7)]"
            >
              Book Your Appointment
              <ArrowUp
                size={14}
                className="-rotate-90 transition-transform duration-300 group-hover/cta:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer grid */}
      <div className="border-t border-white/10">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 px-6 py-12 md:grid-cols-2 md:gap-12 md:px-10 md:py-16 lg:grid-cols-4">
          <div>
            <div className="mb-4">
              <span className="block text-xs uppercase tracking-[0.25em] text-gold">Vastu with</span>
              <span
                className="text-2xl uppercase tracking-[0.12em] text-white"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Dhruv
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-white/50">
              Ancient wisdom. Modern spaces. Personalized consultation.
            </p>
            <span className="gold-divider mt-6 block" aria-hidden="true" />
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="mb-6 text-xs uppercase tracking-[0.2em] text-gold">Navigation</h2>
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((item) => (
                <Link key={item.href} to={item.href} className={navLink}>
                  <span className={navArrow} aria-hidden="true" />
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <nav aria-label="Services">
            <h2 className="mb-6 text-xs uppercase tracking-[0.2em] text-gold">Services</h2>
            <div className="flex flex-col gap-3">
              {serviceLinks.map((s) => (
                <Link key={s.href} to={s.href} className={navLink}>
                  <span className={navArrow} aria-hidden="true" />
                  {s.label}
                </Link>
              ))}
            </div>
          </nav>

          <div>
            <h2 className="mb-6 text-xs uppercase tracking-[0.2em] text-gold">Contact</h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin size={14} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                <span className="text-sm text-white/50">{siteConfig.location}</span>
              </div>
              <a
                href={`tel:${siteConfig.phoneClean}`}
                className="group/c flex items-start gap-3 text-sm text-white/50 transition-colors hover:text-gold"
              >
                <Phone
                  size={14}
                  className="mt-0.5 shrink-0 text-gold transition-transform duration-300 group-hover/c:rotate-12"
                  aria-hidden="true"
                />
                {siteConfig.phone}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="group/c flex items-start gap-3 break-all text-sm text-white/50 transition-colors hover:text-gold"
              >
                <Mail
                  size={14}
                  className="mt-0.5 shrink-0 text-gold transition-transform duration-300 group-hover/c:-translate-y-0.5 group-hover/c:translate-x-0.5"
                  aria-hidden="true"
                />
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row md:px-10">
          <p className="text-xs text-white/30">
            {siteConfig.copyright}{' '}
            <a
              href={siteConfig.creditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline hover:text-gold"
            >
              @{siteConfig.creditName}
            </a>
          </p>
          <nav className="flex items-center gap-6" aria-label="Legal">
            {[
              { label: 'Privacy Policy', href: '/privacy-policy' },
              { label: 'Terms', href: '/terms' },
              { label: 'Refund Policy', href: '/refund-policy' },
            ].map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="link-underline text-xs text-white/30 hover:text-gold"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-24 right-5 z-40 flex h-11 w-11 items-center justify-center border border-gold/40 bg-navy/90 text-gold backdrop-blur transition-colors hover:bg-gold hover:text-navy md:bottom-8 md:right-8"
            aria-label="Back to top"
          >
            <ArrowUp size={18} aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  )
}