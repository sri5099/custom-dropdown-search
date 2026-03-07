# react-native-custom-dropdown-search

A customizable React Native dropdown component with built-in search functionality for lists.

## Features

- 🔍 Built-in search functionality
- 🎨 Fully customizable styling
- 📱 Support for both single and multiple selection
- 🌐 API endpoint integration support
- 📦 TypeScript support
- ⚡ Optimized performance
- ✅ Comprehensive test coverage
- 🎯 Accessibility support with testIDs
- 🖼️ Icon support for dropdown items
- 🔄 Loading states for async data
- ❌ Error handling and validation

## Installation

```sh
npm install react-native-custom-dropdown-search
```

or

```sh
yarn add react-native-custom-dropdown-search
```

### Peer Dependencies

Make sure you have the following peer dependencies installed:

```sh
npm install react-native-svg react-native-toast-message
```

## Usage

### Basic Example

```js
import React, { useState } from 'react';
import { View } from 'react-native';
import { CustomDropDown } from 'react-native-custom-dropdown-search';

const App = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const dropdownData = [
    { id: 1, label: 'Option 1', value: 'option1' },
    { id: 2, label: 'Option 2', value: 'option2' },
    { id: 3, label: 'Option 3', value: 'option3' },
  ];

  return (
    <View style={{ padding: 20 }}>
      <CustomDropDown
        placeHolder="Select an option"
        dropDownList={dropdownData}
        setState={setSelectedItem}
        dropDownSearchKey="label"
      />
    </View>
  );
};

export default App;
```

### Multiple Selection

```js
import React, { useState } from 'react';
import { View } from 'react-native';
import { CustomDropDown } from 'react-native-custom-dropdown-search';

const App = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const dropdownData = [
    { id: 1, label: 'Apple', value: 'apple' },
    { id: 2, label: 'Banana', value: 'banana' },
    { id: 3, label: 'Orange', value: 'orange' },
  ];

  return (
    <View style={{ padding: 20 }}>
      <CustomDropDown
        placeHolder="Select fruits"
        dropDownList={dropdownData}
        setState={setSelectedItems}
        dropDownSearchKey="label"
        multiple={true}
      />
    </View>
  );
};

export default App;
```

### With API Endpoint

```js
import React, { useState } from 'react';
import { View } from 'react-native';
import { CustomDropDown } from 'react-native-custom-dropdown-search';

const App = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <View style={{ padding: 20 }}>
      <CustomDropDown
        placeHolder="Select from API"
        setState={setSelectedItem}
        dropDownSearchKey="name"
        endPoint="https://api.example.com/users"
      />
    </View>
  );
};

export default App;
```

### With Icons

```js
import React, { useState } from 'react';
import { View } from 'react-native';
import { CustomDropDown } from 'react-native-custom-dropdown-search';

const App = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const dropdownData = [
    { 
      id: 1, 
      label: 'Apple', 
      value: 'apple',
      icon: 'https://example.com/apple-icon.png'
    },
    { 
      id: 2, 
      label: 'Banana', 
      value: 'banana',
      icon: 'https://example.com/banana-icon.png'
    },
  ];

  return (
    <View style={{ padding: 20 }}>
      <CustomDropDown
        placeHolder="Select a fruit"
        dropDownList={dropdownData}
        setState={setSelectedItem}
        dropDownSearchKey="label"
      />
    </View>
  );
};

export default App;
```

### Custom Styling

```js
import React, { useState } from 'react';
import { View } from 'react-native';
import { CustomDropDown } from 'react-native-custom-dropdown-search';

const App = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const dropdownData = [
    { id: 1, label: 'Red', value: 'red' },
    { id: 2, label: 'Blue', value: 'blue' },
    { id: 3, label: 'Green', value: 'green' },
  ];

  return (
    <View style={{ padding: 20 }}>
      <CustomDropDown
        placeHolder="Select a color"
        dropDownList={dropdownData}
        setState={setSelectedItem}
        dropDownSearchKey="label"
        containerStyle={{
          borderColor: '#3498db',
          borderWidth: 2,
          borderRadius: 10,
        }}
        externalPlaceholder="Choose your favorite color"
        externalPlaceholderStyle={{
          fontSize: 16,
          fontWeight: 'bold',
          color: '#333',
        }}
      />
    </View>
  );
};

export default App;
```

### With Error Handling

```js
import React, { useState } from 'react';
import { View } from 'react-native';
import { CustomDropDown } from 'react-native-custom-dropdown-search';

const App = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState('');

  const dropdownData = [
    { id: 1, label: 'Option 1', value: 'option1' },
    { id: 2, label: 'Option 2', value: 'option2' },
  ];

  const handleSubmit = () => {
    if (!selectedItem) {
      setError('Please select an option');
    } else {
      setError('');
      // Process form
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <CustomDropDown
        placeHolder="Select an option"
        dropDownList={dropdownData}
        setState={setSelectedItem}
        dropDownSearchKey="label"
        error={error}
      />
    </View>
  );
};

export default App;
```

### With Default Value

```js
import React, { useState } from 'react';
import { View } from 'react-native';
import { CustomDropDown } from 'react-native-custom-dropdown-search';

const App = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const dropdownData = [
    { id: 1, label: 'Option 1', value: 'option1' },
    { id: 2, label: 'Option 2', value: 'option2' },
    { id: 3, label: 'Option 3', value: 'option3' },
  ];

  return (
    <View style={{ padding: 20 }}>
      <CustomDropDown
        placeHolder="Select an option"
        dropDownList={dropdownData}
        setState={setSelectedItem}
        dropDownSearchKey="label"
        defaultValue="option2"
      />
    </View>
  );
};

export default App;
```

