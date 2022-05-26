import * as React from "react";
import Badge from "@mui/material/Badge";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { CalendarPickerSkeleton } from "@mui/x-date-pickers/CalendarPickerSkeleton";
import getDaysInMonth from "date-fns/getDaysInMonth";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { Grid } from "@mui/material";
import SideBar from "../components/SideBar/SideBar";

export default function Dashboard() {
  const initialValue = new Date();
  const currentYear = new Date().getFullYear();
  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);
  const [value, setValue] = React.useState(initialValue);

  function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  function fakeFetch(date, { signal }) {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        const daysInMonth = getDaysInMonth(date);
        const daysToHighlight = [1, 2, 3].map(() =>
          getRandomNumber(1, daysInMonth)
        );

        resolve({ daysToHighlight });
      }, 500);

      signal.onabort = () => {
        clearTimeout(timeout);
        reject(new DOMException("aborted", "AbortError"));
      };
    });
  }

  const fetchHighlightedDays = (date) => {
    const controller = new AbortController();
    fakeFetch(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        // ignore the error if it's caused by `controller.abort`
        if (error.name !== "AbortError") {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  React.useEffect(() => {
    fetchHighlightedDays(initialValue);
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  return (
    <Grid container>
      <SideBar />
      <Grid item>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticDatePicker
            value={value}
            views={["year", "month", "day"]}
            orientation="landscape"
            minDate={new Date(currentYear - 10, 0)}
            maxDate={new Date(currentYear + 10, 12)}
            displayStaticWrapperAs="desktop"
            showToolbar
            showDaysOutsideCurrentMonth
            renderInput={(params) => <TextField {...params} />}
            loading={isLoading}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            onMonthChange={handleMonthChange}
            renderLoading={() => <CalendarPickerSkeleton />}
            renderDay={(day, _value, DayComponentProps) => {
              const isSelected =
                !DayComponentProps.outsideCurrentMonth &&
                highlightedDays.indexOf(day.getDate()) > 0;

              return (
                <Badge
                  key={day.toString()}
                  overlap="circular"
                  color="secondary"
                  variant="dot"
                  invisible={isSelected ? false : true}
                >
                  <PickersDay {...DayComponentProps} />
                </Badge>
              );
            }}
          />
        </LocalizationProvider>
      </Grid>
    </Grid>
  );
}
