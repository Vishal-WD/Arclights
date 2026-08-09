import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('Footer', () => {
  it('renders the wordmark and tagline', () => {
    render(<Footer />)
    expect(screen.getByText('ARCLIGHTS')).toBeInTheDocument()
    expect(screen.getByText('Automate. Innovate. Elevate.')).toBeInTheDocument()
  })

  it('renders the nav and social links', () => {
    render(<Footer />)
    ;['Work', 'Services', 'About', 'Contact'].forEach((label) => {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument()
    })
    expect(screen.getByRole('link', { name: /linkedin/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument()
  })

  it('renders the copyright line', () => {
    render(<Footer />)
    expect(screen.getByText(/© 2026 Arclights\. All rights reserved\./)).toBeInTheDocument()
  })
})
