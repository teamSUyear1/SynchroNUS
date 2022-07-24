/* Currently does not work with homepage as every visit scrolls you down directly */
import classes from "./Timeline.module.css";
import { Chrono } from "react-chrono";
import data from "../../components/Data/Data";

const Timeline = () => {
  return (
    <>
      <div className={classes.main}>
        <h1>Our Timeline</h1>
        <div
          className={classes.chrono}
          style={{
            color: "black",
            width: "1200px",
            height: "80vh",
          }}
        >
          <Chrono
            items={data}
            mode="VERTICAL_ALTERNATING"
            slideShow
            scrollable
            enableOutline
            slideItemDuration={4000}
            theme={{
              // primary: "red",
              // secondary: "blue",
              cardBgColor: "#d3d3d3",
              // cardForeColor: "violet",
              titleColor: "#87ceeb",
              // titleColorActive: "#fed8b1",
            }}
            fontSizes={{
              cardSubtitle: "0.85rem",
              cardText: "0.8rem",
              cardTitle: "1rem",
              title: "1rem",
            }}
            buttonTexts={{
              first: "Jump to First",
              last: "Jump to Last",
              next: "Next",
              previous: "Previous",
            }}
          />
        </div>
        <h3>*Use up and down arrow keys to navigate between timeline!<br />Scroll mouse over card during autoplay to pause</h3>
      </div>
    </>
  );
};

export default Timeline;
