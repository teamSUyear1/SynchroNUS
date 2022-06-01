import { Paper, Typography } from "@mui/material";
import vidBackground from "../../components/Assets/test.mp4";
import React from "react";

function Home() {
  return (
    /*React.Fragment is just an empty container to enable 
    a single element return for the function*/
    <React.Fragment>
      <video src={vidBackground} autoPlay loop muted />
      <Typography variant="h6" color="inherit">
        This is Home page
      </Typography>
    </React.Fragment>
  );
}

export default Home;
