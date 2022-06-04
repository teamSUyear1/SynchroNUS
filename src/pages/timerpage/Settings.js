/*
  The page you'll see if timer isn't started, 
  allows users to config break and session time
*/
import SideBar from "../../components/SideBar/SideBar";
import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import { Button } from "@mui/material";
import classes from "./Settings.module.css";
import TimeConfigUI from "./TimeConfigUI";
import Timer from "./Timer";

const Settings = (props) => {
  const [displayTime, setDisplayTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [sessionTime, setSessionTime] = useState(25 * 60);

  const formatTimeHandler = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  };

  const changeTimeHandler = (amount, type) => {
    if (type === "break") {
      if (breakTime <= 60 && amount < 0) {
        return;
      }
      setBreakTime((prev) => prev + amount);
    } else {
      if (sessionTime < 300 && amount < 0) {
        return;
      }
      setSessionTime((prev) => prev + amount);
    }
  };

  const sessionStartHandler = () => {
    return (<Timer />)
  }

  return (
    <Grid container justifyContent={"center"}>
      <SideBar select={4} />
      <Grid item height={"80vh"}>
        <Typography variant="h2" color="inherit">
          Pick a Time
        </Typography>
        <Grid container justifyContent={"center"}>
          <TimeConfigUI
            title={"Break length"}
            changeTime={changeTimeHandler}
            type={"break"}
            time={breakTime}
            formatTime={formatTimeHandler}
          />
          <TimeConfigUI
            title={"Session length"}
            changeTime={changeTimeHandler}
            type={"session"}
            time={sessionTime}
            formatTime={formatTimeHandler}
          />
        </Grid>
        <Button variant="outlined" color="success" onClick={sessionStartHandler}>
          Start!
        </Button>
      </Grid>
    </Grid>
  );
};

export default Settings;
