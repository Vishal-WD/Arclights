import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import WhatWeDo from './WhatWeDo'

describe('WhatWeDo', () => {
  it('renders the section label and heading', () => {
    render(<WhatWeDo />)
    expect(screen.getByText('WHAT WE DO')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Technology built around real problems.' })
    ).toBeInTheDocument()
  })

  it('renders all four service cards with their titles and labels', () => {
    render(<WhatWeDo />)
    expect(screen.getByRole('heading', { name: /01 — Software Development/ })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /02 — Automation/ })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /03 — AI Solutions/ })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /04 — Digital Solutions/ })).toBeInTheDocument()
    expect(screen.getByText('Web Applications')).toBeInTheDocument()
    expect(screen.getByText('RAG Systems')).toBeInTheDocument()
  })

  it('has the #services anchor id for the navbar Services link', () => {
    const { container } = render(<WhatWeDo />)
    expect(container.querySelector('#services')).toBeInTheDocument()
  })
})
