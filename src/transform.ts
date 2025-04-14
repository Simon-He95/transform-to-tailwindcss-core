import {
  getHundred,
  getVal,
  isVar,
  joinEmpty,
  joinWithLine,
  joinWithUnderLine,
  transformImportant,
} from './utils'

export function transform(key: string, val: string) {
  const [v, important] = transformImportant(val)
  if (key === 'transform-origin')
    return `origin-${/\d/.test(v) && v.includes(' ') ? `[${joinWithUnderLine(v)}]` : joinWithLine(v)}${important}`
  if (key === 'transform-style')
    return `${important}transform-${v}`
  if (val === 'none')
    return `${key}-none`

  return joinEmpty(v)
    .split(' ')
    .map((v) => {
      const matcher = v.match(/([a-z]+)([A-Z])?\((.*)\)/)
      if (!matcher)
        return undefined
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, namePrefix, nameSuffix, value] = matcher
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
          return `${important}${namePrefix}${isVar(value)
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

