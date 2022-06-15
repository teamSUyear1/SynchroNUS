import { TaskSharp } from "@mui/icons-material";
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/lab";
import {
  Button,
  Divider,
  Rating,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useEffect, useState } from "react";

function AssignmentEventForm(props) {
  const { events, setEvents, setOpenPopup } = props;
  const date = new Date();
  const currDate =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
    }) +
    "-" +
    date.getDate().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
    }) +
    "T" +
    date.getHours().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
    }) +
    ":" +
    date.getMinutes().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
    });
  const [endevent, setEndevent] = useState(new Date(currDate));
  const [disable, setDisable] = useState(false);
  const [importance, setImportance] = useState(0);
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [module, setModule] = useState("");

  function handleAddEvent(e) {
    e.preventDefault();
    addEvent(assignmentTitle, module, importance, endevent.toISOString());
  }


  function addEvent(title, code, importance, date) {
    const newEvents = [
      ...events,
      {
        title: title,
        code: code,
        importance: importance,
        date: date,
        isComplete: false,
      },
    ];
    setEvents(newEvents);
    setOpenPopup(false);
  }

  return (
    <form onSubmit={handleAddEvent}>
      <Stack spacing={3} marginTop={1} marginBottom={1}>
        <TextField
          label="Assignment Title"
          required
          onChange={(e) => setAssignmentTitle(e.target.value)}
        />
        <Stack direction="row" justifyContent="space-between">
          <TextField
            label="Module Code"
            type="search"
            onChange={(e) => setModule(e.target.value)}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: 200,
            }}
          >
            <div>
              <Typography component="legend">Level of importance</Typography>
              <Rating
                value={importance}
                onChange={(event, newValue) => {
                  setImportance(newValue);
                }}
              ></Rating>
            </div>
          </Box>
        </Stack>
        <Divider />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <div>
            <DatePicker
              showToolbar
              label="Due Date"
              openTo="day"
              views={["month", "day"]}
              value={endevent}
              onChange={(newDate) => {
                setEndevent(newDate);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <TimePicker
              label="Due Time"
              value={endevent}
              showToolbar
              onChange={(newTime) => {
                setEndevent(newTime);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
          <Typography>{endevent.toString()}</Typography>
        </LocalizationProvider>
        <Button variant="contained" type="submit" disabled={disable}>
          Add
        </Button>
      </Stack>
    </form>
  );
}

export default AssignmentEventForm;
