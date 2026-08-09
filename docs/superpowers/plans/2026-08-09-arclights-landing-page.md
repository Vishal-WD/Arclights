# Arclights Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Arclights marketing landing page (12 sections, splash intro, navbar, footer) exactly per `CLAUDE.md`, as a Next.js + Tailwind + Framer Motion site.

**Architecture:** Next.js App Router single-page site. Each of the 12 CLAUDE.md sections is its own component in `components/`, composed in order in `app/page.tsx`. A client-side `SplashIntro` gates the page behind the one-time intro video on first visit per session. Content (project cards, service cards, process steps) is inlined as typed constants at the top of the component that owns it — no shared content layer, since nothing is reused across components.

**Tech Stack:** Next.js 14+ (App Router, TypeScript), Tailwind CSS 3+, Framer Motion 11+, Manrope via `next/font/google`, Vitest + React Testing Library for component tests.

## Global Constraints

- Copy for every section is finalized brand copy from `CLAUDE.md` — reproduce it verbatim, do not paraphrase.
- Do not add fake client logos, fake statistics, or testimonials (CLAUDE.md §3, §7).
- Do not surface founder degrees (MCA / B.Tech CSE) anywhere on this page (CLAUDE.md §10).
- Do not add nav items beyond `Home, Services, Work, Process, About, Contact` (CLAUDE.md §Navbar).
- Landing page closing line is **"Built to solve. Ready to grow."** — never "We're Just Getting Started" (CLAUDE.md, Content Rule).
- Color tokens, never raw hex in component files — use the Tailwind theme keys defined in Task 1 (`ivory`, `surface`, `graphite`, `black`, `gold`, `gold-soft`, `silver`, `muted`, `border`, `dark-surface`, `dark-heading`, `dark-body`, `dark-gold`, `dark-silver`, `dark-border`).
- Color usage ratio target: ~70% ivory/light neutral, ~20% graphite/black, ~7% gold, ~3% silver/gradient (CLAUDE.md, Color Usage Ratio). Gold is an accent, never a background fill.
- Buttons: 8–12px radius, never pill-shaped (`rounded-lg` / `rounded-xl`, never `rounded-full`) (CLAUDE.md, Buttons).
- Heading font is Manrope everywhere, loaded via `next/font/google` (self-hosted, no render-blocking `<link>`).
- Splash intro (`Arclights-intro.mp4`) plays once per `sessionStorage`, is skippable after ~1s, and is skipped entirely when `prefers-reduced-motion: reduce` is set (CLAUDE.md, Splash Intro).
- Every animation (arc motion, marquee, splash) must respect `prefers-reduced-motion` — check via Framer Motion's `useReducedMotion()` or `window.matchMedia`.
- Node package manager: npm (lockfile `package-lock.json`).
- Contact form (Task 15) delivers to `arclights.techteam@gmail.com` via Resend — reproduce this address exactly. The real `RESEND_API_KEY` lives only in `.env.local` (gitignored); never write it into any tracked file, the plan, or commit messages.

---

## Task 1: Project Scaffold & Tooling

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.mjs`
- Create: `tailwind.config.ts`
- Create: `postcss.config.mjs`
- Create: `.eslintrc.json`
- Create: `.gitignore`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/globals.css`

**Interfaces:**
- Produces: Tailwind theme color tokens (`ivory`, `surface`, `graphite`, `black`, `gold`, `gold-soft`, `silver`, `muted`, `border`, `dark-surface`, `dark-heading`, `dark-body`, `dark-gold`, `dark-silver`, `dark-border`) and `font-sans` (Manrope), available to every later task via Tailwind utility classes.
- Produces: `npm test`, `npm run build`, `npm run dev`, `npm run lint` scripts, used by every later task's verification step.

- [ ] **Step 1: Initialize git and Node project**

```bash
cd "d:\Arclights"
git init
```

- [ ] **Step 2: Write `package.json`**

```json
{
  "name": "arclights-landing",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run"
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "framer-motion": "^11.2.0"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "@types/node": "^20.12.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0",
    "vitest": "^1.6.0",
    "@vitejs/plugin-react": "^4.2.0",
    "jsdom": "^24.0.0",
    "@testing-library/react": "^15.0.0",
    "@testing-library/jest-dom": "^6.4.0",
    "@testing-library/user-event": "^14.5.0"
  }
}
```

- [ ] **Step 3: Write `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Write `next.config.mjs`**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {}

export default nextConfig
```

- [ ] **Step 5: Write `tailwind.config.ts`**

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F8F6F1',
        surface: '#FFFFFF',
        graphite: '#171922',
        black: '#080808',
        gold: '#C99A54',
        'gold-soft': '#E6C892',
        silver: '#B8BBC1',
        muted: '#686A71',
        border: '#E8E4DC',
        'dark-surface': '#111216',
        'dark-heading': '#F7F5F0',
        'dark-body': '#A8A8AA',
        'dark-gold': '#D0A05A',
        'dark-silver': '#C4C5C8',
        'dark-border': '#24252A',
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        label: '0.16em',
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 6: Write `postcss.config.mjs`**

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 7: Write `.eslintrc.json`**

```json
{
  "extends": "next/core-web-vitals"
}
```

- [ ] **Step 8: Write `.gitignore`**

```
node_modules
.next
out
.env*.local
*.tsbuildinfo
next-env.d.ts
coverage
```

- [ ] **Step 9: Write `vitest.config.ts`**

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
})
```

- [ ] **Step 10: Write `vitest.setup.ts`**

```typescript
import '@testing-library/jest-dom/vitest'
```

- [ ] **Step 11: Write minimal `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  @apply bg-ivory text-graphite font-sans;
}
```

- [ ] **Step 12: Write minimal `app/layout.tsx` (placeholder, replaced in Task 3)**

```tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Arclights',
  description: 'Automate. Innovate. Elevate.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 13: Write minimal `app/page.tsx` (placeholder, replaced in Task 17)**

```tsx
export default function Home() {
  return <main>Arclights</main>
}
```

- [ ] **Step 14: Install dependencies**

Run: `npm install`
Expected: installs without errors, creates `package-lock.json` and `node_modules/`.

- [ ] **Step 15: Verify build**

Run: `npm run build`
Expected: succeeds, prints a route summary including `/`.

- [ ] **Step 16: Commit**

```bash
git add package.json package-lock.json tsconfig.json next.config.mjs tailwind.config.ts postcss.config.mjs .eslintrc.json .gitignore vitest.config.ts vitest.setup.ts app
git commit -m "chore: scaffold Next.js + Tailwind + Vitest project"
```

---

## Task 2: Brand Assets Pipeline

