/*
  Main page for for study timer -> displays Settings.js if no timer ongoing and vice-versa
  Features to be added (to the cogwheel button as an overlay)
  -> Total time tracker (stat page) -> also to be added to end of session time 
  -> Option to skip break
  -> Option to repeat after break time
*/
import React, { Fragment, useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import Timer from "./Timer";
import Settings from "./Settings";
import SettingsContext from "./SettingsContext";

const StudyTimer = () => {
  const [existingSessionRunning, setSessionRunning] = useState(
    window.localStorage.getItem("test") != null
  );
  const [existingBreakRunning, setBreakRunning] = useState(
    window.localStorage.getItem("test123") != null
  );
  const [showSettings, setShowSettings] = useState(true);
  const [sessionTime, setSessionTime] = useState(
    //hacky way, experimental
    existingSessionRunning
      ? parseInt(window.localStorage.getItem("test"))
      : 25 * 60
  );
  const [breakTime, setBreakTime] = useState(
    //hacky way, experimental
    existingBreakRunning ? parseInt(window.localStorage.getItem("test123")) : 0
  );

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
      if (breakTime <= 0 && amount < 0) {
        return;
      }
      setBreakTime((prev) => prev + amount);
    } else {
      if (sessionTime <= 300 && amount < 0) {
        return;
      }
      setSessionTime((prev) => prev + amount);
    }
  };

  const settingsAndTimerContext = {
    setSessionRunning,
    setBreakRunning,
    showSettings,
    sessionTime,
    breakTime,
    setSessionTime,
    setShowSettings,
    setBreakTime,
    changeTimeHandler,
    formatTimeHandler,
  };

  return (
    <Fragment>
      <SideBar select={5} />
      <SettingsContext.Provider value={settingsAndTimerContext}>
        {showSettings && !existingSessionRunning && !existingBreakRunning ? (
          <Settings />
        ) : (
          <Timer formatTime={formatTimeHandler} />
        )}
      </SettingsContext.Provider>
    </Fragment>
  );
};

export default StudyTimer;
