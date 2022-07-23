import React, { useState } from "react";
import Box from "@mui/system/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function LeftComponent(props) {
  const {darkMode, setDarkMode} = props
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  }

  function modeOnClick() {
    window.localStorage.setItem("darkMode", !darkMode)
    setDarkMode(!darkMode)
    
  }

  return (
    <Box>
      <Tooltip title="Home">
        <IconButton href="/" color="inherit">
          <HomeIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="NUSMod">
        <IconButton onClick={handleClickOpen}>
          <Avatar src="/NUSMod.png" sx={{ width: 25, height: 25 }} />
        </IconButton>
      </Tooltip>
      <Tooltip title={darkMode ? "Light" : "Dark"}>
      <IconButton onClick={modeOnClick } color="inherit">
        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle color={"inherit"}>{"Redirect to NUSMod?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <p>This will bring you to NUSMod website.</p>
            <p>Do you want to continue?</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button href="https://nusmods.com/">Continue</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default LeftComponent;
