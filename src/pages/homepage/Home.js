import { Paper, Typography } from "@mui/material";
import vidBackground from "../../components/Assets/test.mp4";
import React from "react";
import classes from "./Home.module.css";

function Home() {
  return (
    /*React.Fragment is just an empty container to enable 
    a single element return for the function*/
    <React.Fragment>
      <div className={classes.main}>
        <div className={classes.overlay} />
        <video src={vidBackground} autoPlay loop muted />
        {/* <Typography variant="h6" color="inherit">
        This is Home page
      </Typography> 
      Will be removing this because Typography shifts all texts to the bottom of the video,
      not sure how to fix
      */}
        <div className={classes.content}>
          This is the homepage
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
