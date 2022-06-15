import {
  CalendarPicker,
  CalendarPickerSkeleton,
  LocalizationProvider,
  PickersDay,
} from "@mui/lab";
import {
  Badge,
  Button,
  Divider,
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
import Dialog from "../../components/Dialog/Dialog";
import Popup from "../../components/Popup/Popup";
import AssignmentEventForm from "./AssignmentEventForm";
import { Box, Container } from "@mui/system";
import AssignmentTable from "./AssignmentTable";
import { useAuth, db } from "../../hooks/useAuth";
import {
  arrayRemove,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";

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
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2]);

  function filterDate(task) {
    const taskdate = new Date(task.date).toLocaleDateString();
    const selecteddate = new Date(value).toLocaleDateString();
    return taskdate === selecteddate;
  }

  function filterHighlight(task) {}

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

  useEffect(() => {
    async function fetchData() {
      const docSnapshot = await getDoc(doc(db, "assignments", user?.uid));
      if (docSnapshot.exists()) {
        setEventsState(docSnapshot.data().tasks);
      } else {
        setEventsState([]);
      }
    }
    fetchData();
  }, [user.uid]);

  return (
    <Grid container>
      <SideBar select={3} />
      <Grid item margin={3} minHeight="75vh">
        <Stack spacing={3} direction={{ xs: "column", xl: "row" }}>
          <Stack justifyContent="flex-start" alignItems="stretch" spacing={2} >
            <Button variant="contained" onClick={() => setOpenPopup(true)}>
              Add Assignment Event
            </Button>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box sx={{ borderWidth: 2, borderRadius: 2 }} >
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
                  renderLoading={() => <CalendarPickerSkeleton />}
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
                      bgcolor: 'background.paper',
                      position: "relative",
                      overflow: "auto",
                      maxHeight: 200,
                      "& ul": { padding: 0 },
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
                            <p>Assignment Title: {task.title}</p>
                            <p>Module Code: {task.code}</p>
                            <p>
                              Time Due:{" "}
                              {new Date(task.date).toLocaleTimeString()}
                            </p>
                          </Box>
                        </ListItem>
                      ))
                    )}
                  </List>
                </Stack>
              </Box>
            </LocalizationProvider>
          </Stack>
          <Box sx={{ width: 1000, height: 704, border: "1px solid", borderRadius: 2 }}>
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
