import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { FC } from "react";

const Header: FC = () => (
  <AppBar position="static">
    <Container>
      <Toolbar>
        <Typography variant="h4">App</Typography>
      </Toolbar>
    </Container>
  </AppBar>
);

export default Header;
