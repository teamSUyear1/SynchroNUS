import { CalendarPicker, LocalizationProvider } from "@mui/lab";
import { Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import SideBar from "../components/SideBar/SideBar";
import isWeekend from 'date-fns/isWeekend';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

function Assignment() {
  const [value, setValue] = React.useState(new Date());
  const initialValue = new Date();
  const currentYear = new Date().getFullYear();

  return (
    <Grid container height={"80vh"} >
      <SideBar select={3} />
      <Grid item>
        <Button variant="contained">Add Assignment Event</Button>
        <Typography>{value.toDateString()}</Typography>
      </Grid>
      <Grid item>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticDatePicker
          value={value}
            views={["year", "month", "day"]}
            minDate={new Date(currentYear - 10, 0)}
            maxDate={new Date(currentYear + 10, 12)}
            displayStaticWrapperAs="desktop"
            showDaysOutsideCurrentMonth
            onChange={(newValue) => {
              setValue(newValue);
            }}
          />
        </LocalizationProvider>
      </Grid>
    </Grid>
  );
}

export default Assignment;
