import type { Enquiry } from './submitEnquiry'

export type EnquiryErrors = Partial<Record<keyof Enquiry, string | undefined>>

/**
 * Client-side validation for the enquiry forms.
 *
 * Rejects the common typo cases rather than demanding a perfect RFC 5322
 * address: a single `@`, no whitespace, and a dot in the domain. Anything
 * stricter starts rejecting valid addresses, and the mail client is the real
 * verifier anyway.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Accepts spaces, dashes, brackets and a leading + — rejects letters. */
const PHONE_RE = /^[+]?[\d\s()-]{7,20}$/

export function validateEnquiry(enquiry: Enquiry): EnquiryErrors {
  const errors: EnquiryErrors = {}

  const name = enquiry.name.trim()
  if (!name) errors.name = 'Please tell us your name.'
  else if (name.length < 2) errors.name = 'That name looks too short.'

  const email = enquiry.email.trim()
  if (!email) errors.email = 'We need an email to reply to.'
  else if (!EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address.'

  if (enquiry.phone.trim() && !PHONE_RE.test(enquiry.phone.trim())) {
    errors.phone = 'Please enter a valid phone number.'
  }

  if (!enquiry.service) errors.service = 'Please choose a service.'

  const message = enquiry.message.trim()
  if (!message) errors.message = 'Tell us a little about your space.'
  else if (message.length < 10) errors.message = 'A sentence or two more would help.'

  return errors
}

/** Field order, used to walk to and announce the first invalid input. */
export const ENQUIRY_FIELDS: (keyof Enquiry)[] = ['name', 'email', 'phone', 'service', 'message']