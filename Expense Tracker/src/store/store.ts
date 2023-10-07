import { configureStore } from '@reduxjs/toolkit'
import expenseReducer from './expenseSlice'
import categorySlice from './categorySlice'
import { Middleware } from 'redux';

const localStorageMiddleware:Middleware = ({ getState })=>{
    return next => action =>{
      const result = next(action);
      localStorage.setItem('applicationState', JSON.stringify(getState()));
      return result;
    };
  };
  const reHydrateStore = () => {
    const storedState = localStorage.getItem('applicationState');
    if (storedState !== null) {
      return JSON.parse(storedState); // re-hydrate the store
    }
  };

export const store = configureStore({
  preloadedState: reHydrateStore(),
  reducer: {
    Expense: expenseReducer,
    Category:categorySlice
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(localStorageMiddleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch