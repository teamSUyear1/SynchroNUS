import { Fragment } from "react";
import { IconButton, Typography, Button, Grid } from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

const TimeConfigUI = (props) => {
  const onTimeChangeHandler = (event) => {
    props.timeSet(event.target.valueAsNumber * 60);
  };

  return (
    <Fragment>
      <Card variant="outlined" sx={{ minWidth: 200, mr: "20px" }}>
        {/* 
          <CardContent sx={{ display: "flex", direction: "column" }}>
          UI for click to add time buttons

          <IconButton
            title="Minus 30 seconds"
            onClick={() => props.changeTime(-30, props.type)}
          >
            <IndeterminateCheckBoxOutlinedIcon color="primary" />
          </IconButton>
          <h3 style={{ color: "white", marginTop: "11px" }}>
            {props.formatTime(props.time)}
          </h3>
          <IconButton
            title="Add 30 seconds"
            onClick={() => props.changeTime(30, props.type)}
          >
            <AddBoxOutlinedIcon color="primary" />
          </IconButton> 
        </CardContent> */}
        <CardContent>
          <Typography sx={{ fontWeight: "bold" }}>
            Set a {props.type} length
          </Typography>
          {props.type === "break" && <Typography sx={{fontStyle: "italic", mb: "10px"}} fontSize="15px">Leave it empty for no breaks</Typography>}
          {props.type === "session" && <Grid item height={"33px"} />}
          <TextField
            color="secondary"
            type="number"
            placeholder="up to 3 digits"
            label={props.title + " (in minutes)"}
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value))
                .toString()
                .slice(0, 3);
            }}
            onChange={onTimeChangeHandler}
          />
          {/* <Button variant="outlined" sx={{ mt: "1vh", ml: "1vh" }} onClick={}>
            Set
          </Button> */}
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default TimeConfigUI;
