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
        // height: '78.4vh',
        alignItems: 'center',
        justifyContent: 'center',
        padding: matches ? '5rem' : '0rem',
        backgroundColor: 'secondary.main',
        [theme.breakpoints.down('md')]: {
          flexDirection: 'colum',
          color: 'black',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'colum',
          maxWidth: '35rem',
          height: '30rem',
          marginBottom: '3rem',
        }}
      >
        <img src={'/api/image/' + product.imageID} alt={product.title}></img>
      </Box>

      <Card
        sx={{
          display: 'flex',
          flexDirection: 'colum',
          maxWidth: '40rem',
          height: '30rem',
          marginBottom: '3rem',
        }}
        variant='outlined'
      >
        <InfoCard />
      </Card>
    </Box>
  );
}
