import { describe, expect, it } from 'vitest'
import { toTailwindcss } from '../src/toTailwindcss'
describe('border', () => {
  it('border;', () => {
    expect(toTailwindcss('border: 2px solid rgba(255, 62, 0, 0);')).toBe(
      'border-[2px] border-solid border-[rgba(255,62,0,0)]',
    )
  })

  it('border-bottom: #333;', () => {
    expect(toTailwindcss('border-bottom: 1px solid var(--default, red);')).toBe('border-b-[1px] border-b-[var(--default,red)]')
  })
})

describe('border-style', () => {
  it('border-bottom-style: dashed;', () => {
    expect(toTailwindcss('border-bottom-style: dashed;')).toBe(
      'border-b-dashed',
    )
  })

  it('style', () => {
    expect(toTailwindcss('border-style: inset;')).toBe('border-inset')
  })
})

describe('border-width', () => {
  it('border-width: 0 0 50px var(--xxx,10px)', () => {
    expect(toTailwindcss('border-width: 0 0 50px var(--xxx,calc(10px * var(--dd)))')).toBe('border-[length:0_0_50px_var(--xxx,calc(10px*var(--dd)))]')
  })

  it('border-bottom-width: 1px;', () => {
    expect(toTailwindcss('border-bottom-width: 1px;')).toBe('border-b-[length:1px]')
  })

  it('border-width', () => {
    expect(toTailwindcss('border-width: 2px;')).toBe('border-[length:2px]')
  })
})

describe('border-radius', () => {
  it('border-start-end-radius: var(--radius-xs)', () => {
    expect(toTailwindcss('border-start-end-radius: var(--radius-xs)')).toBe('rounded-se-[var(--radius-xs)]')
  })

  it('border-top-left-radius: var(--radius-xs)', () => {
    expect(toTailwindcss('border-top-left-radius: var(--radius-xs)')).toBe('rounded-tl-[var(--radius-xs)]')
  })

  it('border-radius: 10px 20px 30px 40px', () => {
    expect(toTailwindcss('border-radius: 10px 20px 30px 40px;')).toBe(
      'rounded-[10px_20px_30px_40px]',
    )
  })

  it('radius-calc', () => {
    expect(toTailwindcss('border-radius: calc(100% - 20px)')).toBe(
      'rounded-[calc(100%-20px)]',
    )
  })
  it('radius', () => {
    expect(toTailwindcss('border-radius: 0.25rem;')).toBe('rounded-[0.25rem]')
  })

  it('border-top-left-radius: 20px', () => {
    expect(toTailwindcss('border-top-left-radius: 20px;')).toBe('rounded-tl-[20px]')
  })
})

describe('border-color', () => {
  it('var(--color-stone-950);', () => {
    expect(toTailwindcss('border-color: var(--color-stone-950);')).toBe('border-[var(--color-stone-950)]')
  })

  it('border-inline-color: var(--color-indigo-300);', () => {
    expect(toTailwindcss('border-inline-color: var(--color-indigo-300);')).toBe('border-x-[length:var(--color-indigo-300)]')
  })

  it('border-left-color: #333;', () => {
    expect(toTailwindcss('border-left-color: #333;')).toBe('border-l-[length:#333]')
  })
})

describe('border-spacing', () => {
  it('border-spacing: calc(var(--spacing) * <number>);', () => {
    expect(toTailwindcss('border-spacing: calc(var(--spacing) * <number>)')).toBe('border-spacing-[calc(var(--spacing)_*_<number>)]')
  })

  it('spacing', () => {
    expect(toTailwindcss('border-spacing: 0px 0px;')).toBe(
      'border-spacing-[0px_0px]',
    )
  })
})

describe('border-collapse', () => {
  it('border-collapse: collapse;', () => {
    expect(toTailwindcss('border-collapse: collapse;')).toBe('border-collapse')
  })
})
