import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import AdminForm from '../components/AdminForm';
import { useProduct } from '../contexts/ProductContext';

export default function EditProduct() {
  const params = useParams();
  const { product } = useProduct();

  const selectedProduct = product.find(chosen => chosen.id === params.id);

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
        Redigera produkt
      </Typography>
      <Box sx={{ display: 'flex' }}>
        <AdminForm product={selectedProduct} isNewProduct={false} />
      </Box>
    </Box>
  );
}
