import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState, AppDispatch } from './index';

export interface AccountSettingsState {
  userName: string | null;
  appearance: "System" | "Dark" | "Light" | undefined;
  stayLoggedIn: "Always" | "Never" | undefined;
  defaultHomepage: "Home" | "Discover" | "Favourites" | "Community" | undefined;
}

export const saveAccountSettingsForUser = async (email: string, state: AccountSettingsState) => {
  try {
    const existingData = await AsyncStorage.getItem("accountSettings");
    const allSettings = existingData ? JSON.parse(existingData) : {};
    allSettings[email] = state;
    await AsyncStorage.setItem("accountSettings", JSON.stringify(allSettings));
  } catch (error) {
    console.error("Failed to save account settings", error);
  }
};

export const loadAccountSettingsForUser = async (email: string): Promise<AccountSettingsState> => {
  try {
    const existingData = await AsyncStorage.getItem("accountSettings");
    if (existingData) {
      const allSettings = JSON.parse(existingData);
      if (allSettings[email]) return allSettings[email];
    }
  } catch (error) {
    console.error("Failed to load account settings", error);
  }
  return {
    userName: "",
    appearance: "System",
    stayLoggedIn: "Always",
    defaultHomepage: "Home",
  };
};

const initialState: AccountSettingsState = {
  userName: "",
  appearance: "System",
  stayLoggedIn: "Always",
  defaultHomepage: "Home",
};

const accountSettingsSlice = createSlice({
  name: "accountSettings",
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    setAppearance: (state, action: PayloadAction<AccountSettingsState["appearance"]>) => {
      state.appearance = action.payload;
    },
    setStayLoggedIn: (state, action: PayloadAction<AccountSettingsState["stayLoggedIn"]>) => {
      state.stayLoggedIn = action.payload;
    },
    setDefaultHomepage: (state, action: PayloadAction<AccountSettingsState["defaultHomepage"]>) => {
      state.defaultHomepage = action.payload;
    },
    setSettingsFromStorage: (state, action: PayloadAction<AccountSettingsState>) => {
      state.userName = action.payload.userName;
      state.appearance = action.payload.appearance;
      state.stayLoggedIn = action.payload.stayLoggedIn;
      state.defaultHomepage = action.payload.defaultHomepage;
    },
    resetSettings: (state) => {
      state.userName = "";
      state.appearance = "System";
      state.stayLoggedIn = "Always";
      state.defaultHomepage = "Home";
    },
  },
});

// Thunks for auto-save
export const updateUserName = (email: string, name: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
  dispatch(setUserName(name));
  const state = getState().accountSettings;
  await saveAccountSettingsForUser(email, state);
};

export const updateAppearance = (email: string, appearance: AccountSettingsState["appearance"]) => async (dispatch: AppDispatch, getState: () => RootState) => {
  dispatch(setAppearance(appearance));
  const state = getState().accountSettings;
  await saveAccountSettingsForUser(email, state);
};

export const updateStayLoggedIn = (email: string, stayLoggedIn: AccountSettingsState["stayLoggedIn"]) => async (dispatch: AppDispatch, getState: () => RootState) => {
  dispatch(setStayLoggedIn(stayLoggedIn));
  const state = getState().accountSettings;
  await saveAccountSettingsForUser(email, state);
};

export const updateDefaultHomepage = (email: string, homepage: AccountSettingsState["defaultHomepage"]) => async (dispatch: AppDispatch, getState: () => RootState) => {
  dispatch(setDefaultHomepage(homepage));
  const state = getState().accountSettings;
  await saveAccountSettingsForUser(email, state);
};

export const { setAppearance, setStayLoggedIn, setDefaultHomepage, setUserName, setSettingsFromStorage, resetSettings } = accountSettingsSlice.actions;
export default accountSettingsSlice.reducer;