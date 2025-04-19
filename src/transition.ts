import { getVal, transformImportant } from './utils'

const times = ['transition-delay', 'transition-duration']

export function transition(key: string, val: string) {
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
  if (times.includes(key))
    return `${key.split('-')[1]}-${value.slice(0, -2)}`
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
        return 'colors'
      return `${important}transition${getVal(item)}`
    })
    .join(' ')
}
