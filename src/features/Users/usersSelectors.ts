import { RootState } from "../../app/store";
import { IUser } from "./types";
import { GenerationConfig } from "./usersSlice";

export const selectUsers = (store: RootState): IUser[] => store.users.data;

export const selectUsersCount = (store: RootState): number => store.users.data.length;

export const selectUsersLoading = (store: RootState): boolean => store.users.isLoading;

export const selectGenerationConfig = (store: RootState): GenerationConfig => store.users.generationConfig;
