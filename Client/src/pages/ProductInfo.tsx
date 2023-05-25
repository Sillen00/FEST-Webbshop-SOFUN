import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Snackbar from '../components/Snackbar';
import { useCart } from '../contexts/CartContext';
import { Product, useProduct } from '../contexts/ProductContext';
import { CartItem } from '../data';

export default function ProductInfo() {
  const matches = useMediaQuery('(min-width:1280px)');
  const params = useParams();

  const { product } = useProduct();
  const { addProduct } = useCart();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState<
    | {
        title: string;
        price: number;
        image: string;
      }
    | undefined
  >(undefined);

  const handleSnackbarClose = (
    event: React.SyntheticEvent<Element, Event> | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const backgroundImage =
    'https://www.ski-doo.com/content/dam/global/en/ski-doo/my22/images/models/Ski-Doo-Model-Essential-Background.jpg';

  const selectedProduct = product.find((product: Product) => product._id === params.id) as Product;

  const card = (
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
              padding: '0.5rem 0.8rem',
            }}
          >
            <Avatar
              src={selectedProduct?.imageID}
              alt='avatar'
              sx={{
                width: '10rem',
                height: '5rem',
                padding: '0.5rem',
              }}
            />
            <Box sx={{ padding: '1.2rem' }}>
              <Typography data-cy='product-title' variant='h3' marginBottom={'0.3rem'}>
                {selectedProduct?.title}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0.5rem 1rem',
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
            padding: '0.8rem',
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
      </CardContent>
    </React.Fragment>
  );

  if (!selectedProduct) {
    return <h1>Product not found</h1>;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '78.4vh',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: matches ? '5rem' : '0rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          maxWidth: '35rem',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            // height: matches ? '32rem' : '36rem',
            marginBottom: '3rem',
          }}
          variant='outlined'
        >
          {card}

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
                    imageURL: selectedProduct.imageID,
                  };
                  addProduct(cartItem);
                  setSnackbarOpen(true);
                  setLastAddedProduct({
                    title: selectedProduct.title,
                    price: selectedProduct.price,
                    image: selectedProduct.imageID,
                  });
                }}
              >
                Lägg i kundvagnen
              </Button>
            </Tooltip>
          </Box>
        </Card>
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
      </Box>
    </Box>
  );
}
