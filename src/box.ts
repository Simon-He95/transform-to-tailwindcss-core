import { getFirstName, transformImportant } from './utils'

const validKey = ['box-shadow', 'drop-shadow']
const boxMap = [
  'box-sizing',
  'box-decoration-break',
  'box-shadow',
  'drop-shadow',
]
export function box(key: string, val: string) {
  if (!boxMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  if (key.startsWith('box-decoration'))
    return `${important}box-decoration-${value}`
  if (key === 'box-sizing')
    return `${important}box-${getFirstName(value)}`

  if (validKey.includes(key)) {
    return `${important}shadow-[${value
      .split(' ')
      .join('_')}]`
  }
}
