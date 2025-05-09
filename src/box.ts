import { getFirstName, transformImportant } from './utils'

const validKey = ['box-shadow', 'drop-shadow']
export function box(key: string, val: string) {
  // eslint-disable-next-line prefer-const
  let [value, important] = transformImportant(val)

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
