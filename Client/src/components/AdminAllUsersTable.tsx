import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { User, useUser } from '../contexts/UserContext';
import { theme } from '../theme';

export default function AdminAllUsersTable() {
  const { assignAsAdmin, removeAsAdmin, adminStatusUpdated } = useUser();
  const [fetchedUsers, setFetchedUsers] = useState<User[]>([]);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get('/api/users', { withCredentials: true });
        setFetchedUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllUsers();
  }, [adminStatusUpdated]);

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
            {!isSmallScreen ? (
              <TableCell align='center' sx={{ typography: 'h6', color: 'primary.main' }}>
                Användar ID
              </TableCell>
            ) : null}
            <TableCell align='center' sx={{ typography: 'h6', color: 'primary.main' }}>
              Användarnamn
            </TableCell>
            <TableCell align='center' sx={{ typography: 'h6', color: 'primary.main' }}>
              Admin
            </TableCell>
            <TableCell align='center' sx={{ typography: 'h6', color: 'primary.main' }}>
              Ändra Admin Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fetchedUsers
            .map(user => (
              <TableRow
                key={user._id}
                sx={{
                  '&:last-child td, &:last-child th': {},
                }}
                data-cy='user'
              >
                {!isSmallScreen ? (
                  <TableCell align='center' data-cy='user-id'>
                    {user._id}
                  </TableCell>
                ) : null}
                <TableCell align='center' data-cy='user-name'>
                  {user.username}
                </TableCell>
                <TableCell align='center'>{user.isAdmin ? 'Yes' : 'No'}</TableCell>
                <TableCell align='center'>
                  <Button
                    variant='outlined'
                    sx={{
                      fontSize: '16px',
                      border: '1px solid',
                      color: 'secondary.contrastText',
                      width: '100%',
                      '&:hover': {
                        backgroundColor: 'primary.main',
                      },
                    }}
                    onClick={() => {
                      if (user.isAdmin) {
                        removeAsAdmin(user._id);
                      } else {
                        assignAsAdmin(user._id);
                      }
                    }}
                  >
                    {user.isAdmin ? 'Ta Bort Admin' : 'Gör Admin'}
                  </Button>
                </TableCell>
              </TableRow>
            ))
            .reverse()}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
