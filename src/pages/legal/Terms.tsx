import LegalPage, { DraftNotice } from './LegalPage'
import { siteConfig } from '../../data/siteConfig'

export default function Terms() {
  return (
    <LegalPage title="Terms of Service" meta="The terms that apply to using this website and our services.">
      <DraftNotice>
        These terms will be replaced with a complete, professionally drafted document before the
        website is publicly launched. The content below is a placeholder outline.
      </DraftNotice>

      <h2>Services</h2>
      <p>
        Vastu with Dhruv provides Vastu Shastra consultation services for residential, business,
        corporate, industrial, and land-selection purposes. Consultation services are advisory in
        nature and are based on traditional Vastu Shastra principles.
      </p>

      <h2>No guarantee of outcomes</h2>
      <p>
        Vastu consultation represents a traditional advisory practice. We do not guarantee specific
        results — financial, health-related, or otherwise — from implementing Vastu
        recommendations. Clients engage with the service voluntarily and apply recommendations at
        their own discretion.
      </p>

      <h2>Booking and payment</h2>
      <p>
        Booking terms, payment requirements, and cancellation policies will be detailed here.
        Please contact us directly for current booking information.
      </p>

      <h2>Intellectual property</h2>
      <p>
        All content on this website — including text, design elements, and consultation reports — is
        the property of Vastu with Dhruv and may not be reproduced without permission.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws applicable in Ahmedabad, Gujarat, India.</p>

      <h2>Contact</h2>
      <p>
        For questions about these terms, contact{' '}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
      </p>
    </LegalPage>
  )
}