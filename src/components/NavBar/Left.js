import React from "react";
import Box from "@mui/system/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Avatar } from "@mui/material";

function LeftComponent() {
  return (
    <Box>
      <Tooltip title="Home">
        <IconButton href="/">
          <HomeIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="NUSMod">
        <IconButton href="https://nusmods.com/">
          <Avatar src="/NUSMod.png" sx={{ width: 25, height: 25 }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Dashboard">
        <IconButton href="/dashboard">
          <DashboardIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default LeftComponent;
