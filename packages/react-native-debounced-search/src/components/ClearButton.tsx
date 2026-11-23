import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { DefaultClearIcon } from '../assets';
import { colors } from '../theme';
import { ClearButtonProps } from '../types';

export const ClearButton: React.FC<ClearButtonProps> = ({
  onPress,
  style,
  customIcon,
}) => {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel="Clear search input"
      activeOpacity={0.7}
      onPress={onPress}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      style={[styles.container, style]}
    >
      {customIcon ?? <DefaultClearIcon color={colors.clearIcon} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.clearBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});
