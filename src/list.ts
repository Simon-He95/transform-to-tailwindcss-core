import { getFirstName, getVal, positionMap, transformImportant } from './utils'

export function list(key: string, val: string) {
  const [value, important] = transformImportant(val)
  if (positionMap.includes(value))
    return `${important}${getFirstName(key)}-${value}`
  return `${important}${getFirstName(key)}${getVal(value)}`
}
