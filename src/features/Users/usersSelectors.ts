import { RootState } from "../../app/store";
import { IUser } from "./types";

export const selectUsers = (store: RootState): IUser[] => store.users.data;

export const selectUsersCount = (store: RootState): number => store.users.data.length;

export const selectUsersLoading = (store: RootState): boolean => store.users.isLoading;
