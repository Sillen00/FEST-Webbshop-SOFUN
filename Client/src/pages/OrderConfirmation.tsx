import { Box, Card, CardContent, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useOrder } from '../contexts/OrderContext';

export default function OrderConfirmation() {
  const { order } = useOrder();
  console.log('order:', order);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  if (!order) {
    // Product not found
    return <h1>HITTADE INTE</h1>;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'secondary.main',
      }}
    >
      <Typography variant='h3' m={2.5}>
        Bokningsbekräftelse
      </Typography>

      <Box
        sx={{
          marginTop: '1rem',
          width: isSmallScreen ? '95%' : '30rem',
        }}
      >
        {order?.orderItems?.map(orderItem => {
           console.log('Order Item Image ID in orderPage:', orderItem.productID.imageID);
          return (
            <Card
              variant='outlined'
              data-cy='product'
              key={orderItem.productID._id}
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
                    {order?.orderItems.map((item, index) => (
                      <img
                        key={index}
                        src={'/api/image/' + item.productID.imageID}
                        alt={item.productID.title}
                        style={{ width: '8rem', height: 'auto' }}
                      />
                    ))}
                  </Box>
                  <Box sx={{ display: 'flex', flex: '1' }}>
                    <Typography variant='subtitle2' data-cy='product-title'>
                      {orderItem.productID?.title}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flex: '1' }}>
                    <Typography variant='subtitle2'>{orderItem.quantity}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flex: '1' }}>
                    <Typography variant='subtitle2' data-cy='product-price'>
                      {orderItem.productID.price} kr
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
              <p>Summa: {order?.totalPrice} kr </p>
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
              {order?.deliveryAddress?.firstName} {order?.deliveryAddress?.lastName}
            </Typography>
            <Typography variant='subtitle1'>
              <span data-cy='customer-address'>{order?.deliveryAddress?.address},</span>
              <span data-cy='customer-zipcode'>{order?.deliveryAddress?.zipCode},</span>
              <span data-cy='customer-city'> {order?.deliveryAddress?.city}</span>
            </Typography>
            <Typography variant='subtitle1' data-cy='customer-phone'>
              {order?.deliveryAddress?.phoneNumber}
            </Typography>
          </Box>
        </Box>
      </Box>

    </Box>
  );
}
