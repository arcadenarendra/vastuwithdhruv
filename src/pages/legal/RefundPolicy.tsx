import LegalPage, { DraftNotice } from './LegalPage'
import { siteConfig } from '../../data/siteConfig'

export default function RefundPolicy() {
  return (
    <LegalPage title="Refund Policy" meta="The terms behind our money-back guarantee.">
      <DraftNotice>
        This policy will be replaced with a complete, professionally drafted document before the
        website is publicly launched. The content below is a placeholder outline.
      </DraftNotice>

      <h2>Money-back guarantee</h2>
      <p>
        Vastu with Dhruv advertises a 100% money-back guarantee subject to the terms described in
        this policy. The guarantee does not imply unconditional refund eligibility in all
        circumstances.
      </p>

      <h2>Eligibility</h2>
      <p>Refund eligibility is determined on a case-by-case basis. To be eligible for consideration, you must:</p>
      <ul>
        <li>Submit a refund request within the applicable time period following your consultation.</li>
        <li>Provide a clear explanation of your dissatisfaction.</li>
        <li>Have fully engaged with the consultation process as delivered.</li>
      </ul>

      <h2>Non-refundable circumstances</h2>
      <p>
        Refunds will not be provided in circumstances including but not limited to: dissatisfaction
        with the outcome of implementing Vastu recommendations, failure to implement
        recommendations, or requests submitted outside the applicable timeframe. Specific exclusions
        will be detailed in the final policy.
      </p>

      <h2>Process</h2>
      <p>
        To request a refund, contact us at{' '}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> with your consultation details
        and the reason for the request. We will review it and respond within a reasonable timeframe.
      </p>

      <h2>Important notice</h2>
      <p>
        The money-back guarantee mentioned on this website is subject to these terms and does not
        constitute an unconditional guarantee of results or an unlimited refund commitment. Please
        read this policy carefully before booking.
      </p>
    </LegalPage>
  )
}