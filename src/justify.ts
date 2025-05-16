import { getLastName, transformImportant } from './utils'

const justifyMap = [
  'justify',
  'justify-content',
  'justify-items',
  'justify-self',
]
export function justify(key: string, val: string) {
  if (!justifyMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  if (value.includes(' ')) {
    return `${key}-${value.split(' ').reverse().map(getLastName).join('-')}${important}`
  }
  if (key === 'justify-content')
    return `${important}justify-${getLastName(value)}`
  return `${important}${key}-${getLastName(value)}`
}
