import { getVal, transformImportant } from './utils'

const zMap = [
  'z-index',
]
const valueMap = [
  '0',
  '10',
  '20',
  '30',
  '40',
  '50',
  'auto',
]
export function z(key: string, val: string) {
  if (!zMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  if (valueMap.includes(value)) {
    return `${important}${key[0]}-${value}`
  }
  return `${important}${key[0]}${getVal(value, undefined, undefined, true)}`
}
