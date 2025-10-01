import React, { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator, View } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import LoginScreen from './screens/start/LoginScreen';
import RegisterScreen from './screens/start/RegisterScreen';
import BottomTabs from './navigation/BottomTabs';

import { ThemeProvider, ThemeContext } from './contexts/ThemeContext';
import { store, RootState } from './store';
import { loadLastUserFromStorage, setUserFromStorage } from './store/userSlice';
import { loadAccountSettingsForUser, loadLastUserSettingsFromStorage, setSettingsFromStorage, setUserName, resetSettings } from './store/settingsSlice';

import type { RootStackParamList } from './types/navigationTypes';

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  const { theme } = useContext(ThemeContext);

  const dispatch = useDispatch();

  const [isAppReady, setIsAppReady] = useState(false);
  const [lastUserSettings, setLastUserSettings] = useState<{ stayLoggedIn?: string } | null>(null);
  const userIsLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const userEmail = useSelector((state: RootState) => state.user.userEmail);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const userData = await loadLastUserFromStorage();
        if (userData) {
          dispatch(setUserFromStorage(userData));
          dispatch(setUserName(userData.userName || ''));
        }

        const accountSettings = await loadAccountSettingsForUser(userData.userEmail || '');
        if (accountSettings) {
          dispatch(setSettingsFromStorage(accountSettings));
        }

        const settings = await loadLastUserSettingsFromStorage();
        setLastUserSettings(settings);

        setIsAppReady(true);
      } catch (error) {
        console.error('Error initializing app:', error);
      }
    };

    initializeApp();
  }, [dispatch]);

  useEffect(() => {
    const loadSettingsForUser = async () => {
      try {
        dispatch(resetSettings());
        if (userEmail) {
          const accountSettings = await loadAccountSettingsForUser(userEmail);
          if (accountSettings) {
            dispatch(setSettingsFromStorage(accountSettings));
          }
        }
      } catch (error) {
        console.error('Error loading settings for user:', error);
      }
    };

    if (isLoggedIn && userEmail) {
      loadSettingsForUser();
    }
  }, [dispatch, userEmail]);

  const isLoggedIn = userIsLoggedIn && lastUserSettings?.stayLoggedIn === 'Always';

  if (!isAppReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
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