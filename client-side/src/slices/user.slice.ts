import { createSlice } from '@reduxjs/toolkit'

type userSliceType = {
  email: string,
  firstname: string,
  lastname: string,
  _id: string,
  role: string,
  orgId: string
}

const initialState: userSliceType = {
  email: '',
  firstname: '',
  lastname: '',
  _id: '',
  role: '',
  orgId: ''
}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setData: (state, action) => {
      return { ...state, ...action.payload }
    },
    logout: () => {
      return initialState
    },
  }
})

export const useUserSlice = (state: any) => state.user
export const { setData, logout, } = userSlice.actions

export default userSlice.reducer