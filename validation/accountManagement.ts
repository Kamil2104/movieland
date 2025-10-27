import { Alert } from "react-native";
import axios from "axios";
import { API_URL } from "@env";
import { login } from "../store/userSlice";
import { loginProps, registerProps } from "../types/accountManagementTypes";
import {
  validateEmail,
  validatePassword,
  handleAxiosError,
} from "../utils/userValidation";

// ---------- LOGIN ----------
export async function handleLogin(props: loginProps) {
  const {
    email,
    password,
    setEmailError,
    setPasswordError,
    setIsSubmitting,
    navigation,
    dispatch,
  } = props;
  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();
  const userName = trimmedEmail.split("@")[0];

  if (!trimmedEmail) return setEmailError("Enter e-mail");
  if (!trimmedPassword) return setPasswordError("Enter password");
  if (!validateEmail(trimmedEmail)) return setEmailError("Enter valid e-mail");

  setIsSubmitting(true);

  try {
    const res = await axios.post(`${API_URL}/auth/login`, {
      email: trimmedEmail,
      password: trimmedPassword,
    });
    if (res.data.message === "Success") {
      dispatch(login({ email, userName, password }));
      navigation.navigate("Main");
    } else setEmailError(res.data.message || "Unexpected error");
  } catch (err) {
    handleAxiosError(err, setEmailError);
  } finally {
    setIsSubmitting(false);
  }
}

// ---------- REGISTER ----------
export async function handleRegister(props: registerProps) {
  const {
    email,
    password,
    confirmPassword,
    setEmailError,
    setPasswordError,
    setConfirmPasswordError,
    setIsSubmitting,
    navigation,
  } = props;
  const trimmedEmail = email?.trim();
  const userName = trimmedEmail?.split("@")[0];

  setEmailError(null);
  setPasswordError(null);
  setConfirmPasswordError(null);

  if (!trimmedEmail) return setEmailError("Enter e-mail");
  if (!password) return setPasswordError("Enter password");
  if (!confirmPassword) return setConfirmPasswordError("Confirm password");
  if (!validateEmail(trimmedEmail)) return setEmailError("Enter valid e-mail");
  if (!validatePassword(password))
    return setPasswordError(
      "Password is weak.\nIt must have at least:\n- 4 characters\n- 1 uppercase letter\n- 1 number\n- 1 special character"
    );
  if (password !== confirmPassword)
    return setConfirmPasswordError("Passwords do not match");

  setIsSubmitting(true);

  try {
    const res = await axios.post(`${API_URL}/auth/register`, {
      email: trimmedEmail,
      name: userName,
      password,
    });
    if (res.data.message === "Success") {
      Alert.alert(
        "Registration successful",
        "Account created successfully! You can now log in.",
        [{ text: "OK", onPress: () => navigation.navigate("Login") }]
      );
    } else setEmailError(res.data.message || "Unexpected error");
  } catch (err) {
    handleAxiosError(err, setEmailError);
  } finally {
    setIsSubmitting(false);
  }
}
