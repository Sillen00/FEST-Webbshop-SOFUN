import { Box, Card, CardContent, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Order, useOrder } from '../contexts/OrderContext';
import { useUser } from '../contexts/UserContext';

export default function OrderPage() {
  const { getOrdersByUser } = useOrder();
  const { currentUser } = useUser();
  const [userOrders, setUserOrders] = useState<Order[]>([]);

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
              borderBottom: '1px solid black',
              marginBottom: '1rem',
              width: '80%',
            }}
          >
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <Box>
                <Typography variant='h5'>{order.totalPrice} kr</Typography>
              </Box>
              <Box>
                <Typography variant='h5'>Levereras till</Typography>
                <Typography variant='h5'>
                  {order.deliveryAddress.firstName} {order.deliveryAddress.lastName}{' '}
                </Typography>
                <Typography variant='h5'>{order.deliveryAddress.address}</Typography>
                <Typography variant='h5'>
                  {order.deliveryAddress.zipCode} {order.deliveryAddress.city}
                </Typography>
                <Typography variant='h5'>{order.deliveryAddress.phoneNumber}</Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

{
  /* <Typography variant='h5'>{order._id}</Typography>
              <Typography variant='h5'>{order.totalPrice} kr</Typography>
              <Typography variant='h5'>
                {order.deliveryAddress.firstName} {order.deliveryAddress.lastName}
              </Typography>
              <Typography variant='h5'>{order.deliveryAddress.address}</Typography>
              <Typography variant='h5'>
                {order.deliveryAddress.zipCode} {order.deliveryAddress.city}
              </Typography>
              <Typography variant='h5'> Skickad {order.isShipped ? 'Ja' : 'Nej'}</Typography>
              <Typography variant='h5'>
                Skapad: {new Date(order.createdAt).toLocaleDateString('sv-SE')}
              </Typography> */
}
