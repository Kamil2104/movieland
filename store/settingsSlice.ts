import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState, AppDispatch } from './index';

export interface AccountSettingsState {
  userName: string | null;
  appearance: "System" | "Dark" | "Light" | undefined;
  stayLoggedIn: "Always" | "Never" | undefined;
  defaultHomepage: "Home" | "Discover" | "Favourites" | "Community" | undefined;
}

export const saveAccountSettings = async (state: AccountSettingsState) => {
  try {
    await AsyncStorage.setItem("accountSettings", JSON.stringify(state));
  } catch (error) {
    console.error("Failed to save account settings", error);
  }
};

export const loadAccountSettings = async (): Promise<AccountSettingsState> => {
  try {
    const accountSettings = await AsyncStorage.getItem("accountSettings");
    if (accountSettings) {
      return JSON.parse(accountSettings);
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
    }
  },
});

// Thunks for auto-save
export const updateUserName = (name: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
  dispatch(setUserName(name));
  const state = getState().accountSettings;
  await saveAccountSettings(state);
};

export const updateAppearance = (appearance: AccountSettingsState["appearance"]) => async (dispatch: AppDispatch, getState: () => RootState) => {
  dispatch(setAppearance(appearance));
  const state = getState().accountSettings;
  await saveAccountSettings(state);
};

export const updateStayLoggedIn = (stayLoggedIn: AccountSettingsState["stayLoggedIn"]) => async (dispatch: AppDispatch, getState: () => RootState) => {
  dispatch(setStayLoggedIn(stayLoggedIn));
  const state = getState().accountSettings;
  await saveAccountSettings(state);
};

export const updateDefaultHomepage = (homepage: AccountSettingsState["defaultHomepage"]) => async (dispatch: AppDispatch, getState: () => RootState) => {
  dispatch(setDefaultHomepage(homepage));
  const state = getState().accountSettings;
  await saveAccountSettings(state);
};

export const { setAppearance, setStayLoggedIn, setDefaultHomepage, setUserName, setSettingsFromStorage } = accountSettingsSlice.actions;
export default accountSettingsSlice.reducer;