import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";

import { ThemeContext } from "../../contexts/ThemeContext";

import { useAppSelector } from "../../store/hooks";

import { SafeAreaView } from "react-native-safe-area-context";

import ProfileCard from "../../components/AccountScreen/ProfileCard";
import LogoutButton from "../../components/AccountScreen/LogoutButton";
import DeleteAccountButton from "../../components/AccountScreen/DeleteAccountButton";
import DropdownList from "../../components/DropdownList";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import {
  AccountStackParamList,
  RootStackParamList,
} from "../../types/navigationTypes";

import { spacing } from "../../styles/spacing";

type NavigationProp = NativeStackNavigationProp<
  AccountStackParamList,
  "AccountMain"
>;
type NavigationPropLogin = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

export default function AccountScreen() {
  const { theme } = useContext(ThemeContext);

  const { appearance, stayLoggedIn, defaultHomepage } = useAppSelector(
    (state) => state.accountSettings
  );

  const navigation = useNavigation<NavigationProp>();

  const handleAppearanceUpdate = () => {
    navigation.navigate("OptionsScreen", {
      stateKey: "appearance",
      title: "Appearance",
      options: ["System", "Dark", "Light"],
      selectedOptionParam: appearance,
    });
  };

  const handleStayLoggedInUpdate = () => {
    navigation.navigate("OptionsScreen", {
      stateKey: "stayLoggedIn",
      title: "Stay logged in",
      options: ["Always", "Never"],
      selectedOptionParam: stayLoggedIn,
    });
  };

  const handleDefaultHomepageUpdate = () => {
    navigation.navigate("OptionsScreen", {
      stateKey: "defaultHomepage",
      title: "Default homepage",
      options: ["Home", "Discover", "Favourites", "Community"],
      selectedOptionParam: defaultHomepage,
    });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start",
      gap: 20,
      backgroundColor: theme.colors.background,
      padding: spacing.padding,
    },
    profileCard: {
      width: "100%",
      backgroundColor: theme.colors.cardBackground,
      borderRadius: 20,
      padding: 20,
      flexDirection: "row",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      position: "relative",
    },
    userInfoContainer: {
      flex: 1,
      justifyContent: "center",
      gap: 4,
    },
    userName: {
      fontSize: 18,
      fontWeight: "700",
      color: theme.colors.text,
      marginLeft: 2,
    },
    userEmail: {
      fontSize: 14,
      color: theme.colors.text,
    },
    editIcon: {
      position: "absolute",
      top: -8,
      right: -8,
    },
    options: {
      height: "auto",
      width: "100%",
      flexDirection: "column",
    },
    logoutButton: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.cardBackground,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingHorizontal: spacing.padding,
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.divider,
    },
    logoutContainer: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: theme.colors.cardBackground,
    },
    logoutText: {
      fontSize: 16,
      fontWeight: "500",
      color: theme.colors.text,
    },
    deleteAccountButton: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: theme.colors.cardBackground,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      paddingVertical: 15,
      paddingHorizontal: spacing.padding,
    },
    deleteAccountText: {
      fontSize: 16,
      fontWeight: "500",
      color: theme.colors.error,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ProfileCard styles={styles} />
      <View style={styles.options}>
        <DropdownList
          title="Appearance"
          selectedOption={appearance}
          style="start"
          onPress={() => handleAppearanceUpdate()}
        />
        <DropdownList
          title="Stay logged in"
          selectedOption={stayLoggedIn}
          style="center"
          onPress={() => handleStayLoggedInUpdate()}
        />
        <DropdownList
          title="Default homepage"
          selectedOption={defaultHomepage}
          style="end"
          onPress={() => handleDefaultHomepageUpdate()}
        />
      </View>
      <View style={styles.options}>
        <LogoutButton styles={styles} />
        <DeleteAccountButton styles={styles} />
      </View>
    </SafeAreaView>
  );
}
