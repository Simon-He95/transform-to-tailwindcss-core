import { transformImportant } from './utils'

const overscrollMap = [
  'overscroll-behavior',
  'overscroll-behavior-x',
  'overscroll-behavior-y',
]
export function overscroll(key: string, val: string) {
  if (!overscrollMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  const [prefix, _, suffix] = key.split('-')
  if (suffix)
    return `${important}${prefix}-${suffix}-${value}`
  return `${important}${prefix}-${value}`
}