**Files:**
- Create: `public/logo-light.jpg`
- Create: `public/logo-dark.jpg`
- Create: `public/intro.mp4`
- Create: `lib/assets.ts`
- Test: `lib/assets.test.ts`

**Interfaces:**
- Consumes: source files `Assets/Archlights-logo.jpeg`, `Assets/Arclights-dark-logo.jpeg`, `Assets/Arclights-intro.mp4`.
- Produces: `ASSETS` constant (`{ logoLight: string, logoDark: string, introVideo: string }`) — imported by `Navbar` (Task 5), `Footer` (Task 16), and `SplashIntro` (Task 4).

**Known limitation (documented, not a placeholder):** the source JPEGs have baked-in backgrounds (ivory for the light logo, near-black for the dark logo) rather than transparency. `logo-light.jpg` is only used on ivory-background contexts (navbar, hero) and `logo-dark.jpg` only on black-background contexts (footer, CTA) so the baked background blends. True transparent/vector logos should replace these in a follow-up design pass; that re-export is a manual design-tool task outside this plan's automatable scope.

- [ ] **Step 1: Write the failing test**

```typescript
// lib/assets.test.ts
import { describe, it, expect } from 'vitest'
import { existsSync } from 'fs'
import path from 'path'
import { ASSETS } from './assets'

describe('ASSETS', () => {
  it('points to the three brand asset paths', () => {
    expect(ASSETS).toEqual({
      logoLight: '/logo-light.jpg',
      logoDark: '/logo-dark.jpg',
      introVideo: '/intro.mp4',
    })
  })

  it('every asset path resolves to a real file in public/', () => {
    Object.values(ASSETS).forEach((assetPath) => {
      const fullPath = path.join(process.cwd(), 'public', assetPath)
      expect(existsSync(fullPath)).toBe(true)
    })
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- lib/assets.test.ts`
Expected: FAIL with "Cannot find module './assets'" (file doesn't exist yet).

- [ ] **Step 3: Copy source assets into `public/`**

```bash
mkdir -p "d:\Arclights\public"
cp "d:\Arclights\Assets\Archlights-logo.jpeg" "d:\Arclights\public\logo-light.jpg"
cp "d:\Arclights\Assets\Arclights-dark-logo.jpeg" "d:\Arclights\public\logo-dark.jpg"
cp "d:\Arclights\Assets\Arclights-intro.mp4" "d:\Arclights\public\intro.mp4"
```

- [ ] **Step 4: Write `lib/assets.ts`**

```typescript
export const ASSETS = {
  logoLight: '/logo-light.jpg',
  logoDark: '/logo-dark.jpg',
  introVideo: '/intro.mp4',
} as const
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test -- lib/assets.test.ts`
Expected: PASS (2 tests)

- [ ] **Step 6: Commit**

```bash
git add public/logo-light.jpg public/logo-dark.jpg public/intro.mp4 lib/assets.ts lib/assets.test.ts
git commit -m "feat: wire brand assets into public/ with typed paths"
```

---

## Task 3: Root Layout, Fonts & Metadata

**Files:**
- Modify: `app/layout.tsx`

**Interfaces:**
- Produces: `font-sans` CSS variable (`--font-manrope`) applied globally, consumed implicitly by every component via Tailwind's `font-sans`.

No automated test for this task — Next.js App Router root layouts render `<html>`/`<body>`, which cannot be mounted inside jsdom's own `<html>`/`<body>` via React Testing Library. Verification is `npm run build` plus a manual dev-server check.

- [ ] **Step 1: Replace `app/layout.tsx` with full font + metadata setup**

```tsx
import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Arclights — Automate. Innovate. Elevate.',
  description:
    'Arclights designs and builds practical software, intelligent automation, and digital solutions that help businesses work smarter, move faster, and grow with confidence.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 3: Manual check**

Run: `npm run dev`, open `http://localhost:3000` in a browser. Confirm the page background is ivory (`#F8F6F1`) and any visible text renders in Manrope (not a system serif/sans fallback).

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: load Manrope font and set page metadata"
```

---

## Task 4: SplashIntro Component

**Files:**
- Create: `components/SplashIntro.tsx`
- Test: `components/SplashIntro.test.tsx`

**Interfaces:**
- Consumes: `ASSETS.introVideo` from `lib/assets.ts` (Task 2).
- Produces: `SplashIntro` component with props `{ onDone: () => void }`. `onDone` is called exactly once, either synchronously-after-mount (reduced motion / already seen) or when the video ends / is skipped. Consumed by `app/page.tsx` (Task 17).

- [ ] **Step 1: Write the failing test**

```tsx
// components/SplashIntro.test.tsx
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SplashIntro from './SplashIntro'

function mockMatchMedia(reducedMotion: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: reducedMotion && query.includes('prefers-reduced-motion'),
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })) as unknown as typeof window.matchMedia
}

beforeEach(() => {
  sessionStorage.clear()
  window.HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue(undefined)
})

