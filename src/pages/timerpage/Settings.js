/*
  The page you'll see if timer isn't started, 
  allows users to config break and session time
*/
import { Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { Button } from "@mui/material";
import TimeConfigUI from "./TimeConfigUI";
import SettingsContext from "./SettingsContext";

const Settings = (props) => {
  const settingsInfo = useContext(SettingsContext);

  const sessionStartHandler = () => {
    return (settingsInfo.setShowSettings(false))
  }

  return (
    <Grid container justifyContent={"center"}>
      <Grid item height={"80vh"}>
        <Typography variant="h2" color="inherit">
          Pick a Time
        </Typography>
        <Grid container justifyContent={"center"}>
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
        <Button title="Start timer" variant="outlined" color="success" onClick={sessionStartHandler}>
          Start!
        </Button>
      </Grid>
    </Grid>
  );
};

export default Settings;
