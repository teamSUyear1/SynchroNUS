import React from "react";
import { IconButton } from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";

const TimeConfigUI = (props) => {
  return (
    <React.Fragment>
      <h3 style={{color: "white"}}>{props.title}</h3>
      <IconButton onClick={() => props.changeTime(-30, props.type)}>
        <IndeterminateCheckBoxOutlinedIcon color="primary" />
      </IconButton>
      <h3 style={{color: "white"}}>{props.formatTime(props.time)}</h3>
      <IconButton onClick={() => props.changeTime(30, props.type)}>
        <AddBoxOutlinedIcon color="primary" />
      </IconButton>
    </React.Fragment>
  );
};

export default TimeConfigUI;
