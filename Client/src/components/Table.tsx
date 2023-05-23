import * as Icon from '@mui/icons-material';

import {
  Avatar,
  IconButton,
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useCart } from '../contexts/CartContext';

export default function BasicTable() {
  const { cart, addProduct, removeProduct } = useCart();
  const totalCost = cart.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);

  return (
    <TableContainer
      component={Paper}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Table
        sx={{ minWidth: 330, maxWidth: 1000 }}
        aria-label='simple table'
        size='small'
        padding='none'
      >
        <TableHead>
          <TableRow
            sx={{
              bgcolor: 'secondary.contrastText',
            }}
          >
            <TableCell align='center' sx={{ typography: 'h6', color: 'primary.main' }}>
              Produkter
            </TableCell>
            <TableCell align='center' sx={{ typography: 'h6', color: 'primary.main' }}>
              Modell
            </TableCell>
            <TableCell align='center'></TableCell>
            <TableCell align='center' sx={{ typography: 'h6', color: 'primary.main' }}>
              Antal
            </TableCell>
            <TableCell align='center'></TableCell>
            <TableCell align='center' sx={{ typography: 'h6', color: 'primary.main' }}>
              Pris
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.map(product => (
            <TableRow
              key={product.id}
              sx={{
                '&:last-child td, &:last-child th': {},
              }}
              data-cy='cart-item'
            >
              <TableCell component='th' scope='row' sx={{ width: '40%' }}>
                <Avatar
                  alt={product.title}
                  src={product.image}
                  sx={{
                    width: 'auto',
                    height: 'auto',
                    maxHeight: '15rem',
                  }}
                  variant='rounded'
                />
              </TableCell>
              <TableCell align='center' data-cy='product-title' sx={{ width: '10%' }}>
                {product.title}
              </TableCell>
              <TableCell align='center' sx={{ width: '10%', color: 'secondary.contrastText' }}>
                <IconButton
                  aria-label='remove'
                  onClick={() => removeProduct(product)}
                  data-cy='decrease-quantity-button'
                >
                  <Icon.RemoveCircleOutline />
                </IconButton>
              </TableCell>
              <TableCell align='center' sx={{ width: '10%' }}>
                <Input
                  value={product.quantity}
                  data-cy='product-quantity'
                  sx={{ width: '1.2rem' }}
                />
              </TableCell>
              <TableCell align='center' sx={{ width: '10%', color: 'secondary.contrastText' }}>
                <IconButton
                  aria-label='add'
                  onClick={() => addProduct(product)}
                  data-cy='increase-quantity-button'
                >
                  <Icon.AddCircleOutline />
                </IconButton>
              </TableCell>
              <TableCell align='center' data-cy='product-price' sx={{ width: '8rem' }}>
                {product.quantity * product.price}
              </TableCell>
            </TableRow>
          ))}

          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell align='right' data-cy='total-price' colSpan={6} sx={{ padding: '1rem' }}>
              <Typography variant='h6'>Totalt: {totalCost.toLocaleString('sv-SE')} SEK</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
