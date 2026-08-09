// components/ProjectCTA.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProjectCTA from './ProjectCTA'

vi.mock('@/app/actions/contact', () => ({
  sendContactMessage: vi.fn(),
}))

describe('ProjectCTA', () => {
  it('renders the small text, heading, and supporting copy', () => {
    render(<ProjectCTA />)
    expect(screen.getByText('HAVE SOMETHING IN MIND?')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: "Let's turn it into something real." })
    ).toBeInTheDocument()
    expect(screen.getByText(/Whether you're starting with an idea/i)).toBeInTheDocument()
  })

  it('renders the contact form and the direct email fallback', () => {
    render(<ProjectCTA />)
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Message')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
    expect(screen.getByText(/arclights\.techteam@gmail\.com/i)).toBeInTheDocument()
  })

  it('has the #contact anchor id and a dark background', () => {
    const { container } = render(<ProjectCTA />)
    const section = container.querySelector('#contact')
    expect(section).toBeInTheDocument()
    expect(section).toHaveClass('bg-black')
  })
})
