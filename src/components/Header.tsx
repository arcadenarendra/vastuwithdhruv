import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { ChevronDown, Mail, Menu, Phone, X } from 'lucide-react'
import { isActiveRoute, serviceLinks, siteConfig } from '../data/siteConfig'
import CTAButton from './CTAButton'

/** Services link plus the four pages under it. */
const servicesActive = (pathname: string) => isActiveRoute(pathname, '/services')

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const location = useLocation()

  const dropdownRef = useRef<HTMLDivElement>(null)
  const mobileToggleRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)

  // Spring-smoothed so the progress hairline glides rather than ticking once
  // per scroll event.
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 180, damping: 30, mass: 0.4 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Any navigation closes both overlays.
  useEffect(() => {
    setMenuOpen(false)
    setServicesOpen(false)
  }, [location])

  // Escape closes the dropdown from anywhere.
  useEffect(() => {
    if (!servicesOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setServicesOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [servicesOpen])

  // A click outside the dropdown closes it. Needs a `pointerdown` listener
  // because a React `onBlur` on the parent fires when focus moves *between*
  // children of the dropdown, which would close it mid-interaction.
  useEffect(() => {
    if (!servicesOpen) return
    const onPointerDown = (e: PointerEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setServicesOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [servicesOpen])

  // The mobile drawer is a modal surface: lock the page behind it, and pull
  // focus back to the toggle when it closes.
  useEffect(() => {
    if (!menuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        return
      }
      if (e.key !== 'Tab') return
      // Trap Tab inside the drawer.
      const focusables = drawerRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      )
      if (!focusables?.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKey)
      mobileToggleRef.current?.focus()
    }
  }, [menuOpen])

  const headerBg = scrolled
    ? 'bg-navy/90 backdrop-blur-md shadow-[0_8px_32px_-12px_rgba(15,23,42,0.6)]'
    : 'bg-navy'

  return (
    <>
      {/* Utility bar */}
      <div className="hidden border-b border-white/10 bg-navy md:block">
        <div className="mx-auto flex max-w-[1280px] items-center justify-end gap-6 px-10 py-2">
          <a
            href={`tel:${siteConfig.phoneClean}`}
            className="flex items-center gap-2 text-xs text-white/60 transition-colors hover:text-gold"
          >
            <Phone size={12} aria-hidden="true" />
            {siteConfig.phone}
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-2 text-xs text-white/60 transition-colors hover:text-gold"
          >
            <Mail size={12} aria-hidden="true" />
            {siteConfig.email}
          </a>
        </div>
      </div>

      {/* Main nav */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${headerBg}`}
        onMouseLeave={() => setServicesOpen(false)}
      >
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4 md:px-10">
          <Link to="/" className="group flex flex-col leading-tight" aria-label="Vastu with Dhruv — home">
            <span className="text-xs font-light uppercase tracking-[0.25em] text-gold">
              Vastu with
            </span>
            <span
              className="text-xl font-semibold uppercase tracking-[0.12em] text-white transition-opacity duration-300 group-hover:opacity-80"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Dhruv
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {siteConfig.nav.map((item) =>
              item.label === 'Services' ? (
                <div
                  key={item.href}
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                >
                  <button
                    type="button"
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                    onClick={() => setServicesOpen((v) => !v)}
                    className={`flex items-center gap-1 font-sans text-sm uppercase tracking-wide transition-colors hover:text-gold ${
                      servicesActive(location.pathname) ? 'text-gold' : 'text-white/80'
                    }`}
                  >
                    {item.label}
                    <motion.span
                      animate={{ rotate: servicesOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-gold"
                    >
                      <ChevronDown size={12} aria-hidden="true" />
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute left-0 top-full mt-3 w-60 border border-white/10 bg-navy shadow-2xl"
                      >
                        {/* Bridge the gap so the pointer can cross into the panel
                            without leaving the trigger and closing it. */}
                        <div className="absolute -top-3 h-3 w-full" aria-hidden="true" />
                        {serviceLinks.map((s) => (
                          <Link
                            key={s.href}
                            to={s.href}
                            className="group/item relative block border-b border-white/5 px-5 py-3 text-sm text-white/70 transition-colors last:border-0 hover:text-gold hover:bg-white/5"
                          >
                            <span
                              className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-gold transition-transform duration-300 group-hover/item:scale-y-100"
                              aria-hidden="true"
                            />
                            {s.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.href}
                  to={item.href}
                  aria-current={isActiveRoute(location.pathname, item.href) ? 'page' : undefined}
                  className={`link-underline font-sans text-sm uppercase tracking-wide transition-colors hover:text-gold ${
                    isActiveRoute(location.pathname, item.href) ? 'text-gold' : 'text-white/80'
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-4">
            <CTAButton
              to="/appointment"
              variant="primary"
              className="!hidden px-6 py-3 text-xs lg:!inline-flex"
            >
              Book Appointment
            </CTAButton>
            <button
              ref={mobileToggleRef}
              onClick={() => setMenuOpen((v) => !v)}
              className="p-1 text-white lg:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-drawer"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Reading progress */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-gold/40 via-gold to-gold/40"
          style={{ scaleX: smoothProgress }}
          aria-hidden="true"
        />

        {/* Mobile drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-drawer"
              ref={drawerRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-white/10 bg-navy lg:hidden"
            >
              <nav className="flex flex-col gap-1 px-6 py-6" aria-label="Mobile">
                {siteConfig.nav.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    aria-current={isActiveRoute(location.pathname, item.href) ? 'page' : undefined}
                    className={`border-b border-white/5 py-3 text-sm uppercase tracking-[0.15em] transition-colors hover:text-gold ${
                      isActiveRoute(location.pathname, item.href) ? 'text-gold' : 'text-white/80'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="pb-1 pl-4 pt-2">
                  {serviceLinks.map((s) => (
                    <Link
                      key={s.href}
                      to={s.href}
                      className="block py-2 text-xs uppercase tracking-[0.15em] text-white/50 transition-colors hover:text-gold"
                    >
                      — {s.label}
                    </Link>
                  ))}
                </div>

                <div className="pt-4">
                  <CTAButton
                    to="/appointment"
                    variant="primary"
                    className="w-full justify-center"
                  >
                    Book Appointment
                  </CTAButton>
                </div>

                <div className="flex flex-col gap-2 pt-4">
                  <a
                    href={`tel:${siteConfig.phoneClean}`}
                    className="text-xs text-white/40 transition-colors hover:text-gold"
                  >
                    {siteConfig.phone}
                  </a>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-xs text-white/40 transition-colors hover:text-gold"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}