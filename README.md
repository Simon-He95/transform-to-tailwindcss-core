# 🎨 Transform to Tailwind CSS Core

[![npm version](https://badge.fury.io/js/transform-to-tailwindcss-core.svg)](https://badge.fury.io/js/transform-to-tailwindcss-core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![Downloads](https://img.shields.io/npm/dm/transform-to-tailwindcss-core.svg)](https://www.npmjs.com/package/transform-to-tailwindcss-core)

> 🚀 A powerful, lightweight core library to transform CSS styles or style objects into Tailwind CSS utility classes. Perfect for migration projects and dynamic style generation.

## ✨ Features

- 🔄 **Bidirectional Conversion**: Transform CSS styles to Tailwind CSS classes
- 🎯 **Smart Parsing**: Handles complex CSS properties and vendor prefixes
- 📱 **Responsive Support**: Converts responsive CSS to Tailwind breakpoints
- 🧩 **TypeScript First**: Full TypeScript support with type definitions
- 🪶 **Lightweight**: Zero dependencies, optimized for performance
- 🌐 **Browser Compatible**: Works in both Node.js and browser environments
- 🐛 **Debug Mode**: Built-in debugging for troubleshooting conversions
- 🆕 **Tailwind v4 Mode**: Optional canonical output for current Tailwind docs utility syntax

## 📦 Installation

```bash
# npm
npm install transform-to-tailwindcss-core

# yarn
yarn add transform-to-tailwindcss-core

# pnpm
pnpm add transform-to-tailwindcss-core
```

## 🚀 Quick Start

```typescript
import { toTailwindcss, transformStyleToTailwindcss } from 'transform-to-tailwindcss-core'

// Basic usage
const [tailwindClasses, unconverted] = transformStyleToTailwindcss(
  'color: red; font-size: 16px; margin: 10px'
)

console.log(tailwindClasses) // "text-[red] text-[16px] m-[10px]"
console.log(unconverted) // [] (empty if all styles converted)

// With rem units
const [classes, unconverted] = transformStyleToTailwindcss(
  'padding: 8px; background-color: #3b82f6',
  true // enable rem conversion
)

// With debug mode
const [classes, unconverted] = transformStyleToTailwindcss(
  'display: flex; justify-content: center',
  false, // rem conversion
  true // debug mode - shows conversion process
)

// Tailwind v4 canonical output
console.log(toTailwindcss('aspect-ratio: 1 / 1;', false, true)) // "aspect-square"
console.log(toTailwindcss('width: 100%;', false, true)) // "w-full"
console.log(toTailwindcss('rotate: 45deg;', false, true)) // "rotate-45"
```

## 📖 API Reference

### `transformStyleToTailwindcss(styles, isRem?, debug?, isV4?)`

Converts CSS styles to Tailwind CSS utility classes.

#### Parameters

- `styles` (string): CSS styles to convert (e.g., "color: red; font-size: 16px")
- `isRem` (boolean, optional): Whether to convert pixel values to rem units
- `debug` (boolean, optional): Enable debug logging to see conversion process
- `isV4` (boolean, optional): Prefer Tailwind v4 canonical utility output for supported property pages

#### Returns

Returns a tuple `[string, string[]]`:
- First element: Converted Tailwind CSS classes as a string
- Second element: Array of unconverted CSS styles

### `toTailwindcss(css, isRem?, isV4?)`

Converts a single CSS declaration to a Tailwind utility string.

#### Parameters

- `css` (string): A single CSS declaration (e.g. `"aspect-ratio: 1 / 1;"`)
- `isRem` (boolean, optional): Whether to convert pixel values to rem units
- `isV4` (boolean, optional): Prefer Tailwind v4 canonical utility output for supported property pages

#### Examples

```typescript
toTailwindcss('aspect-ratio: 1 / 1;') // "aspect-[1/1]"
toTailwindcss('aspect-ratio: 1 / 1;', false, true) // "aspect-square"

toTailwindcss('line-clamp: 3;', false, true) // "line-clamp-3"
toTailwindcss('color-scheme: light dark;', false, true) // "scheme-light-dark"
```

### Tailwind v4 Mode

`isV4` is opt-in so existing integrations keep the current output by default.

When `isV4` is `true`, the converter prefers current Tailwind documentation syntax for supported utilities, for example:

```typescript
toTailwindcss('aspect-ratio: var(--aspect-video);', false, true) // "aspect-video"
toTailwindcss('inline-size: 100%;', false, true) // "inline-full"
toTailwindcss('block-size: 100vh;', false, true) // "block-screen"
toTailwindcss('font-stretch: condensed;', false, true) // "font-stretch-condensed"
toTailwindcss('text-shadow: none;', false, true) // "text-shadow-none"
toTailwindcss('translate: 100% 100%;', false, true) // "translate-full"
```

## 🎯 Supported CSS Properties

This library supports a wide range of CSS properties including:

- **Layout**: `display`, `position`, `top`, `right`, `bottom`, `left`
- **Flexbox**: `flex`, `flex-direction`, `justify-content`, `align-items`
- **Grid**: `grid`, `grid-template-columns`, `grid-template-rows`
- **Spacing**: `margin`, `padding`, `gap`
- **Sizing**: `width`, `height`, `max-width`, `min-height`
- **Typography**: `font-size`, `font-weight`, `text-align`, `line-height`
- **Colors**: `color`, `background-color`, `border-color`
- **Borders**: `border`, `border-width`, `border-radius`
- **Effects**: `box-shadow`, `opacity`, `transform`
- **And many more...**

Tailwind v4 mode also covers current property-page syntax across the Tailwind docs categories such as Layout, Flexbox & Grid, Sizing, Typography, Backgrounds, Borders, Effects, Filters, Tables, Transitions & Animation, Transforms, Interactivity, SVG, and Accessibility.

## 🔧 Advanced Usage

### Debug Mode

Enable debug mode to see detailed conversion logs:

```typescript
const [classes, unconverted] = transformStyleToTailwindcss(
  'color: #ff0000; font-size: 18px; margin-top: 20px',
  false,
  true // debug mode
)

// Console output:
// 🔍 [DEBUG] Input styles: color: #ff0000; font-size: 18px; margin-top: 20px
// 🔍 [DEBUG] Processing style: color: #ff0000 -> key: color: #ff0000
// 🔍 [DEBUG] Converted to Tailwind: color: #ff0000 -> text-red-500
// 🔍 [DEBUG] Processing style: font-size: 18px -> key: font-size: 18px
// 🔍 [DEBUG] Converted to Tailwind: font-size: 18px -> text-lg
// ...
```

### Handling Unconverted Styles

```typescript
const [classes, unconverted] = transformStyleToTailwindcss(
  'color: red; custom-property: value; font-size: 16px'
)

console.log(classes) // "text-red-500 text-base"
console.log(unconverted) // ["custom-property: value"]

// You can combine them for fallback
const finalStyles = unconverted.length > 0
  ? `${classes} [&]:${unconverted.join('; ')}`
  : classes
```

## 🛠️ Use Cases

- **Legacy Code Migration**: Convert existing CSS to Tailwind CSS
- **Dynamic Styling**: Generate Tailwind classes from user input
- **Design Tools**: Build CSS-to-Tailwind converters
- **Component Libraries**: Transform inline styles to utility classes
- **Development Tools**: Create IDE extensions or build plugins

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

[MIT](./LICENSE) License © 2022 [Simon He](https://github.com/Simon-He95)

## 💖 Support

If this project helped you, please consider:

<a href="https://github.com/Simon-He95/sponsor" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;" >
</a>

<div align="center">

![sponsors](https://www.hejian.club/images/sponsors.jpg)

</div>
