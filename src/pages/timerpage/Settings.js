/*
  The page you'll see if timer isn't started, 
  allows users to config break and session time
*/
import { Grid, Typography } from "@mui/material";
import { useContext, Fragment } from "react";
import { Button } from "@mui/material";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TimeConfigUI from "./TimeConfigUI";
import SettingsContext from "./SettingsContext";

const Settings = (props) => {
  const settingsInfo = useContext(SettingsContext);

  const sessionStartHandler = () => {
    return settingsInfo.setShowSettings(false);
  };

  return (
<<<<<<< HEAD
    <Fragment>
      <Grid container justifyContent={"center"}>
        <Grid item>
          <Typography variant="h2" color="inherit">
            Pick a Time
          </Typography>
=======
    <Grid container justifyContent={"center"} height={"80vh"}>
      <Grid item>
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
>>>>>>> c9956b08f547144b81789268924652d97ad7bc83
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
        />
        <TimeConfigUI
          title={"Break length"}
          changeTime={settingsInfo.changeTimeHandler}
          type={"break"}
          time={settingsInfo.breakTime}
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
      <Grid item height={"10vh"} />
      <Grid container justifyContent={"center"}>
      <Card variant="outlined" sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography sx={{fontSize: 14}} color={"white"}>Test</Typography>
          </CardContent>
        </Card>
        <Card variant="outlined" sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography sx={{fontSize: 14}} color={"white"}>Test</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item height={"30vh"} />
    </Fragment>
  );
};

export default Settings;
