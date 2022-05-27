import React from "react";
import Box from "@mui/system/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function LeftComponent() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Tooltip title="Home">
        <IconButton href="/">
          <HomeIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="NUSMod">
        <IconButton onClick={handleClickOpen}>
          <Avatar src="/NUSMod.png" sx={{ width: 25, height: 25 }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Dashboard">
        <IconButton href="/dashboard">
          <DashboardIcon />
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
          <Button  href="https://nusmods.com/" >Continue</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default LeftComponent;
