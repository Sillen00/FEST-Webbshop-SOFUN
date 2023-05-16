import {
  Box,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useOrder } from "../contexts/OrderContext";
import { generateId } from "../data";

export default function OrderConfirmation() {
  const { order } = useOrder();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const totalCost = order.products.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#D9D9D9",
        margin: "auto",
      }}
    >
      <Typography variant="h4">Bokningsbekräftelse</Typography>

      <Box
        sx={{
          marginTop: "1rem",
          width: isSmallScreen ? "95%" : "30rem",
        }}
      >
        {order.products.map((product) => (
          <Card
            variant="outlined"
            data-cy="product"
            key={product.id}
            sx={{
              backgroundColor: "white",
              borderBottom: "1px solid black",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "1rem",
                  justifyContent: "center",
                  flex: "1",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", flex: "1" }}>
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: "8rem", height: "auto" }}
                  />
                </Box>
                <Box sx={{ display: "flex", flex: "1" }}>
                  <Typography variant="subtitle2" data-cy="product-title">
                    {product.title}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", flex: "1" }}>
                  <Typography variant="subtitle2">
                    {product.quantity}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", flex: "1" }}>
                  <Typography variant="subtitle2" data-cy="product-price">
                    {product.price} kr
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
        <Box>
          <Typography
            variant="h6"
            component="h6"
            sx={{
              height: "auto",
              fontWeight: "bold",
              backgroundColor: "white",
              padding: "0.2rem",
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                paddingRight: "1rem",
              }}
            >
              <p>Summa: {totalCost.toLocaleString("sv-SE")} kr </p>
            </Box>
          </Typography>
        </Box>
        <Box
          sx={{
            background: "white",
            margin: "0r 0 2rem 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "left",
            }}
          >
            <p>Tack för din beställning!</p>
            <p>Ditt ordernummer: {generateId()}</p>
          </Box>
          <Typography
            variant="h6"
            component="h6"
            sx={{
              height: "6vh",
              fontSize: "1rem",
              fontWeight: "bold",
              marginTop: "1rem",
              marginLeft: "2rem",
              textAlign: "left",
            }}
          >
            Din order levereras till följande adress
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <Typography variant="subtitle1" data-cy="customer-name">
              {order.customer.name}
            </Typography>
            <Typography variant="subtitle1">
              <span data-cy="customer-address">{order.customer.street},</span>
              <span data-cy="customer-zipcode">{order.customer.zipcode},</span>
              <span data-cy="customer-city"> {order.customer.city}</span>
            </Typography>
            <Typography variant="subtitle1" data-cy="customer-email">
              {order.customer.email}
            </Typography>
            <Typography variant="subtitle1" data-cy="customer-phone">
              {order.customer.phone}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
