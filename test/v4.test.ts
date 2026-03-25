import { describe, expect, it } from 'vitest'
import { toTailwindcss } from '../src/toTailwindcss'
import { transformStyleToTailwindcss } from '../src/transformStyleToTailwindcss'

describe('tailwind v4', () => {
  it('aspect-ratio utilities', () => {
    expect(toTailwindcss('aspect-ratio: 1 / 1;', false, true)).toBe('aspect-square')
    expect(toTailwindcss('aspect-ratio: 3 / 2;', false, true)).toBe('aspect-3/2')
    expect(toTailwindcss('aspect-ratio: var(--aspect-video);', false, true)).toBe('aspect-video')
    expect(toTailwindcss('aspect-ratio: var(--my-aspect);', false, true)).toBe('aspect-(--my-aspect)')
  })

  it('sizing utilities', () => {
    expect(toTailwindcss('width: 100%;', false, true)).toBe('w-full')
    expect(toTailwindcss('height: 100vh;', false, true)).toBe('h-screen')
    expect(toTailwindcss('inline-size: 100%;', false, true)).toBe('inline-full')
    expect(toTailwindcss('block-size: 100vh;', false, true)).toBe('block-screen')
    expect(toTailwindcss('min-inline-size: 100%;', false, true)).toBe('min-inline-full')
    expect(toTailwindcss('max-block-size: 100vh;', false, true)).toBe('max-block-screen')
  })

  it('typography utilities', () => {
    expect(toTailwindcss('font-stretch: condensed;', false, true)).toBe('font-stretch-condensed')
    expect(toTailwindcss('font-stretch: var(--my-stretch);', false, true)).toBe('font-stretch-(--my-stretch)')
    expect(toTailwindcss('font-feature-settings: \"cv02\", \"cv03\";', false, true)).toBe('font-features-["cv02","cv03"]')
    expect(toTailwindcss('line-clamp: 3;', false, true)).toBe('line-clamp-3')
    expect(toTailwindcss('line-clamp: var(--my-lines);', false, true)).toBe('line-clamp-(--my-lines)')
    expect(toTailwindcss('text-shadow: none;', false, true)).toBe('text-shadow-none')
    expect(toTailwindcss('text-shadow: 1px 1px 2px rgb(0, 0, 0);', false, true)).toBe('text-shadow-[1px_1px_2px_rgb(0,0,0)]')
  })

  it('transform utilities', () => {
    expect(toTailwindcss('perspective-origin: top right;', false, true)).toBe('perspective-origin-top-right')
    expect(toTailwindcss('rotate: 45deg;', false, true)).toBe('rotate-45')
    expect(toTailwindcss('transform: rotate(45deg);', false, true)).toBe('rotate-45')
    expect(toTailwindcss('transform: scale(.5);', false, true)).toBe('scale-50')
    expect(toTailwindcss('transform: translateX(100%);', false, true)).toBe('translate-x-full')
    expect(toTailwindcss('transform: skewX(12deg);', false, true)).toBe('skew-x-12')
    expect(toTailwindcss('translate: 100% 100%;', false, true)).toBe('translate-full')
  })

  it('interactivity utilities', () => {
    expect(toTailwindcss('color-scheme: light dark;', false, true)).toBe('scheme-light-dark')
  })

  it('combined line-clamp preset', () => {
    expect(
      transformStyleToTailwindcss(
        `overflow: hidden;
display: -webkit-box;
-webkit-box-orient: vertical;
line-clamp: var(--my-lines);`,
        false,
        false,
        true,
      )[0],
    ).toBe('line-clamp-(--my-lines)')
  })
})
