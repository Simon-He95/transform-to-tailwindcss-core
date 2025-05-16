import { describe, expect, it } from 'vitest'
import { toTailwindcss } from '../src/toTailwindcss'

describe('aspect', () => {
  it('aspect-ratio: auto;', () => {
    expect(toTailwindcss('aspect-ratio: auto;')).toBe('aspect-auto')
  })

  it('aspect-ratio: 1 / 1;', () => {
    expect(toTailwindcss('aspect-ratio: 1 / 1;')).toBe('aspect-[1/1]')
  })

  it('aspect-ratio: 16 / 9;', () => {
    expect(toTailwindcss('aspect-ratio: 16 / 9;')).toBe('aspect-[16/9]')
  })

    it('aspect-ratio: var(--aspect-ratio-video);', () => {
    expect(toTailwindcss('aspect-ratio: var(--aspect-ratio-video);')).toBe('aspect-[var(--aspect-ratio-video)]')
  })
})
