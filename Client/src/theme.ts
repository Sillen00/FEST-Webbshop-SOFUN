import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FFFFFF',
      contrastText: '#090809',
    },
    secondary: {
      main: '#fffaf5',
      contrastText: '#090809',
    },
    info: {
      main: '#1B98E0',
      dark: 'rgb(18, 106, 156)',
    },
    error: {
      main: '#d32f2f',
      dark: '#c62828',
    },
  },
  typography: {
    fontFamily: ['Ariata Display'].join(','),
    h4: {
      fontWeight: 600,
      fontFamily: 'Ariata Display',
      fontSize: '18px',
    },
    h5: {
      fontFamily: 'Ariata Display',
      fontWeight: 100,
      fontSize: '16px',
    },
  },
});
