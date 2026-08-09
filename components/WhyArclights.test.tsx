import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import WhyArclights from './WhyArclights'

describe('WhyArclights', () => {
  it('renders the section label and heading', () => {
    render(<WhyArclights />)
    expect(screen.getByText('WHY ARCLIGHTS')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Less complexity. More clarity.' })).toBeInTheDocument()
  })

  it('renders all four principles', () => {
    render(<WhyArclights />)
    expect(screen.getByText('Practical by Design')).toBeInTheDocument()
    expect(screen.getByText('Built Around You')).toBeInTheDocument()
    expect(screen.getByText('Clear Communication')).toBeInTheDocument()
    expect(screen.getByText('Built to Improve')).toBeInTheDocument()
  })
})
