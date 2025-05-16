import { filter } from './filter'
import { transformImportant } from './utils'

const backdropMap = [
  'backdrop-filter',
]
export function backdrop(key: string, val: string) {
  if (!backdropMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  return `${important}backdrop-${filter(key, value)}`
}
