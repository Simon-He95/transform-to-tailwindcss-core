import { transformImportant } from './utils'

const overflowMap = [
  'overflow',
  'overflow-x',
  'overflow-y',
  'overflow-wrap',
]
export function overflow(key: string, val: string) {
  if (!overflowMap.includes(key))
    return
  const [value, important] = transformImportant(val)
  if (key === 'overflow-wrap')
    return `${important}wrap-${value}`
  return `${important}${key}-${value}`
}
