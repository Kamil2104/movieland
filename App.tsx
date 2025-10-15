import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { useAppSelector, useAppDispatch } from './store/hooks';
import axios from 'axios';
import { setAccountSettings } from './store/settingsSlice';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import LoginScreen from './screens/start/LoginScreen';
import RegisterScreen from './screens/start/RegisterScreen';
import BottomTabs from './navigation/BottomTabs';

import { ThemeProvider } from './contexts/ThemeContext';
import { store } from './store';

import type { RootStackParamList } from './types/navigationTypes';

import { API_URL } from '@env';

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  const { userEmail, isLoggedIn } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isLoggedIn === true) {
      const fetchSettings = async () => {
        try {
          const res = await axios.post(`${API_URL}/settings/getSettings`, {
            email: userEmail,
          });

          if (res.data.settings) {
            const settings = res.data.settings;
            dispatch(setAccountSettings({
              appearance: settings.appearance,
              stayLoggedIn: settings.stayLoggedIn,
              defaultHomepage: settings.defaultHomepage,
            }));
          }
        } catch (err) {
          console.error("Error fetching settings:", err);
        }
      };

      fetchSettings();
    }
  }, [userEmail, isLoggedIn]);

  return (
    <Stack.Navigator
      initialRouteName={"Login"}
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        animationDuration: 300,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} options={{ gestureEnabled: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ gestureEnabled: false }} />
      <Stack.Screen name="Main" component={BottomTabs} options={{ gestureEnabled: false }} />
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