import { isPercent, transformImportant } from './utils'

const opacityMap = [
  'opacity',
]
export function opacity(key: string, val: string) {
  if (!opacityMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  if (isPercent(val))
    return `${important}op-${value.replace(/%/g, '')}`

  return `${important}op-${+value * 100}`
}
