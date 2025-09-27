import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserState {
  isLoggedIn: boolean;
  userEmail: string | null;
  userName: string | null;
}

export const saveUserToStorage = async (userData: { email: string; name: string }) => {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify({
      isLoggedIn: true,
      userEmail: userData.email,
      userName: userData.name
    }));
  } catch (error) {
    console.error('Error saving user to storage:', error);
  }
};

export const clearUserFromStorage = async () => {
  try {
    await AsyncStorage.removeItem('userData');
  } catch (error) {
    console.error('Error clearing user from storage:', error);
  }
};

export const loadUserFromStorage = async (): Promise<UserState> => {
  try {
    const userData = await AsyncStorage.getItem('userData');
    if (userData) {
      return JSON.parse(userData);
    }
  } catch (error) {
    console.error('Error loading user from storage:', error);
  }
  return {
    isLoggedIn: false,
    userEmail: null,
    userName: null,
  };
};

const initialState: UserState = {
  isLoggedIn: false,
  userEmail: null,
  userName: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; name: string }>) => {
      state.isLoggedIn = true;
      state.userEmail = action.payload.email;
      state.userName = action.payload.name;

      saveUserToStorage(action.payload);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userEmail = null;
      state.userName = null;

      clearUserFromStorage();
    },
    setUserFromStorage: (state, action: PayloadAction<UserState>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.userEmail = action.payload.userEmail;
      state.userName = action.payload.userName;
    },
  },
});

export const { login, logout, setUserFromStorage } = userSlice.actions;
export default userSlice.reducer;
