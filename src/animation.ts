import { getVal, joinWithUnderLine, transformImportant } from './utils'

export function animation(key: string, val: string) {
  const [value, important] = transformImportant(val)

  if (key === 'animation-delay')
    return `${important}animate${getVal(value)}`
  if (key === 'animation')
    return `${important}animate-[${getVal(value, joinWithUnderLine).slice(1)}]`
  return `${important}animate-[${value}]`
}
