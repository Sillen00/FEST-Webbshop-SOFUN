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
import { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { Product, useProduct } from '../contexts/ProductContext';

export default function CheckoutOrderTable() {
  const { cart, addProduct, removeProduct } = useCart();
  const totalCost = cart.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);

  const [isLowStockLevel, setIsLowStockLevel] = useState(false);

  const { products } = useProduct();

  // const cartProductId = cart.find(chosen => chosen.id === ) as Product;
  // const product = products.find(chosen => chosen._id === cartProductId) as Product;
  // products.forEach(product => {
  //   cart.forEach(cartProduct => {
  //     if (product?.stockLevel >= cartProduct.quantity) {
  //       setIsLowStockLevel(true);
  //     }
  //   });
  // });

  useEffect(() => {
    const checkStockLevel = () => {
      let lowStock = false;
      cart.forEach(cartProduct => {
        const product = products.find(chosen => chosen._id === cartProduct.id) as Product;
        if (product?.stockLevel < cartProduct.quantity) {
          lowStock = true;
          return;
        }
      });
      setIsLowStockLevel(lowStock);
    };

    checkStockLevel();
  }, [cart, products]);

  return (
    <>
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
              <TableCell align='center' sx={{ typography: 'h5', color: 'primary.main' }}>
                Produkter
              </TableCell>
              <TableCell align='center' sx={{ typography: 'h5', color: 'primary.main' }}>
                Modell
              </TableCell>
              <TableCell align='center'></TableCell>
              <TableCell align='center' sx={{ typography: 'h5', color: 'primary.main' }}>
                Antal
              </TableCell>
              <TableCell align='center'></TableCell>
              <TableCell align='center' sx={{ typography: 'h5', color: 'primary.main' }}>
                Pris
              </TableCell>
              <TableCell align='center' sx={{ typography: 'h5', color: 'primary.main' }}>
                InStock
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map(cartProduct => {
              // const productId = cartProduct.id; // Add this line

              const product = products.find(chosen => chosen._id === cartProduct.id) as Product;

              return (
                <TableRow
                  key={cartProduct.id}
                  sx={{
                    '&:last-child td, &:last-child th': {},
                  }}
                  data-cy='cart-item'
                >
                  <TableCell component='th' scope='row' sx={{}}>
                    <Avatar
                      alt={cartProduct.title}
                      src={'/api/image/' + cartProduct.imageID}
                      sx={{
                        width: 'auto',
                        height: 'auto',
                        maxHeight: '15rem',
                      }}
                      variant='rounded'
                    />
                  </TableCell>
                  <TableCell align='center' data-cy='product-title' sx={{ width: '20%' }}>
                    {cartProduct.title}
                  </TableCell>
                  <TableCell align='center' sx={{ color: 'secondary.contrastText' }}>
                    <IconButton
                      aria-label='remove'
                      onClick={() => removeProduct(cartProduct)}
                      data-cy='decrease-quantity-button'
                    >
                      <Icon.RemoveCircleOutline />
                    </IconButton>
                  </TableCell>
                  <TableCell align='center' sx={{}}>
                    <Input
                      value={cartProduct.quantity}
                      data-cy='product-quantity'
                      sx={{ width: '1.2rem' }}
                    />
                  </TableCell>
                  <TableCell align='center' sx={{ color: 'secondary.contrastText' }}>
                    <IconButton
                      aria-label='add'
                      onClick={() => addProduct(cartProduct)}
                      data-cy='increase-quantity-button'
                    >
                      <Icon.AddCircleOutline />
                    </IconButton>
                  </TableCell>
                  <TableCell align='center' data-cy='product-price' sx={{ width: '8rem' }}>
                    {cartProduct.quantity * cartProduct.price}
                  </TableCell>
                  <TableCell align='center' sx={{ color: 'secondary.contrastText' }}>
                    {product?.stockLevel >= cartProduct.quantity ? <Icon.Check /> : <Icon.Close />}
                  </TableCell>
                </TableRow>
              );
            })}

            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align='right' data-cy='total-price' colSpan={6} sx={{ padding: '1rem' }}>
                <Typography variant='h6'>
                  Totalt: {totalCost.toLocaleString('sv-SE')} SEK
                </Typography>
                {isLowStockLevel ? (
                  <Typography variant='h6' color='error.main'>
                    Ordern kan ta lägre tid att skicka pågrund av låg lagernivå.
                  </Typography>
                ) : null}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
