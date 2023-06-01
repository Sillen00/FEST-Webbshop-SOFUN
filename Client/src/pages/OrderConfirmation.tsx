import { Box, Card, CardContent, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useOrder } from '../contexts/OrderContext';

export default function OrderConfirmation() {
  const { order } = useOrder();
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
        minHeight: '70vh',
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
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  padding: '0 0.4rem',
                  borderBottom: '1px solid lightgrey',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography variant='h5'>Ordernr: {order._id}</Typography>
                  <Typography variant='body2'>
                    {new Date(order.createdAt).toLocaleDateString('sv-SE', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Typography>
                </Box>
                <Typography variant='h5'>
                  {order.isShipped ? 'Ordern är skickad' : 'Ordern behandlas'}
                </Typography>
              </Box>
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
                    gap: '3rem',
                    alignItems: 'center',
                  }}
                >
                  {order?.orderItems.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '3rem',
                        alignItems: 'center',
                      }}
                    >
                      <img
                        key={index}
                        src={'/api/image/' + item.productID.imageID}
                        alt={item.productID.title}
                        style={{ width: '8rem', height: 'auto' }}
                      />
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <Typography variant='body1'>Produktdetaljer</Typography>
                        <Typography variant='body2'>Namn: {item.productID?.title}</Typography>
                        <Typography variant='body2'>Antal: {item.quantity}x</Typography>
                        <Typography variant='body2'>
                          Pris: {item.productID?.price * item.quantity}kr
                        </Typography>
                      </Box>
                    </Box>
                  ))}
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
            ></Box>
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
              margin: '1rem 0',
            }}
          >
            <Typography variant='h3'>Tack för din beställning!</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              padding: '0.4rem',
              margin: '0 0.5rem 0.5rem 0',
              width: '100%',
              justifyContent: 'center',
              gap: '2rem',
            }}
          >
            <Box>
              <Typography variant='h5'>Levereransuppgifter</Typography>
              <Typography variant='body2'>
                {order.deliveryAddress.firstName} {order.deliveryAddress.lastName}
              </Typography>
              <Typography variant='body2'>{order.deliveryAddress.address}</Typography>
              <Typography variant='body2'>
                {order.deliveryAddress.zipCode} {order.deliveryAddress.city}
              </Typography>
              <Typography variant='body2'>{order.deliveryAddress.phoneNumber}</Typography>
            </Box>
            <Box>
              <Typography variant='h5'>Summa</Typography>
              <Typography variant='body2'>{order.totalPrice} kr</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
