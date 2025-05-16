import { getFirstName, getVal, isCalc, isVar, transformImportant } from './utils'

const maxMap = [
  'max-height',
  'max-width',
  'max-block-size',
  'max-inline-size',
  'min-height',
  'min-width',
  'min-block-size',
  'min-inline-size',
]
export function max(key: string, val: string) {
  if (!maxMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  const all = key.split('-')
  // calc value has '-'
  // getFirstName causes the value to be lost
  const attributeValue = (isCalc(value) || isVar(value)) ? getVal(value) : getVal(getFirstName(value))
  return `${important}${all[0]}-${all[1][0]}${attributeValue}`
}
