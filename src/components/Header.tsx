import { AppBar, Container } from "@mui/material";
import { FC } from "react";
import UserToolbar from "../features/Users/UserToolbar";

const Header: FC = () => (
  <AppBar position="static" sx={{ backgroundColor: "#f2f2f2" }}>
    <Container>
      <UserToolbar />
    </Container>
  </AppBar>
);

export default Header;
