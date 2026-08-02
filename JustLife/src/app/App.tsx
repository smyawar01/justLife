import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from '@/navigation/AppNavigator';
import { ThemeProvider } from '@/core/theme';

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
