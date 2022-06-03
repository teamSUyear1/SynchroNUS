import { Grid, Typography } from "@mui/material";
import React from "react";
import SideBar from "../../components/SideBar/SideBar";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import classes from "./StudyTimer.module.css";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { IconButton } from "@mui/material";

const percentage = 66;
const red = "#f54e4e";
const green = "#4aec8c";

function StudyTimer() {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <SideBar select={4} />
      <Grid item height={"80vh"}>
        <div className={classes.title}>
          <Typography>Study Timer</Typography>
        </div>
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            textColor: "#fff",
            pathColor: "pink",
            trailColor: "rgba(255, 255, 255, 0.3)",
          })}
        />
        <div className={classes.content}>
          <IconButton
            onClick={() => {
              console.log("hello");
            }}
          >
            <PlayCircleIcon />
          </IconButton>
        </div>
      </Grid>
    </Grid>
  );
}

export default StudyTimer;
