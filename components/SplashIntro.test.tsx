import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
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
    act(() => {
      vi.advanceTimersByTime(1100)
    })
    fireEvent.click(screen.getByRole('button', { name: /skip/i }))
    expect(onDone).toHaveBeenCalledTimes(1)
    vi.useRealTimers()
  })
})
