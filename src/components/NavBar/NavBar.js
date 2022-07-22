import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { Avatar, Grid, Stack, Tooltip } from "@mui/material";
import LeftComponent from "./Left";
import RightWihoutAuth from "./RightWithoutAuth";
import RightWithAuth from "./RightWithAuth";
import { useAuth } from "../../hooks/useAuth";


const NavBar = () => {
  const { user } = useAuth();
  return (
    <AppBar
      position="sticky"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Grid container  direction="column" >
        <Toolbar disableGutters >
          <Stack direction="row" color="inherit" marginLeft={2}>
            <Avatar
              src="/favicon.ico"
              alt="Remy Sharp"
              sx={{
                width: 30,
                height: 30,
                marginRight: "10px",
                display: { md: "flex" },
              }}
            />
            <Typography
              variant="h6"
              noWrap
              sx={{
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 500,
                letterSpacing: ".2rem",
                color: "#fff",
                textDecoration: "none",
              }}
            >
              Synchro
            </Typography>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 4,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 500,
                letterSpacing: ".2rem",
                color: "#FF5F1F",
                textDecoration: "none",
              }}
            >
              NUS
            </Typography>
          </Stack>
          <Grid container direction="row" justifyContent="space-between">
            <Grid item>
              <LeftComponent />
            </Grid>
            <Grid item>{user ? <RightWithAuth />  : <RightWihoutAuth  />}</Grid>
          </Grid>
        </Toolbar>
      </Grid>
    </AppBar>
  );
};
export default NavBar;
