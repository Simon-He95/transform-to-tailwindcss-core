import { getLastName, getVal, transformImportant } from './utils'

const wordMap = [
  'word-break',
  'word-spacing',
  'word-wrap',
  'overflow-wrap',
]
export function word(key: string, val: string) {
  if (!wordMap.includes(key))
    return
  const [value, important] = transformImportant(val)
  if (key.startsWith('word-spacing'))
    return `${important}word-spacing${getVal(val)}`
  if (value === 'keep-all')
    return `${important}break-keep`
  if (value === 'break-word')
    return `${important}break-words`
  return `${important}break-${getLastName(value)}`
}
