import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login as loginAction } from "../store/userSlice";
import { loginProps, registerProps } from "../types/accountManagementTypes";

async function handleLogin(props: loginProps) {
  const { email, password, setEmailError, setPasswordError, setIsSubmitting, navigation, dispatch } = props;

  const trimmedEmail = email.trim();
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
    const usersDataString = await AsyncStorage.getItem("users");
    if (!usersDataString) {
      setIsSubmitting(false);
      setEmailError("No users found. Please register first.");
      return;
    }

    const usersData = JSON.parse(usersDataString);
    const existingUser = usersData[trimmedEmail];

    if (!existingUser || existingUser.password !== trimmedPassword) {
      setIsSubmitting(false);
      setEmailError("Invalid e-mail or password.");
      return;
    }

    const userName = trimmedEmail.split("@")[0];
    dispatch(loginAction({ email: trimmedEmail, name: userName, password: trimmedPassword }));

    setTimeout(() => {
      setIsSubmitting(false);
      // @ts-ignore
      navigation.replace("Main");
    }, 800);
  } catch (err) {
    setIsSubmitting(false);
    setEmailError("Error loading user data. Please try again.");
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

  setTimeout(async () => {
    setIsSubmitting(false);

    try {
      const usersDataString = await AsyncStorage.getItem("users");
      let usersData: Record<string, { userEmail: string; userName: string; password: string; isLoggedIn: boolean }> = usersDataString
        ? JSON.parse(usersDataString)
        : {};

      if (usersData[trimmedEmail]) {
        setEmailError("User with this email already exists");
        return;
      }

      const userName = trimmedEmail.split("@")[0];

      usersData[trimmedEmail] = {
        userEmail: trimmedEmail,
        userName,
        password,
        isLoggedIn: false,
      };

      await AsyncStorage.setItem("users", JSON.stringify(usersData));

      Alert.alert("Registration successful", "Account created successfully! You can now log in.", [
        { text: "OK", onPress: () => navigation.navigate("Login") },
      ]);
    } catch (err) {
      setEmailError("Error saving user. Please try again.");
    }
  }, 800);
}

export { handleLogin, handleRegister };