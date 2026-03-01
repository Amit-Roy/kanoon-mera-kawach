import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getAuthInstance, initializeAuthAsync } from './firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import GavelBackground from './components/GavelBackground';
import HomeScreen from './screens/HomeScreen';
import PostIssueScreen from './screens/PostIssueScreen';
import LegalSearchScreen from './screens/LegalSearchScreen';
import TopicsScreen from './screens/TopicsScreen';
import TopicDetailScreen from './screens/TopicDetailScreen';
import PostDetailScreen from './screens/PostDetailScreen';
import { useTheme, DARK_THEME } from './context/ThemeContext';

const Stack = createStackNavigator();

// Simple Login / Signup Screen
function AuthScreenContent() {
  const { setUser } = useAuth();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isSignup, setIsSignup] = React.useState(false);
  const [error, setError] = React.useState('');
  const { theme } = useTheme();

  const handleAuth = async () => {
    try {
      setError('');
      console.log('Login attempt - initializing auth...');
      
      // Initialize auth on first login attempt (will delay until ready)
      const authResult = await initializeAuthAsync();
      console.log('Auth initialized successfully');
      
      const auth = getAuthInstance();
      console.log('Got auth instance, attempting', isSignup ? 'signup' : 'login');
      
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      
      console.log('Auth action completed successfully');
      
      // Get current user and notify parent via context
      const currentUser = auth.currentUser;
      if (currentUser) {
        console.log('User logged in:', currentUser.email);
        setUser(currentUser);
      }
    } catch (err) {
      console.error('Auth error:', err.message || err);
      setError(err.message || 'Authentication failed. Please try again.');
    }
  };

  return (
    <View style={[styles.authContainer, { backgroundColor: theme.background }]}>
      <GavelBackground isDark={theme === DARK_THEME}>
        <View style={styles.authInner}>
          <Text style={[styles.appTitle, { color: theme.text }]}>Kanoon Mera Kavach</Text>

          <TextInput
            style={[styles.input, { backgroundColor: theme.surface, color: theme.text, borderColor: theme.border }]}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={theme.textSecondary}
          />
          <TextInput
            style={[styles.input, { backgroundColor: theme.surface, color: theme.text, borderColor: theme.border }]}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor={theme.textSecondary}
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Button 
            title={isSignup ? 'Sign Up' : 'Log In'} 
            onPress={handleAuth} 
            color={theme.accent}
          />

          <Button 
            title={isSignup ? 'Already have an account? Log In' : 'Create new account'} 
            onPress={() => setIsSignup(!isSignup)} 
            color={theme.textSecondary}
          />

          <Text style={[styles.disclaimerSmall, { color: theme.textSecondary }]}>
            This is NOT legal advice. Consult a qualified lawyer.
          </Text>
        </View>
      </GavelBackground>

      <StatusBar style={theme === DARK_THEME ? 'light' : 'dark'} />
    </View>
  );
}

function AuthScreen() {
  return <AuthScreenContent />;
}

export default function App() {
  const [user, setUser] = React.useState(null);
  const [authInitialized, setAuthInitialized] = React.useState(false);
  const [authError, setAuthError] = React.useState(null);

  React.useEffect(() => {
    // Set auth initialized immediately - don't wait for auth module
    // Auth will be initialized on-demand when user logs in
    setAuthInitialized(true);
  }, []);

  // Show loading screen while auth initializes
  if (!authInitialized) {
    return (
      <View style={[styles.splashContainer, { backgroundColor: '#0f0f1a' }]}>
        <Text style={styles.splashText}>Loading Kanoon Mera Kavach...</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider value={{ user, setUser }}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {user ? (
                <>
                  <Stack.Screen name="Home" component={HomeScreen} />
                  <Stack.Screen name="PostIssue" component={PostIssueScreen} />
                  <Stack.Screen name="LegalSearch" component={LegalSearchScreen} />
                  <Stack.Screen name="Topics" component={TopicsScreen} />
                  <Stack.Screen name="TopicDetail" component={TopicDetailScreen} />
                  <Stack.Screen name="PostDetail" component={PostDetailScreen} />
                </>
              ) : (
                <Stack.Screen name="Auth" component={AuthScreen} />
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#0f0f1a', // deep dark for glassy contrast
    paddingTop: 60,
  },
  authContainer: {
    flex: 1,
  },
  authInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  appTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 24,
    textAlign: 'center',
  },
  appSubtitle: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.70)',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 32,
  },
  input: {
    width: '100%',
    height: 52,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    paddingHorizontal: 16,
    color: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    marginVertical: 10,
  },
  errorText: {
    color: '#ff6b6b',
    marginVertical: 10,
    textAlign: 'center',
  },
  disclaimer: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.50)',
    textAlign: 'center',
    marginTop: 40,
    paddingHorizontal: 32,
  },
  disclaimerSmall: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.45)',
    textAlign: 'center',
    marginTop: 32,
  },
  placeholderContainer: {
    flex: 1,
    backgroundColor: '#0f0f1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 24,
    color: '#ffffff',
    marginBottom: 16,
  },
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f0f1a',
  },
  splashText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
  },
});