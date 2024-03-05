import { createSlice } from '@reduxjs/toolkit'


export type authState = {
  isLoading: boolean,
  user: {
    email?: string,
    _id: string,
    firstname: string,
    lastname: string,
    subscriptionType: string,
    is_admin: boolean
  },
  error: string | null
}


const initialState: authState = {
  isLoading: true,
  user: {
    email: '',
    _id: '',
    firstname: '',
    lastname: '',
    subscriptionType: '',
    is_admin: false
  },
  error: null
}
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      return { ...initialState, isLoading: false }
    },
    setData: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.user = { ...state.user, ...action.payload }
    },
    setLoading: (state) => {
      state.isLoading = true
    },
    setError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload
    },

  }

})
export const { logout, setData, setLoading, setError } = authSlice.actions;


export const useAuthSlice = (state: any) => state.auth
export default authSlice.reducer