import { ClassNames } from "@emotion/react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { palette, spacing } from "@mui/system";


function Popup(props) {
  const { title, children, openPopup, setOpenPopup } = props;

  return (
    <Dialog
      open={openPopup}
      maxWidth="md"
      sx={{ padding:2, position:"absolute" , top: spacing(5) }}
    >
      <DialogTitle>
        <div style={{display: 'flex'}}>
          <Typography variant="h6" component="div" style={{flexGrow:1}} color="primary">
            {title}
          </Typography>
          <IconButton color="error" onClick={() => {setOpenPopup(false)}}> 
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}

export default Popup;
