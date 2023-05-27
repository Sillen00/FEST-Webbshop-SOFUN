import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useUser } from '../contexts/UserContext';

function AdminAllUsersTable() {
  const { allUsers, assignAsAdmin, removeAsAdmin } = useUser();

  return (
    <TableContainer
      component={Paper}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 330,
        maxWidth: 800,
      }}
    >
      <Table aria-label='simple table' size='small' padding='none'>
        <TableHead>
          <TableRow
            sx={{
              bgcolor: 'secondary.contrastText',
            }}
          >
            <TableCell align='center' sx={{ typography: 'h6', color: 'primary.main' }}>
              User ID
            </TableCell>
            <TableCell align='center' sx={{ typography: 'h6', color: 'primary.main' }}>
              Username
            </TableCell>
            <TableCell align='center' sx={{ typography: 'h6', color: 'primary.main' }}>
              Admin
            </TableCell>
            <TableCell align='center' sx={{ typography: 'h6', color: 'primary.main' }}>
              Change Admin Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allUsers.map(user => (
            <TableRow
              key={user._id}
              sx={{
                '&:last-child td, &:last-child th': {},
              }}
              data-cy='user'
            >
              <TableCell align='center' data-cy='user-id'>
                {user._id}
              </TableCell>
              <TableCell align='center' data-cy='user-name'>
                {user.username}
              </TableCell>
              <TableCell align='center'>{user.isAdmin ? 'Yes' : 'No'}</TableCell>
              <TableCell align='center'>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => {
                    if (user.isAdmin) {
                      removeAsAdmin(user._id);
                    } else {
                      assignAsAdmin(user._id);
                    }
                  }}
                >
                  {user.isAdmin ? 'Remove Admin' : 'Make Admin'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AdminAllUsersTable;
