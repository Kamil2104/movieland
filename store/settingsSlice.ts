import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AccountSettingsState {
  appearance: "System" | "Dark" | "Light" | undefined;
  stayLoggedIn: "Always" | "Never" | undefined;
  defaultHomepage: "Home" | "Discover" | "Favourites" | "Community" | undefined;
}

const initialState: AccountSettingsState = {
  appearance: "System",
  stayLoggedIn: "Always",
  defaultHomepage: "Home",
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
    setAccountSettings: (
      state,
      action: PayloadAction<AccountSettingsState>
    ) => {
      state.appearance = action.payload.appearance;
      state.stayLoggedIn = action.payload.stayLoggedIn;
      state.defaultHomepage = action.payload.defaultHomepage;
    },
  },
});

export const {
  setAppearance,
  setStayLoggedIn,
  setDefaultHomepage,
  setAccountSettings,
} = accountSettingsSlice.actions;
export default accountSettingsSlice.reducer;
