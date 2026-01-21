import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";

import { ThemeContext } from "../../contexts/ThemeContext";

import { useAppSelector } from "../../store/hooks";
import { translate } from "../../locales/i18n";
import { formatOptionLabel } from "../../locales/optionLabel";

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

  const { appearance, stayLoggedIn, defaultHomepage, language } = useAppSelector(
    (state) => state.accountSettings
  );

  const navigation = useNavigation<NavigationProp>();
  const t = translate(language);

  const handleAppearanceUpdate = () => {
    navigation.navigate("OptionsScreen", {
      stateKey: "appearance",
      title: t("appearance"),
      options: ["System", "Dark", "Light"],
      selectedOptionParam: appearance,
    });
  };

  const handleStayLoggedInUpdate = () => {
    navigation.navigate("OptionsScreen", {
      stateKey: "stayLoggedIn",
      title: t("stayLoggedIn"),
      options: ["Always", "Never"],
      selectedOptionParam: stayLoggedIn,
    });
  };

  const handleDefaultHomepageUpdate = () => {
    navigation.navigate("OptionsScreen", {
      stateKey: "defaultHomepage",
      title: t("defaultHomepage"),
      options: ["Home", "Discover", "Favourites", "Community"],
      selectedOptionParam: defaultHomepage,
    });
  };

  const handleLanguageUpdate = () => {
    navigation.navigate("OptionsScreen", {
      stateKey: "language",
      title: t("language"),
      options: ["English", "Polski"],
      selectedOptionParam: language,
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
          title={t("appearance")}
          selectedOption={formatOptionLabel("appearance", appearance, t)}
          style="start"
          onPress={() => handleAppearanceUpdate()}
        />
        <DropdownList
          title={t("stayLoggedIn")}
          selectedOption={formatOptionLabel("stayLoggedIn", stayLoggedIn, t)}
          style="center"
          onPress={() => handleStayLoggedInUpdate()}
        />
        <DropdownList
          title={t("defaultHomepage")}
          selectedOption={formatOptionLabel("defaultHomepage", defaultHomepage, t)}
          style="center"
          onPress={() => handleDefaultHomepageUpdate()}
        />
        <DropdownList
          title={t("language")}
          selectedOption={formatOptionLabel("language", language, t)}
          style="end"
          onPress={() => handleLanguageUpdate()}
          isLast={true}
        />
      </View>
      <View style={styles.options}>
        <LogoutButton styles={styles} />
        <DeleteAccountButton styles={styles} />
      </View>
    </SafeAreaView>
  );
}
