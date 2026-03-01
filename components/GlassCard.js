// components/GlassCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '../context/ThemeContext';

export default function GlassCard({ title, description, onPress }) {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const { theme, isDark } = useTheme();

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={[styles.cardWrapper, { 
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }, { translateY: fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [30, 0],
          })}],
          borderColor: isDark ? theme.border : 'rgba(0,0,0,0.08)',
          backgroundColor: isDark ? 'transparent' : 'rgba(255,255,255,0.85)'
        }]}
      >
        <BlurView
          intensity={isDark ? 95 : 30}
          tint={isDark ? 'dark' : 'light'}
          style={styles.blurView}
        >
          <View style={styles.innerContent}>
            <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
            <Text style={[styles.description, { color: theme.textSecondary }]}>
              {description}
            </Text>
          </View>
        </BlurView>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    marginHorizontal: 24,
    marginVertical: 12,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  blurView: {
    borderRadius: 24,
  },
  innerContent: {
    padding: 28,
    minHeight: 160,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
});