import { Button, Toolbar } from "@mui/material";
import { FC } from "react";
import useAppDispatch from "../../hooks/useAppDispatch";
import { clean } from "./usersSlice";

const UserToolbar: FC = () => {
  const dispatch = useAppDispatch();

  return (
    <Toolbar>
      <Button sx={{ color: "white" }} onClick={() => dispatch(clean())}>
        Clean
      </Button>
    </Toolbar>
  );
};

export default UserToolbar;
