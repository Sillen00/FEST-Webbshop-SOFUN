import { Box, Button, ButtonGroup, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminAllOrdersTable from '../components/AdminAllOrdersTable';
import AdminAllProductsTable from '../components/AdminAllProductsTable';
import AdminAllUsersTable from '../components/AdminAllUsersTable';

export default function Admin() {
  const navigate = useNavigate();
  // const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  // const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [showSection, setShowSection] = useState<'user' | 'product' | 'order'>('product');

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

      <ButtonGroup
        variant='contained'
        aria-label='contained primary button group'
        sx={{ width: '100%', maxWidth: '800px', border: '1px solid' }}
      >
        <Button
          onClick={() => setShowSection('product')}
          sx={{
            width: '33%',
            fontSize: '16px',
            paddingLeft: '1rem',
            paddingRight: '1rem',
            backgroundColor: 'secondary.main',
            color: 'secondary.contrastText',
            '&:hover': {
              backgroundColor: 'primary.main',
            },
          }}
        >
          Products
        </Button>
        <Button
          onClick={() => setShowSection('user')}
          sx={{
            width: '33%',
            fontSize: '16px',
            paddingLeft: '1rem',
            paddingRight: '1rem',
            backgroundColor: 'secondary.main',
            color: 'secondary.contrastText',
            '&:hover': {
              backgroundColor: 'primary.main',
            },
          }}
        >
          Users
        </Button>
        <Button
          onClick={() => setShowSection('order')}
          sx={{
            width: '33%',
            fontSize: '16px',
            paddingLeft: '1rem',
            paddingRight: '1rem',
            backgroundColor: 'secondary.main',
            color: 'secondary.contrastText',
            '&:hover': {
              backgroundColor: 'primary.main',
            },
          }}
        >
          Orders
        </Button>
      </ButtonGroup>

      {showSection === 'product' && <AdminAllProductsTable />}
      {showSection === 'user' && <AdminAllUsersTable />}
      {showSection === 'order' && <AdminAllOrdersTable />}
    </Box>
  );
}
