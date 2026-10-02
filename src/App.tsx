import { lazy, Suspense, useEffect, type ReactNode } from 'react'
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import MobileBookingBar from './components/MobileBookingBar'
import CTAButton from './components/CTAButton'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const ServiceDetail = lazy(() => import('./pages/services/ServiceDetail'))
const ScienceOfVastu = lazy(() => import('./pages/ScienceOfVastu'))
const SuccessStories = lazy(() => import('./pages/SuccessStories'))
const Appointment = lazy(() => import('./pages/Appointment'))
const Contact = lazy(() => import('./pages/Contact'))
const PrivacyPolicy = lazy(() => import('./pages/legal/PrivacyPolicy'))
const Terms = lazy(() => import('./pages/legal/Terms'))
const RefundPolicy = lazy(() => import('./pages/legal/RefundPolicy'))

/**
 * Resets scroll on navigation, but honours in-page hash links — jumping to
 * `#services` from the footer should land on the section, not the top.
 * `requestAnimationFrame` waits for the lazy page to render before measuring.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

function PageLoader() {
  return (
    <div
      className="flex min-h-[60vh] items-center justify-center bg-ivory"
      role="status"
      aria-label="Loading page"
    >
      <span className="h-8 w-8 animate-spin rounded-full border border-gold border-t-transparent" />
    </div>
  )
}

function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-ivory">
      <div className="px-6 text-center">
        <span
          className="block text-8xl font-light text-stone-200"
          style={{ fontFamily: 'var(--font-serif)' }}
          aria-hidden="true"
        >
          404
        </span>
        <h1
          className="mt-4 text-3xl text-navy md:text-4xl"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          Page not found
        </h1>
        <p className="mt-3 text-muted">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <CTAButton to="/" variant="primary" showArrow>
            Return Home
          </CTAButton>
          <CTAButton to="/services" variant="secondary">
            Explore Services
          </CTAButton>
        </div>
        <nav
          className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2 border-t border-stone-200 pt-8 text-sm text-muted"
          aria-label="Popular pages"
        >
          {[
            { label: 'About', href: '/about' },
            { label: 'The Science of Vastu', href: '/science-of-vastu' },
            { label: 'Success Stories', href: '/success-stories' },
            { label: 'Contact', href: '/contact' },
          ].map((item) => (
            <Link key={item.href} to={item.href} className="link-underline hover:text-gold">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  )
}

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollManager />
      <Header />
      <Suspense fallback={<PageLoader />}>{children}</Suspense>
      <Footer />
      <MobileBookingBar />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/science-of-vastu" element={<ScienceOfVastu />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}