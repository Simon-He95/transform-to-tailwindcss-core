import {
  getFirstName,
  getLastName,
  joinWithLine,
  joinWithUnderLine,
  transformImportant,
} from './utils'

const gridMap = [
  'grid',
  'grid-row',
  'grid-column',
  'grid-template-columns',
  'grid-template-rows',
  'grid-auto-flow',
  'grid-auto-columns',
  'grid-auto-rows',
  'grid-column-start',
  'grid-column-end',
  'grid-row-start',
  'grid-row-end',
]
export function grid(key: string, val: string) {
  if (!gridMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  if (key.startsWith('grid-template')) {
    const matcher = value.match(/repeat\s*\(\s*(\d+)/)
    if (matcher) {
      return `${important}grid-${
        getLastName(key) === 'rows' ? 'rows' : 'cols'
      }-${matcher[1]}`
    }
    return `${important}grid-${
      getLastName(key) === 'rows' ? 'rows' : 'cols'
    }-${value.includes(' ') ? `[${joinWithUnderLine(value)}]` : value}`
  }
  if (key === 'grid-auto-flow') {
    return `${important}grid-flow-${joinWithLine(value).replace(
      'column',
      'col',
    )}`
  }
  if (key.startsWith('grid-auto')) {
    const matcher = value.match(/minmax\s*\(\s*0\s*,\s*1fr/)
    return `${important}auto-${getLastName(key) === 'rows' ? 'rows' : 'cols'}-${
      matcher ? 'fr' : getFirstName(value)
    }`
  }
  const matcher = value.match(/span\s+(\d)/)
  if (matcher) {
    return `${important}${key.slice(5).replace('column', 'col')}-span-${
      matcher[1]
    }`
  }
  if (value === '1/-1')
    return `${important}${key.slice(5).replace('column', 'col')}-span-full`
  return `${important}${key.slice(5).replace('column', 'col')}-${value}`
}
