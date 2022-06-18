import { LocalizationProvider, PickersDay } from "@mui/lab";
import {
  Badge,
  Button,
  Grid,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import SideBar from "../../components/SideBar/SideBar";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import Popup from "../../components/Popup/Popup";
import AssignmentEventForm from "./AssignmentEventForm";
import AssignmentTable from "./AssignmentTable";
import { formatDistanceToNow } from "date-fns";
import { useAuth, db } from "../../hooks/useAuth";
import {
  arrayRemove,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { Box } from "@mui/system";

function Assignment() {
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

  const [value, setValue] = useState(new Date(currDate));
  const currentYear = new Date().getFullYear();
  const [openPopup, setOpenPopup] = useState(false);
  const [events, setEventsState] = useState([]);
  const { user } = useAuth();
  const [highlightedDays, setHighlightedDays] = useState([]);
  const [month, setMonth] = useState(value.getMonth());

  function filterDate(task) {
    const taskdate = new Date(task.date).toLocaleDateString();
    const selecteddate = new Date(value).toLocaleDateString();
    return taskdate === selecteddate;
  }

  function filterHighlight(task) {
    return new Date(task.date).getMonth() === month;
  }

  function setEvents(newTasks) {
    setEventsState(newTasks);
    setDoc(doc(db, "assignments", user?.uid), { tasks: newTasks });
  }

  function delEvent(row) {
    updateDoc(doc(db, "assignments", user?.uid), {
      tasks: arrayRemove(row),
    });
    onSnapshot(doc(db, "assignments", user?.uid), (doc) => {
      setEventsState(doc.data().tasks);
    });
  }

  const handleMonthChange = (date) => {
    setMonth(date.getMonth());
  };

  const filtered = events
    .filter(filterHighlight)
    .map((row) => new Date(row.date).getDate());
  const daysToHighlight = filtered.filter((c, index) => {
    return filtered.indexOf(c) === index;
  });

  useEffect(() => {
    async function fetchData() {
      const docSnapshot = await getDoc(doc(db, "assignments", user?.uid));
      if (docSnapshot.exists()) {
        setHighlightedDays(daysToHighlight);
        setEventsState(docSnapshot.data().tasks);
      } else {
        setEventsState([]);
      }
    }
    fetchData();
  }, [user.uid, month, daysToHighlight]);

  return (
    <Grid container="true">
      <SideBar select={3} />
      <Grid item margin={3} minHeight="75vh">
        <Stack spacing={3} direction={{ xs: "column", xl: "row" }}>
          <Stack justifyContent="flex-start" alignItems="stretch" spacing={2}>
            <Button variant="contained" onClick={() => setOpenPopup(true)}>
              Add Assignment Event
            </Button>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box sx={{ borderWidth: 2, borderRadius: 2 }}>
                <StaticDatePicker
                  value={value}
                  views={["year", "month", "day"]}
                  minDate={new Date(currentYear - 10, 0)}
                  maxDate={new Date(currentYear + 10, 12)}
                  displayStaticWrapperAs="desktop"
                  showDaysOutsideCurrentMonth
                  renderInput={(params) => <TextField {...params} />}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  onMonthChange={handleMonthChange}
                  renderDay={(day, _value, DayComponentProps) => {
                    const isSelected =
                      !DayComponentProps.outsideCurrentMonth &&
                      highlightedDays.indexOf(day.getDate()) >= 0;
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
              </Box>

              <Box sx={{ border: "1px solid", borderRadius: 2 }}>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                  margin={2}
                >
                  <Typography>{value.toDateString()}</Typography>

                  <List
                    sx={{
                      width: "100%",
                      bgcolor: "background.paper",
                      position: "relative",
                      overflow: "auto",
                      maxHeight: 200,
                      "& ul": { padding: 0 },
                      borderRadius: 2,
                    }}
                  >
                    {events.filter(filterDate).length === 0 ? (
                      <Typography>No Assignment Due.</Typography>
                    ) : (
                      events.filter(filterDate).map((task) => (
                        <ListItem>
                          <Box
                            sx={{ borderWidth: 3, borderRadius: 2 }}
                            width="100%"
                            padding={2}
                          >
                            <Typography component="p">
                              Title: {task.title}
                            </Typography>
                            <Typography component="p">
                              Type: {task.type}
                            </Typography>
                            <Typography component="p">
                              Time Due:{" "}
                              {new Date(task.date).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </Typography>
                            <Typography component="p">
                              Due{" "}
                              {formatDistanceToNow(new Date(task.date), {
                                addSuffix: true,
                              })}
                            </Typography>
                          </Box>
                        </ListItem>
                      ))
                    )}
                  </List>
                </Stack>
              </Box>
            </LocalizationProvider>
          </Stack>
          <Box
            sx={{
              width: 1000,
              height: "auto",
              border: "1px solid",
              borderRadius: 2,
            }}
          >
            <AssignmentTable
              events={events}
              setEvents={setEvents}
              delEvent={delEvent}
            />
          </Box>
        </Stack>
      </Grid>

      <Popup
        title="Add new Assignment"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <AssignmentEventForm
          events={events}
          setEvents={setEvents}
          setOpenPopup={setOpenPopup}
        />
      </Popup>
    </Grid>
  );
}

export default Assignment;
