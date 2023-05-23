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

  const isLoggedIn = false; // or false, depending on the user's login status

  const { open, handleOpen, handleClose } = useUser();

  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  return (
    <Box
      sx={{
        backgroundColor: '#fffaf5',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '9rem',
        textDecoration: 'none',
        padding: '1em 5em 1em 5em',
        [theme.breakpoints.down('sm')]: {
          padding: '1em 2em 1em 2em',
        },
        color: 'black',
      }}
    >
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
            <Icon.AccountCircle
              sx={{
                [theme.breakpoints.down('sm')]: {
                  fontSize: '1.7rem',
                },
                [theme.breakpoints.up('md')]: {
                  fontSize: '3rem',
                },
              }}
            />
          </IconButton>
        </NavLink>

        <Box>
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
                    // sx={{
                    // fontSize: '2rem',
                    // [theme.breakpoints.down('sm')]: {
                    //   fontSize: '1.5rem',
                    // },
                    // }}
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
                        [theme.breakpoints.down('sm')]: {
                          fontSize: '1.7rem',
                        },
                        [theme.breakpoints.up('md')]: {
                          fontSize: '3rem',
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
  );
}
