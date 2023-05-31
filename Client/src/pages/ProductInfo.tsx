import { Box, Card, useMediaQuery } from '@mui/material';
import { useParams } from 'react-router-dom';
import InfoCard from '../components/InfoCard';
import { Product, useProduct } from '../contexts/ProductContext';
import { theme } from '../theme';

export default function ProductInfo() {
  const matches = useMediaQuery('(min-width:1280px)');
  const params = useParams();
  const { products } = useProduct();
  const selectedProduct = products.find((product: Product) => product._id === params.id) as Product;
  const product = products.find(chosen => chosen._id === params.id) as Product;
  if (!selectedProduct) {
    return <h1>Product not found</h1>;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: matches ? '5rem' : '0rem',
        backgroundColor: 'secondary.main',
        marginBottom: '3rem',
        [theme.breakpoints.down('md')]: {
          flexDirection: 'column',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          maxWidth: '40rem',
          height: '30rem',
          [theme.breakpoints.down('md')]: {
            height: '40rem',
          },
          [theme.breakpoints.down('sm')]: {
            height: '30rem',
          },
        }}
      >
        <img src={'/api/image/' + product.imageID} alt={product.title} width={'100%'}></img>
      </Box>

      <Card
        sx={{
          display: 'flex',
          justifyContent: 'center',
          maxWidth: '40rem',
          height: '30rem',
        }}
        variant='outlined'
      >
        <InfoCard />
      </Card>
    </Box>
  );
}
