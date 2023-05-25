import { Box, Typography } from '@mui/material';
import AdminForm, { defaultValues } from '../components/AdminForm';
import { useProduct, Product } from '../contexts/ProductContext';

export default function EditProduct() {
  const { addProduct } = useProduct();

  const handleAddProduct = (newProduct: Product) => {
    addProduct(newProduct);
  };

  const newProduct: Product = {
    _id: '',
    categoryIDs: [],
    title: defaultValues.title,
    imageID: defaultValues.image,
    description: defaultValues.description,
    price: defaultValues.price,
    stockLevel: 0,
    imageURL: '',
    isArchived: false,
  };

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
        <AdminForm product={newProduct} isNewProduct={true} onSubmit={handleAddProduct} />
      </Box>
    </Box>
  );
}
