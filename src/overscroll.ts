import { transformImportant } from './utils'

export function overscroll(key: string, val: string) {
  const [value, important] = transformImportant(val)

  const [prefix, _, suffix] = key.split('-')
  if (suffix)
    return `${important}${prefix}-${suffix}-${value}`
  return `${important}${prefix}-${value}`
}
