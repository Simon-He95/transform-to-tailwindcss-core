// 通用的规则处理函数
function createRuleProcessor(config: {
  allMatch: Record<string, string | RegExp>
  anyMatch?: Array<{ key: string, pattern: RegExp | string }>
  priority?: string[]
  outputTemplate: string | ((value: string) => string)
}) {
  return (v: Record<string, string>): { transformedResult: string, deleteKeys: string[] } => {
    // 规范化配置，确保所有字段都存在
    const anyMatch = config.anyMatch || []
    const priority = config.priority || []

    // 如果有 anyMatch 规则，则检查是否满足"任一匹配"条件
    let matchedAnyRule = null
    if (anyMatch.length > 0) {
      matchedAnyRule = anyMatch.find(rule =>
        v[rule.key] && (rule.pattern instanceof RegExp
          ? rule.pattern.test(v[rule.key])
          : v[rule.key] === rule.pattern),
      )

      if (!matchedAnyRule) {
        return { transformedResult: '', deleteKeys: [] }
      }
    }

    // 按优先级获取要使用的值（仅当有 anyMatch 和 priority 时）
    let valueToUse = ''
    if (anyMatch.length > 0 && priority.length > 0) {
      for (const key of priority) {
        const rule = anyMatch.find(r => r.key === key)
        if (rule && v[key] && (rule.pattern instanceof RegExp
          ? rule.pattern.test(v[key])
          : v[key] === rule.pattern)) {
          valueToUse = v[key]
          break
        }
      }
    }

    // 检查必须全部匹配的规则
    const allMatchRules = { ...config.allMatch }
    const allMatchKeys = Object.keys(allMatchRules)

    for (const key of allMatchKeys) {
      const expectedValue = allMatchRules[key]
      if (!(expectedValue instanceof RegExp
        ? expectedValue.test(v[key])
        : v[key] === expectedValue)) {
        // 有规则不匹配，直接返回空结果
        return { transformedResult: '', deleteKeys: [] }
      }
    }

    // 构建要删除的键列表
    const deleteKeys = [
      ...allMatchKeys,
      ...anyMatch.map(rule => rule.key),
    ]

    // 生成输出结果
    const transformedResult = typeof config.outputTemplate === 'function'
      ? config.outputTemplate(valueToUse)
      // eslint-disable-next-line no-template-curly-in-string
      : config.outputTemplate.replace('${value}', valueToUse)

    return {
      transformedResult,
      deleteKeys,
    }
  }
}

const transformer: Record<string, (v: Record<string, string>) => { transformedResult: string, deleteKeys: string[] }> = {
  // eslint-disable-next-line no-template-curly-in-string
  'line-clamp-${number}': createRuleProcessor({
    allMatch: {
      'overflow': 'hidden',
      'display': '-webkit-box',
      '-webkit-box-orient': 'vertical',
    },
    anyMatch: [
      { key: '-webkit-line-clamp', pattern: /\d/ },
      { key: 'line-clamp', pattern: /\d/ },
    ],
    priority: ['line-clamp', '-webkit-line-clamp'],
    outputTemplate: value => `line-clamp-${value}`,
  }),

  // eslint-disable-next-line no-template-curly-in-string
  'line-clamp-${prop}': createRuleProcessor({
    allMatch: {
      'overflow': 'visible',
      'display': 'block',
      '-webkit-box-orient': 'horizontal',
    },
    anyMatch: [
      { key: '-webkit-line-clamp', pattern: /inherit|initial|revert|unset/ },
      { key: 'line-clamp', pattern: /inherit|initial|revert|unset/ },
    ],
    priority: ['line-clamp', '-webkit-line-clamp'],
    outputTemplate: value => `line-clamp-${value}`,
  }),

  'truncate': createRuleProcessor({
    allMatch: {
      'overflow': 'hidden',
      'text-overflow': 'ellipsis',
      'white-space': 'nowrap',
    },
    // 纯 allMatch 规则，不需要 anyMatch 和 priority
    outputTemplate: () => 'truncate',
  }),

  // 您可以轻松添加更多规则
  // 例如: 'aspect-ratio-${value}': createRuleProcessor({ ... })
}

// 提前转换一些组合的预设，比如 line-clamp-xxx
export function transformStyleToTailwindPre(styles: string) {
  const preTransformedList = []
  // 需要一次性把所有的key和value都给transformer中处理，完全匹配返回新的结果，并且把使用到的属性从原来的结果中删除
  const styleToObj = styles.split(';').reduce((r: Record<string, string>, item) => {
    const [key, value] = item.split(':')
    // 导入规则函数去转换，如果没有转换成功就返回原来的值，并且从结果中删除
    if (key.trim() && value?.trim()) {
      r[key.trim()] = value.trim()
    }
    return r
  }, {})

  for (const key in transformer) {
    const { transformedResult, deleteKeys } = transformer[key](styleToObj)
    if (transformedResult && deleteKeys.length) {
      preTransformedList.push(transformedResult)
      // 删除已经转换的属性
      deleteKeys.forEach((deleteKey) => {
        delete styleToObj[deleteKey]
      })
    }
  }

  return {
    transformedResult: preTransformedList.join(' '),
    newStyle: Object.entries(styleToObj)
      .map(([key, value]) => `${key}: ${value}`)
      .join('; '),
  }
}
