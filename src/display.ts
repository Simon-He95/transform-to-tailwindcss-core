import { transformImportant } from './utils'

const displayMap = [
  'display',
  'visibility',
  'position',
]
export function display(key: string, val: string) {
  if (!displayMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  if (value === 'none')
    return `${important}hidden`
  if (value === 'hidden')
    return `${important}invisible`
  return `${important}${value}`
}
