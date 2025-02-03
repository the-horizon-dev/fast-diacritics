# fast-diacritics

A high-performance TypeScript library for handling diacritical marks in strings.

## Features

✨ **Fast & Efficient** - Optimized for performance  
🎯 **Type-Safe** - Written in TypeScript with full type definitions  
🔧 **Zero Dependencies** - No external runtime dependencies  
🛡️ **Robust** - Comprehensive error handling and edge case coverage  
📦 **Lightweight** - Small bundle size  

## Installation

To install the library, use npm:

```bash
npm install @the-horizon-dev/fast-diacritics
```

## Usage

To use the Diacritics library, import the `Diacritics` class and call the `remove` method:

```typescript
import { Diacritics } from '@the-horizon-dev/fast-diacritics';

const stringWithDiacritics = "Café";
const stringWithoutDiacritics = Diacritics.remove(stringWithDiacritics);

console.log(stringWithoutDiacritics); // Output: Cafe
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.
