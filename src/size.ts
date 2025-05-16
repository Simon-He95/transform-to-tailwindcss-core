import { getFirstName, getVal, isDynamic, transformImportant } from './utils'

const sizeMap = [
  'z-index',
  'width',
  'height',
]
export function size(key: string, val: string) {
  if (!sizeMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  return `${important}${key[0]}${getVal(value, isDynamic(value) ? undefined : getFirstName)}`
}