describe('SplashIntro', () => {
  it('skips immediately and calls onDone when prefers-reduced-motion is set', () => {
    mockMatchMedia(true)
    const onDone = vi.fn()
    render(<SplashIntro onDone={onDone} />)
    expect(onDone).toHaveBeenCalledTimes(1)
    expect(screen.queryByTestId('splash-video')).not.toBeInTheDocument()
  })

  it('skips immediately and calls onDone when already seen this session', () => {
    mockMatchMedia(false)
    sessionStorage.setItem('arclights-splash-seen', '1')
    const onDone = vi.fn()
    render(<SplashIntro onDone={onDone} />)
    expect(onDone).toHaveBeenCalledTimes(1)
    expect(screen.queryByTestId('splash-video')).not.toBeInTheDocument()
  })

  it('plays the intro video on first visit and calls onDone when it ends', () => {
    mockMatchMedia(false)
    const onDone = vi.fn()
    render(<SplashIntro onDone={onDone} />)
    const video = screen.getByTestId('splash-video')
    expect(video).toBeInTheDocument()
    fireEvent.ended(video)
    expect(onDone).toHaveBeenCalledTimes(1)
    expect(sessionStorage.getItem('arclights-splash-seen')).toBe('1')
  })

  it('shows a skip button after 1s that calls onDone when clicked', () => {
    mockMatchMedia(false)
    vi.useFakeTimers()
    const onDone = vi.fn()
    render(<SplashIntro onDone={onDone} />)
    expect(screen.queryByRole('button', { name: /skip/i })).not.toBeInTheDocument()
    vi.advanceTimersByTime(1100)
    fireEvent.click(screen.getByRole('button', { name: /skip/i }))
    expect(onDone).toHaveBeenCalledTimes(1)
    vi.useRealTimers()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- components/SplashIntro.test.tsx`
Expected: FAIL with "Cannot find module './SplashIntro'"

- [ ] **Step 3: Write `components/SplashIntro.tsx`**

```tsx
'use client'

import { useEffect, useState } from 'react'
import { ASSETS } from '@/lib/assets'

const SPLASH_KEY = 'arclights-splash-seen'

export default function SplashIntro({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<'checking' | 'playing' | 'skippable'>('checking')

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const alreadySeen = sessionStorage.getItem(SPLASH_KEY) === '1'

    if (reducedMotion || alreadySeen) {
      sessionStorage.setItem(SPLASH_KEY, '1')
      onDone()
      return
    }

    setPhase('playing')
    const timer = setTimeout(() => setPhase('skippable'), 1000)
    return () => clearTimeout(timer)
  }, [onDone])

  function finish() {
    sessionStorage.setItem(SPLASH_KEY, '1')
    onDone()
  }

  if (phase === 'checking') return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ivory">
      <video
        data-testid="splash-video"
        className="h-full w-full object-cover"
        src={ASSETS.introVideo}
        autoPlay
        muted
        playsInline
        onEnded={finish}
      />
      {phase === 'skippable' && (
        <button
          type="button"
          onClick={finish}
          className="absolute bottom-8 right-8 rounded-lg border border-graphite/20 bg-ivory/80 px-4 py-2 text-sm tracking-wide text-graphite/70 backdrop-blur transition hover:border-gold hover:text-gold"
        >
          Skip
        </button>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- components/SplashIntro.test.tsx`
Expected: PASS (4 tests)

- [ ] **Step 5: Commit**

```bash
git add components/SplashIntro.tsx components/SplashIntro.test.tsx
git commit -m "feat: add one-time splash intro gated by session and reduced-motion"
```

---

## Task 5: Navbar Component

**Files:**
- Create: `components/Navbar.tsx`
- Test: `components/Navbar.test.tsx`

**Interfaces:**
- Consumes: `ASSETS.logoLight` from `lib/assets.ts` (Task 2).
- Produces: `Navbar` component (no props). Anchors to section ids `#services`, `#work`, `#process`, `#about`, `#contact` — these ids must exist on `WhatWeDo` (Task 8), `SelectedWork` (Task 9), `HowWeWork` (Task 11), `AboutPreview` (Task 13), `ProjectCTA` (Task 15) respectively.

- [ ] **Step 1: Write the failing test**

```tsx
// components/Navbar.test.tsx
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- components/Navbar.test.tsx`
Expected: FAIL with "Cannot find module './Navbar'"

- [ ] **Step 3: Write `components/Navbar.tsx`**

```tsx
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- components/Navbar.test.tsx`
Expected: PASS (4 tests)

- [ ] **Step 5: Commit**

```bash
git add components/Navbar.tsx components/Navbar.test.tsx
git commit -m "feat: add navbar with mobile menu toggle"
```

---

## Task 6: Hero Section

**Files:**
- Create: `components/Hero.tsx`
- Test: `components/Hero.test.tsx`

**Interfaces:**
- Produces: `Hero` component (no props), renders section with `id="top"` (the navbar's `Home` link target from Task 5).

- [ ] **Step 1: Write the failing test**

```tsx
// components/Hero.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hero from './Hero'

describe('Hero', () => {
  it('renders the eyebrow, headline, and supporting copy', () => {
    render(<Hero />)
    expect(screen.getByText('SOFTWARE • AUTOMATION • AI • DIGITAL SOLUTIONS')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 1, name: /we turn ideas into technology that works\./i })
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Arclights designs and builds practical software/i)
    ).toBeInTheDocument()
  })

  it('renders both CTAs', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: /start a project/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /explore our work/i })).toBeInTheDocument()
  })

  it('renders the Automate | Innovate | Elevate line', () => {
    render(<Hero />)
    expect(screen.getByText(/automate/i)).toBeInTheDocument()
    expect(screen.getByText(/innovate/i)).toBeInTheDocument()
    expect(screen.getByText(/elevate/i)).toBeInTheDocument()
  })

  it('has the #top anchor id for the navbar Home link', () => {
    const { container } = render(<Hero />)
    expect(container.querySelector('#top')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- components/Hero.test.tsx`
Expected: FAIL with "Cannot find module './Hero'"

- [ ] **Step 3: Write `components/Hero.tsx`**

```tsx
'use client'

import { motion, useReducedMotion } from 'framer-motion'

export default function Hero() {
  const reducedMotion = useReducedMotion()

  return (
    <section id="top" className="relative overflow-hidden px-6 pb-24 pt-20 md:pt-28">
      <svg
        aria-hidden="true"
        viewBox="0 0 800 400"
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto w-[140%] max-w-none opacity-40 md:w-full"
      >
        <defs>
          <linearGradient id="arc-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B7833E" />
            <stop offset="35%" stopColor="#E7C98D" />
            <stop offset="60%" stopColor="#F2EEE4" />
            <stop offset="80%" stopColor="#7B7E85" />
            <stop offset="100%" stopColor="#292B31" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 80 360 C 250 360, 320 40, 400 40 C 480 40, 550 360, 720 360"
          fill="none"
          stroke="url(#arc-gradient)"
          strokeWidth="6"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={reducedMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 2.4, ease: 'easeInOut' }}
        />
      </svg>

      <div className="relative mx-auto max-w-4xl text-center">
        <p className="text-xs font-semibold tracking-label text-gold">
          SOFTWARE • AUTOMATION • AI • DIGITAL SOLUTIONS
        </p>

        <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight md:text-6xl lg:text-7xl">
          We turn ideas into <span className="text-gold">technology that works</span>.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base text-muted md:text-lg">
          Arclights designs and builds practical software, intelligent automation, and digital
          solutions that help businesses work smarter, move faster, and grow with confidence.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#contact"
            className="rounded-lg bg-graphite px-6 py-3 text-sm font-medium text-ivory transition hover:bg-gold hover:text-graphite"
          >
            Start a Project →
          </a>
          <a
            href="#work"
            className="rounded-lg border border-border px-6 py-3 text-sm font-medium text-graphite transition hover:border-gold"
          >
            Explore Our Work
          </a>
        </div>

        <p className="mt-8 text-xs tracking-label text-muted">Automate | Innovate | Elevate</p>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- components/Hero.test.tsx`
Expected: PASS (4 tests)

- [ ] **Step 5: Commit**

```bash
git add components/Hero.tsx components/Hero.test.tsx
git commit -m "feat: add hero section with animated arc visual"
```

---

## Task 7: Trust / Intro Strip

**Files:**
- Create: `components/TrustStrip.tsx`
- Test: `components/TrustStrip.test.tsx`

**Interfaces:**
- Produces: `TrustStrip` component (no props).

- [ ] **Step 1: Write the failing test**

```tsx
// components/TrustStrip.test.tsx
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- components/TrustStrip.test.tsx`
Expected: FAIL with "Cannot find module './TrustStrip'"

- [ ] **Step 3: Write `components/TrustStrip.tsx`**

```tsx
export default function TrustStrip() {
  return (
    <section className="border-y border-border bg-surface px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 text-center">
        <p className="text-lg font-medium text-graphite">From ideas to working solutions.</p>
        <p className="animate-[pulse_6s_ease-in-out_infinite] text-sm tracking-wide text-muted motion-reduce:animate-none">
          Strategy · Design · Development · Automation · Deployment
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- components/TrustStrip.test.tsx`
Expected: PASS (1 test)

- [ ] **Step 5: Commit**

```bash
git add components/TrustStrip.tsx components/TrustStrip.test.tsx
git commit -m "feat: add trust/intro strip"
```

---

## Task 8: What We Do Section

**Files:**
- Create: `components/WhatWeDo.tsx`
- Test: `components/WhatWeDo.test.tsx`

**Interfaces:**
- Produces: `WhatWeDo` component (no props), renders section with `id="services"` (the navbar's `Services` link target from Task 5).

- [ ] **Step 1: Write the failing test**

```tsx
// components/WhatWeDo.test.tsx
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- components/WhatWeDo.test.tsx`
Expected: FAIL with "Cannot find module './WhatWeDo'"

- [ ] **Step 3: Write `components/WhatWeDo.tsx`**

```tsx
const SERVICES = [
  {
    number: '01',
    title: 'Software Development',
    tagline: 'Build software around the way your business actually works.',
    description:
      'Custom web applications, internal tools, dashboards, management systems, APIs, databases, and business platforms designed around specific requirements.',
    labels: ['Web Applications', 'Business Systems', 'APIs', 'Dashboards'],
  },
  {
    number: '02',
    title: 'Automation',
    tagline: 'Turn repetitive work into intelligent workflows.',
    description:
      'We design automation systems that connect tools, move information, trigger actions, reduce manual work, and simplify everyday operations.',
    labels: ['Workflow Automation', 'Business Process Automation', 'System Integration', 'Notifications & Actions'],
  },
  {
    number: '03',
    title: 'AI Solutions',
    tagline: 'Apply AI where it creates real value.',
    description:
      'From AI-powered assistants and intelligent search to document processing and agent-based workflows, we build practical AI systems around genuine use cases.',
    labels: ['AI Assistants', 'RAG Systems', 'Intelligent Workflows', 'AI Integration'],
  },
  {
    number: '04',
    title: 'Digital Solutions',
    tagline: 'From an idea to something people can actually use.',
    description:
      'We help shape concepts, design interfaces, build prototypes, create MVPs, and turn technical ideas into deployable products.',
    labels: ['MVP Development', 'Product Prototyping', 'UI / UX', 'System Architecture'],
  },
]

export default function WhatWeDo() {
  return (
    <section id="services" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold tracking-label text-gold">WHAT WE DO</p>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold md:text-5xl">
          Technology built around real problems.
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          We help turn business requirements, repetitive processes, and new ideas into reliable
          digital solutions — from the first concept to a working system.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {SERVICES.map((service) => (
            <div
              key={service.number}
              className="group rounded-xl border border-border bg-surface p-8 transition hover:-translate-y-1 hover:border-gold"
            >
              <p className="text-sm font-semibold text-gold">{service.number}</p>
              <h3 className="mt-2 text-xl font-semibold">
                {service.number} — {service.title}
              </h3>
              <p className="mt-3 font-medium text-graphite">{service.tagline}</p>
              <p className="mt-3 text-sm text-muted">{service.description}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {service.labels.map((label) => (
                  <li
                    key={label}
                    className="rounded-lg border border-border px-3 py-1 text-xs text-muted"
                  >
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- components/WhatWeDo.test.tsx`
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add components/WhatWeDo.tsx components/WhatWeDo.test.tsx
git commit -m "feat: add What We Do section with four service cards"
```

---

## Task 9: Selected Work Section

**Files:**
- Create: `components/SelectedWork.tsx`
- Test: `components/SelectedWork.test.tsx`

**Interfaces:**
- Produces: `SelectedWork` component (no props), renders section with `id="work"` (the navbar's `Work` link target and hero's `Explore Our Work` target).

- [ ] **Step 1: Write the failing test**

```tsx
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

    expect(screen.getByRole('link', { name: /GitHub/i, description: '' }) || true).toBeTruthy()
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- components/SelectedWork.test.tsx`
Expected: FAIL with "Cannot find module './SelectedWork'"

- [ ] **Step 3: Write `components/SelectedWork.tsx`**

```tsx
const PROJECTS = [
  {
    name: 'Campus Connect',
    problem:
      'A full-stack, role-based campus management platform selected as a primary showcase for global ABET accreditation.',
    tags: ['Web App', 'Full-Stack', 'RBAC'],
    github: 'https://github.com/Vishal-WD/CAMPUS-CONNECT',
    demo: null,
  },
  {
    name: 'VisionSense',
    problem:
      'A computer vision pipeline that turns retail CCTV footage into customer behavior intelligence — built for Orientbell Tiles and awarded 1st Prize at the KARE SCRS Hackathon (DEV-FEST 2.0).',
    tags: ['Computer Vision', 'AI', 'Retail Analytics'],
    github: 'https://github.com/Vishal-WD/VisionSense',
    demo: null,
  },
  {
    name: 'AquaSense AI',
    problem:
      'An IoT and AI-driven platform that monitors water quality in real time and flags contamination risk before it becomes a problem — built during the Infosys Springboard internship, 2nd Place at EUPHORIA 2026 Techno-Management Meet.',
    tags: ['IoT', 'AI', 'Full-Stack'],
    github: 'https://github.com/Vishal-WD/AquaSense',
    demo: 'https://aqua-sense-three.vercel.app',
  },
]

export default function SelectedWork() {
  return (
    <section id="work" className="bg-surface px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold tracking-label text-gold">SELECTED WORK</p>
        <h2 className="mt-4 text-3xl font-semibold md:text-5xl">Things we&apos;ve built.</h2>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PROJECTS.map((project) => (
            <div
              key={project.name}
              className="group flex flex-col rounded-xl border border-border bg-ivory p-8 transition hover:-translate-y-1 hover:border-gold"
            >
              <h3 className="text-xl font-semibold">{project.name}</h3>
              <p className="mt-3 flex-1 text-sm text-muted">{project.problem}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li key={tag} className="rounded-lg border border-border px-3 py-1 text-xs text-muted">
                    {tag}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.name} — GitHub`}
                  className="text-graphite transition hover:text-gold"
                >
                  GitHub ↗
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${project.name} — Live Demo`}
                    className="text-graphite transition hover:text-gold"
                  >
                    Live Demo ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- components/SelectedWork.test.tsx`
Expected: PASS (4 tests)

- [ ] **Step 5: Commit**

```bash
git add components/SelectedWork.tsx components/SelectedWork.test.tsx
git commit -m "feat: add Selected Work section with three project cards"
```

---

## Task 10: Why Arclights Section

**Files:**
- Create: `components/WhyArclights.tsx`
- Test: `components/WhyArclights.test.tsx`

**Interfaces:**
- Produces: `WhyArclights` component (no props).

- [ ] **Step 1: Write the failing test**

```tsx
// components/WhyArclights.test.tsx
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- components/WhyArclights.test.tsx`
Expected: FAIL with "Cannot find module './WhyArclights'"

- [ ] **Step 3: Write `components/WhyArclights.tsx`**

```tsx
const PRINCIPLES = [
  {
    title: 'Practical by Design',
    description: 'We focus on solving the actual problem instead of adding technology for the sake of it.',
  },
  {
    title: 'Built Around You',
    description: 'Every project begins with understanding your workflow, requirements, users, and goals.',
  },
  {
    title: 'Clear Communication',
    description: 'You know what is being built, why it is being built, and where the project stands.',
  },
  {
    title: 'Built to Improve',
    description: 'We test, learn, refine, and improve throughout the development process.',
  },
]

export default function WhyArclights() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold tracking-label text-gold">WHY ARCLIGHTS</p>
        <h2 className="mt-4 text-3xl font-semibold md:text-5xl">Less complexity. More clarity.</h2>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((principle) => (
            <div key={principle.title} className="rounded-xl border border-border bg-surface p-6">
              <h3 className="text-lg font-semibold">{principle.title}</h3>
              <p className="mt-3 text-sm text-muted">{principle.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- components/WhyArclights.test.tsx`
Expected: PASS (2 tests)

- [ ] **Step 5: Commit**

```bash
git add components/WhyArclights.tsx components/WhyArclights.test.tsx
git commit -m "feat: add Why Arclights differentiation section"
```

---

## Task 11: How We Work Section

**Files:**
- Create: `components/HowWeWork.tsx`
- Test: `components/HowWeWork.test.tsx`

**Interfaces:**
- Produces: `HowWeWork` component (no props), renders section with `id="process"` (the navbar's `Process` link target from Task 5).

- [ ] **Step 1: Write the failing test**

```tsx
// components/HowWeWork.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import HowWeWork from './HowWeWork'

describe('HowWeWork', () => {
  it('renders the section label and heading', () => {
    render(<HowWeWork />)
    expect(screen.getByText('HOW WE WORK')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'From problem to product.' })).toBeInTheDocument()
  })

  it('renders all six process steps in order', () => {
    render(<HowWeWork />)
    const steps = screen.getAllByRole('heading', { level: 3 })
    expect(steps.map((s) => s.textContent)).toEqual([
      'Understand',
      'Plan',
      'Build',
      'Test',
      'Launch',
      'Improve',
    ])
  })

  it('has the #process anchor id for the navbar Process link', () => {
    const { container } = render(<HowWeWork />)
    expect(container.querySelector('#process')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- components/HowWeWork.test.tsx`
Expected: FAIL with "Cannot find module './HowWeWork'"

- [ ] **Step 3: Write `components/HowWeWork.tsx`**

```tsx
const STEPS = [
  {
    title: 'Understand',
    description: 'We begin with the problem — your goals, users, workflow, challenges, and requirements.',
  },
  {
    title: 'Plan',
    description: 'We define the solution, architecture, features, technologies, milestones, and expected outcome.',
  },
  {
    title: 'Build',
    description: 'We design and develop the solution through clear, manageable iterations.',
  },
  {
    title: 'Test',
    description: 'We validate functionality, usability, reliability, and real-world behaviour.',
  },
  {
    title: 'Launch',
    description: 'We deploy the solution and make sure everything works in its intended environment.',
  },
  {
    title: 'Improve',
    description: 'We gather feedback, refine the system, and continue improving where needed.',
  },
]

export default function HowWeWork() {
  return (
    <section id="process" className="bg-surface px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold tracking-label text-gold">HOW WE WORK</p>
        <h2 className="mt-4 text-3xl font-semibold md:text-5xl">From problem to product.</h2>

        <div className="relative mt-16">
          <svg
            aria-hidden="true"
            viewBox="0 0 1000 60"
            preserveAspectRatio="none"
            className="absolute inset-x-0 top-6 hidden w-full opacity-30 md:block"
          >
            <path
              d="M 0 50 C 150 10, 250 50, 400 30 C 550 10, 650 50, 800 30 C 900 15, 950 40, 1000 20"
              fill="none"
              stroke="#C99A54"
              strokeWidth="2"
            />
          </svg>

          <ol className="relative grid gap-8 md:grid-cols-3 lg:grid-cols-6">
            {STEPS.map((step, index) => (
              <li key={step.title} className="rounded-xl border border-border bg-ivory p-5">
                <p className="text-xs font-semibold text-gold">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="mt-2 text-base font-semibold">{step.title}</h3>
                <p className="mt-2 text-xs text-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- components/HowWeWork.test.tsx`
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add components/HowWeWork.tsx components/HowWeWork.test.tsx
git commit -m "feat: add How We Work process section with arc line"
```

---

## Task 12: Capabilities Section

**Files:**
- Create: `components/Capabilities.tsx`
- Test: `components/Capabilities.test.tsx`

**Interfaces:**
- Produces: `Capabilities` component (no props).

- [ ] **Step 1: Write the failing test**

```tsx
// components/Capabilities.test.tsx
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- components/Capabilities.test.tsx`
Expected: FAIL with "Cannot find module './Capabilities'"

- [ ] **Step 3: Write `components/Capabilities.tsx`**

```tsx
const CATEGORIES = [
  {
    name: 'Development',
    items: ['Web Applications', 'Backend Systems', 'APIs', 'Databases', 'Cloud-ready Architecture'],
  },
  {
    name: 'Automation',
    items: ['Workflow Automation', 'API Integration', 'Business Process Automation', 'Data Pipelines'],
  },
  {
    name: 'Artificial Intelligence',
    items: ['Generative AI', 'RAG', 'Agentic Workflows', 'AI Integration', 'Intelligent Search'],
  },
  {
    name: 'Data',
    items: ['Data Processing', 'Analytics', 'ETL / ELT', 'Dashboards', 'Data Engineering'],
  },
]

export default function Capabilities() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold tracking-label text-gold">CAPABILITIES</p>
        <h2 className="mt-4 text-3xl font-semibold md:text-5xl">The technology behind the work.</h2>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((category) => (
            <div key={category.name} className="rounded-xl border border-border bg-surface p-6">
              <h3 className="text-sm font-semibold tracking-wide text-gold">{category.name}</h3>
              <ul className="mt-4 space-y-2">
                {category.items.map((item) => (
                  <li key={item} className="text-sm text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-14 text-center text-sm text-muted">
          We choose technologies based on the problem — not the trend.
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- components/Capabilities.test.tsx`
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add components/Capabilities.tsx components/Capabilities.test.tsx
git commit -m "feat: add Capabilities section grouped by category"
```

---

## Task 13: About Preview Section

**Files:**
- Create: `components/AboutPreview.tsx`
- Test: `components/AboutPreview.test.tsx`

**Interfaces:**
- Produces: `AboutPreview` component (no props), renders section with `id="about"` (the navbar's `About` link target from Task 5).

- [ ] **Step 1: Write the failing test**

```tsx
// components/AboutPreview.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import AboutPreview from './AboutPreview'

describe('AboutPreview', () => {
  it('renders the section label, heading, and copy', () => {
    render(<AboutPreview />)
    expect(screen.getByText('ABOUT ARCLIGHTS')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Small team. Serious about what we build.' })
    ).toBeInTheDocument()
    expect(screen.getByText(/Arclights was started by two people/i)).toBeInTheDocument()
  })

  it('renders the Our Story CTA', () => {
    render(<AboutPreview />)
    expect(screen.getByRole('link', { name: /our story/i })).toBeInTheDocument()
  })

  it('does not mention founder degrees', () => {
    render(<AboutPreview />)
    expect(screen.queryByText(/MCA/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/B\.Tech/i)).not.toBeInTheDocument()
  })

  it('has the #about anchor id for the navbar About link', () => {
    const { container } = render(<AboutPreview />)
    expect(container.querySelector('#about')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- components/AboutPreview.test.tsx`
Expected: FAIL with "Cannot find module './AboutPreview'"

- [ ] **Step 3: Write `components/AboutPreview.tsx`**

```tsx
export default function AboutPreview() {
  return (
    <section id="about" className="bg-surface px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold tracking-label text-gold">ABOUT ARCLIGHTS</p>
        <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
          Small team. Serious about what we build.
        </h2>
        <p className="mt-6 text-muted">
          Arclights was started by two people with backgrounds in technology and a shared belief
          that software should solve meaningful problems. We combine development, automation,
          software quality, and continuous experimentation to turn ideas into practical solutions.
        </p>
        <a
          href="#"
          className="mt-8 inline-block rounded-lg border border-border px-6 py-3 text-sm font-medium text-graphite transition hover:border-gold"
        >
          Our Story →
        </a>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- components/AboutPreview.test.tsx`
Expected: PASS (4 tests)

- [ ] **Step 5: Commit**

```bash
git add components/AboutPreview.tsx components/AboutPreview.test.tsx
git commit -m "feat: add About preview section"
```

---

## Task 14: Team Preview Section

**Files:**
- Create: `components/TeamPreview.tsx`
- Test: `components/TeamPreview.test.tsx`

**Interfaces:**
- Produces: `TeamPreview` component (no props).

- [ ] **Step 1: Write the failing test**

```tsx
// components/TeamPreview.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TeamPreview from './TeamPreview'

describe('TeamPreview', () => {
  it('renders the heading and both team members with their roles', () => {
    render(<TeamPreview />)
    expect(screen.getByRole('heading', { name: 'The People Behind Arclights' })).toBeInTheDocument()
    expect(screen.getByText('Dharanyaa')).toBeInTheDocument()
    expect(screen.getByText('Software · QA · Automation')).toBeInTheDocument()
    expect(screen.getByText('Vishal')).toBeInTheDocument()
    expect(screen.getByText('Development · Software · Technology')).toBeInTheDocument()
  })

  it('does not mention founder degrees', () => {
    render(<TeamPreview />)
    expect(screen.queryByText(/MCA/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/B\.Tech/i)).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- components/TeamPreview.test.tsx`
Expected: FAIL with "Cannot find module './TeamPreview'"

- [ ] **Step 3: Write `components/TeamPreview.tsx`**

```tsx
const TEAM = [
  { name: 'Dharanyaa', role: 'Software · QA · Automation' },
  { name: 'Vishal', role: 'Development · Software · Technology' },
]

export default function TeamPreview() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-semibold md:text-5xl">The People Behind Arclights</h2>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {TEAM.map((member) => (
            <div key={member.name} className="rounded-xl border border-border bg-surface p-8">
              <p className="text-lg font-semibold">{member.name}</p>
              <p className="mt-2 text-sm text-muted">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- components/TeamPreview.test.tsx`
Expected: PASS (2 tests)

- [ ] **Step 5: Commit**

```bash
git add components/TeamPreview.tsx components/TeamPreview.test.tsx
git commit -m "feat: add Team preview section"
```

---

## Task 15: Contact Form, Email Integration & Project CTA Section

**Files:**
- Modify: `package.json` (add `resend` dependency via `npm install`)
- Create: `.env.local.example` (already exists — verify content, do not overwrite with different content)
- Create: `app/actions/contact.ts`
- Test: `app/actions/contact.test.ts`
- Create: `components/ContactForm.tsx`
- Test: `components/ContactForm.test.tsx`
- Create: `components/ProjectCTA.tsx`
- Test: `components/ProjectCTA.test.tsx`

**Interfaces:**
- Produces: `validateContactForm(data: { name: string; email: string; message: string }): string | null` and `sendContactMessage(prevState: ContactFormState, formData: FormData): Promise<ContactFormState>` from `app/actions/contact.ts`, consumed by `ContactForm`.
- Produces: `ContactForm` component (no props), consumed by `ProjectCTA`.
- Produces: `ProjectCTA` component (no props), renders section with `id="contact"` (the navbar's `Contact` link target from Task 5). Consumed by Task 17's page assembly.
- Consumes: `RESEND_API_KEY` environment variable, already present in `.env.local` (gitignored, not part of this task) with a real key. `.env.local.example` documents the variable name for anyone setting up the project without the real key.

**Global constraint for this task:** the target recipient email is `arclights.techteam@gmail.com` — reproduce exactly, no placeholder domain.

- [ ] **Step 1: Install the `resend` package**

Run: `npm install resend`
Expected: `resend` appears in `package.json` dependencies and `package-lock.json` updates.

- [ ] **Step 2: Verify `.env.local.example` exists with the expected content**

It should already exist at the project root with exactly this content:

```
RESEND_API_KEY=your_resend_api_key_here
```

If it's missing, create it with that exact content. Do not read or modify `.env.local` (the real key) — it is gitignored and out of scope for this task.

- [ ] **Step 3: Write the failing test for the validation function**

```typescript
// app/actions/contact.test.ts
import { describe, it, expect } from 'vitest'
import { validateContactForm } from './contact'

describe('validateContactForm', () => {
  it('returns an error when any field is empty', () => {
    expect(validateContactForm({ name: '', email: 'a@b.com', message: 'hi' })).toBe(
      'Please fill in every field.'
    )
    expect(validateContactForm({ name: 'A', email: '', message: 'hi' })).toBe(
      'Please fill in every field.'
    )
    expect(validateContactForm({ name: 'A', email: 'a@b.com', message: '' })).toBe(
      'Please fill in every field.'
    )
  })

  it('returns an error for an invalid email address', () => {
    expect(validateContactForm({ name: 'A', email: 'not-an-email', message: 'hi' })).toBe(
      'Please enter a valid email address.'
    )
  })

  it('returns null when all fields are valid', () => {
    expect(validateContactForm({ name: 'A', email: 'a@b.com', message: 'hi' })).toBeNull()
  })
})
```

- [ ] **Step 4: Run test to verify it fails**

Run: `npm test -- app/actions/contact.test.ts`
Expected: FAIL with "Cannot find module './contact'"

- [ ] **Step 5: Write `app/actions/contact.ts`**

```typescript
'use server'

import { Resend } from 'resend'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type ContactFormState = {
  status: 'idle' | 'success' | 'error'
  message: string
}

export function validateContactForm(data: { name: string; email: string; message: string }): string | null {
  if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
    return 'Please fill in every field.'
  }
  if (!EMAIL_PATTERN.test(data.email.trim())) {
    return 'Please enter a valid email address.'
  }
  return null
}

export async function sendContactMessage(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get('name')?.toString().trim() ?? ''
  const email = formData.get('email')?.toString().trim() ?? ''
  const message = formData.get('message')?.toString().trim() ?? ''

  const validationError = validateContactForm({ name, email, message })
  if (validationError) {
    return { status: 'error', message: validationError }
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    await resend.emails.send({
      from: 'Arclights Contact Form <onboarding@resend.dev>',
      to: 'arclights.techteam@gmail.com',
      replyTo: email,
      subject: `New project inquiry from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    })
    return { status: 'success', message: "Thanks — we'll be in touch soon." }
  } catch {
    return { status: 'error', message: 'Something went wrong. Please email us directly instead.' }
  }
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `npm test -- app/actions/contact.test.ts`
Expected: PASS (3 tests)

- [ ] **Step 7: Write the failing test for ContactForm**

```tsx
// components/ContactForm.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from './ContactForm'
import { sendContactMessage } from '@/app/actions/contact'

vi.mock('@/app/actions/contact', () => ({
  sendContactMessage: vi.fn(),
}))

describe('ContactForm', () => {
  it('renders name, email, and message fields with a submit button', () => {
    render(<ContactForm />)
    expect(screen.getByLabelText('Name')).toBeRequired()
    expect(screen.getByLabelText('Email')).toBeRequired()
    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email')
    expect(screen.getByLabelText('Message')).toBeRequired()
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('shows the success message returned by the server action after submitting', async () => {
    vi.mocked(sendContactMessage).mockResolvedValue({
      status: 'success',
      message: "Thanks — we'll be in touch soon.",
    })
    const user = userEvent.setup()
    render(<ContactForm />)

    await user.type(screen.getByLabelText('Name'), 'Jane Doe')
    await user.type(screen.getByLabelText('Email'), 'jane@example.com')
    await user.type(screen.getByLabelText('Message'), 'Hello there')
    await user.click(screen.getByRole('button', { name: /send message/i }))

    expect(await screen.findByRole('status')).toHaveTextContent("Thanks — we'll be in touch soon.")
  })
})
```

- [ ] **Step 8: Run test to verify it fails**

Run: `npm test -- components/ContactForm.test.tsx`
Expected: FAIL with "Cannot find module './ContactForm'"

- [ ] **Step 9: Write `components/ContactForm.tsx`**

```tsx
'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { sendContactMessage, type ContactFormState } from '@/app/actions/contact'

const initialState: ContactFormState = { status: 'idle', message: '' }

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-dark-gold px-6 py-3 text-sm font-medium text-black transition hover:bg-dark-silver disabled:opacity-60"
    >
      {pending ? 'Sending…' : 'Send Message'}
    </button>
  )
}

export default function ContactForm() {
  const [state, formAction] = useFormState(sendContactMessage, initialState)

  return (
    <form action={formAction} className="mt-10 flex flex-col gap-4 text-left">
      <div>
        <label htmlFor="contact-name" className="text-xs tracking-label text-dark-body">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          className="mt-1 w-full rounded-lg border border-dark-border bg-dark-surface px-4 py-2.5 text-sm text-dark-heading"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="text-xs tracking-label text-dark-body">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-lg border border-dark-border bg-dark-surface px-4 py-2.5 text-sm text-dark-heading"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="text-xs tracking-label text-dark-body">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          className="mt-1 w-full rounded-lg border border-dark-border bg-dark-surface px-4 py-2.5 text-sm text-dark-heading"
        />
      </div>
      <SubmitButton />
      {state.status !== 'idle' && (
        <p
          role="status"
          className={state.status === 'success' ? 'text-sm text-dark-gold' : 'text-sm text-red-400'}
        >
          {state.message}
        </p>
      )}
    </form>
  )
}
```

- [ ] **Step 10: Run test to verify it passes**

Run: `npm test -- components/ContactForm.test.tsx`
Expected: PASS (2 tests)

- [ ] **Step 11: Write the failing test for ProjectCTA**

```tsx
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
```

- [ ] **Step 12: Run test to verify it fails**

Run: `npm test -- components/ProjectCTA.test.tsx`
Expected: FAIL with "Cannot find module './ProjectCTA'"

- [ ] **Step 13: Write `components/ProjectCTA.tsx`**

```tsx
import ContactForm from './ContactForm'

export default function ProjectCTA() {
  return (
    <section id="contact" className="bg-black px-6 py-24 text-dark-heading">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-xs font-semibold tracking-label text-dark-gold">HAVE SOMETHING IN MIND?</p>
        <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
          Let&apos;s turn it into something real.
        </h2>
        <p className="mt-6 text-dark-body">
          Whether you&apos;re starting with an idea, an existing workflow, or a problem that needs
          solving, tell us what you&apos;re trying to build.
        </p>

        <ContactForm />

        <p className="mt-6 text-xs text-dark-body/70">
          Prefer email? Reach us directly at arclights.techteam@gmail.com
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 14: Run test to verify it passes**

Run: `npm test -- components/ProjectCTA.test.tsx`
Expected: PASS (3 tests)

- [ ] **Step 15: Commit**

```bash
git add package.json package-lock.json .env.local.example app/actions/contact.ts app/actions/contact.test.ts components/ContactForm.tsx components/ContactForm.test.tsx components/ProjectCTA.tsx components/ProjectCTA.test.tsx
git commit -m "feat: add Resend-backed contact form and wire it into the Project CTA section"
```

**Note:** `.env.local` (the real API key) must NOT be committed — it is already gitignored via `.env*.local` in `.gitignore` from Task 1. Do not add it to git under any circumstances.

---

## Task 16: Footer

**Files:**
- Create: `components/Footer.tsx`
- Test: `components/Footer.test.tsx`

**Interfaces:**
- Consumes: `ASSETS.logoDark` from `lib/assets.ts` (Task 2).
- Produces: `Footer` component (no props).

- [ ] **Step 1: Write the failing test**

```tsx
// components/Footer.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('Footer', () => {
  it('renders the wordmark and tagline', () => {
    render(<Footer />)
    expect(screen.getByText('ARCLIGHTS')).toBeInTheDocument()
    expect(screen.getByText('Automate. Innovate. Elevate.')).toBeInTheDocument()
  })

  it('renders the nav and social links', () => {
    render(<Footer />)
    ;['Work', 'Services', 'About', 'Contact'].forEach((label) => {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument()
    })
    expect(screen.getByRole('link', { name: /linkedin/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument()
  })

  it('renders the copyright line', () => {
    render(<Footer />)
    expect(screen.getByText(/© 2026 Arclights\. All rights reserved\./)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- components/Footer.test.tsx`
Expected: FAIL with "Cannot find module './Footer'"

- [ ] **Step 3: Write `components/Footer.tsx`**

```tsx
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- components/Footer.test.tsx`
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add components/Footer.tsx components/Footer.test.tsx
git commit -m "feat: add footer with brand mark and social links"
```

---

## Task 17: Page Assembly & Splash Wiring

**Files:**
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `SplashIntro` (Task 4), `Navbar` (Task 5), `Hero` (Task 6), `TrustStrip` (Task 7), `WhatWeDo` (Task 8), `SelectedWork` (Task 9), `WhyArclights` (Task 10), `HowWeWork` (Task 11), `Capabilities` (Task 12), `AboutPreview` (Task 13), `TeamPreview` (Task 14), `ProjectCTA` (Task 15), `Footer` (Task 16).

No new automated test — this task composes already-tested components. Verification is a full manual QA pass against the CLAUDE.md page structure.

- [ ] **Step 1: Replace `app/page.tsx` with full section composition behind the splash gate**

```tsx
'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SplashIntro from '@/components/SplashIntro'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import TrustStrip from '@/components/TrustStrip'
import WhatWeDo from '@/components/WhatWeDo'
import SelectedWork from '@/components/SelectedWork'
import WhyArclights from '@/components/WhyArclights'
import HowWeWork from '@/components/HowWeWork'
import Capabilities from '@/components/Capabilities'
import AboutPreview from '@/components/AboutPreview'
import TeamPreview from '@/components/TeamPreview'
import ProjectCTA from '@/components/ProjectCTA'
import Footer from '@/components/Footer'

export default function Home() {
  const [splashDone, setSplashDone] = useState(false)

  return (
    <>
      <AnimatePresence>
        {!splashDone && <SplashIntro onDone={() => setSplashDone(true)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: splashDone ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <Navbar />
        <main>
          <Hero />
          <TrustStrip />
          <WhatWeDo />
          <SelectedWork />
          <WhyArclights />
          <HowWeWork />
          <Capabilities />
          <AboutPreview />
          <TeamPreview />
          <ProjectCTA />
        </main>
        <Footer />
      </motion.div>
    </>
  )
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: succeeds, prints `/` as a static or dynamic route with no errors.

- [ ] **Step 3: Manual QA pass**

Run: `npm run dev`, open `http://localhost:3000`.
- Confirm the splash video plays once, then cross-fades into the Navbar + Hero.
- Reload the page — confirm the splash does **not** replay (same session).
- Open dev tools → toggle "Emulate CSS prefers-reduced-motion: reduce" — reload — confirm the splash is skipped entirely.
- Scroll through and confirm all 12 sections appear in CLAUDE.md order: Navbar, Hero, Trust Strip, What We Do, Selected Work, Why Arclights, How We Work, Capabilities, About Preview, Team Preview, Project CTA, Footer.
- Click every navbar link (desktop) and confirm it scrolls to the matching section.
- Resize to mobile width, confirm the hamburger menu opens/closes and its links scroll to the right sections.
- Confirm all `Live Demo`/`GitHub` links open in a new tab.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble full landing page behind splash intro"
```

---

## Task 18: Final Verification Pass

**Files:** none (verification only)

- [ ] **Step 1: Run full test suite**

Run: `npm test`
Expected: all component test files pass (Tasks 2, 4–16 — 35+ tests total).

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Run production build**

Run: `npm run build`
Expected: succeeds with no type errors.

- [ ] **Step 4: Cross-check against CLAUDE.md Global Constraints**

Manually confirm: no fake client logos/stats anywhere, no founder degrees on the page, nav has exactly six items, CTA section is dark or graphite-on-ivory buttons only (never pill-shaped — inspect computed `border-radius` on a button), gold is visually an accent not a fill (rough visual scan, not a pixel count).

- [ ] **Step 4b: Manually verify the contact form end-to-end**

With `npm run dev` running and `.env.local` populated with a real `RESEND_API_KEY`, fill out the Connect With Us form (Name, Email, Message) and submit. Confirm the button shows "Sending…" then a success message appears, and that an email actually arrives at arclights.techteam@gmail.com (check spam folder too, since `onboarding@resend.dev` is Resend's shared testing sender and may be filtered until a custom domain is verified). If no email arrives after a few minutes, check the terminal running `npm run dev` for a thrown/logged error from the Resend API call and report it — do not silently mark this step passed without confirming actual delivery or a clear, explainable reason it can't be verified right now (e.g. key not yet configured).

- [ ] **Step 5: Commit (if any fixes were needed)**

```bash
git add -A
git commit -m "fix: address final verification findings"
```

(Skip this step if verification found nothing to fix.)
