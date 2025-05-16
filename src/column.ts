import { getVal, transformImportant } from './utils'

const columnMap = [
  'column-gap',
]
export function column(key: string, val: string) {
  if (!columnMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  if (key === 'column-gap')
    return `${important}gap-x${getVal(value)}`
  return `${important}${key}${getVal(value)}`
}
