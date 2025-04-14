import {
  getVal,
  isCalc,
  joinWithUnderLine,
  transformImportant,
} from './utils'

const borderSize = [
  'border-left',
  'border-top',
  'border-right',
  'border-bottom',
]

export function border(key: string, val: string) {
  // eslint-disable-next-line prefer-const
  let [value, important] = transformImportant(val)

  if (key === 'border-spacing')
    return `${important}${key}-[${joinWithUnderLine(value)}]`
  if (key === 'border-color')
    return `${important}border${getVal(value)}`
  if (key === 'border-radius') {
    return isCalc(value)
      ? `${important}rounded${getVal(value)}`
      : `${important}rounded-[${joinWithUnderLine(value)}]`
  }
  if (borderSize.some(b => key.startsWith(b)))
    return value.split(' ').map(v => `border-${key.split('-')[1][0]}${getVal(v)}${important}`).join(' ')
  if (key === 'border-inline-end-width')
    return `${important}border-e${getVal(value)}`
  if (key === 'border-inline-start-width')
    return `${important}border-s${getVal(value)}`
  if (key.startsWith('border-image'))
    return ''
  if (key === 'border-width' && value.includes(' '))
    return value.split(' ').map((v, i) => `border-${borderSize[i].split('-')[1][0]}${getVal(v)}${important}`).join(' ')
  if (/^\d[%|(px)rem]$/.test(value) || key === 'border-collapse')
    return `${important}border-${value}`
  if (key === 'border-width' || key === 'border-style')
    return `${important}border${getVal(value)}`
  if (key === 'border-color') {
    if (value === 'currentColor')
      return `${important}border-current`
    return `${important}border${getVal(value)}`
  }

  return value.split(' ').map((v) => {
    if (value === 'currentColor')
      return `${important}border-current`
    return `${important}border${getVal(v)}`
  }).join(' ')
}
