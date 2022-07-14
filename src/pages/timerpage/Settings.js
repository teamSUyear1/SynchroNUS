/*
  The page you'll see if timer isn't started, 
  allows users to config break and session time

  // Test for converting localStorage's date string and get it back as object
  window.localStorage.setItem("t", new Date());
  const test = Date.parse(window.localStorage.getItem("t"));
  console.log(typeof test); //Number
  console.log(test);

*/
import { Grid, Typography } from "@mui/material";
import { useContext, Fragment } from "react";
import { Button } from "@mui/material";
import TimeConfigUI from "./TimeConfigUI";
import SettingsContext from "./SettingsContext";
import SettingsCardUI from "./SettingsCardUI";


const Settings = (props) => {
  const settingsInfo = useContext(SettingsContext);
  const sessionStartHandler = () => {
    //user's session time 
    //user's break time
    window.localStorage.setItem("sessionSet", settingsInfo.sessionTime);
    window.localStorage.setItem("breakSet", settingsInfo.breakTime);
    // Loop toggling init
    window.localStorage.setItem("loopToggle", false);
    //initialising start and endTime
    let startTime = new Date();
    const sessionMinutes = settingsInfo.sessionTime * 1000;
    const breakMinutes = settingsInfo.breakTime * 1000;
    let sessionEndTime = new Date(startTime.getTime() + sessionMinutes);
    
    let breakEndTime = new Date(sessionEndTime.getTime() + breakMinutes);
    window.localStorage.setItem("sessionEndTime", sessionEndTime);
    window.localStorage.setItem("breakEndTime", breakEndTime);
    return settingsInfo.setShowSettings(false);
  };

  return (
    <Fragment>
      <Grid container justifyContent={"center"}>
        <Grid item>
          <Typography variant="h2" color="inherit" sx={{ mt: "3vh" }}>
            Pick a Time
          </Typography>
          <Grid item height={"5vh"} />
        </Grid>
      </Grid>
      <Grid
        container
        direction={"row"}
        justifyContent={"center"}
        sx={{ gap: "5px" }}
      >
        <TimeConfigUI
          title={"Session length"}
          changeTime={settingsInfo.changeTimeHandler}
          type={"session"}
          time={settingsInfo.sessionTime}
          formatTime={settingsInfo.formatTimeHandler}
          //take note same attribute name different attributes
          timeSet={settingsInfo.setSessionTime}
        />
        <Grid item width={"10vh"} />
        <TimeConfigUI
          title={"Break length"}
          changeTime={settingsInfo.changeTimeHandler}
          type={"break"}
          time={settingsInfo.breakTime}
          formatTime={settingsInfo.formatTimeHandler}
          //take note same attribute name different attributes
          timeSet={settingsInfo.setBreakTime}
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
      <Grid item height={"5vh"} />
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
      <Grid item height={"5vh"} />
    </Fragment>
  );
};

export default Settings;
