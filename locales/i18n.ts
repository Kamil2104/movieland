type LanguageCode = "English" | "Polski";

type TranslationKey =
  | "appearance"
  | "darkAppearance"
  | "lightAppearance"
  | "systemAppearance"
  | "alwaysStayLoggedIn"
  | "neverStayLoggedIn"
  | "homeHomepage"
  | "discoverHomepage"
  | "favouritesHomepage"
  | "communityHomepage"
  | "stayLoggedIn"
  | "defaultHomepage"
  | "language"
  | "englishLanguage"
  | "polishLanguage"
  | "logout"
  | "logoutTitle"
  | "logoutMessage"
  | "logoutCancel"
  | "logoutConfirm"
  | "deleteAccount"
  | "deleteTitle"
  | "deleteMessage"
  | "deleteCancel"
  | "deleteConfirm";

const en: Record<TranslationKey, string> = {
  appearance: "Appearance",
  stayLoggedIn: "Stay logged in",
  defaultHomepage: "Default homepage",
  language: "Language",
  darkAppearance: "Dark",
  lightAppearance: "Light",
  systemAppearance: "System",
  alwaysStayLoggedIn: "Always",
  neverStayLoggedIn: "Never",
  homeHomepage: "Home",
  discoverHomepage: "Discover",
  favouritesHomepage: "Favourites",
  communityHomepage: "Community",
  englishLanguage: "English",
  polishLanguage: "Polski",
  logout: "Logout",
  logoutTitle: "Confirm Logout",
  logoutMessage: "Do you really want to log out of your account?",
  logoutCancel: "Stay Logged In",
  logoutConfirm: "Log Out",
  deleteAccount: "Delete Account",
  deleteTitle: "Confirm Delete Account",
  deleteMessage: "Do you really want to delete your account?",
  deleteCancel: "Cancel",
  deleteConfirm: "Delete Account",
};

const pl: Record<TranslationKey, string> = {
  appearance: "Motyw",
  stayLoggedIn: "Pozostań zalogowany",
  defaultHomepage: "Strona startowa",
  language: "Język",
  darkAppearance: "Ciemny",
  lightAppearance: "Jasny",
  systemAppearance: "System",
  alwaysStayLoggedIn: "Zawsze",
  neverStayLoggedIn: "Nigdy",
  homeHomepage: "Strona główna",
  discoverHomepage: "Odkryj",
  favouritesHomepage: "Ulubione",
  communityHomepage: "Społeczność",
  englishLanguage: "English",
  polishLanguage: "Polski",
  logout: "Wyloguj",
  logoutTitle: "Potwierdź wylogowanie",
  logoutMessage: "Czy na pewno chcesz się wylogować?",
  logoutCancel: "Anuluj",
  logoutConfirm: "Wyloguj",
  deleteAccount: "Usuń konto",
  deleteTitle: "Potwierdź usunięcie konta",
  deleteMessage: "Czy na pewno chcesz usunąć swoje konto?",
  deleteCancel: "Anuluj",
  deleteConfirm: "Usuń konto",
};

const locales: Record<LanguageCode, Record<TranslationKey, string>> = {
  English: en,
  Polski: pl,
};

export const translate = (language: LanguageCode | undefined) => {
  const dict = language && locales[language] ? locales[language] : locales.English;
  return (key: TranslationKey) => dict[key];
};

export type { TranslationKey, LanguageCode };
