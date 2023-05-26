import * as Icon from '@mui/icons-material';
import { Box, IconButton, Modal, Tooltip } from '@mui/material';
import StyledBadge from '@mui/material/Badge';

import { NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useUser } from '../contexts/UserContext';
import { theme } from '../theme';
import LoginRegisterModal from './LoginRegisterModal';
import Logo from './Logo';

export default function Header() {
  const { cart } = useCart();
  const location = useLocation();

  const { open, handleOpen, handleClose, isLoggedIn } = useUser();

  return (
    <>
      {/* LOGIN MODAL --------------------------------------------------------------------- */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <LoginRegisterModal />
      </Modal>
      <Box
        sx={{
          backgroundColor: '#fffaf5',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '7rem',
          textDecoration: 'none',
          padding: '0em 4em 0em 4em',
          [theme.breakpoints.down('sm')]: {
            padding: '0em 1.5em 0em 1.5em',
          },
          color: 'black',
        }}
      >
        <Box
          sx={{
            alignItems: 'center',
          }}
        >
          <NavLink style={{ textDecoration: 'none' }} to='./'>
            <Logo />
          </NavLink>
        </Box>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            gap: '2rem',
            [theme.breakpoints.down('sm')]: {
              gap: '0rem',
            },
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
          <NavLink to='./admin' data-cy='admin-link'>
            <IconButton aria-label='admin' sx={{ color: 'secondary.contrastText' }}>
              <Icon.ModeEdit
                sx={{
                  fontSize: '2.5rem',
                  [theme.breakpoints.down('sm')]: {
                    fontSize: '1.7rem',
                  },
                }}
              />
            </IconButton>
          </NavLink>

          <Tooltip title='Orders'>
            <NavLink to='./orders' data-cy='admin-link'>
              <IconButton aria-label='admin' sx={{ color: 'secondary.contrastText' }}>
                <Icon.AccountCircle
                  sx={{
                    fontSize: '2.5rem',
                    [theme.breakpoints.down('sm')]: {
                      fontSize: '1.7rem',
                    },
                  }}
                />
              </IconButton>
            </NavLink>
          </Tooltip>

          <Box sx={{ marginLeft: 'auto' }}>
            <Tooltip title='Kundvagn'>
              {isLoggedIn ? (
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
                      <Icon.ShoppingCart
                        sx={{
                          fontSize: '2.5rem',
                          [theme.breakpoints.down('sm')]: {
                            fontSize: '1.7rem',
                          },
                        }}
                      />
                    </StyledBadge>
                  </IconButton>
                </NavLink>
              ) : (
                <NavLink onClick={handleOpen} to={location.pathname}>
                  <IconButton
                    aria-label='cart'
                    data-cy='cart-link'
                    sx={{ color: 'secondary.contrastText' }}
                  >
                    <StyledBadge
                      badgeContent={cart.reduce((total, item) => total + item.quantity, 0) || '0'}
                      data-cy='cart-items-count-badge'
                    >
                      <Icon.ShoppingCart
                        sx={{
                          fontSize: '2.5rem',
                          [theme.breakpoints.down('sm')]: {
                            fontSize: '1.7rem',
                          },
                        }}
                      />
                    </StyledBadge>
                  </IconButton>
                </NavLink>
              )}
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </>
  );
}
