// components/ContactForm.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from './ContactForm'
import { sendContactMessage } from '@/app/actions/contact'

vi.mock('@/app/actions/contact', () => ({
  sendContactMessage: vi.fn(),
}))

describe('ContactForm', () => {
  it('renders name, email, and message fields with a submit button', () => {
    render(<ContactForm />)
    expect(screen.getByLabelText('Name')).toBeRequired()
    expect(screen.getByLabelText('Email')).toBeRequired()
    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email')
    expect(screen.getByLabelText('Message')).toBeRequired()
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('shows the success message returned by the server action after submitting', async () => {
    vi.mocked(sendContactMessage).mockResolvedValue({
      status: 'success',
      message: "Thanks — we'll be in touch soon.",
    })
    const user = userEvent.setup()
    render(<ContactForm />)

    await user.type(screen.getByLabelText('Name'), 'Jane Doe')
    await user.type(screen.getByLabelText('Email'), 'jane@example.com')
    await user.type(screen.getByLabelText('Message'), 'Hello there')
    await user.click(screen.getByRole('button', { name: /send message/i }))

    expect(await screen.findByRole('status')).toHaveTextContent("Thanks — we'll be in touch soon.")
  })
})
