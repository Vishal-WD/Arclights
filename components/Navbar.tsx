'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ASSETS } from '@/lib/assets'

const NAV_LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-ivory/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2">
          <Image src={ASSETS.logoLight} alt="Arclights" width={36} height={36} className="rounded" />
          <span className="text-sm font-semibold tracking-label">ARCLIGHTS</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-graphite/80 transition hover:text-gold"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden rounded-lg bg-graphite px-5 py-2.5 text-sm font-medium text-ivory transition hover:bg-gold hover:text-graphite md:inline-block"
        >
          Start a Project →
        </a>

        <button
          type="button"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setIsOpen((open) => !open)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border md:hidden"
        >
          <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
          <div className="space-y-1">
            <span className="block h-0.5 w-5 bg-graphite" />
            <span className="block h-0.5 w-5 bg-graphite" />
          </div>
        </button>
      </div>

      <nav
        data-testid="mobile-nav"
        aria-hidden={!isOpen}
        className={`${isOpen ? 'flex' : 'hidden'} flex-col gap-4 border-t border-border px-6 py-4 md:hidden`}
      >
        {NAV_LINKS.map((link) => (
          <a key={link.label} href={link.href} className="text-sm text-graphite/80" onClick={() => setIsOpen(false)}>
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setIsOpen(false)}
          className="rounded-lg bg-graphite px-5 py-2.5 text-center text-sm font-medium text-ivory"
        >
          Start a Project →
        </a>
      </nav>
    </header>
  )
}
