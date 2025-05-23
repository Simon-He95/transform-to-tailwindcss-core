import { getLastName, getVal, transformImportant } from './utils'

const times = ['transition-delay', 'transition-duration']

const transitionMap = [
  'transition',
  'transition-property',
  'transition-duration',
  'transition-delay',
  'transition-timing-function',
  'transition-behavior',
]
export function transition(key: string, val: string) {
  if (!transitionMap.includes(key))
    return
  const [value, important] = transformImportant(val)
  if (key === 'transition-timing-function') {
    if (value === 'linear')
      return `${important}ease-${value}`
    return `${important}ease-[${value}]`
  }
  if (key === 'transition')
    return transformTransition(value, important)

  if (key === 'transition-property') {
    if (value.includes('color'))
      return `${important}transition-color`
    if (value === 'box-shadow')
      return `${important}transition-shadow`
    return `${important}transition-${value}`
  }
  if (key === 'transition-behavior')
    return `${important}transition-${getLastName(value)}`

  const _val = getVal(value)

  if (_val === `-${value}` && times.includes(key)) {
    let num = value.trim()
    if (num.endsWith('ms')) {
      num = num.replace(/ms$/, '')
    }
    else if (num.endsWith('s')) {
      num = (Number.parseFloat(num.replace(/s$/, '')) * 1000).toString()
    }
    return `${important}${key.split('-')[1]}-${num}`
  }
  return `${important}${key.split('-')[1]}${_val}`
}

function transformTransition(v: string, important: string) {
  let hasDuration = false
  return v
    .split(' ')
    .map((item) => {
      if (/^\d/.test(item) || /^\.\d/.test(item)) {
        if (hasDuration)
          return `${important}delay${getVal(item, undefined)}`
        hasDuration = true
        return `${important}duration${getVal(item, undefined)}`
      }
      if (item === 'background-color')
        return `${important}transition-colors`

      if (/^(?:linear|ease|ease-in|ease-out|ease-in-out|step-start|step-end)$/.test(item)) {
        // 常见的时间函数，与 animation-timing-function 处理一致
        return `${important}ease-[${item}]`
      }
      else if (item.startsWith('cubic-bezier') || item.startsWith('steps')) {
        // 自定义时间函数，与 animation-timing-function 处理一致
        return `${important}ease-[${item}]`
      }
      return `${important}transition${getVal(item)}`
    })
    .join(' ')
}
