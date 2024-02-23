import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "./types";

export interface GenerationConfig {
  seed?: string;
}

export interface UsersState {
  isLoading: boolean;
  data: IUser[];
  generationConfig: GenerationConfig;
}

const initialState: UsersState = {
  isLoading: false,
  data: [],
  generationConfig: {
    seed: undefined,
  },
};

const slice = createSlice({
  name: "users",
  reducers: {
    addUsers: (state, action: PayloadAction<IUser[]>) => {
      state.data = state.data.concat(action.payload);
    },
    setGenerationConfig: (state, action: PayloadAction<GenerationConfig>) => {
      state.generationConfig = { ...state.generationConfig, ...action.payload };
    },
    clean: (state) => {
      state.data = [];
    },
  },
  initialState,
});

export const { addUsers, setGenerationConfig, clean } = slice.actions;

export default slice.reducer;
