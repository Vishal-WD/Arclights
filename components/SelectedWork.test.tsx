// components/SelectedWork.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SelectedWork from './SelectedWork'

describe('SelectedWork', () => {
  it('renders the section label and heading', () => {
    render(<SelectedWork />)
    expect(screen.getByText('SELECTED WORK')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: "Things we've built." })).toBeInTheDocument()
  })

  it('renders all three project cards in pinned order with GitHub links', () => {
    render(<SelectedWork />)
    const headings = screen.getAllByRole('heading', { level: 3 })
    expect(headings.map((h) => h.textContent)).toEqual(['Campus Connect', 'VisionSense', 'AquaSense AI'])

    expect(
      screen.getByRole('link', { name: /aquasense ai — github/i })
    ).toHaveAttribute('href', 'https://github.com/Vishal-WD/AquaSense')
  })

  it('renders the AquaSense AI live demo link but not for Campus Connect or VisionSense', () => {
    render(<SelectedWork />)
    expect(
      screen.getByRole('link', { name: /aquasense ai — live demo/i })
    ).toHaveAttribute('href', 'https://aqua-sense-three.vercel.app')
    expect(screen.queryByRole('link', { name: /campus connect — live demo/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /visionsense — live demo/i })).not.toBeInTheDocument()
  })

  it('has the #work anchor id for the navbar Work link', () => {
    const { container } = render(<SelectedWork />)
    expect(container.querySelector('#work')).toBeInTheDocument()
  })
})
