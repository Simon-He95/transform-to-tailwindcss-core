import { describe, expect, it } from 'vitest'
import { toTailwindcss } from '../src/toTailwindcss'
describe('background', () => {
  it('background:red !important', () => {
    expect(toTailwindcss('background:red !important')).toBe('!bg-red')
  })

  it('background:red !important', () => {
    expect(toTailwindcss('background:red center url("./a.jpg")')).toBe(
      'bg-red bg-[position:center] bg-[url(./a.jpg)]',
    )
  })

  it('background:rgb(125, 188, 234)', () => {
    expect(toTailwindcss('background:rgb(125, 188, 234) center')).toBe(
      'bg-[rgb(125,188,234)] bg-[position:center]',
    )
  })

  it('background-size:28rpx 28rpx', () => {
    expect(toTailwindcss('background-size:28rpx 28rpx')).toBe(
      'bg-[length:28rpx_28rpx]',
    )
  })

  it('background-size:100% auto', () => {
    expect(toTailwindcss('background-size:100% auto')).toBe(
      'bg-[length:100%_auto]',
    )
  })

  it('background-size: var(--size)', () => {
    expect(toTailwindcss('background-size: var(--size)')).toBe(
      'bg-[length:var(--size)]',
    )
  })

  it('background:rgba(125, 188, 234) center center;', () => {
    expect(toTailwindcss('background:rgba(125, 188, 234, 0.5) center center')).toBe(
      'bg-[rgba(125,188,234,0.5)] bg-[position:center_center]',
    )
  })

  it('background:red center no-repeat url("./xxx.jpg")', () => {
    expect(
      toTailwindcss('background:red center no-repeat url("./xxx.jpg")'),
    ).toBe('bg-red bg-[position:center] bg-no-repeat bg-[url(./xxx.jpg)]')
  })

  it('background-color:red', () => {
    expect(toTailwindcss('background-color:red')).toBe('bg-red')
  })

  it('background:#67c23a ', () => {
    expect(toTailwindcss('background-color:#67c23a ')).toBe('bg-[#67c23a]')
  })

  it('background:auto', () => {
    expect(toTailwindcss('background:auto')).toBe('bg-auto')
  })
  // size
  it('background-size:auto', () => {
    expect(toTailwindcss('background-size:auto')).toBe('bg-[length:auto]')
  })

  it('background-size:cover', () => {
    expect(toTailwindcss('background-size:cover')).toBe('bg-[length:cover]')
  })

  it('background-size:contain', () => {
    expect(toTailwindcss('background-size:contain')).toBe('bg-[length:contain]')
  })

  it('background-size:50%', () => {
    expect(toTailwindcss('background-size:50%')).toBe('bg-[length:50%]')
  })

  it('background-size: var(--size, 50%)', () => {
    expect(toTailwindcss('background-size: var(--size, 50%)')).toBe('bg-[length:var(--size,50%)]')
  })

  // attachments
  it('background-attachments:fixed', () => {
    expect(toTailwindcss('background-attachment:fixed')).toBe('bg-fixed')
  })

  // clip
  it('background-clip:border-box', () => {
    expect(toTailwindcss('background-clip:border-box')).toBe('bg-clip-border')
  })

  it('background-clip:border-box', () => {
    expect(toTailwindcss('background-clip:padding-box')).toBe('bg-clip-padding')
  })

  it('background-clip:test', () => {
    expect(toTailwindcss('background-clip:test')).toBe('bg-clip-test')
  })

  // position
  it('background-position:center', () => {
    expect(toTailwindcss('background-position:center')).toBe('bg-[position:center]')
  })

  it('background-position:center center', () => {
    expect(toTailwindcss('background-position:center center')).toBe(
      'bg-[position:center_center]',
    )
  })

  it('background-position: var(--position)', () => {
    expect(toTailwindcss('background-position:  var(--position)')).toBe(
      'bg-[position:var(--position)]',
    )
  })

  // repeats
  it('background-repeat:repeat', () => {
    expect(toTailwindcss('background-repeat:repeat')).toBe('bg-repeat')
  })

  it('background-repeat:no-repeat', () => {
    expect(toTailwindcss('background-repeat:no-repeat')).toBe('bg-no-repeat')
  })

  it('background-repeat:repeat-x', () => {
    expect(toTailwindcss('background-repeat:repeat-x')).toBe('bg-repeat-x')
  })

  it('background-repeat:inherit', () => {
    expect(toTailwindcss('background-repeat:inherit')).toBe('bg-repeat-inherit')
  })

  // origins
  it('background-origin:border-box', () => {
    expect(toTailwindcss('background-origin:border-box')).toBe(
      'bg-origin-border',
    )
  })

  it('background-origin:inherit', () => {
    expect(toTailwindcss('background-origin:inherit')).toBe('bg-origin-inherit')
  })

  // image
  it('background-image:none', () => {
    expect(toTailwindcss('background-image:none')).toBe('bg-none')
  })

  it('background-image:url(\'picture.png\')', () => {
    expect(toTailwindcss('background-image:url(\'picture.png\')')).toBe(
      'bg-[url(picture.png)]',
    )
  })

  it('background-image: var(--image)', () => {
    expect(toTailwindcss('background-image: var(--image)')).toBe(
      'bg-[var(--image)]',
    )
  })

  it('background-image: linear-gradient(to top, var(--tw-gradient-stops));', () => {
    expect(toTailwindcss('background-image: linear-gradient(to top, var(--tw-gradient-stops));')).toBe(
      'bg-gradient-to-t to-[var(--tw-gradient-stops)]',
    )
  })

  it('background: red', () => {
    expect(toTailwindcss('background: red')).toBe('bg-red')
  })

  it('background: url("../aa.jpg")', () => {
    expect(toTailwindcss('background: url("../aa.jpg")')).toBe(
      'bg-[url(../aa.jpg)]',
    )
  })

  it('background-blend-mode: normal;', () => {
    expect(toTailwindcss('background-blend-mode: normal;')).toBe(
      'bg-blend-normal',
    )
  })

  it('background-blend-mode: color-dodge;', () => {
    expect(toTailwindcss('background-blend-mode: color-dodge;')).toBe(
      'bg-blend-color-dodge',
    )
  })

  it('background: linear-gradient to top', () => {
    expect(
      toTailwindcss(
        'background: linear-gradient(to top, rgba(255, 255, 255), cyan);',
      ),
    ).toBe('bg-gradient-to-t from-[rgba(255,255,255)] to-cyan')
  })

  it('background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 100%)', () => {
    expect(
      toTailwindcss(
        'background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 100%)',
      ),
    ).toBe(
      'bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.5)_50%,rgba(255,255,255,0)_100%)]',
    )
  })

  it('background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 100%) no-repeat', () => {
    expect(
      toTailwindcss(
        'background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 100%) no-repeat',
      ),
    ).toBe(
      'bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.5)_50%,rgba(255,255,255,0)_100%)_no-repeat]',
    )
  })

  it('background: linear-gradient(to left top, black, cyan);', () => {
    expect(
      toTailwindcss('background: linear-gradient(to left top, black, cyan);'),
    ).toBe('bg-gradient-to-lt from-black to-cyan')
  })

  // unocss 支持 to-10% from-10%
  it('background: linear-gradient(to bottom, #00ffff 0%, #0066ff 100%);', () => {
    expect(
      toTailwindcss(
        'background: linear-gradient(to bottom, #00ffff 0%, #0066ff 100%);',
      ),
    ).toBe('bg-gradient-to-b from-[#00ffff] from-[0%] to-[#0066ff] to-[100%]')
  })

  it('background: linear-gradient(to bottom, #00ffff 0, #0ea5e9 ,#0066ff 100%);', () => {
    expect(
      toTailwindcss(
        'background: linear-gradient(to bottom, #00ffff 0, #0ea5e9 ,#0066ff 100%);',
      ),
    ).toBe(
      'bg-gradient-to-b from-[#00ffff] from-0 via-[#0ea5e9] to-[#0066ff] to-[100%]',
    )
  })

  it('background: linear-gradient(to bottom right, #00ffff 0, #0ea5e9 ,#0066ff 100%);', () => {
    expect(
      toTailwindcss(
        'background: linear-gradient(to bottom right, #00ffff 10% , #0ea5e9 20%,#0066ff 50%);',
      ),
    ).toBe(
      'bg-gradient-to-br from-[#00ffff] from-[10%] via-[#0ea5e9] via-[20%] to-[#0066ff] to-[50%]',
    )
  })

  it('background: linear-gradient(to bottom, #00ffff 0, #0ea5e9 ,#0066ff 100%);', () => {
    expect(
      toTailwindcss(
        'background: linear-gradient(to bottom, #00ffff 0, #0ea5e9 30% ,#0066ff 100%);',
      ),
    ).toBe(
      'bg-gradient-to-b from-[#00ffff] from-0 via-[#0ea5e9] via-[30%] to-[#0066ff] to-[100%]',
    )
  })

  it('background: conic-gradient(#fff 0.25turn, #000 0.25turn 0.5turn, #fff 0.5turn 0.75turn);', () => {
    expect(
      toTailwindcss(
        'background: conic-gradient(#fff 0.25turn, #000 0.25turn 0.5turn, #fff 0.5turn 0.75turn);',
      ),
    ).toBe(
      'bg-gradient-conic from-[#fff] from-[0.25turn] via-[#000] via-[0.25turn] to-[#fff] to-[0.5turn]',
    )
  })

  it('background: #eee', () => {
    expect(
      toTailwindcss(
        'background: #eee',
      ),
    ).toBe('bg-[#eee]')
  })

  it('background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 100%)', () => {
    expect(
      toTailwindcss(
        'background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 100%)',
      ),
    ).toBe(
      'bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.5)_50%,rgba(255,255,255,0)_100%)]',
    )
  })

  it('background-position: 0 0, 5px 5px', () => {
    expect(toTailwindcss('background-position: 0 0, 5px var(--xxxx, 5px)')).toBe(
      'bg-[position:0_0,5px_var(--xxxx,5px)]',
    )
  })

  it('background: left 5% / 15% 60% repeat-x url("/shared-assets/images/examples/star.png");', () => {
    expect(toTailwindcss('background: left 5% / 15% 60% repeat-x   url("/shared-assets/images/examples/star.png");')).toBe(
      'bg-[position:left_5%] bg-[length:15%_60%] bg-repeat-x bg-[url(/shared-assets/images/examples/star.png)]',
    )
  })

  it('background: 0 0, 5px 5px', () => {
    expect(toTailwindcss('background: 0 0, 5px 5px url("/shared-assets/images/examples/star.png") no-repeat')).toBe(
      'bg-[position:0_0,5px_5px] bg-[url(/shared-assets/images/examples/star.png)] bg-no-repeat',
    )
  })

  it('background-color: var(--default, red);', () => {
    expect(
      toTailwindcss(
        'background-color: var(--default, red);',
      ),
    ).toBe(
      'bg-[var(--default,red)]',
    )
  })

  it('background: var(--default, red);', () => {
    expect(
      toTailwindcss(
        'background: var(--default, red);',
      ),
    ).toBe(
      'bg-[var(--default,red)]',
    )
  })

  it('background: var(--sim-col, linear-gradient(90deg, #25AE6A 0%, #68D94B 100%));', () => {
    expect(
      toTailwindcss(
        'background: var(--sim-col, linear-gradient(90deg, #25AE6A 0%, #68D94B 100%));',
      ),
    ).toBe(
      'bg-[var(--sim-col,linear-gradient(90deg,#25AE6A_0%,#68D94B_100%))]',
    )
  })

  it('background: url(\'@/assets/images/guide/line.png\') no-repeat 8px 25px;', () => {
    expect(
      toTailwindcss(
        'background: url(\'@/assets/images/guide/line.png\') no-repeat 8px 25px;',
      ),
    ).toBe(
      'bg-[url(@/assets/images/guide/line.png)] bg-no-repeat bg-[position:8px_25px]',
    )

    expect(
      toTailwindcss(
        'background: url(\'@/assets/images/guide/line.png\') 8px 25px no-repeat;',
      ),
    ).toBe(
      'bg-[url(@/assets/images/guide/line.png)] bg-no-repeat bg-[position:8px_25px]',
    )


    expect(
      toTailwindcss(
        'background: url(https://p9-semi-sign.byteimg.com/tos-cn-i-acvclvrq33/58555135a82b413da78fca29c1e857f9.PNG?rk3s=521bdb00&x-expires=1744871326&x-signature=Z92x16k%2FRqWT5yU%2Fxj2poYUMZyI%3D)',
      ),
    ).toBe(
      'bg-[url(https://p9-semi-sign.byteimg.com/tos-cn-i-acvclvrq33/58555135a82b413da78fca29c1e857f9.PNG?rk3s=521bdb00&x-expires=1744871326&x-signature=Z92x16k%2FRqWT5yU%2Fxj2poYUMZyI%3D)]',
    )

        expect(
      toTailwindcss(
        'background-image:linear-gradient(to right, #536989 11.22%, #23282F 98.88%);',
      ),
    ).toBe(
      'bg-gradient-to-r from-[#536989] from-[11.22%] to-[#23282F] to-[98.88%]',
    )

    
  })
})
