import { Box, Button, Card, Typography, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Snackbar from '../components/Snackbar';
import { useProduct } from '../contexts/ProductContext';

export default function Products() {
  const { products } = useProduct();
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

  const matches = useMediaQuery('(min-width:500px)');

  return (
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
              <img src={product.imageURL} alt={product.title} width='100%' />
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
                margin: '1rem',
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
                marginTop: '2rem',
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
                  setSnackbarOpen(true);
                  setLastAddedProduct({
                    title: product.title,
                    price: product.price,
                    image: product.imageURL,
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
        lastAddedProduct={lastAddedProduct}
      />
    </Box>
  );
}
