import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#E8F1F2",
      light: "rgb(236, 243, 244)",
      dark: "rgb(162, 168, 169)",
      contrastText: "#090809",
    },
    secondary: {
      main: "#13293D",
      light: "rgb(66, 83, 99)",
      dark: "rgb(13, 28, 42)",
      contrastText: "#ffffff",
    },
    background: {
      paper: "#f5f5f5",
      default: "#FFFFFF",
    },
    info: {
      main: "#1B98E0",
      dark: "rgb(18, 106, 156)",
    },
    error: {
      main: "#d32f2f",
      dark: "#c62828",
    },
    success: {
      main: "#2e7d32",
      dark: "#1b5e20",
    },
  },
  typography: {
    fontFamily: [
      "Oswald, sans-serif",
      "Roboto",
    ].join(","),
    h5: {
      fontWeight: 300,
      fontFamily: "Oswald",
    },
    h4: {
      fontFamily: "Oswald",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 100,
      fontFamily: "Roboto",
    },
    body2: {
      fontSize: "1.2rem",
      fontWeight: 100,
      fontFamily: "Roboto",
    },
  },
});
