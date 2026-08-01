import React, { createContext, useState, ReactNode } from 'react';
import { lightColors, darkColors, ThemeColors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';

export type ThemeMode = 'light' | 'dark';

const THEME_TOGGLE_LABELS: Record<ThemeMode, string> = {
  light: '🌙 Dark',
  dark: '☀️ Light',
};

export interface ThemeContextType {
  mode: ThemeMode;
  isDark: boolean;
  isLight: boolean;
  themeToggleLabel: string;
  colors: ThemeColors;
  typography: typeof typography;
  spacing: typeof spacing;
  toggleTheme: () => void;
  setMode: (mode: ThemeMode) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export interface ThemeProviderProps {
  children: ReactNode;
  initialMode?: ThemeMode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, initialMode = 'light' }) => {
  const [mode, setModeState] = useState<ThemeMode>(initialMode);

  const toggleTheme = () => {
    setModeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
  };

  const isDark = mode === 'dark';
  const isLight = mode === 'light';
  const themeToggleLabel = THEME_TOGGLE_LABELS[mode];
  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider
      value={{
        mode,
        isDark,
        isLight,
        themeToggleLabel,
        colors,
        typography,
        spacing,
        toggleTheme,
        setMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
