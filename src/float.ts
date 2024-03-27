import { getVal, positionMap, transformImportant } from './utils'

export function float(key: string, val: string) {
  const [value, important] = transformImportant(val)
  if (positionMap.includes(value))
    return `${important}${key}-${value}`
  return `${important}${key}${getVal(value)}`
}
