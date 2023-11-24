import { getFirstName, transformImportant } from './utils'

export function aspect(key: string, val: string) {
  const [value, important] = transformImportant(val)

  if (value === 'auto')
    return `${getFirstName(key)}-${value}`
  return `${important}${getFirstName(key)}-[${value}]`
}
