import { useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'
import CTAButton from './CTAButton'
import { serviceLinks } from '../data/siteConfig'
import { submitEnquiry, type Enquiry } from '../lib/submitEnquiry'
import { ENQUIRY_FIELDS, validateEnquiry, type EnquiryErrors } from '../lib/validation'

const EMPTY: Enquiry = { name: '', email: '', phone: '', service: '', message: '' }

const LABEL = 'block text-xs font-bold tracking-[0.15em] uppercase text-muted'

interface FieldProps {
  label: string;
  name: keyof Enquiry;
  error?: string;
  required?: boolean;
  hint?: string;
  className?: string;
  /** Supplies the control, pre-wired with its id and ARIA attributes. */
  children: (props: {
    id: string;
    name: string;
    'aria-invalid': boolean;
    'aria-describedby'?: string;
  }) => ReactNode;
}

/**
 * Wraps a control with its label, error text and an `aria-describedby` link
 * back to it. Inputs stay borderless until they are focused or invalid — the
 * error state is a red hairline, not a red box.
 */
function Field({ label, name, error, required, hint, className = '', children }: FieldProps) {
  const id = useId()
  const messageId = `${id}-msg`
  const hasError = Boolean(error)

  return (
    <div className={className}>
      <label htmlFor={id} className={LABEL}>
        {label}
        {required && <span className="ml-1 text-gold">*</span>}
      </label>

      <div className="relative mt-2">
        {children({
          id,
          name,
          'aria-invalid': hasError,
          'aria-describedby': hasError || hint ? messageId : undefined,
        })}
      </div>

      <AnimatePresence initial={false}>
        {hasError ? (
          <motion.p
            id={messageId}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="mt-2 flex items-center gap-1.5 text-xs text-red-600"
          >
            <AlertCircle size={12} aria-hidden="true" />
            {error}
          </motion.p>
        ) : hint ? (
          <p id={messageId} className="mt-2 text-xs text-muted/70">
            {hint}
          </p>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

interface EnquiryFormProps {
  /** Prefills the service picker — the appointment flow sets this. */
  initialService?: string;
  /** Extra rows rendered above the fields, e.g. the booking summary. */
  children?: ReactNode;
  submitLabel?: string;
  source?: Enquiry['source'];
}

/**
 * Shared enquiry form used by both /contact and /appointment.
 *
 * Validates on submit, re-validates a field once it has been touched, moves
 * focus to the first invalid input, and hands the completed enquiry to
 * `submitEnquiry`. Errors render inline rather than as a single banner so the
 * visitor can see what needs fixing without hunting.
 */
export default function EnquiryForm({
  initialService = '',
  children,
  submitLabel = 'Send Enquiry',
  source = 'contact',
}: EnquiryFormProps) {
  const [values, setValues] = useState<Enquiry>({ ...EMPTY, service: initialService })
  const [errors, setErrors] = useState<EnquiryErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof Enquiry, boolean>>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle')
  const [formError, setFormError] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  const set = (name: keyof Enquiry, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }))
    // Re-validate live only after the field has been visited once, so the form
    // doesn't shout at someone who is still filling in the field above.
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateEnquiry({ ...values, [name]: value })[name] }))
    }
  }

  const blur = (name: keyof Enquiry) => {
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors((prev) => ({ ...prev, [name]: validateEnquiry(values)[name] }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('idle')
    setFormError('')

    const found = validateEnquiry(values)
    setErrors(found)
    setTouched(() => {
      const next: Partial<Record<keyof Enquiry, boolean>> = {}
      for (const field of ENQUIRY_FIELDS) next[field] = true
      return next
    })

    const firstInvalid = ENQUIRY_FIELDS.find((f) => found[f])
    if (firstInvalid) {
      // Focus the first problem so keyboard and screen-reader users land on it.
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)
        ?.focus({ preventScroll: false })
      return
    }

    setStatus('submitting')
    try {
      await submitEnquiry({ ...values, source })
    } catch {
      setStatus('error')
      setFormError(
        'Your email app did not open. Please email us directly and we will get back to you shortly.',
      )
    }
  }

  /** Errors only surface once a field has been visited, so the form never
   *  opens pre-filled with red. */
  const showError = (name: keyof Enquiry) => Boolean(touched[name] && errors[name])

  const controlClass = (name: keyof Enquiry) =>
    `w-full border-b bg-transparent py-3 text-sm text-navy outline-none transition-colors placeholder:text-muted/50 focus:border-gold ${
      showError(name) ? 'border-red-400' : 'border-stone-300'
    }`.trim()

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6 md:gap-8" noValidate>
      {children}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        <Field label="Name" name="name" required error={showError('name') ? errors.name : undefined}>
          {(p) => (
            <input
              {...p}
              type="text"
              autoComplete="name"
              placeholder="Your full name"
              value={values.name}
              onChange={(e) => set('name', e.target.value)}
              onBlur={() => blur('name')}
              className={controlClass('name')}
            />
          )}
        </Field>

        <Field label="Email" name="email" required error={showError('email') ? errors.email : undefined}>
          {(p) => (
            <input
              {...p}
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={values.email}
              onChange={(e) => set('email', e.target.value)}
              onBlur={() => blur('email')}
              className={controlClass('email')}
            />
          )}
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        <Field label="Phone" name="phone" error={showError('phone') ? errors.phone : undefined} hint="Optional">
          {(p) => (
            <input
              {...p}
              type="tel"
              autoComplete="tel"
              placeholder="+91 00000 00000"
              value={values.phone}
              onChange={(e) => set('phone', e.target.value)}
              onBlur={() => blur('phone')}
              className={controlClass('phone')}
            />
          )}
        </Field>

        <Field label="Service" name="service" required error={showError('service') ? errors.service : undefined}>
          {(p) => (
            <select
              {...p}
              value={values.service}
              onChange={(e) => set('service', e.target.value)}
              onBlur={() => blur('service')}
              className={`${controlClass('service')} cursor-pointer`}
            >
              <option value="">Select a service</option>
              {serviceLinks.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
              <option value="other">General Enquiry</option>
            </select>
          )}
        </Field>
      </div>

      <Field label="Message" name="message" required error={showError('message') ? errors.message : undefined}>
        {(p) => (
          <textarea
            {...p}
            rows={5}
            placeholder="Tell us about your space and what you're looking to achieve…"
            value={values.message}
            onChange={(e) => set('message', e.target.value)}
            onBlur={() => blur('message')}
            className={`${controlClass('message')} resize-none`}
          />
        )}
      </Field>

      <AnimatePresence>
        {formError && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            role="alert"
            className="flex items-start gap-2 border-l-2 border-red-400 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
            {formError}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap items-center gap-4">
        <CTAButton type="submit" variant="primary" showArrow disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Opening your email…' : submitLabel}
        </CTAButton>
        <p className="text-xs text-muted/70">
          Opens your email app with the details filled in — nothing is stored on this site.
        </p>
      </div>
    </form>
  )
}