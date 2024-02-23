import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { selectUsersCount, selectUsersLoading } from "./usersSelectors";
import { IUser } from "./types";
import { faker } from "@faker-js/faker";

export const generateUsers = createAsyncThunk(
  "users/generate",
  (count: number, thunk) => {
    const state = thunk.getState() as RootState;
    faker.seed(1);
    return Array.from({ length: count }, (_, i) => {
      return {
        num: i + selectUsersCount(state) + 1,
        id: faker.string.uuid(),
        fullName: faker.person.fullName(),
        address: faker.location.streetAddress(true),
        phone: faker.phone.number(),
      } as IUser;
    });
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as RootState;
      return !selectUsersLoading(state);
    },
  }
);
