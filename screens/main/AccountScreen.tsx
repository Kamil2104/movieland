import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { ThemeContext } from '../../contexts/ThemeContext';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { logout } from '../../store/userSlice';

export default function AccountScreen() {
  const { theme } = useContext(ThemeContext);
  const { isLoggedIn, userEmail, userName } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 20,
    },
    userInfo: {
      fontSize: 18,
      color: theme.colors.text,
      marginBottom: 10,
    },
    emailInfo: {
      fontSize: 16,
      color: theme.colors.labelText,
      marginBottom: 30,
    },
    logoutButton: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 8,
    },
    logoutButtonText: {
      color: theme.colors.buttonText,
      fontSize: 16,
      fontWeight: '600',
    }
  });

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account</Text>

      {isLoggedIn ? (
        <>
          <Text style={styles.userInfo}>Welcome, {userName}!</Text>
          <Text style={styles.emailInfo}>Email: {userEmail}</Text>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.userInfo}>Not logged in</Text>
      )}
    </View>
  );
}