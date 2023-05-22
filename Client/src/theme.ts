import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FFFFFF',
      // light: 'rgb(236, 243, 244)',
      // dark: 'rgb(162, 168, 169)',
      contrastText: '#090809',
    },
    secondary: {
      main: '#F5F5F5',
      // light: 'rgb(66, 83, 99)',
      dark: '#000000',
      contrastText: '#090809',
    },
    background: {
      paper: '#00000',
      default: '#090809',
    },
    info: {
      main: '#1B98E0',
      dark: 'rgb(18, 106, 156)',
    },
    error: {
      main: '#d32f2f',
      dark: '#c62828',
    },
    success: {
      main: '#2e7d32',
      dark: '#1b5e20',
    },
  },
  typography: {
    fontFamily: ['Ariata Display'].join(','),
    h5: {
      fontWeight: 300,
      fontFamily: 'Ariata Display',
    },
    h4: {
      fontFamily: 'Ariata Display',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 100,
      fontFamily: 'Ariata Display',
    },
    body2: {
      fontSize: '1.2rem',
      fontWeight: 100,
      fontFamily: 'Ariata Display',
    },
  },
});
