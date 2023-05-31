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
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          gap: '1rem',
        }}
      >
        {userOrders.map(order => (
          <Card
            key={order._id}
            variant='outlined'
            sx={{
              backgroundColor: 'white',
              width: '80%',
              padding: 0,
              borderRadius: 0,
              '&:first-child': {
                marginTop: '1rem',
              },
              '&:last-child': {
                marginBottom: '1rem',
              },
            }}
          >
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: '100%',
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
                  gap: '1rem',
                  width: '100%',
                  padding: '0 0.4rem',
                  borderBottom: '1px solid lightgrey',
                }}
              >
                <Typography variant='h5'>
                  Ordern skapades:{' '}
                  {new Date(order.createdAt).toLocaleDateString('sv-SE', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  width: '10rem',
                  padding: '0.4rem',
                }}
              >
                {order.orderItems.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '1rem',
                      alignItems: 'center',
                    }}
                  >
                    <img
                      src={`/api/image/${item.productID.imageID}`}
                      alt={item.productID.title}
                      style={{ width: '10rem', height: 'auto' }}
                    />
                    <Typography variant='h5'>{item.productID.title}</Typography>
                  </Box>
                ))}
              </Box>
              <Box>
              <Typography variant='h5'>Levereras till</Typography>
                <Typography variant='h5'>
                  {order.deliveryAddress.firstName} {order.deliveryAddress.lastName}
                </Typography>
                <Typography variant='h5'>{order.deliveryAddress.address}</Typography>
                <Typography variant='h5'>
                  {order.deliveryAddress.zipCode} {order.deliveryAddress.city}
                </Typography>
                <Typography variant='h5'>
                  {order.deliveryAddress.zipCode} {order.deliveryAddress.city}
                </Typography>
                <Typography variant='h5'>{order.deliveryAddress.phoneNumber}</Typography>
                <Typography variant='h5'>{order.isShipped ? 'Ordern är skickad' : 'Ordern behandlas'}</Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

