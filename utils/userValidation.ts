export const validateEmail = (email: string): boolean =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(email);

export const validatePassword = (password: string): boolean =>
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{4,}$/.test(
    password
  );

export const handleAxiosError = (err: any, setError: (msg: string) => void) => {
  if (err.response?.status === 400) setError("User already exists");
  else if (err.response?.status === 404 || err.response?.status === 401)
    setError("Invalid e-mail or password");
  else setError("Server error. Please try again.");
};
