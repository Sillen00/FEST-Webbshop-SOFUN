import {
  Box,
  Button,
  CardContent,
  Divider,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Snackbar from '../components/Snackbar';
import { CartItem, useCart } from '../contexts/CartContext';
import { Product, useProduct } from '../contexts/ProductContext';

export default function InfoCard() {
  const params = useParams();
  const { products } = useProduct();
  const { addProduct } = useCart();
  const matches = useMediaQuery('(min-width:1280px)');
  const [lastAddedProduct, setLastAddedProduct] = useState<
    | {
        title: string;
        price: number;
        image: string;
      }
    | undefined
  >(undefined);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = (
    event: React.SyntheticEvent<Element, Event> | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const selectedProduct = products.find((product: Product) => product._id === params.id) as Product;

  if (!selectedProduct) {
    return <h1>Product not found</h1>;
  }

  return (
    <React.Fragment>
      <CardContent sx={{ padding: '1.2rem' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0.3rem',
            }}
          >
            <Box>
              <Typography data-cy='product-title' variant='h3'>
                {selectedProduct?.title}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              padding: '0.5rem',
              fontSize: '60px',
            }}
          >
            <Typography data-cy='product-price' variant='h5' marginBottom={'1.5rem'}>
              {selectedProduct?.price}
              <span>kr</span>
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box
          sx={{
            padding: '0.5rem',
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          <Typography marginBottom={'1.5rem'} marginTop={'1rem'}>
            Kategori
          </Typography>
          <Typography variant='body2' data-cy='product-description'>
            {selectedProduct?.description}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginLeft: 'auto',
            width: '100%',
            paddingBottom: matches ? 'auto' : '1rem',
          }}
        >
          <Tooltip title='Lägg till i kundvagnen'>
            <Button
              variant='contained'
              color='primary'
              sx={{
                fontSize: '12px',
                paddingRight: '1rem',
                paddingLeft: '1rem',
                marginRight: '2rem',
                marginBottom: '1rem',
                marginTop: '6rem',
                backgroundColor: 'primary.contrastText',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.contrastText',
                },
              }}
              data-cy='product-buy-button'
              onClick={() => {
                const cartItem: CartItem = {
                  id: selectedProduct._id,
                  title: selectedProduct.title,
                  price: selectedProduct.price,
                  quantity: 1,
                  imageID: selectedProduct.imageID,
                };
                addProduct(cartItem);
                if (selectedProduct.stockLevel > 0) {
                  setSnackbarOpen(true);
                  setLastAddedProduct({
                    title: selectedProduct.title,
                    price: selectedProduct.price,
                    image: selectedProduct.imageID,
                  });
                }
              }}
            >
              Lägg i kundvagnen
            </Button>
          </Tooltip>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            left: '10%',
            width: '50%',
            height: '50%',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <Snackbar
            open={snackbarOpen}
            handleClose={handleSnackbarClose}
            lastAddedProduct={lastAddedProduct}
          />
        </Box>
      </CardContent>
    </React.Fragment>
  );
}
