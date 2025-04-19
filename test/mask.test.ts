import { describe, expect, it } from 'vitest'
import { toTailwindcss } from '../src/toTailwindcss'

describe('position', () => {
  it('mask-clip: border-box;', () => {
    expect(toTailwindcss('mask-clip: border-box;')).toBe('mask-clip-border')
  })

  it('mask-composite: add;', () => {
    expect(toTailwindcss('mask-composite: add;')).toBe('mask-add')
  })

  it('mask-image: none;', () => {
    expect(toTailwindcss('mask-image: none;')).toBe('mask-none')
  })

  it('mask-image: linear-gradient(to right, black var(--tw-mask-right-from), transparent 0.1);', () => {
    expect(toTailwindcss('mask-image: linear-gradient(to right, black var(--tw-mask-right-from), transparent 0.1);')).toBe('mask-r-from-black mask-r-from-[var(--tw-mask-right-from)] mask-r-to-transparent mask-r-to-0.1')
  })

  it('mask-mode: alpha;', () => {
    expect(toTailwindcss('mask-mode: alpha;')).toBe('mask-alpha')
  })

  it('mask-origin: border-box;', () => {
    expect(toTailwindcss('mask-origin: border-box;')).toBe('mask-origin-border')
  })

  it('mask-position: top left;', () => {
    expect(toTailwindcss('mask-position: top left;')).toBe('mask-top-left')
  })

  it('mask-position: top;', () => {
    expect(toTailwindcss('mask-position: top;')).toBe('mask-top')
  })

  it('mask-position: var(--position);', () => {
    expect(toTailwindcss('mask-position: var(--position);')).toBe('mask-position-[var(--position)]')
  })
})
