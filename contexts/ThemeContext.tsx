import React, { createContext } from 'react';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../themes/themes';
import type { ThemeContextType } from '../types/themeTypes';

import { useAppSelector } from '../store/hooks';

export const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const appearance = useAppSelector((state) => state.accountSettings.appearance);
  const systemColorScheme = useColorScheme();

  const theme = (appearance === 'System' ? systemColorScheme === 'dark' ? darkTheme : lightTheme : appearance === 'Dark' ? darkTheme : lightTheme);
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
