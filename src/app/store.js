import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import authReducer from '../features/counter/auth/authSlice'
import thunk from 'redux-thunk'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth:authReducer
  },
  middleware:getDefaultMiddleware => 
    getDefaultMiddleware().concat(apiSlice.middleware,thunk),
    devTools: true
});
  