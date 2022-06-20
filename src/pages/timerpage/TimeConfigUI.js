import { Fragment } from "react";
import { IconButton } from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import TextField from "@mui/material/TextField";

const TimeConfigUI = (props) => {
  return (
    <Fragment>
      <IconButton
        title="Minus 30 seconds"
        onClick={() => props.changeTime(-30, props.type)}
      >
        <IndeterminateCheckBoxOutlinedIcon color="primary" />
      </IconButton>
      <h3 style={{ color: "white", marginTop: "11px" }}>
        {props.formatTime(props.time)}
      </h3>
      <TextField id="outlined-number" label={props.title} defaultValue={props.formatTime(props.time)}/>
      <IconButton
        title="Add 30 seconds"
        onClick={() => props.changeTime(30, props.type)}
      >
        <AddBoxOutlinedIcon color="primary" />
      </IconButton>
    </Fragment>
  );
};

export default TimeConfigUI;
