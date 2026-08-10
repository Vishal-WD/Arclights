// components/TeamPreview.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TeamPreview from './TeamPreview'

describe('TeamPreview', () => {
  it('renders the heading and both team members with their roles', () => {
    render(<TeamPreview />)
    expect(screen.getByRole('heading', { name: 'The People Behind Arclights' })).toBeInTheDocument()
    expect(screen.getByText('Vishal')).toBeInTheDocument()
    expect(screen.getByText('Development · Software · Technology')).toBeInTheDocument()
    expect(screen.getByText('Dharanyaa')).toBeInTheDocument()
    expect(screen.getByText('Software · QA · Automation')).toBeInTheDocument()
  })

  it('does not mention founder degrees', () => {
    render(<TeamPreview />)
    expect(screen.queryByText(/MCA/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/B\.Tech/i)).not.toBeInTheDocument()
  })
})
