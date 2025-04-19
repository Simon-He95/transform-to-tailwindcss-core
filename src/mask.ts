import { commaReplacer, getFirstName, getVal, isDynamic, isGradient, isRgb, joinWithLine, linearGradientReg, transformImportant } from './utils'

export function mask(key: string, val: string) {
  const [value, important] = transformImportant(val)

  if (['mask-clip', 'mask-origin', 'mask-type'].includes(key))
    return `${important}${key}-${getFirstName(value)}`

  if (['mask-mode', 'mask-composite'].includes(key))
    return `${important}${getFirstName(key)}-${getFirstName(value)}`

  if (['mask-position', 'mask-size'].includes(key)) {
    if (isDynamic(value)) {
      return `${important}${key}${getVal(value)}`
    }
    return `${important}${getFirstName(key)}-${joinWithLine(value)}`
  }
  if (key === 'mask-repeat')
    return `${important}${key}-${value}`

  if (key === 'mask-image') {
    if (isGradient(value)) {
      // 区分rgba中的,和linear-gradient中的,
      const newValue = value.replace(/rgba?\(([^)]+)\)/g, (all, v) =>
        all.replace(v, v.replace(/\s*,\s*/g, commaReplacer)))

      const matcher = newValue.match(linearGradientReg)

      if (!matcher)
        return

      let [direction, from, via, to] = matcher.slice(1)
      direction = direction
        .split(' ')
        .map(item => item[0])
        .join('')
      const type = value.startsWith('linear-gradient') ? 'linear' : value.startsWith('radial-gradient') ? 'radial' : value.startsWith('conic-gradient') ? 'conic' : ''

      return direction
        ? `${getLinearGradientPosition(
          `mask-${direction}`,
          from,
          via,
          to,
        ).trim()}`
        : getLinearGradientPosition(`mask-${type}`, from, via, to).trim()
    }

    return `${important}mask${getVal(value)}`
  }
  return `${important}${key}${getVal(value)}`
}

function getLinearGradientPosition(prefix: string, from: string, via: string, to: string) {
  let result = ''
  if (via && !to) {
    to = via
    via = ''
  }
  if (from) {
    from = from.replaceAll(commaReplacer, ',')
    const [fromColor, fromPosition] = from
      .split(' ')
    if (fromPosition) {
      result += ` ${prefix}-from-${isRgb(fromColor) ? `[${fromColor}]` : fromColor
      } ${prefix}-from${getVal(fromPosition)}`
    }
    else if (fromColor) {
      result += ` ${prefix}-from-${isRgb(fromColor) ? `[${fromColor}]` : fromColor}`
    }
  }

  if (via) {
    via = via.replaceAll(commaReplacer, ',')
    const [viaColor, viaPosition] = via
      .split(' ')
    if (viaPosition) {
      result += ` ${prefix}-via${isRgb(viaColor) ? `[${viaColor}]` : viaColor
      } ${prefix}-via${getVal(viaPosition)}`
    }
    else if (viaColor) {
      result += ` ${prefix}-via${isRgb(viaColor) ? `[${viaColor}]` : viaColor}`
    }
  }

  if (to) {
    to = to.replaceAll(commaReplacer, ',')
    const [toColor, toPosition] = to
      .split(' ')
    if (toPosition) {
      result += ` ${prefix}-to-${isRgb(toColor) ? `[${toColor}]` : toColor
      } ${prefix}-to${getVal(toPosition)}`
    }
    else if (toColor) {
      result += ` ${prefix}-to-${isRgb(toColor) ? `[${toColor}]` : toColor}`
    }
  }
  return result
}
