import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserState {
  isLoggedIn: boolean;
  userEmail: string | null;
  userName: string | null;
}

interface StoredUsers {
  [email: string]: UserState;
}

export const saveUserToStorage = async (userData: { email: string; name: string }) => {
  try {
    const existingData = await AsyncStorage.getItem("users");
    let users: StoredUsers = existingData ? JSON.parse(existingData) : {};

    const userState: UserState = {
      isLoggedIn: true,
      userEmail: userData.email,
      userName: userData.name,
    };

    users[userData.email] = userState;

    await AsyncStorage.setItem("users", JSON.stringify(users));
    await AsyncStorage.setItem("lastUser", JSON.stringify(userState));
  } catch (error) {
    console.error("Error saving user to storage:", error);
  }
};

export const logoutUserInStorage = async (email: string) => {
  try {
    const existingData = await AsyncStorage.getItem("users");
    if (!existingData) return;

    let users: StoredUsers = JSON.parse(existingData);

    if (users[email]) {
      users[email].isLoggedIn = false;
    }

    await AsyncStorage.setItem("users", JSON.stringify(users));

    const lastUserString = await AsyncStorage.getItem("lastUser");
    if (lastUserString) {
      const lastUser: UserState = JSON.parse(lastUserString);
      if (lastUser.userEmail === email) {
        const loggedInUsers = Object.values(users).filter(u => u.isLoggedIn);
        if (loggedInUsers.length > 0) {
          await AsyncStorage.setItem("lastUser", JSON.stringify(loggedInUsers[0]));
        } else {
          await AsyncStorage.removeItem("lastUser");
        }
      }
    }
  } catch (error) {
    console.error("Error logging out user:", error);
  }
};

export const loadLastUserFromStorage = async (): Promise<UserState> => {
  try {
    const lastUserString = await AsyncStorage.getItem("lastUser");
    if (!lastUserString) return { isLoggedIn: false, userEmail: null, userName: null };

    const lastUser: UserState = JSON.parse(lastUserString);
    return lastUser;
  } catch (error) {
    console.error("Error loading last user:", error);
    return { isLoggedIn: false, userEmail: null, userName: null };
  }
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
      logoutUserInStorage(state.userEmail || '');

      state.isLoggedIn = false;
      state.userEmail = null;
      state.userName = null;

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
