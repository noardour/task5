import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { FC, useEffect } from "react";
import useAppSelector from "../../hooks/useAppSelector";
import { selectUsers } from "./usersSelectors";
import useAppDispatch from "../../hooks/useAppDispatch";
import { generateUsers } from "./usersActions";

const UsersTable: FC = () => {
  const users = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(generateUsers(30));
  }, []);

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
    </TableContainer>
  );
};

export default UsersTable;
