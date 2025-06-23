# Contributing to Transform to Tailwind CSS Core

Thank you for your interest in contributing to Transform to Tailwind CSS Core! We welcome contributions from everyone.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/transform-to-tailwindcss-core.git
   cd transform-to-tailwindcss-core
   ```
3. **Install dependencies**:
   ```bash
   pnpm install
   ```
4. **Create a new branch** for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 🛠️ Development

### Project Structure

```
src/
├── index.ts                      # Main entry point
├── transformStyleToTailwindcss.ts # Core transformation function
├── toTailwindcss.ts             # CSS to Tailwind mapping logic
├── transformer.ts               # Style preprocessing
├── utils.ts                     # Utility functions
└── [property].ts                # Individual CSS property handlers
```

### Running Tests

```bash
# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run tests in watch mode
pnpm test --watch
```

### Building

```bash
# Build the project
pnpm build

# Build and watch for changes
pnpm dev
```

### Code Quality

```bash
# Lint code
pnpm lint

# Fix linting issues
pnpm lint:fix

# Format code
pnpm format

# Type checking
pnpm typecheck

# Run all checks
pnpm ci
```

## 📝 Writing Tests

We use Vitest for testing. When adding new features or fixing bugs, please include tests:

1. Create test files in the `test/` directory
2. Follow the naming convention: `[feature].test.ts`
3. Test both successful conversions and edge cases

Example test structure:
```typescript
import { describe, expect, it } from 'vitest'
import { transformStyleToTailwindcss } from '../src'

describe('feature description', () => {
  it('should convert basic styles', () => {
    const [result, unconverted] = transformStyleToTailwindcss('color: red')
    expect(result).toBe('text-red-500')
    expect(unconverted).toEqual([])
  })
})
```

## 🔧 Adding New CSS Properties

To add support for a new CSS property:

1. **Create a new handler file** in `src/[property].ts`
2. **Export the handler function** that matches the property
3. **Import and register** the handler in `src/toTailwindcss.ts`
4. **Add comprehensive tests** in `test/[property].test.ts`

Example handler structure:
```typescript
// src/newProperty.ts
export function transformNewProperty(key: string, value: string): string {
  // Transform logic here
  return tailwindClass
}
```

## 📋 Pull Request Guidelines

Before submitting a pull request:

1. **Ensure all tests pass**: `pnpm test`
2. **Run the full CI check**: `pnpm ci`
3. **Update documentation** if needed
4. **Add tests** for new features
5. **Follow commit message conventions**

### Commit Message Format

We follow conventional commits:

- `feat:` new features
- `fix:` bug fixes
- `docs:` documentation changes
- `test:` test additions or updates
- `refactor:` code refactoring
- `chore:` maintenance tasks

Example: `feat: add support for CSS grid properties`

## 🐛 Reporting Issues

When reporting bugs, please include:

1. **Clear description** of the issue
2. **Steps to reproduce**
3. **Expected vs actual behavior**
4. **CSS input** that caused the issue
5. **Environment details** (Node.js version, etc.)

## 💡 Feature Requests

For new features:

1. **Check existing issues** to avoid duplicates
2. **Describe the use case** clearly
3. **Provide examples** of desired input/output
4. **Consider backward compatibility**

## 🤝 Code of Conduct

Please be respectful and constructive in all interactions. We're here to build something great together!

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Discord**: [Join our community](https://discord.gg/your-discord) (if available)

Thank you for contributing! 🎉
