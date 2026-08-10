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
          animate={{ pathLength: 1, opacity: 1 }}
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
