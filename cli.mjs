#!/usr/bin/env node --no-warnings

import { transformStyleToTailwindcss } from './dist/index.js'

const args = process.argv.slice(2)

function showHelp() {
  console.log(`
🎨 Transform to Tailwind CSS Core CLI

Usage:
  transform-to-tailwind [options] "<css-styles>"

Options:
  -r, --rem         Convert pixel values to rem units
  -d, --debug       Enable debug mode with detailed logs
  -h, --help        Show this help message
  -v, --version     Show version number

Examples:
  transform-to-tailwind "color: red; font-size: 16px"
  transform-to-tailwind --rem "margin: 8px; padding: 16px"
  transform-to-tailwind --debug "display: flex; justify-content: center"

Documentation: https://github.com/Simon-He95/transform-to-tailwindcss-core#readme
`)
}

function showVersion() {
  import('./package.json', { assert: { type: 'json' } })
    .then(pkg => console.log(`v${pkg.default.version}`))
    .catch(() => console.log('Version not found'))
}

if (args.length === 0 || args.includes('-h') || args.includes('--help')) {
  showHelp()
  process.exit(0)
}

if (args.includes('-v') || args.includes('--version')) {
  showVersion()
  process.exit(0)
}

const isRem = args.includes('-r') || args.includes('--rem')
const isDebug = args.includes('-d') || args.includes('--debug')
const cssStyles = args.find(arg => !arg.startsWith('-')) || ''

if (!cssStyles) {
  console.error('❌ Error: Please provide CSS styles to transform')
  console.log('Use --help for usage information')
  process.exit(1)
}

try {
  const [tailwindClasses, unconverted] = transformStyleToTailwindcss(cssStyles, isRem, isDebug)
  
  console.log('✅ Transformation completed!')
  console.log(`📝 Input: ${cssStyles}`)
  console.log(`🎨 Tailwind: ${tailwindClasses}`)
  
  if (unconverted.length > 0) {
    console.log(`⚠️  Unconverted: ${unconverted.join('; ')}`)
  }
} catch (error) {
  console.error('❌ Error during transformation:', error.message)
  process.exit(1)
}
