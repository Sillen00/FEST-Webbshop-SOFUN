import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import AdminForm from '../components/AdminForm';
import { Product, useProduct } from '../contexts/ProductContext';

export default function EditProduct() {
  const params = useParams();
  const { product, updateProduct } = useProduct();

  const selectedProduct = product.find(chosen => chosen._id === params.id) as Product;

  const handleSubmit = (updatedProduct: Product) => {
    if (params?.id) {
      updateProduct(params.id, updatedProduct);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'secondary.main',
      }}
    >
      <Typography variant='h3' sx={{ marginBottom: '3rem' }}>
        Redigera produkt
      </Typography>
      <Box sx={{ display: 'flex', marginBottom: '3rem' }}>
        <AdminForm product={selectedProduct} isNewProduct={false} onSubmit={handleSubmit} />
      </Box>
    </Box>
  );
}
