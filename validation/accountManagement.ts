import { Alert } from "react-native";

import { login  } from "../store/userSlice";

import { loginProps, registerProps } from "../types/accountManagementTypes";

import axios from "axios";

const API_URL = "https://spectral-unacclimatized-abe.ngrok-free.dev"

async function handleLogin(props: loginProps) {
  const { email, password, setEmailError, setPasswordError, setIsSubmitting, navigation, dispatch } = props;

  const trimmedEmail = email.trim();
  const userName = trimmedEmail.split("@")[0];
  const trimmedPassword = password.trim();

  if (!trimmedEmail) {
    setEmailError("Enter e-mail");
    return;
  }

  if (!trimmedPassword) {
    setPasswordError("Enter password");
    return;
  }

  const emailLooksValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(trimmedEmail);
  if (!emailLooksValid) {
    setEmailError("Enter valid e-mail");
    return;
  }

  setIsSubmitting(true);

  try {
    const res = await axios.post(`${API_URL}/login`, {
      email: trimmedEmail,
      password: trimmedPassword,
    });

    if (res.data.message === "Success") {
      navigation.navigate("Main")
      dispatch(login({ email, userName, password }))
    } else {
      setEmailError(res.data.message || "Unexpected error");
    }

  } catch (err: any) {
      if (err.status === 404 || err.status === 401) {
        setEmailError("Invalid e-mail or password");
      } else {
        setEmailError("Server error. Please try again")
      }
  } finally {
    setIsSubmitting(false);
  }
}

async function handleRegister(props: registerProps) {
  const { email, password, confirmPassword, setEmailError, setPasswordError, setConfirmPasswordError, setIsSubmitting, navigation } = props;

  setEmailError(null);
  setPasswordError(null);
  setConfirmPasswordError(null);

  const trimmedEmail = email?.trim();

  if (!trimmedEmail) {
    setEmailError("Enter e-mail");
    return;
  }

  if (!password) {
    setPasswordError("Enter password");
    return;
  }

  if (!/.+@.+\..+/.test(trimmedEmail)) {
    setEmailError("Enter valid e-mail");
    return;
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{4,}$/;
  if (!passwordRegex.test(password)) {
    setPasswordError("Password is weak.\nIt must have at least:\n- 4 characters\n- 1 uppercase letter\n- 1 number\n- 1 special character");
    return;
  }

  if (!confirmPassword) {
    setConfirmPasswordError("Confirm password");
    return;
  }

  if (password !== confirmPassword) {
    setConfirmPasswordError("Passwords do not match");
    return;
  }

  setIsSubmitting(true);

  try {
    const userName = trimmedEmail.split("@")[0];

    const res = await axios.post(`${API_URL}/register`, {
      email: trimmedEmail,
      name: userName,
      password: password,
    });

    if (res.data.message === "Success") {
      Alert.alert("Registration successful", "Account created successfully! You can now log in.", [
        { text: "OK", onPress: () => navigation.navigate("Login") },
      ]);
    } else {
      setEmailError(res.data.message || "Unexpected error");
    }

  } catch (err: any) {
    if (err.response?.status === 400) {
      setEmailError("User already exists");
    } else {
      setEmailError("Server error. Please try again.");
    }
  } finally {
    setIsSubmitting(false);
  }
}

export { handleLogin, handleRegister };