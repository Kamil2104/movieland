import React, { useContext } from "react";
import { TouchableOpacity, Text, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

import { useAppSelector } from "../../store/hooks";
import { ThemeContext } from "../../contexts/ThemeContext";
import { API_URL } from "@env";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigationTypes";
import { translate } from "../../locales/i18n";

type NavigationPropLogin = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

const DeleteAccountButton = ({ styles }: { styles: any }) => {
  const { theme } = useContext(ThemeContext);
  const { userEmail } = useAppSelector((state) => state.user);
  const { language } = useAppSelector((state) => state.accountSettings);
  const t = translate(language);

  const navigationLogin = useNavigation<NavigationPropLogin>();

  const handleDeleteAccountAction = async () => {
    try {
      navigationLogin.replace("Login");
      await axios.post(`${API_URL}/deleteAccount`, { email: userEmail });
    } catch (err: any) {
      console.log("Error deleting account: ", err.message);
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      t("deleteTitle"),
      t("deleteMessage"),
      [
        { text: t("deleteCancel"), style: "cancel" },
        {
          text: t("deleteConfirm"),
          style: "destructive",
          onPress: handleDeleteAccountAction,
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity
      style={styles.deleteAccountButton}
      onPress={handleDeleteAccount}
    >
      <Text style={styles.deleteAccountText}>{t("deleteAccount")}</Text>
      <Ionicons name="trash-outline" size={24} color={theme.colors.error} />
    </TouchableOpacity>
  );
};

export default DeleteAccountButton;
