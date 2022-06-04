/*
  Main page for for study timer -> displays Settings.js if no timer ongoing and vice-versa
*/
import { Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import Timer from "./Timer";
import Settings from "./Settings";

const StudyTimer = () => {
  const [showSettings, SetShowSettings] = useState(false);

  return (
    <>{showSettings ? <Settings /> : <Timer />}</>
    // <>{console.log(showSettings)}</>
  );
};

export default StudyTimer;
