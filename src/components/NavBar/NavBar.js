import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import HomeIcon from "@mui/icons-material/Home";
import { Avatar, Grid, Stack, Tooltip } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";

const NavBar2 = () => {
  return (
    <AppBar position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Grid marginLeft={2} direction="column">
        <Toolbar disableGutters>
          <Stack direction="row">
            <Avatar
              src="/favicon.ico"
              alt="Remy Sharp"
              sx={{
                width: 30,
                height: 30,
                marginRight: "10px",
                display: { xs: "none", md: "flex" },
              }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 500,
                letterSpacing: ".2rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              SynchroNUS
            </Typography>
          </Stack>
          <Grid container direction="row" justifyContent="space-between">
            <Box>
              <Tooltip title="Home">
                <IconButton href="/">
                  <HomeIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Link">
                <IconButton href="https://nusmods.com/">
                  <InsertLinkIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Dashboard">
                <IconButton href="/dashboard">
                  <DashboardIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Stack direction="row" spacing={1}>
              <Button color="inherit" href="/Login">
                Login
              </Button>
              <Button variant="outlined" href="/SignUp" color="inherit">
                Sign Up
              </Button>
            </Stack>
          </Grid>
        </Toolbar>
      </Grid>
    </AppBar>
  );
};
export default NavBar2;
