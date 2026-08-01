import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';

export interface LoadingViewProps {
  message?: string;
}

export const LoadingView: React.FC<LoadingViewProps> = ({ message = 'Loading...' }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]} testID="loading-view">
      <ActivityIndicator size="large" color={colors.primary} testID="loading-indicator" />
      {message ? (
        <Text style={[styles.message, { color: colors.textSecondary }]}>{message}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '500',
  },
});
