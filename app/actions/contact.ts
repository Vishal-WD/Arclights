'use server'

import { Resend } from 'resend'
import { validateContactForm } from './validateContactForm'

export type ContactFormState = {
  status: 'idle' | 'success' | 'error'
  message: string
}

export async function sendContactMessage(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get('name')?.toString().trim() ?? ''
  const email = formData.get('email')?.toString().trim() ?? ''
  const message = formData.get('message')?.toString().trim() ?? ''
  const honeypot = formData.get('website')?.toString().trim() ?? ''

  if (honeypot) {
    console.warn('Contact form honeypot triggered — silently discarding submission.')
    return { status: 'success', message: "Thanks — we'll be in touch soon." }
  }

  const validationError = validateContactForm({ name, email, message })
  if (validationError) {
    return { status: 'error', message: validationError }
  }

  const safeName = name.replace(/[\r\n]/g, ' ')

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)

    const { error } = await resend.emails.send({
      from: 'Arclights Contact Form <onboarding@resend.dev>',
      to: 'arclights.techteam@gmail.com',
      replyTo: email,
      subject: `New project inquiry from ${safeName}`,
      text: `From: ${safeName} <${email}>\n\n${message}`,
    })

    if (error) {
      console.error('Resend rejected contact form email:', error)
      return { status: 'error', message: 'Something went wrong. Please email us directly instead.' }
    }

    return { status: 'success', message: "Thanks — we'll be in touch soon." }
  } catch (error) {
    console.error('Failed to send contact form email:', error)
    return { status: 'error', message: 'Something went wrong. Please email us directly instead.' }
  }
}