### Disabled State

```js
import React, { useState } from 'react';
import { View } from 'react-native';
import { CustomDropDown } from 'react-native-custom-dropdown-search';

const App = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const dropdownData = [
    { id: 1, label: 'Option 1', value: 'option1' },
    { id: 2, label: 'Option 2', value: 'option2' },
  ];

  return (
    <View style={{ padding: 20 }}>
      <CustomDropDown
        placeHolder="Select an option"
        dropDownList={dropdownData}
        setState={setSelectedItem}
        dropDownSearchKey="label"
        disabled={true}
      />
    </View>
  );
};

export default App;
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeHolder` | `string` | - | Placeholder text for the dropdown |
| `dropDownList` | `DropdownItem[]` | `[]` | Array of items to display in dropdown |
| `setState` | `(selected: DropdownItem \| DropdownItem[]) => void` | - | Callback function when item is selected |
| `dropDownSearchKey` | `string` | - | Key to use for searching and displaying items |
| `defaultValue` | `string \| number \| DropdownItem[]` | `null` | Default selected value(s) |
| `disabled` | `boolean` | `false` | Disable the dropdown |
| `multiple` | `boolean` | `false` | Enable multiple selection mode |
| `endPoint` | `string` | - | API endpoint to fetch dropdown data |
| `error` | `string` | - | Error message to display below dropdown |
| `containerStyle` | `ViewStyle` | `{}` | Custom style for dropdown container |
| `externalPlaceholder` | `string` | - | External label displayed above the dropdown |
| `externalPlaceholderStyle` | `TextStyle` | `{}` | Custom style for external placeholder |
| `externalContainerStyle` | `ViewStyle` | `{}` | Custom style for the main container |

## DropdownItem Interface

```typescript
interface DropdownItem {
  id?: string | number;
  value?: string | number;
  icon?: string; // URL for item icon (optional)
  [key: string]: any; // Any additional custom properties
}
```

## CustomTextInput Component

The package also exports a `CustomTextInput` component used internally for search functionality:

```typescript
import { CustomTextInput } from 'react-native-custom-dropdown-search';

<CustomTextInput
  value={searchText}
  setValue={setSearchText}
  placeholderText="Search..."
  searchIcon={true}
  containerStyle={{ borderColor: '#ccc' }}
  inputStyle={{ fontSize: 14 }}
  autoCapitalize="none"
/>
```

### CustomTextInput Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Current input value |
| `setValue` | `(text: string) => void` | - | Callback when text changes |
| `placeholderText` | `string` | `'Search'` | Placeholder text |
| `searchIcon` | `boolean` | `false` | Show search icon |
| `containerStyle` | `ViewStyle` | `{}` | Custom container style |
| `inputStyle` | `TextStyle` | `{}` | Custom input style |
| `autoCapitalize` | `'none' \| 'sentences' \| 'words' \| 'characters'` | `'none'` | Auto-capitalization behavior |

## Testing

The library includes comprehensive test coverage. All components have associated test IDs for easy testing in your application:

### Available Test IDs

**CustomDropDown:**
- `dropdown-main-container`
- `dropdown-touchable`
- `dropdown-selected-text`
- `down-arrow-icon`
- `external-placeholder`
- `error-text`

**DropDownModal:**
- `dropdown-modal`
- `modal-main-container`
- `modal-content-container`
- `modal-backdrop`
- `cancel-button`
- `dropdown-list`
- `dropdown-item-{id}`
- `item-text-{id}`
- `item-icon`
- `loading-container`
- `no-data-container`
- `no-data-text`

**CustomTextInput:**
- `text-input-container`
- `text-input`
- `search-icon`

### Example Test

```typescript
import { render, fireEvent } from '@testing-library/react-native';
import { CustomDropDown } from 'react-native-custom-dropdown-search';

test('opens dropdown on press', () => {
  const { getByTestId } = render(
    <CustomDropDown
      placeHolder="Select"
      dropDownList={[{ id: 1, label: 'Test' }]}
      setState={jest.fn()}
      dropDownSearchKey="label"
    />
  );

  fireEvent.press(getByTestId('dropdown-touchable'));
  expect(getByTestId('dropdown-modal')).toBeTruthy();
});
```

## API Integration

When using the `endPoint` prop, the component will:

1. Fetch data from the provided endpoint on mount
2. Display a loading indicator while fetching
3. Handle errors gracefully
4. Support search functionality on fetched data

The API response should return an array of objects matching the `DropdownItem` interface.

## Styling Guide

### Container Styles

```js
containerStyle={{
  borderColor: '#3498db',
  borderWidth: 2,
  borderRadius: 10,
  backgroundColor: '#f8f9fa',
  paddingHorizontal: 15,
}}
```

### External Container Styles

```js
externalContainerStyle={{
  marginBottom: 20,
  paddingHorizontal: 10,
}}
```

### External Placeholder Styles

```js
externalPlaceholderStyle={{
  fontSize: 16,
  fontWeight: 'bold',
  color: '#333',
  marginBottom: 8,
}}
```

## Performance Optimization

The component is optimized for performance with:

- Memoized search filtering
- Efficient list rendering
- Debounced search input
- Lazy loading for API data
- Minimal re-renders

## Accessibility

The component includes:

- Proper testID attributes for automated testing
- Touch target sizes meeting accessibility guidelines
- Clear visual feedback for interactions
- Support for screen readers

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## Development

To run the example app:

```sh
# Install dependencies
yarn

# Run on iOS
yarn example ios

# Run on Android
yarn example android

# Run on Web
yarn example web
```

To run tests:

```sh
yarn test
```

To run linting:

```sh
yarn lint
```

To run type checking:

```sh
yarn typecheck
```

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
