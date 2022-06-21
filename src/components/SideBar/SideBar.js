import React from "react";
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
import { Avatar } from "@mui/material";
import { useAuth, db } from "../../hooks/useAuth";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TimerIcon from "@mui/icons-material/Timer";
import GroupsIcon from "@mui/icons-material/Groups";
import AccountInfo from "../../hooks/AccountInfo";

function SideBar(props) {
  const { signout } = useAuth();
  const {avatar} = AccountInfo();
  const select = props.select;

  const handleLogout = () => {
    signout();
  };


  const drawerWidth = 240;
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "flex" },
        width: drawerWidth,
        flexShrink:0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Box justifyContent={"center"} display="flex" padding={3}>
        <Avatar src={avatar} sx={{ width: 56, height: 56 }} />
      </Box>
      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              component={ButtonBase}
              href="/dashboard"
              selected={select === 1}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider variant="middle">Events</Divider>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              component={ButtonBase}
              href="/meeting"
              selected={select === 2}
            >
              <ListItemIcon>
                <GroupsIcon />
              </ListItemIcon>
              <ListItemText primary="Meeting" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={ButtonBase}
              href="/assignment"
              selected={select === 3}
            >
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Assignment" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={ButtonBase}
              href="/studytimer"
              selected={select === 4}
            >
              <ListItemIcon>
                <TimerIcon />
              </ListItemIcon>
              <ListItemText primary="Study Timer" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider variant="middle"> Account</Divider>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              component={ButtonBase}
              href="/profile"
              selected={select === 5}
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={ButtonBase}
              href="/"
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
