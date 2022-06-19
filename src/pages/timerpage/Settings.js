/*
  The page you'll see if timer isn't started, 
  allows users to config break and session time
*/
import { Grid, Typography } from "@mui/material";
import { useContext, Fragment } from "react";
import { Button } from "@mui/material";
import TimeConfigUI from "./TimeConfigUI";
import SettingsContext from "./SettingsContext";
import classes from "./Settings.module.css";

const Settings = (props) => {
  const settingsInfo = useContext(SettingsContext);

  const sessionStartHandler = () => {
    return settingsInfo.setShowSettings(false);
  };

  return (
    <Fragment>
      <Grid container justifyContent={"center"}>
        <Grid item>
          <Typography variant="h2" color="inherit">
            Pick a Time
          </Typography>
        </Grid>
      </Grid>
      <Grid container direction={"row"} justifyContent={"center"} sx={{gap: "5px"}}>
        <TimeConfigUI
          title={"Break length"}
          changeTime={settingsInfo.changeTimeHandler}
          type={"break"}
          time={settingsInfo.breakTime}
          formatTime={settingsInfo.formatTimeHandler}
        />
        <TimeConfigUI
          title={"Session length"}
          changeTime={settingsInfo.changeTimeHandler}
          type={"session"}
          time={settingsInfo.sessionTime}
          formatTime={settingsInfo.formatTimeHandler}
        />
      </Grid>
      <Grid container justifyContent={"center"}>
        <Button
          title="Start timer"
          variant="outlined"
          color="success"
          onClick={sessionStartHandler}
        >
          Start!
        </Button>
      </Grid>
      <Grid item height={"50vh"} />
    </Fragment>
  );
};

export default Settings;
