import { getCustomPropertyName, getVal, joinWithUnderLine, transformImportant } from './utils'

const fontMap = [
  'font',
  'font-size',
  'font-feature-settings',
  'font-smoothing',
  'font-stretch',
  'font-weight',
  'font-family',
  'font-style',
  'font-variant-numeric',
  'osx-font-smoothing',
]
const stretchMap = new Set([
  'ultra-condensed',
  'extra-condensed',
  'condensed',
  'semi-condensed',
  'normal',
  'semi-expanded',
  'expanded',
  'extra-expanded',
  'ultra-expanded',
])

export function font(key: string, val: string, isV4?: boolean) {
  const [value, important] = transformImportant(val)

  if (key === 'font-size') {
    if (['inherit', 'initial', 'revert', 'unset', 'revert-layer'].includes(value))
      return `${important}font-size-${value}`
    return `${important}text${getVal(value)}`
  }
  if (key === 'font-weight')
    return `${important}font-[weight:${value}]`
  if (key === 'font-feature-settings') {
    if (!isV4)
      return
    const customProperty = getCustomPropertyName(value)
    if (customProperty)
      return `${important}font-features-(${customProperty})`
    return `${important}font-features-[${value}]`
  }
  if (key === 'font-smoothing' || key === 'osx-font-smoothing') {
    if (value === 'auto')
      return `${important}subpixel-antialiased`
    if (value === 'antialiased' || value === 'grayscale')
      return `${important}antialiased`
    return
  }
  if (key === 'font-stretch') {
    if (!isV4)
      return
    const customProperty = getCustomPropertyName(value)
    if (customProperty)
      return `${important}font-stretch-(${customProperty})`
    if (stretchMap.has(value) || /^\d+(?:\.\d+)?%$/.test(value))
      return `${important}font-stretch-${value}`
    return `${important}font-stretch${getVal(value)}`
  }
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
