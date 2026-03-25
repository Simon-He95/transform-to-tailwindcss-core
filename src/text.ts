import { getCustomPropertyName, getVal, joinWithUnderLine, positionMap, transformImportant } from './utils'

const textMap = [
  'text-align',
  'text-align-last',
  'text-decoration',
  'text-decoration-line',
  'text-decoration-style',
  'text-decoration-color',
  'text-decoration-thickness',
  'text-indent',
  'text-underline-offset',
  'text-transform',
  'text-wrap',
  'text-overflow',
  'text-justify',
  'text-shadow',
]
export function text(key: string, val: string, isV4?: boolean) {
  if (!textMap.includes(key))
    return
  const [value, important] = transformImportant(val)
  if (positionMap.includes(value))
    return `${important}text-${value}`
  if (key === 'text-decoration-line') {
    if (value === 'none')
      return `${important}no-underline`
    return `${important}${value}`
  }
  if (key === 'text-transform') {
    if (value === 'none')
      return `${important}normal-case`
    return `${important}${value}`
  }

  if (key === 'text-decoration') {
    return value.split(' ').map(v => v ? `${important}${v}` : '').join(' ')
  }

  if (key === 'text-shadow') {
    if (!isV4)
      return `${important}text${getVal(value)}`
    if (value === 'none')
      return `${important}text-shadow-none`
    const customProperty = getCustomPropertyName(value)
    if (customProperty)
      return `${important}text-shadow-(${customProperty})`
    return `${important}text-shadow-[${joinWithUnderLine(value)}]`
  }

  if (key.startsWith('text-decoration') || key === 'text-indent')
    return `${important}${key.split('-')[1]}${getVal(value)}`

  if (key === 'text-underline-offset')
    return `${important}underline-offset-${value}`
  if (['inherit', 'initial', 'revert', 'unset', 'revert-layer'].includes(value))
    return `${important}text-align-${value}`

  return `${important}text${getVal(value)}`
}
