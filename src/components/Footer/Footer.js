import { AppBar, Button, Divider, Stack, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import React from "react";

function Footer() {
  return (
    <AppBar
      position="sticky"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Stack
        divider={<Divider orientation="horizontal" flexItem />}
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          direction="row"
          margin={3}
          spacing={3}
          divider={<Divider orientation="vertical" flexItem />}
          justifyContent="center"
        >
          <Button startIcon={<HomeIcon />} color="inherit" href="/">
            About
          </Button>
          <Button
            startIcon={<GitHubIcon />}
            color="inherit"
            href="https://github.com/teamSUyear1/SynchroNUS-website"
          >
            Github
          </Button>
          <Button
            startIcon={<ArticleIcon />}
            color="inherit"
            href="https://teamsuyear1.github.io/"
          >
            Documentation
          </Button>
        </Stack>
        <Typography color="inherit" margin={2}>
          Powered by teamSUyear1
        </Typography>
      </Stack>
    </AppBar>
  );
}

export default Footer;
