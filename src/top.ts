import { getVal, transformImportant } from './utils'

const topMap = [
  'top',
  'right',
  'bottom',
  'left',
  'field-sizing',
  'forced-color-adjust',
  'hyphens',
  'gap',
  'gap-x',
  'gap-y',
]
export function top(key: string, val: string) {
  if (!topMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  return `${important}${key}${getVal(value)}`
}
