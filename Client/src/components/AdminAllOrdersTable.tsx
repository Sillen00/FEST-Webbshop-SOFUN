import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from '@mui/material';
import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { Order, useOrder } from '../contexts/OrderContext';

export default function AdminAllOrdersTable() {
  const { updateOrderStatus, orderStatusUpdated } = useOrder();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [allOrders, setAllOrders] = useState<Order[]>([]);

  const handleAccordionChange = (orderId: string) => {
    setExpandedOrder(orderId === expandedOrder ? null : orderId);
  };

  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const response = await axios.get('/api/orders', { withCredentials: true });

        if (response.status === 200) {
          setAllOrders(response.data);
        } else {
          throw new Error(response.statusText);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchAllOrders();
  }, [orderStatusUpdated]);

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: 330,
          maxWidth: 800,
        }}
      >
        <Table aria-label='simple table' size='small' padding='none'>
          <TableHead>
            <TableRow
              sx={{
                bgcolor: 'secondary.contrastText',
              }}
            >
              <TableCell align='center' sx={{ typography: 'h6', color: 'primary.main' }}>
                Användar ID
              </TableCell>
              <TableCell align='center' sx={{ typography: 'h6', color: 'primary.main' }}>
                Skickad
              </TableCell>
              <TableCell align='center' sx={{ typography: 'h6', color: 'primary.main' }}>
                Admin
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allOrders
              .map(order => (
                <Fragment key={order._id}>
                  <TableRow
                    sx={{
                      '&:last-child td, &:last-child th': {},
                    }}
                    data-cy='order'
                    onClick={() => handleAccordionChange(order._id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <TableCell align='center' data-cy='order-user-id'>
                      {order.userID}
                    </TableCell>
                    <TableCell align='center' data-cy='order-shipped'>
                      {order.isShipped ? 'Ja' : 'Nej'}
                    </TableCell>
                    <TableCell align='center'>
                      <Button
                        variant='contained'
                        color='primary'
                        disabled={order.isShipped}
                        onClick={event => {
                          event.stopPropagation();
                          updateOrderStatus(order._id);
                        }}
                        sx={{
                          width: '60%',
                          fontSize: '0.8rem',
                          mb: '0.5rem',
                          mt: '0.5rem',
                        }}
                      >
                        Ändra status
                      </Button>
                      <IconButton
                        aria-label='expand'
                        size='small'
                        sx={{
                          marginLeft: 'auto',
                          transform: expandedOrder === order._id ? 'rotate(180deg)' : 'rotate(0)',
                          transition: 'transform 0.2s ease-in-out',
                        }}
                        onClick={event => {
                          event.stopPropagation();
                          handleAccordionChange(order._id);
                        }}
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  {expandedOrder === order._id && (
                    <TableRow key={`accordion-${order._id}`}>
                      <TableCell colSpan={3}>
                        <Accordion
                          expanded={expandedOrder === order._id}
                          onChange={() => handleAccordionChange(order._id)}
                        >
                          <AccordionDetails>
                            <Card
                              key={order._id}
                              variant='outlined'
                              sx={{
                                minWidth: 300,
                                maxWidth: 800,
                                padding: 0,
                                borderRadius: 0,
                                backgroundColor: 'secondary.main',
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
                                        <Typography variant='body2'>
                                          Namn: {orderItem.productID.title}
                                        </Typography>
                                        <Typography variant='body2'>
                                          Antal: {orderItem.quantity}x
                                        </Typography>
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
                                    {order.deliveryAddress.firstName}{' '}
                                    {order.deliveryAddress.lastName}
                                  </Typography>
                                  <Typography variant='body2'>
                                    {order.deliveryAddress.address}
                                  </Typography>
                                  <Typography variant='body2'>
                                    {order.deliveryAddress.zipCode} {order.deliveryAddress.city}
                                  </Typography>
                                  <Typography variant='body2'>
                                    {order.deliveryAddress.phoneNumber}
                                  </Typography>
                                  <Typography variant='h5' sx={{ marginTop: '0.5rem' }}>
                                    Summa
                                  </Typography>
                                  <Typography variant='body2'>{order.totalPrice} kr</Typography>
                                </Box>
                              </CardContent>
                            </Card>
                          </AccordionDetails>
                        </Accordion>
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              ))
              .reverse()}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
