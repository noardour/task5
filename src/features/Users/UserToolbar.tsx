import { Box, Input, MenuItem, Select, SelectChangeEvent, Slider, TextField, Toolbar } from "@mui/material";
import { ChangeEventHandler, FC } from "react";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { selectGenerationConfig } from "./usersSelectors";
import { GenerationLocales, setGenerationConfig } from "./usersSlice";

const UserToolbar: FC = () => {
  const generationConfig = useAppSelector(selectGenerationConfig);
  const dispatch = useAppDispatch();
  const errStep = 1;

  const handleSeed: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(setGenerationConfig({ seed: e.target.value }));
  };

  const handleRegion = (e: SelectChangeEvent<GenerationLocales>) => {
    dispatch(setGenerationConfig({ locale: e.target.value as GenerationLocales }));
  };

  const handleErrSlider = (_: Event, val: number | number[]) => {
    dispatch(setGenerationConfig({ errCount: val as number }));
  };

  const handleErrInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(setGenerationConfig({ errCount: parseInt(e.target.value) }));
  };

  return (
    <Toolbar sx={{ display: "flex", gap: "30px", paddingTop: "20px", paddingBottom: "20px" }}>
      <Select value={generationConfig.locale} onChange={handleRegion} size="small">
        <MenuItem value="de-DE">Германия</MenuItem>
        <MenuItem value="fr-FR">Франция</MenuItem>
        <MenuItem value="pl-PL">Польша</MenuItem>
      </Select>
      <TextField size="small" label="Seed:" type="number" name="seed" value={generationConfig.seed} onInput={handleSeed} />
      <Box sx={{ display: "flex", gap: "30px" }}>
        <Slider value={generationConfig.errCount} onChange={handleErrSlider} min={0} max={10} step={errStep} sx={{ width: "150px" }} />
        <Input
          value={generationConfig.errCount}
          onChange={handleErrInput}
          inputProps={{
            step: errStep,
            min: 0,
            max: 1000,
            type: "number",
            "aria-labelledby": "input-slider",
          }}
        />
      </Box>
    </Toolbar>
  );
};

export default UserToolbar;
