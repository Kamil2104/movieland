import { useAppDispatch, useAppSelector } from '../store/hooks'

import { setAppearance, setStayLoggedIn, setDefaultHomepage } from '../store/settingsSlice'

import axios from 'axios'

const useAccountSettings = () => {
  const dispatch = useAppDispatch()
  const { userEmail } = useAppSelector((state) => state.user)

  const API_URL = "https://spectral-unacclimatized-abe.ngrok-free.dev"

  const updateAppearance = async (val: 'Light' | 'Dark') => {
    try {
      await axios.post(`${API_URL}/updateAppearance`, { value: val, email: userEmail});
      dispatch(setAppearance(val))
    } catch (error) {
      console.error('Error updating appearance:', error);
    }
  }

  const updateStayLoggedIn = async (val: 'Always' | 'Never') => {
    try {
        await axios.post(`${API_URL}/updateStayLoggedIn`, { value: val, email: userEmail});
        dispatch(setStayLoggedIn(val))
      } catch (error) {
        console.error('Error updating stayLoggedIn:', error);
      }
  }

  const updateDefaultHomepage = async (val: "Home" | "Discover" | "Favourites" | "Community" ) => {
    try {
        await axios.post(`${API_URL}/updateDefaultHomepage`, { value: val, email: userEmail});
        dispatch(setDefaultHomepage(val))
      } catch (error) {
        console.error('Error updating defaultHomepage:', error);
      }
  }

  const updateSetting = (option: any, newValue: any) => {
    switch(option) {
        case 'appearance':
            return updateAppearance(newValue)
        case 'stayLoggedIn':
            return updateStayLoggedIn(newValue)
        case 'defaultHomepage':
            return updateDefaultHomepage(newValue)
    }
  }

  return {
    updateSetting
  }
}

export default useAccountSettings