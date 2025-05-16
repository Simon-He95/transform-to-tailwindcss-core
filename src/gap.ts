import { getVal, transformImportant } from './utils'

const gapMap = [
  'gap',
  'gap-x',
  'gap-y',
]
export function transformGap(key: string, val: string) {
  if (!gapMap.includes(key))
    return
  const [value, important] = transformImportant(val)
  if (key.startsWith('column'))
    return `${important}gap-x${getVal(value)}`
  return `${important}gap-y${getVal(value)}`
}
