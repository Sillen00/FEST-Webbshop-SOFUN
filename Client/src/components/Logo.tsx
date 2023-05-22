import { createTheme, ThemeProvider, Typography } from '@mui/material';

const theme = createTheme();

export default function Logo() {
  const styledLogo = {
    color: '#2b2929',
    letterSpacing: '0.25em',
    fontSize: '2rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '3rem',
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <Typography variant='h3' sx={styledLogo}>
        SO-FUN
      </Typography>
    </ThemeProvider>
  );
}
