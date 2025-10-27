import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import accountSettingsReducer from "./settingsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    accountSettings: accountSettingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
