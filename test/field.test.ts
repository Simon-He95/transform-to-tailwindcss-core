import { describe, expect, it } from 'vitest'
import { toTailwindcss } from '../src/toTailwindcss'

describe('field', () => {
  it('field-sizing: fixed;', () => {
    expect(toTailwindcss('field-sizing: fixed;')).toBe(
      'field-sizing-fixed',
    )
  })

  it('field-sizing: content;', () => {
    expect(toTailwindcss('field-sizing: content;')).toBe(
      'field-sizing-content',
    )
  })
})
