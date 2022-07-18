import vidBackground from "../../components/Assets/test.mp4";
import classes from "./Home.module.css";
import Header from "./Header";
import Introduction from "./Introduction";
import { Grid, Typography } from "@mui/material";

function Home() {
  return (
    <>
      <div className={classes.main}>
        <div className={classes.overlay} />
        <video src={vidBackground} autoPlay loop muted />
        <div className={classes.content}>
          <Header />
          {/* Add 100vh to overlay for each component stacked below */}
          <Introduction />
        </div>
      </div>
    </>
  );
}

export default Home;
