import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { FC } from "react";
import useAppSelector from "../../hooks/useAppSelector";
import { selectUsers } from "./usersSelectors";
import useObserver from "../../hooks/useObserver";
import useUserGenerator from "./useUserGenerator";

const UsersTable: FC = () => {
  const users = useAppSelector(selectUsers);
  const generate = useUserGenerator();
  const ref = useObserver(() => generate(20));

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Full Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Phone number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.num}</TableCell>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.fullName}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>{user.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box sx={{ width: "100%", height: "1px" }} ref={ref} />
    </TableContainer>
  );
};

export default UsersTable;
