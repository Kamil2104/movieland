import axios from "axios";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  setAppearance,
  setStayLoggedIn,
  setDefaultHomepage,
} from "../store/settingsSlice";
import { API_URL } from "@env";

type Appearance = "Light" | "Dark";
type StayLoggedIn = "Always" | "Never";
type Homepage = "Home" | "Discover" | "Favourites" | "Community";

const useAccountSettings = () => {
  const dispatch = useAppDispatch();

  const { userEmail } = useAppSelector((state) => state.user);

  const updateSetting = async (option: string, value: string) => {
    try {
      switch (option) {
        case "appearance":
          dispatch(setAppearance(value as Appearance));
          break;
        case "stayLoggedIn":
          dispatch(setStayLoggedIn(value as StayLoggedIn));
          break;
        case "defaultHomepage":
          dispatch(setDefaultHomepage(value as Homepage));
          break;
      }

      await axios.post(`${API_URL}/settings/update${capitalize(option)}`, {
        value: value,
        email: userEmail,
      });
    } catch (error) {
      console.error(`Error updating ${option}:`, error);
    }
  };

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return { updateSetting };
};

export default useAccountSettings;
