import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "./types";

export type GenerationLocales = "de-DE" | "fr-FR" | "pl-PL";

export interface GenerationConfig {
  seed: string;
  locale: GenerationLocales;
  errCount: number;
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
    seed: "",
    locale: "de-DE",
    errCount: 0,
  },
};

const slice = createSlice({
  name: "users",
  reducers: {
    addUsers: (state, action: PayloadAction<IUser[]>) => {
      state.data = state.data.concat(action.payload);
    },
    setGenerationConfig: (state, action: PayloadAction<Partial<GenerationConfig>>) => {
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
