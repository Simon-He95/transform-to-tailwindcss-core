import { getFirstName, getVal, transformImportant } from './utils'

const aspectMap = [
  'aspect-ratio',
]
export function aspect(key: string, val: string) {
  if (!aspectMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  if (value === 'auto')
    return `${important}${getFirstName(key)}-${value}`
  return `${important}${getFirstName(key)}${getVal(value)}`
}
