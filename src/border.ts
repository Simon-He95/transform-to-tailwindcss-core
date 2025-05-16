import {
  getVal,
  joinWithUnderLine,
  transformImportant,
} from './utils'

const borderSize = [
  'border-left',
  'border-top',
  'border-right',
  'border-bottom',
]

const widthMatchMap: Record<string, string> = {
  'inline': 'x',
  'block': 'y',
  'inline-start': 's',
  'inline-end': 'e',
  'top': 't',
  'right': 'r',
  'bottom': 'b',
  'left': 'l',
}
const radiusMatchMap: Record<string, string> = {
  top: 't',
  right: 'r',
  bottom: 'b',
  left: 'l',
  end: 'e',
  start: 's',
}
export function border(key: string, val: string) {
  const [value, important] = transformImportant(val)

  if (key === 'border-spacing')
    return `${important}${key}${getVal(value, joinWithUnderLine, '', true)}`
  if (key === 'border-color')
    return `${important}border${getVal(value)}`

  const radiusMatch = key.match(/border(-start|-end|-top|-bottom)?(-start|-end|-left|-right)?-radius/)
  if (radiusMatch) {
    const [_, start, end] = radiusMatch
    if (start && end) {
      return `${important}rounded-${radiusMatchMap[start.slice(1)]}${radiusMatchMap[end.slice(1)]}${getVal(value, joinWithUnderLine)}`
    }
    if (start || end) {
      return `${important}rounded-${radiusMatchMap[start?.slice(1) || end?.slice(1)]}${getVal(value, joinWithUnderLine)}`
    }
    return `${important}rounded${getVal(value, joinWithUnderLine, '', true)}`
  }

  const widthMatch = key.match(/border(-inline|-block|-inline-start|-inline-end|-top|-right|-bottom|-left)?-(width|color)/)
  if (widthMatch) {
    if (widthMatch[1]) {
      const widthType = widthMatchMap[widthMatch[1].slice(1)]
      return `${important}border-${widthType}${getVal(value, joinWithUnderLine, 'length:')}`
    }
    return `${important}border${getVal(value, joinWithUnderLine, 'length:')}`
  }

  if (borderSize.some(b => key.startsWith(b))) {
    const keys = key.split('-')
    if (keys.slice(-1)[0] === 'radius')
      return value.split(' ').map(v => `${important}rounded-${keys.slice(1, -1).map(s => s[0]).join('')}${getVal(v)}`).join(' ')
    return value.split(' ').map(v => `${important}border-${key.split('-')[1][0]}${getVal(v)}`).join(' ')
  }

  if (key.startsWith('border-image'))
    return

  if (/^\d[%|(px)rem]$/.test(value) || key === 'border-collapse')
    return `${important}border-${value}`
  if (key === 'border-width' || key === 'border-style')
    return `${important}border${getVal(value)}`
  if (key === 'border-color') {
    if (value === 'currentColor')
      return `${important}border-current`
    return `${important}border${getVal(value)}`
  }

  return value.split(' ').map((v) => {
    if (value === 'currentColor')
      return `${important}border-current`
    return `${important}border${getVal(v)}`
  }).join(' ')
}
