import React, { useState } from "react";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ButtonBase from "@mui/material/ButtonBase";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar, ListItemAvatar } from "@mui/material";
import Dashboard from "../../pages/Dashboard";
import { useAuth } from "../../hooks/useAuth";

function SideBar() {
  const { user, signout } = useAuth();
  const [avatar, setAvatar] = React.useState("");
  const [name, setName] = React.useState("Loading ...");

  const handleLogout = () => {
    signout();
    alert(window.localStorage.getItem("user"))
  };

  React.useEffect(() => {
    if (user?.displayName) {
      setName(user.displayName);
    }
    if (user?.photoURL) {
      setAvatar(user.photoURL);
    }

  }, [user]);

  const drawerWidth = 240;
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Box justifyContent={"center"} display="flex" padding={3}>
        <Avatar src={avatar} sx={{ width: 56, height: 56 }}/>
      </Box>
      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton component={ButtonBase} href="/dashboard" >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={ButtonBase} href="/profile">
              <ListItemIcon >
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={ButtonBase}
              href="/login"
              onClick={handleLogout}
            >
              <ListItemIcon>
                <LogoutIcon color="error" />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}

export default SideBar;
