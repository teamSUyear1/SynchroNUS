import classes from "./Timeline.module.css";
import { Chrono } from "react-chrono";
import data from "../../components/Data/Data";

const Timeline = () => {
  return (
    <>
      <div className={classes.main}>
        <h1>Timeline</h1>
        <div
          className={classes.chrono}
          style={{
            color: "black",
            width: "1000px",
            height: "800px",
          }}
        >
          <Chrono
            items={data}
            slideShow
            slideItemDuration={4500}
            mode="HORIZONTAL"
            enableOutline
            allowDynamicUpdate
            theme={{
              primary: "red",
              secondary: "blue",
              cardBgColor: "yellow",
              cardForeColor: "violet",
              titleColor: "black",
              titleColorActive: "red",
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
        <h3>*Use left and right arrow keys to navigate between timeline!</h3>
      </div>
    </>
  );
};

export default Timeline;
