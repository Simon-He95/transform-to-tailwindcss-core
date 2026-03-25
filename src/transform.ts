import {
  getCustomPropertyName,
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
  'perspective',
  'perspective-origin',
  'rotate',
  'scale',
  'skew',
  'translate',
]

export function transform(key: string, val: string, isV4?: boolean) {
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

  if (key === 'perspective')
    return getBaseUtility('perspective', v, important, isV4)

  if (key === 'perspective-origin') {
    if (!isV4)
      return
    return getBaseUtility('perspective-origin', v, important, isV4)
  }

  if (key === 'rotate')
    return getRotateUtility(v, important, isV4)

  if (key === 'scale')
    return getScaleUtility(splitTransformValues(v), important, isV4)

  if (key === 'skew')
    return getSkewUtility(splitTransformValues(v), important, isV4)

  if (key === 'translate')
    return getTranslateUtility(splitTransformValues(v), important, isV4, true)

  if (v === 'none')
    return `${important}${key}-none`

  return joinEmpty(v)
    .split(' ')
    .map((item) => {
      const matcher = item.match(/([a-z]+)(3d)?([A-Z])?\((.*)\)/)
      if (!matcher)
        return undefined

      const [_, namePrefix, _is3d, nameSuffix, value] = matcher
      const values = splitTransformValues(value)
      const axis = nameSuffix?.toLowerCase()

      if (namePrefix === 'rotate')
        return getRotateUtility(values[0], important, isV4, axis)
      if (namePrefix === 'scale')
        return getScaleUtility(values, important, isV4, axis)
      if (namePrefix === 'translate')
        return getTranslateUtility(values, important, isV4, false, axis)
      if (namePrefix === 'skew')
        return getSkewUtility(values, important, isV4, axis)
      return undefined
    })
    .filter(Boolean)
    .join(' ')
}

function splitTransformValues(value: string) {
  return joinEmpty(value)
    .replace(
      /,(?![^()]*\))/g,
      ' ',
    )
    .split(' ')
    .filter(Boolean)
}

function getBaseUtility(prefix: string, value: string, important: string, isV4?: boolean) {
  const customProperty = getCustomPropertyName(value)
  if (isV4 && customProperty)
    return `${important}${prefix}-(${customProperty})`
  if (prefix === 'perspective-origin' && value.includes(' ')) {
    if (!/\d/.test(value) && !isVar(value) && !isCalc(value))
      return `${important}${prefix}-${joinWithLine(value)}`
    return `${important}${prefix}-[${joinWithUnderLine(value)}]`
  }
  return `${important}${prefix}${getVal(value)}`
}

function getRotateUtility(value: string, important: string, isV4?: boolean, axis?: string) {
  const prefix = axis ? `rotate-${axis}` : 'rotate'
  if (!axis && value === 'none')
    return `${important}rotate-none`

  const customProperty = getCustomPropertyName(value)
  if (isV4 && customProperty)
    return `${important}${prefix}-(${customProperty})`

  const simpleAngle = getSimpleAngle(value)
  if (isV4 && simpleAngle) {
    const [negative, amount] = simpleAngle
    return `${important}${negative ? '-' : ''}${prefix}-${amount}`
  }

  return `${important}${prefix}${getVal(value)}`
}

function getScaleUtility(values: string[], important: string, isV4?: boolean, axis?: string): string {
  const prefix = axis ? `scale-${axis}` : 'scale'
  if (!axis && values[0] === 'none')
    return `${important}scale-none`

  if (values.length > 1) {
    if (!axis && values.every(value => value === values[0]))
      return getScaleUtility([values[0]], important, isV4)
    return `${important}${prefix}-[${values.join('_')}]`
  }

  const value = values[0]
  const customProperty = getCustomPropertyName(value)
  if (isV4 && customProperty)
    return `${important}${prefix}-(${customProperty})`

  const scaleAmount = getScaleAmount(value)
  if (isV4 && scaleAmount) {
    const [negative, amount] = scaleAmount
    return `${important}${negative ? '-' : ''}${prefix}-${amount}`
  }

  return `${important}${prefix}${isVar(value) || isCalc(value)
    ? `-[${value}]`
    : getVal(getHundred(value))}`
}

