// screens/OfficialsListScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Disclaimer from '../components/Disclaimer';
import Header from '../components/Header';
import GavelBackground from '../components/GavelBackground';

export default function OfficialsListScreen({ navigation }) {
  const { theme, isDark } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <GavelBackground isDark={isDark}>
      <Header 
        title="Officials Accused" 
        onMenuPress={() => navigation?.goBack()}
        showThemeToggle={true}
      />
      <View style={styles.content}>
        <Text style={[styles.heading, { color: theme.text }]}>Officials Accused</Text>
        <Text style={[styles.subtext, { color: theme.textSecondary }]}>
          (Grouping by accused officer coming soon)
        </Text>
        <Disclaimer style={styles.disclaimer} />
      </View>
      </GavelBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
  },
  subtext: {
    marginBottom: 24,
    textAlign: 'center',
  },
  disclaimer: {
    marginTop: 32,
  },
});
