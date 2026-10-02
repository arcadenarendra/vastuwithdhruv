/**
 * Single source of truth for everything brand-level: contact details, nav,
 * and the service list that the header dropdown, footer, contact form and
 * services page all render.
 *
 * Previously the four service links were copy-pasted into Header, Footer and the
 * contact form — three places to update when a service was added or renamed.
 */

export interface ServiceLink {
  label: string
  shortLabel: string
  href: string;
  /** Machine-readable id, matches `services.ts` and the form's `<option>` value. */
  id: string;
}

export const serviceLinks: ServiceLink[] = [
  {
    id: 'residential',
    label: 'Residential Vastu',
    shortLabel: 'Residential',
    href: '/services/residential-vastu',
  },
  {
    id: 'business',
    label: 'Business Vastu',
    shortLabel: 'Business',
    href: '/services/business-vastu',
  },
  {
    id: 'corporate',
    label: 'Corporate & Industrial',
    shortLabel: 'Corporate & Industrial',
    href: '/services/corporate-industrial-vastu',
  },
  {
    id: 'land',
    label: 'Land Selection',
    shortLabel: 'Land Selection',
    href: '/services/land-selection',
  },
]

export const siteConfig = {
  name: 'Vastu with Dhruv',
  founder: 'Dhruv Dave',
  tagline: 'Align your space. Transform your life.',
  description:
    'Personalized Vastu consulting for homes, businesses, corporate spaces and land selection with Dhruv Dave in Ahmedabad.',
  location: 'Ahmedabad, Gujarat, India',
  phone: '+91 9227 122 242',
  phoneClean: '+919227122242',
  email: 'vastuwithdhruv@gmail.com',
  copyright: `© ${new Date().getFullYear()}`,
  creditName: 'Narendra Prajapati',
  creditUrl: 'https://get-narendra.vercel.app/',

  nav: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    // 'Services' is rendered as a dropdown in Header; this entry only drives
    // the mobile drawer and the footer link.
    { label: 'Services', href: '/services' },
    { label: 'The Science of Vastu', href: '/science-of-vastu' },
    { label: 'Success Stories', href: '/success-stories' },
    { label: 'Contact', href: '/contact' },
  ],
} satisfies {
  name: string;
  founder: string;
  tagline: string;
  description: string;
  location: string;
  phone: string;
  phoneClean: string;
  email: string;
  copyright: string;
  creditName: string;
  creditUrl: string;
  nav: readonly { label: string; href: string }[];
}

/** True when `href` is the current route or a section nested under it. */
export function isActiveRoute(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}