import { getFirstName, joinWithLine, transformImportant } from './utils'

const objectMap = [
  'object-fit',
  'object-position',
]
export function object(key: string, val: string) {
  if (!objectMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  if (key === 'object-position')
    return `${important}${getFirstName(key)}-${joinWithLine(value)}`
  return `${important}${getFirstName(key)}-${value}`
}
