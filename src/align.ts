import { getLastName, transformImportant } from './utils'

const alignMap = [
  'align-self',
  'align-items',
  'align-content',
]
export function align(key: string, val: string) {
  if (!alignMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  return `${important}${getLastName(key)}-${value.split(' ').reverse().map(getLastName).join('-')}`
}
