import { AppBar, Container } from "@mui/material";
import { FC } from "react";
import UserToolbar from "../features/Users/UserToolbar";

const Header: FC = () => (
  <AppBar position="static">
    <Container>
      <UserToolbar />
    </Container>
  </AppBar>
);

export default Header;
