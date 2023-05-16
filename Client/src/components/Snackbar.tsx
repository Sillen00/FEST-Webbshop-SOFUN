import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Snackbar as MuiSnackbar,
  Typography,
} from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

interface SnackbarProps {
  open: boolean;
  handleClose: (
    event: React.SyntheticEvent<Element, Event> | Event,
    reason?: string
  ) => void;
  lastAddedProduct?: {
    title: string;
    price: number;
    image: string;
  };
}

export default function Snackbar({
  open,
  handleClose,
  lastAddedProduct,
}: SnackbarProps) {
  return (
    <>
      <MuiSnackbar
        data-cy="added-to-cart-toast"
        open={open}
        onClose={handleClose}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        {lastAddedProduct && (
          <Paper
            elevation={4}
            sx={{
              backgroundColor: "primary",
              borderColor: "grey.300",
              borderWidth: 1,
              borderStyle: "solid",
              width: "18rem",
              padding: "1rem",
              borderRadius: "3px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            }}
          >
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              sx={{ position: "absolute", top: 0, right: 0 }}
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem",
              }}
            >
              <CheckCircleIcon
                sx={{ color: "green", fontSize: "1rem", marginRight: "0.5rem" }}
              />
              <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
                Har lagts till i kundvagnen
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                marginBottom: "1rem",
              }}
            >
              <Box sx={{ marginRight: "1rem" }}>
                <img
                  src={lastAddedProduct.image}
                  alt="product"
                  style={{
                    width: "70px",
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                }}
              >
                <Typography variant="subtitle1">
                  {lastAddedProduct.title}
                </Typography>
                <Typography variant="subtitle1">
                  {lastAddedProduct.price.toLocaleString("sv-SE")} SEK
                </Typography>
              </Box>
            </Box>
            <NavLink to="./checkout">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "secondary.main",
                  color: "secondary.contrastText",
                  "&:hover": {
                    backgroundColor: "secondary.light",
                  },
                  alignSelf: "flex-end",
                }}
              >
                Gå till kassan
              </Button>
            </NavLink>
          </Paper>
        )}
      </MuiSnackbar>
    </>
  );
}
