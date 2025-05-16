import { transformImportant } from './utils'

const whiteMap = [
  'writing-mode',
]
export function writing(key: string, val: string) {
  if (!whiteMap.includes(key))
    return
  const [value, important] = transformImportant(val)
  if (value === 'horizontal-tb')
    return `${important}write-normal`
  return `${important}write-${value.replace('-rl', '-right').replace('-lr', '-left')}`
}
