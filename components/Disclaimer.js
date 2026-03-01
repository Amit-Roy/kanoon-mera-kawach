// components/Disclaimer.js
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function Disclaimer({ style }) {
  const { theme } = useTheme();

  return (
    <Text style={[styles.text, { color: theme.textSecondary }, style]}>
      This is NOT legal advice. Always consult a qualified lawyer or relevant authority.
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 24,
    paddingHorizontal: 32,
  },
});
