import { useContext } from 'react';
import { ThemeContext, ThemeContextType } from './ThemeContext';
import { lightColors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    // Fallback if rendered outside of provider (useful for standalone unit tests)
    return {
      mode: 'light',
      isDark: false,
      isLight: true,
      themeToggleLabel: '🌙 Dark',
      colors: lightColors,
      typography,
      spacing,
      toggleTheme: () => {},
      setMode: () => {},
    };
  }
  return context;
}
