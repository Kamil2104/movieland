import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";


import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../types/navigationTypes";

import { handleRegister } from "../../validation/accountManagement";

import lightTheme from "../../themes/lightTheme";

export default function RegisterScreen() {
  const theme = lightTheme

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    paddingHorizontal: 16,
  },
  card: {
    width: '95%',
    maxWidth: 420,
    backgroundColor: theme.colors.secondaryBackground,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  brandName: {
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 8,
  },
  gradientText: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: theme.colors.labelText,
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 22,
  },
  fieldGroup: {
    marginTop: 14,
    marginBottom: 6,
  },
  label: {
    color: theme.colors.labelText,
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
  error: {
    color: theme. colors.error,
    marginTop: 0,
    marginBottom: 0,
  },
  button: {
    marginTop: 14,
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: theme.colors.buttonText,
    fontSize: 16,
    fontWeight: '600',
  },
  registerText: {
    color: theme.colors.labelText,
    marginTop: 14,
    textAlign: 'center',
  },
  registerLink: {
    color: theme.colors.primary,
  },
});

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Welcome to</Text>
            <MaskedView
              style={{ height: 40, width: '100%' }}
              maskElement={
                <Text style={styles.brandName}>MovieLand</Text>
              }
            >
              <LinearGradient
                colors={[theme.colors.primary, theme.colors.primary, '#ff6b6b', theme.colors.primary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ flex: 1 }}
              />
            </MaskedView>
            <Text style={styles.subtitle}>Create your account to start exploring</Text>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              value={email}
              placeholder="your@email.com"
              placeholderTextColor={theme.colors.inputPlaceholder}
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoComplete="email"
              style={styles.input}
              editable={!isSubmitting}
              onChangeText={(text) => { setEmail(text); setEmailError(null); }}
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => passwordRef.current?.focus()}
            />
          </View>

          {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={{ position: 'relative', justifyContent: 'center' }}>
              <TextInput
                ref={passwordRef}
                value={password}
                placeholder="••••••••"
                placeholderTextColor={theme.colors.inputPlaceholder}
                secureTextEntry={!showPassword}
                keyboardType="ascii-capable"
                textContentType="password"
                autoComplete="password-new"
                style={styles.input}
                editable={!isSubmitting}
                onChangeText={(text) => { setPassword(text); setPasswordError(null); }}
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => confirmPasswordRef.current?.focus()}
              />
              <TouchableOpacity
                onPress={() => setShowPassword((prev) => !prev)}
                style={{
                  position: 'absolute',
                  right: 12,
                  top: 0,
                  bottom: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
                disabled={isSubmitting}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={22}
                  color={theme.colors.inputPlaceholder}
                />
              </TouchableOpacity>
            </View>
          </View>

          {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Confirm password</Text>
            <View style={{ position: 'relative', justifyContent: 'center' }}>
              <TextInput
                ref={confirmPasswordRef}
                value={confirmPassword}
                placeholder="••••••••"
                placeholderTextColor={theme.colors.inputPlaceholder}
                secureTextEntry={!showConfirmPassword}
                keyboardType="ascii-capable"
                textContentType="password"
                autoComplete="password-new"
                style={styles.input}
                editable={!isSubmitting}
                onChangeText={(text) => { setConfirmPassword(text); setConfirmPasswordError(null); }}
                returnKeyType="done"
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword((prev) => !prev)}
                style={{
                  position: 'absolute',
                  right: 12,
                  top: 0,
                  bottom: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
                disabled={isSubmitting}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-off" : "eye"}
                  size={22}
                  color={theme.colors.inputPlaceholder}
                />
              </TouchableOpacity>
            </View>
          </View>

          {confirmPasswordError ? <Text style={styles.error}>{confirmPasswordError}</Text> : null}

          <TouchableOpacity
            onPress={() => handleRegister({ email, password, confirmPassword, setEmailError, setPasswordError, setConfirmPasswordError, setIsSubmitting, navigation })}
            style={[styles.button, isSubmitting && styles.buttonDisabled]}
            activeOpacity={0.8}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color={theme.colors.text} />
            ) : (
              <Text style={styles.buttonText}>Register</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.registerText}>
            Already have an account? <Text style={styles.registerLink} onPress={() => navigation.navigate("Login")}>Log in</Text>
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}