import * as Icon from '@mui/icons-material';
import { Box, Divider, IconButton, Menu, MenuItem, Modal, Tooltip } from '@mui/material';
import StyledBadge from '@mui/material/Badge';
import React from 'react';

import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useUser } from '../contexts/UserContext';
import { theme } from '../theme';
import LoginRegisterModal from './LoginRegisterModal';
import Logo from './Logo';

export default function Header() {
  const { cart } = useCart();
  const location = useLocation();
  const { currentUser, logoutUser } = useUser();
  const navigate = useNavigate();
  const { open, handleOpen, handleClose, isLoggedIn } = useUser();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

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
          {currentUser?.isAdmin && (
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
          )}

          <Tooltip title='Orders'>
            <IconButton
              aria-label='admin'
              aria-controls='account-menu'
              aria-haspopup='true'
              onClick={handleClick}
              sx={{ color: 'secondary.contrastText' }}
            >
              <Icon.AccountCircle
                sx={{
                  fontSize: '2.5rem',
                  [theme.breakpoints.down('sm')]: {
                    fontSize: '1.7rem',
                  },
                }}
              />
            </IconButton>
          </Tooltip>

          <Menu
            id='account-menu'
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            {isLoggedIn ? (
              <>
                <MenuItem
                  color='primary'
                  sx={{
                    fontSize: '12px',
                    padding: '0.5rem',
                    backgroundColor: 'primary.main',
                    color: 'secondary.contrastText',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      color: 'secondary.contrastText',
                    },
                  }}
                  onClick={handleCloseMenu}
                  component={NavLink}
                  to='./orders'
                >
                  Dina ordrar
                </MenuItem>
                <Divider color={'black'} />
                <MenuItem
                  color='primary'
                  sx={{
                    fontSize: '12px',
                    // border: '1px solid',
                    padding: '0.5rem',
                    backgroundColor: 'primary.main',
                    color: 'secondary.contrastText',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                    },
                  }}
                  onClick={() => {
                    handleCloseMenu();
                    logoutUser();
                    navigate('/');
                  }}
                >
                  Logga ut
                </MenuItem>
              </>
            ) : (
              <MenuItem
                color='primary'
                sx={{
                  fontSize: '12px',
                  padding: '0.5rem',
                  backgroundColor: 'primary.main',
                  color: 'secondary.contrastText',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                  },
                }}
                onClick={() => {
                  handleOpen();
                  handleCloseMenu();
                }}
              >
                Logga in/Registrera dig
              </MenuItem>
            )}
          </Menu>

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
