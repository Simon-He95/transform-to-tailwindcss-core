import { getCustomPropertyName, getVal, transformImportant } from './utils'

const lineKey: Record<string, string> = {
  1: 'none',
  1.25: 'tight',
  1.375: 'snug',
  1.5: 'normal',
  1.625: 'relaxed',
  2: 'loose',
}
const lineMap = [
  'line-clamp',
  'line-height',
]
export function line(key: string, val: string, isV4?: boolean) {
  if (!lineMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  if (key === 'line-clamp') {
    if (value === 'none' || value === 'unset')
      return `${important}line-clamp-none`

    const customProperty = getCustomPropertyName(value)
    if (isV4 && customProperty)
      return `${important}line-clamp-(${customProperty})`

    if (/^\d+$/.test(value))
      return `${important}line-clamp-${value}`

    return `${important}line-clamp${getVal(value)}`
  }

  if (lineKey[value])
    return `${important}leading-${lineKey[value]}`

  return `${important}leading${getVal(value, v => /\d$/.test(v) ? `[${v}]` : v)}`
}
