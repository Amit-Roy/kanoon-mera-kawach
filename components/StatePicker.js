// components/StatePicker.js
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { BlurView } from 'expo-blur';
import { useTheme } from '../context/ThemeContext';
import { STATE_LIST } from '../utils/states';

export default function StatePicker({ label, value, onValueChange, options }) {
  const list = options || STATE_LIST;
  const { theme, isDark } = useTheme();

  return (
    <View style={styles.container}>
      {label ? <Text style={[styles.label, { color: theme.text }]}>{label}</Text> : null}
      <BlurView
        intensity={70}
        tint={isDark ? 'dark' : 'light'}
        style={[styles.blurWrapper, { borderColor: theme.border }]}
      >
        <View style={[styles.pickerContainer, { backgroundColor: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.5)' }]}>
          <Picker
            selectedValue={value}
            onValueChange={onValueChange}
            style={[styles.picker, { color: isDark ? '#ffffff' : '#1a1a1a' }]}
            dropdownIconColor={isDark ? '#ffffff' : '#1a1a1a'}
          >
            {list.map((st) => (
              <Picker.Item key={st} label={st} value={st} color={theme.text} />
            ))}
          </Picker>
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
  },
  blurWrapper: {
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 1,
  },
  pickerContainer: {
    borderRadius: 28,
  },
  picker: {
    height: 50,
  },
});
