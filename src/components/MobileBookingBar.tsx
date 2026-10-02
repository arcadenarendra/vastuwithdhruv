import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Calendar } from 'lucide-react'

/** Paths where a persistent "book" bar would be redundant. */
const HIDDEN_ON = ['/appointment', '/contact']

export default function MobileBookingBar() {
  const { pathname } = useLocation()
  const [pastFold, setPastFold] = useState(false)

  // Hold the bar back until the visitor has actually started reading, so it
  // doesn't compete with the hero CTA on first paint.
  useEffect(() => {
    const onScroll = () => setPastFold(window.scrollY > 320)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (HIDDEN_ON.includes(pathname)) return null

  return (
    <AnimatePresence>
      {pastFold && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-navy/95 backdrop-blur-md md:hidden"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <Link
            to="/appointment"
            className="flex items-center justify-center gap-2.5 bg-gold py-3.5 text-sm font-bold uppercase tracking-[0.15em] text-navy transition-colors active:bg-gold-light"
            aria-label="Book a consultation"
          >
            <Calendar size={16} aria-hidden="true" />
            Book Consultation
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}