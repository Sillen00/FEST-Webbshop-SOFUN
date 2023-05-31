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
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                width: '50%',
                gap: '1rem',
                backgroundColor: "lightgreen"
              }}>
              {order.orderItems.map((item, index) => (
                  <img
                  key={index}
                  src={'/api/image/' + item.productID.imageID}
                  alt={item.productID.title}
                  style={{ width: '8rem', height: 'auto',  }}
                />
                ))}
              </Box>
              <Box sx={{
                backgroundColor: "lightblue",
                width: "25%"
              }}>
              {order.orderItems.map((item, index) => (
                  <span key={index}>{item.productID.title}</span>
                ))}
              </Box>
              <Box sx={{
                backgroundColor: "lightyellow",
                width: "25%"
              }}>
                <Typography variant='h5'>Levereras till</Typography>
                <Typography variant='h5'>
                  {order.deliveryAddress.firstName} {order.deliveryAddress.lastName}{' '}
                </Typography>
                <Typography variant='h5'>{order.deliveryAddress.address}</Typography>
                <Typography variant='h5'>
                  {order.deliveryAddress.zipCode} {order.deliveryAddress.city}
                </Typography>
                <Typography variant='h5'>{order.deliveryAddress.phoneNumber}</Typography>
                <Typography variant='h5'>{order.isShipped ? 'Yes' : 'No'}</Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
