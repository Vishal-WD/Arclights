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
