import { transformImportant } from './utils'

export function writing(key: string, val: string) {
  const [value, important] = transformImportant(val)
  if (value === 'horizontal-tb')
    return `${important}write-normal`
  return `${important}write-${value.replace('-rl', '-right').replace('-lr', '-left')}`
}
