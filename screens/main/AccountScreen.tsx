import React, { useContext } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

import { ThemeContext } from '../../contexts/ThemeContext';
import { useAppSelector } from '../../store/hooks';

import { Ionicons } from '@expo/vector-icons';

export default function AccountScreen() {
  const { theme } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: 20,
      backgroundColor: theme.colors.background,
      padding: 20,
      paddingTop: 80,
    },
    profileCard: {
      width: '100%',
      backgroundColor: theme.colors.cardBackground,
      borderRadius: 20,
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      marginBottom: 30,
      position: 'relative',
    },
    userInfoContainer: {
      flex: 1,
      justifyContent: 'center',
      gap: 4,
    },
    userName: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.colors.text,
      marginLeft: 2,
    },
    userEmail: {
      fontSize: 14,
      color: theme.colors.text,
    },
    editIcon: {
      position: 'absolute',
      top: -8,
      right: -8,
    },
  });

  return (
    <View style={styles.container}>
      <Profile styles={styles} />
    </View>
  );
}

const Profile = (props: { styles: any }) => {
  const { styles } = props;
  const { userEmail, userName } = useAppSelector((state) => state.user);

  const { theme } = useContext(ThemeContext);

  return (
    <View style={styles.profileCard}>
      <Ionicons
        name="person-circle-outline"
        color={theme.colors.primary}
        size={60}
        style={{ marginRight: 10 }}
      />

      <View style={styles.userInfoContainer}>
        <TextInput
          style={styles.userName}
          value={userName ? userName : ''}
          editable={false}
          focusable={false}
        />
        <Text style={styles.userEmail}> {userEmail} </Text>
      </View>

      <Ionicons
        name="create-outline"
        size={24}
        color={theme.colors.labelText}
        style={styles.editIcon}
      />
    </View>
  );
};