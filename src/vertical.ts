import { getVal, transformImportant } from './utils'

const verticalMap = [
  'vertical-align',
]
export function vertical(key: string, val: string) {
  if (!verticalMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  return `${important}align${getVal(value)}`
}
