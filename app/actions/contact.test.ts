// app/actions/contact.test.ts
import { describe, it, expect } from 'vitest'
import { validateContactForm } from './contact'

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
})
