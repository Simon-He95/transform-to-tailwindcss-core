import { describe, expect, it } from 'vitest'
import { toTailwindcss } from '../src/toTailwindcss'

describe('width', () => {
  it('px', () => {
    expect(toTailwindcss('width:10px', true)).toBe('w-[0.625rem]')
  })
  it('%', () => {
    expect(toTailwindcss('width: 100%')).toBe('w-[100%]')
  })
  it('em', () => {
    expect(toTailwindcss('width:10em')).toBe('w-[10em]')
  })
  it('rem', () => {
    expect(toTailwindcss('width:10rem')).toBe('w-[10rem]')
  })
  it('max-content', () => {
    expect(toTailwindcss('width: max-content')).toBe('w-max')
  })
  it('min-content', () => {
    expect(toTailwindcss('width: min-content')).toBe('w-min')
  })
  it('fit-content', () => {
    expect(toTailwindcss('width:fit-content')).toBe('w-fit')
  })
  it('auto', () => {
    expect(toTailwindcss('width:auto')).toBe('w-auto')
  })
  it('calc', () => {
    expect(toTailwindcss('width:calc(100% - 50px)')).toBe('w-[calc(100%-50px)]')
  })
  it('calc not space', () => {
    expect(toTailwindcss('width:calc(100%-50px)')).toBe('w-[calc(100%-50px)]')
  })

  it('calc space', () => {
    expect(toTailwindcss('width:calc(100%  -  50px)')).toBe(
      'w-[calc(100%-50px)]',
    )
  })

  it('min-width: 0px;', () => {
    expect(toTailwindcss('min-width: 0px;')).toBe('min-w-[0px]')
  })

  it('min-width: 0px;', () => {
    expect(toTailwindcss('min-width: 100%;')).toBe('min-w-[100%]')
  })
  it('min-width calc', () => {
    expect(toTailwindcss('min-width: calc(100% - 50px);')).toBe('min-w-[calc(100%-50px)]')
  })
  it('min-width calc not space', () => {
    expect(toTailwindcss('min-width:calc(100% - 50px)')).toBe('min-w-[calc(100%-50px)]')
  })
  it('min-width calc space', () => {
    expect(toTailwindcss('min-width:calc(100%  -  50px)')).toBe(
      'min-w-[calc(100%-50px)]',
    )
  })
  it('max-width: 0px;', () => {
    expect(toTailwindcss('max-width: 0px;')).toBe('max-w-[0px]')
  })
  it('max-width: 0px;', () => {
    expect(toTailwindcss('max-width: max-content;')).toBe('max-w-max')
  })
  it('max-width calc', () => {
    expect(toTailwindcss('max-width:calc(100% - 50px)')).toBe('max-w-[calc(100%-50px)]')
  })
  it('max-width calc not space', () => {
    expect(toTailwindcss('max-width:calc(100% - 50px)')).toBe('max-w-[calc(100%-50px)]')
  })
  it('max-width calc space', () => {
    expect(toTailwindcss('max-width:calc(100%  -  50px)')).toBe(
      'max-w-[calc(100%-50px)]',
    )
  })
})
