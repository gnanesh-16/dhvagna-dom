# dhvagna-dom

> **What makes dhvagna-dom stand out?** Unlike other DOM-ready utilities, this package combines TypeScript support, minimal size (0.7KB), intelligent state detection, and cross-browser compatibility while offering features like optional timeouts and proper event cleanup. It's the smartest choice for modern web development when you need reliable DOM-ready detection without the bloat.

A lightweight utility (less than 1KB) to ensure your JavaScript code runs after the DOM is fully loaded, solving the common issue where developers face issues accessing DOM elements due to scripts running before the DOM is fully loaded.

## Top Reasons to Choose dhvagna-dom

| Why dhvagna-dom is the top priority choice | Advantage over similar solutions |
|---------|-------------------------|
| **Smallest possible footprint** | 5-10x smaller than alternatives like jQuery (0.7KB vs 30KB+) |
| **Modern TypeScript implementation** | Built from the ground up with TypeScript, not just type definitions added later |
| **Smart state detection** | Intelligently checks if DOM is already loaded before attaching events |
| **Clean event handling** | Properly removes event listeners after firing to prevent memory leaks |
| **Optional timeout fallback** | Unique feature not available in most alternatives |
| **Framework-agnostic** | Works with React, Vue, Angular or vanilla JavaScript without conflicts |

## Why Use dhvagna-dom?

| Problem | Solution with dhvagna-dom |
|---------|-------------------------|
| Scripts run before DOM is ready | Ensures your code executes at the perfect moment |
| Errors like `Cannot read property of null` | Guarantees DOM elements exist before accessing them |
| Complex workarounds and event handling | Simple, clean API that handles all edge cases |
| Performance concerns with heavy libraries | Ultra-lightweight (<1KB) with zero dependencies |
| Browser inconsistencies | Works reliably across all modern browsers |

Unlike bulky frameworks that include DOM-ready functionality as part of a larger package, dhvagna-dom does one thing exceptionally well. It provides the most efficient and reliable way to execute JavaScript code when the DOM is fully loaded and ready for manipulation.

## How It Works Internally

dhvagna-dom uses a multi-layered approach to ensure maximum reliability:

1. **State Detection**: First checks if the DOM is already loaded by examining `document.readyState`
2. **Event Subscription**: If not already loaded, attaches listeners to both:
   - `DOMContentLoaded` (fires when HTML is fully parsed)
   - `load` (fallback that fires when all resources are loaded)
3. **Cleanup**: Properly removes event listeners once triggered
4. **Safety Timeout**: Optional timeout parameter as a fallback mechanism

This approach ensures your callback runs at the earliest possible moment when the DOM is ready, but never before.

## The Problem

Have you ever encountered errors like this?

```javascript
// This fails because the element doesn't exist yet
const element = document.getElementById('my-element');
element.innerHTML = 'Hello World'; // TypeError: Cannot set property 'innerHTML' of null
```

## Installation

You can install dhvagna-dom using npm, yarn, or pnpm:

```bash
# Using npm
npm install dhvagna-dom

# Using yarn
yarn add dhvagna-dom

# Using pnpm
pnpm add dhvagna-dom
```

You can also find the source code on GitHub:
[https://github.com/gnanesh-16/dhvagna-dom](https://github.com/gnanesh-16/dhvagna-dom)

## Usage

### Basic Usage

```javascript
import dhvagnaDom from 'dhvagna-dom';

dhvagnaDom(() => {
  // Your code here will run when the DOM is fully loaded
  const element = document.getElementById('my-element');
  element.innerHTML = 'Hello World';
});
```

### With TypeScript

The package includes TypeScript definitions out of the box:

```typescript
import { dhvagnaDom } from 'dhvagna-dom';

dhvagnaDom(() => {
  const element = document.getElementById('my-element') as HTMLElement;
  element.innerHTML = 'Hello World';
});
```

### With Timeout Option

You can specify a timeout as a safety measure:

```javascript
import dhvagnaDom from 'dhvagna-dom';

dhvagnaDom(
  () => {
    // Your code here
    console.log('DOM is ready or timeout reached');
  }, 
  { timeout: 3000 } // Will execute after 3 seconds even if DOM isn't ready yet
);
```

### In Browser via CDN

```html
<script src="https://unpkg.com/dhvagna-dom/dist/dhvagna-dom.min.js"></script>
<script>
  window.dhvagnaDom(() => {
    // Your code here
    console.log('DOM is ready!');
  });
</script>
```

## Key Features

- **Tiny Footprint**: Less than 1KB minified and gzipped (0.7KB to be exact)
- **Zero Dependencies**: No external libraries required
- **TypeScript Support**: Built with TypeScript for better developer experience
- **Framework Agnostic**: Works with any JavaScript framework or vanilla JS
- **Smart Detection**: Checks if DOM is already loaded before attaching listeners
- **Multiple Listeners**: Can be called multiple times without conflicts
- **Universal Browser Support**: Works in all modern browsers and IE11+

## Performance Metrics

| Metric | Value |
|--------|-------|
| Size (minified) | ~0.9KB |
| Size (minified + gzipped) | ~0.7KB |
| Execution time | <1ms in most cases |
| Memory footprint | Negligible |
| Browser support | All modern browsers + IE11 |

## Technical Comparison

| Feature | dhvagna-dom | jQuery | Plain `DOMContentLoaded` | `defer` attribute |
|---------|-----------|--------|--------------------------|-------------------|
| Size | 0.7KB | 30KB+ | 0KB (built-in) | 0KB (HTML attribute) |
| Handles all edge cases | ✅ | ✅ | ❌ | ❌ |
| Works if added after DOM ready | ✅ | ✅ | ❌ | N/A |
| No dependencies | ✅ | ❌ | ✅ | ✅ |
| TypeScript support | ✅ | Requires @types | ✅ | N/A |
| Optional timeout | ✅ | ❌ | ❌ | ❌ |

## Browser Compatibility

| Browser | Supported Versions |
|---------|-------------------|
| Chrome | 9+ |
| Firefox | 4+ |
| Safari | 5+ |
| Edge | All versions |
| Opera | 10+ |
| IE | 11+ |
| iOS Safari | 5+ |
| Android Browser | 4+ |

## Similar Libraries

Some alternatives to dhvagna-dom include:

- **domready**: The original DOM ready utility
- **jquery.ready**: jQuery's DOM ready functionality
- **document-ready**: Another small DOM ready utility

The main advantage of dhvagna-dom over these alternatives is its extremely small size, TypeScript support, and modern implementation.

## License

MIT