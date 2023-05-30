import { Box, Button, Card, Typography, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../components/Carousel';
import Snackbar from '../components/Snackbar';
import { CartItem, useCart } from '../contexts/CartContext';
import { Product, useProduct } from '../contexts/ProductContext';

export default function Products() {
  const { products } = useProduct();
  const { addProduct } = useCart();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState<CartItem | undefined>(undefined);

  const handleSnackbarClose = (
    event: React.SyntheticEvent<Element, Event> | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const matches = useMediaQuery('(min-width:500px)');

  function handleAddToCart(product: Product) {
    const cartItem: CartItem = {
      id: product._id,
      title: product.title,
      price: product.price,
      imageID: product.imageID,
      quantity: 1,
    };
    addProduct(cartItem);
    if (product.stockLevel > 0) {
      setSnackbarOpen(true);
      setLastAddedProduct({
        title: product.title,
        price: product.price,
        imageID: product.imageID,
        id: product._id,
        quantity: 1,
      });
    }
  }

  return (
    <>
      <Carousel />
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          backgroundColor: 'secondary.main',
          '& a': {
            color: 'black',
            textDecoration: 'none',
          },
        }}
      >
        {products.map(product => (
          <Card
            key={product._id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              margin: '1rem',

              maxHeight: matches ? '33rem' : 'none',
              justifyContent: 'center',
              height: '100%',
              width: matches ? '22rem' : '100%',
              backgroundColor: 'primary.main',
            }}
            data-cy='product'
          >
            <Link to={'/product/' + product._id}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '27rem',
                  width: '22rem',
                  overflow: 'hidden',
                }}
              >
                <img src={'/api/image/' + product.imageID} alt={product.title} width='100%' />
              </Box>
            </Link>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  margin: '0.5rem',
                }}
              >
                <Box>
                  <Typography variant='h4' data-cy='product-title'>
                    {product.title}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ variant: 'h5' }} data-cy='product-price'>
                    {product.price}kr
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  margin: '1rem',
                  marginTop: '1.5rem',
                  marginLeft: '0',
                  width: '100%',
                  height: '2rem',
                }}
              >
                <Button
                  variant='contained'
                  color='primary'
                  sx={{
                    fontSize: '12px',
                    border: '1px solid',
                    padding: '0.5rem',
                    backgroundColor: 'primary.main',
                    color: 'secondary.contrastText',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                    },
                  }}
                  data-cy='product-buy-button'
                  onClick={() => {
                    const cartItem: CartItem = {
                      id: product?._id || '',
                      title: product.title,
                      price: product.price,
                      imageID: product.imageID,
                      quantity: 1,
                    };
                    addProduct(cartItem);
                    setSnackbarOpen(true);
                    setLastAddedProduct({
                      title: product.title,
                      price: product.price,
                      imageID: product.imageID,
                      id: product?._id || '',
                      quantity: 1,
                    });
                  }}
                >
                  Lägg i kundvagnen
                </Button>
              </Box>
            </Box>
          </Card>
        ))}
        <Snackbar
          data-cy='added-to-cart-toast'
          open={snackbarOpen}
          handleClose={handleSnackbarClose}
          lastAddedProduct={{
            title: lastAddedProduct?.title || '',
            price: lastAddedProduct?.price || 0,
            image: lastAddedProduct?.imageID || '',
          }}
        />
      </Box>
    </>
  );
}
