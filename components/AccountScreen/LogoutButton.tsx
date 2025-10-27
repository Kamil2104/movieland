import React, { useContext } from "react";
import { TouchableOpacity, View, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/userSlice";
import { ThemeContext } from "../../contexts/ThemeContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigationTypes";

type NavigationPropLogin = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

const LogoutButton = ({ styles }: { styles: any }) => {
  const { theme } = useContext(ThemeContext);
  const dispatch = useAppDispatch();

  const navigationLogin = useNavigation<NavigationPropLogin>();

  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Do you really want to log out of your account?",
      [
        { text: "Stay Logged In", style: "cancel" },
        {
          text: "Log Out",
          style: "destructive",
          onPress: () => {
            dispatch(logout());
            navigationLogin.replace("Login");
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
      <View style={styles.logoutContainer}>
        <Text style={styles.logoutText}>Logout</Text>
        <Ionicons name="log-out-outline" size={24} color={theme.colors.text} />
      </View>
    </TouchableOpacity>
  );
};

export default LogoutButton;
