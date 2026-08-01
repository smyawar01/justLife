import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';

export interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onClear,
  placeholder = 'Search cards by name...',
}) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.inputBackground,
          borderColor: colors.surfaceBorder,
        },
      ]}
      testID="search-bar-container"
    >
      <Text style={styles.searchIcon}>🔍</Text>
      <TextInput
        style={[styles.input, { color: colors.text }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        autoCorrect={false}
        autoCapitalize="none"
        accessibilityLabel="Search cards"
        testID="search-input"
      />
      {value.length > 0 && (
        <TouchableOpacity
          onPress={onClear}
          style={styles.clearButton}
          accessibilityLabel="Clear search"
          testID="clear-search-button"
        >
          <Text style={[styles.clearIcon, { color: colors.textMuted }]}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 46,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 10,
    borderWidth: 1,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 8,
  },
  clearButton: {
    padding: 6,
  },
  clearIcon: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
