import { Box, Typography } from "@mui/material";
import { theme } from "../theme";

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.secondary.main,

        color: "white",
        width: "100%",
        display: "flex",

        padding: "1rem",
        bottom: 0,
      }}
    >
      <Box sx={{ paddingLeft: "1rem" }}>
        <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
          <p>Ski-Doo</p>
          <p>support@skidoo.se</p>
          <p>0611-550602</p>
        </Typography>
      </Box>
    </Box>
  );
}
