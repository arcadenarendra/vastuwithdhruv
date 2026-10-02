import LegalPage, { DraftNotice } from './LegalPage'
import { siteConfig } from '../../data/siteConfig'

export default function PrivacyPolicy() {
  return (
    <LegalPage title="Privacy Policy" meta="How we handle the information you share with us.">
      <DraftNotice>
        This policy will be replaced with a complete, professionally drafted document before the
        website is publicly launched. The content below is a placeholder outline.
      </DraftNotice>

      <h2>Information we collect</h2>
      <p>
        When you submit an enquiry through our contact or booking form, we collect the information
        you provide — including your name, email address, phone number, and any details about your
        space or consultation requirements.
      </p>
      <p>
        <strong>What happens to form submissions.</strong> This website has no server and no
        database. Submitting a form opens your own email application with the details pre-filled and
        sends nothing to us automatically. Whatever you send is then handled entirely through your
        email provider.
      </p>

      <h2>How we use your information</h2>
      <p>
        We use the information collected to respond to your enquiry, schedule and conduct
        consultations, and follow up in relation to services you have requested. We do not sell or
        share your personal information with third parties for marketing purposes.
      </p>

      <h2>Data storage</h2>
      <p>
        Information submitted through our forms is handled securely through your email provider.
        We retain consultation-related records for the purpose of providing ongoing support.
      </p>

      <h2>Your rights</h2>
      <p>
        You may request access to, correction of, or deletion of personal information we hold about
        you by contacting us directly using the details on our contact page.
      </p>

      <h2>Contact</h2>
      <p>
        For any privacy-related questions, please contact us at{' '}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
      </p>
    </LegalPage>
  )
}