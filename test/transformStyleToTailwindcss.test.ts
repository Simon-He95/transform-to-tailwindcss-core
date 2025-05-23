import { describe, expect, it } from 'vitest'
import { transformStyleToTailwindcss } from '../src/transformStyleToTailwindcss'

describe('transformStyleToTailwindcss', () => {
  it('line-clamp', () => {
    expect(
      transformStyleToTailwindcss(
        `overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 0;
  line-clamp: 0;`,
      )[0],
    ).toBe('line-clamp-0')

    expect(
      transformStyleToTailwindcss(
        `overflow: visible;
  display: block;
  -webkit-box-orient: horizontal;
  -webkit-line-clamp: unset;
  line-clamp: unset;`,
      )[0],
    ).toBe('line-clamp-unset')

    expect(
      transformStyleToTailwindcss(
        `overflow: visible;
  display: block;
  -webkit-box-orient: horizontal;
  -webkit-line-clamp: unset;
  `,
      )[0],
    ).toBe('line-clamp-unset')

    expect(
      transformStyleToTailwindcss(
        `overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;`,
      )[0],
    ).toBe('line-clamp-1')
  })

  it('truncate', () => {
    expect(
      transformStyleToTailwindcss(
        `overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;`
      )[0],
    ).toBe('truncate')
  })

  it('transformStyleToTailwindcss', () => {
    expect(
      transformStyleToTailwindcss(
        'transform-origin: center;background:red;width:100%;height:30px',
      )[0],
    ).toBe('origin-center bg-red w-[100%] h-[30px]')

    expect(
      transformStyleToTailwindcss(
        'transform-origin: center;background:rgba(1,2,3,.5);width:100%;height:30px',
      )[0],
    ).toBe('origin-center bg-[rgba(1,2,3,.5)] w-[100%] h-[30px]')
  })

  it('--webkit-transition', () => {
    expect(transformStyleToTailwindcss(`-webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);`)[0]).toBe(
      'transition-all duration-[0.3s] ease-[cubic-bezier(0.645,0.045,0.355,1)]',
    )
  })

  it('common', () => {
    expect(transformStyleToTailwindcss(`color: #fff;
    font-size: 16px;`)[0]).toBe(
      'text-[#fff] text-[16px]',
    )
  })

  it('not matched', () => {
    expect(transformStyleToTailwindcss(`width: 240px;display: inline-flex;-ms-flex-negative: 0;flex-shrink: 0;-webkit-box-flex: 1;-ms-flex-positive: 1;position: relative;`)[1]).toMatchInlineSnapshot(`
      [
        "-ms-flex-negative: 0",
        "-webkit-box-flex: 1",
        "-ms-flex-positive: 1",
      ]
    `)
  })
})
