'use server'

import { Resend } from 'resend'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type ContactFormState = {
  status: 'idle' | 'success' | 'error'
  message: string
}

export function validateContactForm(data: { name: string; email: string; message: string }): string | null {
  if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
    return 'Please fill in every field.'
  }
  if (!EMAIL_PATTERN.test(data.email.trim())) {
    return 'Please enter a valid email address.'
  }
  return null
}

export async function sendContactMessage(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get('name')?.toString().trim() ?? ''
  const email = formData.get('email')?.toString().trim() ?? ''
  const message = formData.get('message')?.toString().trim() ?? ''

  const validationError = validateContactForm({ name, email, message })
  if (validationError) {
    return { status: 'error', message: validationError }
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    await resend.emails.send({
      from: 'Arclights Contact Form <onboarding@resend.dev>',
      to: 'arclights.techteam@gmail.com',
      replyTo: email,
      subject: `New project inquiry from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    })
    return { status: 'success', message: "Thanks — we'll be in touch soon." }
  } catch {
    return { status: 'error', message: 'Something went wrong. Please email us directly instead.' }
  }
}
