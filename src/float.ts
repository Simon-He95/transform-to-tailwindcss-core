import { getVal, positionMap, transformImportant } from './utils'

const floatMap = [
  'float',
  'clear',
  'pointer-events',
  'fill',
  'order',
  'perspective',
  'columns',
  'break-inside',
  'break-before',
]
export function float(key: string, val: string) {
  if (!floatMap.includes(key))
    return
  const [value, important] = transformImportant(val)
  if (positionMap.includes(value))
    return `${important}${key}${getVal(value)}`
  return `${important}${key}${getVal(value)}`
}
