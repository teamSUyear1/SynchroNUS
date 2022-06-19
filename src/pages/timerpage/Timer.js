/*
  Page that displays when study timer is ongoing.
  Shows a circular progressbar and time remaining.
*/
import { Grid, Typography, IconButton } from "@mui/material";
import { useContext, useState, useEffect, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import classes from "./StudyTimer.module.css";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SettingsContext from "./SettingsContext";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Timer(props) {
  const settingsInfo = useContext(SettingsContext);

  const [isPaused, setIsPaused] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(settingsInfo.sessionTime);
  const [mode, setMode] = useState("session");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isPausedRef = useRef(isPaused);
  const secondsLeftRef = useRef(secondsLeft);
  const modeRef = useRef(mode);

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  function switchMode() {
    const nextMode = modeRef.current === "session" ? "break" : "settings";
    if (nextMode === "break") {
      setMode(nextMode);
      modeRef.current = nextMode;
      setSecondsLeft(settingsInfo.breakTime);
      secondsLeftRef.current = settingsInfo.breakTime;
    }
    if (nextMode === "settings") {
      resetTimerHandler();
    }
  }

  const resetTimerHandler = () => {
    settingsInfo.setShowSettings(true);
    setMode("session");
    modeRef.current = "session";
    setSecondsLeft(settingsInfo.sessionTime);
    secondsLeftRef.current = settingsInfo.sessionTime;
    setIsPaused(true);
    isPausedRef.current = true;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (settingsInfo.ShowSettings === false || isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        return switchMode();
      }

      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [settingsInfo]);

  const totalSeconds =
    mode === "session" ? settingsInfo.sessionTime : settingsInfo.breakTime;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item height={"80vh"}>
        <div className={classes.title}>
          <Typography>Study Timer</Typography>
        </div>
        <CircularProgressbar
          value={percentage}
          text={props.formatTime(secondsLeft)}
          styles={buildStyles({
            textColor: "#fff",
            pathColor: mode === "session" ? "pink" : "green",
            trailColor: "rgba(255, 255, 255, 0.3)",
          })}
        />
        <div className={classes.content}>
          {isPaused ? (
            <IconButton
              title="Start"
              onClick={() => {
                setIsPaused(false);
                isPausedRef.current = false;
              }}
            >
              <PlayCircleOutlineIcon sx={{ fontSize: 50 }} />
            </IconButton>
          ) : (
            <IconButton
              title="Pause"
              onClick={() => {
                setIsPaused(true);
                isPausedRef.current = true;
              }}
            >
              <PauseCircleOutlineIcon sx={{ fontSize: 50 }} />
            </IconButton>
          )}
          <IconButton title="Configuration" onClick={handleOpen}>
            <SettingsIcon sx={{ fontSize: 45 }} />
          </IconButton>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography sx={{color: "white"}} id="modal-modal-title" variant="h6" component="h2">
                Configuration Menu
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Coming in the near future!
              </Typography>
            </Box>
          </Modal>
          <IconButton title="Reset Timer" onClick={resetTimerHandler}>
            <RestartAltIcon sx={{ fontSize: 50 }} />
          </IconButton>
        </div>
      </Grid>
    </Grid>
  );
}

export default Timer;
