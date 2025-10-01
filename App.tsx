import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator, View } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import LoginScreen from './screens/start/LoginScreen';
import RegisterScreen from './screens/start/RegisterScreen';
import BottomTabs from './navigation/BottomTabs';

import { ThemeProvider } from './contexts/ThemeContext';
import { store, RootState } from './store';
import { loadUserFromStorage, setUserFromStorage } from './store/userSlice';
import { loadAccountSettings, setSettingsFromStorage, setUserName } from './store/settingsSlice';

import type { RootStackParamList } from './types/navigationTypes';

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  const dispatch = useDispatch();
  const [isAppReady, setIsAppReady] = useState(false);

  // If user consents (in accountSettingsReducer), then check, otherwise set to false
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const userData = await loadUserFromStorage();
        if (userData) {
          dispatch(setUserFromStorage(userData));
          dispatch(setUserName(userData.userName || ''));
        }

        const accountSettings = await loadAccountSettings();
        if (accountSettings) {
          dispatch(setSettingsFromStorage(accountSettings));
        }

        setIsAppReady(true);
      } catch (error) {
        console.error('Error initializing app:', error);
      }
    };

    initializeApp();
  }, [dispatch]);

  if (!isAppReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={isLoggedIn ? "Main" : "Login"}
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        animationDuration: 300,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Main" component={BottomTabs} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <AppNavigator />
          </NavigationContainer>
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  );
}