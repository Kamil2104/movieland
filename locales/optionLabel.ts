import { StateKeyType } from "../types/settingsTypes";
import { translate } from "./i18n";

type Translator = ReturnType<typeof translate>;

export const formatOptionLabel = (
  stateKey: StateKeyType,
  value: string | undefined,
  t: Translator
): string => {
  if (!value) return "";

  switch (stateKey) {
    case "appearance":
      if (value === "Dark") return t("darkAppearance");
      if (value === "Light") return t("lightAppearance");
      return t("systemAppearance");

    case "stayLoggedIn":
      return value === "Always"
        ? t("alwaysStayLoggedIn")
        : t("neverStayLoggedIn");

    case "defaultHomepage":
      switch (value) {
        case "Home":
          return t("homeHomepage");
        case "Discover":
          return t("discoverHomepage");
        case "Favourites":
          return t("favouritesHomepage");
        case "Community":
          return t("communityHomepage");
        default:
          return value;
      }

    case "language":
      return value === "Polski" ? t("polishLanguage") : t("englishLanguage");

    default:
      return value;
  }
};

export type { Translator };
