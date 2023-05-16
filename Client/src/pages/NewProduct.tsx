import { Box, Typography } from "@mui/material";
import AdminForm, { defaultValues } from "../components/AdminForm";
import { Product } from "../data";

export default function EditProduct() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "1rem",
        marginBottom: "1rem",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
        Lägg till en ny produkt
      </Typography>

      <Box sx={{ display: "flex", gap: "1rem" }}>
        <AdminForm product={defaultValues as Product} isNewProduct={true} />
      </Box>
    </Box>
  );
}
