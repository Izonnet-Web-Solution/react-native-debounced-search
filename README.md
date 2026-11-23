<div align="center">
  <img src="./assets/banner.png" alt="React Native Debounced Search Banner" width="100%" />
</div>

<br />

<div align="center">

# React Native Debounced Search

[![npm version](https://img.shields.io/npm/v/@izonnet-web-solution/react-native-debounced-search.svg?style=flat-square)](https://www.npmjs.com/package/@izonnet-web-solution/react-native-debounced-search)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![React Native](https://img.shields.io/badge/React%20Native-0.88.1-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactnative.dev/)

**A complete monorepo containing the `@izonnet-web-solution/react-native-debounced-search` NPM package along with a full React Native demo application.**

</div>

---

## 📁 Repository Structure

```text
DebouncedSearch/
├── packages/
│   └── react-native-debounced-search/   # 📦 The Publishable NPM Package
│       ├── src/
│       │   ├── components/              # DebouncedSearch & ClearButton UI
│       │   ├── hooks/                   # Standalone useDebounce hook
│       │   ├── theme/                   # Default colors & design tokens
│       │   ├── types/                   # TypeScript interfaces & props
│       │   ├── assets/                  # Zero-dependency SVG/View icons
│       │   └── index.ts                 # Main package entry export
│       ├── package.json                 # Package configuration
│       ├── tsconfig.json                # Package TypeScript configuration
│       └── README.md                    # Detailed package documentation
├── src/
│   └── screens/
│       └── HomeSreen.tsx                # 📱 Interactive Demo Screen
├── App.tsx                              # App Entry Point
├── package.json                         # Root project configuration
└── metro.config.js                      # Metro configuration with package watch
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/nileshahir/DebouncedSearch.git
cd DebouncedSearch
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Example App

#### iOS

```bash
# Install CocoaPods (First time only)
cd ios && bundle exec pod install && cd ..

# Start the iOS simulator
npm run ios
```

#### Android

```bash
# Start the Android emulator
npm run android
```

---

## 📦 About the Package

The core package **`@izonnet-web-solution/react-native-debounced-search`** is located in [`packages/react-native-debounced-search`](packages/react-native-debounced-search).

### Core Highlights:
- **Zero External Dependencies:** Built with pure React Native components (no external icon or SVG libraries required).
- **5 UI Presets:** Instant styling with `variant="pill"`, `variant="ios"`, `variant="material"`, `variant="outline"`, or `variant="default"`.
- **Immediate on Enter:** Pressing keyboard search/enter triggers instant search without delay.
- **Smart `minLength` Support:** Prevents single-letter queries while supporting short queries on enter.
- **Built-in `useDebounce` Hook:** Reusable hook for custom input implementations.

For full props documentation, visit the [Package README](packages/react-native-debounced-search/README.md).

---

## 🚢 Publishing to NPM

To publish a new version of the package to the NPM registry:

```bash
cd packages/react-native-debounced-search

# 1. Ensure you are logged into your npm account
npm login

# 2. Publish as a public scoped package
npm publish --access public
```

---

## 🧪 Type Checking

Validate TypeScript types across the entire project and package:

```bash
npx tsc --noEmit
```

---

## 👨‍💻 Author

**Nilesh Ahir**  
* GitHub: [@nileshahir](https://github.com/nileshahir)  
* Organization: [Izonnet Web Solution](https://izonnet.com)

---

## 📄 License

This repository is open-sourced under the [MIT License](LICENSE).
