import { getLastName, transformImportant } from './utils'

const placeMap = [
  'place-content',
  'place-items',
  'place-self',
]
export function place(key: string, val: string) {
  if (!placeMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  if (value.includes(' ')) {
    return `${key}-${value.split(' ').reverse().map(getLastName).join('-')}${important}`
  }
  return `${important}${key}-${getLastName(value)}`
}
