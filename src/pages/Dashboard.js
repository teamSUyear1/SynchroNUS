import * as React from "react";
import {
  Button,
  Card,
  CardContent,
  Collapse,
  Grid,
  IconButton,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import SideBar from "../components/SideBar/SideBar";
import { Box } from "@mui/system";
import AccountInfo from "../hooks/AccountInfo";
import {
  formatDistanceToNow,
  isAfter,
  formatDistanceStrict,
  compareAsc,
} from "date-fns";
import useAssignment from "../hooks/useAssignment";
import Calendar from "../components/Calendar/Calendar";
import { useState } from "react";
import { LocalizationProvider } from "@mui/lab";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AddTaskIcon from "@mui/icons-material/AddTask";
import useClasses from "../hooks/useClasses";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SettingsContext from "./timerpage/SettingsContext";
import { TransitionGroup } from "react-transition-group";
import useMeeting from "../hooks/useMeeting";
import GroupsIcon from "@mui/icons-material/Groups";

export default function Dashboard(props) {
  const {darkMode} = props
  var tmpDate = new Date();
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
  const [month, setMonth] = useState(value.getMonth());
  const { events } = useAssignment();
  const { meetings } = useMeeting();
  const { timetable } = useClasses();
  const { name } = AccountInfo();

  function filterAssDate(task) {
    const taskdate = new Date(task.date).toLocaleDateString();
    const selecteddate = new Date(value).toLocaleDateString();
    return taskdate === selecteddate;
  }

  function filterClassDate(time) {
    const classdate = new Date(time).toLocaleDateString();
    const selecteddate = new Date(value).toLocaleDateString();
    return classdate === selecteddate;
  }

  function filterMeetDate(meet) {
    const startdate = new Date(meet.start).toLocaleDateString();
    const selecteddate = new Date(value).toLocaleDateString();
    return startdate === selecteddate;
  }

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function getDarkColor() {
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += Math.floor(Math.random() * 10);
    }
    return color;
  }

  return (
    <>
      <SideBar select={1} />
      <Grid
        container
        minHeight="79.5vh"
        paddingLeft={{ xs: 5, md: 35 }}
        paddingTop={2}
        paddingRight={{ xs: 5, md: 5 }}
        spacing={{ xs: 0, md: 2 }}
        direction={{ xs: "column", sm: "row" }}
        justifyContent="center"
      >
        <Grid item>
          <Stack spacing={1} padding={1}>
            <Typography variant="h4" color="inherit" fontSize={30}>
              Welcome, {name === undefined ? "User" : name}!
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box
                sx={{
                  backgroundColor: "background.default",
                  boxShadow: 2,
                  borderWidth: 1,
                  borderRadius: 2,
                }}
                p={1}
              >
                <Calendar
                  value={value}
                  setValue={setValue}
                  month={month}
                  setMonth={setMonth}
                />
              </Box>
            </LocalizationProvider>

            <Box
              sx={{
                backgroundColor: darkMode ? "#66bb6a" : "#81c784",
                boxShadow: 2,
                borderRadius: 2,
              }}
            >
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                margin={2}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                >
                  <GroupsIcon color="#fff" />
                  <Typography>{value.toDateString()}</Typography>
                  <Button href="/meeting" color="inherit">
                    View All
                  </Button>
                </Stack>
                <List
                  sx={{
                    width: "100%",
                    bgcolor: darkMode ? "#66bb6a" : "#81c784",
                    position: "relative",
                    overflow: "auto",
                    maxHeight: 200,
                    "& ul": { padding: 0 },
                    borderRadius: 2,
                  }}
                >
                  <TransitionGroup>
                    {meetings.filter(filterMeetDate).length === 0 ? (
                      <Typography textAlign="center">No Meeting.</Typography>
                    ) : (
                      meetings.filter(filterMeetDate).map((meet, index) => (
                        <Collapse>
                          <ListItem key={index}>
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
                                Meeting Title: {meet.title}
                              </Typography>
                              <Typography component="p">
                                Start:{" "}
                                {new Date(meet.start).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </Typography>
                              <Typography component="p">
                                End:{" "}
                                {new Date(meet.end).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
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
          </Stack>
        </Grid>
        <Grid item>
          <Stack spacing={1} padding={1}>
            <Box
              sx={{
                borderTopLeftRadius:12,
                borderTopRightRadius:12,
                padding: 2,
                maxWidth: 1200,
                alignSelf: "start",
                backgroundColor: darkMode ? "#ab47bc" : "#ce93d8",
                boxShadow: 2,
                width: "100%",
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                marginBottom={1}
              >
                <AddTaskIcon color="#fff" />
                <Typography variant="h5" color="inherit" >
                  Deadline Assignment
                </Typography>
                <Button color="inherit" href="/assignment">
                  View All
                </Button>
              </Stack>
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  overflow: "auto",
                  width: "55vw",
                  minHeight: 232,
                  margin: "auto",
                }}
              >
                {events.filter(filterAssDate).map((task) => (
                  <Card
                    variant="outlined"
                    sx={{
                      minWidth: 200,
                      background: task.isComplete
                        ? darkMode ? "#388e3c" : "#66bb6a"
                        : isAfter(new Date(), new Date(task.date))
                        ? darkMode ? "#d32f2f" :"#f44336"
                        : isAfter(
                            tmpDate.setDate(tmpDate.getDate() + 1),
                            new Date(task.date)
                          )
                        ? darkMode ? "#f57c00" : "#ffa726"
                        : darkMode ? "#0288d1" : "#29b6f6",
                      boxShadow: 4,
                    }}
                  >
                    <CardContent>
                      <Typography sx={{ fontSize: 14 }} gutterBottom>
                        {task.importance} ⭐️
                      </Typography>
                      <Typography variant="h5" component="div">
                        {task.title}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {task.type}
                      </Typography>
                      <Typography variant="body2">
                        {new Date(task.date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        <br />
                        {new Date(task.date).toDateString()}
                        <br />
                        {task.isComplete
                          ? "Completed " +
                            formatDistanceToNow(new Date(task.Cdate), {
                              addSuffix: true,
                            })
                          : "Due " +
                            formatDistanceToNow(new Date(task.date), {
                              addSuffix: true,
                            })}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Box>
            <Box
              sx={{
                borderBottomLeftRadius: 12,
                borderBottomRightRadius: 12,
                padding: 1,
                backgroundColor: darkMode ? "#ab47bc" : "#ce93d8",
                boxShadow: 2,
              }}
            >
              <Stack direction="row" spacing={1} justifyContent="center">
                <Typography noWrap>You have </Typography>
                {events.filter((task) => !task.isComplete).length === 0 ? (
                  <Typography>completed all the tasks</Typography>
                ) : (
                  <>
                    <Typography fontWeight={600}>
                      {events.filter((task) => !task.isComplete).length}
                    </Typography>
                    <Typography noWrap>
                      {" "}
                      tasks that are not complete.
                    </Typography>
                  </>
                )}
              </Stack>
            </Box>

            <Box
              sx={{
                backgroundColor: darkMode ? "#42a5f5" : "#29b6f6",
                borderRadius: 3,
                padding: 2,
                maxWidth: 1120,
                alignSelf: "start",
                boxShadow: 2,
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                marginBottom={2}
              >
                <AssignmentIcon color="#fff" />
                <Typography
                  variant="h5"
                  color="inherit"
                  marginLeft={10}
                >
                  Today's class
                </Typography>
                <div>
                  <Typography variant="caption" color="inherit">
                    haven't import timetable?
                  </Typography>
                  <IconButton href="/profile" size="small" >
                    <AddCircleIcon />
                  </IconButton>
                </div>
              </Stack>
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  overflow: "auto",
                  width: "55vw",
                  minHeight: 240,
                  maxHeight: 200,
                  margin: "auto",
                }}
              >
                {timetable
                  .map((classes) => {
                    return {
                      ...classes,
                      dtstart: classes.dtstart.filter(filterClassDate),
                      dtend: classes.dtend.filter(filterClassDate),
                    };
                  })
                  .filter(
                    (classes) =>
                      classes.dtstart.length !== 0 &&
                      classes.dtstart.length !== 0
                  )
                  .sort((a, b) =>
                    compareAsc(new Date(a?.dtstart), new Date(b?.dtstart))
                  )
                  .map((task) => (
                    <Card
                      variant="outlined"
                      sx={{
                        minWidth: 200,
                        width: "auto",
                        background: getDarkColor(),
                        overflow: "auto",
                        boxShadow: 4,
                      }}
                      key={task}
                    >
                      <CardContent>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="#fff"
                          gutterBottom
                        >
                          {task?.summary}
                        </Typography>
                        <Typography
                          variant="h7"
                          sx={{ fontSize: 15 }}
                          color="#fff"
                          component="div"
                        >
                          {task?.description.split("\\n")[0]}
                        </Typography>
                        <Typography
                          sx={{ mb: 1.5 }}
                          color="rgba(255, 255, 255, 0.7)"
                        >
                          {task?.description.split("\\n")[1]}
                          <br />
                          {task?.location}
                        </Typography>
                        <Typography variant="body2" color="#fff">
                          Start:{" "}
                          {new Date(task?.dtstart).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                          <br />
                          End:{" "}
                          {new Date(task?.dtend).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                          <br />
                          Duration:{" "}
                          {formatDistanceStrict(
                            new Date(task?.dtstart),
                            new Date(task?.dtend),
                            { unit: "hour" }
                          )}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
              </Stack>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
