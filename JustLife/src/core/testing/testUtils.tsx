import React from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react-native';
import { ThemeProvider } from '@/core/theme';

// Re-export everything from React Native Testing Library for unified usage
export * from '@testing-library/react-native';

/**
 * Asynchronously renders a React Native component wrapped in ThemeProvider using React Native Testing Library v14.
 */
export const renderWithTheme = async (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
): Promise<RenderResult> => {
  return render(ui, { wrapper: ThemeProvider as React.ComponentType, ...options });
};
