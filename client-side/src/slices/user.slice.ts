import { createSlice } from '@reduxjs/toolkit'

type userSliceType = {
  email: string,
  firstname: string,
  lastname: string,
  _id: string,
  role: string,
  orgId: string,
  subscription: string
}

const initialState: userSliceType = {
  email: '',
  firstname: '',
  lastname: '',
  _id: '',
  role: '',
  orgId: '',
  subscription: 'free'
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
    addOrgId: (state, action) => {
      state.orgId = action.payload.orgId
    }
  }
})

export const useUserSlice = (state: any) => state.user
export const { setData, logout, addOrgId } = userSlice.actions

export default userSlice.reducer