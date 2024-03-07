import { configureStore, Middleware } from "@reduxjs/toolkit";

import authApi from "./apis/authApi";
import userApi from "./apis/usersApi";

import UserReducer from '@/slices/user.slice'


const middlewares: Array<Middleware> = [
  authApi.middleware,
  userApi.middleware,
]

const makeStore = () => (
  configureStore({
    reducer: {
      [authApi.reducerPath]: authApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
      user: UserReducer
    },

    middleware: (getDefaultMiddleware: any) => (
      getDefaultMiddleware().concat(middlewares)),
  }))



export default makeStore