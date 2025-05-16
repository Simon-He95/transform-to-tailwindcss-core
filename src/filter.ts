import { box } from './box'
import { getHundred, getVal, transformImportant } from './utils'

const hundredMap = ['contrast', 'brightness', 'saturate']
const percent = ['grayscale', 'invert', 'sepia']
const filterMap = [
  'filter',
  'backdrop-filter',
]
export function filter(key: string, val: string) {
  if (!filterMap.includes(key))
    return
  const [v, important] = transformImportant(val)

  const [_, name, value] = v.match(/([\w-]+)\((.*)\)/)!

  if (hundredMap.includes(name) || percent.includes(name)) {
    const hundred = getHundred(value)
    if (Number.isNaN(hundred))
      return `${important}${name}${getVal(value)}`
    return `${important}${name}${getVal(getHundred(value))}`
  }

  if (name === 'drop-shadow')
    return `${important}drop-${box(name, value)}`

  if (name === 'hue-rotate')
    return `${important}${name}${getVal(value.slice(0, -3))}`
  return `${important}${name}${getVal(value)}`
}
