// app/actions/validateContactForm.test.ts
import { describe, it, expect } from 'vitest'
import { validateContactForm } from './validateContactForm'

describe('validateContactForm', () => {
  it('returns an error when any field is empty', () => {
    expect(validateContactForm({ name: '', email: 'a@b.com', message: 'hi' })).toBe(
      'Please fill in every field.'
    )
    expect(validateContactForm({ name: 'A', email: '', message: 'hi' })).toBe(
      'Please fill in every field.'
    )
    expect(validateContactForm({ name: 'A', email: 'a@b.com', message: '' })).toBe(
      'Please fill in every field.'
    )
  })

  it('returns an error for an invalid email address', () => {
    expect(validateContactForm({ name: 'A', email: 'not-an-email', message: 'hi' })).toBe(
      'Please enter a valid email address.'
    )
  })

  it('returns null when all fields are valid', () => {
    expect(validateContactForm({ name: 'A', email: 'a@b.com', message: 'hi' })).toBeNull()
  })

  it('returns an error when the name exceeds 100 characters', () => {
    expect(
      validateContactForm({ name: 'A'.repeat(101), email: 'a@b.com', message: 'hi' })
    ).toBe('Please keep your name under 100 characters.')
  })

  it('accepts a name at exactly 100 characters', () => {
    expect(
      validateContactForm({ name: 'A'.repeat(100), email: 'a@b.com', message: 'hi' })
    ).toBeNull()
  })

  it('returns an error when the email exceeds 254 characters', () => {
    const longEmail = `${'a'.repeat(250)}@b.com`
    expect(
      validateContactForm({ name: 'A', email: longEmail, message: 'hi' })
    ).toBe('Please keep your email under 254 characters.')
  })

  it('returns an error when the message exceeds 5000 characters', () => {
    expect(
      validateContactForm({ name: 'A', email: 'a@b.com', message: 'x'.repeat(5001) })
    ).toBe('Please keep your message under 5000 characters.')
  })

  it('accepts a message at exactly 5000 characters', () => {
    expect(
      validateContactForm({ name: 'A', email: 'a@b.com', message: 'x'.repeat(5000) })
    ).toBeNull()
  })
})
