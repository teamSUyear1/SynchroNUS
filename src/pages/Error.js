import { Grid, Typography } from "@mui/material";
import React from "react";

export default function Error() {
  return (
    <Grid container minHeight="80vh">
    <Grid item xs={12}alignItems={'center'}>
      <Typography variant="h6" color="inherit">
        The page you are looking doesn't exist
      </Typography>
      </Grid>
    </Grid>
  );
}
