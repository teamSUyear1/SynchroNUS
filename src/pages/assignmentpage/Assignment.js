import { LocalizationProvider } from "@mui/lab";
import {
  Button,
  Collapse,
  Grid,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import SideBar from "../../components/SideBar/SideBar";
import Popup from "../../components/Popup/Popup";
import AssignmentEventForm from "./AssignmentEventForm";
import AssignmentTable from "./AssignmentTable";
import { formatDistanceToNow, compareAsc } from "date-fns";
import { useAuth, db } from "../../hooks/useAuth";
import {
  arrayRemove,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { Box } from "@mui/system";
import useAssignment from "../../hooks/useAssignment";
import Calendar from "../../components/Calendar/Calendar";
import { TransitionGroup } from "react-transition-group";

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
  const { events, setEventsState } = useAssignment();
  const [value, setValue] = useState(new Date(currDate));
  const [openPopup, setOpenPopup] = useState(false);
  const { user } = useAuth();
  const [month, setMonth] = useState(value.getMonth());

  function filterDate(task) {
    const taskdate = new Date(task.date).toLocaleDateString();
    const selecteddate = new Date(value).toLocaleDateString();
    return taskdate === selecteddate;
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

  function handleSort(events) {
    const newTasks = [
      ...events
        .sort((a, b) => compareAsc(new Date(a.date), new Date(b.date)))
        .sort((a, b) => Number(a.isComplete) - Number(b.isComplete)),
    ];
    setEvents(newTasks);
  }

  return (
    <>
      <SideBar select={3} />
      <Grid
        container
        minHeight="80vh"
        justifyContent="center"
        paddingLeft={{ xs: 0, md: 30 }}
        width="100%"
      >
        <Grid item margin={3}>
          <Stack spacing={3} direction={{ xs: "column", xl:"row" }}>
            <Stack justifyContent="flex-start"  spacing={2}>
              <Button variant="contained" onClick={() => setOpenPopup(true)}>
                Add Assignment Event
              </Button>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Box
                  sx={{backgroundColor: "background.default", boxShadow: 2, borderRadius: 2 }}
                  p={1}
                >
                  <Calendar
                    value={value}
                    setValue={setValue}
                    month={month}
                    setMonth={setMonth}
                  />
                </Box>

                <Box sx={{backgroundColor: "background.default", boxShadow: 2, borderRadius: 2 }}>
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
                        bgcolor: "background.default",
                        position: "relative",
                        overflow: "auto",
                        maxHeight: 215,
                        "& ul": { padding: 0 },
                        borderRadius: 2,
                      }}
                    >
                      <TransitionGroup>
                        {events.filter(filterDate).length === 0 ? (
                          <Typography textAlign="center">No Assignment Due.</Typography>
                        ) : (
                          events.filter(filterDate).map((task, index) => (
                            <Collapse>
                              <ListItem key={task}>
                                <Box
                                  sx={{
                                    border: "1px solid",
                                    borderWidth: 2,
                                    borderRadius: 2,
                                  }}
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
                                    {new Date(task.date).toLocaleTimeString(
                                      [],
                                      {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      }
                                    )}
                                  </Typography>
                                  <Typography component="p">
                                    Due{" "}
                                    {formatDistanceToNow(new Date(task.date), {
                                      addSuffix: true,
                                    })}
                                  </Typography>
                                  <Typography>
                                    Status:{" "}
                                    {task.isComplete
                                      ? "Completed"
                                      : "In progress"}
                                  </Typography>
                                </Box>
                              </ListItem>
                            </Collapse>
                          ))
                        )}
                      </TransitionGroup>
                    </List>
                  </Stack>
                </Box>
              </LocalizationProvider>
            </Stack>
            <Box
              sx={{
                height: "auto",
                backgroundColor: "background.default", boxShadow: 2,
                borderRadius: 2,
              }}
              width={{ xs: "75vw", md: "60vw" }}
            >
              <AssignmentTable
                events={events}
                delEvent={delEvent}
                handleSort={handleSort}
              />
            </Box>
          </Stack>
        </Grid>
      </Grid>

      <Popup
        title="Add new Event"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <AssignmentEventForm
          events={events}
          setOpenPopup={setOpenPopup}
          handleSort={handleSort}
        />
      </Popup>
    </>
  );
}

export default Assignment;
