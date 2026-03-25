import { getCustomPropertyName, getFirstName, getVal, normalizeFraction, transformImportant } from './utils'

const aspectMap = [
  'aspect-ratio',
]
export function aspect(key: string, val: string, isV4?: boolean) {
  if (!aspectMap.includes(key))
    return
  const [value, important] = transformImportant(val)
  const prefix = getFirstName(key)

  if (value === 'auto')
    return `${important}${prefix}-${value}`

  if (isV4) {
    const customProperty = getCustomPropertyName(value)
    if (customProperty) {
      if (customProperty === '--aspect-video')
        return `${important}aspect-video`
      return `${important}aspect-(${customProperty})`
    }

    const normalized = normalizeFraction(value)
    if (normalized === '1/1')
      return `${important}aspect-square`
    if (/^\d+\/\d+$/.test(normalized))
      return `${important}aspect-${normalized}`
  }

  return `${important}${prefix}${getVal(value)}`
}
