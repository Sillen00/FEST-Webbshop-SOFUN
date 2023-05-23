import * as Icon from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Box, IconButton, Tooltip } from '@mui/material';
import StyledBadge from '@mui/material/Badge';

import { NavLink } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import Logo from './Logo';

export default function Header() {
  const { cart } = useCart();
  console.log('hej');

  return (
    <Box
      sx={{
        backgroundColor: '#fffaf5',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '7rem',
        textDecoration: 'none',
        padding: '0rem 5rem 0rem 5rem',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: 'center',
          '& a': {
            color: 'black',
            textDecoration: 'none',
          },
        }}
      >
        <Box
          sx={{
            alignItems: 'center',
            padding: '0.5rem 0',
          }}
        >
          <NavLink to='./'>
            <Logo />
          </NavLink>
        </Box>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            gap: '2rem',
            padding: '0 1rem',
            textDecoration: 'none',
            fontFamily: 'Oswald, sans-serif',
            fontSize: '1.3rem',
            '& a': {
              color: 'secondary.contrastText',
              textDecoration: 'none',
              '&:hover': {
                color: 'secondary.contrastText',
              },
            },
          }}
        >
          <Tooltip title='Admin'>
            <NavLink to='./admin'>
              <IconButton aria-label='admin' sx={{ color: 'secondary.contrastText' }}>
                <ModeEditIcon sx={{ fontSize: '1.9rem' }} />
              </IconButton>
            </NavLink>
          </Tooltip>
          <Tooltip title='Orders'>
            <NavLink to='./orders' data-cy='admin-link'>
              <IconButton aria-label='admin' sx={{ color: 'secondary.contrastText' }}>
                <AccountCircleIcon sx={{ fontSize: '1.9rem' }} />
              </IconButton>
            </NavLink>
          </Tooltip>
          <Box sx={{ marginLeft: 'auto' }}>
            <Tooltip title='Kundvagn'>
              <NavLink to='./checkout'>
                <IconButton
                  aria-label='cart'
                  data-cy='cart-link'
                  sx={{ color: 'secondary.contrastText' }}
                >
                  <StyledBadge
                    badgeContent={cart.reduce((total, item) => total + item.quantity, 0) || '0'}
                    data-cy='cart-items-count-badge'
                  >
                    <Icon.ShoppingCart sx={{ fontSize: '1.9rem' }} />
                  </StyledBadge>
                </IconButton>
              </NavLink>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
