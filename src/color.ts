import { getVal, transformImportant } from './utils'

const colorMap = ['color']
export function color(key: string, val: string) {
  if (!colorMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  return `${important}text${getVal(value)}`
}