function getTranslateUtility(
  values: string[],
  important: string,
  isV4?: boolean,
  isDirectProperty = false,
  axis?: string,
) {
  if (axis)
    return getTranslateAxisUtility(axis, values[0], important, isV4)

  if (values[0] === 'none')
    return `${important}translate-none`

  if (values.length > 1) {
    if (isV4 && values.every(value => value === values[0]))
      return getTranslatePairUtility(values[0], important, isV4)

    return values
      .slice(0, 3)
      .map((value, index) => getTranslateAxisUtility(['x', 'y', 'z'][index], value, important, isV4))
      .join(' ')
  }

  if (!isDirectProperty)
    return getTranslateAxisUtility('x', values[0], important, isV4)

  return getTranslatePairUtility(values[0], important, isV4)
}

function getTranslatePairUtility(value: string, important: string, isV4?: boolean) {
  const customProperty = getCustomPropertyName(value)
  if (isV4 && customProperty)
    return `${important}translate-(${customProperty})`

  const alias = getTranslateAlias(value)
  if (isV4 && alias)
    return `${important}${alias[0] ? '-' : ''}translate-${alias[1]}`

  return `${important}translate${getVal(value)}`
}

function getTranslateAxisUtility(axis: string, value: string, important: string, isV4?: boolean) {
  const prefix = `translate-${axis}`
  const customProperty = getCustomPropertyName(value)
  if (isV4 && customProperty)
    return `${important}${prefix}-(${customProperty})`

  const alias = getTranslateAlias(value)
  if (isV4 && alias)
    return `${important}${alias[0] ? '-' : ''}${prefix}-${alias[1]}`

  return `${important}${prefix}${getVal(value)}`
}

function getSkewUtility(values: string[], important: string, isV4?: boolean, axis?: string): string {
  if (axis)
    return getSkewAxisUtility(axis, values[0], important, isV4)

  if (values.length > 1) {
    return values
      .slice(0, 2)
      .map((value, index) => getSkewAxisUtility(['x', 'y'][index], value, important, isV4))
      .join(' ')
  }

  return getSkewAxisUtility('x', values[0], important, isV4)
}

function getSkewAxisUtility(axis: string, value: string, important: string, isV4?: boolean) {
  const prefix = `skew-${axis}`
  const customProperty = getCustomPropertyName(value)
  if (isV4 && customProperty)
    return `${important}${prefix}-(${customProperty})`

  const simpleAngle = getSimpleAngle(value)
  if (isV4 && simpleAngle) {
    const [negative, amount] = simpleAngle
    return `${important}${negative ? '-' : ''}${prefix}-${amount}`
  }

  return `${important}${prefix}${getVal(value)}`
}

function getSimpleAngle(value: string) {
  const match = value.match(/^(-?)(\d+)deg$/)
  if (!match)
    return
  return [match[1] === '-', match[2]] as const
}

function getScaleAmount(value: string) {
  if (value === '0')
    return [false, '0'] as const
  if (/^-?\d+$/.test(value))
    return [value.startsWith('-'), String(Math.abs(Number(value) * 100))] as const

  const match = value.match(/^(-?)(\d*\.?\d+)$/)
  if (match) {
    const amount = Number.parseFloat(match[2]) * 100
    if (Number.isInteger(amount))
      return [match[1] === '-', String(amount)] as const
  }

  const percentMatch = value.match(/^(-?)(\d+(?:\.\d+)?)%$/)
  if (percentMatch && !percentMatch[2].includes('.'))
    return [percentMatch[1] === '-', percentMatch[2]] as const
}

function getTranslateAlias(value: string) {
  if (value === '1px')
    return [false, 'px'] as const
  if (value === '-1px')
    return [true, 'px'] as const
  if (value === '100%')
    return [false, 'full'] as const
  if (value === '-100%')
    return [true, 'full'] as const
  if (/^-?\d+\/\d+$/.test(value)) {
    return [value.startsWith('-'), value.replace(/^-/, '')] as const
  }
}
