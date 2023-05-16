import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import CheckoutForm from "../components/CheckoutForm";
import BasicTable from "../components/table";
import { useCart } from "../contexts/CartContext";

export default function Checkout() {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { cart } = useCart();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "1rem",
        marginTop: "1rem",
        marginBottom: "1rem",
      }}
    >
      <Typography variant="h4">Kassa </Typography>
      {cart.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: isMediumScreen ? "column" : "row",
            gap: "1rem",
          }}
        >
          <BasicTable />
          <CheckoutForm />
        </Box>
      ) : (
        <Typography variant="h5" sx={{ padding: "3rem" }}>
          Du har inte lagt till något i kassan ännu.
        </Typography>
      )}
    </Box>
  );
}
