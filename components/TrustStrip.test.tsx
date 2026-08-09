import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TrustStrip from './TrustStrip'

describe('TrustStrip', () => {
  it('renders the line and sub-line', () => {
    render(<TrustStrip />)
    expect(screen.getByText('From ideas to working solutions.')).toBeInTheDocument()
    expect(
      screen.getByText('Strategy · Design · Development · Automation · Deployment')
    ).toBeInTheDocument()
  })
})
