import { Toolbar, Typography } from "@mui/material";
import { FC } from "react";

const UserToolbar: FC = () => (
  <Toolbar>
    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
      App
    </Typography>
  </Toolbar>
);

export default UserToolbar;
