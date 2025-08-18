import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import 'react-native-reanimated';
import HomeScreen from '../src/Screens/HomeScreen'; // Updated path if you're not using path aliases
import { ToastProvider } from '../src/components/ToastProvider';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const loadFonts = async () => {
    try {
      await Font.loadAsync({
        'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
        'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
      });
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (e) {
      // Optionally log error
      console.error('Font loading failed:', e);
    } finally {
      await SplashScreen.hideAsync();
    }
  };

  useEffect(() => {
    loadFonts();
  }, []);

  return (
    <ToastProvider>
      <View style={{ flex: 1 }}>
        <HomeScreen />
      </View>
    </ToastProvider>
  );
}
