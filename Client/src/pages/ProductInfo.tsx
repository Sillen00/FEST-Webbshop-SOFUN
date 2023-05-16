import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Snackbar from "../components/Snackbar";
import { useCart } from "../contexts/CartContext";
import { useProduct } from "../contexts/ProductContext";
import { CartItem } from "../data";

export default function ProductInfo() {
  const params = useParams();

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

  const backgroundImage =
    "https://www.ski-doo.com/content/dam/global/en/ski-doo/my22/images/models/Ski-Doo-Model-Essential-Background.jpg";

  const selectedProduct = product.find((product) => product.id === params.id);

  const card = (
    <React.Fragment>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0.5rem 0.8rem",
            }}
          >
            <Avatar
              src={selectedProduct?.image}
              alt="avatar"
              sx={{
                width: "10rem",
                height: "5rem",
                padding: "0.5rem",
              }}
            />
            <Box sx={{ padding: "1.2rem" }}>
              <Typography data-cy="product-title" variant="h4">
                {selectedProduct?.title}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0.5rem 1rem",
              fontSize: "60px",
            }}
          >
            <Typography variant="h5">2024</Typography>
            <Typography data-cy="product-price" variant="h5">
              {selectedProduct?.price}
              <span>SEK</span>
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            padding: "0.8rem",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <Typography variant="body2" data-cy="product-description">
            {selectedProduct?.description}
          </Typography>
        </Box>
      </CardContent>
    </React.Fragment>
  );

  if (!selectedProduct) {
    return <h1>Product not found</h1>;
  }

  const matches = useMediaQuery("(min-width:1280px)");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundImage: `url(${backgroundImage})`,
        backgroundPositionY: "15%",
        backgroundRepeat: "no-repeat",
        height: "78.4vh",
        alignItems: "flex-end",
        justifyContent: "center",
        padding: matches ? "0.5rem" : "0rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          maxWidth: "40rem",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: "10",
            height: matches ? "22rem" : "26rem",
          }}
          variant="outlined"
        >
          {card}

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginLeft: "auto",
              width: "100%",
              paddingBottom: matches ? "auto" : "1rem",
            }}
          >
            <Tooltip title="Lägg till i kundvagnen">
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  width: "4.5rem",
                  margin: "0 0.8rem 0.8rem 0",
                }}
                data-cy="product-buy-button"
                onClick={() => {
                  addProduct(selectedProduct as CartItem);
                  setSnackbarOpen(true);
                  setLastAddedProduct({
                    title: selectedProduct.title,
                    price: selectedProduct.price,
                    image: selectedProduct.image,
                  });
                }}
              >
                <AddShoppingCartIcon />
              </Button>
            </Tooltip>
          </Box>
        </Card>
        <Box
          sx={{
            position: "absolute",
            left: "10%",
            width: "50%",
            height: "50%",
            backgroundImage: matches
              ? `url(${selectedProduct?.background})`
              : "none",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            // zIndex: "200",
          }}
        >
          <Snackbar
            open={snackbarOpen}
            handleClose={handleSnackbarClose}
            lastAddedProduct={lastAddedProduct}
          />
        </Box>
      </Box>
    </Box>
  );
}
