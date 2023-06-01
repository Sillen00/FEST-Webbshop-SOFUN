import { Box, Typography } from '@mui/material';
import { theme } from '../theme';

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.secondary.contrastText,

        color: 'white',
        width: '100%',
        display: 'flex',

        padding: '1rem',
        bottom: 0,
      }}
    >
      <Box sx={{ paddingLeft: '1rem' }}>
        <Typography variant='h6'>
          <p>SO-FUN</p>
          <p>support@sofun.se</p>
          <p>031-334375</p>
        </Typography>
      </Box>
    </Box>
  );
}
