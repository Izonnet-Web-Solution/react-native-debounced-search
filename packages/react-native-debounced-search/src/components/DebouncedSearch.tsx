import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
} from 'react';
import {
  View,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {
  DebouncedSearchProps,
  DebouncedSearchRef,
  DebouncedSearchVariant,
} from '../types';
import { useDebounce } from '../hooks/useDebounce';
import { ClearButton } from './ClearButton';
import { DefaultSearchIcon } from '../assets';
import { colors } from '../theme';

type TextInputInstance = React.ComponentRef<typeof TextInput>;

export function DebouncedSearch({
  onSearch,
  variant = 'default',
  delay = 500,
  minLength = 0,
  value,
  defaultValue = '',
  placeholder = 'Search...',
  onChangeText,
  onClear,
  loading = false,
  showClearButton = true,
  showSearchIcon = true,
  searchIcon,
  searchIconColor = colors.icon,
  searchIconSize = 15,
  clearIcon,
  leftComponent,
  rightComponent,
  containerStyle,
  inputContainerStyle,
  focusedInputContainerStyle,
  inputStyle,
  clearButtonStyle,
  activityIndicatorColor = colors.spinner,
  activityIndicatorSize = 'small',
  placeholderTextColor = colors.placeholder,
  disabled = false,
  editable,
  onFocus,
  onBlur,
  onSubmitEditing,
  returnKeyType = 'search',
  ref,
  ...restProps
}: DebouncedSearchProps): React.JSX.Element {
  const inputRef = useRef<TextInputInstance>(null);
  const isControlled = value !== undefined;
  const [internalText, setInternalText] = useState<string>(
    isControlled ? value : defaultValue
  );
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const currentText = isControlled ? value : internalText;
  const debouncedQuery = useDebounce<string>(currentText, delay);

  // Track whether this is the first render to avoid redundant initial onSearch call
  const isInitialMount = useRef<boolean>(true);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
    clear: () => handleClear(),
    isFocused: () => inputRef.current?.isFocused() ?? false,
    setValue: (newVal: string) => {
      if (!isControlled) {
        setInternalText(newVal);
      }
      onChangeText?.(newVal);
    },
    getValue: () => currentText,
  }));

  // Trigger onSearch when debounced query updates
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      // Only trigger on mount if there was an initial non-empty value meeting minLength
      if (debouncedQuery.trim() !== '' && debouncedQuery.length >= minLength) {
        onSearch(debouncedQuery);
      }
      return;
    }

    // Trigger onSearch if query is empty (reset list) or query meets minLength
    if (debouncedQuery.trim() === '' || debouncedQuery.length >= minLength) {
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery, minLength]);

  const handleChangeText = (text: string) => {
    if (!isControlled) {
      setInternalText(text);
    }
    onChangeText?.(text);
  };

  const handleClear = () => {
    if (!isControlled) {
      setInternalText('');
    }
    onChangeText?.('');
    onClear?.();
    onSearch('');
    inputRef.current?.focus();
  };

  const handleFocus: NonNullable<TextInputProps['onFocus']> = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur: NonNullable<TextInputProps['onBlur']> = (e) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  // Immediate search on keyboard Enter/Search button press
  const handleSubmitEditing: NonNullable<TextInputProps['onSubmitEditing']> = (e) => {
    onSearch(currentText);
    onSubmitEditing?.(e);
  };

  const hasText = Boolean(currentText && currentText.length > 0);
  const isEditable = editable !== undefined ? editable : !disabled;

  // Variant styles resolver
  const getVariantStyle = (v: DebouncedSearchVariant): StyleProp<ViewStyle> => {
    switch (v) {
      case 'ios':
        return styles.variantIos;
      case 'pill':
        return styles.variantPill;
      case 'material':
        return [
          styles.variantMaterial,
          isFocused && styles.focusedVariantMaterial,
        ];
      case 'outline':
        return [
          styles.variantOutline,
          isFocused && styles.focusedVariantOutline,
        ];
      case 'default':
      default:
        return styles.variantDefault;
    }
  };

  return (
    <View style={[styles.outerContainer, containerStyle]}>
      <View
        style={[
          styles.inputContainer,
          getVariantStyle(variant),
          isFocused && styles.focusedInputContainer,
          inputContainerStyle,
          isFocused && focusedInputContainerStyle,
          disabled && styles.disabledInputContainer,
        ]}
      >
        {/* Custom Left Component */}
        {leftComponent}

        {/* Left Search Icon */}
        {showSearchIcon && (
          <View style={styles.leadingContainer}>
            {searchIcon ?? (
              <DefaultSearchIcon
                color={searchIconColor}
                size={searchIconSize}
              />
            )}
          </View>
        )}

        {/* Text Input */}
        <TextInput
          ref={inputRef}
          value={currentText}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSubmitEditing={handleSubmitEditing}
          returnKeyType={returnKeyType}
          editable={isEditable}
          style={[styles.input, inputStyle, disabled && styles.disabledInput]}
          {...restProps}
        />

        {/* Loading Indicator */}
        {loading && (
          <ActivityIndicator
            size={activityIndicatorSize}
            color={activityIndicatorColor}
            style={styles.spinner}
          />
        )}

        {/* Clear Button (Inside input box) */}
        {!loading && showClearButton && hasText && !disabled && (
          <ClearButton
            onPress={handleClear}
            customIcon={clearIcon}
            style={clearButtonStyle}
          />
        )}

        {/* Custom Right Component (Filter, Voice, etc.) */}
        {rightComponent}
      </View>
    </View>
  );
}

DebouncedSearch.displayName = 'DebouncedSearch';

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Variant: Default
  variantDefault: {
    backgroundColor: colors.background,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    height: 44,
  },
  // Variant: iOS
  variantIos: {
    backgroundColor: '#E9E9EB',
    borderRadius: 10,
    borderWidth: 0,
    paddingHorizontal: 10,
    height: 40,
  },
  // Variant: Pill
  variantPill: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 16,
    height: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  // Variant: Material
  variantMaterial: {
    backgroundColor: '#F8F9FA',
    borderRadius: 0,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderWidth: 0,
    borderBottomWidth: 2,
    borderBottomColor: '#9E9E9E',
    paddingHorizontal: 12,
    height: 46,
  },
  focusedVariantMaterial: {
    borderBottomColor: '#6200EE',
  },
  // Variant: Outline
  variantOutline: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    paddingHorizontal: 12,
    height: 44,
  },
  focusedVariantOutline: {
    borderColor: colors.borderFocused,
  },
  focusedInputContainer: {
    borderColor: colors.borderFocused,
  },
  disabledInputContainer: {
    opacity: 0.5,
  },
  leadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    paddingVertical: 0,
    height: '100%',
  },
  disabledInput: {
    color: colors.placeholder,
  },
  spinner: {
    marginLeft: 8,
  },
});
