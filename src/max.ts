import { getCustomPropertyName, getFirstName, getVal, isCalc, isVar, normalizeFraction, transformImportant } from './utils'

const maxMap = [
  'max-height',
  'max-width',
  'max-block-size',
  'max-inline-size',
  'min-height',
  'min-width',
  'min-block-size',
  'min-inline-size',
]
const prefixMap: Record<string, string> = {
  'max-height': 'max-h',
  'max-width': 'max-w',
  'max-block-size': 'max-block',
  'max-inline-size': 'max-inline',
  'min-height': 'min-h',
  'min-width': 'min-w',
  'min-block-size': 'min-block',
  'min-inline-size': 'min-inline',
}

export function max(key: string, val: string, isV4?: boolean) {
  if (!maxMap.includes(key))
    return
  if (!isV4 && /(?:inline|block)-size$/.test(key))
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

  const attributeValue = (isCalc(value) || isVar(value)) ? getVal(value) : getVal(getFirstName(value))
  return `${important}${prefix}${attributeValue}`
}

function getSizeAlias(key: string, value: string) {
  const viewportKey = /width|inline/.test(key) ? '100vw' : '100vh'
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
    'none': 'none',
  }
  return map[value]
}
