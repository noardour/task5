import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "./types";

export interface UsersState {
  data: IUser[];
}

const initialState: UsersState = {
  data: [
    {
      num: 1,
      id: "12341234",
      fullName: "Name Namev Namovich",
      address: "gorod Novigrad",
      phone: "+1 11 111-11-11",
    },
    {
      num: 2,
      id: "sdfsddff",
      fullName: "Test Testov Testovich",
      address: "gorod Novigrad",
      phone: "+1 11 111-11-11",
    },
    {
      num: 3,
      id: "sefsefsef",
      fullName: "Name Namev Namovich",
      address: "gorod Novigrad",
      phone: "+1 11 111-11-11",
    },
  ],
};

const slice = createSlice({
  name: "users",
  reducers: {},
  initialState,
});

export default slice.reducer;
