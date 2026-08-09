import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import HowWeWork from './HowWeWork'

describe('HowWeWork', () => {
  it('renders the section label and heading', () => {
    render(<HowWeWork />)
    expect(screen.getByText('HOW WE WORK')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'From problem to product.' })).toBeInTheDocument()
  })

  it('renders all six process steps in order', () => {
    render(<HowWeWork />)
    const steps = screen.getAllByRole('heading', { level: 3 })
    expect(steps.map((s) => s.textContent)).toEqual([
      'Understand',
      'Plan',
      'Build',
      'Test',
      'Launch',
      'Improve',
    ])
  })

  it('has the #process anchor id for the navbar Process link', () => {
    const { container } = render(<HowWeWork />)
    expect(container.querySelector('#process')).toBeInTheDocument()
  })
})
