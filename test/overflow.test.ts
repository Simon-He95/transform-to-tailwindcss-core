import { describe, expect, it } from 'vitest'
import { toTailwindcss } from '../src/toTailwindcss'

describe('overflow', () => {
  it('overflow: auto;', () => {
    expect(toTailwindcss('overflow: auto;')).toBe('overflow-auto')
  })

  it('overflow-y: auto;', () => {
    expect(toTailwindcss('overflow-y: auto;')).toBe('overflow-y-auto')
  })

  it('overflow-x: visible;', () => {
    expect(toTailwindcss('overflow-x: visible;')).toBe('overflow-x-visible')
  })
  
  it('overflow-wrap: break-word;', () => {
    expect(toTailwindcss('overflow-wrap: break-word;')).toBe('wrap-break-word')
  })

  it('overflow-wrap: anywhere;', () => {
    expect(toTailwindcss('overflow-wrap: anywhere;')).toBe('wrap-anywhere')
  })
})
