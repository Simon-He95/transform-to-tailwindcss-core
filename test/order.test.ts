import { describe, expect, it } from 'vitest'
import { toTailwindcss } from '../src/toTailwindcss'

describe('order', () => {
  it('order: -9999;', () => {
    expect(toTailwindcss('order: -9999;')).toBe('order--9999')
  })

  it('order: 0;', () => {
    expect(toTailwindcss('order: 0;')).toBe('order-0')
  })

    it('order: var;', () => {
    expect(toTailwindcss('order: var(--order);')).toBe('order-[var(--order)]')
  })
})
