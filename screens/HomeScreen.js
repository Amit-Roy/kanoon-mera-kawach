// screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { signOut } from 'firebase/auth';
import { getAuthInstance } from '../firebaseConfig';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import Disclaimer from '../components/Disclaimer';
import Header from '../components/Header';
import NewsCarousel from '../components/NewsCarousel';
import GavelBackground from '../components/GavelBackground';

export default function HomeScreen({ navigation }) {
  const { theme, isDark } = useTheme();
  const { setUser } = useAuth();

  const handleLogout = async () => {
    try {
      const auth = getAuthInstance();
      await signOut(auth);
      console.log('Logout successful');
      // Update auth context to trigger navigation
      setUser(null);
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  const handleMenuPress = () => {
    // TODO: Implement drawer/menu navigation
    console.log('Menu pressed');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <GavelBackground isDark={isDark}>
        <View style={styles.inner}>
          <Header 
            title="Kanoon Mera Kavach" 
            onMenuPress={handleMenuPress}
            showThemeToggle={true}
          />
          
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={[styles.appSubtitle, { color: theme.textSecondary }]}>
              Law is the shield of the people
            </Text>

            <GlassCard
              title="Legal Search"
              description="Search Indian Constitution, IPC, CrPC and other laws. Find relevant sections instantly."
              onPress={() => navigation.navigate('LegalSearch')}
            />

            <GlassCard
              title="Discuss an Issue"
              description="Share experiences with others — anonymously or publicly. Build community solutions."
              onPress={() => navigation.navigate('PostIssue')}
            />

            <GlassCard
              title="Discussion Topics"
              description="Join community topics on police, fraud, corruption, labor rights, and more."
              onPress={() => navigation.navigate('Topics')}
            />

            <NewsCarousel />

            <Disclaimer />

            <TouchableOpacity
              style={[styles.logoutButton, { backgroundColor: theme.accent }]}
              onPress={handleLogout}
              accessibilityLabel="Logout"
            >
              <Text style={[styles.logoutText, { color: '#fff' }]}>Logout</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </GavelBackground>

      <StatusBar style={isDark ? 'light' : 'dark'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  appSubtitle: {
    fontSize: 18,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 40,
    paddingTop: 8,
    paddingHorizontal: 32,
  },
  logoutButton: {
    marginHorizontal: 24,
    marginTop: 24,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
