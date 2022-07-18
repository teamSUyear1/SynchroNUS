import vidBackground from "../../components/Assets/test.mp4";
import classes from "./Home.module.css";
import Header from "./Header";


function Home() {
  return (
    <>
      <div className={classes.main}>
        <div className={classes.overlay} />
        <video src={vidBackground} autoPlay loop muted />
        <div className={classes.content}>
          <Header />
        </div>
      </div>
    </>
  );
}

export default Home;
