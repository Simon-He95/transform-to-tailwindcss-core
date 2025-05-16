import {
  getHundred,
  getVal,
  isCalc,
  isVar,
  joinEmpty,
  joinWithLine,
  joinWithUnderLine,
  transformImportant,
} from './utils'

const transformMap = [
  'transform',
  'transform-origin',
  'transform-style',
]
export function transform(key: string, val: string) {
  if (!transformMap.includes(key))
    return
  const [v, important] = transformImportant(val)
  if (key === 'transform-origin') {
    if (isVar(v) || isCalc(v))
      return `${important}origin${getVal(v)}`
    return `${important}origin-${/\d/.test(v) && v.includes(' ') ? `[${joinWithUnderLine(v)}]` : joinWithLine(v)}`
  }
  if (key === 'transform-style')
    return `${important}transform-${v}`
  if (val === 'none')
    return `${important}${key}-none`

  return joinEmpty(v)
    .split(' ')
    .map((v) => {
      const matcher = v.match(/([a-z]+)(3d)?([A-Z])?\((.*)\)/)
      if (!matcher)
        return undefined
      const [_, namePrefix, is3d, nameSuffix, value] = matcher
      if (nameSuffix) {
        const values = value.replace(
          /,(?![^()]*\))/g,
          ' ',
        ).split(' ')
        if (values.length > 1) {
          return `${important}${namePrefix}-[${nameSuffix.toLowerCase()}-${values.map((v) => {
            return isVar(v)
              ? v
              : getVal(
                  namePrefix === 'scale' ? getHundred(v) : v,
                )
          }).join('_')}]`
        }

        return `${important}${namePrefix}-${nameSuffix.toLowerCase()}${isVar(values[0])
          ? `-[${values[0]}]`
          : getVal(
              namePrefix === 'scale' ? getHundred(values[0]) : values[0],
            )}`
      }
      else {
        const values = value.replace(
          /,(?![^()]*\))/g,
          ' ',
        ).split(' ')
        if (namePrefix === 'scale') {
          if (values.length > 1)
            return `${important}${namePrefix}-[${values.join('_')}]`
          return `${important}${namePrefix}${isVar(value) || isCalc(value)
            ? `-[${value}]`
            : getVal(
                namePrefix === 'scale' ? getHundred(value) : value,
              )}`
        }
        const [x, y] = values
        return `${important}${namePrefix}-x${getVal(
          x,
        )} ${important}${namePrefix}-y${getVal(y ?? x)}`
      }
    })
    .filter(Boolean)
    .join(' ')
}
