import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";

type LoginScreenProps = {
  onLogin: (email: string) => void;
};

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = () => {
    setEmailError(null);
    setPasswordError(null);

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail) {
        setEmailError("Enter e-mail");
      return;
    } else if (!trimmedPassword) {
        setPasswordError("Enter password");
      return;
    }

    // Basic e-mail validation
    const emailLooksValid = /.+@.+\..+/.test(trimmedEmail);
    if (!emailLooksValid) {
        setEmailError("Enter valid e-mail");
      return;
    }

    setIsSubmitting(true);
    // Mock login
    setTimeout(() => {
      setIsSubmitting(false);
      onLogin(trimmedEmail);
    }, 800);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Log in to movieland!</Text>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="your@email.com"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoComplete="email"
            style={styles.input}
            editable={!isSubmitting}
            onChange={() => setEmailError(null)}
          />
        </View>

        {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry
            textContentType="password"
            autoComplete="password"
            style={styles.input}
            editable={!isSubmitting}
            onChange={() => setPasswordError(null)}
        />
        </View>

        {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}

        <TouchableOpacity
          onPress={handleSubmit}
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

        <Text style={styles.registerText}>Don't have an account? <Text style={styles.registerLink}>Register</Text></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0b0b0d',
    paddingHorizontal: 16,
  },
  card: {
    width: '95%',
    maxWidth: 420,
    backgroundColor: '#131318',
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
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  fieldGroup: {
    marginTop: 14,
    marginBottom: 6,
  },
  label: {
    color: '#b5b7be',
    marginBottom: 6,
    fontSize: 14,
  },
  input: {
    backgroundColor: '#1b1c22',
    borderWidth: 1,
    borderColor: '#2a2b33',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: '#ffffff',
    fontSize: 16,
  },
  error: {
    color: '#ff6b6b',
    marginTop: 0,
    marginBottom: 0,
  },
  button: {
    marginTop: 14,
    backgroundColor: '#e11d48',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  registerText: {
    color: '#b5b7be',
    marginTop: 14,
    textAlign: 'center',
  },
  registerLink: {
    color: '#e11d48',
  },
  forgotPasswordText: {
    color: '#b5b7be',
    marginTop: 14,
    textAlign: 'center',
  },
  forgotPasswordLink: {
    color: '#e11d48',
  },
});