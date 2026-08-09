import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Navbar from './Navbar'

describe('Navbar', () => {
  it('renders the six primary nav links', () => {
    render(<Navbar />)
    ;['Home', 'Services', 'Work', 'Process', 'About', 'Contact'].forEach((label) => {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument()
    })
  })

  it('renders the Start a Project CTA', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: /start a project/i })).toBeInTheDocument()
  })

  it('does not render extra nav items beyond the fixed six', () => {
    render(<Navbar />)
    const forbidden = ['Careers', 'Blog', 'Products', 'Resources', 'Case Studies', 'Industries']
    forbidden.forEach((label) => {
      expect(screen.queryByRole('link', { name: label })).not.toBeInTheDocument()
    })
  })

  it('mobile menu is closed by default and opens on toggle click', async () => {
    const user = userEvent.setup()
    render(<Navbar />)
    expect(screen.getByTestId('mobile-nav')).toHaveClass('hidden')
    await user.click(screen.getByRole('button', { name: /open menu/i }))
    expect(screen.getByTestId('mobile-nav')).not.toHaveClass('hidden')
    expect(screen.getByRole('button', { name: /close menu/i })).toBeInTheDocument()
  })
})
