import { describe, expect, it } from 'vitest'
import { toTailwindcss } from '../src/toTailwindcss'

describe('hyphens', () => {
  it('hyphens: none;', () => {
    expect(toTailwindcss('hyphens: none;')).toBe('hyphens-none')
  })

  it('hyphens: manual;', () => {
    expect(toTailwindcss('hyphens: manual;')).toBe('hyphens-manual')
  })

  it('hyphens: auto;', () => {
    expect(toTailwindcss('hyphens: auto;')).toBe('hyphens-auto')
  })
})
