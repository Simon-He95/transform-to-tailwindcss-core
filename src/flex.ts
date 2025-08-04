import {
  getFirstName,
  getLastName,
  getVal,
  joinWithUnderLine,
  transformImportant,
} from './utils'

const lastMaps = ['flex-basis', 'flex-shrink']
const flexMap = [
  'flex',
  'flex-grow',
  'flex-shrink',
  'flex-basis',
  'flex-wrap',
  'flex-direction',
]
export function flex(key: string, val: string) {
  if (!flexMap.includes(key))
    return
  const [value, important] = transformImportant(val)
  if (key === 'flex-shrink' && value === '1')
    return `${important}shrink`
  if (key === 'flex-grow') {
    if (value === '1')
      return `${important}flex-grow`
    return `${important}flex-grow-${value}`
  }
  if (lastMaps.includes(key))
    return `${important}${getLastName(key)}${getVal(value)}`
  if (value === '1')
    return `${important}flex-1`
  const firstVal = value[0]
  if (key === 'flex' && (firstVal === '0' || firstVal === '1'))
    return `${important}flex-[${joinWithUnderLine(value)}]`

  return `${important}${getFirstName(key)}-${value.replace('column', 'col')}`
}
