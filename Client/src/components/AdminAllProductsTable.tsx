import * as Icon from '@mui/icons-material';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useProduct } from '../contexts/ProductContext';
import { theme } from '../theme';
import DeleteDialog from './Dialog';

export default function AdminAllProductsTable() {
  const navigate = useNavigate();

  const { product } = useProduct();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
              Bild
            </TableCell>
            {!isSmallScreen ? (
              <TableCell align='center' sx={{ typography: 'h6', color: 'primary.main' }}>
                ID
              </TableCell>
            ) : null}
            <TableCell align='center' sx={{ typography: 'h6', color: 'primary.main' }}>
              Titel
            </TableCell>
            <TableCell align='center' sx={{ typography: 'h6', color: 'primary.main' }}>
              Pris
            </TableCell>
            <TableCell align='center'></TableCell>
            <TableCell align='center'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {product.map(product => (
            <TableRow
              key={product._id}
              sx={{
                '&:last-child td': {}, // style last row
              }}
              data-cy='product'
            >
              <TableCell component='th' scope='row'>
                <img
                  src={'/api/image/' + product.imageID}
                  alt={product.title}
                  style={{
                    maxWidth: '6rem',
                  }}
                />
              </TableCell>
              {!isSmallScreen ? (
                <TableCell align='center' data-cy='product-id'>
                  {product._id}
                </TableCell>
              ) : null}
              <TableCell align='center' data-cy='product-title'>
                {product.title}
              </TableCell>
              <TableCell align='center' data-cy='product-price'>
                {product.price}
              </TableCell>
              {/* <TableCell align='center' sx={{ width: '6%' }}> */}
              <TableCell align='center'>
                <DeleteDialog {...product} />
              </TableCell>
              <TableCell align='center'>
                <Button
                  sx={{ color: 'secondary.contrastText' }}
                  onClick={() => {
                    navigate('/admin/product/' + product._id);
                  }}
                  data-cy='admin-edit-product'
                >
                  <Icon.ModeEdit sx={{ color: 'secondary.contrastText' }} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

