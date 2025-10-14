import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  userEmail: string | null;
  userName: string | null;
  password: string | null;
}

const initialState: UserState = {
  userEmail: null,
  userName: null,
  password: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; userName: string; password: string }>) => {
      state.userEmail = action.payload.email;
      state.userName = action.payload.userName;
      state.password = action.payload.password;
    },
    logout: (state) => {
      state.userEmail = null;
      state.userName = null;
      state.password = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
