import { transformImportant } from './utils'

export function overflow(key: string, val: string) {
  const [value, important] = transformImportant(val)
  if (key === 'overflow-wrap')
    return `${important}wrap-${value}`
  return `${important}${key}-${value}`
}
