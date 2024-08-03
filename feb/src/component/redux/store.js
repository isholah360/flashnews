import { configureStore } from "@reduxjs/toolkit";
import userReducer from './user/userSlice'
import {apiSlice} from './user/apiSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer, 
  },
  middeleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTool: true,
});
