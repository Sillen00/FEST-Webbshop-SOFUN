import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Avatar, IconButton, Input, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useCart } from "../contexts/CartContext";
export default function BasicTable() {
  const { cart, addProduct, removeProduct } = useCart();
  const totalCost = cart.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);

  return (
    <TableContainer
      component={Paper}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Table
        sx={{ minWidth: 330, maxWidth: 1000 }}
        aria-label="simple table"
        size="small"
        padding="none"
      >
        <TableHead>
          <TableRow
            sx={{
              bgcolor: "secondary.main",
            }}
          >
            <TableCell align="center" sx={{ typography: "h6", color: "secondary.contrastText" }}>
              Produkter
            </TableCell>
            <TableCell align="center" sx={{ typography: "h6", color: "secondary.contrastText" }}>
              Modell
            </TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center" sx={{ typography: "h6", color: "secondary.contrastText" }}>
              Antal
            </TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center" sx={{ typography: "h6", color: "secondary.contrastText" }}>
              Pris
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.map((product) => (
            <TableRow
              key={product.id}
              sx={{
                "&:last-child td, &:last-child th": {},
              }}
              data-cy="cart-item"
            >
              <TableCell component="th" scope="row" sx={{ width: "40%" }}>
                <Avatar
                  alt={product.title}
                  src={product.image}
                  sx={{
                    width: "auto",
                    height: "auto",
                    maxHeight: "15rem",
                  }}
                  variant="rounded"
                />
              </TableCell>
              <TableCell
                align="center"
                data-cy="product-title"
                sx={{ width: "10%" }}
              >
                {product.title}
              </TableCell>
              <TableCell align="center" sx={{ width: "10%" }}>
                <IconButton
                  aria-label="remove"
                  color="secondary"
                  onClick={() => removeProduct(product)}
                  data-cy="decrease-quantity-button"
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
              </TableCell>
              <TableCell align="center" sx={{ width: "10%" }}>
                <Input
                  value={product.quantity}
                  data-cy="product-quantity"
                  sx={{ width: "1.2rem" }}
                />
              </TableCell>
              <TableCell align="center" sx={{ width: "10%" }}>
                <IconButton
                  aria-label="add"
                  color="secondary"
                  onClick={() => addProduct(product)}
                  data-cy="increase-quantity-button"
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              </TableCell>
              <TableCell
                align="center"
                data-cy="product-price"
                sx={{ width: "8rem" }}
              >
                {product.quantity * product.price}
              </TableCell>
            </TableRow>
          ))}

          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell
              align="right"
              data-cy="total-price"
              colSpan={6}
              sx={{ padding: "1rem" }}
            >
              <Typography variant="h6">
                Totalt: {totalCost.toLocaleString("sv-SE")} SEK
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
