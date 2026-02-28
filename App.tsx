import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { AppNavigator } from './src/navigation/AppNavigator';

// Import global CSS for Tailwind
import './src/styles/global.css';

import { PortalHost } from '@rn-primitives/portal';

const NavigationWrapper = () => {
  const { isDark } = useTheme();

  return (
    <>
      <NavigationContainer theme={
        // Apply correct theme colors to navigation if needed
        isDark ? {
          ...DarkTheme,
          colors: {
            ...DarkTheme.colors,
            primary: '#3b82f6',
            background: '#111827',
            card: '#1f2937',
            text: '#f9fafb',
            border: '#374151',
            notification: '#ef4444',
          }
        } : {
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            primary: '#3b82f6',
            background: '#f9fafb',
            card: '#ffffff',
            text: '#111827',
            border: '#e5e7eb',
            notification: '#ef4444',
          }
        }
      }>
        <AppNavigator />
      </NavigationContainer>
      <PortalHost />
    </>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationWrapper />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
