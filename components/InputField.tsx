import React from "react";
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface InputFieldProps {
  label: string;
  value: string;
  placeholder: string;
  placeholderTextColor: string;
  keyboardType?: "default" | "email-address" | "ascii-capable";
  textContentType?: TextInputProps["textContentType"];
  autoComplete?: TextInputProps["autoComplete"];
  secureTextEntry?: boolean;
  editable: boolean;
  onChangeText: (text: string) => void;
  returnKeyType?: "done" | "next";
  onSubmitEditing?: () => void;
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  error?: string | null;
  inputRef?: React.RefObject<TextInput | null>;
  theme: any;
}

function InputField({
  label,
  value,
  placeholder,
  placeholderTextColor,
  keyboardType = "default",
  textContentType,
  autoComplete,
  secureTextEntry = false,
  editable,
  onChangeText,
  returnKeyType,
  onSubmitEditing,
  showPasswordToggle = false,
  showPassword = false,
  onTogglePassword,
  error,
  inputRef,
  theme,
}: InputFieldProps) {
  const styles = StyleSheet.create({
    fieldGroup: { marginTop: 14, marginBottom: 6 },
    label: {
      color: theme.colors.labelText,
      opacity: 0.7,
      marginBottom: 6,
      fontSize: 14,
    },
    input: {
      backgroundColor: theme.colors.inputBackground,
      borderWidth: 1,
      borderColor: theme.colors.inputBorder,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 12,
      color: theme.colors.text,
      fontSize: 16,
    },
    error: { color: theme.colors.error, marginTop: 0, marginBottom: 0 },
    passwordToggleContainer: {
      position: "absolute",
      right: 12,
      top: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    },
  });

  return (
    <>
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>{label}</Text>
        <View style={{ position: "relative", justifyContent: "center" }}>
          <TextInput
            ref={inputRef}
            value={value}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            keyboardType={keyboardType}
            textContentType={textContentType}
            autoComplete={autoComplete}
            secureTextEntry={secureTextEntry && !showPassword}
            editable={editable}
            onChangeText={onChangeText}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
            style={styles.input}
          />
          {showPasswordToggle && onTogglePassword && (
            <TouchableOpacity
              onPress={onTogglePassword}
              style={styles.passwordToggleContainer}
              disabled={!editable}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={22}
                color={theme.colors.inputPlaceholder}
              />
            </TouchableOpacity>
          )}
        </View>
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    </>
  );
}

export default React.memo(InputField)