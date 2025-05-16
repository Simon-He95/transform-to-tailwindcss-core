import { joinWithUnderLine, transformImportant } from './utils'

const animationMap = [
  'animation',
  'animation-name',
  'animation-duration',
  'animation-delay',
  'animation-timing-function',
  'animation-iteration-count',
  'animation-direction',
  'animation-fill-mode',
  'animation-play-state',
]
export function animation(key: string, val: string) {
  if (!animationMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  return `${important}animate-[${joinWithUnderLine(value)}]`
}
