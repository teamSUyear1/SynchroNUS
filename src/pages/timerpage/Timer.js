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
import ToggleButton from "@mui/material/ToggleButton";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import SettingsContext from "./SettingsContext";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import BellSound from "../../components/Assets/BellSound.wav";
import { useAuth, db } from "../../hooks/useAuth";
import { getDoc, doc, setDoc } from "firebase/firestore";
import useTimer from "../../hooks/useTimer";

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

/*
//template for 30 minutes
let now = new Date();
const minute = 30 * 60 * 1000
let expiryTime = new Date(now.getTime() + minute);
console.log(expiryTime);
*/

function Timer(props) {
  let checkBreakRunning = window.localStorage.getItem("break-running") != null;
  let checkIsNotPaused = window.localStorage.getItem("paused") != null;
  let checkLoopNotToggled =
    window.localStorage.getItem("loopToggle") === "false";
  let audioAlert = new Audio(BellSound);
  let timeDiff;
  let sessionTimeSet = parseInt(window.localStorage.getItem("sessionSet"));
  let breakTimeSet = parseInt(window.localStorage.getItem("breakSet"));

  function playAlert() {
    audioAlert.play();
  }

  function timeDiffHandler(timetype) {
    let now = new Date().getTime();
    if (window.localStorage.getItem("paused") != null) {
      return parseInt(window.localStorage.getItem("paused"));
    }
    if (timetype === "break") {
      const getDate = Date.parse(window.localStorage.getItem("breakEndTime"));
      timeDiff = (getDate - now) / 1000;
    }
    if (timetype === "session") {
      const getDate = Date.parse(window.localStorage.getItem("sessionEndTime"));
      timeDiff = (getDate - now) / 1000;
    }
    return Math.round(timeDiff);
  }

  const settingsInfo = useContext(SettingsContext);

  const [isPaused, setIsPaused] = useState(checkIsNotPaused ? true : false);
  const [secondsLeft, setSecondsLeft] = useState(
    checkBreakRunning ? timeDiffHandler("break") : timeDiffHandler("session")
  );
  const [mode, setMode] = useState(checkBreakRunning ? "break" : "session");
  const [configOpen, setConfigOpen] = useState(false);
  const [loopToggle, setLoopToggle] = useState(
    checkLoopNotToggled ? false : true
  );
  const {
    setTimeSpentState,
    setBreakSpentState,
  } = useTimer();
  const { user } = useAuth();
  const handleOpen = () => setConfigOpen(true);
  const handleClose = () => setConfigOpen(false);
  const handleLoopToggle = () => {
    if (loopToggle) {
      window.localStorage.setItem("loopToggle", false);
      setLoopToggle(false);
      loopToggleRef.current = false;
    } else {
      window.localStorage.setItem("loopToggle", true);
      setLoopToggle(true);
      loopToggleRef.current = true;
    }
  };

  const isPausedRef = useRef(isPaused);
  const secondsLeftRef = useRef(secondsLeft);
  const modeRef = useRef(mode);
  const loopToggleRef = useRef(loopToggle);

  async function timeSpentUpdate() {
    const docRef = doc(db, "timer", user?.uid);
    const docSnap = await getDoc(docRef);
    // console.log("sessionTimeSet:", sessionTimeSet);
    if (!docSnap.exists()) {
      setDoc(doc(db, "timer", user?.uid), { timeSpent: 0, breakTime: 0 });
    }
    // Add to current time spent from total time
    sessionTimeSet += docSnap.data().timeSpent;
    breakTimeSet += docSnap.data().breakSpent;
    setBreakSpentState(breakTimeSet);
    setTimeSpentState(sessionTimeSet);
    setDoc(doc(db, "timer", user?.uid), { timeSpent: sessionTimeSet, breakTime: breakTimeSet });
  }

  function sessionLoop() {
    window.localStorage.setItem("sessionSet", settingsInfo.sessionTime);
    window.localStorage.setItem("breakSet", settingsInfo.breakTime);
    //initialising start and endTime
    let startTime = new Date();
    const sessionMinutes = settingsInfo.sessionTime * 1000;
    const breakMinutes = settingsInfo.breakTime * 1000;
    let sessionEndTime = new Date(startTime.getTime() + sessionMinutes);

    let breakEndTime = new Date(sessionEndTime.getTime() + breakMinutes);
    window.localStorage.setItem("sessionEndTime", sessionEndTime);
    window.localStorage.setItem("breakEndTime", breakEndTime);
  }

  function onContinueHandler() {
    let now = new Date().getTime();
    const seconds = parseInt(window.localStorage.getItem("paused"));
    if (mode === "break") {
      window.localStorage.setItem(
        "breakEndTime",
        new Date(now + seconds * 1000)
      );
    }
    if (mode === "session") {
      window.localStorage.setItem(
        "sessionEndTime",
        new Date(now + seconds * 1000)
      );
    }
    window.localStorage.removeItem("paused");
    setIsPaused(false);
    isPausedRef.current = false;
  }

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  function switchMode() {
    const nextMode = modeRef.current === "session" ? "break" : "settings";
    playAlert();
    if (nextMode === "break") {
      window.localStorage.setItem("break-running", "true");
      setMode(nextMode);
      modeRef.current = nextMode;
      setSecondsLeft(settingsInfo.breakTime);
      secondsLeftRef.current = settingsInfo.breakTime;
    }
    if (nextMode === "settings" && loopToggleRef.current) {
      // console.log("switchMode 2nd Condition");
      timeSpentUpdate();
      sessionLoop();
      window.localStorage.removeItem("break-running");
      setMode("session");
      modeRef.current = "session";
      setSecondsLeft(settingsInfo.sessionTime);
      secondsLeftRef.current = settingsInfo.sessionTime;
    }
    if (nextMode === "settings" && !loopToggleRef.current) {
      // console.log(loopToggleRef.current);
      // console.log("switchMode 3rd Condition");
      // Session and break time ending
      timeSpentUpdate();
      resetTimerHandler();
    }
  }

  const resetTimerHandler = () => {
    window.localStorage.removeItem("break-running");
    window.localStorage.removeItem("paused");
    window.localStorage.removeItem("sessionEndTime");
    window.localStorage.removeItem("breakEndTime");
    settingsInfo.setShowSettings(true);
    settingsInfo.setSessionRunning(false);
    settingsInfo.setBreakRunning(false);
    setMode("session");
    modeRef.current = "session";
    setSecondsLeft(settingsInfo.sessionTime);
    secondsLeftRef.current = settingsInfo.sessionTime;
    setIsPaused(true);
    isPausedRef.current = true;
    window.localStorage.removeItem("sessionSet");
    window.localStorage.removeItem("breakSet");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (settingsInfo.ShowSettings === false || isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current <= 0) {
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
            textColor: props.darkMode ? "#fff" :  "#000000",
            pathColor: mode === "session" ? "pink" : "green",
            trailColor: "rgba(255, 255, 255, 0.3)",
          })}
        />
        <div className={classes.content}>
          {isPaused ? (
            <IconButton title="Start" onClick={onContinueHandler}>
              <PlayCircleOutlineIcon sx={{ fontSize: 50 }} />
            </IconButton>
          ) : (
            <IconButton
              title="Pause"
              onClick={() => {
                window.localStorage.setItem("paused", secondsLeft);
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
            open={configOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography
                sx={{ color: "white" }}
                id="modal-modal-title"
                variant="h6"
                component="h2"
              >
                Configuration Menu
              </Typography>
              <ToggleButton
                selected={loopToggle}
                onClick={handleLoopToggle}
                sx={{ borderStyle: "none" }}
              >
                {loopToggle ? (
                  <AllInclusiveIcon
                    title="Loop on"
                    color="primary"
                    sx={{ fontSize: 40 }}
                  />
                ) : (
                  <AllInclusiveIcon
                    title="Loop off"
                    sx={{ fontSize: 40 }}
                    style={{ color: "grey" }}
                  />
                )}
              </ToggleButton>
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
