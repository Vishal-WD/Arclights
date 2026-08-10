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
        className="h-full w-full object-contain"
        src={ASSETS.introVideo}
        autoPlay
        muted
        playsInline
        onEnded={finish}
        onError={finish}
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
