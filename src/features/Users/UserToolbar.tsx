import { MenuItem, Select, SelectChangeEvent, TextField, Toolbar } from "@mui/material";
import { ChangeEventHandler, FC } from "react";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { selectGenerationConfig } from "./usersSelectors";
import { GenerationLocales, setGenerationConfig } from "./usersSlice";

const UserToolbar: FC = () => {
  const generationConfig = useAppSelector(selectGenerationConfig);
  const dispatch = useAppDispatch();

  const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(setGenerationConfig({ [e.target.name]: e.target.value }));
  };

  const handleSelect = (e: SelectChangeEvent<GenerationLocales>) => {
    dispatch(setGenerationConfig({ locale: e.target.value as GenerationLocales }));
  };

  return (
    <Toolbar sx={{ display: "flex", justifyContent: "space-around" }}>
      <TextField variant="filled" label="Seed:" type="number" name="seed" value={generationConfig.seed} onInput={handleInput} />

      <Select value={generationConfig.locale} onChange={handleSelect}>
        <MenuItem value="de-DE">Германия</MenuItem>
        <MenuItem value="fr-FR">Франция</MenuItem>
        <MenuItem value="pl-PL">Польша</MenuItem>
      </Select>
    </Toolbar>
  );
};

export default UserToolbar;
