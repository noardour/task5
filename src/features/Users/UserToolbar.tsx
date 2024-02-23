import { TextField, Toolbar } from "@mui/material";
import { ChangeEventHandler, FC } from "react";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { selectGenerationConfig } from "./usersSelectors";
import { setGenerationConfig } from "./usersSlice";

const UserToolbar: FC = () => {
  const generationConfig = useAppSelector(selectGenerationConfig);
  const dispatch = useAppDispatch();

  const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(setGenerationConfig({ [e.target.name]: e.target.value }));
  };

  return (
    <Toolbar>
      <TextField variant="filled" label="Seed:" type="number" name="seed" value={generationConfig.seed} onInput={handleInput} />
    </Toolbar>
  );
};

export default UserToolbar;
