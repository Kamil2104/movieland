import React, { useState, useContext, useRef } from "react";

import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Keyboard, TouchableWithoutFeedback } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import { ThemeContext } from "../../contexts/ThemeContext";
import { useAppDispatch } from "../../store/hooks";

import type { RootStackParamList } from "../../types/navigationTypes";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";

import { handleLogin } from "../../validation/accountManagement";

export default function LoginScreen() {
  const { theme } = useContext(ThemeContext);
  const dispatch = useAppDispatch();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const passwordInputRef = useRef<TextInput>(null);

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
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: theme.colors.text,
      textAlign: 'center',
      marginTop: 20,
      marginBottom: 0,
    },
    brandName: {
      fontSize: 32,
      fontWeight: '800',
      textAlign: 'center',
      letterSpacing: 1,
      marginBottom: 0,
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
    error: {
      color: theme.colors.error,
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
      color: '#f3f3f3',
      fontSize: 16,
      fontWeight: '600',
    },
    registerText: {
      color: theme.colors.labelText,
      opacity: 0.7,
      marginTop: 14,
      textAlign: 'center',
    },
    registerLink: {
      color: theme.colors.primary,
    },
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.card}>
        <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
          <Text style={styles.title}>Welcome back to</Text>
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
          <Text style={styles.subtitle}>Sign in to continue your journey</Text>
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
            onSubmitEditing={() => passwordInputRef.current?.focus()}
          />
        </View>

        {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Password</Text>
          <View style={{ position: 'relative', justifyContent: 'center' }}>
            <TextInput
              ref={passwordInputRef}
              value={password}
              placeholder="••••••••"
              placeholderTextColor={theme.colors.inputPlaceholder}
              secureTextEntry={!showPassword}
              keyboardType="ascii-capable"
              textContentType="password"
              autoComplete="password"
              style={styles.input}
              editable={!isSubmitting}
              onChangeText={(text) => { setPassword(text); setPasswordError(null); }}
              returnKeyType="done"
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

        <TouchableOpacity
          onPress={() => handleLogin({ email, password, setEmailError, setPasswordError, setIsSubmitting, navigation, dispatch })}
          style={[styles.button, isSubmitting && styles.buttonDisabled]}
          activeOpacity={0.8}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Log in</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.registerText}>Don't have an account? <Text style={styles.registerLink} onPress={() => navigation.navigate("Register")}>Register</Text></Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}