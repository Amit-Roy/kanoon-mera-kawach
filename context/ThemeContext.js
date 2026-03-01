// context/ThemeContext.js
import React from 'react';

export const ThemeContext = React.createContext();

export const LIGHT_THEME = {
  background: '#f5f5f5',
  surface: '#ffffff',
  text: '#0a0a0a',
  textSecondary: 'rgba(0,0,0,0.65)',
  border: 'rgba(0,0,0,0.15)',
  accent: '#4a90e2',
  card: 'rgba(255,255,255,0.9)',
  blur: '#ffffff',
};

export const DARK_THEME = {
  background: '#0f0f1a',
  surface: '#1a1a2e',
  text: '#ffffff',
  textSecondary: 'rgba(255,255,255,0.7)',
  border: 'rgba(255,255,255,0.12)',
  accent: '#4a90e2',
  card: 'rgba(255,255,255,0.04)',
  blur: '#0f0f1a',
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = React.useState(false);

  const theme = isDark ? DARK_THEME : LIGHT_THEME;

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
