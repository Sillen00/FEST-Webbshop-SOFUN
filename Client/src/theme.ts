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
    error: {
      main: '#d32f2f',
      dark: '#c62828',
    },
  },
  typography: {
    fontFamily: ['Ariata Display'].join(','),
    h3: {
      fontWeight: 100,
      fontFamily: 'Ariata Display',
      fontSize: '26px',
    },
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
