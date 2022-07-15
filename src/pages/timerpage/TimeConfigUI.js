/*
  UI for inputting a time in the textfields.
*/
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
        <CardContent>
          <Typography sx={{ fontWeight: "bold" }}>
            Set a {props.type} length
          </Typography>
          {props.type === "break" && (
            <Typography
              sx={{ fontStyle: "italic", mb: "10px" }}
              fontSize="15px"
            >
              Set to 0 for no breaks. 
            </Typography>
          )}
          {props.type === "session" && (
            <Typography
              sx={{ fontStyle: "italic", mb: "10px" }}
              fontSize="15px"
            >
              Default length is 25 minutes
            </Typography>
          )}
          <TextField
            color="primary"
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
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default TimeConfigUI;
