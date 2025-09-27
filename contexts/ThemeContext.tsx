import React, { createContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../themes/themes';
import type { Theme, ThemeContextType } from '../types/themeTypes';

export const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>(darkTheme);

  //! FOR NOW IT'S COMMENTED BECAUSE IT'S NOT WORKING
  //! SYSTEM COLOR SCHEME RETURNS LIGHT WHILE I HAVE MY SYSTEM IN DARK MODE
  // useEffect(() => {
  //   console.log('System color scheme:', systemColorScheme);
  //   setTheme(systemColorScheme === 'dark' ? darkTheme : lightTheme);
  // }, [systemColorScheme]);

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
