// components/Hero.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hero from './Hero'

describe('Hero', () => {
  it('renders the eyebrow, headline, and supporting copy', () => {
    render(<Hero />)
    expect(screen.getByText('SOFTWARE • AUTOMATION • AI • DIGITAL SOLUTIONS')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 1, name: /we turn ideas into technology that works\s*\./i })
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Arclights designs and builds practical software/i)
    ).toBeInTheDocument()
  })

  it('renders both CTAs', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: /start a project/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /explore our work/i })).toBeInTheDocument()
  })

  it('renders the Automate | Innovate | Elevate line', () => {
    render(<Hero />)
    expect(screen.getByText(/automate/i)).toBeInTheDocument()
    expect(screen.getByText(/innovate/i)).toBeInTheDocument()
    expect(screen.getByText(/elevate/i)).toBeInTheDocument()
  })

  it('has the #top anchor id for the navbar Home link', () => {
    const { container } = render(<Hero />)
    expect(container.querySelector('#top')).toBeInTheDocument()
  })
})
