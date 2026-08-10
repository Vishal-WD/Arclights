import { describe, it, expect, vi, beforeEach } from 'vitest'
import { sendContactMessage } from './contact'

const mockSend = vi.fn()
vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: { send: mockSend },
  })),
}))

function buildFormData(fields: Record<string, string>) {
  const formData = new FormData()
  Object.entries(fields).forEach(([key, value]) => formData.set(key, value))
  return formData
}

describe('sendContactMessage', () => {
  beforeEach(() => {
    mockSend.mockReset()
  })

  it('returns an error state without calling Resend when validation fails', async () => {
    mockSend.mockResolvedValue({ data: null, error: null })
    const result = await sendContactMessage(
      { status: 'idle', message: '' },
      buildFormData({ name: '', email: 'a@b.com', message: 'hi' })
    )
    expect(result.status).toBe('error')
    expect(mockSend).not.toHaveBeenCalled()
  })

  it('returns success and calls Resend with the right recipient when Resend succeeds', async () => {
    mockSend.mockResolvedValue({ data: { id: 'test-id' }, error: null })
    const result = await sendContactMessage(
      { status: 'idle', message: '' },
      buildFormData({ name: 'Jane', email: 'jane@example.com', message: 'Hello' })
    )
    expect(result.status).toBe('success')
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({ to: 'arclights.techteam@gmail.com', replyTo: 'jane@example.com' })
    )
  })

  it('returns an error state (not success) when Resend returns an error object instead of throwing', async () => {
    mockSend.mockResolvedValue({ data: null, error: { message: 'Sandbox restriction', name: 'validation_error' } })
    const result = await sendContactMessage(
      { status: 'idle', message: '' },
      buildFormData({ name: 'Jane', email: 'jane@example.com', message: 'Hello' })
    )
    expect(result.status).toBe('error')
  })

  it('returns an error state when the Resend call throws (network failure)', async () => {
    mockSend.mockRejectedValue(new Error('network down'))
    const result = await sendContactMessage(
      { status: 'idle', message: '' },
      buildFormData({ name: 'Jane', email: 'jane@example.com', message: 'Hello' })
    )
    expect(result.status).toBe('error')
  })

  it('returns a success-looking state without calling Resend when the honeypot field is filled', async () => {
    mockSend.mockResolvedValue({ data: { id: 'test-id' }, error: null })
    const result = await sendContactMessage(
      { status: 'idle', message: '' },
      buildFormData({ name: 'Bot', email: 'bot@example.com', message: 'spam', website: 'http://spam.example' })
    )
    expect(result.status).toBe('success')
    expect(mockSend).not.toHaveBeenCalled()
  })
})
