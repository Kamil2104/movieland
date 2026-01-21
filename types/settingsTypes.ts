type AppearanceOptionsType = "System" | "Dark" | "Light";
type StayLoggedInType = "Always" | "Never";
type DefaultHomepageType = "Home" | "Discover" | "Favourites" | "Community";
type LanguageType = "English" | "Polski";

export type OptionType =
  | AppearanceOptionsType
  | StayLoggedInType
  | DefaultHomepageType
  | LanguageType
  | undefined;

export type StateKeyType =
  | "appearance"
  | "stayLoggedIn"
  | "defaultHomepage"
  | "language";
