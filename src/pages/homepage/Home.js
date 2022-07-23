import vidBackground from "../../components/Assets/test.mp4";
import classes from "./Home.module.css";
import Header from "./Header";
import Introduction from "./Introduction";
import Timeline from "./Timeline";
import Template from "./Template";

function Home() {
  return (
    <>
      <video src={vidBackground} autoPlay loop muted />
      <div className={classes.main}>
        <div className={classes.overlay} />
        <div className={classes.content}>
          <Header />
          {/* Add 100vh to overlay for each component stacked below */}
          <Introduction />
          <Template />
        </div>
      </div>
    </>
  );
}

export default Home;
