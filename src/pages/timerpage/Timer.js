/*
  Page that displays when study timer is ongoing.
  Shows a circular progressbar and time remaining.
*/
import { Grid, Typography, IconButton } from "@mui/material";
import React from "react";
import SideBar from "../../components/SideBar/SideBar";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import classes from "./StudyTimer.module.css";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import SettingsIcon from '@mui/icons-material/Settings';
import Settings from "./Settings";
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const percentage = 66;
const red = "#f54e4e";
const green = "#4aec8c";
const debuggy = () => {
  console.log("hello test");
};

const resetTimerHandler = () => {
  return <Settings />;
};

function Timer() {
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
          <IconButton onClick={debuggy}>
            <PlayCircleOutlineIcon sx={{ fontSize: 50 }} />
          </IconButton>
          <IconButton onClick={debuggy}>
            {" "}
            <PauseCircleOutlineIcon sx={{ fontSize: 50 }} />
          </IconButton>
          <IconButton onClick={debuggy}>
            <SettingsIcon sx={{ fontSize: 45 }} />
          </IconButton>
          <IconButton onClick={debuggy}>
            <RestartAltIcon sx={{ fontSize: 50 }} />
          </IconButton>
        </div>
      </Grid>
    </Grid>
  );
}

export default Timer;
