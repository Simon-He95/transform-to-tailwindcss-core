import { toTailwindcss } from './toTailwindcss'
import { transformStyleToTailwindPre } from './transformer'
import { browserReg } from './utils'

export function transformStyleToTailwindcss(
  styles: string,
  isRem?: boolean,
  debug?: boolean,
): [string, string[]] {
  const log = debug ? console.log : () => {}
  
  log('🔍 [DEBUG] Input styles:', styles)
  log('🔍 [DEBUG] isRem:', isRem)
  
  // 如果存在未能被转换的style应该返回并保持部分的style
  const noTransfer: string[] = []
  const cache = new Set()
  const { newStyle, transformedResult } = transformStyleToTailwindPre(styles)
  
  log('🔍 [DEBUG] After transformStyleToTailwindPre:', { newStyle, transformedResult })

  if (transformedResult) {
    log('🔍 [DEBUG] Using transformedResult path')
    const result = [transformedResult, newStyle.split(';')
      .filter(Boolean)
      .reduce((result: string, cur: string) => {
        const key = cur.replaceAll(browserReg, '').trim()
        log('🔍 [DEBUG] Processing style:', cur, '-> key:', key)
        
        if (cache.has(key)) {
          log('🔍 [DEBUG] Skipping duplicate key:', key)
          return result
        }
        cache.add(key)
        
        const val = toTailwindcss(key, isRem) || ''
        log('🔍 [DEBUG] Converted to Tailwind:', key, '->', val)
        
        if (!val) {
          log('🔍 [DEBUG] No conversion found, adding to noTransfer:', cur)
          noTransfer.push(cur)
        }
        return (result += `${val} `)
      }, '')
      .trim()
      .replace(/\s+/g, ' ')].filter(Boolean).join(' ')
    
    log('🔍 [DEBUG] Final result (transformedResult path):', result)
    log('🔍 [DEBUG] noTransfer:', noTransfer)
    
    return [result, noTransfer]
  }

  log('🔍 [DEBUG] Using fallback path')
  const result = styles
    .split(';')
    .filter(Boolean)
    .reduce((result, cur) => {
      const key = cur.replaceAll(browserReg, '').trim()
      log('🔍 [DEBUG] Processing style:', cur, '-> key:', key)
      
      if (cache.has(key)) {
        log('🔍 [DEBUG] Skipping duplicate key:', key)
        return result
      }
      cache.add(key)
      
      const val = toTailwindcss(key, isRem) || ''
      log('🔍 [DEBUG] Converted to Tailwind:', key, '->', val)
      
      if (!val) {
        log('🔍 [DEBUG] No conversion found, adding to noTransfer:', cur)
        noTransfer.push(cur)
      }
      return (result += `${val} `)
    }, '')
    .trim()
    .replace(/\s+/g, ' ')
  
  log('🔍 [DEBUG] Final result (fallback path):', result)
  log('🔍 [DEBUG] noTransfer:', noTransfer)
  
  return [result, noTransfer]
}
