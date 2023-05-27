import * as Icon from '@mui/icons-material';

import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteDialog from '../components/Dialog';
import { useProduct } from '../contexts/ProductContext';
import { useUser } from '../contexts/UserContext';

export default function Admin() {
  const navigate = useNavigate();
  const { product } = useProduct();
  const theme = useTheme();
  // const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { allUsers, assignAsAdmin, removeAsAdmin } = useUser();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '2rem',
        backgroundColor: 'secondary.main',
      }}
    >
      <Typography variant='h3' marginBottom='2rem'>
        Admin
      </Typography>
      <Box marginBottom='2rem'>
        <Button
          data-cy='admin-add-product'
          variant='contained'
          color='primary'
          sx={{
            fontSize: '16px',
            border: '1px solid',
            paddingLeft: '1rem',
            paddingRight: '1rem',
            backgroundColor: 'secondary.main',
            color: 'secondary.contrastText',
            '&:hover': {
              backgroundColor: 'primary.main',
            },
          }}
          onClick={() => {
            navigate('/admin/product/new');
          }}
        >
          Lägg till produkt
        </Button>
      </Box>
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
                Bild
              </TableCell>
              <TableCell align='center' sx={{ typography: 'h6', color: 'primary.main' }}>
                ID
              </TableCell>
              <TableCell align='center' sx={{ typography: 'h6', color: 'primary.main' }}>
                Titel
              </TableCell>
              <TableCell align='center' sx={{ typography: 'h6', color: 'primary.main' }}>
                Pris{' '}
              </TableCell>
              <TableCell align='center'></TableCell>
              <TableCell align='center'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {product.map(product => (
              <TableRow
                key={product._id}
                sx={{
                  '&:last-child td, &:last-child th': {},
                }}
                data-cy='product'
              >
                <TableCell component='th' scope='row' sx={{ width: '20%' }}>
                  {/* <Avatar
                    alt={product.title}
                    src={product.image}
                    sx={{
                      width: "auto",
                      height: "auto",
                      maxHeight: "15rem",
                      minHeight: "5rem",
                    }}
                    variant="rounded"
                  /> */}
                  <img
                    src={'/api/image/' + product.imageID}
                    alt={product.title}
                    style={{
                      maxWidth: isSmallScreen ? '5rem' : '20rem',
                    }}
                  />
                </TableCell>
                <TableCell align='center' data-cy='product-id' sx={{ width: '16%' }}>
                  {product._id}
                </TableCell>
                <TableCell align='center' sx={{ width: '16%' }} data-cy='product-title'>
                  {product.title}
                </TableCell>
                <TableCell align='center' data-cy='product-price'>
                  {product.price}
                </TableCell>
                <TableCell align='center' sx={{ width: '6%' }}>
                  <DeleteDialog {...product} />
                </TableCell>
                <TableCell align='center' sx={{ width: '6%' }}>
                  <Button
                    sx={{ color: 'secondary.contrastText' }}
                    onClick={() => {
                      navigate('/admin/product/' + product._id);
                    }}
                    data-cy='admin-edit-product'
                  >
                    <Icon.ModeEdit sx={{ color: 'secondary.contrastText' }} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
    </Box>
  );
}
