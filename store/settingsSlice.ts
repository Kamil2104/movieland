import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AccountSettingsState {
  appearance: "System" | "Dark" | "Light" | undefined;
  stayLoggedIn: "Always" | "Never" | undefined;
  defaultHomepage: "Home" | "Discover" | "Favourites" | "Community" | undefined;
  language: "English" | "Polski" | undefined;
}

const initialState: AccountSettingsState = {
  appearance: "System",
  stayLoggedIn: "Always",
  defaultHomepage: "Home",
  language: "English",
};

const accountSettingsSlice = createSlice({
  name: "accountSettings",
  initialState,
  reducers: {
    setAppearance: (
      state,
      action: PayloadAction<AccountSettingsState["appearance"]>
    ) => {
      state.appearance = action.payload;
    },
    setStayLoggedIn: (
      state,
      action: PayloadAction<AccountSettingsState["stayLoggedIn"]>
    ) => {
      state.stayLoggedIn = action.payload;
    },
    setDefaultHomepage: (
      state,
      action: PayloadAction<AccountSettingsState["defaultHomepage"]>
    ) => {
      state.defaultHomepage = action.payload;
    },
    setLanguage: (
      state,
      action: PayloadAction<AccountSettingsState["language"]>
    ) => {
      state.language = action.payload;
    },
    setAccountSettings: (
      state,
      action: PayloadAction<AccountSettingsState>
    ) => {
      state.appearance = action.payload.appearance;
      state.stayLoggedIn = action.payload.stayLoggedIn;
      state.defaultHomepage = action.payload.defaultHomepage;
      state.language = action.payload.language;
    },
  },
});

export const {
  setAppearance,
  setStayLoggedIn,
  setDefaultHomepage,
  setLanguage,
  setAccountSettings,
} = accountSettingsSlice.actions;
export default accountSettingsSlice.reducer;
