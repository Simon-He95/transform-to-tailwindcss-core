import { describe, expect, it } from 'vitest'
import { toTailwindcss } from '../src/toTailwindcss'
describe('line-height', () => {
  it('rem;', () => {
    expect(toTailwindcss('line-height: 0.25rem;')).toBe('leading-[0.25rem]')
  })

  it('px', () => {
    expect(toTailwindcss('line-height: 20px;')).toBe('leading-[20px]')
  })
  it('em', () => {
    expect(toTailwindcss('line-height: 20em;')).toBe('leading-[20em]')
  })

  it('calc', () => {
    expect(toTailwindcss('line-height: calc(100% - 20px);')).toBe(
      'leading-[calc(100%-20px)]',
    )
  })

  it('line-height: 1', () => {
    expect(toTailwindcss('line-height: 1;')).toBe('leading-none')
  })

  it('line-height: 1.25', () => {
    expect(toTailwindcss('line-height: 1.25;')).toBe('leading-tight')
  })

  it('line-height: 1.375', () => {
    expect(toTailwindcss('line-height: 1.375;')).toBe('leading-snug')
  })

  it('line-height: 1.5', () => {
    expect(toTailwindcss('line-height: 1.5;')).toBe('leading-normal')
  })

  it('line-height: 1.625', () => {
    expect(toTailwindcss('line-height: 1.625;')).toBe('leading-relaxed')
  })

  it('line-height: 2', () => {
    expect(toTailwindcss('line-height: 2;')).toBe('leading-loose')
  })
})
