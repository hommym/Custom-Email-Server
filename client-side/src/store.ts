
import { configureStore, Middleware } from "@reduxjs/toolkit";
import authApi from "./apis/authApi";


const middlewares: Array<Middleware> = [
  authApi.middleware,

]

const makeStore = () => (
  configureStore({
    reducer: {
      [authApi.reducerPath]: authApi.reducer,
    },

    middleware: (getDefaultMiddleware: any) => (
      getDefaultMiddleware().concat(middlewares)),
  }))



export default makeStore