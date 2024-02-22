import { RootState } from "../../app/store";

export const selectUsers = (store: RootState) => store.users.data;
