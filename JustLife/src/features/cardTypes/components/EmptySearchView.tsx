import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';

export interface EmptySearchViewProps {
  query?: string;
  message?: string;
  onClear: () => void;
}

export const EmptySearchView: React.FC<EmptySearchViewProps> = ({
  query = '',
  message,
  onClear,
}) => {
  const { colors } = useTheme();

  const displayMessage = message || (
    query 
      ? `We couldn't find any card matching "${query}". Try searching by slug like "a-light-in-the-darkness".`
      : 'No matching cards found.'
  );

  return (
    <View style={styles.container} testID="empty-search-view">
      <Text style={styles.icon}>🔍</Text>
      <Text style={[styles.title, { color: colors.text }]}>
        No Card Found
      </Text>
      <Text style={[styles.text, { color: colors.textMuted }]}>
        {displayMessage}
      </Text>
      <TouchableOpacity
        style={[styles.clearButton, { backgroundColor: colors.primary }]}
        onPress={onClear}
        accessibilityRole="button"
        testID="clear-search-button"
      >
        <Text style={[styles.clearButtonText, { color: colors.surface }]}>
          Clear Search
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  icon: {
    fontSize: 48,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 8,
    paddingHorizontal: 24,
  },
  clearButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  clearButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
});
