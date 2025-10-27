type AppearanceOptionsType = "System" | "Dark" | "Light";
type StayLoggedInType = "Always" | "Never";
type DefaultHomepageType = "Home" | "Discover" | "Favourites" | "Community";

export type OptionType =
  | AppearanceOptionsType
  | StayLoggedInType
  | DefaultHomepageType
  | undefined;
export type StateKeyType = "appearance" | "stayLoggedIn" | "defaultHomepage";
