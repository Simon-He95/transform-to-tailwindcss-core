import { describe, expect, it } from 'vitest'
import { toTailwindcss } from '../src/toTailwindcss'

describe('forced', () => {
  it('forced-color-adjust: auto;', () => {
    expect(toTailwindcss('forced-color-adjust: auto;')).toBe('forced-color-adjust-auto')
  })

  it('forced-color-adjust: none;', () => {
    expect(toTailwindcss('forced-color-adjust: none;')).toBe(
      'forced-color-adjust-none',
    )
  })
})
