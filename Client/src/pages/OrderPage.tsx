import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Order, useOrder } from '../contexts/OrderContext';
import { useUser } from '../contexts/UserContext';

export default function OrderPage() {
  const { getOrdersByUser } = useOrder();
  const { currentUser, logoutUser } = useUser();
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const orders = await getOrdersByUser(currentUser?._id || '');
        setUserOrders(orders);
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
      <Button
        variant='contained'
        color='primary'
        sx={{ margin: '0 0 5em 0' }}
        onClick={() => {
          logoutUser();
          navigate('/');
        }}
      >
        <Typography variant='body1'>Logga ut </Typography>
      </Button>
      <Typography variant='h3'>Dina beställningar</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '80vw',
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
              width: '30rem',
            }}
          >
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <Typography variant='h5'>{order._id}</Typography>
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
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
