import { Box, Container, CssBaseline } from "@mui/material";
import Header from "../components/Header";
import UsersTable from "../features/Users/UsersTable";

function App() {
  return (
    <>
      <CssBaseline />
      <Header />
      <Box sx={{ paddingTop: "40px", paddingBottom: "40px" }}>
        <Container>
          <UsersTable />
        </Container>
      </Box>
    </>
  );
}

export default App;
