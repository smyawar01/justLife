import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../core/theme/useTheme';

export interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBackPress?: () => void;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  onBackPress,
  subtitle,
}) => {
  const { colors, toggleTheme, themeToggleLabel } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.headerBackground,
          borderBottomColor: colors.surfaceBorder,
        },
      ]}
      testID="header-container"
    >
      <View style={styles.leftContainer}>
        {showBack && (
          <TouchableOpacity
            onPress={onBackPress}
            style={styles.backButton}
            accessibilityLabel="Go back"
            accessibilityRole="button"
            testID="header-back-button"
          >
            <Text style={[styles.backText, { color: colors.text }]}>← Back</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.titleContainer}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[styles.subtitle, { color: colors.textSecondary }]} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>

      <View style={styles.rightContainer}>
        <TouchableOpacity
          onPress={toggleTheme}
          style={[styles.themeToggle, { backgroundColor: colors.inputBackground }]}
          accessibilityLabel="Toggle Theme"
          accessibilityRole="button"
          testID="theme-toggle-button"
        >
          <Text style={[styles.themeToggleText, { color: colors.text }]}>
            {themeToggleLabel}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  leftContainer: {
    width: 70,
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  rightContainer: {
    width: 70,
    alignItems: 'flex-end',
  },
  backButton: {
    paddingVertical: 6,
    paddingRight: 8,
  },
  backText: {
    fontSize: 14,
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  themeToggle: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
  },
  themeToggleText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
