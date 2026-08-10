'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { sendContactMessage, type ContactFormState } from '@/app/actions/contact'

const initialState: ContactFormState = { status: 'idle', message: '' }

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-dark-gold px-6 py-3 text-sm font-medium text-black transition hover:bg-dark-silver disabled:opacity-60"
    >
      {pending ? 'Sending…' : 'Send Message'}
    </button>
  )
}

export default function ContactForm() {
  const [state, formAction] = useFormState(sendContactMessage, initialState)

  return (
    <form action={formAction} className="mt-10 flex flex-col gap-4 text-left">
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div>
        <label htmlFor="contact-name" className="text-xs tracking-label text-dark-body">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          className="mt-1 w-full rounded-lg border border-dark-border bg-dark-surface px-4 py-2.5 text-sm text-dark-heading"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="text-xs tracking-label text-dark-body">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-lg border border-dark-border bg-dark-surface px-4 py-2.5 text-sm text-dark-heading"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="text-xs tracking-label text-dark-body">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          className="mt-1 w-full rounded-lg border border-dark-border bg-dark-surface px-4 py-2.5 text-sm text-dark-heading"
        />
      </div>
      <SubmitButton />
      <p
        role="status"
        className={
          state.status === 'success'
            ? 'text-sm text-dark-gold'
            : state.status === 'error'
              ? 'text-sm text-red-400'
              : 'sr-only'
        }
      >
        {state.message}
      </p>
    </form>
  )
}
