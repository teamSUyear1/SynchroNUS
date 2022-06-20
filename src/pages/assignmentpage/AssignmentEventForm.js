import { TaskSharp } from "@mui/icons-material";
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/lab";
import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { isPast, isAfter } from "date-fns";
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
  const [type, setType] = useState("");

  function handleAddEvent(e) {
    e.preventDefault();
    addEvent(assignmentTitle, type, importance, endevent.toISOString());
  }

  function addEvent(title, type, importance, date) {
    const newEvents = [
      ...events,
      {
        title: title,
        type: type,
        importance: importance,
        Cdate: null,
        date: date,
        isComplete: false,
      },
    ];
    setDisable(true)
    setEvents(newEvents);
    setOpenPopup(false);
  }
  useEffect(() => {
    if (importance === 0 || type === "") {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [importance, type]);

  return (
    <form onSubmit={handleAddEvent}>
      <Stack spacing={3} marginTop={1} marginBottom={1}>
        <TextField
          label="Event Title"
          required
          onChange={(e) => setAssignmentTitle(e.target.value)}
        />
        <Stack direction="row" justifyContent="space-between">
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Type *</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Type"
                onChange={(e) => setType(e.target.value)}
              >
                <MenuItem value="Project">Project</MenuItem>
                <MenuItem value="Assignment">Assignment</MenuItem>
                <MenuItem value="Lab">Lab</MenuItem>
                <MenuItem value="Quiz">Quiz</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: 250,
              justifyContent: "center",
            }}
          >
            <div>
              <Typography component="legend">Level of importance</Typography>
              <Rating
                value={importance}
                onChange={(event, newValue) => {
                  setImportance(newValue);
                }}
                required
              ></Rating>
            </div>
          </Box>
        </Stack>
        <Divider />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack direction="row" spacing={3}>
            <DatePicker
              showToolbar
              label="Due Date"
              openTo="day"
              views={["month", "day"]}
              value={endevent}
              shouldDisableDate={date => isAfter(new Date(currDate), date)}
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
          </Stack>
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
