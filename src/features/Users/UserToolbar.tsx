import { Box, IconButton, Input, MenuItem, Select, SelectChangeEvent, Slider, TextField, Toolbar } from "@mui/material";
import { ChangeEventHandler, FC, MouseEventHandler, useEffect, useState } from "react";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { selectGenerationConfig } from "./usersSelectors";
import { GenerationConfig, GenerationLocales, setGenerationConfig } from "./usersSlice";
import useDebounce from "../../hooks/useDebounce";
import ShuffleIcon from "@mui/icons-material/Shuffle";

const UserToolbar: FC = () => {
  const generationConfig = useAppSelector(selectGenerationConfig);
  const [state, setState] = useState<GenerationConfig>(generationConfig);
  const dispatch = useAppDispatch();

  const applyConfig = useDebounce(() => {
    dispatch(setGenerationConfig(state));
  }, 500);

  useEffect(() => {
    if (state != generationConfig) {
      applyConfig();
    }
  }, [state]);

  const handleSeed: ChangeEventHandler<HTMLInputElement> = (e) => {
    setState({ ...state, seed: e.target.value });
  };

  const handleRandomButton: MouseEventHandler = () => {
    setState({ ...state, seed: `${Math.round(Math.random() * 1000000000000000)}` });
  };

  const handleRegion = (e: SelectChangeEvent<GenerationLocales>) => {
    setState({ ...state, locale: e.target.value as GenerationLocales });
  };

  const handleErrSlider = (_: Event, val: number | number[]) => {
    setState({ ...state, errCount: val as number });
  };

  const handleErrInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setState({ ...state, errCount: parseInt(e.target.value) });
  };

  return (
    <Toolbar sx={{ display: "flex", gap: "30px", paddingTop: "20px", paddingBottom: "20px" }}>
      <Select value={state.locale} onChange={handleRegion} size="small">
        <MenuItem value="de-DE">Германия</MenuItem>
        <MenuItem value="fr-FR">Франция</MenuItem>
        <MenuItem value="pl-PL">Польша</MenuItem>
      </Select>
      <Box>
        <TextField size="small" label="Seed:" type="number" name="seed" value={state.seed} onInput={handleSeed} />
        <IconButton onClick={handleRandomButton}>
          <ShuffleIcon />
        </IconButton>
      </Box>
      <Box sx={{ display: "flex", gap: "30px" }}>
        <Slider value={state.errCount} onChange={handleErrSlider} min={0} max={10} step={0.1} sx={{ width: "150px" }} />
        <Input
          value={state.errCount}
          onChange={handleErrInput}
          inputProps={{
            step: 1,
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
