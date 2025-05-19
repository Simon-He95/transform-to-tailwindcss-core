import { getVal, joinWithUnderLine, transformImportant } from './utils'

const fontMap = [
  'font',
  'font-size',
  'font-weight',
  'font-family',
  'font-style',
  'font-variant-numeric',
]
export function font(key: string, val: string) {
  const [value, important] = transformImportant(val)

  if (key === 'font-size') {
    if (['inherit', 'initial', 'revert', 'unset', 'revert-layer'].includes(value))
      return `${important}font-size-${value}`
    return `${important}text${getVal(value)}`
  }
  if (key === 'font-weight')
    return `${important}font-[weight:${value}]`
  if (key === 'font-family') {
    const match = value.match(/ui-(\w{0,4})/)!
    if (!match)
      return `${important}font-[family-name:${joinWithUnderLine(val)}]`
    const [_, family] = match
    return `${important}font-${family}`
  }
  if (key === 'font-style') {
    if (value === 'normal')
      return `${important}not-italic`
    if (value === 'italic')
      return `${important}italic`
    return
  }
  if (key === 'font-variant-numeric') {
    if (value === 'normal')
      return `${important}normal-nums`
    return `${important}${value}`
  }
  return transformFont(value, important)
}

function transformFont(v: string, important: string) {
  return v
    .split(' ')
    .map(item =>
      /^\d/.test(item)
        ? `${important}text-[${item}]`
        : `${important}font-${item}`,
    )
    .join(' ')
}
