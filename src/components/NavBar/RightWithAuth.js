import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import { ButtonBase } from "@mui/material";
import { useAuth, db } from "../../hooks/useAuth";
import AccountInfo from "../../hooks/AccountInfo";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TimerIcon from "@mui/icons-material/Timer";
import GroupsIcon from "@mui/icons-material/Groups";

export default function RightWithAuth() {
  const { signout } = useAuth();
  const { name, avatar } = AccountInfo();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    handleClose();
    signout();
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          marginRight: 2,
        }}
      >
        <Tooltip title="Account settings">
          <Button
            color="inherit"
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            endIcon={<KeyboardArrowDownIcon />}
          >
            <Avatar
              sx={{ width: 32, height: 32, marginRight: 1 }}
              src={avatar}
            ></Avatar>
            {name}
          </Button>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem component={ButtonBase} href="/dashboard">
          <ListItemIcon>
            <DashboardIcon fontSize="small" />
          </ListItemIcon>
          Dashboard
        </MenuItem>
        <MenuItem component={ButtonBase} href="/meeting">
          <ListItemIcon>
            <GroupsIcon fontSize="small" />
          </ListItemIcon>
          Meeting
        </MenuItem>
        <MenuItem component={ButtonBase} href="/assignment">
          <ListItemIcon>
            <AssignmentIcon fontSize="small" />
          </ListItemIcon>
          Assignment
        </MenuItem>
        <MenuItem component={ButtonBase} href="/studytimer">
          <ListItemIcon>
            <TimerIcon fontSize="small" />
          </ListItemIcon>
          Study Timer
        </MenuItem>
        <MenuItem component={ButtonBase} href="/profile">
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem component={ButtonBase} href="/" onClick={handleLogout}>
          <ListItemIcon>
            <Logout color="error" fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
