import { getCustomPropertyName, getFirstName, getVal, isDynamic, normalizeFraction, transformImportant } from './utils'

const sizeMap = [
  'width',
  'height',
  'inline-size',
  'block-size',
]
const prefixMap: Record<string, string> = {
  'width': 'w',
  'height': 'h',
  'inline-size': 'inline',
  'block-size': 'block',
}

export function size(key: string, val: string, isV4?: boolean) {
  if (!sizeMap.includes(key))
    return
  if (!isV4 && ['inline-size', 'block-size'].includes(key))
    return
  const [value, important] = transformImportant(val)
  const prefix = prefixMap[key]

  if (isV4) {
    const customProperty = getCustomPropertyName(value)
    if (customProperty)
      return `${important}${prefix}-(${customProperty})`

    const normalized = normalizeFraction(value)
    if (/^\d+\/\d+$/.test(normalized))
      return `${important}${prefix}-${normalized}`

    const alias = getSizeAlias(key, value)
    if (alias)
      return `${important}${prefix}-${alias}`
  }

  return `${important}${prefix}${getVal(value, isDynamic(value) ? undefined : getFirstName)}`
}

function getSizeAlias(key: string, value: string) {
  const viewportKey = ['width', 'inline-size'].includes(key) ? '100vw' : '100vh'
  const map: Record<string, string> = {
    'auto': 'auto',
    '1px': 'px',
    '100%': 'full',
    [viewportKey]: 'screen',
    '100dvw': 'dvw',
    '100dvh': 'dvh',
    '100lvw': 'lvw',
    '100lvh': 'lvh',
    '100svw': 'svw',
    '100svh': 'svh',
    'min-content': 'min',
    'max-content': 'max',
    'fit-content': 'fit',
  }
  return map[value]
}
