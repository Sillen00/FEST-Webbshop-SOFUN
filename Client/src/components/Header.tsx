import * as Icon from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import StyledBadge from '@mui/material/Badge';

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import Logo from './Logo';

export default function Header() {
  const { cart } = useCart();
  const theme = useTheme();

  const isLoggedIn = false; // or false, depending on the user's login status

  const [register, setRegister] = useState(true);
  // const handleRegisterOpen = () => setRegister(true);
  // const handleRegisterClose = () => setRegister(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      sx={{
        backgroundColor: 'primary.main',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textDecoration: 'none',
        padding: '1rem',
      }}
    >
      {register ? (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Box sx={{ background: 'white', padding: '4em' }}>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Logga in
            </Typography>
            <Box>
              <TextField id='standard-error' label='Användarnamn' variant='standard' />
            </Box>
            <Box>
              <TextField id='standard-error' label='Lösenord' variant='standard' />
            </Box>

            <Button sx={{ width: '100%', marginTop: '1em' }} variant='contained' color='secondary'>
              <NavLink style={{ textDecoration: 'none', color: 'white' }} to='./checkout'>
                Logga in
              </NavLink>
            </Button>

            <Box sx={{ border: '1px solid gray', marginTop: "2em" }}></Box>

            <Typography id='modal-modal-description' sx={{ mt: 2 }}>
              Har du inte ett konto?
            </Typography>
            <Button
              onClick={() => setRegister(false)}
              sx={{ width: '100%' }}
              variant='contained'
              color='secondary'
            >
              <NavLink style={{ textDecoration: 'none', color: 'white' }} to=''>
                Skapa Konto
              </NavLink>
            </Button>
          </Box>
        </Modal>
      ) : (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Box sx={{ background: 'white', padding: '4em' }}>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Registrera dig
            </Typography>
            <Box>
              <TextField id='standard-error' label='Användarnamn' variant='standard' />
            </Box>
            <Box>
              <TextField id='standard-error' label='Lösenord' variant='standard' />
            </Box>

            <Button sx={{ width: '100%', marginTop: '1em' }} variant='contained' color='secondary'>
              <NavLink style={{ textDecoration: 'none', color: 'white' }} to='./checkout'>
                Registrera dig
              </NavLink>
            </Button>

            <Box sx={{ border: '1px solid gray', marginTop: "2em" }}></Box>

            <Typography id='modal-modal-description' sx={{ mt: 2 }}>
              Har redan ett konto?
            </Typography>
            <Button
              onClick={() => setRegister(true)}
              sx={{ width: '100%' }}
              variant='contained'
              color='secondary'
            >
              <NavLink style={{ textDecoration: 'none', color: 'white' }} to=''>
                Logga in
              </NavLink>
            </Button>
          </Box>
        </Modal>
      )}

      <Box
        sx={{
          alignItems: 'center',
          padding: '0.5rem 0',
        }}
      >
        <NavLink to='./'>
          <Logo theme={theme} width={200} height={50} />
        </NavLink>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          fontFamily: 'Oswald, sans-serif',
          fontSize: '1.3rem',
          '& a': {
            color: 'primary.contrastText',
            textDecoration: 'none',
            '&:hover': {
              color: 'secondary.light',
            },
          },
        }}
      >
        <NavLink to='./'>Start</NavLink>
        <NavLink to='./admin' data-cy='admin-link'>
          Admin
        </NavLink>
        <Box>
          <Tooltip title='Kundvagn'>
            {isLoggedIn ? (
              <NavLink to='./checkout'>
                <IconButton aria-label='cart' data-cy='cart-link' color='secondary'>
                  <StyledBadge
                    badgeContent={cart.reduce((total, item) => total + item.quantity, 0) || '0'}
                    color='info'
                    data-cy='cart-items-count-badge'
                  >
                    <Icon.ShoppingCart />
                  </StyledBadge>
                </IconButton>
              </NavLink>
            ) : (
              <NavLink onClick={handleOpen} to=''>
                <IconButton aria-label='cart' data-cy='cart-link' color='secondary'>
                  <StyledBadge
                    badgeContent={cart.reduce((total, item) => total + item.quantity, 0) || '0'}
                    color='info'
                    data-cy='cart-items-count-badge'
                  >
                    <Icon.ShoppingCart />
                  </StyledBadge>
                </IconButton>
              </NavLink>
            )}
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
}
