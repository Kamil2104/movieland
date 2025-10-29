import React, { useState, useEffect, createContext } from "react";
import { useColorScheme } from "react-native";
import { lightTheme, darkTheme } from "../themes/themes";
import type { ThemeContextType } from "../types/themeTypes";

import { useAppSelector } from "../store/hooks";

export const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const appearance = useAppSelector(
    (state) => state.accountSettings.appearance
  );
  const systemColorScheme = useColorScheme();

  const theme =
    appearance === "System"
      ? systemColorScheme === "dark"
        ? darkTheme
        : lightTheme
      : appearance === "Dark"
        ? darkTheme
        : lightTheme;

  useEffect(() => {
    console.log(systemColorScheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
};
