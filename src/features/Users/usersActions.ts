import { createAsyncThunk } from "@reduxjs/toolkit";
import generateUser from "./generateUser";
import { RootState } from "../../app/store";
import { selectUsersLoading } from "./usersSelectors";

export const generateUsers = createAsyncThunk(
  "users/generate",
  (count: number) => {
    return Array.from({ length: count }, () => generateUser());
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as RootState;
      return !selectUsersLoading(state);
    },
  }
);
