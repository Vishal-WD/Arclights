import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Capabilities from './Capabilities'

describe('Capabilities', () => {
  it('renders the section label and heading', () => {
    render(<Capabilities />)
    expect(screen.getByText('CAPABILITIES')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'The technology behind the work.' })
    ).toBeInTheDocument()
  })

  it('renders all four category groups with their items', () => {
    render(<Capabilities />)
    expect(screen.getByText('Development')).toBeInTheDocument()
    expect(screen.getByText('Cloud-ready Architecture')).toBeInTheDocument()
    expect(screen.getByText('Automation')).toBeInTheDocument()
    expect(screen.getByText('Data Pipelines')).toBeInTheDocument()
    expect(screen.getByText('Artificial Intelligence')).toBeInTheDocument()
    expect(screen.getByText('Agentic Workflows')).toBeInTheDocument()
    expect(screen.getByText('Data')).toBeInTheDocument()
    expect(screen.getByText('Data Engineering')).toBeInTheDocument()
  })

  it('renders the closing line', () => {
    render(<Capabilities />)
    expect(screen.getByText('We choose technologies based on the problem — not the trend.')).toBeInTheDocument()
  })
})
