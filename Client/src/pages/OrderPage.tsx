import { Box, Button, Card, CardContent, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../contexts/OrderContext';
import { useProduct } from '../contexts/ProductContext';
import { useUser } from '../contexts/UserContext';

export default function OrderPage() {
  const { order } = useOrder();
  const { logoutUser } = useUser();
  const { products: productContext } = useProduct(); // Update this line
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'secondary.main',
        }}
      >
        <Button
          variant='contained'
          color='primary'
          sx={{
            fontSize: '12px',
            border: '1px solid',
            padding: '0.5rem',
            marginBottom: '1.5rem',
            backgroundColor: 'secondary.main',
            color: 'secondary.contrastText',
            '&:hover': {
              backgroundColor: 'primary.main',
            },
          }}
          onClick={() => {
            logoutUser();
            navigate('/');
          }}
        >
          <Typography variant='body1'>Logga ut </Typography>
        </Button>
        <Typography variant='h3'>Odrar</Typography>

        <Box
          sx={{
            marginTop: '1rem',
            width: isSmallScreen ? '95%' : '30rem',
          }}
        >
          {order?.orderItems.map(orderItem => {
            const product = productContext.find(p => p._id === orderItem.productID); // Update this line

            if (!product) {
              // Product not found
              return null;
            }
            return (
              <Card
                variant='outlined'
                data-cy='product'
                key={orderItem.productID}
                sx={{
                  backgroundColor: 'white',
                  borderBottom: '1px solid black',
                }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '1rem',
                      justifyContent: 'center',
                      flex: '1',
                      alignItems: 'center',
                    }}
                  >
                    <Box sx={{ display: 'flex', flex: '1' }}>
                      <img
                        src={'/api/image/' + product.imageID}
                        alt={product.title}
                        style={{ width: '8rem', height: 'auto' }}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', flex: '1' }}>
                      <Typography variant='subtitle2' data-cy='product-title'>
                        {product.title}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flex: '1' }}>
                      <Typography variant='subtitle2'>{orderItem.quantity}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flex: '1' }}>
                      <Typography variant='subtitle2' data-cy='product-price'>
                        {product.price} kr
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            );
          })}
          <Box>
            <Typography
              variant='h6'
              component='h6'
              sx={{
                height: 'auto',
                fontWeight: 'bold',
                backgroundColor: 'white',
                padding: '0.2rem',
                textAlign: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  paddingRight: '1rem',
                }}
              >
                <p>Summa: {order?.totalPrice.toLocaleString('sv-SE')} kr </p>
              </Box>
            </Typography>
          </Box>
          <Box
            sx={{
              background: 'white',
              margin: '0 0 2rem 0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <p>Tack för din beställning!</p>
              <p>Ditt ordernummer: {2131}</p>
            </Box>
            <Typography
              component='h4'
              sx={{
                fontSize: '1rem',
                fontWeight: 'bold',
                marginTop: '1rem',
              }}
            >
              Din order levereras till följande adress
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '1rem',
                marginBottom: '2rem',
              }}
            >
              <Typography variant='subtitle1' data-cy='customer-name'>
                {order?.deliveryAddress.firstName} {order?.deliveryAddress.lastName}
              </Typography>
              <Typography variant='subtitle1'>
                <span data-cy='customer-address'>{order?.deliveryAddress.address},</span>
                <span data-cy='customer-zipcode'>{order?.deliveryAddress.zipCode},</span>
                <span data-cy='customer-city'> {order?.deliveryAddress.city}</span>
              </Typography>
              <Typography variant='subtitle1' data-cy='customer-phone'>
                {order?.deliveryAddress.phoneNumber}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
