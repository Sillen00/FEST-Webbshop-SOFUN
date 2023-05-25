import * as Icon from '@mui/icons-material';

import { Box, Button, IconButton, Paper, Snackbar as MuiSnackbar, Typography } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

interface SnackbarProps {
  open: boolean;
  handleClose: (event: React.SyntheticEvent<Element, Event> | Event, reason?: string) => void;
  lastAddedProduct?: {
    title: string;
    price: number;
    image: string;
  };
}

export default function Snackbar({ open, handleClose, lastAddedProduct }: SnackbarProps) {
  const { isLoggedIn, handleOpen } = useUser();

  return (
    <>
      <MuiSnackbar
        data-cy='added-to-cart-toast'
        open={open}
        onClose={handleClose}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        {lastAddedProduct && (
          <Paper
            elevation={4}
            sx={{
              backgroundColor: 'primary',
              borderColor: 'grey.300',
              borderWidth: 1,
              borderStyle: 'solid',
              width: '18rem',
              padding: '1rem',
              borderRadius: '3px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <IconButton
              size='small'
              aria-label='close'
              color='inherit'
              sx={{ position: 'absolute', top: 0, right: 0 }}
              onClick={handleClose}
            >
              <Icon.Close fontSize='small' />
            </IconButton>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}
            >
              <Icon.CheckCircle sx={{ color: 'green', fontSize: '1rem', marginRight: '0.5rem' }} />
              <Typography variant='subtitle1' sx={{ textAlign: 'center' }}>
                Har lagts till i kundvagnen
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                marginBottom: '1rem',
              }}
            >
              <Box sx={{ marginRight: '1rem' }}>
                <img
                  src={lastAddedProduct.image}
                  alt='product'
                  style={{
                    width: '70px',
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                }}
              >
                <Typography variant='subtitle1'>{lastAddedProduct.title}</Typography>
                <Typography variant='subtitle1'>
                  {lastAddedProduct.price.toLocaleString('sv-SE')}kr
                </Typography>
              </Box>
            </Box>
            {isLoggedIn ? (
              <NavLink to='./checkout'>
                <Button
                  variant='contained'
                  color='primary'
                  fullWidth
                  sx={{
                    fontSize: '12px',
                    border: '1px solid',
                    padding: '0.5rem',
                    paddingLeft: '1.5rem',
                    paddingRight: '1.5rem',
                    alignItems: 'flex-end',
                    backgroundColor: 'primary.main',
                    color: 'secondary.contrastText',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                    },
                  }}
                >
                  Gå till kassan
                </Button>
              </NavLink>
            ) : (
              <NavLink onClick={handleOpen} to={location.pathname}>
                <Button
                  variant='contained'
                  sx={{
                    backgroundColor: 'secondary.main',
                    color: 'secondary.contrastText',
                    '&:hover': {
                      backgroundColor: 'secondary.light',
                    },
                    alignSelf: 'flex-end',
                  }}
                >
                  Gå till kassan
                </Button>
              </NavLink>
            )}
          </Paper>
        )}
      </MuiSnackbar>
    </>
  );
}
