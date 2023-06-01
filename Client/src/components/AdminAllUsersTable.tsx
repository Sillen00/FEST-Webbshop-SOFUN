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
import { useUser } from '../contexts/UserContext';
import { theme } from '../theme';

export default function AdminAllUsersTable() {
  const { allUsers, assignAsAdmin, removeAsAdmin } = useUser();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
                User ID
              </TableCell>
            ) : null}
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
                    // paddingLeft: '1rem',
                    // paddingRight: '1rem',
                    // backgroundColor: 'secondary.main',
                    color: 'secondary.contrastText',
                    width: '100%',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                    },
                  }}
                  // color='primary'
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
