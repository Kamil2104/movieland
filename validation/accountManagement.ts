import { Alert } from "react-native";

import usersData from "../store/users.json";

import { loginProps, registerProps } from "../types/accountManagementTypes";

function handleLogin(props: loginProps) {
    const { email, password, setEmailError, setPasswordError, setIsSubmitting, navigation } = props;

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail) {
      setEmailError("Enter e-mail");
      return;
    } else if (!trimmedPassword) {
      setPasswordError("Enter password");
      return;
    }

    const emailLooksValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(trimmedEmail);
    if (!emailLooksValid) {
      setEmailError("Enter valid e-mail");
      return;
    }

    const user = usersData.users.find((user) => user.user === trimmedEmail && user.password === trimmedPassword);

    if (!user) {
      Alert.alert(
        "Login error",
        "Invalid e-mail or password",
        [{ text: "OK" }],
        { cancelable: true }
      );
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      // @ts-ignore
      navigation.replace("Main");
    }, 800);
};



function handleRegister(props: registerProps) {
  const { email, password, confirmPassword, setEmailError, setPasswordError, setConfirmPasswordError, setIsSubmitting, navigation } = props;

  setEmailError(null);
  setPasswordError(null);
  setConfirmPasswordError(null);

  const trimmedEmail = email?.trim();
  const trimmedPassword = password?.trim();
  const trimmedConfirm = confirmPassword?.trim();

  if (!trimmedEmail) {
    setEmailError("Enter e-mail");
    return;
  }

  if (!/.+@.+\..+/.test(trimmedEmail)) {
    setEmailError("Enter valid e-mail");
    return;
  }

  if (!trimmedPassword) {
    setPasswordError("Enter password");
    return;
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{4,}$/;
  if (!passwordRegex.test(trimmedPassword)) {
    setPasswordError("Password is weak.\nIt must have at least:\n- 4 characters\n- 1 uppercase letter\n- 1 number\n- 1 special character");
    return;
  }

  if (!trimmedConfirm) {
    setConfirmPasswordError("Confirm password");
    return;
  }

  if (trimmedPassword !== trimmedConfirm) {
    setConfirmPasswordError("Passwords do not match");
    return;
  }

  setIsSubmitting(true);
  setTimeout(() => {
    setIsSubmitting(false);
    navigation.navigate("Login");
  }, 800);
};

export {
  handleLogin,
  handleRegister
};