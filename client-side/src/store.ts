import { configureStore, Middleware } from "@reduxjs/toolkit";

import authApi from "./apis/authApi";
import userApi from "./apis/usersApi";
import employeesApi from "./apis/employeesApi";
import stripeApi from "./apis/stripeApi";

import UserReducer from '@/slices/user.slice'


const middlewares: Array<Middleware> = [
  authApi.middleware,
  userApi.middleware,
  employeesApi.middleware,
  stripeApi.middleware
]

const makeStore = () => (
  configureStore({
    reducer: {
      [authApi.reducerPath]: authApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
      [employeesApi.reducerPath]: userApi.reducer,
      [stripeApi.reducerPath]: stripeApi.reducer,
      user: UserReducer
    },

    middleware: (getDefaultMiddleware: any) => (
      getDefaultMiddleware().concat(middlewares)),
  }))



export default makeStore