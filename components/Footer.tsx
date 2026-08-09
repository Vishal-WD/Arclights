import Image from 'next/image'
import { ASSETS } from '@/lib/assets'

const FOOTER_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="bg-black px-6 py-16 text-dark-body">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-3">
          <Image src={ASSETS.logoDark} alt="Arclights" width={40} height={40} className="rounded" />
          <div>
            <p className="text-sm font-semibold tracking-label text-dark-heading">ARCLIGHTS</p>
            <p className="mt-1 text-xs text-dark-body">Automate. Innovate. Elevate.</p>
          </div>
        </div>

        <nav className="flex flex-wrap gap-6 text-sm">
          {FOOTER_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="transition hover:text-dark-gold">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex gap-6 text-sm">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-dark-gold"
          >
            LinkedIn ↗
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-dark-gold"
          >
            GitHub ↗
          </a>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-2 border-t border-dark-border pt-6 text-xs">
        <p>© 2026 Arclights. All rights reserved.</p>
        <p className="text-dark-body/70">Built with purpose.</p>
      </div>
    </footer>
  )
}
