import React, { useState, useRef, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useAppDispatch } from "../../store/hooks";
import { handleLogin } from "../../validation/accountManagement";

import BrandHeader from "../../components/BrandHeader";
import InputField from "../../components/InputField";
import SubmitButton from "../../components/SubmitButton";

import { ThemeContext } from "../../contexts/ThemeContext";

import type { RootStackParamList } from "../../types/navigationTypes";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function LoginScreen() {
  const { theme } = useContext(ThemeContext);

  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const passwordInputRef = useRef<TextInput>(null);

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
      opacity: 0.7,
      marginTop: 14,
      textAlign: "center",
    },
    registerLink: { color: theme.colors.primary },
  });

  const onSubmit = () => {
    handleLogin({
      email,
      password,
      setEmailError,
      setPasswordError,
      setIsSubmitting,
      navigation,
      dispatch,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.card}>
          <BrandHeader
            theme={theme}
            subtitle="Welecome back to"
            description="Sign in to continue your journey"
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
            onSubmitEditing={() => passwordInputRef.current?.focus()}
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
            autoComplete="password"
            editable={!isSubmitting}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordError(null);
            }}
            returnKeyType="done"
            showPasswordToggle
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword((prev) => !prev)}
            error={passwordError}
            inputRef={passwordInputRef}
            theme={theme}
          />

          {emailError && (
            <Text
              style={{
                color: theme.colors.error,
                marginTop: 0,
                marginBottom: 0,
              }}
            >
              {emailError}
            </Text>
          )}

          <SubmitButton
            onPress={onSubmit}
            disabled={isSubmitting}
            isSubmitting={isSubmitting}
            theme={theme}
          />

          <Text style={styles.registerText}>
            Don't have an account?{" "}
            <Text
              style={styles.registerLink}
              onPress={() => navigation.navigate("Register")}
            >
              Register
            </Text>
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
