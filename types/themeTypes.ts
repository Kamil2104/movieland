import { lightTheme } from "../themes/themes";

export type Theme = typeof lightTheme;

export type ThemeContextType = {
  theme: Theme;
};
