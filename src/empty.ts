import { transformImportant } from './utils'

const emptyKey: Record<string, string> = {
  show: 'visible',
  hide: 'hidden',
}
const emptyMap = [
  'empty-cells',
]
export function empty(key: string, val: string) {
  if (!emptyMap.includes(key))
    return
  const [value, important] = transformImportant(val)
  if (emptyKey[value])
    return `${important}table-empty-cells-${emptyKey[value] ?? value}`
}
