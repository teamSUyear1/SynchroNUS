/*
  The page you'll see if timer isn't started, 
  allows users to config break and session time
*/
import { Grid, Typography } from "@mui/material";
import { useContext, Fragment } from "react";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TimeConfigUI from "./TimeConfigUI";
import SettingsContext from "./SettingsContext";
import SettingsCardUI from "./SettingsCardUI";

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
          <Grid item height={"5vh"} />
        </Grid>
      </Grid>
      <Grid
        container
        direction={"row"}
        justifyContent={"center"}
        sx={{ gap: "5px"}}
      >
        <TimeConfigUI
          title={"Session length"}
          changeTime={settingsInfo.changeTimeHandler}
          type={"session"}
          time={settingsInfo.sessionTime}
          formatTime={settingsInfo.formatTimeHandler}
        />
        <Grid item width={"10vh"} />
        <TimeConfigUI
          title={"Break length"}
          changeTime={settingsInfo.changeTimeHandler}
          type={"break"}
          time={settingsInfo.breakTime}
          formatTime={settingsInfo.formatTimeHandler}
        />
      </Grid>
      <Grid item height={"5vh"} />
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
      <Grid item height={"10vh"} />
      <Grid container justifyContent={"center"}>
        <SettingsCardUI
          title="Template 1"
          templateSession={60 * 60}
          templateBreak={15 * 60}
          formatTime={settingsInfo.formatTimeHandler}
          setSession={settingsInfo.setSessionTime}
          setBreak={settingsInfo.setBreakTime}
        />
        <SettingsCardUI
          title="Template 2"
          templateSession={120 * 60}
          templateBreak={30 * 60}
          formatTime={settingsInfo.formatTimeHandler}
          setSession={settingsInfo.setSessionTime}
          setBreak={settingsInfo.setBreakTime}
        />
        <SettingsCardUI
          title="Template 3 (Not recommended)"
          templateSession={180 * 60}
          templateBreak={45 * 60}
          formatTime={settingsInfo.formatTimeHandler}
          setSession={settingsInfo.setSessionTime}
          setBreak={settingsInfo.setBreakTime}
        />
      </Grid>
      <Grid item height={"30vh"} />
    </Fragment>
  );
};

export default Settings;
