import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * Built-in lightweight Search Icon without external SVG/icon dependencies.
 */
export const DefaultSearchIcon: React.FC<{ color?: string; size?: number }> = ({
  color = '#8E8E93',
  size = 15,
}) => {
  return (
    <View style={[styles.searchIconContainer, { width: size + 4, height: size + 4 }]}>
      <View
        style={[
          styles.searchCircle,
          {
            width: size,
            height: size,
            borderColor: color,
            borderWidth: 2,
            borderRadius: size / 2,
          },
        ]}
      />
      <View
        style={[
          styles.searchHandle,
          {
            backgroundColor: color,
            height: size * 0.45,
            width: 2,
            bottom: -1,
            right: 0,
          },
        ]}
      />
    </View>
  );
};

/**
 * Built-in lightweight Clear Cross Icon.
 */
export const DefaultClearIcon: React.FC<{ color?: string }> = ({ color = '#FFFFFF' }) => {
  return <Text style={[styles.clearCross, { color }]}>✕</Text>;
};

const styles = StyleSheet.create({
  searchIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginRight: 8,
  },
  searchCircle: {
    backgroundColor: 'transparent',
  },
  searchHandle: {
    position: 'absolute',
    transform: [{ rotate: '-45deg' }],
    borderRadius: 1,
  },
  clearCross: {
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 12,
    textAlign: 'center',
  },
});

