import { describe, expect, it } from 'vitest'
import { toTailwindcss } from '../src/toTailwindcss'

describe('content', () => {
  it('content: none;', () => {
    expect(toTailwindcss('content: none;')).toBe('content-[none]')
  })

  it('content: "aa";', () => {
    expect(toTailwindcss('content: "aa";')).toBe('content-["aa"]')
  })

  it('content: " ";', () => {
    expect(toTailwindcss('content: " ";')).toBe('content-[\'_\']')
  })
  it('content: \' \'', () => {
    expect(toTailwindcss('content: \' \';')).toBe('content-[\'_\']')
  })
})
