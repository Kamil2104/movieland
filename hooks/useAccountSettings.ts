import { useAppDispatch, useAppSelector } from '../store/hooks'

import { setAppearance, setStayLoggedIn, setDefaultHomepage } from '../store/settingsSlice'

import { API_URL } from '@env'

import axios from 'axios'

const useAccountSettings = () => {
  const dispatch = useAppDispatch()
  const { userEmail } = useAppSelector((state) => state.user)

  const updateAppearance = async (val: 'Light' | 'Dark') => {
    try {
      dispatch(setAppearance(val))
      await axios.post(`${API_URL}/settings/updateAppearance`, { value: val, email: userEmail});
    } catch (error) {
      console.error('Error updating appearance:', error);
    }
  }

  const updateStayLoggedIn = async (val: 'Always' | 'Never') => {
    try {
        dispatch(setStayLoggedIn(val))
        await axios.post(`${API_URL}/settings/updateStayLoggedIn`, { value: val, email: userEmail});
      } catch (error) {
        console.error('Error updating stayLoggedIn:', error);
      }
  }

  const updateDefaultHomepage = async (val: "Home" | "Discover" | "Favourites" | "Community" ) => {
    try {
        dispatch(setDefaultHomepage(val))
        await axios.post(`${API_URL}/settings/updateDefaultHomepage`, { value: val, email: userEmail});
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