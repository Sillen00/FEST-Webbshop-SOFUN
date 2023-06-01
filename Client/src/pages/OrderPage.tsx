import { Box, Card, CardContent, Typography, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { Order, useOrder } from '../contexts/OrderContext';
import { useUser } from '../contexts/UserContext';

export default function OrderPage() {
  const { getOrdersByUser } = useOrder();
  const { currentUser } = useUser();
  const [userOrders, setUserOrders] = useState<Order[]>([]);

  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        if (currentUser?._id) {
          const orders = await getOrdersByUser(currentUser._id);
          setUserOrders(orders);
        }
      } catch (error) {
        console.error('Error fetching user orders:', error);
      }
    };

    fetchUserOrders();
  }, [getOrdersByUser, currentUser?._id]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'secondary.main',
      }}
    >
      <Typography variant='h3'>Dina beställningar</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          minHeight: '50vh',
          gap: '1rem',
        }}
      >
        {userOrders.map(order => (
          <Card
            key={order._id}
            variant='outlined'
            sx={{
              backgroundColor: 'white',
              width: '90vw',
              padding: 0,
              borderRadius: 0,
              '&:first-of-type': {
                marginTop: '1rem',
              },
              '&:last-of-type': {
                marginBottom: '1rem',
              },
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
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-between',
                gap: '0.5rem',
                height: 'auto',
                padding: 0,
                '&:last-child': {
                  paddingBottom: 0,
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: '0.4rem',
                  justifyContent: 'center',
                  maxWidth: '10rem',
                  padding: '0.4rem',
                  marginBottom: '0.5rem',
                }}
              >
                {order.orderItems.map((orderItem, index) => (
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
                      src={`/api/image/${orderItem.productID.imageID}`}
                      alt={orderItem.productID.title}
                      style={{ maxWidth: '80%', height: 'auto' }}
                    />
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <Typography variant='body1'>Produktdetaljer</Typography>
                      <Typography variant='body2'>Namn: {orderItem.productID.title}</Typography>
                      <Typography variant='body2'>Antal: {orderItem.quantity}x</Typography>
                      <Typography variant='body2'>
                        Pris: {orderItem.productID.price * orderItem.quantity}kr
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '0.4rem',
                  margin: '0 0.5rem 0.5rem 0',
                  maxWidth: '50%',
                  justifyContent: 'flex-end',
                }}
              >
                <Typography variant='h5'>Levereransuppgifter</Typography>
                <Typography variant='body2'>
                  {order.deliveryAddress.firstName} {order.deliveryAddress.lastName}
                </Typography>
                <Typography variant='body2'>{order.deliveryAddress.address}</Typography>
                <Typography variant='body2'>
                  {order.deliveryAddress.zipCode} {order.deliveryAddress.city}
                </Typography>
                <Typography variant='body2'>{order.deliveryAddress.phoneNumber}</Typography>
                <Typography variant='h5' sx={{ marginTop: '0.5rem' }}>
                  Summa
                </Typography>
                <Typography variant='body2'>{order.totalPrice} kr</Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
