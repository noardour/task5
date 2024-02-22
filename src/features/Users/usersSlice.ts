import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "./types";
import { generateUsers } from "./usersActions";

export interface UsersState {
  isLoading: boolean;
  data: IUser[];
}

const initialState: UsersState = {
  isLoading: false,
  data: [],
};

const slice = createSlice({
  name: "users",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(generateUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(generateUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(generateUsers.rejected, (state) => {
      state.isLoading = false;
    });
  },
  initialState,
});

export default slice.reducer;
