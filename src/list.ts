import { getFirstName, getVal, transformImportant } from './utils'

const listMap = [
  'list-style',
  'list-style-type',
  'list-style-position',
  'list-style-image',
  'caption-side',
  'appearance',
  'touch-action',
  'table-layout',
  'caret-color',
  'backface-visibility',
  'stroke-width',
  'stroke',
  'accent',
  'accent-color',
]
export function list(key: string, val: string) {
  if (!listMap.includes(key))
    return
  const [value, important] = transformImportant(val)
  if (key === 'list-style-image') {
    if (value === 'none') {
      return `${important}${getFirstName(key)}-none`
    }
    return `${important}${getFirstName(key)}${getVal(value)}`
  }
  return `${important}${getFirstName(key)}${getVal(value)}`
}
