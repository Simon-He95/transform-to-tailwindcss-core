import { commaReplacer, getVal, isRgb, isSize, isVar, joinWithLine, joinWithUnderLine, linearGradientReg, linearGradientReg1, otherGradientReg, transformImportant } from './utils'

const backgroundMap = [
  'background-color',
  'background-attachment',
  'background-position',
  'background-size',
  'background-image',
  'background',
  'background-blend-mode',
  'background-origin',
  'background-clip',
  'background-repeat',
]

const lengthRe = '\\d*\\.?\\d+(?:px|em|rem|%|vw|vh)?'
const positionPair = `(${lengthRe})\\s+(${lengthRe})`
const optimizedReg = new RegExp(`${positionPair}\\s*,\\s*${positionPair}`)

export function background(key: string, val: string): string | undefined {
  if (!backgroundMap.includes(key))
    return
  let [value, important] = transformImportant(val)

  if (key === 'background-size') {
    return /\d/.test(value)
      ? `${important}bg${getVal(value, joinWithUnderLine, 'length:', true)}`
      : `${important}bg${getVal(value, joinWithLine, 'length:')}`
  }
  if (key === 'background-position') {
    if (/\d/.test(value))
      return `${important}bg${getVal(value, joinWithUnderLine, 'position:')}`
    return `${important}bg${getVal(value, joinWithUnderLine, 'position:')}`
  }

  if ([
    'background-color',
    'background-attachment',
  ].includes(key)) {
    return `${important}bg${getVal(value, joinWithUnderLine)}`
  }

  if (['background', 'background-image'].includes(key)) {
    if (isSize(value))
      return `${important}bg${getVal(value, joinWithLine, 'position:')}`
    const temp = value.replace(/rgba?\([^)]+\)/g, 'temp')
    if (/\)\s*,/.test(temp))
      return `bg-[${matchMultipleBgAttrs(value)}]`
    if (value.startsWith('linear-gradient')) {
      // 区分rgba中的,和linear-gradient中的,
      const newValue = value.replace(/rgba?\(([^)]+)\)/g, (all, v) =>
        all.replace(v, v.replace(/\s*,\s*/g, commaReplacer)))

      const matcher = newValue.match(linearGradientReg)
      if (matcher) {
        let [direction, from, via, to] = matcher.slice(1)

        direction = direction
          .split(' ')
          .map(item => item[0])
          .join('')

        return direction
          ? `bg-gradient-to-${direction}${getLinearGradientPosition(
            from,
            via,
            to,
          )}`
          : getLinearGradientPosition(from, via, to)
      }
      const matcher1 = newValue.match(linearGradientReg1)
      if (!matcher1) {
        // 直接使用-[处理]
        return `bg-[${matchMultipleBgAttrs(value)}]`
      }

      return `bg-gradient-linear bg-gradient-[${matcher1[1]}${matcher1[2] ? `,${matcher1[2].replace(/\s+/, '_').replaceAll(commaReplacer, ',')}` : ''},${matcher1[3].replace(/\s+/, '_').replaceAll(commaReplacer, ',')}]`
    }
    else if (/^(?:radial|conic)-gradient/.test(value)) {
      // 区分rgba中的,和linear-gradient中的,
      const newValue = value.replace(/rgba?\(([^)]+)\)/g, (all, v) =>
        all.replace(v, v.replace(/\s*,\s*/g, commaReplacer)))

      const matcher = newValue.match(otherGradientReg)
      if (!matcher)
        return ''

      // eslint-ignore @typescript-eslint/no-non-null-assertion
      const name = matcher[1]
      // eslint-disable-next-line prefer-const
      let [from, via, to] = matcher.slice(2)

      return `bg-gradient-${name}${getLinearGradientPosition(from, via, to)}`
    }
    const match = value.match(/^rgba?\([^)]+\)$/)
    if (match) {
      const rgb = match[0]
      value = value.replace(rgb, `[${rgb}]`)
    }
    const urlMatch = value.match(/^url\(["'\s.\-\w/@]*\)$/)
    if (urlMatch) {
      return `bg-${value.replace(
        urlMatch[0],
        `[${urlMatch[0].replace(/['"]/g, '')}]${important}`,
      )}`
    }

    const safeValueMap = new Map()
    // 先替换 url(...) 和 rgba(...)，避免误 split
    let i = 0
    const safeValue = value
      .replace(/url\([^)]+\)/g, (m) => {
        const key = `__URL__${i++}`
        safeValueMap.set(key, m)
        return key
      })
      .replace(/rgba?\([^)]+\)/g, (m) => {
        const key = `__RGBA__${i++}`
        safeValueMap.set(key, m)
        return key
      })

    // 检查 position/size 语法
    if (safeValue.includes('/')) {
      // 用 safeValue 分割，避免 url/rgba 中的 /
      const [positionRawSafe, afterSlashRawSafe] = safeValue.split('/').map(v => v.trim())
      // 还原原始 value 的对应部分
      // 用 safeValue 分割后再用原始 afterSlashRaw 处理
      const afterSlashPartsSafe = afterSlashRawSafe.split(/\s+/)
      const sizeParts = afterSlashPartsSafe.slice(0, 2)
      const others = afterSlashPartsSafe.slice(2).map((v) => {
        const m = v.match(/__URL__(\d+)/)
        if (m) {
          return safeValueMap.get(`__URL__${m[1]}`)
        }
        const m1 = v.match(/__RGBA__(\d+)/)
        if (m1) {
          return safeValueMap.get(`__RGBA__${m1[1]}`)
        }
        return v
      })
      const size = sizeParts.join(' ')
      const posStr = background('background-position', `${positionRawSafe}${important ? ' !important' : ''}`)
      const sizeStr = size ? background('background-size', `${size}${important ? ' !important' : ''}`) : ''
      let othersStr = ''
      if (others.length) {
        othersStr = others.map(v => background(key, `${v}${important ? ' !important' : ''}`)).join(' ')
      }
      return [posStr, sizeStr, othersStr].filter(Boolean).join(' ')
    }
    // 检查空格分隔（同样用 safeValue 判断）
    else if (safeValue.includes(' ')) {
      // 先按逗号分割多背景
      const m = safeValue.match(optimizedReg)
      if (m) {
        // 前面都被处理为 position
        const others = safeValue.replace(m[0], '').trim().split(' ').map((v) => {
          const m = v.match(/__URL__(\d+)/)
          if (m) {
            return safeValueMap.get(`__URL__${m[1]}`)
          }
          const m1 = v.match(/__RGBA__(\d+)/)
          if (m1) {
            return safeValueMap.get(`__RGBA__${m1[1]}`)
          }
          return v
        })
        let othersStr = ''
        if (others.length) {
          othersStr = others.map(v => background(key, `${v}${important ? ' !important' : ''}`)).join(' ')
        }
        const posStr: string | undefined = background('background-position', `${m[0]}${important ? ' !important' : ''}`)

        return [posStr, othersStr].filter(Boolean).join(' ')
      }
      // 处理 rgba(...) 和 url(...)，避免误 split
      const parts = safeValue.split(/\s+/).map((v) => {
        const m = v.match(/__URL__(\d+)/)
        if (m) {
          return safeValueMap.get(`__URL__${m[1]}`)
        }
        const m1 = v.match(/__RGBA__(\d+)/)
        if (m1) {
          return safeValueMap.get(`__RGBA__${m1[1]}`)
        }
        return v
      })
      let r: string = parts.map(v => background(key, `${v}${important ? ' !important' : ''}`)).join(' ')
      // 如果 r 中包含多个bg-[position:xx], 需要合并用_分隔
      const bgPositionReg = /bg-\[position:([^\]]*)\]/g
      const bgPosition = r.match(bgPositionReg)
      if (bgPosition && bgPosition.length > 1) {
        const t = `bg-[position:${bgPosition.map(item => item.replace(bgPositionReg, '$1')).join('_')}]`
        r = `${r.replace(bgPositionReg, '').replace(/\s+/g, ' ').split(' ').filter(Boolean).concat([t]).join(' ')}`
      }

      return r
    }
    return `${important}bg${getVal(value, joinWithLine)}`
  }
  else if (key === 'background-blend-mode') {
    return `${important}bg-blend-${value}`
  }
  return `${important}${replaceBackground(key, value)}-${transformBox(value)}`
}

function replaceBackground(s: string, val: string) {
  if (val.endsWith('repeat'))
    return 'bg'
  return s.replace('background', 'bg')
}

function transformBox(s: string) {
  const reg = /border|content|padding-box/
  if (reg.test(s))
    return s.replace('-box', '')
  if (s.startsWith('repeat-'))
    return s.replace('repeat-', '')
  return joinWithLine(s)
}

function getLinearGradientPosition(from: string, via: string, to: string) {
  let result = ''
  if (via && !to) {
    to = via
    via = ''
  }
  if (from) {
    from = from.replaceAll(commaReplacer, ',')
    const [fromColor, fromPosition] = from.split(' ')
    if (fromPosition) {
      result += ` from-${isRgb(fromColor) || isVar(fromColor) ? `[${fromColor}]` : fromColor
      } from-${fromPosition}`
    }
    else if (fromColor) {
      result += ` from-${isRgb(fromColor) || isVar(fromColor) ? `[${fromColor}]` : fromColor}`
    }
  }

  if (via) {
    via = via.replaceAll(commaReplacer, ',')
    const [viaColor, viaPosition] = via
      .split(' ')
    if (viaPosition) {
      result += ` via-${isRgb(viaColor) || isVar(viaColor) ? `[${viaColor}]` : viaColor
      } via-${viaPosition}`
    }
    else if (viaColor) {
      result += ` via-${isRgb(viaColor) || isVar(viaColor) ? `[${viaColor}]` : viaColor}`
    }
  }

  if (to) {
    to = to.replaceAll(commaReplacer, ',')
    const [toColor, toPosition] = to
      .split(' ')
    if (toPosition) {
      result += ` to-${isRgb(toColor) || isVar(toColor) ? `[${toColor}]` : toColor
      } to-${toPosition}`
    }
    else if (toColor) {
      result += ` to-${isRgb(toColor) || isVar(toColor) ? `[${toColor}]` : toColor}`
    }
  }
  return result
}

const CONSTANTFLAG = '__transform_to_unocss__'
function matchMultipleBgAttrs(value: string) {
  const map: any = {}
  let i = 0
  value = value.replace(/(rgba?|hsla?|lab|lch|hwb|color)\(\)*\)/, (_) => {
    map[i++] = _
    return `${CONSTANTFLAG}${i}}`
  })
  value = value.split(/\)\s*,/).map(item =>
    `${item.replace(/\s*,\s*/g, ',').replace(/\s+/g, '_')}`,
  ).join('),')
  Object.keys(map).forEach((key) => {
    value = value.replace(`${CONSTANTFLAG}${key}}`, map[key])
  })
  return value
}
