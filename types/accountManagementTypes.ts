type loginProps = {
    email: string;
    password: string;
    setEmailError: (error: string | null) => void;
    setPasswordError: (error: string | null) => void;
    setIsSubmitting: (isSubmitting: boolean) => void;
    navigation: any;
    dispatch: any;
}

type registerProps = {
    email: string | null;
    password: string | null;
    confirmPassword: string | null;
    setEmailError: (error: string | null) => void;
    setPasswordError: (error: string | null) => void;
    setConfirmPasswordError: (error: string | null) => void;
    setIsSubmitting: (isSubmitting: boolean) => void;
    navigation: any;
  }

export {
  loginProps,
  registerProps
}