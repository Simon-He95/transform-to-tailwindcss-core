import { getVal, joinWithLine, transformImportant } from './utils'

const colorMap = ['color', 'color-scheme']
export function color(key: string, val: string, isV4?: boolean) {
  if (!colorMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  if (key === 'color-scheme') {
    if (!isV4)
      return
    return `${important}scheme-${joinWithLine(value)}`
  }

  return `${important}text${getVal(value)}`
}
