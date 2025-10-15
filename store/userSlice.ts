import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  userEmail: string | null;
  userName: string | null;
  password: string | null;
  isLoggedIn: boolean
}

const initialState: UserState = {
  userEmail: null,
  userName: null,
  password: null,
  isLoggedIn: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; userName: string; password: string }>) => {
      state.userEmail = action.payload.email;
      state.userName = action.payload.userName;
      state.password = action.payload.password;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.userEmail = null;
      state.userName = null;
      state.password = null;
      state.isLoggedIn = false
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
