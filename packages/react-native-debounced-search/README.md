<div align="center">
  <img src="./src/assets/banner.png" alt="React Native Debounced Search Banner" width="100%" />
</div>

<br />

<div align="center">

# @izonnet-web-solution/react-native-debounced-search

[![npm version](https://img.shields.io/npm/v/@izonnet-web-solution/react-native-debounced-search.svg?style=flat-square)](https://www.npmjs.com/package/@izonnet-web-solution/react-native-debounced-search)
[![npm downloads](https://img.shields.io/npm/dm/@izonnet-web-solution/react-native-debounced-search.svg?style=flat-square)](https://www.npmjs.com/package/@izonnet-web-solution/react-native-debounced-search)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/nileshahir/DebouncedSearch/pulls)

**A lightweight, zero-dependency, and highly customizable debounced search input component and hook for React Native with ready-made UI presets.**

</div>

---

## 🚀 Key Features

- ⚡️ **Zero External Dependencies:** Built with pure React Native components (no external icon or SVG libraries needed).
- 🎨 **5 Ready-Made UI Presets (`variant`):** Instant modern styling (`'ios'`, `'pill'`, `'material'`, `'outline'`, `'default'`).
- ⌨️ **Immediate Search on Enter:** Pressing the keyboard "Search" / "Enter" key executes the search query immediately without waiting for the delay.
- ⏱️ **Customizable Delay:** Adjust debounce timing easily (default: `500ms`).
- 🔤 **Smart `minLength` Support:** Prevents unnecessary 1-letter API calls while preserving 2-letter queries (like *HP*, *LG*, *Mi*, *TV*) on submit.
- 🧹 **Built-in Clear (✕) Button:** Shows automatically when text is typed and clears with a tap.
- ⏳ **Built-in Activity Indicator:** Toggle a loading spinner directly inside the search bar.
- 🔍 **Built-in Responsive Icons:** Clean default search and clear icons out of the box.
- 🪝 **Standalone `useDebounce` Hook:** Exported separately for developers building their own custom inputs.
- 📱 **Full Platform Support:** Works seamlessly on iOS, Android & React Native Web.

---

## 📦 Installation

```bash
# npm
npm install @izonnet-web-solution/react-native-debounced-search

# yarn
yarn add @izonnet-web-solution/react-native-debounced-search

# pnpm
pnpm add @izonnet-web-solution/react-native-debounced-search

# bun
bun add @izonnet-web-solution/react-native-debounced-search
```

---

## 💡 Quick Start

```tsx
import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { DebouncedSearch } from '@izonnet-web-solution/react-native-debounced-search';

export default function SearchScreen() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    console.log('Fetching API for:', query);

    // Call your search API here...
    setTimeout(() => {
      setResults([`Result 1 for "${query}"`, `Result 2 for "${query}"`]);
      setLoading(false);
    }, 400);
  };

  return (
    <View style={styles.container}>
      <DebouncedSearch
        placeholder="Search products, devices..."
        delay={500}
        loading={loading}
        onSearch={handleSearch}
      />

      <FlatList
        data={results}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 50,
    backgroundColor: '#FFFFFF',
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
});
```

---

## 🎨 UI Variants (Ready-Made Presets)

Developers can switch styles in **1 line of code** without writing custom styles:

```tsx
// 1. Modern E-commerce Capsule Shape (with shadow)
<DebouncedSearch
  variant="pill"
  placeholder="Search products..."
  onSearch={handleSearch}
/>

// 2. Apple / iOS Native Search Bar (borderless, soft grey background)
<DebouncedSearch
  variant="ios"
  placeholder="Search..."
  onSearch={handleSearch}
/>

// 3. Android Material Style (flat, accent bottom border)
<DebouncedSearch
  variant="material"
  placeholder="Search..."
  onSearch={handleSearch}
/>

// 4. Minimalist Bordered Style
<DebouncedSearch
  variant="outline"
  placeholder="Search..."
  onSearch={handleSearch}
/>

// 5. Classic Rounded Rectangle
<DebouncedSearch
  variant="default"
  placeholder="Search..."
  onSearch={handleSearch}
/>
```

---

## 🪝 Standalone `useDebounce` Hook

If you only need debounce logic for your own custom UI:

```tsx
import React, { useState, useEffect } from 'react';
import { TextInput, View, Text } from 'react-native';
import { useDebounce } from '@izonnet-web-solution/react-native-debounced-search';

export function CustomInput() {
  const [text, setText] = useState('');
  const debouncedQuery = useDebounce(text, 500);

  useEffect(() => {
    if (debouncedQuery) {
      console.log('API call for:', debouncedQuery);
    }
  }, [debouncedQuery]);

  return (
    <View>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Type to search..."
      />
      <Text>Debounced: {debouncedQuery}</Text>
    </View>
  );
}
```

---

## 🕹️ Imperative Ref Methods (`DebouncedSearchRef`)

Control the search bar programmatically from a parent component:

```tsx
import React, { useRef } from 'react';
import { View, Button } from 'react-native';
import { DebouncedSearch, DebouncedSearchRef } from '@izonnet-web-solution/react-native-debounced-search';

export function SearchControls() {
  const searchRef = useRef<DebouncedSearchRef>(null);

  return (
    <View>
      <DebouncedSearch ref={searchRef} onSearch={(q) => console.log(q)} />
      
      <Button title="Focus" onPress={() => searchRef.current?.focus()} />
      <Button title="Blur" onPress={() => searchRef.current?.blur()} />
      <Button title="Clear" onPress={() => searchRef.current?.clear()} />
      <Button title="Set Query" onPress={() => searchRef.current?.setValue('iPhone')} />
    </View>
  );
}
```

---

## 📖 Props Reference

| Prop | Type | Default | Description |
|---|---|---|---|
| `onSearch` | `(query: string) => void` | **Required** | Callback fired when debounced typing stops or keyboard Enter is pressed. |
| `variant` | `'default' \| 'ios' \| 'pill' \| 'material' \| 'outline'` | `'default'` | Pre-designed UI preset for instant professional styling. |
| `delay` | `number` | `500` | Delay in milliseconds before triggering `onSearch`. |
| `minLength` | `number` | `0` | Minimum character threshold before debounced search fires. |
| `value` | `string` | `undefined` | Controlled value for the input. |
| `defaultValue` | `string` | `''` | Initial value for uncontrolled input. |
| `loading` | `boolean` | `false` | Shows an ActivityIndicator spinner inside the input when true. |
| `showClearButton` | `boolean` | `true` | Shows clear (✕) button when text exists in the input. |
| `showSearchIcon` | `boolean` | `true` | Shows search icon on the left side. |
| `searchIcon` | `React.ReactNode` | Default Icon | Custom icon component for search icon. |
| `searchIconColor` | `string` | `'#8E8E93'` | Color of default search icon. |
| `searchIconSize` | `number` | `15` | Size of default search icon in points. |
| `clearIcon` | `React.ReactNode` | Default Icon | Custom icon component for clear button. |
| `leftComponent` | `React.ReactNode` | `undefined` | Custom slot rendered on the far left. |
| `rightComponent` | `React.ReactNode` | `undefined` | Custom slot rendered on the far right (filter, voice, etc.). |
| `onClear` | `() => void` | `undefined` | Callback fired when clear button is pressed. |
| `onChangeText` | `(text: string) => void` | `undefined` | Immediate callback on every single keystroke. |
| `containerStyle` | `StyleProp<ViewStyle>` | `undefined` | Style for the outermost wrapper view. |
| `inputContainerStyle` | `StyleProp<ViewStyle>` | `undefined` | Style for the search input box container. |
| `focusedInputContainerStyle` | `StyleProp<ViewStyle>` | `undefined` | Style applied to container when input is focused. |
| `inputStyle` | `StyleProp<TextStyle>` | `undefined` | Style for the `TextInput` element. |
| `clearButtonStyle` | `StyleProp<ViewStyle>` | `undefined` | Style for the clear button wrapper. |
| `placeholderTextColor` | `string` | `'#8E8E93'` | Color of placeholder text. |
| `activityIndicatorColor` | `string` | `'#007AFF'` | Color of loading spinner. |
| `disabled` | `boolean` | `false` | Disables user interaction. |
| `ref` | `React.Ref<DebouncedSearchRef>` | `undefined` | Forwarded ref to access imperative methods. |

*Supports all other standard React Native [`TextInputProps`](https://reactnative.dev/docs/textinput).*

---

## 👨‍💻 Author

**Nilesh Ahir**  
* GitHub: [@nileshahir](https://github.com/nileshahir)  
* Organization: [Izonnet Web Solution](https://izonnet.com)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
