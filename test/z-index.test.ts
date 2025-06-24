import { describe, expect, it } from 'vitest'
import { toTailwindcss } from '../src/toTailwindcss'

describe('z-index', () => {
  it('z-1', () => {
    expect(toTailwindcss('z-index:1')).toMatchInlineSnapshot(`"z-[1]"`)
  })
  it('z-0', () => {
    expect(toTailwindcss('z-index:0')).toMatchInlineSnapshot(`"z-0"`)
  })
})
