import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import darkTheme from "../../themes/darkTheme";
import { handleRegister } from "../../validation/accountManagement";
import BrandHeader from "../../components/BrandHeader";
import InputField from "../../components/InputField";
import SubmitButton from "../../components/SubmitButton";
import type { RootStackParamList } from "../../types/navigationTypes";

export default function RegisterScreen() {
  const theme = darkTheme;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordRef = useRef<TextInput | null>(null);
  const confirmPasswordRef = useRef<TextInput | null>(null);

  const onSubmit = () => {
    handleRegister({
      email,
      password,
      confirmPassword,
      setEmailError,
      setPasswordError,
      setConfirmPasswordError,
      setIsSubmitting,
      navigation,
    });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.background,
      paddingHorizontal: 16,
    },
    card: {
      width: "95%",
      maxWidth: 420,
      backgroundColor: theme.colors.secondaryBackground,
      borderRadius: 12,
      padding: 20,
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 8 },
      elevation: 3,
    },
    registerText: {
      color: theme.colors.labelText,
      marginTop: 14,
      textAlign: "center",
    },
    registerLink: {
      color: theme.colors.primary,
    },
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.card}>
          <BrandHeader
            theme={theme}
            subtitle="Welcome to"
            description="Create your account to start exploring"
          />

          <InputField
            label="E-mail"
            value={email}
            placeholder="your@email.com"
            placeholderTextColor={theme.colors.inputPlaceholder}
            keyboardType="email-address"
            textContentType="emailAddress"
            autoComplete="email"
            editable={!isSubmitting}
            onChangeText={(text) => {
              setEmail(text);
              setEmailError(null);
            }}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
            error={emailError}
            theme={theme}
          />

          <InputField
            label="Password"
            value={password}
            placeholder="••••••••"
            placeholderTextColor={theme.colors.inputPlaceholder}
            secureTextEntry={!showPassword}
            keyboardType="ascii-capable"
            textContentType="password"
            autoComplete="password-new"
            editable={!isSubmitting}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordError(null);
            }}
            returnKeyType="next"
            inputRef={passwordRef}
            onSubmitEditing={() => confirmPasswordRef.current?.focus()}
            error={passwordError}
            showPasswordToggle
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword((prev) => !prev)}
            theme={theme}
          />

          <InputField
            label="Confirm Password"
            value={confirmPassword}
            placeholder="••••••••"
            placeholderTextColor={theme.colors.inputPlaceholder}
            secureTextEntry={!showConfirmPassword}
            keyboardType="ascii-capable"
            textContentType="password"
            autoComplete="password-new"
            editable={!isSubmitting}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setConfirmPasswordError(null);
            }}
            returnKeyType="done"
            inputRef={confirmPasswordRef}
            error={confirmPasswordError}
            showPasswordToggle
            showPassword={showConfirmPassword}
            onTogglePassword={() => setShowConfirmPassword((prev) => !prev)}
            theme={theme}
          />

          <SubmitButton
            onPress={onSubmit}
            disabled={isSubmitting}
            isSubmitting={isSubmitting}
            theme={theme}
          />

          <Text style={styles.registerText}>
            Already have an account?{" "}
            <Text
              style={styles.registerLink}
              onPress={() => navigation.navigate("Login")}
            >
              Log in
            </Text>
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
