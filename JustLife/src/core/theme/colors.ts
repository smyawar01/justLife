import { StatusBarStyle } from 'react-native';

export interface ThemeColors {
  background: string;
  surface: string;
  surfaceBorder: string;
  primary: string;
  primaryDark: string;
  accent: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  cardBackground: string;
  inputBackground: string;
  headerBackground: string;
  badgeBackground: string;
  badgeText: string;
  error: string;
  statusBarStyle: StatusBarStyle;
}

export const lightColors: ThemeColors = {
  background: '#F4F6F9',
  surface: '#FFFFFF',
  surfaceBorder: '#E2E8F0',
  primary: '#0F766E',
  primaryDark: '#0D5E56',
  accent: '#F59E0B',
  text: '#0F172A',
  textSecondary: '#475569',
  textMuted: '#94A3B8',
  cardBackground: '#FFFFFF',
  inputBackground: '#EDF2F7',
  headerBackground: '#0F766E',
  badgeBackground: '#CCFBF1',
  badgeText: '#0F766E',
  error: '#EF4444',
  statusBarStyle: 'dark-content',
};

export const darkColors: ThemeColors = {
  background: '#0F172A',
  surface: '#1E293B',
  surfaceBorder: '#334155',
  primary: '#14B8A6',
  primaryDark: '#0D9488',
  accent: '#FBBF24',
  text: '#F8FAFC',
  textSecondary: '#CBD5E1',
  textMuted: '#64748B',
  cardBackground: '#1E293B',
  inputBackground: '#334155',
  headerBackground: '#1E293B',
  badgeBackground: '#115E59',
  badgeText: '#5EEAD4',
  error: '#F87171',
  statusBarStyle: 'light-content',
};
