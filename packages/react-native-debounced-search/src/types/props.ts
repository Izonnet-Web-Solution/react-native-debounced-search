import React from 'react';
import {
  TextInputProps,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicatorProps,
} from 'react-native';

/**
 * UI visual variants available out of the box.
 */
export type DebouncedSearchVariant =
  | 'default'
  | 'ios'
  | 'pill'
  | 'material'
  | 'outline';

/**
 * Imperative methods exposed via ref to control the DebouncedSearch component.
 */
export interface DebouncedSearchRef {
  /** Focus the underlying TextInput */
  focus: () => void;
  /** Blur the underlying TextInput */
  blur: () => void;
  /** Clear the input text and trigger onClear + onSearch('') */
  clear: () => void;
  /** Returns whether the TextInput is currently focused */
  isFocused: () => boolean;
  /** Programmatically set the input value */
  setValue: (value: string) => void;
  /** Get current value of the input */
  getValue: () => string;
}

/**
 * Props for the DebouncedSearch component.
 */
export interface DebouncedSearchProps
  extends Omit<TextInputProps, 'onChangeText' | 'value'> {
  /** Callback fired with the debounced query when typing stops after the specified delay */
  onSearch: (query: string) => void;

  /**
   * Pre-designed UI style variant for instant professional styling.
   * - `'default'`: Clean rounded rectangle.
   * - `'ios'`: Apple-style borderless subtle grey bar.
   * - `'pill'`: Modern e-commerce rounded capsule with shadow.
   * - `'material'`: Android Material flat style with accent bottom border.
   * - `'outline'`: Minimalist bordered style.
   * @default 'default'
   */
  variant?: DebouncedSearchVariant;

  /** Delay in milliseconds before triggering onSearch (default: 500) */
  delay?: number;

  /**
   * Minimum characters required before triggering debounced onSearch.
   * Note: Pressing Enter/Search on the keyboard always triggers immediate search regardless of minLength.
   * @default 0
   */
  minLength?: number;

  /** Controlled value for the input */
  value?: string;

  /** Initial/default value for uncontrolled input */
  defaultValue?: string;

  /** Callback fired immediately on every keystroke */
  onChangeText?: (text: string) => void;

  /** Callback fired when the clear (X) button is pressed */
  onClear?: () => void;

  /** Shows a loading spinner (ActivityIndicator) inside the input when true */
  loading?: boolean;

  /** Whether to show the clear button when there is text in the input */
  showClearButton?: boolean;

  /** Whether to show the search icon on the left */
  showSearchIcon?: boolean;

  /** Custom component for the left search icon */
  searchIcon?: React.ReactNode;

  /** Color of the default search icon */
  searchIconColor?: string;

  /** Size of the default search icon in points */
  searchIconSize?: number;

  /** Custom component for the clear button icon */
  clearIcon?: React.ReactNode;

  /** Custom slot rendered on the far left before the input */
  leftComponent?: React.ReactNode;

  /** Custom slot rendered on the far right (e.g. filter button, voice search) */
  rightComponent?: React.ReactNode;

  /** Style for the outermost wrapper view */
  containerStyle?: StyleProp<ViewStyle>;

  /** Style for the inner search bar container (border, background, padding) */
  inputContainerStyle?: StyleProp<ViewStyle>;

  /** Style applied to the input container when the search input is focused */
  focusedInputContainerStyle?: StyleProp<ViewStyle>;

  /** Style for the text input itself */
  inputStyle?: StyleProp<TextStyle>;

  /** Style for the clear button wrapper */
  clearButtonStyle?: StyleProp<ViewStyle>;

  /** Color of the loading spinner */
  activityIndicatorColor?: string;

  /** Size of the loading spinner */
  activityIndicatorSize?: ActivityIndicatorProps['size'];

  /** Color of placeholder text */
  placeholderTextColor?: string;

  /** Whether the input is disabled */
  disabled?: boolean;

  /** Ref to access imperative methods (focus, blur, clear, setValue, getValue) */
  ref?: React.Ref<DebouncedSearchRef>;
}

/**
 * Props for the ClearButton component.
 */
export interface ClearButtonProps {
  /** Callback fired when clear button is pressed */
  onPress: () => void;
  /** Custom wrapper style */
  style?: StyleProp<ViewStyle>;
  /** Custom icon node inside clear button */
  customIcon?: React.ReactNode;
}
