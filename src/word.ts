import { getLastName, getVal, transformImportant } from './utils'

export function word(key: string, val: string) {
  const [value, important] = transformImportant(val)
  if (key.startsWith('word-spacing'))
    return `${important}word-spacing${getVal(val)}`
  if (value === 'keep-all')
    return `${important}break-keep`
  if (value === 'break-word')
    return `${important}break-words`
  return `${important}break-${getLastName(value)}`
}
