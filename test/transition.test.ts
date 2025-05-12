import { describe, expect, it } from 'vitest'
import { toTailwindcss } from '../src/toTailwindcss'

describe('transition', () => {
  it('transition: background-color 0.5s ease;', () => {
    expect(toTailwindcss('transition: background-color 0.5s 1.5s ease;')).toBe(
      'transition-colors duration-[0.5s] delay-[1.5s] ease-[ease]',
    )
  })

  it('transition: transform 0.15s linear;', () => {
    expect(toTailwindcss('transition: transform 0.15s linear;')).toBe(
      'transition-transform duration-[0.15s] ease-[linear]',
    )
  })

  it('transition: none;', () => {
    expect(toTailwindcss('transition: none;')).toBe('transition-none')
  })

  it('transition-property: all;', () => {
    expect(toTailwindcss('transition-property: all;')).toBe('transition-all')
  })

  it('transition-property: box-shadow;', () => {
    expect(toTailwindcss('transition-property: box-shadow;')).toBe(
      'transition-shadow',
    )
  })

  it('transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;', () => {
    expect(
      toTailwindcss(
        'transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;',
      ),
    ).toBe('transition-color')
  })

  it('transition-duration: 75ms;', () => {
    expect(toTailwindcss('transition-duration: 75ms;')).toBe('duration-[75ms]')
  })

  it('transition-duration: 75ms;', () => {
    expect(toTailwindcss('transition-delay: 75ms;')).toBe('delay-[75ms]')
  })

    it('transition-delay: 0.3s;', () => {
    expect(toTailwindcss('transition-duration: 0.3s;')).toBe('duration-[0.3s]')
  })

  it('transition-timing-function: linear', () => {
    expect(toTailwindcss('transition-timing-function: linear')).toBe('ease-linear')
  })

  it('transition-timing-function: cubic-bezier(0.4, 0, 1, 1);', () => {
    expect(
      toTailwindcss('transition-timing-function: cubic-bezier(0.4, 0, 1, 1);'),
    ).toBe('ease-[cubic-bezier(0.4,0,1,1)]')
  })

  it('transition: margin-left .28s;', () => {
    expect(toTailwindcss('transition: margin-left .28s;')).toBe(
      'transition-margin-left duration-[.28s]',
    )
  })
})
