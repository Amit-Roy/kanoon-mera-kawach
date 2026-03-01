// components/Header.js
import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Switch,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';

export default function Header({ title, onMenuPress, showThemeToggle = false }) {
  const { theme, isDark, toggleTheme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.surface,
          paddingTop: insets.top + 12,
        },
      ]}
    >
      <TouchableOpacity
        style={styles.menuButton}
        onPress={onMenuPress}
        accessibilityLabel="Menu"
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Text style={[styles.menuIcon, { color: theme.text }]}>☰</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { color: theme.text }]}>{title}</Text>

      {showThemeToggle ? (
        <View style={[styles.themeToggle]}>
          <Text style={{ color: theme.text, marginRight: 8 }}>
            {isDark ? '🌙' : '☀️'}
          </Text>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: '#ccc', true: theme.accent }}
            thumbColor={isDark ? theme.accent : '#fff'}
          />
        </View>
      ) : (
        <View style={styles.spacer} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  menuButton: {
    padding: 12,
    marginLeft: -12,
  },
  menuIcon: {
    fontSize: 28,
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 4,
  },
  spacer: {
    width: 56,
  },
});
