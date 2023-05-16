import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { useState } from "react";
import { useProduct } from "../contexts/ProductContext";
import { Product } from "../data";

export default function DeleteDialog(props: Product) {
  const { removeProduct } = useProduct();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        data-cy="admin-remove-product"
        color="error"
        onClick={handleClickOpen}
      >
        Radera
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Du kan inte ångra dig efteråt om du tar bort produkten 😨
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Avbryt
          </Button>
          <Button
            color="error"
            data-cy="confirm-delete-button"
            onClick={() => {
              removeProduct(props);
              handleClose();
            }}
          >
            Radera
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
