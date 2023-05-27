import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AdminAllProductsTable from '../components/AdminAllProductsTable';
import AdminAllUsersTable from '../components/AdminAllUsersTable';

export default function Admin() {
  const navigate = useNavigate();
  // const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  // const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
      <AdminAllProductsTable />
      <AdminAllUsersTable />
    </Box>
  );
}
