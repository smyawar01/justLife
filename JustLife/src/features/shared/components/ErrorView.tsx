import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/core/theme';

export interface ErrorViewProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorView: React.FC<ErrorViewProps> = ({ message, onRetry }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]} testID="error-view">
      <Text style={[styles.title, { color: colors.error }]}>⚠️ Oops!</Text>
      <Text style={[styles.message, { color: colors.textSecondary }]}>{message}</Text>
      {onRetry && (
        <TouchableOpacity
          onPress={onRetry}
          style={[styles.retryButton, { backgroundColor: colors.primary }]}
          testID="retry-button"
        >
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});
