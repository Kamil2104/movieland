import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserState {
  userEmail: string | null;
  password: string | null;
  userName: string | null;
  isLoggedIn: boolean;
}

interface StoredUsers {
  [email: string]: UserState;
}

export const saveUserToStorage = async (userData: { email: string; name: string; password: string }) => {
  try {
    const existingData = await AsyncStorage.getItem("users");
    let users: StoredUsers = existingData ? JSON.parse(existingData) : {};

    const userState: UserState = {
      userEmail: userData.email,
      password: userData.password,
      userName: userData.name,
      isLoggedIn: true,
    };

    users[userData.email] = userState;

    const allKeys = await AsyncStorage.getAllKeys();
    for (const key of allKeys) {
      if (key !== "users" && key !== "lastUser") {
        await AsyncStorage.removeItem(key);
      }
    }

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
    if (!lastUserString) return { userEmail: null, password: null, userName: null, isLoggedIn: false, };

    const lastUser: UserState = JSON.parse(lastUserString);
    return lastUser;
  } catch (error) {
    console.error("Error loading last user:", error);
    return { userEmail: null, password: null, userName: null, isLoggedIn: false };
  }
};

const deleteAccountFromStorage = async (email: string | null) => {
  if (!email) return;

  try {
    const existingData = await AsyncStorage.getItem("users");
    if (!existingData) return;

    let users: StoredUsers = JSON.parse(existingData);

    delete users[email];

    if (Object.keys(users).length === 0) {
      await AsyncStorage.removeItem("users");
    } else {
      await AsyncStorage.setItem("users", JSON.stringify(users));
    }

    const lastUserString = await AsyncStorage.getItem("lastUser");
    if (lastUserString) {
      const lastUser: UserState = JSON.parse(lastUserString);
      if (lastUser.userEmail === email) {
        await AsyncStorage.removeItem("lastUser");
      }
    }

    console.log(`User ${email} has been permanently deleted from storage.`);
  } catch (error) {
    console.error("Error deleting account from storage:", error);
  }
};

const initialState: UserState = {
  userEmail: null,
  password: null,
  userName: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; name: string; password: string }>) => {
      state.userEmail = action.payload.email;
      state.password = action.payload.password;
      state.userName = action.payload.name;
      state.isLoggedIn = true;

      saveUserToStorage(action.payload);
    },
    logout: (state) => {
      logoutUserInStorage(state.userEmail || '');

      state.userEmail = null;
      state.password = null;
      state.userName = null;
      state.isLoggedIn = false;
    },
    setUserFromStorage: (state, action: PayloadAction<UserState>) => {
      state.userEmail = action.payload.userEmail;
      state.password = action.payload.password;
      state.userName = action.payload.userName;
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    deleteAccount: (state) => {
      if (state.userEmail) {
        deleteAccountFromStorage(state.userEmail);
      }

      state.userEmail = null;
      state.password = null;
      state.userName = null;
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout, setUserFromStorage, deleteAccount } = userSlice.actions;
export default userSlice.reducer;
