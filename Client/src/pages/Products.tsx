import { Box, Button, Card, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import Snackbar from "../components/Snackbar";
import { useCart } from "../contexts/CartContext";
import { useProduct } from "../contexts/ProductContext";
import { CartItem } from "../data";

export default function Products() {
  const { product } = useProduct();
  const { addProduct } = useCart();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState<
    | {
        title: string;
        price: number;
        image: string;
      }
    | undefined
  >(undefined);

  const handleSnackbarClose = (
    event: React.SyntheticEvent<Element, Event> | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const matches = useMediaQuery("(min-width:500px)");
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        backgroundColor: "background.default",
        "& a": {
          color: "black",
          textDecoration: "none",
        },
      }}
    >
      {product.map((product) => (
        <Card
          key={product.id}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "1rem",
            padding: "2rem",
            maxHeight: matches ? "29.6rem" : "none",
            justifyContent: "center",
            height: "100%",
            width: matches ? "22rem" : "100%",
          }}
          data-cy="product"
        >
          <Link to={"/product/" + product.id}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "5rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "250px",
                  height: "150px",
                  overflow: "hidden",
                }}
              >
                <img src={product.image} alt={product.title} width="100%" />
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                marginTop: "2rem",
              }}
            >
              <Box sx={{ paddingTop: "0.2rem" }}>
                <Typography variant="subtitle2">2024</Typography>
              </Box>
              <Box>
                <Typography variant="h5" data-cy="product-title">
                  {product.title}
                </Typography>
              </Box>
              <Box
                sx={{
                  marginBottom: "0.5rem",
                }}
              >
                <Typography variant="subtitle2" data-cy="product-price">
                  Pris {product.price} kr
                </Typography>
              </Box>
              <Box
                sx={{
                  maxWidth: "30rem",
                  height: "12rem",
                }}
              >
                <Typography variant="body1" data-cy="product-description">
                  {product.description}
                </Typography>
              </Box>
            </Box>
          </Link>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "0.5rem",
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              sx={{
                backgroundColor: "secondary.main",
                color: "secondary.contrastText",
                "&:hover": {
                  backgroundColor: "secondary.light",
                },
              }}
              data-cy="product-buy-button"
              onClick={() => {
                addProduct(product as CartItem);
                setSnackbarOpen(true);
                setLastAddedProduct({
                  title: product.title,
                  price: product.price,
                  image: product.image,
                });
              }}
            >
              Lägg till i kundvagnen
            </Button>
          </Box>
        </Card>
      ))}
      <Snackbar
        data-cy="added-to-cart-toast"
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        lastAddedProduct={lastAddedProduct}
      />
    </Box>
  );
}
