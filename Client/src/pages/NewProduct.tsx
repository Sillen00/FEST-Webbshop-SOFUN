import { Box, Typography } from '@mui/material';
import AdminForm, { defaultValues } from '../components/AdminForm';
import { Product } from '../data';

export default function EditProduct() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '1rem',
        marginBottom: '3rem',
      }}
    >
      <Typography variant='h3' sx={{ marginBottom: '3rem' }}>
        Lägg till en ny produkt
      </Typography>

      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <AdminForm product={defaultValues as Product} isNewProduct={true} />
      </Box>
    </Box>
  );
}
