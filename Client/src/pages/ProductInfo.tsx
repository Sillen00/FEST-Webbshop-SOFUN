import { Box, Card, useMediaQuery } from '@mui/material';
import InfoCard from '../components/InfoCard';

export default function ProductInfo() {
  const matches = useMediaQuery('(min-width:1280px)');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        height: '78.4vh',
        alignItems: 'center',
        justifyContent: 'center',
        padding: matches ? '5rem' : '0rem',
        backgroundColor: 'secondary.main',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          maxWidth: '35rem',
          height: '30rem',
          backgroundColor: 'black',
          marginBottom: '3rem',
        }}
      >
        <InfoCard />
      </Box>
      <Card
        sx={{
          display: 'flex',
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
