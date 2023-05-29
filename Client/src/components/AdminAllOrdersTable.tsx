import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useOrder } from '../contexts/OrderContext';

export default function AdminAllOrdersTable() {
  const { allOrders, updateOrderStatus } = useOrder();

  return (
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
              Order ID
            </TableCell>
            <TableCell align='center' sx={{ typography: 'h6', color: 'primary.main' }}>
              User ID
            </TableCell>
            <TableCell align='center' sx={{ typography: 'h6', color: 'primary.main' }}>
              Total kostnad
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
          {allOrders.map(order => (
            <TableRow
              key={order._id}
              sx={{
                '&:last-child td, &:last-child th': {},
              }}
              data-cy='order'
            >
              <TableCell align='center' data-cy='order-id'>
                {order._id}
              </TableCell>
              <TableCell align='center' data-cy='order-user-id'>
                {order.userID}
              </TableCell>
              <TableCell align='center' data-cy='order-total-price'>
                {order.totalPrice}
              </TableCell>
              <TableCell align='center' data-cy='order-shipped'>
                {order.isShipped ? 'Yes' : 'No'}
              </TableCell>
              <TableCell align='center'>
                <Button
                  variant='contained'
                  color='primary'
                  disabled={order.isShipped}
                  onClick={() => {
                    updateOrderStatus(order._id);
                  }}
                  sx={{
                    width: '60%',
                    fontSize: '0.8rem',
                    mb: '0.5rem',
                    mt: '0.5rem'
                  }}
                >
                  Ändra status
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
