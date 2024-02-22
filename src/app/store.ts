import { configureStore } from "@reduxjs/toolkit";
import UsersReducer from "../features/Users/usersSlice";

const store = configureStore({
  reducer: { users: UsersReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
