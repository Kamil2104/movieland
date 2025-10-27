import React, { useContext } from "react";
import { View, Text, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useAppSelector } from "../../store/hooks";
import { ThemeContext } from "../../contexts/ThemeContext";

const ProfileCard = ({ styles }: { styles: any }) => {
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
          value={userName || ""}
          editable={false}
          focusable={false}
        />
        <Text style={styles.userEmail}>{userEmail}</Text>
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

export default ProfileCard;
