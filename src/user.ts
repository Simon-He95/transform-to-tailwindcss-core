import { getLastName, transformImportant } from './utils'

const userMap = [
  'user-select',
]
export function user(key: string, val: string) {
  if (!userMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  return `${important}${getLastName(key)}-${value}`
}
