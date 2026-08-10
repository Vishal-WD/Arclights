import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import AboutPreview from './AboutPreview'

describe('AboutPreview', () => {
  it('renders the section label, heading, and copy', () => {
    render(<AboutPreview />)
    expect(screen.getByText('ABOUT ARCLIGHTS')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Small team. Serious about what we build.' })
    ).toBeInTheDocument()
    expect(screen.getByText(/Arclights was started by two people/i)).toBeInTheDocument()
    expect(screen.getByText('Built to solve. Ready to grow.')).toBeInTheDocument()
  })

  it('renders the Our Story CTA', () => {
    render(<AboutPreview />)
    expect(screen.getByRole('link', { name: /our story/i })).toBeInTheDocument()
  })

  it('does not mention founder degrees', () => {
    render(<AboutPreview />)
    expect(screen.queryByText(/MCA/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/B\.Tech/i)).not.toBeInTheDocument()
  })

  it('has the #about anchor id for the navbar About link', () => {
    const { container } = render(<AboutPreview />)
    expect(container.querySelector('#about')).toBeInTheDocument()
  })
})
