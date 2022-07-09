import { Grid } from "@mui/material";
import React from "react";
import SideBar from "../components/SideBar/SideBar";

function Timetable() {
  return (
    <>
      <SideBar select={2} />
      <Grid container minHeight="79.5vh"></Grid>
    </>
  );
}

export default Timetable;
