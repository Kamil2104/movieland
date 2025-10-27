import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

interface SubmitButtonProps {
  onPress: () => void;
  disabled: boolean;
  isSubmitting: boolean;
  theme: any;
}

function SubmitButton({
  onPress,
  disabled,
  isSubmitting,
  theme,
}: SubmitButtonProps) {
  const styles = StyleSheet.create({
    button: {
      marginTop: 14,
      backgroundColor: theme.colors.primary,
      paddingVertical: 14,
      borderRadius: 10,
      alignItems: "center",
    },
    buttonDisabled: { opacity: 0.7 },
    buttonText: { color: "#f3f3f3", fontSize: 16, fontWeight: "600" },
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, disabled && styles.buttonDisabled]}
      activeOpacity={0.8}
      disabled={disabled}
    >
      {isSubmitting ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.buttonText}>Log in</Text>
      )}
    </TouchableOpacity>
  );
}

export default React.memo(SubmitButton)