import { siteConfig } from '../data/siteConfig'

export interface Enquiry {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  /** Only set by the appointment form, so enquiries can be told apart. */
  source?: 'contact' | 'appointment';
  /** Prefilled by the booking form's chosen slot. */
  preferredSlot?: string;
}

/**
 * ── The one place to swap when a real backend arrives ──────────────────────────
 *
 * There is no server behind this site today, so enquiries are handed to the
 * visitor's mail client with everything pre-filled. That means the message is
 * genuinely deliverable without any infrastructure, instead of the previous
 * behaviour where `setTimeout` reported success and the enquiry was discarded.
 *
 * To move to a real endpoint, replace the body of `deliver` with a fetch and
 * leave the rest of the file alone:
 *
 *   const res = await fetch('/api/enquiry', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify(enquiry),
 *   })
 *   if (!res.ok) throw new Error(`Enquiry failed: ${res.status}`)
 *
 * The form's loading and error states already key off the promise this returns.
 */
async function deliver(enquiry: Enquiry): Promise<void> {
  const { name, email, phone, service, message } = enquiry
  const preferredSlot = enquiry.preferredSlot

  const serviceLabel =
    service === 'other' ? 'General Enquiry' : service.charAt(0).toUpperCase() + service.slice(1)

  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    `Service: ${serviceLabel}`,
    preferredSlot ? `Preferred slot: ${preferredSlot}` : null,
    '',
    'Message:',
    message,
    '',
    '— Sent from the Vastu with Dhruv website',
  ]
    .filter(Boolean)
    .join('\n')

  const subject = `Vastu enquiry — ${serviceLabel}${preferredSlot ? ` (${preferredSlot})` : ''}`

  const href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  // `location.href` rather than window.open — popup blockers kill window.open
  // on user-initiated async continuations, which is exactly where this runs.
  window.location.href = href
}

/**
 * Submits an enquiry. Resolves once the mail client has been handed off.
 * Rejects if the visitor's environment refuses to open a mailto: link.
 */
export async function submitEnquiry(enquiry: Enquiry): Promise<void> {
  await deliver(enquiry)
}

/** Formats a chosen date + time slot into a readable string. */
export function formatSlot(date: Date, time: string): string {
  return `${date.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })} at ${time}`
}