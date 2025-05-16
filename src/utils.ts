import type { TrimType } from './type'

export const cssMathFnRE = /^(?:calc|clamp|min|max)\s*\(.*\)/
export const numberWithUnitRE = /^-?[0-9.]+(px|rem|em|%|vw|vh|vmin|vmax|deg|s|ms)$/
export const positionMap = ['top', 'right', 'bottom', 'left', 'center']

export function isCalc(s: string) {
  return s.startsWith('calc(')
}

export function getFirstName(s: string) {
  return s.split('-')[0]
}

export function getLastName(s: string) {
  const all = s.split('-')
  return all[all.length - 1]
}

export function isUrl(s: string) {
  return s.startsWith('url(')
}

export function isPercent(s: string) {
  return s.endsWith('%')
}

export function isHex(hex: string) {
  return /^#[0-9A-F]{2,}$/i.test(hex)
}

export function isRgb(s: string) {
  return s.startsWith('rgb')
}

export function isHsl(s: string) {
  return s.startsWith('hsl')
}

export function isGradient(s: string) {
  return s.startsWith('linear-gradient') || s.startsWith('radial-gradient') || s.startsWith('conic-gradient')
}

export function isCubicBezier(s: string) {
  return s.startsWith('cubic-bezier')
}

export function isAttr(s: string) {
  return /^attr\(/i.test(s)
}

export function isRepeatingLinearGradient(s: string) {
  return /^repeating-linear-gradient\(/i.test(s)
}

export function isRepeatingRadialGradient(s: string) {
  return /^repeating-radial-gradient\(/i.test(s)
}

export function isConstant(s: string) {
  return /^constant\(/.test(s)
}

export function isEnv(s: string) {
  return /^env\(/.test(s)
}

export function isFraction(s: string) {
  return /^\d+\/\d+$/.test(s)
}

export function isDynamic(val: string) {
  return isFraction(val) || isUrl(val) || isColor(val) || cssMathFnRE.test(val) || numberWithUnitRE.test(val) || isGradient(val) || isVar(val) || isCalc(val) || isCubicBezier(val) || isAttr(val) || isRepeatingLinearGradient(val) || isRepeatingRadialGradient(val) || isConstant(val) || isEnv(val)
}

export function getVal(val: string | number, transform?: (v: string) => string, prefix = '', isDynamicFlag = false) {
  val = String(val)
  if (isDynamicFlag || isDynamic(val))
    return `-[${prefix}${trim(transform ? transform(val) : val, 'all').replace(/['"]/g, '')}]`
  return prefix
    ? `-[${prefix}${transform ? transform(val) : val}]`
    : `-${transform ? transform(val) : val}`
}

export function getHundred(n: string): string | number {
  if (n.endsWith('%') || n.endsWith('deg') || n === '0')
    return n
  const v = +n * 100
  return Number.isNaN(v) ? v : `${v}%`
}

export function joinWithLine(s: string) {
  return s.replace(/\s+/g, ' ').split(/\s/g).join('-')
}

export function joinWithUnderLine(s: string) {
  return s.replace(/\s+/g, ' ').split(/\s/g).join('_')
}

/**
 * 删除空格
 * @param { string } s 字符串
 * @param { TrimType } type 所有 ｜ 前置 ｜ 前后 ｜ 后置 'all' | 'pre' | 'around' | 'post'
 * @returns { string } 删除空格后的字符串
 */
export function trim(s: string, type: TrimType = 'around'): string {
  if (type === 'pre')
    return s.replace(/(^\s*)/g, '')
  if (type === 'post')
    return s.replace(/(\s*$)/g, '')
  if (type === 'all')
    return s.replace(/\s+/g, '')
  if (type === 'around')
    return s.replace(/(^\s*)|(\s*$)/g, '')
  return s
}

export function transformImportant(v: string, trimSpace = true) {
  if (trimSpace) {
    v = v.replace(/\s+/g, ' ')
      .replace(/\s*,\s*/g, ',')
      .replace(/\s*\/\s*/g, '/')
  }

  if (/calc\([^)]+\)/.test(v)) {
    v = v.replace(/calc\(([^)]+)\)/g, (all, k) => {
      return all.replace(k, k.replace(/\s/g, ''))
    })
  }
  if (/rgb/.test(v)) {
    v = v.replace(/rgba?\(([^)]+)\)/g, (all, k) => {
      const _k = k.trim().split(' ')
      return all.replace(k, _k.map((i: string, index: number) => i.endsWith(',') ? i : i + ((_k.length - 1 === index) ? '' : ',')).join(''))
    })
  }

  if (/hsl/.test(v)) {
    v = v.replace(/hsla?\(([^)]+)\)/g, (all, k) => {
      const _k = k.trim().split(' ')
      return all.replace(k, _k.map((i: string, index: number) => i.endsWith(',') ? i : i + ((_k.length - 1 === index) ? '' : ',')).join(''))
    })
  }

  if (/var\([^)]+\)/.test(v)) {
    v = v.replace(/var\(([^)]+)\)/g, (all, k) => {
      return all.replace(k, k.replace(/\s/g, '_'))
    })
  }

  if (v.endsWith('!important'))
    return [v.replace(/\s*!important/, '').trim(), '!']

  return [v.trim(), '']
}

export function joinEmpty(str: string) {
  return str
    .replace(/\(\s*/g, '(')
    .replace(/\s*\)/g, ')')
    .replace(/\s*,\s*/g, ',')
}

export function isVar(s: string) {
  return s.startsWith('var(--')
}

export function isSize(s: string) {
  return cssMathFnRE.test(s) || numberWithUnitRE.test(s) || positionMap.includes(s)
}

export function isColor(s: string) {
  return isHex(s) || isRgb(s) || isHsl(s)
}

export const browserReg = /-webkit-|-moz-|-ms-|-o-/g

export const linearGradientReg
  = /linear-gradient\(\s*to([\w\s]+),?([\-\w()#%\s.]+)?,([\-\w()#%\s.]+)?,?([\-\w#%\s.]+)?\)$/

export const linearGradientReg1
  = /linear-gradient\(\s*([^,]*),?([\-\w()#%\s.]+)?,([\-\w()#%\s.]+)?,?([\-\w#%\s.]+)?\)$/
export const otherGradientReg
  = /(radial|conic)-gradient\(([\-\w()#%\s.]+)?,([\-\w()#%\s.]+)?,?([\-\w#%\s.]+)?\)$/
export const commaReplacer = '__comma__'
