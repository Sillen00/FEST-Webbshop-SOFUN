import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./header";
import { theme } from "./theme";
import { ThemeProvider } from "@mui/material/styles";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{height: '100%'}}>
        <header>
          <Header />
        </header>
        <main>
          <Outlet />
        </main>
        <footer><Footer /></footer>
      </Box>
    </ThemeProvider>
  );
}
