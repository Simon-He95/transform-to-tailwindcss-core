import type { TrimType } from './type'

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
  return /^#[0-9A-Fa-f]{2,}$/.test(hex)
}

export function isRgb(s: string) {
  return s.startsWith('rgb')
}

export function isPx(s: string) {
  return s.endsWith('px')
}

export function isRem(s: string) {
  return s.endsWith('rem')
}

export function isEm(s: string) {
  return s.endsWith('em')
}

export function isDeg(s: string) {
  return s.endsWith('deg')
}

export function getVal(val: string, transform?: Function) {
  if (
    isDeg(val)
    || isEm(val)
    || isEm(val)
    || isPx(val)
    || isCalc(val)
    || isUrl(val)
    || isHex(val)
    || isRgb(val)
    || isPercent(val)
  )
    return `-[${trim(val, 'all').replace(/['"]/g, '')}]`
  return `-${transform ? transform(val) : val}`
}

export function getHundred(n: string | number) {
  return +n * 100
}

export function joinWithLine(s: string) {
  return s.replace(/\s+/, ' ').split(' ').join('-')
}

export function joinWithUnderLine(s: string) {
  return s.replace(/\s+/, ' ').split(' ').join('_')
}

/**
 * 删除空格
 * @param { string } s 字符串
 * @param { TrimType } type 所有 ｜ 前置 ｜ 前后 ｜ 后置 'all' | 'pre' | 'around' | 'post'
 * @returns
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

export function transformImportant(v: string) {
  if (v.endsWith('!important'))
    return [v.replace(/\s*\!important/, '').trim(), '!']
  return [v.trim(), '']
}

export function joinEmpty(str: string) {
  return str
    .replace(/\(\s*/g, '(')
    .replace(/\s*\)/g, ')')
    .replace(/\s*,\s*/g, ',')
}
